import React from 'react'
// ============================================================
// EarningsWallet — Facilitator payout history + balance
// Shows: sessions taught, earnings by phase, payout history,
//        request payout button.
// ============================================================
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { db, isConfigured, collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from '../services/firebase.js'
import usePageMeta from '../hooks/usePageMeta.js'

const MOCK_SESSIONS = [
  { id: 's1', cellId: 'VN-01', weekNum: 7, date: '2026-04-02', students: 6, durationMins: 60, paidAmount: 432000, currency: 'VND', status: 'paid' },
  { id: 's2', cellId: 'VN-01', weekNum: 6, date: '2026-03-26', students: 6, durationMins: 60, paidAmount: 432000, currency: 'VND', status: 'paid' },
  { id: 's3', cellId: 'VN-02', weekNum: 3, date: '2026-03-19', students: 5, durationMins: 60, paidAmount: 432000, currency: 'VND', status: 'paid' },
  { id: 's4', cellId: 'VN-01', weekNum: 5, date: '2026-03-12', students: 6, durationMins: 60, paidAmount: 432000, currency: 'VND', status: 'paid' },
  { id: 's5', cellId: 'VN-02', weekNum: 2, date: '2026-03-05', students: 5, durationMins: 60, paidAmount: 432000, currency: 'VND', status: 'paid' },
  { id: 's6', cellId: 'VN-01', weekNum: 4, date: '2026-02-26', students: 6, durationMins: 60, paidAmount: 378000, currency: 'VND', status: 'paid' },
]

const MOCK_PAYOUTS = [
  { id: 'p1', date: '2026-04-04', amount: 864000, currency: 'VND', status: 'paid', method: 'Wise', ref: 'DF-PAY-2404-01' },
  { id: 'p2', date: '2026-03-28', amount: 432000, currency: 'VND', status: 'paid', method: 'Wise', ref: 'DF-PAY-2403-04' },
  { id: 'p3', date: '2026-03-21', amount: 432000, currency: 'VND', status: 'paid', method: 'Wise', ref: 'DF-PAY-2403-03' },
  { id: 'p4', date: '2026-03-14', amount: 432000, currency: 'VND', status: 'paid', method: 'Wise', ref: 'DF-PAY-2403-02' },
  { id: 'p5', date: '2026-03-07', amount: 810000, currency: 'VND', status: 'paid', method: 'Wise', ref: 'DF-PAY-2403-01' },
]

const PHASES = [
  { phase: 1, label: 'Phase 1', pct: 35, color: '#5b9bd5', desc: 'Entry level — building your cell system' },
  { phase: 2, label: 'Phase 2', pct: 40, color: '#4de8b0', desc: 'Growing — consistent quality delivery' },
  { phase: 3, label: 'Phase 3', pct: 45, color: '#d4a840', desc: 'Expert — mentoring and recruiting' },
]

function fmt(n) { return n.toLocaleString('vi-VN') }

export default function EarningsWallet() {
  usePageMeta('Earnings Wallet', 'Your facilitator sessions, earnings, and payout history.')

  const { uid, displayName } = useAuth()
  const toast = useToast()
  const [activeTab,   setActiveTab]   = useState('overview')
  const [sessions,    setSessions]    = useState(MOCK_SESSIONS)
  const [payouts,     setPayouts]     = useState(MOCK_PAYOUTS)
  const [phase,       setPhase]       = useState(2)
  const [requesting,  setRequesting]  = useState(false)
  const [wiseEmail,   setWiseEmail]   = useState('')
  const [showRequest, setShowRequest] = useState(false)

  useEffect(() => {
    if (!isConfigured || !uid) return
    // Load real sessions and payouts from Firestore
    const q1 = query(collection(db, 'sessions'), where('facilitatorId', '==', uid), orderBy('date', 'desc'))
    getDocs(q1).then(snap => {
      if (!snap.empty) setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }).catch(() => {})
    const q2 = query(collection(db, 'payouts'), where('facilitatorId', '==', uid), orderBy('date', 'desc'))
    getDocs(q2).then(snap => {
      if (!snap.empty) setPayouts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }).catch(() => {})
  }, [uid])

  const totalEarned   = sessions.filter(s => s.status === 'paid').reduce((a, s) => a + (s.paidAmount || 0), 0)
  const totalPaid     = payouts.filter(p => p.status === 'paid').reduce((a, p) => a + (p.amount || 0), 0)
  const pendingBalance = totalEarned - totalPaid
  const sessionsCount  = sessions.length
  const currentPhase   = PHASES.find(p => p.phase === phase)

  // Weekly projection
  const weeklyPer  = 432000
  const weekly2    = weeklyPer * 2
  const cycleTotal = weeklyPer * 12

  async function requestPayout() {
    if (!wiseEmail.trim()) { toast('Enter your Wise email', 'error'); return }
    setRequesting(true)
    try {
      const req = {
        facilitatorId:   uid || 'guest',
        facilitatorName: displayName,
        wiseEmail:       wiseEmail.trim(),
        amount:          pendingBalance,
        currency:        'VND',
        status:          'pending',
        createdAt:       isConfigured ? serverTimestamp() : new Date().toISOString(),
      }
      if (isConfigured) await addDoc(collection(db, 'payoutRequests'), req)
      toast(`Payout request submitted for ${fmt(pendingBalance)} VND`, 'success')
      setShowRequest(false)
    } catch (e) {
      toast('Failed: ' + e.message, 'error')
    } finally {
      setRequesting(false)
    }
  }

  return (
    <div className="ew-page">
      <div className="ew-hero">
        <div>
          <span className="kicker">Facilitator Finance</span>
          <h1 className="ew-title">Earnings Wallet</h1>
          <p className="ew-sub">Phase {phase} facilitator · {sessionsCount} sessions taught</p>
        </div>
        <div className="ew-balance-card">
          <div className="ew-balance-label">Pending Balance</div>
          <div className="ew-balance-amount">{fmt(pendingBalance)} <span>VND</span></div>
          <button className="ew-payout-btn" onClick={() => setShowRequest(true)}
            disabled={pendingBalance <= 0}>
            Request Payout →
          </button>
        </div>
      </div>

      {/* Stat row */}
      <div className="ew-stats">
        {[
          { label: 'Total Earned', value: `${fmt(totalEarned)} ₫`, sub: 'All time' },
          { label: 'Total Paid', value: `${fmt(totalPaid)} ₫`, sub: 'Paid out' },
          { label: 'Sessions Taught', value: sessionsCount, sub: 'Completed sessions' },
          { label: 'Current Phase', value: `Phase ${phase}`, sub: `${currentPhase?.pct}% revenue share` },
        ].map(s => (
          <div key={s.label} className="ew-stat">
            <div className="ew-stat-value">{s.value}</div>
            <div className="ew-stat-label">{s.label}</div>
            <div className="ew-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="ew-tabs">
        {['overview', 'sessions', 'payouts', 'phases'].map(t => (
          <button key={t} className={`ew-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="ew-panel">
          <h3 className="ew-panel-title">Weekly Projections (Phase {phase})</h3>
          <div className="ew-projection-grid">
            <div className="ew-proj-card">
              <div className="ew-proj-val">{fmt(weeklyPer)} ₫</div>
              <div className="ew-proj-label">Per session (1 cell)</div>
            </div>
            <div className="ew-proj-card">
              <div className="ew-proj-val">{fmt(weekly2)} ₫</div>
              <div className="ew-proj-label">Per week (2 cells)</div>
            </div>
            <div className="ew-proj-card highlight">
              <div className="ew-proj-val">{fmt(cycleTotal)} ₫</div>
              <div className="ew-proj-label">Per 12-week cycle</div>
            </div>
          </div>

          <div className="ew-phase-info">
            <h3 className="ew-panel-title" style={{ marginTop: '1.5rem' }}>Your Phase</h3>
            <div className="ew-phase-row">
              {PHASES.map(p => (
                <div key={p.phase}
                  className={`ew-phase-card ${p.phase === phase ? 'active' : ''}`}
                  onClick={() => setPhase(p.phase)}
                  style={{ '--pc': p.color }}>
                  <div className="ew-phase-num">{p.label}</div>
                  <div className="ew-phase-pct">{p.pct}%</div>
                  <div className="ew-phase-desc">{p.desc}</div>
                  {p.phase === phase && <div className="ew-phase-badge">Current</div>}
                </div>
              ))}
            </div>
            <p className="ew-phase-note">Reach Phase 3 by recruiting 1 new facilitator (+5% bonus, max 45%). Automatic phase upgrade after 3 consecutive high-health cycles.</p>
          </div>
        </div>
      )}

      {/* Sessions */}
      {activeTab === 'sessions' && (
        <div className="ew-panel">
          <h3 className="ew-panel-title">Sessions Taught</h3>
          <table className="ew-table">
            <thead>
              <tr><th>Cell</th><th>Week</th><th>Date</th><th>Students</th><th>Duration</th><th>Earned</th><th>Status</th></tr>
            </thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.cellId}</strong></td>
                  <td>W{s.weekNum}</td>
                  <td>{s.date}</td>
                  <td>{s.students}</td>
                  <td>{s.durationMins}m</td>
                  <td style={{ color: '#4de8b0', fontWeight: 700 }}>{fmt(s.paidAmount)} ₫</td>
                  <td><span className={`ew-status ${s.status}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payouts */}
      {activeTab === 'payouts' && (
        <div className="ew-panel">
          <h3 className="ew-panel-title">Payout History</h3>
          {payouts.length === 0 ? (
            <p style={{ color: 'var(--text-soft)' }}>No payouts yet. Once your balance accumulates, request a payout above.</p>
          ) : (
            <table className="ew-table">
              <thead>
                <tr><th>Date</th><th>Amount</th><th>Method</th><th>Reference</th><th>Status</th></tr>
              </thead>
              <tbody>
                {payouts.map(p => (
                  <tr key={p.id}>
                    <td>{p.date}</td>
                    <td style={{ color: '#4de8b0', fontWeight: 700 }}>{fmt(p.amount)} ₫</td>
                    <td>{p.method}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.ref}</td>
                    <td><span className={`ew-status ${p.status}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Phases explainer */}
      {activeTab === 'phases' && (
        <div className="ew-panel">
          <h3 className="ew-panel-title">Phase Progression System</h3>
          <p style={{ color: 'var(--text-soft)', marginBottom: '1.5rem' }}>
            Your earnings grow with your commitment and quality. Every facilitator starts at Phase 1 and advances by demonstrating consistent, high-quality delivery.
          </p>
          <div className="ew-phase-detail">
            {[
              { phase: 1, pct: 35, unlock: 'Starting point for all facilitators', criteria: ['Complete onboarding', 'Run first supervised session', 'Maintain ≥70% cell health'] },
              { phase: 2, pct: 40, unlock: 'After 2 consecutive high-health cycles', criteria: ['Average cell health ≥80% for 2 cycles', 'No ethical flags', 'Student retention ≥75%'] },
              { phase: 3, pct: 45, unlock: 'After recruiting 1 facilitator', criteria: ['Recruit and onboard 1 new facilitator', 'Maintain Phase 2 criteria', 'Maximum 45% revenue share'] },
            ].map(p => (
              <div key={p.phase} className={`ew-phase-detail-card ${p.phase === phase ? 'active' : ''}`}>
                <div className="ew-pd-header">
                  <span>Phase {p.phase}</span>
                  <span className="ew-pd-pct">{p.pct}% revenue share</span>
                </div>
                <p className="ew-pd-unlock">{p.unlock}</p>
                <ul className="ew-pd-criteria">
                  {p.criteria.map((c, i) => <li key={i}>✓ {c}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payout request modal */}
      {showRequest && (
        <div className="ew-modal-overlay" onClick={e => e.target === e.currentTarget && setShowRequest(false)}>
          <div className="ew-modal">
            <h3>Request Payout</h3>
            <p>Amount: <strong style={{ color: '#4de8b0' }}>{fmt(pendingBalance)} VND</strong></p>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>
              Payouts are processed every Friday via Wise. Enter your Wise account email below.
            </p>
            <input className="ew-input" type="email" placeholder="Your Wise email address"
              value={wiseEmail} onChange={e => setWiseEmail(e.target.value)} />
            <div className="ew-modal-actions">
              <button className="ew-btn-secondary" onClick={() => setShowRequest(false)}>Cancel</button>
              <button className="ew-btn-primary" onClick={requestPayout} disabled={requesting}>
                {requesting ? 'Submitting…' : 'Request Payout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
