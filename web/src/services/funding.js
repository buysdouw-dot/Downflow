// ============================================================
// DOWNFLOW — Funding Request Service
// Replaces Stripe. Sponsors submit a funding request →
// platform admin confirms payment received → cell activates.
// ============================================================

import { db, isConfigured, collection, addDoc, updateDoc, doc, getDocs, query, where, serverTimestamp } from './firebase.js'
import { notifyAdminFundingRequest, notifySponsorPaymentConfirmed } from './email.js'

// ── Sponsorship tiers ────────────────────────────────────────
export const FUNDING_TIERS = [
  {
    id: 'starter',
    name: 'Starter Cell',
    amount: 250,
    currency: 'USD',
    vnd: 6300000,
    period: '12-week cycle',
    students: 6,
    cells: 1,
    description: 'Fund one complete learning cell for a full 12-week cycle.',
    features: [
      '6 students · 24 sessions',
      'Full impact dashboard access',
      'Monthly progress reports',
      'Sponsor recognition badge',
      '15% rebate on completion',
    ],
    color: '#72d0ff',
  },
  {
    id: 'growth',
    name: 'Growth Sponsor',
    amount: 600,
    currency: 'USD',
    vnd: 15120000,
    period: '12-week cycle',
    students: 18,
    cells: 3,
    description: 'Fund three cells and qualify for the Sponsor Leaderboard.',
    features: [
      '3 cells · 18 students · 72 sessions',
      'Sponsor leaderboard ranking',
      'Rebate reinvestment options',
      'Named impact certificate',
      'Priority cell selection',
    ],
    color: '#d2ad44',
    popular: true,
  },
  {
    id: 'regional',
    name: 'Regional Impact',
    amount: 2000,
    currency: 'USD',
    vnd: 50400000,
    period: '12-week cycle',
    students: 60,
    cells: 10,
    description: 'Region-level funding with co-branded impact reporting.',
    features: [
      '10 cells · 60 students',
      'Co-branded impact reports',
      'Regional naming rights',
      'Custom rebate structure',
      'Direct facilitator access',
      'Quarterly strategy meeting',
    ],
    color: '#4de8b0',
  },
  {
    id: 'custom',
    name: 'Custom',
    amount: null,
    currency: 'USD',
    vnd: null,
    period: 'negotiated',
    students: null,
    cells: null,
    description: 'Bespoke funding arrangement — contact us to discuss.',
    features: [
      'Any number of cells',
      'Flexible cycle length',
      'Full white-label option',
      'Dedicated account manager',
    ],
    color: '#b083ff',
  },
]

// ── Wise payment details ─────────────────────────────────────
// Fill these in with your actual Wise Business account details
export const WISE_DETAILS = {
  accountName:  'DOWNFLOW School of Life',
  // USD
  usd: {
    bankName:      'Wise (formerly TransferWise)',
    accountType:   'ACH / Wire',
    routingNumber: 'ADD YOUR ROUTING NUMBER',
    accountNumber: 'ADD YOUR ACCOUNT NUMBER',
    swift:         'TRWIBEB1XXX',
  },
  // EUR / SEPA (Germany)
  eur: {
    bankName: 'Wise',
    iban:     'ADD YOUR IBAN',
    bic:      'TRWIBEB1XXX',
  },
  // VND (Vietnam)
  vnd: {
    bankName:      'ADD VIETNAMESE BANK NAME',
    accountNumber: 'ADD ACCOUNT NUMBER',
    branch:        'ADD BRANCH',
    note:          'Wise transfers to VND via local transfer — contact us for details',
  },
  reference: 'DOWNFLOW-FUND', // sponsor will append their name
  email: 'funding@downflow.app',
  note: 'Please use reference: DOWNFLOW-FUND-[YOUR NAME] so we can match your payment.',
}

// ── Create a funding request in Firestore ────────────────────
export async function createFundingRequest({ sponsorId, sponsorName, sponsorEmail, tierId, customAmount, customNote, region }) {
  const tier = FUNDING_TIERS.find(t => t.id === tierId)
  const amount = customAmount || tier?.amount
  const record = {
    sponsorId,
    sponsorName,
    sponsorEmail,
    tierId,
    tierName:    tier?.name || 'Custom',
    amount,
    currency:    'USD',
    cells:       tier?.cells || null,
    students:    tier?.students || null,
    region:      region || 'unspecified',
    customNote:  customNote || '',
    status:      'pending_payment',   // pending_payment → payment_received → active → completed
    createdAt:   serverTimestamp(),
    confirmedAt: null,
    confirmedBy: null,
    invoiceRef:  `INV-${Date.now()}`,
  }

  if (!isConfigured) {
    console.log('[Funding — dev mode] Would create:', record)
    return { id: `mock-${Date.now()}`, ...record }
  }

  const ref = await addDoc(collection(db, 'fundingRequests'), record)
  // Notify platform admin (fire-and-forget)
  notifyAdminFundingRequest({
    sponsorName, sponsorEmail, region,
    tierName:   record.tierName,
    amount:     record.amount,
    invoiceRef: record.invoiceRef,
  }).catch(() => {})
  return { id: ref.id, ...record }
}

// ── Get all pending funding requests (platform admin) ────────
export async function getPendingFundingRequests() {
  if (!isConfigured) return []
  const q = query(collection(db, 'fundingRequests'), where('status', '==', 'pending_payment'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Get all funding requests ─────────────────────────────────
export async function getAllFundingRequests() {
  if (!isConfigured) return []
  const snap = await getDocs(collection(db, 'fundingRequests'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
}

// ── Admin confirms payment received ─────────────────────────
export async function confirmPaymentReceived({ requestId, adminId, cellIds }) {
  if (!isConfigured) return { success: true, mock: true }
  await updateDoc(doc(db, 'fundingRequests', requestId), {
    status:      'active',
    confirmedAt: serverTimestamp(),
    confirmedBy: adminId,
    cellIds:     cellIds || [],
  })
  // Activate linked cells
  if (cellIds?.length) {
    await Promise.all(cellIds.map(cellId =>
      updateDoc(doc(db, 'cells', cellId), {
        fundingStatus: 'funded',
        status:        'active',
      })
    ))
  }
  return { success: true }
}

// ── Get single funding request ───────────────────────────────
export async function getFundingRequest(requestId) {
  if (!isConfigured) return null
  const { getDoc } = await import('./firebase.js')
  const snap = await getDoc(doc(db, 'fundingRequests', requestId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}
