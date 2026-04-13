import { useState, useRef } from 'react'
import VideoUpload from '../components/VideoUpload.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

/* ═══════════════════════════════════════════════════════════════
   DOWNFLOW — Session Recordings Library
   Facilitators paste/edit recording links per week.
   Students are marked Attended / Not Attended after watching.
═══════════════════════════════════════════════════════════════ */

// ─── Demo cell data ──────────────────────────────────────────
const CELLS_META = [
  { id: 'VN-01', region: 'Hanoi 🇻🇳',    facilitator: 'Minh P.',  pack: 'Voice & Presence',       color: '#a78bfa' },
  { id: 'VN-02', region: 'HCMC 🇻🇳',     facilitator: 'Linh T.',  pack: 'Kidinomics',              color: '#f0c040' },
  { id: 'VN-03', region: 'Da Nang 🇻🇳',  facilitator: 'Hoa N.',   pack: 'Social Systems',          color: '#38d9a9' },
  { id: 'DE-01', region: 'Berlin 🇩🇪',    facilitator: 'Felix K.', pack: 'Pencil Proof',            color: '#5b9bd5' },
]

// ─── Demo students per cell ──────────────────────────────────
const CELL_STUDENTS = {
  'VN-01': [
    { id: 's1',  name: 'An Nguyen',   avatar: '🧒', streak: 12 },
    { id: 's2',  name: 'Bao Tran',    avatar: '👦', streak: 9  },
    { id: 's3',  name: 'Chi Le',      avatar: '👧', streak: 11 },
    { id: 's4',  name: 'Duc Pham',    avatar: '🧑', streak: 7  },
    { id: 's5',  name: 'Em Vo',       avatar: '👧', streak: 14 },
    { id: 's6',  name: 'Gia Hoang',   avatar: '🧒', streak: 5  },
    { id: 's7',  name: 'Hoa Dinh',    avatar: '👦', streak: 10 },
    { id: 's8',  name: 'Ivy Nguyen',  avatar: '👧', streak: 8  },
  ],
  'VN-02': [
    { id: 's9',  name: 'Khanh Mai',   avatar: '🧒', streak: 6  },
    { id: 's10', name: 'Lan Bui',     avatar: '👧', streak: 9  },
    { id: 's11', name: 'Minh Ly',     avatar: '👦', streak: 11 },
    { id: 's12', name: 'Nam Dang',    avatar: '🧑', streak: 4  },
    { id: 's13', name: 'Oanh Phan',   avatar: '👧', streak: 8  },
    { id: 's14', name: 'Phuc Tran',   avatar: '🧒', streak: 7  },
    { id: 's15', name: 'Quynh Ho',    avatar: '👧', streak: 12 },
  ],
  'VN-03': [
    { id: 's16', name: 'Rong Le',     avatar: '🧒', streak: 3  },
    { id: 's17', name: 'Son Vu',      avatar: '👦', streak: 6  },
    { id: 's18', name: 'Thu Nguyen',  avatar: '👧', streak: 5  },
    { id: 's19', name: 'Uyen Tran',   avatar: '👧', streak: 8  },
    { id: 's20', name: 'Van Doan',    avatar: '🧑', streak: 2  },
    { id: 's21', name: 'Xuan Pham',   avatar: '🧒', streak: 7  },
  ],
  'DE-01': [
    { id: 's22', name: 'Felix K.',    avatar: '👦', streak: 21 },
    { id: 's23', name: 'Mia Schulz',  avatar: '👧', streak: 18 },
    { id: 's24', name: 'Leon Braun',  avatar: '🧑', streak: 15 },
    { id: 's25', name: 'Lena Müller', avatar: '👧', streak: 17 },
    { id: 's26', name: 'Tom Fischer', avatar: '🧒', streak: 12 },
    { id: 's27', name: 'Emma Bauer',  avatar: '👧', streak: 19 },
    { id: 's28', name: 'Max Weber',   avatar: '👦', streak: 9  },
    { id: 's29', name: 'Sara Koch',   avatar: '👧', streak: 14 },
  ],
}

