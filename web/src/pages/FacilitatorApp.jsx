import { useState } from 'react'

/* ─────────────────────────────────────────────────────────
   FACILITATOR APP — 10-Screen Mobile Wireframe
   Bottom nav: Home · Cells · Record · Feed · Profile
───────────────────────────────────────────────────────── */

/* ── Shared micro-components ── */
const Avatar = ({ name, color = '#6c63ff', size = 36, ring = false }) => (
  <div className={`fa2-avatar${ring ? ' ring' : ''}`}
    style={{ width: size, height: size, minWidth: size, background: color, fontSize: size * 0.35 }}>
    {name?.[0]?.toUpperCase()}
  </div>
)

const Stat = ({ label, value, color }) => (
  <div className="fa2-stat">
    <span className="fa2-stat-val" style={color ? { color } : {}}>{value}</span>
    <span className="fa2-stat-label">{label}</span>
  </div>
)

const SectionHead = ({ children, warn }) => (
  <p className={`fa2-sh${warn ? ' warn' : ''}`}>{children}</p>
)

const PrimaryBtn = ({ children, color, onClick, full = true }) => (
  <button className={`fa2-primary-btn${full ? ' full' : ''}`}
    style={color ? { background: color } : {}} onClick={onClick}>
    {children}
  </button>
)

/* ── Screens ── */

function S1_Home() {
  return (
    <div className="fa2-screen">
      <div className="fa2-topbar">
        <div>
          <p className="fa2-greeting">Good morning, Linh 👋</p>
          <p className="fa2-role-chip">Facilitator · Phase 2</p>
        </div>
        <Avatar name="LN" color="#6c63ff" size={36} />
      </div>

      {/* Active cell card */}
      <div className="fa2-card accent">
        <p className="fa2-card-label">Active Cell</p>
        <p className="fa2-card-title">Cell A12</p>
        <div className="fa2-mini-avatars">
          {['A','B','C','D','E'].map((l,i) => (
            <Avatar key={l} name={l} color={['#6c63ff','#f97316','#27ae60','#e05a5a','#2980b9'][i]} size={26} ring />
          ))}
          <span className="fa2-ma-count">6 students</span>
        </div>
      </div>

      {/* Next session */}
      <div className="fa2-card">
        <p className="fa2-card-label">Next Session</p>
        <div className="fa2-next-row">
          <span className="fa2-next-icon">📅</span>
          <div>
            <p className="fa2-next-title">Cell A12 · Today</p>
            <p className="fa2-next-time">10:00 AM — 11:00 AM</p>
          </div>
          <span className="fa2-next-badge">in 2h</span>
        </div>
      </div>

      {/* Earnings & coins */}
      <div className="fa2-row2">
        <div className="fa2-card half green">
          <p className="fa2-card-label">Weekly Earnings</p>
          <p className="fa2-card-bignum green">₫432k</p>
          <p className="fa2-card-sub">40% · Phase 2</p>
        </div>
        <div className="fa2-card half gold">
          <p className="fa2-card-label">Coins</p>
          <p className="fa2-card-bignum gold">🪙 248</p>
          <p className="fa2-card-sub">this cycle</p>
        </div>
      </div>

      {/* Upload alert */}
      <div className="fa2-alert-row">
        <span>⚠️ 4 pending uploads</span>
        <button className="fa2-mini-btn orange">Upload now</button>
      </div>

      {/* CTA buttons */}
      <div className="fa2-cta-row">
        <PrimaryBtn color="#6c63ff" full={false}>🎬 Start Class</PrimaryBtn>
        <PrimaryBtn color="#27ae60" full={false}>☁️ Upload Content</PrimaryBtn>
      </div>
    </div>
  )
}

