import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────
   ParentDashboard — Child progress, sessions, outputs, notes
   Route: /parent-dashboard  (parent role)
───────────────────────────────────────────────────────────── */

const MOCK_CHILD = {
  name: 'Sipho Mokoena',
  age: 14,
  cell: 'Confidence Cell 001',
  facilitator: 'Peter Nkosi',
  facilitatorEmail: 'peter.nkosi@downflow.edu',
  startDate: 'Mar 3, 2026',
  endDate: 'Jun 23, 2026',
  sessionsCompleted: 6,
  totalSessions: 24,
  outputsSubmitted: 5,
  outputsApproved: 4,
  attendanceRate: 100,
  coinsEarned: 240,
  currentStreak: 5,
  pack: 'Voice & Presence',
  cellGrade: 'B+',
}

const SKILLS = [
  { label: 'Confidence',    score: 78, color: '#00c896' },
  { label: 'Articulation',  score: 65, color: '#5b9bd5' },
  { label: 'Listening',     score: 82, color: '#a259ff' },
  { label: 'Collaboration', score: 71, color: '#ffd740' },
  { label: 'Initiative',    score: 59, color: '#ff9f5a' },
  { label: 'Resilience',    score: 74, color: '#ff6b8a' },
]

const OUTPUTS = [
  { id: 'out_001', week: 'Week 3, Lesson 2', type: 'Video', title: 'Explaining the water cycle to my neighbour', status: 'approved', duration: '47s', submitted: 'Apr 7', feedback: 'Great confidence! Eye contact excellent.' },
  { id: 'out_002', week: 'Week 3, Lesson 1', type: 'Video', title: 'Reading aloud in front of family', status: 'approved', duration: '35s', submitted: 'Apr 5', feedback: 'Keep the pace — very clear pronunciation.' },
  { id: 'out_003', week: 'Week 2, Lesson 2', type: 'Essay', title: 'Reflection on group discussion exercise', status: 'approved', duration: null, submitted: 'Mar 28', feedback: 'Thoughtful and honest reflection.' },
  { id: 'out_004', week: 'Week 2, Lesson 1', type: 'Video', title: 'Describing my school day in English', status: 'approved', duration: '41s', submitted: 'Mar 25', feedback: '' },
  { id: 'out_005', week: 'Week 1, Lesson 2', type: 'Video', title: 'Introduction video', status: 'pending', duration: '30s', submitted: 'Apr 9', feedback: 'Awaiting facilitator approval' },
]

const SESSIONS = [
  { week: 'Week 4, Lesson 1', date: 'Apr 14', status: 'upcoming', topic: 'Debate: agree or disagree?' },
  { week: 'Week 3, Lesson 2', date: 'Apr 7', status: 'completed', topic: 'Real-world explanation challenge', attended: true, score: 9 },
  { week: 'Week 3, Lesson 1', date: 'Apr 5', status: 'completed', topic: 'Reading aloud + pronunciation', attended: true, score: 8 },
  { week: 'Week 2, Lesson 2', date: 'Mar 28', status: 'completed', topic: 'Group discussion exercise', attended: true, score: 7 },
  { week: 'Week 2, Lesson 1', date: 'Mar 25', status: 'completed', topic: 'Daily life narration', attended: true, score: 8 },
  { week: 'Week 1, Lesson 2', date: 'Mar 17', status: 'completed', topic: 'Cell kickoff + confidence check-in', attended: true, score: 6 },
]

const FACILITATOR_NOTES = [
  { date: 'Apr 7', note: 'Sipho showed exceptional confidence this week. Eye contact much improved. Encourage him to join the next debate session.' },
  { date: 'Mar 28', note: 'Participated actively in group discussion. A little hesitant to disagree with peers — this is a focus area for coming weeks.' },
  { date: 'Mar 17', note: 'Great first session. Sipho is enthusiastic and eager to participate. Strong foundation for the program.' },
]

const MILESTONES = [
  { icon: '🎤', label: 'First Output',      desc: 'Submitted a video',            earned: true,  date: 'Mar 17' },
  { icon: '⚡', label: '3 Sessions Done',   desc: 'Attended 3 consecutive',       earned: true,  date: 'Mar 28' },
  { icon: '🌟', label: 'Perfect Week',      desc: 'On time + output submitted',   earned: true,  date: 'Apr 5' },
  { icon: '💬', label: 'Debate Ready',      desc: 'Lead a class discussion',      earned: false, date: null },
  { icon: '🏆', label: 'Cell Champion',     desc: 'Top scorer in cell session',   earned: false, date: null },
  { icon: '🎓', label: 'Course Complete',   desc: 'Finish all 24 sessions',       earned: false, date: null },
]