// ─── Generate 12 weeks of session recordings ─────────────────
function makeWeeks(cellId) {
  const pack = CELLS_META.find(c => c.id === cellId)?.pack || ''
  const students = CELL_STUDENTS[cellId] || []

  // Pre-seed some watch records for realism
  const seedAttendance = (weekIdx, sessionIdx) => {
    if (weekIdx > 6) return {} // future weeks — no data
    const result = {}
    students.forEach((s, si) => {
      if (weekIdx < 5) {
        // mostly attended
        result[s.id] = Math.random() > 0.15 ? 'watched' : 'not-watched'
      } else if (weekIdx === 5) {
        result[s.id] = si % 3 === 0 ? 'not-watched' : 'watched'
      } else {
        result[s.id] = 'not-watched' // recent — nobody's watched yet
      }
    })
    return result
  }

  return Array.from({ length: 12 }, (_, wi) => ({
    week: wi + 1,
    label: `Week ${wi + 1}`,
    phase: wi < 2 ? 'Awareness' : wi < 4 ? 'Confidence' : wi < 7 ? 'Skill Development' : wi < 10 ? 'Value Creation' : 'Contribution',
    phaseColor: wi < 2 ? '#b083ff' : wi < 4 ? '#72d0ff' : wi < 7 ? '#38d9a9' : wi < 10 ? '#f0c040' : '#ff9f5a',
    sessions: [
      {
        id: `${cellId}-w${wi + 1}-s1`,
        session: 1,
        title: getSessionTitle(pack, wi + 1, 1),
        date: getDate(wi, 0),
        duration: '62 min',
        url: wi < 7 ? `https://drive.google.com/file/d/demo-${cellId}-w${wi+1}-s1` : '',
        thumbnail: '',
        notes: wi < 5 ? getNote(pack, wi + 1, 1) : '',
        attendance: seedAttendance(wi, 0),
        uploadedBy: CELLS_META.find(c => c.id === cellId)?.facilitator || '',
        uploadedAt: wi < 7 ? `${5 - wi} days ago` : '',
        status: wi < 7 ? 'ready' : 'pending',
      },
      {
        id: `${cellId}-w${wi + 1}-s2`,
        session: 2,
        title: getSessionTitle(pack, wi + 1, 2),
        date: getDate(wi, 3),
        duration: '58 min',
        url: wi < 6 ? `https://drive.google.com/file/d/demo-${cellId}-w${wi+1}-s2` : '',
        thumbnail: '',
        notes: wi < 5 ? getNote(pack, wi + 1, 2) : '',
        attendance: seedAttendance(wi, 1),
        uploadedBy: CELLS_META.find(c => c.id === cellId)?.facilitator || '',
        uploadedAt: wi < 6 ? `${6 - wi} days ago` : '',
        status: wi < 6 ? 'ready' : 'pending',
      },
    ]
  }))
}