function S2_Cells() {
  const [selected, setSelected] = useState('A12')
  const cells = [
    { id: 'A12', health: 88, students: 6, score: 84, coins: 248 },
    { id: 'B07', health: 72, students: 5, score: 71, coins: 190 },
    { id: 'C03', health: 95, students: 6, score: 91, coins: 312 },
  ]
  const cell = cells.find(c => c.id === selected)
  const studentColors = ['#6c63ff','#f97316','#27ae60','#e05a5a','#2980b9','#9b59b6']
  const studentNames = ['Anh','Ben','Cai','Dara','Eva','Finn']

  return (
    <div className="fa2-screen">
      <p className="fa2-screen-title">My Cells</p>
      <div className="fa2-cell-tabs">
        {cells.map(c => (
          <button key={c.id} className={`fa2-cell-tab${c.id === selected ? ' active' : ''}`}
            onClick={() => setSelected(c.id)}>Cell {c.id}</button>
        ))}
      </div>

      {/* Cell header */}
      <div className="fa2-cell-header">
        <div>
          <p className="fa2-cell-name">Cell {cell.id}</p>
          <p className="fa2-cell-meta">Facilitator: Linh · Guider: Minh</p>
        </div>
        <div className="fa2-health-ring" style={{ '--pct': cell.health }}>
          <span>{cell.health}%</span>
        </div>
      </div>

      {/* Student grid */}
      <SectionHead>Students ({cell.students})</SectionHead>
      <div className="fa2-student-grid">
        {studentNames.slice(0, cell.students).map((n, i) => (
          <div key={n} className="fa2-sg-item">
            <Avatar name={n} color={studentColors[i]} size={38} ring />
            <span className="fa2-sg-name">{n}</span>
            <span className="fa2-sg-active">●</span>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="fa2-stats-row">
        <Stat label="Participation" value={`${cell.health}%`} color="#4de8b0" />
        <Stat label="Weekly Score" value={cell.score} color="#72d0ff" />
        <Stat label="Coins" value={`🪙 ${cell.coins}`} color="#f5c842" />
      </div>

      <PrimaryBtn color="#6c63ff">Enter Session →</PrimaryBtn>
    </div>
  )
}

function S3_LiveSession() {
  const [marked, setMarked] = useState([0, 2, 4])
  const students = ['Anh','Ben','Cai','Dara','Eva','Finn']

  return (
    <div className="fa2-screen">
      <div className="fa2-session-topbar">
        <div>
          <p className="fa2-session-cell">Cell A12 · LIVE</p>
          <p className="fa2-session-week">Week 4 · Session 2</p>
        </div>
        <div className="fa2-timer-pill">⏱ 24:17</div>
      </div>

      <SectionHead>Tap to mark active</SectionHead>
      <div className="fa2-mark-grid">
        {students.map((s, i) => (
          <button key={s} className={`fa2-mark-btn${marked.includes(i) ? ' marked' : ''}`}
            onClick={() => setMarked(m => m.includes(i) ? m.filter(x => x !== i) : [...m, i])}>
            <Avatar name={s} color={marked.includes(i) ? '#27ae60' : '#333'} size={32} />
            <span>{s}</span>
            {marked.includes(i) && <span className="fa2-check">✓</span>}
          </button>
        ))}
      </div>

      <div className="fa2-session-actions">
        <button className="fa2-session-btn record">🎥 Record</button>
        <button className="fa2-session-btn task">📝 Assign Task</button>
        <button className="fa2-session-btn mark">⭐ Mark Part.</button>
      </div>

      <div className="fa2-side-panel">
        <p className="fa2-sp-head">Quick Prompts</p>
        {['"Introduce yourself in 3 sentences."','"Describe your favourite place."','"What did you learn this week?"'].map(p => (
          <div key={p} className="fa2-sp-prompt">{p}</div>
        ))}
      </div>
    </div>
  )
}

function S4_Record() {
  const [recording, setRecording] = useState(false)
  const [student, setStudent] = useState('Anh')

  return (
    <div className="fa2-screen pad0">
      <div className="fa2-vf-full">
        <div className="fa2-vf-corners">
          {['tl','tr','bl','br'].map(c => <span key={c} className={`fa2-corner ${c}`} />)}
        </div>
        {recording && <div className="fa2-rec-dot">● REC</div>}
        <div className="fa2-vf-face">👤</div>
        <div className="fa2-vf-tag">{student}</div>

        {/* Tag dropdown */}
        <div className="fa2-vf-chips">
          {['Anh','Ben','Cai','Dara','Eva','Finn'].map(s => (
            <button key={s} className={`fa2-vf-chip${s === student ? ' active' : ''}`}
              onClick={() => setStudent(s)}>{s}</button>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="fa2-vf-controls">
          <button className="fa2-vf-btn">⏸</button>
          <button className={`fa2-vf-record-btn${recording ? ' stop' : ''}`}
            onClick={() => setRecording(r => !r)}>
            {recording ? '⏹' : '🔴'}
          </button>
          <button className="fa2-vf-btn">💾</button>
        </div>
      </div>
    </div>
  )
}

function S5_QuickEdit() {
  return (
    <div className="fa2-screen">
      <p className="fa2-screen-title">Quick Edit</p>

      <div className="fa2-edit-preview">
        <span className="fa2-ep-play">▶</span>
        <p>Anh · Speaking · 0:06</p>
      </div>

      <SectionHead>Trim</SectionHead>
      <div className="fa2-timeline2">
        <div className="fa2-tl2-track">
          <div className="fa2-tl2-fill" />
          <div className="fa2-tl2-handle left" />
          <div className="fa2-tl2-handle right" />
          <div className="fa2-tl2-thumb" />
        </div>
        <div className="fa2-tl2-marks">
          {['0:00','0:02','0:04','0:06'].map(t => <span key={t}>{t}</span>)}
        </div>
      </div>

      <SectionHead>Caption <span className="fa2-ai-tag">AI</span></SectionHead>
      <div className="fa2-caption-box">
        <span>"Anh speaks confidently about her weekend."</span>
        <button className="fa2-caption-refresh">↻</button>
      </div>

      <div className="fa2-toggle-row">
        <div>
          <p className="fa2-tr-label">Highlight Clip</p>
          <p className="fa2-tr-sub">Shown in sponsor feed</p>
        </div>
        <div className="fa2-toggle on"><div className="fa2-toggle-knob" /></div>
      </div>

      <PrimaryBtn color="#6c63ff">Next → Upload</PrimaryBtn>
    </div>
  )
}

function S6_Upload() {
  const [category, setCategory] = useState('Daily Rep')
  const [sponsorVisible, setSponsorVisible] = useState(true)

  return (
    <div className="fa2-screen">
      <p className="fa2-screen-title">Upload</p>

      <div className="fa2-upload-file">
        <span className="fa2-uf-icon">🎬</span>
        <div>
          <p className="fa2-uf-name">Anh_speaking_04-03.mp4</p>
          <p className="fa2-uf-meta">0:04 · 2.1 MB · ready</p>
        </div>
      </div>

      <SectionHead>Select Cell</SectionHead>
      <div className="fa2-field">Cell A12 · Session #7 ▾</div>

      <SectionHead>Select Students</SectionHead>
      <div className="fa2-chip-row">
        {['Anh','Ben','Cai','Dara','Eva','Finn'].map((s, i) => (
          <span key={s} className={`fa2-tag-chip${i < 2 ? ' on' : ''}`}>{s}</span>
        ))}
      </div>

      <SectionHead>Category</SectionHead>
      <div className="fa2-chip-row">
        {['Daily Rep','Weekly Output','Highlight'].map(c => (
          <button key={c} className={`fa2-tag-chip btn${c === category ? ' on' : ''}`}
            onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div className="fa2-toggle-row">
        <div>
          <p className="fa2-tr-label">Visible to Sponsor</p>
          <p className="fa2-tr-sub">Sponsor dashboard access</p>
        </div>
        <div className={`fa2-toggle${sponsorVisible ? ' on' : ''}`}
          onClick={() => setSponsorVisible(v => !v)}>
          <div className="fa2-toggle-knob" />
        </div>
      </div>

      <PrimaryBtn color="#27ae60">☁️ Upload</PrimaryBtn>
    </div>
  )
}

function S7_Feed() {
  const [tab, setTab] = useState('My Cell')
  const posts = [
    { name: 'Anh',  type: 'Speaking',  time: '2h',  coins: 12, comment: 'Great confidence!', color: '#6c63ff' },
    { name: 'Ben',  type: 'Homework',  time: '4h',  coins: 8,  comment: 'Keep it up!',       color: '#f97316' },
    { name: 'Cai',  type: 'Highlight', time: 'Yest',coins: 20, comment: 'Top clip! ⭐',       color: '#27ae60' },
  ]

  return (
    <div className="fa2-screen pad0">
      <div className="fa2-feed-header">
        {['My Cell','Guider Cell','Global'].map(t => (
          <button key={t} className={`fa2-feed-tab${t === tab ? ' active' : ''}`}
            onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="fa2-feed-list">
        {posts.map(p => (
          <div key={p.name} className="fa2-feed-post">
            <div className="fa2-fp-header">
              <Avatar name={p.name} color={p.color} size={28} />
              <div>
                <p className="fa2-fp-name">{p.name}</p>
                <p className="fa2-fp-meta">{p.type} · {p.time} ago</p>
              </div>
              <span className="fa2-fp-coins">🪙 +{p.coins}</span>
            </div>
            <div className="fa2-fp-video" />
            <div className="fa2-fp-footer">
              <span>❤️ 4</span>
              <span className="fa2-fp-comment">"{p.comment}"</span>
              <span>💬 2</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S8_GuiderPanel() {
  return (
    <div className="fa2-screen">
      <div className="fa2-guider-hero">
        <span className="fa2-guider-icon">⭐</span>
        <div>
          <p className="fa2-guider-title">You Guide: Cell B12</p>
          <p className="fa2-guider-sub">Your score is tied to this cell's performance</p>
        </div>
      </div>

      <div className="fa2-guider-alert">
        ⚠️ Your score is affected by this cell
      </div>

      <SectionHead>Their Performance</SectionHead>
      <div className="fa2-guider-metrics">
        {[
          { label: 'Participation', val: 74, color: '#f97316', icon: '👋' },
          { label: 'Output',        val: 68, color: '#e05a5a', icon: '📹' },
          { label: 'Weekly Score',  val: 71, color: '#72d0ff', icon: '📊' },
        ].map(m => (
          <div key={m.label} className="fa2-gm-card">
            <span className="fa2-gm-icon">{m.icon}</span>
            <span className="fa2-gm-val" style={{ color: m.color }}>{m.val}%</span>
            <span className="fa2-gm-label">{m.label}</span>
            <div className="fa2-gm-bar"><div style={{ width: `${m.val}%`, background: m.color }} /></div>
          </div>
        ))}
      </div>

      <div className="fa2-guider-score-card">
        <p className="fa2-gsc-label">Your Guider Score Impact</p>
        <p className="fa2-gsc-sub">Cell B12 avg → affects your Phase progression</p>
        <div className="fa2-gsc-row">
          <span className="fa2-gsc-chip">Cell A12 (yours): <strong>84</strong></span>
          <span className="fa2-gsc-plus">+</span>
          <span className="fa2-gsc-chip">Cell B12 (guided): <strong>71</strong></span>
          <span className="fa2-gsc-eq">=</span>
          <span className="fa2-gsc-total">77.5</span>
        </div>
      </div>

      <button className="fa2-guider-msg-btn">💬 Send Message to Cell B12</button>
    </div>
  )
}

function S9_Performance() {
  const weeks = ['W1','W2','W3','W4']
  const scores = [68, 74, 80, 84]
  const maxScore = 100
  return (
    <div className="fa2-screen">
      <p className="fa2-screen-title">Performance</p>

      <div className="fa2-perf-chart">
        <p className="fa2-pc2-head">Weekly Score — Cell A12</p>
        <div className="fa2-pc2-bars">
          {weeks.map((w, i) => (
            <div key={w} className="fa2-pc2-bar-wrap">
              <div className="fa2-pc2-bar-bg">
                <div className="fa2-pc2-bar-fill"
                  style={{ height: `${(scores[i] / maxScore) * 100}%`,
                    background: i === 3 ? '#6c63ff' : 'rgba(108,99,255,0.35)' }} />
              </div>
              <span className="fa2-pc2-score">{scores[i]}</span>
              <span className="fa2-pc2-week">{w}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fa2-perf-metrics">
        {[
          { label: 'Participation', val: 88, color: '#4de8b0' },
          { label: 'Output Consistency', val: 75, color: '#72d0ff' },
          { label: 'Speaking Improvement', val: 82, color: '#a78bfa' },
        ].map(m => (
          <div key={m.label} className="fa2-pm-row">
            <span className="fa2-pm-label">{m.label}</span>
            <div className="fa2-pm-track">
              <div className="fa2-pm-fill" style={{ width: `${m.val}%`, background: m.color }} />
            </div>
            <span className="fa2-pm-val" style={{ color: m.color }}>{m.val}%</span>
          </div>
        ))}
      </div>

      <div className="fa2-coins-section">
        <p className="fa2-cs-head">🪙 Coins</p>
        <div className="fa2-cs-row">
          <div className="fa2-cs-card earned"><p className="fa2-cs-num">248</p><p>Earned</p></div>
          <div className="fa2-cs-card dist"><p className="fa2-cs-num">180</p><p>Distributed</p></div>
        </div>
      </div>
    </div>
  )
}

function S10_Profile() {
  const phases = [
    { n: 1, label: 'Starting',    pct: 35, done: true },
    { n: 2, label: 'Consistent',  pct: 40, done: true, current: true },
    { n: 3, label: 'Builder',     pct: 45, done: false },
  ]
  return (
    <div className="fa2-screen">
      <div className="fa2-profile-hero">
        <Avatar name="LN" color="#6c63ff" size={60} />
        <div>
          <p className="fa2-profile-name">Linh Nguyen</p>
          <p className="fa2-profile-role">Facilitator · Cell A12</p>
          <span className="fa2-profile-phase">Phase 2</span>
        </div>
      </div>

      <div className="fa2-profile-stats">
        <Stat label="Weekly" value="₫432k" color="#4de8b0" />
        <Stat label="Cells" value="3" color="#72d0ff" />
        <Stat label="Coins" value="🪙248" color="#f5c842" />
        <Stat label="Students" value="17" color="#a78bfa" />
      </div>

      <SectionHead>Growth Path</SectionHead>
      <div className="fa2-phase-track">
        {phases.map((p, i) => (
          <div key={p.n} className={`fa2-phase-node${p.done ? ' done' : ''}${p.current ? ' current' : ''}`}>
            <div className="fa2-pn-circle">{p.done ? '✓' : p.n}</div>
            <p className="fa2-pn-label">Phase {p.n}</p>
            <p className="fa2-pn-pct">{p.pct}%</p>
            <p className="fa2-pn-sub">{p.label}</p>
            {i < phases.length - 1 && <div className="fa2-pn-line" />}
          </div>
        ))}
      </div>

      <div className="fa2-next-unlock">
        <p className="fa2-nu-label">Next: Phase 3 (45%)</p>
        <p className="fa2-nu-action">→ Recruit a new facilitator to unlock</p>
        <div className="fa2-nu-bar-track"><div className="fa2-nu-bar" style={{ width: '65%' }} /></div>
        <p className="fa2-nu-sub">65% progress toward Phase 3</p>
      </div>
    </div>
  )
}

/* ── Bottom Nav ── */
const BOTTOM_NAV = [
  { id: 'home',    icon: '🏠', label: 'Home',   screens: [1] },
  { id: 'cells',   icon: '🧩', label: 'Cells',  screens: [2, 3] },
  { id: 'record',  icon: '🎥', label: 'Record', screens: [4, 5, 6] },
  { id: 'feed',    icon: '📱', label: 'Feed',   screens: [7, 8] },
  { id: 'profile', icon: '👤', label: 'Profile',screens: [9, 10] },
]

const SCREEN_MAP = {
  1: S1_Home, 2: S2_Cells, 3: S3_LiveSession,
  4: S4_Record, 5: S5_QuickEdit, 6: S6_Upload,
  7: S7_Feed, 8: S8_GuiderPanel,
  9: S9_Performance, 10: S10_Profile,
}

const SCREEN_LABELS = {
  1:'Dashboard', 2:'Cell Overview', 3:'Live Session',
  4:'Record', 5:'Quick Edit', 6:'Upload',
  7:'Feed', 8:'Guider Panel 🔥',
  9:'Performance & Coins', 10:'Profile',
}

const NAV_SCREENS = {
  home: [1], cells: [2, 3], record: [4, 5, 6], feed: [7, 8], profile: [9, 10],
}

export default function FacilitatorApp() {
  const [screen, setScreen] = useState(1)

  const activeNav = BOTTOM_NAV.find(n => n.screens.includes(screen))?.id || 'home'
  const navScreens = NAV_SCREENS[activeNav] || [1]
  const Comp = SCREEN_MAP[screen]

  return (
    <div className="fa2-page">
      <div className="fa2-page-header">
        <p className="fa2-page-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h1 className="fa2-page-title">Facilitator App</h1>
        <p className="fa2-page-sub">10-screen mobile wireframe · Figma-level structure · Full upload system</p>
      </div>

      <div className="fa2-layout">
        {/* Screen list sidebar */}
        <div className="fa2-sidebar">
          {BOTTOM_NAV.map(nav => (
            <div key={nav.id} className="fa2-nav-group">
              <p className="fa2-nav-group-head">{nav.icon} {nav.label}</p>
              {NAV_SCREENS[nav.id].map(n => (
                <button key={n}
                  className={`fa2-sidebar-btn${n === screen ? ' active' : ''}`}
                  onClick={() => setScreen(n)}>
                  <span className="fa2-sb-num">S{n}</span>
                  <span className="fa2-sb-label">{SCREEN_LABELS[n]}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Phone */}
        <div className="fa2-phone-wrap">
          <div className="fa2-phone">
            <div className="fa2-phone-notch" />
            <div className="fa2-phone-body">
              <Comp />
            </div>
            {/* Bottom nav */}
            <div className="fa2-bottom-nav">
              {BOTTOM_NAV.map(nav => (
                <button key={nav.id}
                  className={`fa2-bnav-btn${nav.id === activeNav ? ' active' : ''}`}
                  onClick={() => setScreen(NAV_SCREENS[nav.id][0])}>
                  <span className="fa2-bnav-icon">{nav.icon}</span>
                  <span className="fa2-bnav-label">{nav.label}</span>
                </button>
              ))}
            </div>
            <div className="fa2-phone-home-bar" />
          </div>
          <p className="fa2-phone-caption">Screen {screen} — {SCREEN_LABELS[screen]}</p>

          {/* Sub-screen pills (when nav has multiple) */}
          {navScreens.length > 1 && (
            <div className="fa2-sub-pills">
              {navScreens.map(n => (
                <button key={n}
                  className={`fa2-sub-pill${n === screen ? ' active' : ''}`}
                  onClick={() => setScreen(n)}>S{n}: {SCREEN_LABELS[n]}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
