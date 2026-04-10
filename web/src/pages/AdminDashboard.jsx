import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   AdminDashboard — Platform control centre
   Route: /admin  (platform only)
───────────────────────────────────────────────────────────── */

const METRICS = [
  { label: 'Total Leads', value: '85', sub: '+12 this week', color: '#5b9bd5', icon: '👥' },
  { label: 'Active Cells', value: '4', sub: '2 forming, 2 running', color: '#00c896', icon: '🏫' },
  { label: 'Paying Sponsors', value: '2', sub: 'R50,000 funded', color: '#a259ff', icon: '💼' },
  { label: 'Active Facilitators', value: '6', sub: '2 pending contract', color: '#ffd740', icon: '👨‍🏫' },
  { label: 'Total Students', value: '18', sub: '6 in waitlist', color: '#ff7043', icon: '🧑‍🎓' },
  { label: 'Revenue This Month', value: 'R28,400', sub: '+R5,200 vs last month', color: '#00c896', icon: '💰' },
]

const FUNNEL = [
  { stage: 'Impressions', val: 9840, pct: 100, color: '#5b9bd5' },
  { stage: 'Landing Page Visits', val: 1240, pct: 13, color: '#a259ff' },
  { stage: 'Form Fills', val: 165, pct: 13, color: '#ff7043' },
  { stage: 'Score 50+ (Qualified)', val: 68, pct: 41, color: '#ffd740' },
  { stage: 'Outreach Triggered', val: 68, pct: 100, color: '#ffd740' },
  { stage: 'Replied / Booked', val: 22, pct: 32, color: '#00c896' },
  { stage: 'Converted', val: 8, pct: 36, color: '#00c896' },
]

const CELLS = [
  { id: 'cell_001', name: 'Confidence Cell 001', status: 'active', facilitator: 'Peter N.', students: 6, capacity: 6, sponsor: 'Acme Group', sessionsLeft: 18, lastOutput: '2 days ago' },
  { id: 'cell_002', name: 'Confidence Cell 002', status: 'active', facilitator: 'Thandi M.', students: 4, capacity: 6, sponsor: 'Corp GmbH', sessionsLeft: 22, lastOutput: '1 day ago' },
  { id: 'cell_003', name: 'Cell 003 (Vietnam)', status: 'forming', facilitator: '— Unassigned', students: 2, capacity: 6, sponsor: 'David Ltd', sessionsLeft: 24, lastOutput: 'No outputs yet' },
  { id: 'cell_004', name: 'Cell 004 (Pilot)', status: 'at_risk', facilitator: 'Ravi S.', students: 5, capacity: 6, sponsor: 'Self-funded', sessionsLeft: 10, lastOutput: '8 days ago' },
]

const PAYOUTS = [
  { id: 'pay_001', name: 'Peter Nkosi', role: 'facilitator', amount: 'R4,050', cell: 'Cell 001', status: 'pending', due: 'Apr 11' },
  { id: 'pay_002', name: 'Thandi Mokoena', role: 'facilitator', amount: 'R3,600', cell: 'Cell 002', status: 'pending', due: 'Apr 11' },
  { id: 'pay_003', name: 'David Mensah', role: 'connector', amount: 'R2,000', cell: 'Cell 001', status: 'pending', due: 'Apr 13' },
  { id: 'pay_004', name: 'Ravi Sharma', role: 'facilitator', amount: 'R1,800', cell: 'Cell 004', status: 'overdue', due: 'Apr 7' },
]

const APPROVALS = [
  { id: 'app_001', type: 'Output', name: 'Sipho M. — Week 3 Lesson 2 video', cell: 'Cell 001', submitted: '3h ago' },
  { id: 'app_002', type: 'Output', name: 'Anna T. — Reflection essay', cell: 'Cell 002', submitted: '5h ago' },
  { id: 'app_003', type: 'Facilitator', name: 'James K. — Intro video review', cell: '—', submitted: '1 day ago' },
  { id: 'app_004', type: 'Payout', name: 'Ravi Sharma — Overdue R1,800', cell: 'Cell 004', submitted: '3 days ago' },
]

