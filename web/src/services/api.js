// ============================================================
// DOWNFLOW API Service — wraps Firebase or falls back to mock
// All dashboards import from here, never from Firebase directly
// ============================================================

import {
  db, isConfigured,
  collection, doc,
  getDocs, getDoc, addDoc, updateDoc,
  query, where, orderBy, limit,
  serverTimestamp
} from './firebase.js'

import {
  mockCells, mockUsers, mockProgressLogs,
  mockSponsorships, mockVideoReviews, mockAttendance,
  mockPromotions, mockPacks, mockRegions, mockSystemStats
} from './mockData.js'

// ---- helper ------------------------------------------------
async function fromFirestore(colPath, constraints = []) {
  const ref = collection(db, colPath)
  const q   = constraints.length ? query(ref, ...constraints) : ref
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ============================================================
// CELLS
// ============================================================
export async function getCells(filters = {}) {
  if (!isConfigured) {
    let data = [...mockCells]
    if (filters.region) data = data.filter(c => c.region.includes(filters.region))
    if (filters.status) data = data.filter(c => c.status === filters.status)
    if (filters.sponsorId) data = data.filter(c => c.sponsorId === filters.sponsorId)
    if (filters.facilitatorId) data = data.filter(c => c.facilitatorId === filters.facilitatorId)
    if (filters.connectorId) data = data.filter(c => c.connectorId === filters.connectorId)
    if (filters.ids) data = data.filter(c => filters.ids.includes(c.id))
    return data
  }
  const constraints = []
  if (filters.region)       constraints.push(where('region','==',filters.region))
  if (filters.status)       constraints.push(where('status','==',filters.status))
  if (filters.sponsorId)    constraints.push(where('sponsorId','==',filters.sponsorId))
  if (filters.facilitatorId)constraints.push(where('facilitatorId','==',filters.facilitatorId))
  if (filters.connectorId)  constraints.push(where('connectorId','==',filters.connectorId))
  return fromFirestore('cells', constraints)
}

export async function getCell(cellId) {
  if (!isConfigured) return mockCells.find(c => c.id === cellId) || null
  const snap = await getDoc(doc(db, 'cells', cellId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function updateCellStatus(cellId, status) {
  if (!isConfigured) return { success: true, mock: true }
  await updateDoc(doc(db, 'cells', cellId), { status, updatedAt: serverTimestamp() })
  return { success: true }
}

export async function pauseCell(cellId, reason) {
  if (!isConfigured) return { success: true, mock: true }
  await updateDoc(doc(db, 'cells', cellId), { status: 'paused', pauseReason: reason, pausedAt: serverTimestamp() })
  return { success: true }
}

// ============================================================
// USERS
// ============================================================
export async function getUser(userId) {
  if (!isConfigured) return mockUsers[userId] || null
  const snap = await getDoc(doc(db, 'users', userId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function getUsersByRole(role) {
  if (!isConfigured) return Object.values(mockUsers).filter(u => u.role === role)
  return fromFirestore('users', [where('role','==',role)])
}

export async function getStudentsByCell(cellId) {
  if (!isConfigured) {
    const cell = mockCells.find(c => c.id === cellId)
    if (!cell) return []
    return cell.studentIds.map(id => mockUsers[id]).filter(Boolean)
  }
  return fromFirestore('users', [where('cellId','==',cellId), where('role','==','student')])
}

// ============================================================
// PROGRESS LOGS
// ============================================================
export async function getProgressLogs(cellId) {
  if (!isConfigured) return mockProgressLogs.filter(l => l.cellId === cellId)
  return fromFirestore(`cells/${cellId}/progressLogs`, [orderBy('week','desc')])
}

export async function logWeeklyProgress(cellId, data) {
  if (!isConfigured) return { id: `mock-${Date.now()}`, ...data }
  const ref = await addDoc(collection(db, `cells/${cellId}/progressLogs`), {
    ...data, createdAt: serverTimestamp()
  })
  return { id: ref.id, ...data }
}

// ============================================================
// SPONSORSHIPS
// ============================================================
export async function getSponsorships(sponsorId) {
  if (!isConfigured) return mockSponsorships.filter(s => s.sponsorId === sponsorId)
  return fromFirestore('sponsorships', [where('sponsorId','==',sponsorId)])
}

export async function getAllSponsorships() {
  if (!isConfigured) return mockSponsorships
  return fromFirestore('sponsorships')
}

// ============================================================
// VIDEO REVIEWS
// ============================================================
export async function getVideoReviews(filters = {}) {
  if (!isConfigured) {
    let data = [...mockVideoReviews]
    if (filters.cellId)    data = data.filter(v => v.cellId === filters.cellId)
    if (filters.studentId) data = data.filter(v => v.studentId === filters.studentId)
    if (filters.status)    data = data.filter(v => v.status === filters.status)
    return data
  }
  const constraints = []
  if (filters.cellId)    constraints.push(where('cellId','==',filters.cellId))
  if (filters.studentId) constraints.push(where('studentId','==',filters.studentId))
  if (filters.status)    constraints.push(where('status','==',filters.status))
  return fromFirestore('videoReviews', constraints)
}

export async function submitVideoReview(data) {
  if (!isConfigured) return { id: `mock-${Date.now()}`, status: 'pending', ...data }
  const ref = await addDoc(collection(db, 'videoReviews'), {
    ...data, status: 'pending', submittedAt: serverTimestamp()
  })
  return { id: ref.id, ...data }
}

// ============================================================
// ATTENDANCE
// ============================================================
export async function getAttendance(cellId) {
  if (!isConfigured) return mockAttendance.filter(a => a.cellId === cellId)
  return fromFirestore(`cells/${cellId}/attendance`, [orderBy('sessionNum','desc')])
}

// ============================================================
// PROMOTIONS
// ============================================================
export async function getPromotions(filters = {}) {
  if (!isConfigured) {
    let data = [...mockPromotions]
    if (filters.cellId) data = data.filter(p => p.cellId === filters.cellId)
    return data
  }
  return fromFirestore('promotions')
}

export async function createPromotion(data) {
  if (!isConfigured) return { id: `mock-${Date.now()}`, status: 'pending', ...data }
  const ref = await addDoc(collection(db, 'promotions'), {
    ...data, status: 'pending', createdAt: serverTimestamp()
  })
  return { id: ref.id, ...data }
}

// ============================================================
// PACKS
// ============================================================
export async function getPacks() {
  if (!isConfigured) return mockPacks
  return fromFirestore('packs')
}

// ============================================================
// REGIONS
// ============================================================
export async function getRegions() {
  if (!isConfigured) return mockRegions
  return fromFirestore('regions')
}

// ============================================================
// SYSTEM STATS (Platform Admin)
// ============================================================
export async function getSystemStats() {
  if (!isConfigured) return mockSystemStats
  const snap = await getDoc(doc(db, 'system', 'stats'))
  return snap.exists() ? snap.data() : mockSystemStats
}

// ============================================================
// AI LEARNING ASSISTANT (Antigravity AI Tool)
// POST to the Antigravity AI endpoint if configured
// Falls back to a structured Claude-style prompt response
// ============================================================
export async function generateAIPrompt({ contentType, learningTopic, studentProgress }) {
  const ANTIGRAVITY_URL = import.meta.env.VITE_ANTIGRAVITY_AI_URL
  const ANTIGRAVITY_KEY = import.meta.env.VITE_ANTIGRAVITY_AI_KEY

  if (ANTIGRAVITY_URL && ANTIGRAVITY_KEY) {
    try {
      const res = await fetch(`${ANTIGRAVITY_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ANTIGRAVITY_KEY}` },
        body: JSON.stringify({ contentType, learningTopic, studentProgress })
      })
      const data = await res.json()
      return data.result || data.text || data.output
    } catch (e) {
      console.warn('Antigravity AI call failed, using fallback', e)
    }
  }

  // Fallback: structured offline response
  const prompts = {
    'Discussion Prompt': [
      `Ask your students: "If you could redesign one rule in your school or family, what would it be and why?" — Listen without judging. Notice who speaks first, who waits.`,
      `Start with: "Think of someone you admire. What's one thing they do that you don't?" — Push for specifics, not general praise.`,
      `Try this: "What's something you believed last year that you no longer believe?" — Great for self-awareness packs.`,
    ],
    'Feedback Suggestion': [
      `Acknowledge effort before outcome: "I noticed you pushed through when it got harder — that's the real skill here."`,
      `Reframe struggle: "This confusion you're feeling? That's your brain growing. What specifically feels stuck?"`,
      `Peer prompting: "Ask two classmates what they noticed about your presentation — write it down before you forget."`,
    ],
    'Session Activity': [
      `"The 60-Second Expert" — each student picks one thing they know better than anyone in the room and has 60s to teach it. Then group discusses: what made it easy to follow?`,
      `"If This Were a Business" — take any daily problem (traffic, school lunch) and have students pitch a solution in 3 minutes. Judge on clarity, not correctness.`,
      `"The No-Phone Challenge" — students track what they notice in the next 5 minutes without screens. Then share. Leads naturally into self-awareness discussion.`,
    ],
  }

  const options = prompts[contentType] || prompts['Discussion Prompt']
  const idx = Math.floor(Math.random() * options.length)
  return `📚 Topic: ${learningTopic || 'General'}\n\n${options[idx]}`
}
