import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const STUDENT = {
  name: 'Nguyen Van An',
  cell: 'VN-01',
  pack: 'Voice & Presence',
  facilitator: 'Dr. Hoa Nguyen',
  region: '🇻🇳 Hanoi',
  avatar: '🎓',
  cohortStart: 'March 2025',
  sessionsCompleted: 18,
  totalSessions: 24,
  currentStreak: 5,
  coins: 340,
  grade: 'B+',
  gradeScore: 82,
  nextSession: 'Tuesday, 15 Apr · 5:00 PM',
}

const SESSIONS = [
  { num: 1,  title: 'Who Am I? Self-Introduction', score: 7.5, attended: true, note: 'Quiet but present. First attempt at speaking aloud.' },
  { num: 2,  title: 'My Voice — Sound & Silence', score: 7.8, attended: true, note: 'Made eye contact with peers for the first time.' },
  { num: 3,  title: 'Telling My Story', score: 8.2, attended: true, note: 'Volunteered to share a personal story unprompted.' },
  { num: 4,  title: 'Body Language & Presence', score: 8.0, attended: true, note: 'Noticeable improvement in posture and breath control.' },
  { num: 5,  title: 'What I Value', score: 8.5, attended: true, note: 'Articulated three personal values clearly. Strong session.' },
  { num: 6,  title: 'Listening as Power', score: 7.9, attended: true, note: 'Asked three follow-up questions to peers — excellent.' },
  { num: 7,  title: 'Confidence Under Pressure', score: 8.1, attended: true, note: 'Handled a group challenge without freezing.' },
  { num: 8,  title: 'Public Expression', score: 8.4, attended: true, note: 'Led the group warm-up for the first time.' },
  { num: 9,  title: 'Disagreeing Respectfully', score: 8.6, attended: true, note: 'Pushed back on a group idea with clear reasoning.' },
  { num: 10, title: 'Finding My Tone', score: 8.7, attended: true, note: 'Used humour effectively. Natural presence emerging.' },
  { num: 11, title: 'My Impact on Others', score: 8.3, attended: true, note: 'Peer feedback was unanimously positive.' },
  { num: 12, title: 'Mid-Pack Review', score: 9.0, attended: true, note: 'Benchmark session. Score reflects significant growth.' },
  { num: 13, title: 'Presentation Design', score: 8.5, attended: true, note: 'Created a 3-slide visual explainer. Strong concept.' },
  { num: 14, title: 'Leading a Conversation', score: 8.8, attended: true, note: 'Facilitated 15 minutes of group discussion independently.' },
  { num: 15, title: 'Voice as Contribution', score: 8.9, attended: true, note: 'Helped a quieter peer find their voice. Exceptional.' },
  { num: 16, title: 'Performance & Authenticity', score: 9.1, attended: true, note: 'Delivered a 2-minute unprepared speech. Natural.' },
  { num: 17, title: 'My Message to the World', score: 9.0, attended: true, note: 'Wrote and delivered a personal manifesto.' },
  { num: 18, title: 'Peer Teaching', score: 9.2, attended: true, note: 'Taught Session 3 content to a new student. Impressive.' },
  { num: 19, title: 'Influence Without Authority', score: null, attended: false, note: 'Upcoming' },
  { num: 20, title: 'Community Voice', score: null, attended: false, note: 'Upcoming' },
  { num: 21, title: 'Building on Others', score: null, attended: false, note: 'Upcoming' },
  { num: 22, title: 'The Guider Within', score: null, attended: false, note: 'Upcoming' },
  { num: 23, title: 'Final Expression Project', score: null, attended: false, note: 'Upcoming' },
  { num: 24, title: 'Season Close & Succession', score: null, attended: false, note: 'Upcoming' },
]

