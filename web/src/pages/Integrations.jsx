import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

/* ═══════════════════════════════════════════════════════
   DOWNFLOW — Integrations Hub
   ClassDojo + Google Meet: per-cell configuration,
   join buttons, status, and architecture overview.
═══════════════════════════════════════════════════════ */

const DEMO_CELLS = [
  { id: 'VN-01', region: 'Hanoi 🇻🇳',   facilitator: 'Minh P.',  students: 8, week: 7,  status: 'active',     meetLink: 'https://meet.google.com/abc-defg-hij', dojoCode: 'STAR7X', nextSession: 'Today · 4:00 PM', pack: 'Voice & Presence' },
  { id: 'VN-02', region: 'HCMC 🇻🇳',    facilitator: 'Linh T.',  students: 7, week: 3,  status: 'active',     meetLink: 'https://meet.google.com/kln-mnop-qrs', dojoCode: 'MOON3K', nextSession: 'Tue · 5:00 PM',   pack: 'Kidinomics' },
  { id: 'VN-03', region: 'Da Nang 🇻🇳', facilitator: 'Hoa N.',   students: 6, week: 5,  status: 'flagged',    meetLink: 'https://meet.google.com/tuv-wxyz-123', dojoCode: 'WAVE2Q', nextSession: 'Wed · 3:30 PM',   pack: 'Social Systems' },
  { id: 'DE-01', region: 'Berlin 🇩🇪',   facilitator: 'Felix K.', students: 8, week: 11, status: 'completing', meetLink: 'https://meet.google.com/456-ghij-klm', dojoCode: 'SUN9P',  nextSession: 'Thu · 6:00 PM',   pack: 'Pencil Proof' },
]

const STATUS_COLOR = { active: '#38d9a9', flagged: '#f0c040', completing: '#5b9bd5' }
const STATUS_LABEL = { active: 'Active', flagged: 'Needs Attention', completing: 'Final Weeks' }