function getDate(weekIdx, dayOffset) {
  const base = new Date('2026-01-05')
  base.setDate(base.getDate() + weekIdx * 7 + dayOffset)
  return base.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function getSessionTitle(pack, week, session) {
  const titles = {
    'Voice & Presence': [
      ['Silence & the 3-second rule', 'Body language foundations'],
      ['Tone and volume control', 'The power of the pause'],
      ['Storytelling structure', '60-second story challenge'],
      ['Commanding attention', 'Eye contact & stage presence'],
      ['Handling nerves live', 'Breath and voice warm-ups'],
      ['Group presentation prep', 'Peer feedback session'],
      ['Micro-speech: 90 seconds', 'Q&A handling techniques'],
      ['Voice leading a group', 'Leading vs. speaking'],
      ['Interview simulation', 'Presenting an idea cold'],
      ['Teaching another student', 'Voice coaching practice'],
      ['Final performance prep', 'Dress rehearsal'],
      ['Final performances', 'Reflection & coin ceremony'],
    ],
    'Kidinomics': [
      ['What is value?', 'Exchange and fairness'],
      ['Effort and reward', 'The coin system explained'],
      ['Save, spend, share', 'Real choices with coins'],
      ['What is a business?', 'Needs vs. wants'],
      ['Understanding prices', 'Why things cost what they cost'],
      ['Starting something small', 'Mini-market simulation'],
      ['Sponsorship explained', 'Why businesses fund education'],
      ['Compound effort', 'How skills grow over time'],
      ['Group project planning', 'Division of value'],
      ['Pitching an idea', 'Peer investment simulation'],
      ['Final project prep', 'Presenting your micro-business'],
      ['Final pitches', 'Reflection & value celebration'],
    ],
    'Social Systems': [
      ['How groups form', 'Roles within groups'],
      ['Group dynamics live', 'Observing your own group'],
      ['Cause and effect', 'Systems mapping activity'],
      ['How decisions get made', 'Consensus vs. authority'],
      ['Confidence as a system', 'Small wins stacking'],
      ['Leadership rotation 1', 'Leading vs. following'],
      ['Building on strengths', 'Individual role mapping'],
      ['Systems in nature', 'Drawing a system you live in'],
      ['Leadership rotation 2', 'Navigating disagreement'],
      ['Feedback loops', 'How groups improve themselves'],
      ['Final group challenge', 'Design a system together'],
      ['Presentations', 'Reflection & roles recognised'],
    ],
    'Pencil Proof': [
      ['Explain a picture in 60 sec', 'No notes allowed'],
      ['Retell a story without prep', 'Simplify the complex'],
      ['Describe how something works', 'Teach an imaginary friend'],
      ['One word = one idea', 'Strip the explanation bare'],
      ['Explain using only questions', 'The Socratic challenge'],
      ['Partner explanation test', 'Did they actually understand?'],
      ['Teach something you just learned', 'Speed explanation'],
      ['Explain without examples', 'Core idea only'],
      ['Explain backwards', 'Start with the conclusion'],
      ['Live challenge: unknown topic', 'Cold explanation, 2 min'],
      ['Final challenge prep', 'Build your clearest explanation'],
      ['Final explanations', 'Peer scored, coin ceremony'],
    ],
  }
  const t = titles[pack] || titles['Voice & Presence']
  return t[week - 1]?.[session - 1] || `Session ${session}`
}

function getNote(pack, week, session) {
  const notes = [
    'Strong participation this session. 7/8 students completed the activity.',
    'Two students needed extra support — flagged for facilitator follow-up.',
    'Best session of the cycle so far. Energy was excellent.',
    'Recording trimmed — first 4 min removed (technical setup).',
    'Group exercise worked very well. Recommend repeating next week.',
  ]
  return notes[(week + session) % notes.length]
}

// ─── INITIAL STATE ────────────────────────────────────────────
const INIT_RECORDINGS = Object.fromEntries(
  CELLS_META.map(c => [c.id, makeWeeks(c.id)])
)

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════════ */

function AttendanceDot({ status, studentName, onClick }) {
  const label = status === 'watched' ? '✓ Watched' : status === 'not-watched' ? '✗ Not watched' : '— Not set'
  const cls = `sr-att-dot sr-att-${status || 'none'}`
  return (
    <button className={cls} title={`${studentName}: ${label}`} onClick={onClick} aria-label={`${studentName}: ${label}`}>
      {status === 'watched' ? '✓' : status === 'not-watched' ? '✗' : '·'}
    </button>
  )
}

function StudentRow({ student, status, onToggle }) {
  const cls = status === 'watched' ? 'sr-student-row sr-watched' : status === 'not-watched' ? 'sr-student-row sr-not-watched' : 'sr-student-row sr-none'
  return (
    <div className={cls}>
      <span className="sr-student-avatar">{student.avatar}</span>
      <span className="sr-student-name">{student.name}</span>
      <span className="sr-student-streak">🔥 {student.streak}d</span>
      <div className="sr-student-status-badges">
        <span className={`sr-watch-badge sr-watch-${status || 'none'}`}>
          {status === 'watched' ? '✅ Watched' : status === 'not-watched' ? '❌ Not Watched' : '— Pending'}
        </span>
      </div>
      <div className="sr-student-toggle">
        <button
          className={`sr-toggle-btn ${status === 'watched' ? 'active' : ''}`}
          onClick={() => onToggle(student.id, 'watched')}
          title="Mark as Watched"
        >✓</button>
        <button
          className={`sr-toggle-btn ${status === 'not-watched' ? 'active-no' : ''}`}
          onClick={() => onToggle(student.id, 'not-watched')}
          title="Mark as Not Watched"
        >✗</button>
      </div>
    </div>
  )
}

function SessionCard({ recording, students, cellColor, onUpdate, viewMode }) {
  const [expanded, setExpanded] = useState(false)
  const [editUrl, setEditUrl] = useState(false)
  const [urlInput, setUrlInput] = useState(recording.url)
  const [editNotes, setEditNotes] = useState(false)
  const [notesInput, setNotesInput] = useState(recording.notes)
  const [saving, setSaving] = useState(false)
  const urlRef = useRef(null)

  const watchedCount = Object.values(recording.attendance).filter(v => v === 'watched').length
  const totalStudents = students.length
  const pct = totalStudents > 0 ? Math.round((watchedCount / totalStudents) * 100) : 0

  function saveUrl() {
    setSaving(true)
    setTimeout(() => {
      onUpdate({ ...recording, url: urlInput, status: urlInput ? 'ready' : 'pending', uploadedAt: 'just now' })
      setEditUrl(false)
      setSaving(false)
    }, 400)
  }

  function saveNotes() {
    onUpdate({ ...recording, notes: notesInput })
    setEditNotes(false)
  }

  function toggleAttendance(studentId, value) {
    const current = recording.attendance[studentId]
    const newVal = current === value ? 'not-watched' : value
    onUpdate({
      ...recording,
      attendance: { ...recording.attendance, [studentId]: newVal }
    })
  }

  function markAll(value) {
    const newAtt = {}
    students.forEach(s => { newAtt[s.id] = value })
    onUpdate({ ...recording, attendance: newAtt })
  }

  const isReady = recording.status === 'ready' && recording.url

  return (
    <div className={`sr-session-card ${recording.status} ${expanded ? 'expanded' : ''}`} style={{ '--cc': cellColor }}>
      {/* Card header */}
      <div className="sr-session-head" onClick={() => setExpanded(e => !e)}>
        <div className="sr-session-num">S{recording.session}</div>
        <div className="sr-session-info">
          <div className="sr-session-title">{recording.title}</div>
          <div className="sr-session-meta">
            <span>📅 {recording.date}</span>
            <span>⏱ {recording.duration}</span>
            {recording.uploadedAt && <span>⬆️ {recording.uploadedAt}</span>}
          </div>
        </div>

        {/* Attendance dots (collapsed view) */}
        {!expanded && totalStudents > 0 && (
          <div className="sr-dots-row">
            {students.map(s => (
              <AttendanceDot
                key={s.id}
                status={recording.attendance[s.id]}
                studentName={s.name}
                onClick={e => { e.stopPropagation(); toggleAttendance(s.id, recording.attendance[s.id] === 'watched' ? 'not-watched' : 'watched') }}
              />
            ))}
          </div>
        )}

        {/* Watch rate badge */}
        <div className="sr-watch-rate" style={{ color: pct >= 80 ? '#38d9a9' : pct >= 50 ? '#f0c040' : '#ff7070' }}>
          {pct}%
          <span className="sr-wr-label">watched</span>
        </div>

        {/* Status pill */}
        <div className={`sr-status-pill ${recording.status}`}>
          {isReady ? '▶ Ready' : '⏳ Pending'}
        </div>

        <span className="sr-chevron">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="sr-session-body">

          {/* Video link row */}
          <div className="sr-video-row">
            <div className="sr-vr-left">
              <div className="sr-vr-label">Recording Link</div>
              {editUrl ? (
                <div className="sr-url-edit">
                  <input
                    ref={urlRef}
                    className="sr-url-input"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder="Paste Google Drive / YouTube / Vimeo link..."
                    autoFocus
                  />
                  <button className="sr-save-btn" onClick={saveUrl} disabled={saving}>
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button className="sr-cancel-btn" onClick={() => { setEditUrl(false); setUrlInput(recording.url) }}>Cancel</button>
                </div>
              ) : (
                <div className="sr-url-display">
                  {recording.url ? (
                    <a className="sr-url-link" href={recording.url} target="_blank" rel="noreferrer">
                      <span className="sr-url-icon">▶</span>
                      {recording.url.replace('https://drive.google.com/file/d/', 'drive.google.com › ').replace('https://', '')}
                    </a>
                  ) : (
                    <span className="sr-url-empty">No recording uploaded yet</span>
                  )}
                  <button className="sr-edit-btn" onClick={() => setEditUrl(true)}>
                    {recording.url ? '✏️ Edit link' : '+ Add link'}
                  </button>
                </div>
              )}
            </div>

            {isReady && (
              <a className="sr-watch-cta" href={recording.url} target="_blank" rel="noreferrer">
                <span className="sr-watch-cta-icon">▶</span>
                Watch Recording
              </a>
            )}
          </div>

          {/* Notes row */}
          <div className="sr-notes-row">
            <div className="sr-notes-label">Facilitator Notes</div>
            {editNotes ? (
              <div className="sr-notes-edit">
                <textarea
                  className="sr-notes-textarea"
                  value={notesInput}
                  onChange={e => setNotesInput(e.target.value)}
                  placeholder="Add notes about this session..."
                  rows={3}
                  autoFocus
                />
                <div className="sr-notes-actions">
                  <button className="sr-save-btn" onClick={saveNotes}>Save</button>
                  <button className="sr-cancel-btn" onClick={() => { setEditNotes(false); setNotesInput(recording.notes) }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="sr-notes-display">
                <span className="sr-notes-text">{recording.notes || 'No notes yet.'}</span>
                <button className="sr-edit-btn" onClick={() => setEditNotes(true)}>
                  {recording.notes ? '✏️ Edit' : '+ Add notes'}
                </button>
              </div>
            )}
          </div>

          {/* Student attendance section */}
          <div className="sr-att-section">
            <div className="sr-att-header">
              <div className="sr-att-title">
                Student Watch Attendance
                <span className="sr-att-count">
                  {watchedCount}/{totalStudents} watched
                </span>
              </div>
              <div className="sr-att-bulk-actions">
                <button className="sr-bulk-btn sr-bulk-all" onClick={() => markAll('watched')}>✓ Mark All Watched</button>
                <button className="sr-bulk-btn sr-bulk-none" onClick={() => markAll('not-watched')}>✗ Mark All Not Watched</button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="sr-att-progress">
              <div className="sr-att-bar" style={{ width: `${pct}%`, background: pct >= 80 ? '#38d9a9' : pct >= 50 ? '#f0c040' : '#ff7070' }} />
            </div>

            {/* Student list */}
            <div className="sr-students-list">
              {students.map(s => (
                <StudentRow
                  key={s.id}
                  student={s}
                  status={recording.attendance[s.id]}
                  onToggle={toggleAttendance}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function WeekSection({ week, students, cellColor, onUpdateSession }) {
  const [collapsed, setCollapsed] = useState(week.week > 8)

  const totalWatched = week.sessions.reduce((acc, s) => {
    return acc + Object.values(s.attendance).filter(v => v === 'watched').length
  }, 0)
  const totalPossible = week.sessions.length * students.length
  const weekPct = totalPossible > 0 ? Math.round((totalWatched / totalPossible) * 100) : 0
  const readyCount = week.sessions.filter(s => s.status === 'ready').length

  return (
    <div className="sr-week-section">
      <div className="sr-week-head" onClick={() => setCollapsed(c => !c)}>
        <div className="sr-week-num" style={{ background: week.phaseColor + '22', color: week.phaseColor, borderColor: week.phaseColor + '44' }}>
          W{week.week}
        </div>
        <div className="sr-week-info">
          <div className="sr-week-label">Week {week.week}</div>
          <div className="sr-week-phase" style={{ color: week.phaseColor }}>{week.phase}</div>
        </div>
        <div className="sr-week-sessions-status">
          {week.sessions.map(s => (
            <div key={s.id} className={`sr-week-sess-dot ${s.status}`} title={`Session ${s.session}: ${s.status}`} />
          ))}
          <span className="sr-week-ready">{readyCount}/{week.sessions.length} ready</span>
        </div>
        <div className="sr-week-pct" style={{ color: weekPct >= 75 ? '#38d9a9' : weekPct >= 40 ? '#f0c040' : 'var(--text-muted)' }}>
          {weekPct > 0 ? `${weekPct}% watched` : 'No data yet'}
        </div>
        <span className="sr-week-chevron">{collapsed ? '▼' : '▲'}</span>
      </div>

      {!collapsed && (
        <div className="sr-week-sessions">
          {week.sessions.map(session => (
            <SessionCard
              key={session.id}
              recording={session}
              students={students}
              cellColor={cellColor}
              onUpdate={updated => onUpdateSession(week.week, session.session, updated)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function SessionRecordings() {
  usePageMeta("Session Recordings", "All weekly session recordings for every cell. Students mark watched. Facilitators track replay attendance.")

  const { role } = useAuth()
  const [recordings, setRecordings] = useState(INIT_RECORDINGS)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadWeek, setUploadWeek] = useState(null)
  const [activeCell, setActiveCell] = useState('VN-01')
  const [view, setView] = useState('library') // 'library' | 'overview'
  const [filterPhase, setFilterPhase] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const cellMeta = CELLS_META.find(c => c.id === activeCell)
  const students = CELL_STUDENTS[activeCell] || []
  const weeks = recordings[activeCell] || []

  function updateSession(weekNum, sessionNum, updated) {
    setRecordings(prev => ({
      ...prev,
      [activeCell]: prev[activeCell].map(w =>
        w.week !== weekNum ? w : {
          ...w,
          sessions: w.sessions.map(s => s.session !== sessionNum ? s : updated)
        }
      )
    }))
  }

  // Aggregate stats for active cell
  const allSessions = weeks.flatMap(w => w.sessions)
  const readySessions = allSessions.filter(s => s.status === 'ready')
  const totalWatched = allSessions.reduce((acc, s) =>
    acc + Object.values(s.attendance).filter(v => v === 'watched').length, 0)
  const totalPossible = allSessions.length * students.length
  const overallPct = totalPossible > 0 ? Math.round((totalWatched / totalPossible) * 100) : 0

  const filteredWeeks = weeks.filter(w => {
    const phaseOk = filterPhase === 'all' || w.phase === filterPhase
    const statusOk = filterStatus === 'all' ||
      (filterStatus === 'ready' && w.sessions.some(s => s.status === 'ready')) ||
      (filterStatus === 'pending' && w.sessions.some(s => s.status === 'pending'))
    return phaseOk && statusOk
  })

  // Per-student overall watch rates
  const studentStats = students.map(s => {
    const watched = allSessions.filter(sess => sess.attendance[s.id] === 'watched').length
    return { ...s, watched, total: allSessions.length, pct: Math.round((watched / allSessions.length) * 100) || 0 }
  }).sort((a, b) => b.pct - a.pct)

  return (
    <>
    <div className="sr-page">

      {/* ── Page Header ── */}
      <div className="sr-hero">
        <div className="sr-hero-kicker">📹 Session Recordings Library</div>
        <h1 className="sr-hero-title">Replay & Watch Tracking</h1>
        <p className="sr-hero-sub">
          Paste recording links for each week. Students watch after sessions. Track who has and hasn't caught up.
        </p>
        {(role === 'facilitator' || role === 'platform') && (
          <button className="btn btn-primary" style={{marginTop:'1rem'}} onClick={()=>setShowUpload(true)}>
            📹 Upload Session Recording
          </button>
        )}
      </div>

      {/* ── Cell Selector ── */}
      <div className="sr-cell-tabs">
        {CELLS_META.map(c => {
          const cWeeks = recordings[c.id] || []
          const cSessions = cWeeks.flatMap(w => w.sessions)
          const cReady = cSessions.filter(s => s.status === 'ready').length
          return (
            <button
              key={c.id}
              className={`sr-cell-tab ${activeCell === c.id ? 'active' : ''}`}
              style={activeCell === c.id ? { borderColor: c.color, color: c.color, background: c.color + '12' } : {}}
              onClick={() => setActiveCell(c.id)}
            >
              <span className="sr-ct-id">{c.id}</span>
              <span className="sr-ct-region">{c.region}</span>
              <span className="sr-ct-pack">{c.pack}</span>
              <span className="sr-ct-count" style={{ color: c.color }}>{cReady}/24 ready</span>
            </button>
          )
        })}
      </div>

      {/* ── Cell Summary Bar ── */}
      <div className="sr-summary-bar">
        <div className="sr-summary-cell-info">
          <div className="sr-sci-id" style={{ color: cellMeta.color }}>{cellMeta.id}</div>
          <div className="sr-sci-detail">{cellMeta.region} · {cellMeta.facilitator} · {cellMeta.pack}</div>
        </div>
        <div className="sr-summary-stats">
          <div className="sr-sum-stat">
            <span className="sr-sum-n" style={{ color: '#38d9a9' }}>{readySessions.length}</span>
            <span className="sr-sum-l">Recordings ready</span>
          </div>
          <div className="sr-sum-stat">
            <span className="sr-sum-n" style={{ color: '#f0c040' }}>{allSessions.length - readySessions.length}</span>
            <span className="sr-sum-l">Pending upload</span>
          </div>
          <div className="sr-sum-stat">
            <span className="sr-sum-n">{students.length}</span>
            <span className="sr-sum-l">Students</span>
          </div>
          <div className="sr-sum-stat">
            <span className="sr-sum-n" style={{ color: overallPct >= 70 ? '#38d9a9' : '#f0c040' }}>{overallPct}%</span>
            <span className="sr-sum-l">Overall watched</span>
          </div>
        </div>
        {/* Overall watch progress bar */}
        <div className="sr-summary-progress">
          <div className="sr-sp-bar" style={{ width: `${overallPct}%`, background: overallPct >= 70 ? '#38d9a9' : '#f0c040' }} />
        </div>
      </div>

      {/* ── View toggle + filters ── */}
      <div className="sr-toolbar">
        <div className="sr-view-toggle">
          <button className={`sr-vt-btn ${view === 'library' ? 'active' : ''}`} onClick={() => setView('library')}>
            📹 Week Library
          </button>
          <button className={`sr-vt-btn ${view === 'overview' ? 'active' : ''}`} onClick={() => setView('overview')}>
            👥 Student Overview
          </button>
        </div>
        {view === 'library' && (
          <div className="sr-filters">
            <select className="sr-select" value={filterPhase} onChange={e => setFilterPhase(e.target.value)}>
              <option value="all">All Phases</option>
              <option value="Awareness">Awareness (Wk 1-2)</option>
              <option value="Confidence">Confidence (Wk 3-4)</option>
              <option value="Skill Development">Skill Development (Wk 5-7)</option>
              <option value="Value Creation">Value Creation (Wk 8-10)</option>
              <option value="Contribution">Contribution (Wk 11-12)</option>
            </select>
            <select className="sr-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="ready">Ready to Watch</option>
              <option value="pending">Pending Upload</option>
            </select>
          </div>
        )}
      </div>

      {/* ══════ LIBRARY VIEW ══════ */}
      {view === 'library' && (
        <div className="sr-library">
          {filteredWeeks.length === 0 && (
            <div className="sr-empty">No weeks match the current filters.</div>
          )}
          {filteredWeeks.map(week => (
            <WeekSection
              key={week.week}
              week={week}
              students={students}
              cellColor={cellMeta.color}
              onUpdateSession={updateSession}
            />
          ))}
        </div>
      )}

      {/* ══════ STUDENT OVERVIEW ══════ */}
      {view === 'overview' && (
        <div className="sr-overview">
          <div className="sr-overview-header">
            <h2 className="sr-ov-title">Student Replay Attendance — {cellMeta.id}</h2>
            <p className="sr-ov-sub">Who has watched which sessions after class. Click a dot to toggle watched/not-watched.</p>
          </div>

          {/* Per-student summary rows */}
          <div className="sr-ov-students">
            {studentStats.map(s => (
              <div key={s.id} className="sr-ov-student-row">
                <div className="sr-ov-s-left">
                  <span className="sr-ov-avatar">{s.avatar}</span>
                  <div className="sr-ov-s-info">
                    <span className="sr-ov-s-name">{s.name}</span>
                    <span className="sr-ov-s-streak">🔥 {s.streak} day streak</span>
                  </div>
                </div>
                <div className="sr-ov-progress-wrap">
                  <div className="sr-ov-bar-bg">
                    <div className="sr-ov-bar"
                      style={{
                        width: `${s.pct}%`,
                        background: s.pct >= 80 ? '#38d9a9' : s.pct >= 50 ? '#f0c040' : '#ff7070'
                      }}
                    />
                  </div>
                  <span className="sr-ov-pct" style={{ color: s.pct >= 80 ? '#38d9a9' : s.pct >= 50 ? '#f0c040' : '#ff7070' }}>
                    {s.pct}%
                  </span>
                </div>
                <div className="sr-ov-dots">
                  {allSessions.map(sess => {
                    const status = sess.attendance[s.id]
                    return (
                      <button
                        key={sess.id}
                        className={`sr-ov-dot sr-ov-dot-${status || 'none'}`}
                        title={`${sess.title} · ${sess.date}`}
                        onClick={() => {
                          const newVal = status === 'watched' ? 'not-watched' : 'watched'
                          // find which week/session this belongs to
                          const wk = weeks.find(w => w.sessions.some(x => x.id === sess.id))
                          const sessionNum = sess.session
                          if (wk) {
                            updateSession(wk.week, sessionNum, {
                              ...sess,
                              attendance: { ...sess.attendance, [s.id]: newVal }
                            })
                          }
                        }}
                      />
                    )
                  })}
                </div>
                <div className="sr-ov-count">
                  {s.watched}/{s.total}
                </div>
              </div>
            ))}
          </div>

          {/* Session legend */}
          <div className="sr-ov-legend">
            <div className="sr-leg-title">Session Map (hover dots for details)</div>
            <div className="sr-leg-weeks">
              {weeks.map(w => (
                <div key={w.week} className="sr-leg-week">
                  <div className="sr-leg-wlabel" style={{ color: w.phaseColor }}>W{w.week}</div>
                  <div className="sr-leg-sessions">
                    {w.sessions.map(s => (
                      <div key={s.id} className="sr-leg-sess" title={`S${s.session}: ${s.title}`}>S{s.session}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catch-up alert */}
          {studentStats.filter(s => s.pct < 50 && s.total > 0).length > 0 && (
            <div className="sr-catchup-alert">
              <div className="sr-ca-icon">⚠️</div>
              <div className="sr-ca-content">
                <div className="sr-ca-title">Students who need to catch up</div>
                <div className="sr-ca-list">
                  {studentStats
                    .filter(s => s.pct < 50 && s.total > 0)
                    .map(s => (
                      <span key={s.id} className="sr-ca-chip">
                        {s.avatar} {s.name} — {s.pct}% watched
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
      {showUpload && <VideoUpload cellId={activeCell} packName={cellMeta?.pack || 'Session'} weekNum={uploadWeek || 1} onSuccess={()=>setShowUpload(false)} onClose={()=>setShowUpload(false)} />}
    </>
  )
}