const MESSAGES = [
  { from: 'Peter Nkosi', role: 'Facilitator', avatar: '🧭', time: 'Apr 7, 2:14 PM', text: "Sipho did brilliantly today — please encourage him to review his week 3 video and share it with family." },
  { from: 'You', role: 'Parent', avatar: '👨‍👩‍👧', time: 'Apr 7, 3:45 PM', text: "Thank you Peter! He was so proud when he came home. Will do." },
  { from: 'Peter Nkosi', role: 'Facilitator', avatar: '🧭', time: 'Apr 8, 9:01 AM', text: "Next session is a debate format — let him practise arguing both sides of any topic at home. Fun exercise!" },
]

// Score trend data (last 6 sessions)
const TREND = [6, 8, 7, 8, 9, null] // null = upcoming

export default function ParentDashboard() {
  const [activeTab, setActiveTab]       = useState('overview')
  const [expandedOutput, setExpandedOutput] = useState(null)
  const [msgText, setMsgText]           = useState('')
  const [messages, setMessages]         = useState(MESSAGES)
  const [msgSent, setMsgSent]           = useState(false)

  const progress = Math.round((MOCK_CHILD.sessionsCompleted / MOCK_CHILD.totalSessions) * 100)

  const completedScores = SESSIONS.filter(s => s.score != null).map(s => s.score)
  const avgScore = completedScores.length
    ? (completedScores.reduce((a, b) => a + b, 0) / completedScores.length).toFixed(1)
    : '—'

  function sendMessage(e) {
    e.preventDefault()
    if (!msgText.trim()) return
    setMessages(prev => [...prev, { from: 'You', role: 'Parent', avatar: '👨‍👩‍👧', time: 'Just now', text: msgText.trim() }])
    setMsgText('')
    setMsgSent(true)
    setTimeout(() => setMsgSent(false), 3000)
  }

  return (
    <div className="par-page">

      {/* ── HERO ── */}
      <div className="par-hero">
        <div className="par-child-card">
          <div className="par-cc-avatar">
            {MOCK_CHILD.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="par-cc-name">{MOCK_CHILD.name}</div>
            <div className="par-cc-meta">Age {MOCK_CHILD.age} · {MOCK_CHILD.cell}</div>
            <div className="par-cc-fac">Facilitator: <strong>{MOCK_CHILD.facilitator}</strong></div>
            <div className="par-cc-pack">Pack: <strong>{MOCK_CHILD.pack}</strong></div>
          </div>
          <div className="par-cc-grade">
            <span className="par-grade-label">Cell Grade</span>
            <span className="par-grade-value">{MOCK_CHILD.cellGrade}</span>
          </div>
        </div>

        <div className="par-progress-block">
          <div className="par-pb-label">Program Progress — {progress}%</div>
          <div className="par-pb-bar-wrap">
            <div className="par-pb-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="par-pb-stats">
            <span>{MOCK_CHILD.sessionsCompleted} sessions done</span>
            <span>{MOCK_CHILD.totalSessions - MOCK_CHILD.sessionsCompleted} remaining</span>
          </div>
          <div className="par-pb-dates">{MOCK_CHILD.startDate} → {MOCK_CHILD.endDate}</div>
        </div>
      </div>

      {/* ── QUICK STATS ── */}
      <div className="par-stats">
        {[
          { icon: '📅', val: `${MOCK_CHILD.sessionsCompleted}/${MOCK_CHILD.totalSessions}`, label: 'Sessions' },
          { icon: '🎥', val: MOCK_CHILD.outputsApproved, label: 'Approved Outputs' },
          { icon: '📋', val: `${MOCK_CHILD.attendanceRate}%`, label: 'Attendance' },
          { icon: '🪙', val: MOCK_CHILD.coinsEarned, label: 'Coins Earned' },
          { icon: '🔥', val: MOCK_CHILD.currentStreak, label: 'Session Streak' },
          { icon: '⭐', val: avgScore, label: 'Avg Score' },
        ].map(s => (
          <div key={s.label} className="par-stat">
            <span className="par-stat-icon">{s.icon}</span>
            <div className="par-stat-val">{s.val}</div>
            <div className="par-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── TABS ── */}
      <div className="par-tabs">
        {[
          { id: 'overview',  label: '📊 Overview' },
          { id: 'skills',    label: '🎯 Skills' },
          { id: 'outputs',   label: '🎥 Outputs' },
          { id: 'sessions',  label: '📅 Sessions' },
          { id: 'notes',     label: '📝 Notes' },
          { id: 'messages',  label: '💬 Messages' },
          { id: 'milestones',label: '🏆 Milestones' },
        ].map(t => (
          <button key={t.id} className={`par-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="par-panel">
          {/* Next session */}
          {SESSIONS.filter(s => s.status === 'upcoming').map(s => (
            <div key={s.week} className="par-next-session">
              <div className="par-ns-badge">NEXT SESSION</div>
              <div className="par-ns-title">{s.topic}</div>
              <div className="par-ns-meta">{s.week} · {s.date}</div>
              <div className="par-ns-tip">💡 Remind {MOCK_CHILD.name.split(' ')[0]} to practise speaking aloud before this session — debate prep!</div>
            </div>
          ))}

          {/* Score trend bars */}
          <div className="par-trend-block">
            <div className="par-trend-title">Session Score Trend</div>
            <div className="par-trend-bars">
              {TREND.map((score, i) => (
                <div key={i} className="par-trend-col">
                  <div className="par-trend-bar-wrap">
                    <div
                      className={`par-trend-bar${score == null ? ' upcoming' : ''}`}
                      style={{ height: score != null ? `${(score / 10) * 100}%` : '20%' }}
                    />
                  </div>
                  <div className="par-trend-score">{score != null ? score : '—'}</div>
                  <div className="par-trend-label">S{i + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest output */}
          <div className="par-latest-output">
            <div className="par-lo-title">Latest Approved Output</div>
            {OUTPUTS.filter(o => o.status === 'approved').slice(0, 1).map(o => (
              <div key={o.id} className="par-lo-card">
                <div className="par-loc-top">
                  <span className="par-loc-type">{o.type}</span>
                  <span className="par-loc-week">{o.week}</span>
                  {o.duration && <span className="par-loc-dur">{o.duration}</span>}
                </div>
                <div className="par-loc-name">{o.title}</div>
                {o.feedback && <div className="par-loc-fb">💬 "{o.feedback}"</div>}
              </div>
            ))}
          </div>

          {/* What to expect */}
          <div className="par-what-expect">
            <div className="par-we-title">What to Expect</div>
            <div className="par-we-grid">
              {[
                { icon: '🎯', title: 'Confidence First', desc: 'Sipho is learning to speak before perfecting grammar. Real-world confidence is the goal.' },
                { icon: '🎥', title: 'Required Outputs',  desc: '1 video or written output per session. These build his portfolio and demonstrate real growth.' },
                { icon: '👥', title: 'Small Group (5)',    desc: 'Every cell has exactly 5 learners. Sipho gets individual attention every class.' },
                { icon: '📈', title: 'Your View',         desc: 'You can see all approved outputs. Sponsor never sees personal details — only aggregated impact.' },
              ].map(item => (
                <div key={item.title} className="par-we-item">
                  <span>{item.icon}</span>
                  <div><strong>{item.title}</strong><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SKILLS ── */}
      {activeTab === 'skills' && (
        <div className="par-panel">
          <div className="par-panel-title">Skill Development Scores</div>
          <p className="par-panel-sub">Assessed by facilitator across sessions 1–{MOCK_CHILD.sessionsCompleted}. Scale: 0–100.</p>
          <div className="par-skills-grid">
            {SKILLS.map(sk => (
              <div key={sk.label} className="par-skill-card">
                <div className="par-sk-top">
                  <span className="par-sk-label">{sk.label}</span>
                  <span className="par-sk-score" style={{ color: sk.color }}>{sk.score}</span>
                </div>
                <div className="par-sk-bar-wrap">
                  <div className="par-sk-bar" style={{ width: `${sk.score}%`, background: sk.color }} />
                </div>
                <div className="par-sk-tier">
                  {sk.score >= 80 ? '🟢 Strong' : sk.score >= 65 ? '🟡 Developing' : '🔴 Focus Area'}
                </div>
              </div>
            ))}
          </div>
          <div className="par-skills-note">
            <strong>Focus area this month:</strong> Initiative (59) — facilitator is introducing more self-directed tasks to build autonomy.
          </div>
        </div>
      )}

      {/* ── OUTPUTS ── */}
      {activeTab === 'outputs' && (
        <div className="par-panel">
          <div className="par-outputs-list">
            {OUTPUTS.map(o => (
              <div key={o.id} className={`par-output-card ${expandedOutput === o.id ? 'expanded' : ''}`}>
                <div className="par-oc-top" onClick={() => setExpandedOutput(expandedOutput === o.id ? null : o.id)}>
                  <div>
                    <span className="par-oc-type">{o.type}</span>
                    <span className={`par-oc-status par-os-${o.status}`}>{o.status}</span>
                  </div>
                  <div className="par-oc-title">{o.title}</div>
                  <div className="par-oc-meta">{o.week} · {o.submitted}</div>
                </div>
                {expandedOutput === o.id && (
                  <div className="par-oc-detail">
                    {o.duration && <div className="par-od-dur">Duration: {o.duration}</div>}
                    {o.feedback && (
                      <div className="par-od-fb">
                        <strong>Facilitator feedback:</strong>
                        <p>"{o.feedback}"</p>
                      </div>
                    )}
                    {o.status === 'approved' && (
                      <div className="par-od-view">
                        <button className="par-view-btn">▶ View Output</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SESSIONS ── */}
      {activeTab === 'sessions' && (
        <div className="par-panel">
          <div className="par-sessions-list">
            {SESSIONS.map(s => (
              <div key={s.week} className={`par-session-row par-sr-${s.status}`}>
                <div className="par-sr-left">
                  <span className={`par-sr-dot par-srd-${s.status}`} />
                  <div>
                    <div className="par-sr-week">{s.week}</div>
                    <div className="par-sr-topic">{s.topic}</div>
                  </div>
                </div>
                <div className="par-sr-right">
                  <div className="par-sr-date">{s.date}</div>
                  {s.status === 'completed' && (
                    <>
                      <div className="par-sr-att" style={{ color: s.attended ? '#00c896' : '#ff7043' }}>
                        {s.attended ? '✓ Attended' : '✗ Absent'}
                      </div>
                      {s.score != null && (
                        <div className="par-sr-score" style={{ color: s.score >= 8 ? '#00c896' : s.score >= 6 ? '#ffd740' : '#ff7043' }}>
                          Score {s.score}/10
                        </div>
                      )}
                    </>
                  )}
                  {s.status === 'upcoming' && <div className="par-sr-upcoming">Upcoming</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NOTES ── */}
      {activeTab === 'notes' && (
        <div className="par-panel">
          <div className="par-notes-intro">
            Notes from <strong>{MOCK_CHILD.facilitator}</strong> about {MOCK_CHILD.name.split(' ')[0]}'s progress.
          </div>
          <div className="par-notes-list">
            {FACILITATOR_NOTES.map((note, i) => (
              <div key={i} className="par-note-card">
                <div className="par-nc-date">{note.date}</div>
                <p className="par-nc-text">"{note.note}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MESSAGES ── */}
      {activeTab === 'messages' && (
        <div className="par-panel">
          <div className="par-panel-title">Messages with {MOCK_CHILD.facilitator}</div>
          <div className="par-messages-thread">
            {messages.map((m, i) => (
              <div key={i} className={`par-msg${m.from === 'You' ? ' par-msg-self' : ''}`}>
                <span className="par-msg-avatar">{m.avatar}</span>
                <div className="par-msg-bubble">
                  <div className="par-msg-meta">{m.from} · {m.time}</div>
                  <div className="par-msg-text">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <form className="par-msg-form" onSubmit={sendMessage}>
            <textarea
              className="par-msg-input"
              rows={2}
              placeholder={`Message ${MOCK_CHILD.facilitator}…`}
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
            />
            <button type="submit" className="par-msg-send-btn">Send →</button>
          </form>
          {msgSent && <div className="par-msg-sent-note">✓ Message sent</div>}
        </div>
      )}

      {/* ── MILESTONES ── */}
      {activeTab === 'milestones' && (
        <div className="par-panel">
          <div className="par-panel-title">Milestones &amp; Badges</div>
          <div className="par-milestones-grid">
            {MILESTONES.map((m, i) => (
              <div key={i} className={`par-milestone-card${m.earned ? ' earned' : ' locked'}`}>
                <span className="par-ms-icon">{m.icon}</span>
                <div className="par-ms-label">{m.label}</div>
                <div className="par-ms-desc">{m.desc}</div>
                {m.earned
                  ? <div className="par-ms-date">Earned {m.date}</div>
                  : <div className="par-ms-locked">🔒 Not yet earned</div>
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
