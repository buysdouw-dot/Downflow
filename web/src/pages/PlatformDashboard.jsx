import { useState, useEffect } from 'react'
import { useToast } from '../components/Toast.jsx'
import { getCells, getSystemStats, getAllSponsorships } from '../services/api.js'
import AIAssistant from '../components/AIAssistant.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const SYSTEM_STATS = [
  { icon: '🏫', value: '7', label: 'Active Cells', sub: '3 VN · 3 DE · 1 RU', color: '#4de8b0' },
  { icon: '👥', value: '35', label: 'Students', sub: 'Across all regions', color: '#72d0ff' },
  { icon: '🔗', value: '4', label: 'Connectors', sub: '3 VN · 1 DE', color: '#ff9f5a' },
  { icon: '🧭', value: '6', label: 'Facilitators', sub: '4 VN · 1 DE · 1 RU', color: '#b083ff' },
  { icon: '🏦', value: '3', label: 'Active Sponsors', sub: '2 corporate · 1 individual', color: '#d2ad44' },
  { icon: '⚠️', value: '2', label: 'System Alerts', sub: 'Require review', color: '#ff6b9d' },
]

const ALERTS = [
  { id: 1, type: 'participation', cell: 'VN-03', msg: 'Participation drop detected — 3 of 6 students below threshold this week.', urgent: true, action: 'Freeze Rankings' },
  { id: 2, type: 'connector', cell: 'DE-01', msg: 'Connector submitted cell with only 4 students. Requires approval or correction.', urgent: false, action: 'Review Cell' },
]

const ALL_CELLS = [
  { id: 'VN-01', region: '🇻🇳 Hanoi', week: 7, health: 92, sponsor: 'TechCorp VN', status: 'active' },
  { id: 'VN-02', region: '🇻🇳 HCMC', week: 3, health: 74, sponsor: 'TechCorp VN', status: 'active' },
  { id: 'VN-03', region: '🇻🇳 Da Nang', week: 5, health: 58, sponsor: 'Unassigned', status: 'flagged' },
  { id: 'DE-01', region: '🇩🇪 Berlin', week: 11, health: 88, sponsor: 'GlobalEd DE', status: 'completing' },
  { id: 'DE-02', region: '🇩🇪 Hamburg', week: 2, health: 65, sponsor: 'GlobalEd DE', status: 'active' },
  { id: 'DE-03', region: '🇩🇪 Munich', week: 0, health: 0, sponsor: 'Pending', status: 'draft' },
  { id: 'RU-01', region: '🇷🇺 Moscow', week: 1, health: 70, sponsor: 'Individual', status: 'active' },
]

const SPONSORS = [
  { name: 'TechCorp Vietnam', cells: 2, students: 10, impact: 84, tier: '2-Cell Partner', status: 'active' },
  { name: 'GlobalEd Germany', cells: 2, students: 10, impact: 78, tier: '2-Cell Partner', status: 'active' },
  { name: 'Individual Sponsor', cells: 1, students: 5, impact: 70, tier: '1-Cell Partner', status: 'active' },
]