const MILESTONES = [
  { icon: '🗣️', title: 'First Unprompted Share', desc: 'Spoke to the group without being asked.', session: 3, earned: true },
  { icon: '👁️', title: 'Eye Contact Achieved', desc: 'Maintained eye contact with all 5 peers.', session: 4, earned: true },
  { icon: '🎤', title: 'Group Leader', desc: 'Led a session segment independently.', session: 8, earned: true },
  { icon: '💬', title: 'Confident Dissenter', desc: 'Pushed back on a group idea respectfully.', session: 9, earned: true },
  { icon: '🏆', title: 'Mid-Pack Benchmark', desc: 'Scored 9.0+ at the halfway review.', session: 12, earned: true },
  { icon: '🧭', title: 'Peer Teacher', desc: 'Taught content to another student.', session: 18, earned: true },
  { icon: '⭐', title: 'Guider Nominee', desc: 'Nominated to co-facilitate Season 2.', session: null, earned: false },
  { icon: '🎓', title: 'Pack Graduate', desc: 'Complete all 24 sessions.', session: 24, earned: false },
]

const TABS = ['Overview', 'Session Log', 'Milestones']

export default function StudentProgress() {
  usePageMeta('My Progress', 'Track your DOWNFLOW learning journey.')
  const [tab, setTab] = useState(0)
  const [expandedSession, setExpandedSession] = useState(null)

  const completedSessions = SESSIONS.filter(s => s.attended)
  const avgScore = completedSessions.reduce((a, s) => a + s.score, 0) / completedSessions.length
  const progressPct = Math.round((STUDENT.sessionsCompleted / STUDENT.totalSessions) * 100)

  return (
    <div className="progress-page">

      {/* ── PROFILE HEADER ── */}
      <section className="progress-hero">
        <div className="progress-hero-inner">
          <div className="progress-avatar">{STUDENT.avatar}</div>
          <div className="progress-info">
            <h1 className="progress-name">{STUDENT.name}</h1>
            <div className="progress-meta-row">
              <span>{STUDENT.cell}</span>
              <span>·</span>
              <span>{STUDENT.region}</span>
              <span>·</span>
              <span>{STUDENT.pack}</span>
            </div>
            <div className="progress-meta-row" style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
              Facilitator: {STUDENT.facilitator} · Started {STUDENT.cohortStart}
            </div>
          </div>
          <div className="progress-hero-stats">
            <div className="progress-hero-stat">
              <span className="phs-val">{STUDENT.grade}</span>
              <span className="phs-label">Grade</span>
            </div>
            <div className="progress-hero-stat">
              <span className="phs-val">{STUDENT.coins}</span>
              <span className="phs-label">Coins</span>
            </div>
            <div className="progress-hero-stat">
              <span className="phs-val">{STUDENT.currentStreak}</span>
              <span className="phs-label">Streak 🔥</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-section">
          <div className="progress-bar-labels">
            <span>Season Progress</span>
            <span>{STUDENT.sessionsCompleted} / {STUDENT.totalSessions} sessions · {progressPct}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="progress-next-session">Next session: <strong>{STUDENT.nextSession}</strong></div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="progress-tabs">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`progress-tab${tab === i ? ' active' : ''}`}
            onClick={() => setTab(i)}
          >{t}</button>
        ))}
      </div>

      {/* ── TAB: OVERVIEW ── */}
      {tab === 0 && (
        <section className="section progress-overview">
          <div className="progress-overview-grid">

            {/* Score trend */}
            <div className="progress-panel">
              <h3 className="progress-panel-title">Session Score Trend</h3>
              <div className="progress-score-chart">
                {completedSessions.map(s => (
                  <div key={s.num} className="progress-score-bar-wrap" title={`Session ${s.num}: ${s.score}`}>
                    <div
                      className="progress-score-bar"
                      style={{ height: `${((s.score - 7) / 2.5) * 100}%` }}
                    />
                    <span className="progress-score-bar-num">{s.num}</span>
                  </div>
                ))}
              </div>
              <div className="progress-chart-legend">
                <span>Avg score: <strong style={{ color: 'var(--gold)' }}>{avgScore.toFixed(1)}</strong></span>
                <span>Latest: <strong style={{ color: '#4de8b0' }}>{completedSessions[completedSessions.length-1]?.score}</strong></span>
              </div>
            </div>

            {/* Key stats */}
            <div className="progress-panel">
              <h3 className="progress-panel-title">Performance Summary</h3>
              <div className="progress-stats-list">
                {[
                  { label: 'Sessions Attended', val: `${STUDENT.sessionsCompleted}/${STUDENT.totalSessions}`, color: '#72d0ff' },
                  { label: 'Average Score', val: avgScore.toFixed(1) + ' / 10', color: '#f0c840' },
                  { label: 'Current Streak', val: `${STUDENT.currentStreak} sessions 🔥`, color: '#ff9f5a' },
                  { label: 'Coins Earned', val: `${STUDENT.coins} coins`, color: '#4de8b0' },
                  { label: 'Milestones Earned', val: `${MILESTONES.filter(m=>m.earned).length} / ${MILESTONES.length}`, color: '#b083ff' },
                  { label: 'Pack Progress', val: `${progressPct}%`, color: '#3ecf8e' },
                ].map(s => (
                  <div key={s.label} className="progress-stat-row">
                    <span className="progress-stat-label">{s.label}</span>
                    <span className="progress-stat-val" style={{ color: s.color }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilitator note */}
            <div className="progress-panel progress-panel-wide">
              <h3 className="progress-panel-title">Latest Facilitator Note</h3>
              <div className="progress-facilitator-note">
                <div className="progress-fn-header">
                  <span>👤 {STUDENT.facilitator}</span>
                  <span className="progress-fn-session">After Session 18</span>
                </div>
                <p className="progress-fn-text">
                  "An has shown remarkable development across the past 6 sessions. The transformation from a reluctant speaker in Session 1 to someone who now teaches others is exactly what this model is designed to produce. I will be nominating An for the guider programme in Season 2. The natural leadership is undeniable."
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: SESSION LOG ── */}
      {tab === 1 && (
        <section className="section progress-session-log">
          <div className="progress-log-grid">
            {SESSIONS.map(s => (
              <div
                key={s.num}
                className={`progress-log-item${!s.attended ? ' upcoming' : ''}${expandedSession === s.num ? ' expanded' : ''}`}
                onClick={() => s.attended && setExpandedSession(expandedSession === s.num ? null : s.num)}
              >
                <div className="progress-log-row">
                  <span className={`progress-log-num${s.attended ? '' : ' muted'}`}>{s.num}</span>
                  <span className="progress-log-title">{s.title}</span>
                  {s.attended
                    ? <span className="progress-log-score" style={{ color: s.score >= 9 ? '#4de8b0' : s.score >= 8.5 ? '#f0c840' : '#72d0ff' }}>{s.score}</span>
                    : <span className="progress-log-upcoming">Soon</span>
                  }
                </div>
                {expandedSession === s.num && (
                  <p className="progress-log-note">💬 {s.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB: MILESTONES ── */}
      {tab === 2 && (
        <section className="section progress-milestones">
          <div className="progress-milestones-grid">
            {MILESTONES.map(m => (
              <div key={m.title} className={`progress-milestone-card${m.earned ? ' earned' : ' locked'}`}>
                <div className="progress-milestone-icon">{m.icon}</div>
                <h3 className="progress-milestone-title">{m.title}</h3>
                <p className="progress-milestone-desc">{m.desc}</p>
                {m.session && <span className="progress-milestone-session">Session {m.session}</span>}
                <div className="progress-milestone-status">
                  {m.earned ? <span className="progress-earned-badge">✓ Earned</span> : <span className="progress-locked-badge">🔒 Locked</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── ACTIONS ── */}
      <div className="section progress-actions">
        <Link to="/booking" className="btn btn-primary">Book Next Session →</Link>
        <Link to="/curriculum" className="btn btn-secondary">View Pack Details</Link>
      </div>

    </div>
  )
}
