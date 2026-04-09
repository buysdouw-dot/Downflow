// ============================================================
// DOWNFLOW — Stripe Payment Service
//
// To activate, add to .env.local:
//   VITE_STRIPE_PUBLIC_KEY=pk_live_... (or pk_test_...)
//
// Without this, the app renders payment UI in preview/demo mode.
// Full charge flow requires a backend (Firebase Function or
// server) to create PaymentIntents — see notes below.
// ============================================================

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
export const isStripeConfigured = !!STRIPE_KEY

// Pricing tiers for cell sponsorship
export const SPONSORSHIP_TIERS = [
  {
    id: 'starter',
    name: 'Starter Cell',
    price: 250,
    currency: 'USD',
    period: 'per cycle (12 weeks)',
    students: 6,
    description: 'Fund one full learning cell for a complete 12-week cycle.',
    features: [
      '6 students, 12 sessions',
      'Full impact dashboard',
      'Monthly progress reports',
      'Sponsor recognition badge',
    ],
    color: '#72d0ff',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth Sponsor',
    price: 600,
    currency: 'USD',
    period: 'per cycle (12 weeks)',
    students: 18,
    description: 'Fund three cells and qualify for the Sponsor Leaderboard.',
    features: [
      '3 cells · 18 students · 36 sessions',
      'Full impact dashboard',
      'Sponsor leaderboard ranking',
      'Rebate reinvestment options',
      'Named impact certificate',
    ],
    color: '#d2ad44',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Impact',
    price: 2000,
    currency: 'USD',
    period: 'per cycle (12 weeks)',
    students: 60,
    description: 'Regional-level funding with co-branded impact reporting.',
    features: [
      '10 cells · 60 students',
      'Co-branded reports',
      'Regional naming rights',
      'Priority ethics review access',
      'Custom rebate structure',
      'Direct facilitator comms',
    ],
    color: '#4de8b0',
    popular: false,
  },
]

// ── Stripe Checkout (redirect flow) ────────────────────────
// NOTE: In production, your backend creates a Checkout Session
// and returns the URL. This function handles both modes.
export async function initiateCheckout({ tierId, sponsorEmail, sponsorName, cellId }) {
  if (!isStripeConfigured) {
    // Demo mode — simulate
    console.log('[Stripe demo] Would initiate checkout for tier:', tierId)
    return { demo: true, message: 'Stripe not configured — add VITE_STRIPE_PUBLIC_KEY to .env.local' }
  }

  // Production: call your backend to create a Checkout Session
  // const res = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ tierId, sponsorEmail, sponsorName, cellId })
  // })
  // const { url } = await res.json()
  // window.location.href = url

  throw new Error('Backend checkout endpoint not yet configured. See stripe.js comments.')
}

// ── Format currency ─────────────────────────────────────────
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}
