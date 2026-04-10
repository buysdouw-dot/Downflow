import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   ParentDashboard — Child progress, sessions, outputs, notes
   Route: /parent-dashboard  (parent role)
───────────────────────────────────────────────────────────── */

const MOCK_CHILD = {
  name: 'Sipho Mokoena',
  age: 14,
  cell: 'Confidence Cell 001',
  facilitator: 'Peter Nkosi',
  startDate: 'Mar 3, 2026',
  endDate: 'Jun 23, 2026',
  sessionsCompleted: 6,
  totalSessions: 24,
  outputsSubmitted: 5,
  outputsApproved: 4,
  attendanceRate: 100,
  coinsEarned: 240,
}

const OUTPUTS = [
  { id: 'out_001', week: 'Week 3, Lesson 2', type: 'Video', title: 'Explaining the water cycle to my neighbour', status: 'approved', duration: '47s', submitted: 'Apr 7', feedback: 'Great confidence! Eye contact excellent.' },
  { id: 'out_002', week: 'Week 3, Lesson 1', type: 'Video', title: 'Reading aloud in front of family', status: 'approved', duration: '35s', submitted: 'Apr 5', feedback: 'Keep the pace — very clear pronunciation.' },
  { id: 'out_003', week: 'Week 2, Lesson 2', type: 'Essay', title: 'Reflection on group discussion exercise', status: 'approved', duration: null, submitted: 'Mar 28', feedback: 'Thoughtful and honest reflection.' },
  { id: 'out_004', week: 'Week 2, Lesson 1', type: 'Video', title: 'Describing my school day in English', status: 'approved', duration: '41s', submitted: 'Mar 25', feedback: '' },
  { id: 'out_005', week: 'Week 1, Lesson 2', type: 'Video', title: 'Introduction video', status: 'pending', duration: '30s', submitted: 'Apr 9', feedback: 'Awaiting facilitator approval' },
]

const SESSIONS = [
  { week: 'Week 4, Lesson 1', date: 'Apr 14', status: 'upcoming', topic: 'Debate: agree or disagree?' },
  { week: 'Week 3, Lesson 2', date: 'Apr 7', status: 'completed', topic: 'Real-world explanation challenge', attended: true },
  { week: 'Week 3, Lesson 1', date: 'Apr 5', status: 'completed', topic: 'Reading aloud + pronunciation', attended: true },
  { week: 'Week 2, Lesson 2', date: 'Mar 28', status: 'completed', topic: 'Group discussion exercise', attended: true },
  { week: 'Week 2, Lesson 1', date: 'Mar 25', status: 'completed', topic: 'Daily life narration', attended: true },
  { week: 'Week 1, Lesson 2', date: 'Mar 17', status: 'completed', topic: 'Cell kickoff + confidence check-in', attended: true },
]

const FACILITATOR_NOTES = [
  { date: 'Apr 7', note: 'Sipho showed exceptional confidence this week. Eye contact much improved. Encourage him to join the next debate session.' },
  { date: 'Mar 28', note: 'Participated actively in group discussion. A little hesitant to disagree with peers — this is a focus area for coming weeks.' },
  { date: 'Mar 17', note: 'Great first session. Sipho is enthusiastic and eager to participate. Strong foundation for the program.' },
]

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedOutput, setExpandedOutput] = useState(null)

  const progress = Math.round((MOCK_CHILD.sessionsCompleted / MOCK_CHILD.totalSessions) * 100)

  return (
    <div className="par-page">
      {/* Hero */}
      <div className="par-hero">
        <div className="par-child-card">
          <div className="par-cc-avatar">
            {MOCK_CHILD.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="par-cc-name">{MOCK_CHILD.name}</div>
            <div className="par-cc-meta">Age {MOCK_CHILD.age} · {MOCK_CHILD.cell}</div>
            <div className="par-cc-fac">Facilitator: <strong>{MOCK_CHILD.facilitator}</strong></div>
          </div>
        </div>

        <div className="par-progress-block">
          <div className="par-pb-label">Program Progress</div>
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

      {/* Quick stats */}
      <div className="par-stats">
        <div className="par-stat">
          <span className="par-stat-icon">📅</span>
          <div className="par-stat-val">{MOCK_CHILD.sessionsCompleted}/{MOCK_CHILD.totalSessions}</div>
          <div className="par-stat-label">Sessions</div>
        </div>
        <div className="par-stat">
          <span className="par-stat-icon">🎥</span>
          <div className="par-stat-val">{MOCK_CHILD.outputsApproved}</div>
          <div className="par-stat-label">Approved Outputs</div>
        </div>
        <div className="par-stat">
          <span className="par-stat-icon">📋</span>
          <div className="par-stat-val">{MOCK_CHILD.attendanceRate}%</div>
          <div className="par-stat-label">Attendance</div>
        </div>
        <div className="par-stat">
          <span className="par-stat-icon">🪙</span>
          <div className="par-stat-val">{MOCK_CHILD.coinsEarned}</div>
          <div className="par-stat-label">Coins Earned</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="par-tabs">
        {['overview', 'outputs', 'sessions', 'notes'].map(t => (
          <button key={t} className={`par-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t === 'overview' ? '📊 Overview' : t === 'outputs' ? '🎥 Outputs' : t === 'sessions' ? '📅 Sessions' : '📝 Facilitator Notes'}
          </button>
        ))}
      </div>

      {/* ── Overview tab ── */}
      {activeTab === 'overview' && (
        <div className="par-panel">
          {/* Next session */}
          {SESSIONS.filter(s => s.status === 'upcoming').map(s => (
            <div key={s.week} className="par-next-session">
              <div className="par-ns-badge">NEXT SESSION</div>
              <div className="par-ns-title">{s.topic}</div>
              <div className="par-ns-meta">{s.week} · {s.date}</div>
              <div className="par-ns-tip">💡 Remind {MOCK_CHILD.name.split(' ')[0]} to practise speaking aloud before this class — debate prep!</div>
            </div>
          ))}

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
              <div className="par-we-item">
                <span>🎯</span>
                <div>
                  <strong>Confidence First</strong>
                  <p>Sipho is learning to speak before perfecting grammar. Real-world confidence is the goal.</p>
                </div>
              </div>
              <div className="par-we-item">
                <span>🎥</span>
                <div>
                  <strong>Required Outputs</strong>
                  <p>1 video or written output per session. These build his portfolio and demonstrate real growth.</p>
                </div>
              </div>
              <div className="par-we-item">
                <span>👥</span>
                <div>
                  <strong>Small Group (6 max)</strong>
                  <p>Every cell has max 6 learners. Sipho gets individual attention every class.</p>
                </div>
              </div>
              <div className="par-we-item">
                <span>📈</span>
                <div>
                  <strong>Your View</strong>
                  <p>You can see all approved outputs. Sponsor never sees personal details — only aggregated impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Outputs tab ── */}
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

      {/* ── Sessions tab ── */}
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
                    <div className="par-sr-att" style={{ color: s.attended ? '#00c896' : '#ff7043' }}>
                      {s.attended ? '✓ Attended' : '✗ Absent'}
                    </div>
                  )}
                  {s.status === 'upcoming' && <div className="par-sr-upcoming">Upcoming</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Notes tab ── */}
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
    </div>
  )
}