function CellIntegrationCard({ cell, onEditMeet, onEditDojo }) {
  const [meetCopied, setMeetCopied] = useState(false)
  const [dojoCopied, setDojoCopied] = useState(false)

  function copy(text, setter) {
    navigator.clipboard?.writeText(text).then(() => {
      setter(true); setTimeout(() => setter(false), 2000)
    })
  }

  return (
    <div className="int-cell-card" style={{ '--sc': STATUS_COLOR[cell.status] }}>
      <div className="int-cell-head">
        <div className="int-cell-id">{cell.id}</div>
        <div className="int-cell-info">
          <div className="int-cell-region">{cell.region} · {cell.facilitator}</div>
          <div className="int-cell-meta">{cell.students} students · Week {cell.week} · {cell.pack}</div>
        </div>
        <div className="int-cell-status" style={{ color: STATUS_COLOR[cell.status] }}>
          ● {STATUS_LABEL[cell.status]}
        </div>
      </div>

      <div className="int-cell-next">
        <span className="int-next-label">Next Session:</span>
        <span className="int-next-val">{cell.nextSession}</span>
      </div>

      <div className="int-cell-services">
        {/* Google Meet */}
        <div className="int-service-row int-meet-row">
          <div className="int-svc-icon meet-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 10.5L19.5 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
              <rect x="4" y="7.5" width="11" height="9" rx="2" fill="#00BCD4"/>
            </svg>
          </div>
          <div className="int-svc-info">
            <div className="int-svc-name">Google Meet</div>
            <div className="int-svc-link">{cell.meetLink.replace('https://', '')}</div>
          </div>
          <div className="int-svc-actions">
            <button className="int-btn-copy" onClick={() => copy(cell.meetLink, setMeetCopied)}>
              {meetCopied ? '✅' : '📋'}
            </button>
            <button className="int-btn-edit" onClick={() => onEditMeet(cell)}>✏️</button>
            <a className="int-btn-join meet-join" href={cell.meetLink} target="_blank" rel="noreferrer">
              Join →
            </a>
          </div>
        </div>

        {/* ClassDojo */}
        <div className="int-service-row int-dojo-row">
          <div className="int-svc-icon dojo-icon">
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
          </div>
          <div className="int-svc-info">
            <div className="int-svc-name">ClassDojo</div>
            <div className="int-svc-link">Class code: <strong>{cell.dojoCode}</strong></div>
          </div>
          <div className="int-svc-actions">
            <button className="int-btn-copy" onClick={() => copy(cell.dojoCode, setDojoCopied)}>
              {dojoCopied ? '✅' : '📋'}
            </button>
            <button className="int-btn-edit" onClick={() => onEditDojo(cell)}>✏️</button>
            <a className="int-btn-join dojo-join" href={`https://www.classdojo.com`} target="_blank" rel="noreferrer">
              Open →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditModal({ cell, field, value, onChange, onSave, onClose }) {
  if (!cell) return null
  const isMeet = field === 'meet'
  return (
    <div className="int-modal-overlay" onClick={onClose}>
      <div className="int-modal" onClick={e => e.stopPropagation()}>
        <button className="int-modal-close" onClick={onClose}>✕</button>
        <div className="int-modal-icon">{isMeet ? '📹' : '🎯'}</div>
        <h2 className="int-modal-title">{isMeet ? 'Google Meet Link' : 'ClassDojo Code'} — {cell.id}</h2>
        <p className="int-modal-sub">
          {isMeet
            ? 'Paste the Google Meet room URL for this cell. Students and facilitators will use this to join live sessions.'
            : 'Enter the ClassDojo class invite code. Parents and students use this to join the class and see daily check-ins.'}
        </p>
        <label className="int-modal-label">{isMeet ? 'Meet URL' : 'ClassDojo Code'}</label>
        <input
          className="int-modal-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={isMeet ? 'https://meet.google.com/xxx-xxxx-xxx' : 'e.g. STAR7X'}
          autoFocus
        />
        {isMeet && (
          <p className="int-modal-hint">
            💡 Create a room at <a href="https://meet.google.com/new" target="_blank" rel="noreferrer">meet.google.com/new</a> — copy the link and paste it here.
          </p>
        )}
        {!isMeet && (
          <p className="int-modal-hint">
            💡 Find your code in ClassDojo under <strong>Invite Students/Parents</strong>. It's usually 6 characters.
          </p>
        )}
        <div className="int-modal-actions">
          <button className="int-modal-save" onClick={onSave}>Save Link</button>
          <button className="int-modal-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Integrations() {
  usePageMeta("Integrations", "Connect ClassDojo and Google Meet to your DOWNFLOW cells. One hub, every tool.")

  const [cells, setCells] = useState(DEMO_CELLS)
  const [editModal, setEditModal] = useState(null) // { cell, field: 'meet'|'dojo' }
  const [editValue, setEditValue] = useState('')
  const [activeTab, setActiveTab] = useState('cells') // 'cells' | 'setup' | 'architecture'
  const [globalMeet, setGlobalMeet] = useState('')
  const [globalDojo, setGlobalDojo] = useState('')
  const [saved, setSaved] = useState(false)

  function openEdit(cell, field) {
    setEditValue(field === 'meet' ? cell.meetLink : cell.dojoCode)
    setEditModal({ cell, field })
  }

  function saveEdit() {
    setCells(prev => prev.map(c => {
      if (c.id !== editModal.cell.id) return c
      return editModal.field === 'meet'
        ? { ...c, meetLink: editValue }
        : { ...c, dojoCode: editValue }
    }))
    setEditModal(null)
  }

  function applyGlobal() {
    setCells(prev => prev.map(c => ({
      ...c,
      ...(globalMeet ? { meetLink: globalMeet } : {}),
      ...(globalDojo ? { dojoCode: globalDojo } : {}),
    })))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setGlobalMeet('')
    setGlobalDojo('')
  }

  return (
    <div className="int-page">

      {/* Hero */}
      <div className="int-hero">
        <div className="int-hero-logos">
          <div className="int-hero-logo meet-hero-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 10.5L19.5 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
              <rect x="4" y="7.5" width="11" height="9" rx="2" fill="#00BCD4"/>
            </svg>
          </div>
          <div className="int-hero-plus">+</div>
          <div className="int-hero-logo dojo-hero-logo">🎯</div>
          <div className="int-hero-plus">+</div>
          <div className="int-hero-logo df-hero-logo">DF</div>
        </div>
        <h1 className="int-hero-title">Integrations Hub</h1>
        <p className="int-hero-sub">
          ClassDojo for the classroom heartbeat. Google Meet for the live session.<br/>
          DOWNFLOW for everything that matters: coins, growth, identity, value.
        </p>
        <div className="int-hero-status-row">
          <div className="int-status-pill connected">● ClassDojo Connected</div>
          <div className="int-status-pill connected">● Google Meet Connected</div>
          <div className="int-status-pill live">{cells.length} Cells Linked</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="int-tabs">
        {[
          { id: 'cells',        label: '🏫 Cell Links' },
          { id: 'setup',        label: '⚙️ Setup Guide' },
          { id: 'architecture', label: '🏙 Architecture' },
        ].map(t => (
          <button key={t.id} className={`int-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── CELL LINKS TAB ── */}
      {activeTab === 'cells' && (
        <div className="int-cells-view">

          {/* Quick-set all cells */}
          <div className="int-bulk-card">
            <div className="int-bulk-title">⚡ Quick-Set All Cells</div>
            <p className="int-bulk-sub">Apply one Meet link or ClassDojo code to all cells at once. Useful when running a shared room.</p>
            <div className="int-bulk-row">
              <div className="int-bulk-field">
                <label>Google Meet URL (all cells)</label>
                <input className="int-input" value={globalMeet} onChange={e => setGlobalMeet(e.target.value)} placeholder="https://meet.google.com/xxx-xxxx-xxx" />
              </div>
              <div className="int-bulk-field">
                <label>ClassDojo Code (all cells)</label>
                <input className="int-input" value={globalDojo} onChange={e => setGlobalDojo(e.target.value)} placeholder="e.g. STAR7X" />
              </div>
              <button className="int-bulk-btn" onClick={applyGlobal} disabled={!globalMeet && !globalDojo}>
                {saved ? '✅ Saved!' : 'Apply to All →'}
              </button>
            </div>
          </div>

          {/* Per-cell cards */}
          <div className="int-cells-grid">
            {cells.map(cell => (
              <CellIntegrationCard
                key={cell.id}
                cell={cell}
                onEditMeet={c => openEdit(c, 'meet')}
                onEditDojo={c => openEdit(c, 'dojo')}
              />
            ))}
          </div>

          {/* Add cell prompt */}
          <div className="int-add-cell-row">
            <div className="int-add-cell-card">
              <div className="int-add-icon">＋</div>
              <div className="int-add-text">New cell? Add it in your <Link to="/facilitator">Facilitator Dashboard</Link> first, then configure its links here.</div>
            </div>
          </div>
        </div>
      )}

      {/* ── SETUP GUIDE TAB ── */}
      {activeTab === 'setup' && (
        <div className="int-setup-view">
          <div className="int-setup-grid">

            {/* Google Meet Setup */}
            <div className="int-setup-card">
              <div className="int-setup-header">
                <div className="int-setup-logo meet-setup-logo">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M15 10.5L19.5 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
                    <rect x="4" y="7.5" width="11" height="9" rx="2" fill="#00BCD4"/>
                  </svg>
                </div>
                <div>
                  <h2 className="int-setup-title">Google Meet</h2>
                  <div className="int-setup-badge free">Free · No account required for students</div>
                </div>
              </div>

              <div className="int-setup-steps">
                {[
                  { n: '1', title: 'Create a Meet room', body: 'Go to meet.google.com → click "New Meeting" → copy the link. Each cell should have its own dedicated room link.', link: { url: 'https://meet.google.com/new', label: 'Create room →' } },
                  { n: '2', title: 'Paste the link here', body: 'In the Cell Links tab above, click ✏️ next to Google Meet for your cell. Paste the URL and save.' },
                  { n: '3', title: 'Share with students', body: 'The Join button on the Student Dashboard will open this link directly. Students only need the link — no Google account required to join.' },
                  { n: '4', title: 'Record the session', body: 'Click "Record meeting" at the start of each session. After the session, trim and upload to the DOWNFLOW Content Engine.' },
                  { n: '5', title: 'Post-session logging', body: 'After the session ends, log attendance and coin awards in the DOWNFLOW Facilitator Dashboard. The data lives here, not in Meet.' },
                ].map(s => (
                  <div key={s.n} className="int-step">
                    <div className="int-step-num">{s.n}</div>
                    <div className="int-step-content">
                      <div className="int-step-title">{s.title}</div>
                      <div className="int-step-body">{s.body}</div>
                      {s.link && (
                        <a className="int-step-link" href={s.link.url} target="_blank" rel="noreferrer">{s.link.label}</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="int-setup-tip">
                💡 <strong>Pro tip:</strong> Create a recurring meeting in Google Calendar — it keeps the same link every week. Your students never need to hunt for a new link.
              </div>

              <a className="int-setup-cta meet-cta" href="https://meet.google.com/new" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 10.5L19.5 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
                  <rect x="4" y="7.5" width="11" height="9" rx="2" fill="#00BCD4"/>
                </svg>
                Open Google Meet →
              </a>
            </div>

            {/* ClassDojo Setup */}
            <div className="int-setup-card">
              <div className="int-setup-header">
                <div className="int-setup-logo dojo-setup-logo">🎯</div>
                <div>
                  <h2 className="int-setup-title">ClassDojo</h2>
                  <div className="int-setup-badge free">Free · Parent app included</div>
                </div>
              </div>

              <div className="int-setup-steps">
                {[
                  { n: '1', title: 'Create a ClassDojo account', body: 'Go to classdojo.com → sign up as a Teacher. Create one class per learning cell.', link: { url: 'https://www.classdojo.com', label: 'Sign up free →' } },
                  { n: '2', title: 'Add your students', body: 'In ClassDojo, go to your class → Invite Students. Each student gets a unique join code. They can join without an email address.' },
                  { n: '3', title: 'Connect parents', body: 'Use the "Invite Parents" option. Parents download the ClassDojo app (free) and receive daily updates, mood check-ins, and session notes.' },
                  { n: '4', title: 'Copy your class code', body: 'Your class invite code is shown on the class overview page (usually 6 characters). Paste it into the Cell Links tab above.' },
                  { n: '5', title: 'Use it for daily check-ins', body: 'At the start of each session, ask students to submit their mood on ClassDojo. Use it for parent messages. Keep payments and coins in DOWNFLOW.' },
                ].map(s => (
                  <div key={s.n} className="int-step">
                    <div className="int-step-num">{s.n}</div>
                    <div className="int-step-content">
                      <div className="int-step-title">{s.title}</div>
                      <div className="int-step-body">{s.body}</div>
                      {s.link && (
                        <a className="int-step-link" href={s.link.url} target="_blank" rel="noreferrer">{s.link.label}</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="int-setup-tip">
                💡 <strong>Important:</strong> ClassDojo is for mood + parent communication only. Never put payment information, coin balances, or ranking data in ClassDojo messages.
              </div>

              <a className="int-setup-cta dojo-cta" href="https://www.classdojo.com" target="_blank" rel="noreferrer">
                🎯 Open ClassDojo →
              </a>
            </div>
          </div>

          {/* What each tool owns */}
          <div className="int-divider-card">
            <h3 className="int-divider-title">🔒 Data Ownership Rules</h3>
            <div className="int-ownership-grid">
              {[
                { tool: 'ClassDojo', emoji: '🎯', color: '#ff9f5a', owns: ['Daily mood check-ins', 'Parent messages', 'Session attendance mood', 'Simple classroom feedback'], never: ['Payments or coins', 'Sponsor data', 'Video submissions', 'Rankings or scores'] },
                { tool: 'Google Meet', emoji: '📹', color: '#00BCD4', owns: ['Live session delivery', 'Recording source', 'Screen share', 'Student video quality'], never: ['Session logs (those go in DOWNFLOW)', 'Coin awards', 'Content library', 'Identity data'] },
                { tool: 'DOWNFLOW', emoji: '🏙', color: '#f0c040', owns: ['All coins & rewards', 'Sponsor data & payments', 'Video submissions & Content Engine', 'Student identity & progress', 'Rankings & cell health', 'Everything that matters long-term'], never: [] },
              ].map(o => (
                <div key={o.tool} className="int-ownership-card" style={{ '--oc': o.color }}>
                  <div className="int-oc-header">
                    <span className="int-oc-emoji">{o.emoji}</span>
                    <span className="int-oc-name" style={{ color: o.color }}>{o.tool}</span>
                  </div>
                  <div className="int-oc-section">
                    <div className="int-oc-label owns">✅ Owns</div>
                    {o.owns.map(i => <div key={i} className="int-oc-item">{i}</div>)}
                  </div>
                  {o.never.length > 0 && (
                    <div className="int-oc-section">
                      <div className="int-oc-label never">✗ Never</div>
                      {o.never.map(i => <div key={i} className="int-oc-item muted">{i}</div>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ARCHITECTURE TAB ── */}
      {activeTab === 'architecture' && (
        <div className="int-arch-view">
          <h2 className="int-arch-title">The Three-Layer Model</h2>
          <p className="int-arch-sub">DOWNFLOW is the city. ClassDojo and Google Meet are specialist tools that feed into it.</p>

          <div className="int-arch-diagram">
            {/* Layer 3 — Top: DOWNFLOW */}
            <div className="int-arch-layer int-arch-df">
              <div className="int-arch-layer-badge">🏙 The City</div>
              <div className="int-arch-layer-name">DOWNFLOW App</div>
              <div className="int-arch-layer-items">
                {['Coins & rewards', 'Sponsor payments', 'Student identity', 'Cell health', 'Video content engine', 'Rankings', 'AI tools', 'Weekly payouts'].map(i => (
                  <span key={i} className="int-arch-item">{i}</span>
                ))}
              </div>
            </div>

            <div className="int-arch-arrows">
              <div className="int-arch-arrow">↑ session logs, attendance, coin triggers</div>
              <div className="int-arch-arrow">↑ recordings → Content Engine</div>
            </div>

            {/* Layer 2 — Middle: Tools */}
            <div className="int-arch-tools-row">
              <div className="int-arch-layer int-arch-dojo">
                <div className="int-arch-layer-badge">🚪 Front Porch</div>
                <div className="int-arch-layer-name">ClassDojo</div>
                <div className="int-arch-layer-items">
                  {['Mood check-ins', 'Parent messages', 'Daily visibility', 'Simple feedback'].map(i => (
                    <span key={i} className="int-arch-item">{i}</span>
                  ))}
                </div>
                <a className="int-arch-btn" href="https://www.classdojo.com" target="_blank" rel="noreferrer">Open ClassDojo →</a>
              </div>

              <div className="int-arch-connector-line">
                <div className="int-arch-conn-cell">Learning Cell</div>
              </div>

              <div className="int-arch-layer int-arch-meet">
                <div className="int-arch-layer-badge">📹 Live Room</div>
                <div className="int-arch-layer-name">Google Meet</div>
                <div className="int-arch-layer-items">
                  {['Live sessions', 'Voice & video', 'Screen share', 'Recording source'].map(i => (
                    <span key={i} className="int-arch-item">{i}</span>
                  ))}
                </div>
                <a className="int-arch-btn" href="https://meet.google.com/new" target="_blank" rel="noreferrer">Open Meet →</a>
              </div>
            </div>

            <div className="int-arch-arrows">
              <div className="int-arch-arrow down">↓ scheduled sessions, pack content</div>
            </div>

            {/* Layer 1 — Bottom: Participants */}
            <div className="int-arch-participants">
              {[
                { icon: '👩‍🏫', label: 'Facilitator', desc: 'Runs session in Meet · Logs in DOWNFLOW · Messages via Dojo' },
                { icon: '🧒', label: 'Student', desc: 'Joins Meet link · Earns coins in DOWNFLOW · Mood via Dojo' },
                { icon: '👨‍👩‍👧', label: 'Parent', desc: 'Sees updates via Dojo · Cell info via DOWNFLOW report' },
                { icon: '💼', label: 'Sponsor', desc: 'Sees impact via DOWNFLOW dashboard · Never touches Dojo/Meet' },
              ].map(p => (
                <div key={p.label} className="int-arch-participant">
                  <div className="int-arch-p-icon">{p.icon}</div>
                  <div className="int-arch-p-label">{p.label}</div>
                  <div className="int-arch-p-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Session flow */}
          <div className="int-flow-section">
            <h3 className="int-flow-title">📅 Session Flow: Step by Step</h3>
            <div className="int-flow-steps">
              {[
                { time: 'Day before', icon: '📋', action: 'Facilitator plans session in DOWNFLOW', tool: 'DOWNFLOW', color: '#f0c040' },
                { time: '10 min before', icon: '📢', action: 'Facilitator posts reminder in ClassDojo', tool: 'ClassDojo', color: '#ff9f5a' },
                { time: 'Session start', icon: '📹', action: 'Everyone joins Google Meet via DOWNFLOW join button', tool: 'Google Meet', color: '#00BCD4' },
                { time: 'During session', icon: '🎯', action: 'Mood check-in via ClassDojo · Activities run in Meet', tool: 'Both', color: '#a78bfa' },
                { time: 'Session ends', icon: '⏹', action: 'Facilitator stops recording · Saves video', tool: 'Google Meet', color: '#00BCD4' },
                { time: 'Post-session', icon: '🪙', action: 'Attendance logged + coins awarded in DOWNFLOW', tool: 'DOWNFLOW', color: '#f0c040' },
                { time: 'Within 24h', icon: '📤', action: 'Video clip uploaded to Content Engine', tool: 'DOWNFLOW', color: '#f0c040' },
                { time: 'Friday', icon: '💸', action: 'Payout processed automatically', tool: 'DOWNFLOW', color: '#f0c040' },
              ].map((s, i) => (
                <div key={i} className="int-flow-step">
                  <div className="int-flow-time">{s.time}</div>
                  <div className="int-flow-icon" style={{ background: s.color + '22', border: `1px solid ${s.color}44` }}>{s.icon}</div>
                  <div className="int-flow-action">{s.action}</div>
                  <div className="int-flow-tool" style={{ color: s.color }}>{s.tool}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick access buttons */}
          <div className="int-quick-access">
            <h3 className="int-qa-title">Quick Access</h3>
            <div className="int-qa-grid">
              <a className="int-qa-card meet-qa" href="https://meet.google.com/new" target="_blank" rel="noreferrer">
                <div className="int-qa-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M15 10.5L19.5 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
                    <rect x="4" y="7.5" width="11" height="9" rx="2" fill="#00BCD4"/>
                  </svg>
                </div>
                <div className="int-qa-name">New Meeting</div>
                <div className="int-qa-sub">meet.google.com</div>
              </a>
              <a className="int-qa-card meet-qa" href="https://meet.google.com" target="_blank" rel="noreferrer">
                <div className="int-qa-icon">📅</div>
                <div className="int-qa-name">Join Meeting</div>
                <div className="int-qa-sub">Enter code</div>
              </a>
              <a className="int-qa-card dojo-qa" href="https://www.classdojo.com" target="_blank" rel="noreferrer">
                <div className="int-qa-icon">🎯</div>
                <div className="int-qa-name">ClassDojo</div>
                <div className="int-qa-sub">classdojo.com</div>
              </a>
              <a className="int-qa-card dojo-qa" href="https://www.classdojo.com/messaging" target="_blank" rel="noreferrer">
                <div className="int-qa-icon">💬</div>
                <div className="int-qa-name">Dojo Messages</div>
                <div className="int-qa-sub">Parent messaging</div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditModal
        cell={editModal?.cell}
        field={editModal?.field}
        value={editValue}
        onChange={setEditValue}
        onSave={saveEdit}
        onClose={() => setEditModal(null)}
      />
    </div>
  )
}
