import { useState } from 'react'
import OnboardingBanner from '../components/OnboardingBanner.jsx'
import { HexIcon } from '../components/HexSymbols.jsx'
import DashboardShell from '../components/DashboardShell.jsx'

const CONNECTOR_RANKINGS = [
  { name:'Minh Tran',       region:'🇻🇳 VN', cells:12, placements:58, retention:94, quality:9.1, succession:8.9, overall:9.0 },
  { name:'Jana Hoffmann',   region:'🇩🇪 DE', cells:9,  placements:43, retention:91, quality:8.8, succession:8.7, overall:8.8 },
  { name:'Olga Petrova',    region:'🇷🇺 RU', cells:8,  placements:39, retention:89, quality:8.7, succession:8.5, overall:8.6 },
  { name:'Duc Pham',        region:'🇻🇳 VN', cells:7,  placements:35, retention:88, quality:8.6, succession:8.4, overall:8.5 },
  { name:'Anna Becker',     region:'🇩🇪 DE', cells:6,  placements:29, retention:90, quality:8.5, succession:8.3, overall:8.4 },
  { name:'Lan Nguyen',      region:'🇻🇳 VN', cells:5,  placements:24, retention:86, quality:8.3, succession:8.1, overall:8.2 },
  { name:'Ivan Volkov',     region:'🇷🇺 RU', cells:4,  placements:20, retention:84, quality:8.1, succession:7.9, overall:8.0 },
  { name:'Bach Nguyen (You)',region:'🇻🇳 VN', cells:3, placements:14, retention:82, quality:7.9, succession:7.7, overall:7.8, isUser:true },
  { name:'Hien Le',         region:'🇻🇳 VN', cells:2,  placements:10, retention:80, quality:7.7, succession:7.5, overall:7.6 },
]

const MY_CELLS = [
  { id: 'VN-01', region: 'Hanoi, Vietnam', students: 6, facilitator: 'Phuong V.', week: 7, health: 92, status: 'active', regPaid: true, lessonShare: 1200000, regShare: 1200000 },
  { id: 'VN-03', region: 'Ho Chi Minh City', students: 6, facilitator: 'Linh T.', week: 3, health: 74, status: 'active', regPaid: true, lessonShare: 480000, regShare: 1200000 },
  { id: 'VN-05', region: 'Da Nang, Vietnam', students: 4, facilitator: 'Pending', week: 0, health: 0, status: 'draft', regPaid: false, lessonShare: 0, regShare: 0 },
]

// Blueprint: 30% of cell tuition in 3 tranches + 50% of registration fee
// Cell tuition = 24,000,000 VND → 30% = 7,200,000 VND total
// Reg fee per student = 1,000,000 VND × 6 = 6,000,000 → 50% = 3,000,000 VND
const EARN_RULES = [
  {
    icon: '📋',
    label: 'Registration fee share (50%)',
    timing: '50% upfront on onboarding · 50% after programme (month 3)',
    vnd: '3,000,000',
    breakdown: '50% now: 1,500,000 · 50% at close: 1,500,000',
    note: '6 students × 1,000,000 VND reg fee × 50%',
    color: '#72d0ff',
  },
  {
    icon: '🚀',
    label: 'Tuition share — Tranche 1 (33%)',
    timing: 'On cell launch',
    vnd: '2,376,000',
    breakdown: '33% of 30% of 24,000,000 VND tuition',
    note: 'Paid when cell launches with 6 confirmed students',
    color: '#4de8b0',
  },
  {
    icon: '✅',
    label: 'Tuition share — Tranche 2 (33%)',
    timing: 'After 1 month stability confirmed',
    vnd: '2,376,000',
    breakdown: '33% of 30% of 24,000,000 VND tuition',
    note: 'Requires: consistent attendance + healthy participation + no ethical flags',
    color: '#d2ad44',
  },
  {
    icon: '🏁',
    label: 'Tuition share — Tranche 3 (34%)',
    timing: 'After month 2 (week 8)',
    vnd: '2,448,000',
    breakdown: '34% of 30% of 24,000,000 VND tuition',
    note: 'Requires: reusable output produced + growth confirmed',
    color: '#b083ff',
  },
]

const STABILITY_CRITERIA = [
  { icon: '📅', label: 'Consistent attendance', desc: 'All 6 students attending at least 80% of sessions' },
  { icon: '💬', label: 'Healthy participation', desc: 'Active engagement measured by facilitator weekly report' },
  { icon: '🛡️', label: 'No ethical flags', desc: 'No pressure, coercion, or consent anomalies detected' },
  { icon: '📤', label: 'Reusable output produced', desc: 'At least one lesson clip submitted to Content Engine' },
]