const WEEKLY_CHECKLIST = [
  { label: 'Check all pending payouts and process via Wise', done: false },
  { label: 'Review new facilitator applications (intro videos)', done: true },
  { label: 'Approve pending student output submissions', done: false },
  { label: 'Check at-risk cells — send backup facilitator if needed', done: false },
  { label: 'Review weekly session completion rates (target: 100%)', done: true },
  { label: 'Send weekly digest email to admin team', done: false },
  { label: 'Update sponsor dashboards with new approved outputs', done: true },
  { label: 'Check connector referral milestones → trigger Phase payouts', done: false },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [checklist, setChecklist] = useState(WEEKLY_CHECKLIST)

  const toggleCheck = (i) => {
    setChecklist(prev => prev.map((c, idx) => idx === i ? { ...c, done: !c.done } : c))
  }

  const completedChecks = checklist.filter(c => c.done).length

  return (
    <div className="adm-page">
      {/* Header */}
      <div className="adm-hero">
        <div>
          <div className="adm-eyebrow">Platform Control Centre</div>
          <h1 className="adm-h1">Admin Dashboard</h1>
          <p className="adm-sub">Full platform overview — leads, cells, payouts, approvals, at-risk flags.</p>
        </div>
        <div className="adm-checklist-badge">
          <div className="adm-cb-ring">
            <svg viewBox="0 0 36 36" className="adm-ring-svg">
              <path className="adm-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="adm-ring-fill" strokeDasharray={`${Math.round((completedChecks / checklist.length) * 100)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="adm-ring-num">{completedChecks}/{checklist.length}</span>
          </div>
          <div>
            <div className="adm-cb-title">Weekly Checklist</div>
            <div className="adm-cb-sub">{checklist.length - completedChecks} tasks remaining</div>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="adm-metrics">
        {METRICS.map(m => (
          <div key={m.label} className="adm-metric" style={{ '--mc': m.color }}>
            <span className="adm-m-icon">{m.icon}</span>
            <div className="adm-m-val">{m.value}</div>
            <div className="adm-m-label">{m.label}</div>
            <div className="adm-m-sub">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        {['overview', 'cells', 'payouts', 'approvals', 'checklist'].map(t => (
          <button key={t} className={`adm-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t === 'overview' ? '📊 Funnel' : t === 'cells' ? '🏫 Cells' : t === 'payouts' ? '💸 Payouts' : t === 'approvals' ? '✅ Approvals' : '📋 Checklist'}
          </button>
        ))}
      </div>

      {/* ── Funnel tab ── */}
      {activeTab === 'overview' && (
        <div className="adm-panel">
          <div className="adm-panel-title">Conversion Funnel — This Month</div>
          <div className="adm-funnel">
            {FUNNEL.map((f, i) => (
              <div key={f.stage} className="adm-frow">
                <div className="adm-frow-label">{f.stage}</div>
                <div className="adm-frow-bar-wrap">
                  <div className="adm-frow-bar" style={{ width: `${f.pct}%`, background: f.color }} />
                  <span className="adm-frow-val">{f.val.toLocaleString()}</span>
                </div>
                {i > 0 && (
                  <div className="adm-frow-rate" style={{ color: f.pct >= 30 ? '#00c896' : f.pct >= 15 ? '#ffd740' : '#ff7043' }}>
                    {f.pct}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Cells tab ── */}
      {activeTab === 'cells' && (
        <div className="adm-panel">
          <div className="adm-panel-title">Active + Forming Cells</div>
          <div className="adm-cells-list">
            {CELLS.map(cell => (
              <div key={cell.id} className={`adm-cell-card adm-cs-${cell.status}`}>
                <div className="adm-cc-top">
                  <div>
                    <div className="adm-cc-name">{cell.name}</div>
                    <div className="adm-cc-meta">{cell.facilitator} · {cell.sponsor}</div>
                  </div>
                  <span className={`adm-cell-status adm-cst-${cell.status}`}>{cell.status.replace('_', ' ')}</span>
                </div>
                <div className="adm-cc-stats">
                  <div className="adm-cc-stat">
                    <span className="adm-ccs-label">Students</span>
                    <span className="adm-ccs-val">{cell.students}/{cell.capacity}</span>
                  </div>
                  <div className="adm-cc-stat">
                    <span className="adm-ccs-label">Sessions left</span>
                    <span className="adm-ccs-val">{cell.sessionsLeft}</span>
                  </div>
                  <div className="adm-cc-stat">
                    <span className="adm-ccs-label">Last output</span>
                    <span className="adm-ccs-val" style={{ color: cell.lastOutput.includes('8 days') ? '#ff7043' : '#fff' }}>{cell.lastOutput}</span>
                  </div>
                </div>
                {cell.status === 'at_risk' && (
                  <div className="adm-cc-alert">⚠️ No student output in 8 days — send backup facilitator or session reminder</div>
                )}
                {cell.facilitator.includes('Unassigned') && (
                  <div className="adm-cc-alert adm-cca-warn">🟡 Facilitator not yet assigned — assign from backup pool</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Payouts tab ── */}
      {activeTab === 'payouts' && (
        <div className="adm-panel">
          <div className="adm-panel-title">Payout Queue</div>
          <div className="adm-payouts-list">
            {PAYOUTS.map(p => (
              <div key={p.id} className={`adm-payout-row ${p.status === 'overdue' ? 'overdue' : ''}`}>
                <div className="adm-pr-left">
                  <div className="adm-pr-name">{p.name}</div>
                  <div className="adm-pr-meta">{p.role} · {p.cell}</div>
                </div>
                <div className="adm-pr-amount">{p.amount}</div>
                <div className="adm-pr-due" style={{ color: p.status === 'overdue' ? '#ff7043' : 'rgba(255,255,255,0.5)' }}>
                  Due {p.due}
                  {p.status === 'overdue' && ' ⚠️ OVERDUE'}
                </div>
                <div className="adm-pr-actions">
                  <button className="adm-pay-btn">Mark Paid</button>
                </div>
              </div>
            ))}
          </div>
          <div className="adm-payout-total">
            <span>Total pending:</span>
            <strong>R11,450</strong>
          </div>
        </div>
      )}

      {/* ── Approvals tab ── */}
      {activeTab === 'approvals' && (
        <div className="adm-panel">
          <div className="adm-panel-title">Pending Approvals ({APPROVALS.length})</div>
          <div className="adm-approvals-list">
            {APPROVALS.map(a => (
              <div key={a.id} className="adm-approval-row">
                <div>
                  <span className={`adm-app-type adm-at-${a.type.toLowerCase()}`}>{a.type}</span>
                  <div className="adm-app-name">{a.name}</div>
                  <div className="adm-app-meta">{a.cell} · {a.submitted}</div>
                </div>
                <div className="adm-app-actions">
                  <button className="adm-approve-btn">✓ Approve</button>
                  <button className="adm-reject-btn">✕ Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Checklist tab ── */}
      {activeTab === 'checklist' && (
        <div className="adm-panel">
          <div className="adm-panel-title">Weekly Operational Checklist</div>
          <div className="adm-checklist">
            {checklist.map((item, i) => (
              <label key={i} className={`adm-check-item ${item.done ? 'done' : ''}`} onClick={() => toggleCheck(i)}>
                <span className="adm-check-box">{item.done ? '✓' : ''}</span>
                <span className="adm-check-label">{item.label}</span>
              </label>
            ))}
          </div>
          <div className="adm-checklist-progress">
            <div className="adm-cp-bar-wrap">
              <div className="adm-cp-bar" style={{ width: `${Math.round((completedChecks / checklist.length) * 100)}%` }} />
            </div>
            <span>{completedChecks}/{checklist.length} complete</span>
          </div>
        </div>
      )}
    </div>
  )
}