export default function PlatformDashboard() {
  usePageMeta("Platform Admin", "Global oversight - approve sponsors, monitor ethics, manage regions and AI tools.")

  const toast = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [paused, setPaused] = useState([])
  const [cells, setCells] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getCells().then(d => { if(d?.length) setCells(d) }).catch(() => toast?.('Failed to load cells', 'error'))
    getSystemStats().then(d => { if(d) setStats(d) }).catch(() => {})
  }, [])

  const togglePause = (id) => setPaused(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const topActions = (
    <>
      <button className="btn btn-primary" onClick={()=>setActiveTab('sponsors')}>+ Approve Sponsor</button>
      <button className="btn btn-secondary" onClick={()=>setActiveTab('regions')}>System Report</button>
    </>
  )

  return (
    <DashboardShell role="platform" activeTab={activeTab} onTabChange={setActiveTab}
      title="Platform Command Centre" subtitle="System governance · Ethics enforcement · Global oversight"
      actions={topActions}>
      <div className="db-content">

        {activeTab === 'overview' && (
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🚨 System Alerts</h3>
                <div className="action-item-list">
                  {ALERTS.map(alert => (
                    <div key={alert.id} className={`action-item${alert.urgent?' urgent':''}`}>
                      <span>{alert.urgent ? '🔴' : '🟡'}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '0.86rem' }}><strong>{alert.cell}</strong> — {alert.msg}</p>
                      </div>
                      <button className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>{alert.action}</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">📊 System Health by Region</h3>
                <div className="cycle-bars">
                  {[['🇻🇳 Vietnam', 3, 74], ['🇩🇪 Germany', 2, 82], ['🇷🇺 Russia', 1, 70]].map(([r, cells, avg]) => (
                    <div key={r} className="cycle-bar-row">
                      <span className="cycle-bar-label">{r} · {cells} cells</span>
                      <div className="cycle-bar-track">
                        <div className="cycle-bar-fill" style={{ width: `${avg}%`, background: avg >= 80 ? '#4de8b0' : '#d2ad44' }} />
                      </div>
                      <span className="cycle-bar-pct">{avg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="two-col-grid" style={{ marginTop: '1.5rem' }}>
              <div className="db-panel">
                <h3 className="db-panel-title">🏆 Sponsor Leaderboard (Live)</h3>
                <div className="rep-leaderboard">
                  {SPONSORS.map((s, i) => (
                    <div className="rep-row" key={s.name}>
                      <span className="rep-rank" style={{ color: i === 0 ? '#d2ad44' : i === 1 ? '#b4c8e6' : '#cd7f32' }}>#{i + 1}</span>
                      <span className="rep-name">{s.name}</span>
                      <span className="rep-cell-tag">{s.tier}</span>
                      <span style={{ color: '#4de8b0', fontWeight: 700, fontSize: '0.82rem' }}>Impact {s.impact}</span>
                    </div>
                  ))}
                </div>
                <p className="db-sub-note">Rankings visible publicly. No student data shown.</p>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">💰 Value Flow Summary</h3>
                <div className="cell-info-block">
                  {[
                    ['Total VND circulating', stats ? (stats.totalVNDCirculating?.toLocaleString() + ' VND') : '33,600,000 VND'],
                    ['Active cells', stats ? (stats.activeCells + ' / ' + stats.totalCells) : '3 / 4'],
                    ['Total students', stats ? String(stats.totalStudents) : '20'],
                    ['Total facilitators', stats ? String(stats.totalFacilitators) : '2'],
                    ['Open alerts', stats ? String(stats.alertsOpen) : '1'],
                    ['Connectors', stats ? String(stats.totalConnectors) : '2'],
                  ].map(([k, v]) => (
                    <div key={k} className="cell-info-row">
                      <span>{k}</span>
                      <strong style={{ color: '#d2ad44' }}>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cells' && (
          <div className="db-tab-content">
            <div className="db-panel">
              <div className="db-panel-header">
                <h3 className="db-panel-title">🏫 All Learning Cells — Global</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary btn-sm">Export</button>
                </div>
              </div>
              <div className="cells-table">
                <div className="cells-table-head">
                  <span>Cell</span><span>Region</span><span>Sponsor</span><span>Week</span><span>Health</span><span>Status</span><span>Action</span>
                </div>
                {ALL_CELLS.map(cell => {
                  const hc = cell.health >= 80 ? '#4de8b0' : cell.health >= 60 ? '#d2ad44' : '#ff6b9d'
                  const isPaused = paused.includes(cell.id)
                  return (
                    <div className="cell-row" key={cell.id} style={{ gridTemplateColumns: '70px 1fr 1fr 60px 120px 100px 100px' }}>
                      <span className="cell-id">{cell.id}</span>
                      <span style={{ fontSize: '0.84rem' }}>{cell.region}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-soft)' }}>{cell.sponsor}</span>
                      <span style={{ fontSize: '0.82rem' }}>{cell.week}/12</span>
                      <div>
                        <div className="progress-track"><div className="progress-fill" style={{ width: `${cell.health}%`, background: hc }} /></div>
                        <span style={{ fontSize: '0.72rem', color: hc }}>{cell.health || 'N/A'}</span>
                      </div>
                      <span style={{ color: cell.status === 'flagged' ? '#ff6b9d' : cell.status === 'completing' ? '#d2ad44' : hc, fontSize: '0.78rem', fontWeight: 700 }}>
                        {cell.status === 'active' ? '● Active' : cell.status === 'flagged' ? '⚠ Flagged' : cell.status === 'completing' ? '◐ Completing' : cell.status === 'draft' ? '○ Draft' : cell.status}
                      </span>
                      <button className={`btn btn-sm ${isPaused ? 'btn-done' : 'btn-secondary'}`} onClick={() => togglePause(cell.id)}>
                        {isPaused ? '▶ Resume' : '⏸ Pause'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sponsors' && (
          <div className="db-tab-content">
            <div className="db-panel">
              <div className="db-panel-header">
                <h3 className="db-panel-title">🏦 Sponsor Registry</h3>
                <button className="btn btn-primary btn-sm">+ Approve New Sponsor</button>
              </div>
              <div className="sg-cards-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                {SPONSORS.map(s => (
                  <div key={s.name} className="sg-card">
                    <div className="sg-card-header">
                      <span style={{ fontSize: '2rem' }}>🏦</span>
                      <div>
                        <strong style={{ display: 'block' }}>{s.name}</strong>
                        <span className="sg-level-badge">{s.tier}</span>
                      </div>
                    </div>
                    <div className="sg-metrics">
                      <div><span>Cells</span><strong>{s.cells}</strong></div>
                      <div><span>Students</span><strong>{s.students}</strong></div>
                      <div><span>Impact</span><strong style={{ color: '#4de8b0' }}>{s.impact}</strong></div>
                    </div>
                    <div className="sp-bar-track" style={{ marginTop: '0.75rem' }}>
                      <div className="sp-bar-fill" style={{ width: `${s.impact}%`, background: '#d2ad44' }} />
                    </div>
                    <div className="sg-actions" style={{ marginTop: '1rem' }}>
                      <button className="btn btn-secondary btn-sm">View Dashboard</button>
                      <button className="btn btn-secondary btn-sm">Send Report</button>
                    </div>
                    <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-soft)', borderTop: '1px solid var(--border-soft)', paddingTop: '0.6rem' }}>
                      ✅ Never visible inside classrooms · Student data: 0
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-panel" style={{ marginTop: '1.5rem' }}>
              <h3 className="db-panel-title">🚫 Sponsor Boundary Enforcement (Automatic)</h3>
              <div className="guarantee-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                {[
                  ['🔒', 'No classroom access', 'Sponsors cannot enter, view, or communicate with any learning session.'],
                  ['👤', 'Zero student data', 'No names, avatars, performance scores, or recordings are shared with sponsors.'],
                  ['⚖️', 'Compete on impact only', 'Sponsors rank by cell-level growth, output reuse, and succession — never by individual outcomes.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="guarantee-item">
                    <span className="gi-icon">{icon}</span>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connectors' && (
          <div className="db-tab-content">
            <div className="db-panel">
              <h3 className="db-panel-title">🔗 Connector Overview</h3>
              <div className="sg-cards-grid">
                {[
                  { name: 'Nguyen T.H.', region: '🇻🇳 Vietnam', cells: 2, students: 10, earned: 7200, status: 'active' },
                  { name: 'Tran M.L.', region: '🇻🇳 Vietnam', cells: 1, students: 4, earned: 2400, status: 'forming' },
                  { name: 'Klaus B.', region: '🇩🇪 Germany', cells: 1, students: 0, earned: 1200, status: 'draft' },
                  { name: 'Open', region: '🇷🇺 Russia', cells: 0, students: 0, earned: 0, status: 'recruiting' },
                ].map(c => (
                  <div key={c.name} className="sg-card">
                    <div className="sg-card-header">
                      <span style={{ fontSize: '1.8rem' }}>🔗</span>
                      <div>
                        <strong>{c.name}</strong>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', margin: '0.2rem 0 0' }}>{c.region}</p>
                      </div>
                    </div>
                    <div className="sg-metrics">
                      <div><span>Cells</span><strong>{c.cells}</strong></div>
                      <div><span>Students</span><strong>{c.students}</strong></div>
                      <div><span>Earned</span><strong style={{ color: '#d2ad44' }}>{(c.earned/1000).toFixed(0)}k</strong></div>
                    </div>
                    <div className="sg-actions" style={{ marginTop: '0.75rem' }}>
                      <button className="btn btn-secondary btn-sm">View</button>
                      {c.status === 'recruiting' && <button className="btn btn-primary btn-sm">Recruit</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ethics' && (
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🛡️ Ethical Engine — Auto-Monitoring</h3>
                <div className="action-item-list">
                  {[
                    { label: 'Overwork / burnout spike detection', status: 'running', icon: '✅' },
                    { label: 'Unequal participation flag', status: 'running', icon: '✅' },
                    { label: 'Sponsor over-monitoring detection', status: 'running', icon: '✅' },
                    { label: 'Consent anomaly scanner', status: 'running', icon: '✅' },
                    { label: 'Payment pressure indicator', status: 'running', icon: '✅' },
                    { label: 'Connector pressure patterns', status: 'running', icon: '✅' },
                  ].map(item => (
                    <div key={item.label} className="action-item" style={{ padding: '0.7rem' }}>
                      <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                      <span style={{ flex: 1, fontSize: '0.85rem' }}>{item.label}</span>
                      <span style={{ color: '#4de8b0', fontSize: '0.75rem', fontWeight: 700 }}>ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">⏸ System Pause Controls</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>Pausing any layer freezes rankings, sponsorship visibility, and payments (except refunds). Use only when harm is detected.</p>
                {[
                  ['Pause a specific cell', 'btn-secondary'],
                  ['Pause a connector', 'btn-secondary'],
                  ['Pause a sponsor', 'btn-secondary'],
                  ['Pause entire region', 'btn-secondary'],
                  ['🔴 Emergency: Pause entire system', 'btn-secondary'],
                ].map(([label, cls]) => (
                  <button key={label} className={`btn ${cls}`} style={{ display: 'block', width: '100%', marginBottom: '0.6rem', textAlign: 'left', borderColor: label.includes('Emergency') ? '#ff6b9d' : undefined, color: label.includes('Emergency') ? '#ff6b9d' : undefined }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="db-panel" style={{ marginTop: '1.5rem' }}>
              <h3 className="db-panel-title">🔒 System Non-Negotiables (Always Enforced)</h3>
              <div className="guarantee-grid">
                {[
                  ['👤', 'No individual child data ever exposed', 'Student identities, scores, and recordings are never shared externally.'],
                  ['🚫', 'No sponsor visibility inside classrooms', 'Automatic enforcement. Cannot be overridden by any role.'],
                  ['⬆️', 'No upward pressure loops', 'Students never responsible for rankings, payments, or sponsor satisfaction.'],
                  ['⏸', 'System can pause at any layer', 'Any pressure signal triggers automatic ranking freeze and review.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="guarantee-item">
                    <span className="gi-icon">{icon}</span><strong>{title}</strong><p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regions' && (
          <div className="db-tab-content">
            <div className="regions-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {[
                { flag: '🇻🇳', name: 'Vietnam', status: 'active', cells: 3, students: 14, connectors: 2, facilitators: 3, note: 'Phase 1 live. Hanoi, HCMC, Da Nang active.' },
                { flag: '🇩🇪', name: 'Germany', status: 'active', cells: 2, students: 10, connectors: 1, facilitators: 2, note: 'Berlin + Hamburg. DE-03 Munich onboarding.' },
                { flag: '🇷🇺', name: 'Russia', status: 'pipeline', cells: 1, students: 5, connectors: 0, facilitators: 1, note: 'Moscow pilot. Connector recruitment open.' },
                { flag: '🌍', name: 'Global Open', status: 'open', cells: 0, students: 0, connectors: 0, facilitators: 0, note: 'Any region. Submit connector interest.' },
              ].map(r => (
                <div key={r.name} className={`region-card ${r.status}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="region-card-flag">{r.flag}</span>
                  <strong style={{ fontSize: '1.1rem' }}>{r.name}</strong>
                  <span className={`region-status-badge ${r.status}`}>{r.status === 'active' ? '● Active' : r.status === 'pipeline' ? '→ Pipeline' : '○ Open'}</span>
                  <div className="cell-info-block" style={{ marginTop: '0.5rem' }}>
                    {[['Cells', r.cells], ['Students', r.students], ['Connectors', r.connectors], ['Facilitators', r.facilitators]].map(([k, v]) => (
                      <div key={k} className="cell-info-row" style={{ padding: '0.3rem 0' }}><span style={{ fontSize: '0.8rem' }}>{k}</span><strong style={{ fontSize: '0.8rem' }}>{v}</strong></div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', margin: 0 }}>{r.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="db-tab-content">
            <p className="lead" style={{marginBottom:'1.5rem'}}>Generate session content, feedback prompts, and learning activities for any cell across all regions using the Antigravity AI engine.</p>
            <AIAssistant defaultTopic="Systems Thinking"/>
          </div>
        )}

      </div>
    </DashboardShell>
  )
}
