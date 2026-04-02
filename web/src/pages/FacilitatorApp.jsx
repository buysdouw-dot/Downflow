import { useState } from 'react'

/* ─────────────────────────────────────────────────────────
   FACILITATOR APP — 8-Screen Mobile UI Mockup
   Dashboard · Session · Record · Edit · Upload
   Homework · Cell Feed · Performance
───────────────────────────────────────────────────────── */

const SCREENS = [
  { id: 'dashboard',   num: 1, label: 'Dashboard',   icon: '🏠' },
  { id: 'session',     num: 2, label: 'Class Session', icon: '📋' },
  { id: 'record',      num: 3, label: 'Record',        icon: '🎥' },
  { id: 'edit',        num: 4, label: 'Quick Edit',    icon: '✂️' },
  { id: 'upload',      num: 5, label: 'Upload',        icon: '☁️' },
  { id: 'homework',    num: 6, label: 'Homework',      icon: '📝' },
  { id: 'feed',        num: 7, label: 'Cell Feed',     icon: '📱' },
  { id: 'performance', num: 8, label: 'Performance',   icon: '⭐' },
]

/* ── Screen 1: Dashboard ── */
function ScreenDashboard() {
  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-topnav">
        <div>
          <p className="fapp-greeting">Good morning, Linh 👋</p>
          <p className="fapp-date">Thursday, 3 April</p>
        </div>
        <div className="fapp-avatar-ring">LN</div>
      </div>

      {/* Earnings card */}
      <div className="fapp-earn-card">
        <p className="fapp-earn-label">This Week's Earnings</p>
        <p className="fapp-earn-amount">₫ 432,000</p>
        <p className="fapp-earn-sub">Phase 2 · 40% rate · <span className="fapp-earn-good">+12% vs last week</span></p>
        <div className="fapp-earn-bar-track"><div className="fapp-earn-bar" style={{ width: '68%' }} /></div>
        <p className="fapp-earn-bar-label">68% of weekly target</p>
      </div>

      {/* Quick stats */}
      <div className="fapp-quick-stats">
        <div className="fapp-stat-chip blue"><span>3</span><small>Active Cells</small></div>
        <div className="fapp-stat-chip green"><span>2</span><small>Today's Classes</small></div>
        <div className="fapp-stat-chip orange warn"><span>4 ⚠️</span><small>Pending Uploads</small></div>
      </div>

      {/* Today's classes */}
      <p className="fapp-section-head">Today's Classes</p>
      <div className="fapp-class-list">
        {[
          { cell: 'Cell A12', time: '10:00 AM', students: 5, status: 'upcoming' },
          { cell: 'Cell B07', time: '2:30 PM',  students: 6, status: 'upcoming' },
        ].map(c => (
          <div key={c.cell} className="fapp-class-row">
            <div className="fapp-class-dot" />
            <div className="fapp-class-info">
              <strong>{c.cell}</strong>
              <span>{c.time} · {c.students} students</span>
            </div>
            <span className="fapp-class-badge">{c.status}</span>
          </div>
        ))}
      </div>

      {/* Pending uploads */}
      <p className="fapp-section-head warn">⚠️ Pending Uploads</p>
      <div className="fapp-upload-alerts">
        {['Cell A12 · Mon session', 'Cell B07 · Tue session'].map(u => (
          <div key={u} className="fapp-upload-alert-row">
            <span>📹 {u}</span>
            <button className="fapp-mini-btn">Upload</button>
          </div>
        ))}
      </div>

      <button className="fapp-primary-btn">🎬 Start Class / Upload Content</button>
    </div>
  )
}

/* ── Screen 2: Class Session ── */
function ScreenSession() {
  const students = ['Anh', 'Ben', 'Cai', 'Dara', 'Eva', 'Finn']
  const avatarColors = ['#6c63ff','#f97316','#27ae60','#e05a5a','#2980b9','#9b59b6']
  const [timer, setTimer] = useState('24:17')

  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>

      <div className="fapp-session-header">
        <div>
          <p className="fapp-cell-name">Cell A12</p>
          <p className="fapp-cell-sub">Speaking & Communication · Week 4</p>
        </div>
        <div className="fapp-timer">⏱ {timer}</div>
      </div>

      {/* Student avatars */}
      <p className="fapp-section-head">Students ({students.length})</p>
      <div className="fapp-student-row">
        {students.map((s, i) => (
          <div key={s} className="fapp-student-avatar" style={{ background: avatarColors[i] }}>
            {s[0]}
            <span className="fapp-student-name">{s}</span>
          </div>
        ))}
      </div>

      {/* Today's activity */}
      <div className="fapp-activity-card">
        <p className="fapp-activity-label">Today's Focus</p>
        <p className="fapp-activity-title">Confident Introductions</p>
        <p className="fapp-activity-desc">Each student introduces themselves and describes one thing they love.</p>
        <div className="fapp-activity-progress">
          <div className="fapp-ap-bar" style={{ width: '50%' }} />
        </div>
        <p className="fapp-ap-label">3 / 6 students completed</p>
      </div>

      {/* Action buttons */}
      <div className="fapp-action-grid">
        <button className="fapp-action-btn primary">🎥 Record Clip</button>
        <button className="fapp-action-btn">📝 Assign Homework</button>
        <button className="fapp-action-btn">📊 Mark Participation</button>
        <button className="fapp-action-btn end">⏹ End Session</button>
      </div>
    </div>
  )
}