const ETHICS_RULES = [
  'You do not teach. You do not handle cash directly.',
  'You do not pressure families. Consent must be genuine.',
  'You earn on quality, not volume. Rushed cells lose tranche 2 and 3.',
  'You cannot see student identities, recordings, or individual performance.',
  'Happy connectors create stable cells. Stable cells create happy sponsors.',
]

function CellStatusBadge({ status }) {
  const map = { active: ['● Active', '#4de8b0'], draft: ['○ Draft', '#72d0ff'], completing: ['◐ Completing', '#d2ad44'] }
  const [label, color] = map[status] || ['Unknown', '#b4c8e6']
  return <span style={{ color, fontWeight: 700, fontSize: '0.8rem' }}>{label}</span>
}

export default function ConnectorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [formStep, setFormStep] = useState(1)
  const [showOnboarding, setShowOnboarding] = useState(true)

  const totalEarned = MY_CELLS.filter(c => c.status === 'active').reduce((sum, c) => sum + c.lessonShare + c.regShare, 0)
  const pendingEarn = 3600000 // VN-05 potential

  const topActions = (<><button className="btn btn-primary" onClick={()=>setActiveTab('cells')}>+ Register Cell</button><button className="btn btn-secondary">Download Report</button></>)
  return (
    <DashboardShell role="connector" activeTab={activeTab} onTabChange={setActiveTab}
      title="Connector Dashboard" subtitle="Build learning groups · Earn from growth" actions={topActions}>
      {showOnboarding && <OnboardingBanner role="connector" onDismiss={()=>setShowOnboarding(false)}/>}
      <div className="db-page-header connector-header">
        <div className="db-header-inner">
          <div>
            <p className="kicker">Connector Dashboard</p>
            <h1 className="db-title">🔗 Connector Command Centre</h1>
            <p className="db-subtitle">Form cells · Support families · Earn on quality — Vietnam</p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-primary" onClick={() => { setActiveTab('form'); setFormStep(1) }}>+ Form New Cell</button>
          </div>
        </div>
        <div className="db-stats-row">
          <div className="db-stat-card" style={{ '--stat-color': '#ff9f5a' }}>
            <span className="db-stat-icon">🏫</span>
            <div><p className="db-stat-value">3</p><p className="db-stat-label">Cells Formed</p><p className="db-stat-sub">2 active · 1 draft</p></div>
          </div>
          <div className="db-stat-card" style={{ '--stat-color': '#4de8b0' }}>
            <span className="db-stat-icon">👥</span>
            <div><p className="db-stat-value">14</p><p className="db-stat-label">Students Enrolled</p><p className="db-stat-sub">Across active cells</p></div>
          </div>
          <div className="db-stat-card" style={{ '--stat-color': '#d2ad44' }}>
            <span className="db-stat-icon">💰</span>
            <div><p className="db-stat-value">{(totalEarned/1000000).toFixed(1)}M</p><p className="db-stat-label">VND Earned</p><p className="db-stat-sub">Registration + lesson share</p></div>
          </div>
          <div className="db-stat-card" style={{ '--stat-color': '#72d0ff' }}>
            <span className="db-stat-icon">⏳</span>
            <div><p className="db-stat-value">{(pendingEarn/1000000).toFixed(1)}M</p><p className="db-stat-label">VND Pending</p><p className="db-stat-sub">On VN-05 activation</p></div>
          </div>
        </div>
      </div>

      <div className="db-tabs">
        {[['overview','🔭 Overview'],['cells','🏫 My Cells'],['earnings','💰 Earnings'],['rankings','🏆 Rankings'],['form','➕ Form Cell'],['ethics','⚖️ Ethics Rules']].map(([id,label])=>(
          <button key={id} className={`db-tab${activeTab===id?' active':''}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>

      <div className="db-content">

        {activeTab === 'overview' && (
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">📋 Action Items</h3>
                <div className="action-item-list">
                  {[
                    { icon: '⚠️', text: 'VN-05 — Missing facilitator assignment. Cell cannot activate without one.', urgent: true },
                    { icon: '✅', text: 'VN-01 — Stability confirmed. Second lesson payout (1,200,000 VND) ready to claim.', urgent: false },
                    { icon: '📝', text: 'VN-03 — Attendance at 82%. Monitor closely for stability confirmation.', urgent: false },
                  ].map((item, i) => (
                    <div key={i} className={`action-item${item.urgent ? ' urgent' : ''}`}>
                      <span>{item.icon}</span>
                      <p style={{ flex: 1, margin: 0 }}>{item.text}</p>
                      <button className="btn btn-secondary btn-sm">View</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">💡 How You Earn</h3>
                <div className="earn-list">
                  {EARN_RULES.map(r => (
                    <div className="earn-row" key={r.label}>
                      <span className="earn-icon">{r.icon}</span>
                      <div style={{ flex: 1 }}>
                        <span className="earn-label">{r.label}</span>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', margin: '0.15rem 0 0' }}>{r.timing} · {r.note}</p>
                      </div>
                      <span style={{ color: '#d2ad44', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{r.vnd} VND</span>
                    </div>
                  ))}
                </div>
                <div className="earn-row" style={{ marginTop: '1rem', borderTop: '1px solid var(--border-soft)', paddingTop: '1rem' }}>
                  <span className="earn-label" style={{ fontWeight: 700 }}>Total per cell (full cycle)</span>
                  <span style={{ color: '#d2ad44', fontWeight: 800, fontSize: '1rem' }}>3,600,000 VND</span>
                </div>
              </div>
            </div>

            <div className="db-panel" style={{ marginTop: '1.5rem' }}>
              <h3 className="db-panel-title">🌍 Your Cell Map</h3>
              <div className="cell-map-list">
                {MY_CELLS.map(cell => {
                  const hc = cell.health >= 80 ? '#4de8b0' : cell.health >= 60 ? '#d2ad44' : '#ff6b9d'
                  return (
                    <div key={cell.id} className="cell-map-row">
                      <strong className="chc-id">{cell.id}</strong>
                      <span>{cell.region}</span>
                      <span>👥 {cell.students} students</span>
                      <span>🧭 {cell.facilitator}</span>
                      <div className="sp-bar-track" style={{ flex: 1, minWidth: 80 }}>
                        <div className="sp-bar-fill" style={{ width: `${(cell.week/12)*100}%`, background: hc }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-soft)' }}>Wk {cell.week}/12</span>
                      <CellStatusBadge status={cell.status} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cells' && (
          <div className="db-tab-content">
            {MY_CELLS.map(cell => {
              const hc = cell.health >= 80 ? '#4de8b0' : cell.health >= 60 ? '#d2ad44' : '#b4c8e6'
              return (
                <div key={cell.id} className="db-panel" style={{ marginBottom: '1.2rem', borderColor: hc }}>
                  <div className="db-panel-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <h3 className="db-panel-title" style={{ margin: 0 }}>{cell.id} — {cell.region}</h3>
                      <CellStatusBadge status={cell.status} />
                    </div>
                    <button className="btn btn-secondary btn-sm">Manage</button>
                  </div>
                  <div className="two-col-grid">
                    <div className="cell-info-block">
                      {[['Students', cell.students], ['Facilitator', cell.facilitator], ['Cycle Week', `${cell.week} / 12`], ['Health Score', cell.health || 'N/A'], ['Reg Paid', cell.regPaid ? '✅ Yes' : '❌ Pending']].map(([k,v]) => (
                        <div className="cell-info-row" key={k}><span>{k}</span><strong>{v}</strong></div>
                      ))}
                    </div>
                    <div>
                      <p className="db-panel-title">Earnings for this cell</p>
                      <div className="cell-info-block">
                        {[['Registration share', `${(cell.regShare/1000).toFixed(0)}k VND`], ['Lesson share earned', `${(cell.lessonShare/1000).toFixed(0)}k VND`], ['Pending stability payout', cell.status === 'active' && cell.week < 6 ? '1,200k VND' : cell.week >= 6 ? '✅ Released' : 'N/A']].map(([k,v]) => (
                          <div className="cell-info-row" key={k}><span>{k}</span><strong style={{ color: '#d2ad44' }}>{v}</strong></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {cell.status !== 'draft' && (
                    <div style={{ marginTop: '1rem' }}>
                      <div className="sp-bar-track"><div className="sp-bar-fill" style={{ width: `${(cell.week/12)*100}%`, background: hc }} /></div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', marginTop: '0.3rem' }}>Cycle progress: Week {cell.week} of 12</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="db-tab-content">

            {/* Blueprint payout model */}
            <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
              <h3 className="db-panel-title">💰 How You Earn — Per Cell</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Per cell of 6 students · One 12-week cycle · 24,000,000 VND tuition
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {EARN_RULES.map(rule => (
                  <div key={rule.label} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.1rem', background: 'var(--bg-card-alt)', borderRadius: '12px', borderLeft: `4px solid ${rule.color}`, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{rule.icon}</span>
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '0.2rem' }}>{rule.label}</strong>
                      <span style={{ fontSize: '0.75rem', color: rule.color, fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>Timing: {rule.timing}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{rule.note}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <strong style={{ color: '#d2ad44', fontSize: '1rem', display: 'block' }}>{rule.vnd} VND</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{rule.breakdown}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem', padding: '0.85rem 1.1rem', background: 'var(--gold-pale)', border: '1px solid var(--gold)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--navy)' }}>Total per cell (full cycle)</strong>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '1.4rem', color: '#a8843e', display: 'block' }}>10,200,000 VND</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reg: 3,000,000 + Tuition: 7,200,000</span>
                </div>
              </div>
            </div>

            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">✅ Stability Criteria (Tranche 2 & 3)</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>These must be met to unlock tranches 2 and 3. The system auto-checks weekly.</p>
                {STABILITY_CRITERIA.map(s => (
                  <div key={s.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid var(--bg-card-alt)' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem', color: 'var(--navy)' }}>{s.label}</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-soft)' }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">📅 Payout Timeline — My Cells</h3>
                <div className="milestone-list">
                  {[
                    { icon: '✅', label: 'VN-01 — Reg share (50% upfront)', amount: '1,500k', date: 'Mar 1', type: 'milestone' },
                    { icon: '✅', label: 'VN-01 — Tranche 1 (cell launch)', amount: '2,376k', date: 'Mar 8', type: 'milestone' },
                    { icon: '✅', label: 'VN-03 — Reg share (50% upfront)', amount: '1,500k', date: 'Mar 20', type: 'milestone' },
                    { icon: '✅', label: 'VN-03 — Tranche 1 (cell launch)', amount: '2,376k', date: 'Mar 28', type: 'milestone' },
                    { icon: '⏳', label: 'VN-01 — Tranche 2 (stability ✓)', amount: '2,376k', date: 'Apr 12 est.', type: 'review' },
                    { icon: '⏳', label: 'VN-03 — Tranche 2 (stability ✓)', amount: '2,376k', date: 'Apr 28 est.', type: 'review' },
                    { icon: '🔒', label: 'VN-01 — Tranche 3 (week 8)', amount: '2,448k', date: 'May 10 est.', type: 'task' },
                    { icon: '🔒', label: 'VN-05 — All payouts', amount: '10,200k', date: 'Pending launch', type: 'unlock' },
                  ].map((m, i) => (
                    <div key={i} className="milestone-row">
                      <span className={`milestone-dot ${m.type}`}/>
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: '0.83rem' }}>{m.icon} {m.label}</strong>
                        <span className="milestone-date" style={{ display: 'block' }}>{m.date}</span>
                      </div>
                      <span style={{ color: '#d2ad44', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>{m.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'form' && (
          <div className="db-tab-content">
            <div className="db-panel" style={{ maxWidth: 640 }}>
              <h3 className="db-panel-title">➕ Form a New Learning Cell</h3>
              <div className="form-steps">
                {['Identify Students','Confirm Consent','Assign Facilitator','Submit for Approval'].map((s,i)=>(
                  <div key={s} className={`form-step-dot ${formStep===i+1?'active':formStep>i+1?'done':''}`}>
                    <span>{formStep>i+1?'✓':i+1}</span><p>{s}</p>
                  </div>
                ))}
              </div>

              {formStep === 1 && (
                <div className="session-builder">
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '1rem' }}>A Learning Cell requires exactly 6 students. Add their details below. Student identities are kept private — only parents can link identities.</p>
                  {[1,2,3,4,5,6].map(n => (
                    <div key={n} className="sb-field">
                      <label>Student {n} — Avatar Name</label>
                      <input className="sb-input" placeholder={`e.g. StarFox_0${n}`} />
                    </div>
                  ))}
                  <div className="sb-field">
                    <label>Region</label>
                    <select className="sb-select">
                      <option>Hanoi, Vietnam</option><option>Ho Chi Minh City</option><option>Da Nang</option><option>Moscow, Russia</option><option>Berlin, Germany</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={() => setFormStep(2)}>Next → Confirm Consent</button>
                </div>
              )}

              {formStep === 2 && (
                <div className="session-builder">
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '1rem' }}>Each parent must confirm consent. Students are never pressured. Families owe nothing to sponsors.</p>
                  {[1,2,3,4,5].map(n => (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <input type="checkbox" style={{ accentColor: '#4de8b0', width: 16, height: 16 }} />
                      <span style={{ fontSize: '0.86rem' }}>Student {n} parent consent confirmed</span>
                    </div>
                  ))}
                  <div className="sb-field" style={{ marginTop: '1rem' }}>
                    <label>Registration fee status</label>
                    <select className="sb-select">
                      <option>Paid by families (2% = 480,000 VND × 5)</option>
                      <option>Covered by sponsor</option>
                      <option>Scholarship (pending approval)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(1)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setFormStep(3)}>Next → Assign Facilitator</button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="session-builder">
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '1rem' }}>Assign an approved facilitator to this cell. The cell cannot activate without one.</p>
                  <div className="sb-field">
                    <label>Facilitator</label>
                    <select className="sb-select">
                      <option>Phuong V. (approved · VN)</option>
                      <option>Linh T. (approved · VN)</option>
                      <option>Request new facilitator</option>
                    </select>
                  </div>
                  <div className="sb-field">
                    <label>Preferred session days</label>
                    <div className="stream-checkboxes">
                      {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map(d => (
                        <label key={d} className="stream-check-label"><input type="checkbox"/> {d}</label>
                      ))}
                    </div>
                  </div>
                  <div className="sb-field">
                    <label>Preferred session time</label>
                    <select className="sb-select">
                      <option>4:00 PM – 5:00 PM</option><option>5:00 PM – 6:00 PM</option><option>6:00 PM – 7:00 PM</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(2)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setFormStep(4)}>Next → Review & Submit</button>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div className="session-builder">
                  <div style={{ background: 'rgba(77,232,176,0.08)', border: '1px solid rgba(77,232,176,0.3)', borderRadius: 'var(--radius-sm)', padding: '1.2rem', marginBottom: '1.2rem' }}>
                    <strong style={{ color: '#4de8b0', display: 'block', marginBottom: '0.5rem' }}>✅ Cell Ready for Submission</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', margin: 0 }}>5 students · Consent confirmed · Facilitator assigned · Registration paid</p>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '1.2rem' }}>By submitting, you confirm that all families have given genuine consent and no pressure was applied. Your registration share (1,200,000 VND) will be released upon approval.</p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(3)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setFormStep(1)}>Submit Cell for Approval</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="db-tab-content">
            {/* Header */}
            <div className="rankings-header" style={{marginBottom:'1.5rem'}}>
              <div>
                <h2 className="rankings-title">🏆 Connector Rankings</h2>
                <p className="rankings-sub">Your placement quality and cell health determine your score — not volume alone.</p>
              </div>
              <div className="rankings-meta">
                <span className="rankings-badge">🔗 87 <span>CONNECTORS ACTIVE</span></span>
                <span className="rankings-badge">🏫 210 <span>CELLS FORMED</span></span>
                <span className="rankings-cycle">Cycle: April – May 2026</span>
              </div>
            </div>

            <div className="connector-rankings-layout">
              {/* Main table */}
              <div className="db-panel" style={{padding:0,overflow:'hidden'}}>
                <div className="conn-rank-table-head">
                  <span>Rank</span>
                  <span>Connector</span>
                  <span>Region</span>
                  <span>Cells</span>
                  <span title="Placements made">Placed</span>
                  <span title="Cell retention %">Retention</span>
                  <span>Overall</span>
                </div>
                {CONNECTOR_RANKINGS.map((r, i) => {
                  const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':null
                  const sc = r.overall >= 9?'#4de8b0': r.overall >= 8.5?'#d2ad44': r.overall >= 8?'#72d0ff':'#b4c8e6'
                  return (
                    <div key={r.name} className={`conn-rank-row${r.isUser?' is-user':''}`}>
                      <span className="rank-num">{medal || `#${i+1}`}</span>
                      <span className="rank-sponsor">
                        <span className="rank-sponsor-logo" style={{fontSize:'0.75rem',fontWeight:700}}>{r.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</span>
                        <span>{r.name}</span>
                        {r.isUser && <span className="rank-you-badge">YOU</span>}
                      </span>
                      <span style={{fontSize:'0.82rem',color:'var(--text-soft)'}}>{r.region}</span>
                      <span className="rank-cells">{r.cells} <small>cells</small></span>
                      <span className="rank-score">{r.placements}</span>
                      <span className="rank-score">{r.retention}%</span>
                      <span className="rank-overall" style={{color:sc,background:`${sc}18`}}>{r.overall}</span>
                    </div>
                  )
                })}
                <div className="rankings-legend">
                  <span>🏫 Cells Formed</span>
                  <span>👥 Placements</span>
                  <span>📈 Retention</span>
                  <p>Rankings update every Monday. Scores are calculated from cell health, student retention, and succession rates — not self-reported.</p>
                </div>
              </div>

              {/* Sidebar */}
              <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div className="db-panel">
                  <h3 className="db-panel-title">📊 Your Performance</h3>
                  {[
                    ['Rank','#8 of 87','up from #12'],
                    ['Cells Active','3','2 healthy · 1 pending'],
                    ['Avg Retention','82%','Network avg: 88%'],
                    ['Quality Score','7.9','Target: 8.5'],
                    ['Succession Rate','7.7','SGs from your cells'],
                  ].map(([k,v,note])=>(
                    <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'0.5rem 0',borderBottom:'1px solid var(--bg-card-alt)'}}>
                      <div><span style={{fontSize:'0.84rem',color:'var(--text-soft)'}}>{k}</span><p style={{margin:0,fontSize:'0.72rem',color:'var(--text-muted)'}}>{note}</p></div>
                      <strong style={{color:'var(--navy)',fontSize:'0.9rem'}}>{v}</strong>
                    </div>
                  ))}
                </div>

                <div className="db-panel">
                  <h3 className="db-panel-title">🚀 Climb the Rankings</h3>
                  <p style={{fontSize:'0.8rem',color:'var(--text-soft)',marginBottom:'1rem',lineHeight:1.55}}>The fastest way to move up is retention — keep your students engaged for the full 12 weeks.</p>
                  <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                    {[
                      {icon:'🏫',action:'Form 1 more cell',impact:'+0.3 overall'},
                      {icon:'📈',action:'Raise VN-03 retention above 88%',impact:'+0.2 score'},
                      {icon:'⬆️',action:'Get 1 student to SG level',impact:'+0.4 succession'},
                    ].map(a=>(
                      <div key={a.action} style={{display:'flex',gap:'0.6rem',padding:'0.6rem',background:'var(--blue-pale)',borderRadius:'8px',border:'1px solid var(--border)'}}>
                        <span style={{fontSize:'1rem'}}>{a.icon}</span>
                        <div style={{flex:1}}>
                          <span style={{fontSize:'0.82rem',fontWeight:600,color:'var(--navy)'}}>{a.action}</span>
                          <p style={{margin:0,fontSize:'0.72rem',color:'var(--blue)',marginTop:'0.1rem'}}>{a.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary" style={{width:'100%',marginTop:'1rem'}} onClick={()=>{}}>+ Form New Cell</button>
                </div>

                <div className="db-panel">
                  <h3 className="db-panel-title">🏅 How Scores Work</h3>
                  {[
                    ['Cell Quality','Session health, attendance, rep counts'],
                    ['Placements','Students enrolled and onboarded'],
                    ['Retention','Students completing full 12-week cycle'],
                    ['Succession','SGs developed from your cells'],
                  ].map(([k,v])=>(
                    <div key={k} style={{padding:'0.4rem 0',borderBottom:'1px solid var(--bg-card-alt)'}}>
                      <strong style={{fontSize:'0.82rem',color:'var(--navy)'}}>{k}</strong>
                      <p style={{margin:0,fontSize:'0.75rem',color:'var(--text-soft)'}}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ethics' && (
          <div className="db-tab-content">
            <div className="db-panel" style={{ maxWidth: 680 }}>
              <h3 className="db-panel-title">⚖️ Connector Ethics — Non-Negotiable</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {ETHICS_RULES.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
                    <span style={{ color: '#d2ad44', fontWeight: 700 }}>{i + 1}.</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(210,173,68,0.08)', border: '1px solid rgba(210,173,68,0.3)', borderRadius: 'var(--radius-sm)', padding: '1.2rem' }}>
                <strong style={{ color: 'var(--gold-300)', display: 'block', marginBottom: '0.4rem' }}>Connector Vitality Principle</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', margin: 0 }}>Connectors are emotional infrastructure. Their motivation, clarity, and sense of value directly affect system stability, cell quality, and sponsor confidence. The platform protects connectors the same way it protects students.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardShell>
  )
}