/* ── Screen 3: Record Content ── */
function ScreenRecord() {
  const [clipType, setClipType] = useState('Speaking')
  const [student,  setStudent]  = useState('Anh')
  const [recording, setRecording] = useState(false)

  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-screen-topbar">
        <span className="fapp-back">← Cell A12</span>
        <span className="fapp-screen-title">Record Clip</span>
        <span />
      </div>

      {/* Camera viewfinder */}
      <div className={`fapp-viewfinder${recording ? ' recording' : ''}`}>
        <div className="fapp-vf-corners">
          <span className="fapp-corner tl"/><span className="fapp-corner tr"/>
          <span className="fapp-corner bl"/><span className="fapp-corner br"/>
        </div>
        {recording && <div className="fapp-rec-badge">● REC</div>}
        <div className="fapp-student-tag">{student}</div>
        <div className="fapp-vf-overlay">
          <span className="fapp-vf-icon">👤</span>
        </div>
      </div>

      {/* Student selector */}
      <p className="fapp-section-head">Auto-tag Student</p>
      <div className="fapp-student-chips">
        {['Anh','Ben','Cai','Dara','Eva','Finn'].map(s => (
          <button key={s} className={`fapp-chip${s === student ? ' active' : ''}`}
            onClick={() => setStudent(s)}>{s}</button>
        ))}
      </div>

      {/* Clip type */}
      <p className="fapp-section-head">Clip Type</p>
      <div className="fapp-clip-types">
        {['Speaking','Activity','Presentation'].map(t => (
          <button key={t} className={`fapp-clip-type${t === clipType ? ' active' : ''}`}
            onClick={() => setClipType(t)}>{t}</button>
        ))}
      </div>

      <p className="fapp-auto-save-note">✓ Auto-save enabled · tagged to {student} · {clipType}</p>

      <button className={`fapp-record-btn${recording ? ' stop' : ''}`}
        onClick={() => setRecording(r => !r)}>
        {recording ? '⏹ Stop Recording' : '🔴 Start Recording'}
      </button>
    </div>
  )
}

/* ── Screen 4: Quick Edit ── */
function ScreenEdit() {
  const [trim, setTrim] = useState([15, 80])

  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-screen-topbar">
        <span className="fapp-back">← Record</span>
        <span className="fapp-screen-title">Quick Edit</span>
        <button className="fapp-save-btn">Save</button>
      </div>

      {/* Video preview */}
      <div className="fapp-edit-preview">
        <span className="fapp-ep-icon">▶</span>
        <p className="fapp-ep-label">Anh · Speaking · 0:06</p>
      </div>

      {/* Timeline trim */}
      <p className="fapp-section-head">Trim</p>
      <div className="fapp-timeline">
        <div className="fapp-tl-track">
          <div className="fapp-tl-fill" style={{ left: `${trim[0]}%`, width: `${trim[1] - trim[0]}%` }} />
          <div className="fapp-tl-handle left" style={{ left: `${trim[0]}%` }} />
          <div className="fapp-tl-handle right" style={{ left: `${trim[1]}%` }} />
        </div>
        <div className="fapp-tl-labels">
          <span>0:00</span><span>0:03</span><span>0:06</span>
        </div>
      </div>

      {/* Caption */}
      <p className="fapp-section-head">Caption <span className="fapp-ai-badge">AI</span></p>
      <div className="fapp-caption-field">
        <span className="fapp-caption-text">"Anh speaks confidently about her weekend."</span>
        <button className="fapp-refresh-btn">↻</button>
      </div>

      {/* Highlight toggle */}
      <div className="fapp-highlight-row">
        <div>
          <p className="fapp-hl-label">Mark as Highlight Clip</p>
          <p className="fapp-hl-sub">Visible in sponsor feed and cell highlights</p>
        </div>
        <div className="fapp-toggle on"><div className="fapp-toggle-knob" /></div>
      </div>

      <button className="fapp-primary-btn">Next: Upload →</button>
    </div>
  )
}

/* ── Screen 5: Upload & Organize ── */
function ScreenUpload() {
  const [category, setCategory] = useState('Weekly Output')

  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-screen-topbar">
        <span className="fapp-back">← Edit</span>
        <span className="fapp-screen-title">Upload & Organize</span>
        <span />
      </div>

      <div className="fapp-upload-thumb">
        <span className="fapp-ut-icon">🎬</span>
        <div><p className="fapp-ut-name">Anh_speaking_04-03.mp4</p><p className="fapp-ut-meta">0:04 · 2.1 MB</p></div>
      </div>

      {/* Select class */}
      <p className="fapp-section-head">Select Class</p>
      <div className="fapp-select-field">Cell A12 · Session #7 ▾</div>

      {/* Select students */}
      <p className="fapp-section-head">Tagged Students</p>
      <div className="fapp-student-chips">
        {['Anh','Ben','Cai','Dara','Eva','Finn'].map((s, i) => (
          <button key={s} className={`fapp-chip${i < 2 ? ' active' : ''}`}>{s}</button>
        ))}
      </div>

      {/* Category */}
      <p className="fapp-section-head">Clip Category</p>
      <div className="fapp-clip-types">
        {['Weekly Output','Daily Rep','Highlight'].map(c => (
          <button key={c} className={`fapp-clip-type${c === category ? ' active' : ''}`}
            onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {/* Upload progress */}
      <div className="fapp-upload-progress">
        <div className="fapp-up-bar" />
        <p className="fapp-up-label">Ready to upload</p>
      </div>

      <button className="fapp-primary-btn green">☁️ Upload to Cell Feed</button>
    </div>
  )
}

/* ── Screen 6: Homework Assignment ── */
function ScreenHomework() {
  const [taskType, setTaskType] = useState('Voice task')

  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-screen-topbar">
        <span className="fapp-back">← Session</span>
        <span className="fapp-screen-title">Assign Homework</span>
        <span />
      </div>

      <p className="fapp-hw-for">Cell A12 · Due: Friday</p>

      <p className="fapp-section-head">Task Type</p>
      <div className="fapp-hw-types">
        {[
          { label: 'Voice task',         icon: '🎙', desc: 'Record a spoken response' },
          { label: 'Video task',          icon: '📹', desc: 'Record a short video' },
          { label: 'Reflection question', icon: '💭', desc: 'Write or speak your thoughts' },
        ].map(t => (
          <button key={t.label}
            className={`fapp-hw-type${t.label === taskType ? ' active' : ''}`}
            onClick={() => setTaskType(t.label)}>
            <span className="fapp-hw-icon">{t.icon}</span>
            <span className="fapp-hw-label">{t.label}</span>
            <span className="fapp-hw-desc">{t.desc}</span>
          </button>
        ))}
      </div>

      <p className="fapp-section-head">Task Prompt</p>
      <div className="fapp-prompt-card">
        <p className="fapp-prompt-example">"Speak for 1 minute about your day."</p>
        <p className="fapp-prompt-hint">Students record directly in app — no external tools needed.</p>
      </div>

      <div className="fapp-hw-options-row">
        <label className="fapp-hw-check"><input type="checkbox" defaultChecked /><span>Notify all students</span></label>
        <label className="fapp-hw-check"><input type="checkbox" /><span>Guider can comment</span></label>
      </div>

      <button className="fapp-primary-btn">📨 Send Homework to Cell A12</button>
    </div>
  )
}

/* ── Screen 7: Cell Feed ── */
function ScreenFeed() {
  const posts = [
    { student: 'Anh',  type: 'Speaking',  thumb: '🗣️', time: '2h ago',  likes: 4, comment: 'Great confidence!' },
    { student: 'Ben',  type: 'Homework',  thumb: '📹', time: '5h ago',  likes: 3, comment: 'Good effort!' },
    { student: 'Cai',  type: 'Highlight', thumb: '⭐', time: 'Yesterday', likes: 7, comment: 'Top of the week!' },
  ]
  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-screen-topbar">
        <span />
        <span className="fapp-screen-title">Cell A12 Feed</span>
        <span />
      </div>

      <div className="fapp-feed-visible-row">
        <p className="fapp-fv-label">Visible to:</p>
        {['Facilitator','Students','Guider','Sponsor'].map(r => (
          <span key={r} className="fapp-fv-chip">{r}</span>
        ))}
      </div>

      <div className="fapp-feed-list">
        {posts.map(p => (
          <div key={p.student} className="fapp-feed-card">
            <div className="fapp-feed-header">
              <span className="fapp-feed-avatar">{p.student[0]}</span>
              <div>
                <p className="fapp-feed-name">{p.student}</p>
                <p className="fapp-feed-meta">{p.type} · {p.time}</p>
              </div>
              <span className="fapp-feed-type-icon">{p.thumb}</span>
            </div>
            <div className="fapp-feed-video-thumb">
              <span className="fapp-fvt-play">▶</span>
            </div>
            <div className="fapp-feed-footer">
              <span>❤️ {p.likes}</span>
              <span className="fapp-feed-comment">"{p.comment}"</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Screen 8: Performance + Coins ── */
function ScreenPerformance() {
  const students = [
    { name: 'Anh',  part: 95, uploads: 100, speaking: 82, coins: 48 },
    { name: 'Ben',  part: 80, uploads: 75,  speaking: 70, coins: 38 },
    { name: 'Cai',  part: 100,uploads: 90,  speaking: 88, coins: 52 },
    { name: 'Dara', part: 60, uploads: 50,  speaking: 65, coins: 28 },
    { name: 'Eva',  part: 85, uploads: 80,  speaking: 78, coins: 41 },
  ]
  return (
    <div className="fapp-screen">
      <div className="fapp-status-bar"><span>9:41</span><span>●●● 5G 🔋</span></div>
      <div className="fapp-screen-topbar">
        <span />
        <span className="fapp-screen-title">Performance</span>
        <span />
      </div>

      <div className="fapp-group-score-card">
        <p className="fapp-gs-label">Cell A12 · Group Score</p>
        <p className="fapp-gs-score">84<span>/ 100</span></p>
        <p className="fapp-gs-note">Coins distributed based on group performance — not individual only</p>
      </div>

      <p className="fapp-section-head">Individual Breakdown</p>
      <div className="fapp-perf-table">
        <div className="fapp-pt-head">
          <span>Student</span><span>Part.</span><span>Uploads</span><span>Speaking</span><span>🪙</span>
        </div>
        {students.map(s => (
          <div key={s.name} className="fapp-pt-row">
            <span className="fapp-pt-name">{s.name}</span>
            <span style={{ color: s.part >= 80 ? '#4de8b0' : '#f97316' }}>{s.part}%</span>
            <span style={{ color: s.uploads >= 80 ? '#4de8b0' : '#f97316' }}>{s.uploads}%</span>
            <span style={{ color: s.speaking >= 80 ? '#4de8b0' : '#f97316' }}>{s.speaking}%</span>
            <span className="fapp-pt-coins">{s.coins}</span>
          </div>
        ))}
      </div>

      <div className="fapp-perf-legend">
        <span className="fapp-leg green">● ≥80% on track</span>
        <span className="fapp-leg orange">● &lt;80% needs support</span>
      </div>
    </div>
  )
}

const SCREEN_COMPONENTS = {
  dashboard: ScreenDashboard,
  session:   ScreenSession,
  record:    ScreenRecord,
  edit:      ScreenEdit,
  upload:    ScreenUpload,
  homework:  ScreenHomework,
  feed:      ScreenFeed,
  performance: ScreenPerformance,
}

/* ─── Main page ─── */
export default function FacilitatorApp() {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const ScreenComponent = SCREEN_COMPONENTS[activeScreen]

  return (
    <div className="fapp-page">
      <div className="fapp-page-header">
        <p className="fapp-page-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h1 className="fapp-page-title">Facilitator App</h1>
        <p className="fapp-page-sub">8-screen mobile UI · Upload system · Performance tracking</p>
      </div>

      <div className="fapp-layout">
        {/* Screen nav sidebar */}
        <div className="fapp-screen-nav">
          {SCREENS.map(s => (
            <button key={s.id}
              className={`fapp-snav-btn${s.id === activeScreen ? ' active' : ''}`}
              onClick={() => setActiveScreen(s.id)}>
              <span className="fapp-snav-icon">{s.icon}</span>
              <span className="fapp-snav-num">Screen {s.num}</span>
              <span className="fapp-snav-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Phone mockup */}
        <div className="fapp-phone-wrap">
          <div className="fapp-phone">
            <div className="fapp-phone-notch" />
            <div className="fapp-phone-screen">
              <ScreenComponent />
            </div>
            <div className="fapp-phone-bar" />
          </div>
          <p className="fapp-phone-label">
            Screen {SCREENS.find(s => s.id === activeScreen)?.num} — {SCREENS.find(s => s.id === activeScreen)?.label}
          </p>
        </div>
      </div>
    </div>
  )
}
