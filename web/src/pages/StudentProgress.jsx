import { useState } from 'react'
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
  { num: 1,  title: 'Who Am I? Self-Introduction',    score: 7.5, attended: true,  note: 'Quiet but present. First attempt at speaking aloud.' },
  { num: 2,  title: 'My Voice — Sound & Silence',      score: 7.8, attended: true,  note: 'Made eye contact with peers for the first time.' },
  { num: 3,  title: 'Telling My Story',                score: 8.2, attended: true,  note: 'Volunteered to share a personal story unprompted.' },
  { num: 4,  title: 'Body Language & Presence',        score: 8.0, attended: true,  note: 'Noticeable improvement in posture and breath control.' },
  { num: 5,  title: 'What I Value',                    score: 8.5, attended: true,  note: 'Articulated three personal values clearly. Strong session.' },
  { num: 6,  title: 'Listening as Power',              score: 7.9, attended: true,  note: 'Asked three follow-up questions to peers — excellent.' },
  { num: 7,  title: 'Confidence Under Pressure',       score: 8.1, attended: true,  note: 'Handled a group challenge without freezing.' },
  { num: 8,  title: 'Public Expression',               score: 8.4, attended: true,  note: 'Led the group warm-up for the first time.' },
  { num: 9,  title: 'Disagreeing Respectfully',        score: 8.6, attended: true,  note: 'Pushed back on a group idea with clear reasoning.' },
  { num: 10, title: 'Finding My Tone',                 score: 8.7, attended: true,  note: 'Used humour effectively. Natural presence emerging.' },
  { num: 11, title: 'My Impact on Others',             score: 8.3, attended: true,  note: 'Peer feedback was unanimously positive.' },
  { num: 12, title: 'Mid-Pack Review',                 score: 9.0, attended: true,  note: 'Benchmark session. Score reflects significant growth.' },
  { num: 13, title: 'Presentation Design',             score: 8.5, attended: true,  note: 'Created a 3-slide visual explainer. Strong concept.' },
  { num: 14, title: 'Leading a Conversation',          score: 8.8, attended: true,  note: 'Facilitated 15 minutes of group discussion independently.' },
  { num: 15, title: 'Voice as Contribution',           score: 8.9, attended: true,  note: 'Helped a quieter peer find their voice. Exceptional.' },
  { num: 16, title: 'Performance & Authenticity',      score: 9.1, attended: true,  note: 'Delivered a 2-minute unprepared speech. Natural.' },
  { num: 17, title: 'My Message to the World',         score: 9.0, attended: true,  note: 'Wrote and delivered a personal manifesto.' },
  { num: 18, title: 'Peer Teaching',                   score: 9.2, attended: true,  note: 'Taught Session 3 content to a new student. Impressive.' },
  { num: 19, title: 'Influence Without Authority',     score: null, attended: false, note: 'Upcoming' },
  { num: 20, title: 'Community Voice',                 score: null, attended: false, note: 'Upcoming' },
  { num: 21, title: 'Building on Others',              score: null, attended: false, note: 'Upcoming' },
  { num: 22, title: 'The Guider Within',               score: null, attended: false, note: 'Upcoming' },
  { num: 23, title: 'Final Expression Project',        score: null, attended: false, note: 'Upcoming' },
  { num: 24, title: 'Season Close & Succession',       score: null, attended: false, note: 'Upcoming' },
]

const SKILLS = [
  { label: 'Confidence',    score: 88, color: '#00c896', desc: 'Speaking up without prompting' },
  { label: 'Articulation',  score: 76, color: '#5b9bd5', desc: 'Clarity and structure of speech' },
  { label: 'Presence',      score: 85, color: '#a259ff', desc: 'Eye contact, posture, stillness' },
  { label: 'Listening',     score: 90, color: '#ffd740', desc: 'Active follow-up and response' },
  { label: 'Leadership',    score: 79, color: '#ff9f5a', desc: 'Initiating, guiding others' },
  { label: 'Resilience',    score: 82, color: '#ff6b8a', desc: 'Recovering from stumbles' },
]

const MILESTONES = [
  { icon: '🗣️', title: 'First Unprompted Share', desc: 'Spoke to the group without being asked.',       session: 3,    earned: true,  earnedDate: 'Mar 21' },
  { icon: '👁️', title: 'Eye Contact Achieved',   desc: 'Maintained eye contact with all 5 peers.',     session: 4,    earned: true,  earnedDate: 'Mar 28' },
  { icon: '🎤', title: 'Group Leader',            desc: 'Led a session segment independently.',          session: 8,    earned: true,  earnedDate: 'Apr 5'  },
  { icon: '💬', title: 'Confident Dissenter',     desc: 'Pushed back on a group idea respectfully.',    session: 9,    earned: true,  earnedDate: 'Apr 7'  },
  { icon: '🏆', title: 'Mid-Pack Benchmark',      desc: 'Scored 9.0+ at the halfway review.',           session: 12,   earned: true,  earnedDate: 'Apr 14' },
  { icon: '🧭', title: 'Peer Teacher',            desc: 'Taught content to another student.',            session: 18,   earned: true,  earnedDate: 'Apr 28' },
  { icon: '⭐', title: 'Guider Nominee',          desc: 'Nominated to co-facilitate Season 2.',          session: null, earned: false, earnedDate: null     },
  { icon: '🎓', title: 'Pack Graduate',           desc: 'Complete all 24 sessions.',                     session: 24,   earned: false, earnedDate: null     },
]

const FACILITATOR_NOTES = [
  { session: 18, note: 'An has shown remarkable development across the past 6 sessions. The transformation from a reluctant speaker in Session 1 to someone who now teaches others is exactly what this model is designed to produce. I will be nominating An for the guider programme in Season 2.' },
  { session: 12, note: 'Mid-pack benchmark: An scored 9.0 — highest in the cell this cycle. The growth in confidence since week 1 is measurable and visible. Peer feedback unanimously positive.' },
  { session: 6,  note: 'Solid first half. An is consistent and improves each session. Main focus for weeks 7–12: push initiative. An waits to be asked rather than volunteering. That changes next cycle.' },
]

// SVG radar chart — 6 axis hexagon
function RadarChart({ skills }) {
  const size = 200
  const cx = size / 2
  const cy = size / 2
  const r = 80
  const n = skills.length
  const levels = 4

  function getPoint(angle, radius) {
    return [
      cx + radius * Math.cos(angle - Math.PI / 2),
      cy + radius * Math.sin(angle - Math.PI / 2),
    ]
  }

  // Grid lines
  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const lvlR = (r * (i + 1)) / levels
    return Array.from({ length: n }, (_, j) => getPoint((2 * Math.PI * j) / n, lvlR).join(',')).join(' ')
  })

  // Axis lines
  const axes = Array.from({ length: n }, (_, i) => {
    const [x, y] = getPoint((2 * Math.PI * i) / n, r)
    return { x, y }
  })

  // Data polygon
  const dataPoints = skills.map((sk, i) => {
    const val = (sk.score / 100) * r
    return getPoint((2 * Math.PI * i) / n, val).join(',')
  }).join(' ')

  // Labels
  const labels = skills.map((sk, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    const labelR = r + 18
    return {
      x: cx + labelR * Math.cos(angle),
      y: cy + labelR * Math.sin(angle),
      label: sk.label,
      score: sk.score,
      color: sk.color,
    }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="sp-radar-svg">
      {/* Grid */}
      {gridPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {/* Axes */}
      {axes.map((pt, i) => (
        <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}
      {/* Data fill */}
      <polygon points={dataPoints} fill="rgba(0,200,150,0.15)" stroke="#00c896" strokeWidth="1.5" />
      {/* Dots */}
      {skills.map((sk, i) => {
        const val = (sk.score / 100) * r
        const [x, y] = getPoint((2 * Math.PI * i) / n, val)
        return <circle key={i} cx={x} cy={y} r="3.5" fill={sk.color} />
      })}
      {/* Labels */}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fontFamily="Outfit, sans-serif"
          fill={l.color} fontWeight="700">
          {l.label}
        </text>
      ))}
    </svg>
  )
}

// SVG grade arc / donut
function GradeArc({ score, grade }) {
  const r = 52
  const cx = 70, cy = 70
  const circumference = 2 * Math.PI * r
  const dash = (score / 100) * circumference
  const color = score >= 90 ? '#00c896' : score >= 75 ? '#ffd740' : score >= 60 ? '#ff9f5a' : '#ff6b8a'

  return (
    <svg viewBox="0 0 140 140" className="sp-grade-svg">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="28" fontFamily="Outfit, sans-serif" fontWeight="900" fill={color}>{grade}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fontFamily="Outfit, sans-serif" fontWeight="600" fill="rgba(255,255,255,0.4)">{score}/100</text>
    </svg>
  )
}

// Score trend sparkline — SVG polyline
function ScoreSparkline({ sessions }) {
  const W = 500, H = 100
  const scores = sessions.filter(s => s.score != null)
  const minS = 7, maxS = 10
  const pts = scores.map((s, i) => {
    const x = (i / (scores.length - 1)) * (W - 40) + 20
    const y = H - 20 - ((s.score - minS) / (maxS - minS)) * (H - 40)
    return { x, y, s }
  })
  const line = pts.map(p => `${p.x},${p.y}`).join(' ')

  // Gradient fill area
  const areaPath = `M${pts[0].x},${H - 20} ` +
    pts.map(p => `L${p.x},${p.y}`).join(' ') +
    ` L${pts[pts.length - 1].x},${H - 20} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sp-sparkline-svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00c896" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00c896" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal grid lines */}
      {[7, 7.5, 8, 8.5, 9, 9.5, 10].map(v => {
        const y = H - 20 - ((v - minS) / (maxS - minS)) * (H - 40)
        return (
          <g key={v}>
            <line x1={20} y1={y} x2={W - 20} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={14} y={y + 3} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="Outfit">{v}</text>
          </g>
        )
      })}
      {/* Fill */}
      <path d={areaPath} fill="url(#spark-grad)" />
      {/* Line */}
      <polyline points={line} fill="none" stroke="#00c896" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 5 : 3}
          fill={p.s.score >= 9 ? '#ffd740' : '#00c896'}
          stroke="#0a1628" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export default function StudentProgress() {
  usePageMeta('My Progress', 'Track your DOWNFLOW learning journey.')
  const [tab, setTab] = useState(0)
  const [expandedSession, setExpandedSession] = useState(null)
  const [expandedNote, setExpandedNote] = useState(0)

  const completedSessions = SESSIONS.filter(s => s.attended)
  const avgScore = completedSessions.reduce((a, s) => a + s.score, 0) / completedSessions.length
  const progressPct = Math.round((STUDENT.sessionsCompleted / STUDENT.totalSessions) * 100)
  const earnedMilestones = MILESTONES.filter(m => m.earned).length
  const scoreColor = (s) => s >= 9 ? '#00c896' : s >= 8.5 ? '#ffd740' : s >= 8 ? '#5b9bd5' : '#ff9f5a'

  return (
    <div className="progress-page">

      {/* ── HERO ── */}
      <section className="progress-hero sp-hero-v2">
        <div className="sp-hero-top">
          <div className="sp-hero-left">
            <div className="progress-avatar sp-avatar-lg">{STUDENT.avatar}</div>
            <div>
              <h1 className="progress-name">{STUDENT.name}</h1>
              <div className="progress-meta-row">
                <span className="sp-cell-tag">{STUDENT.cell}</span>
                <span>{STUDENT.region}</span>
                <span>·</span>
                <span>{STUDENT.pack}</span>
              </div>
              <div className="progress-meta-row" style={{ fontSize: '0.82rem', color: 'var(--text-soft)' }}>
                Facilitator: <strong style={{ color: 'var(--text-main)' }}>{STUDENT.facilitator}</strong>
                &nbsp;· Started {STUDENT.cohortStart}
              </div>
              <div className="sp-next-badge">
                🕐 Next: <strong>{STUDENT.nextSession}</strong>
              </div>
            </div>
          </div>

          <div className="sp-hero-right">
            <GradeArc score={STUDENT.gradeScore} grade={STUDENT.grade} />
          </div>
        </div>

        {/* Progress track */}
        <div className="sp-progress-track">
          <div className="sp-pt-header">
            <span>Season Progress</span>
            <span>{STUDENT.sessionsCompleted} / {STUDENT.totalSessions} sessions · <strong>{progressPct}%</strong></span>
          </div>
          <div className="sp-pt-bar">
            {Array.from({ length: STUDENT.totalSessions }, (_, i) => (
              <div
                key={i}
                className={`sp-pt-segment ${i < STUDENT.sessionsCompleted ? 'done' : i === STUDENT.sessionsCompleted ? 'next' : 'future'}`}
                title={`Session ${i + 1}${SESSIONS[i]?.score ? ` · ${SESSIONS[i].score}` : ''}`}
              />
            ))}
          </div>
          <div className="sp-pt-labels">
            <span>Session 1</span>
            <span className="sp-pt-label-mid">Session 12 (Midpoint)</span>
            <span>Session 24</span>
          </div>
        </div>

        {/* Hero stat pills */}
        <div className="sp-hero-stats">
          {[
            { icon: '⭐', val: avgScore.toFixed(1), label: 'Avg Score' },
            { icon: '🔥', val: STUDENT.currentStreak, label: 'Streak' },
            { icon: '🪙', val: STUDENT.coins, label: 'Coins' },
            { icon: '🏆', val: `${earnedMilestones}/${MILESTONES.length}`, label: 'Milestones' },
            { icon: '📅', val: `${STUDENT.sessionsCompleted}/${STUDENT.totalSessions}`, label: 'Sessions' },
          ].map(s => (
            <div key={s.label} className="sp-stat-pill">
              <span className="sp-stat-icon">{s.icon}</span>
              <span className="sp-stat-val">{s.val}</span>
              <span className="sp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="progress-tabs">
        {['📊 Overview', '📋 Session Log', '🏆 Milestones', '🎯 Skills'].map((t, i) => (
          <button key={t} className={`progress-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          TAB 0 — OVERVIEW
      ══════════════════════════════════════════════ */}
      {tab === 0 && (
        <section className="section sp-overview">

          {/* Row 1: Sparkline chart + Performance summary */}
          <div className="sp-overview-row">

            {/* Score Trend — full SVG sparkline */}
            <div className="progress-panel sp-chart-panel">
              <div className="sp-panel-header">
                <h3 className="progress-panel-title">Score Trend — Sessions 1–18</h3>
                <div className="sp-legend-row">
                  <span className="sp-legend-dot" style={{ background: '#00c896' }} />
                  <span>Score</span>
                  <span className="sp-legend-dot" style={{ background: '#ffd740' }} />
                  <span>9.0+</span>
                </div>
              </div>
              <ScoreSparkline sessions={SESSIONS} />
              <div className="sp-chart-footer">
                <div className="sp-cf-stat">
                  <span>Starting score</span>
                  <strong style={{ color: '#ff9f5a' }}>7.5</strong>
                </div>
                <div className="sp-cf-stat">
                  <span>Avg score</span>
                  <strong style={{ color: '#ffd740' }}>{avgScore.toFixed(1)}</strong>
                </div>
                <div className="sp-cf-stat">
                  <span>Latest</span>
                  <strong style={{ color: '#00c896' }}>{completedSessions[completedSessions.length - 1]?.score}</strong>
                </div>
                <div className="sp-cf-stat">
                  <span>Growth</span>
                  <strong style={{ color: '#00c896' }}>+{(completedSessions[completedSessions.length - 1]?.score - completedSessions[0]?.score).toFixed(1)}</strong>
                </div>
              </div>
            </div>

            {/* Performance stats */}
            <div className="progress-panel sp-stats-panel">
              <h3 className="progress-panel-title">Performance Summary</h3>
              <div className="sp-stats-list">
                {[
                  { label: 'Sessions Attended', val: `${STUDENT.sessionsCompleted}/${STUDENT.totalSessions}`, pct: progressPct, color: '#72d0ff' },
                  { label: 'Avg Score',          val: avgScore.toFixed(1) + ' / 10', pct: (avgScore / 10) * 100, color: '#ffd740' },
                  { label: 'Current Streak',     val: `${STUDENT.currentStreak} 🔥`,  pct: (STUDENT.currentStreak / 10) * 100, color: '#ff9f5a' },
                  { label: 'Coins Earned',       val: `${STUDENT.coins}`,             pct: (STUDENT.coins / 500) * 100, color: '#4de8b0' },
                  { label: 'Milestones',         val: `${earnedMilestones}/${MILESTONES.length}`, pct: (earnedMilestones / MILESTONES.length) * 100, color: '#b083ff' },
                  { label: 'Pack Progress',      val: `${progressPct}%`,              pct: progressPct, color: '#00c896' },
                ].map(s => (
                  <div key={s.label} className="sp-stat-item">
                    <div className="sp-si-header">
                      <span className="sp-si-label">{s.label}</span>
                      <span className="sp-si-val" style={{ color: s.color }}>{s.val}</span>
                    </div>
                    <div className="sp-si-bar-wrap">
                      <div className="sp-si-bar" style={{ width: `${Math.min(s.pct, 100)}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Facilitator notes */}
          <div className="progress-panel sp-notes-panel">
            <h3 className="progress-panel-title">Facilitator Notes — {STUDENT.facilitator}</h3>
            <div className="sp-notes-tabs">
              {FACILITATOR_NOTES.map((n, i) => (
                <button key={i} className={`sp-note-tab${expandedNote === i ? ' active' : ''}`}
                  onClick={() => setExpandedNote(i)}>
                  After Session {n.session}
                </button>
              ))}
            </div>
            {FACILITATOR_NOTES.map((n, i) => expandedNote === i && (
              <div key={i} className="sp-note-body">
                <div className="sp-note-avatar">👤</div>
                <blockquote className="sp-note-quote">"{n.note}"</blockquote>
              </div>
            ))}
          </div>

          {/* Row 3: Recent session highlights */}
          <div className="progress-panel">
            <h3 className="progress-panel-title">Recent Session Highlights</h3>
            <div className="sp-highlights-grid">
              {SESSIONS.filter(s => s.attended).slice(-4).reverse().map(s => (
                <div key={s.num} className="sp-highlight-card">
                  <div className="sp-hc-top">
                    <span className="sp-hc-num">S{s.num}</span>
                    <span className="sp-hc-score" style={{ color: scoreColor(s.score) }}>{s.score}</span>
                  </div>
                  <div className="sp-hc-title">{s.title}</div>
                  <div className="sp-hc-note">💬 {s.note}</div>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* ══════════════════════════════════════════════
          TAB 1 — SESSION LOG
      ══════════════════════════════════════════════ */}
      {tab === 1 && (
        <section className="section sp-session-log">
          <div className="sp-log-summary">
            <span>{STUDENT.sessionsCompleted} completed</span>
            <span>·</span>
            <span>{STUDENT.totalSessions - STUDENT.sessionsCompleted} remaining</span>
            <span>·</span>
            <span>Avg <strong style={{ color: '#ffd740' }}>{avgScore.toFixed(1)}</strong></span>
          </div>

          <div className="sp-log-list">
            {SESSIONS.map(s => (
              <div
                key={s.num}
                className={`sp-log-row${!s.attended ? ' upcoming' : ''}${expandedSession === s.num ? ' expanded' : ''}`}
                onClick={() => s.attended && setExpandedSession(expandedSession === s.num ? null : s.num)}
              >
                <div className="sp-lr-left">
                  <div className={`sp-lr-num${s.attended ? ' done' : ''}`}>{s.num}</div>
                  <div className="sp-lr-title">{s.title}</div>
                </div>
                <div className="sp-lr-right">
                  {s.attended ? (
                    <>
                      <div className="sp-lr-score-bar-wrap">
                        <div className="sp-lr-score-bar" style={{ width: `${((s.score - 7) / 3) * 100}%`, background: scoreColor(s.score) }} />
                      </div>
                      <span className="sp-lr-score-val" style={{ color: scoreColor(s.score) }}>{s.score}</span>
                    </>
                  ) : (
                    <span className="sp-lr-upcoming">Upcoming</span>
                  )}
                </div>
                {expandedSession === s.num && (
                  <div className="sp-lr-detail">
                    <span className="sp-lr-note-icon">💬</span>
                    <p>{s.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          TAB 2 — MILESTONES
      ══════════════════════════════════════════════ */}
      {tab === 2 && (
        <section className="section sp-milestones">
          <div className="sp-ms-header-row">
            <div className="sp-ms-counter">
              <div className="sp-ms-arc">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
                  <circle cx="40" cy="40" r="32" fill="none"
                    stroke="#ffd740" strokeWidth="8"
                    strokeDasharray={`${(earnedMilestones / MILESTONES.length) * 201} 201`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div className="sp-ms-arc-text">
                  <span className="sp-ms-arc-num">{earnedMilestones}</span>
                  <span className="sp-ms-arc-total">/{MILESTONES.length}</span>
                </div>
              </div>
              <div>
                <div className="sp-ms-title">Milestones Earned</div>
                <div className="sp-ms-sub">{MILESTONES.length - earnedMilestones} remaining to complete</div>
              </div>
            </div>
          </div>

          <div className="sp-milestones-grid">
            {MILESTONES.map((m, idx) => (
              <div key={m.title} className={`sp-ms-card${m.earned ? ' earned' : ' locked'}`}
                style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="sp-ms-icon-wrap">
                  <span className="sp-ms-icon">{m.icon}</span>
                  {m.earned && <span className="sp-ms-check">✓</span>}
                </div>
                <h3 className="sp-ms-card-title">{m.title}</h3>
                <p className="sp-ms-card-desc">{m.desc}</p>
                {m.session && (
                  <div className="sp-ms-session">Session {m.session}</div>
                )}
                <div className="sp-ms-status">
                  {m.earned
                    ? <span className="sp-earned-badge">✓ Earned {m.earnedDate}</span>
                    : <span className="sp-locked-badge">🔒 Not yet</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          TAB 3 — SKILLS RADAR
      ══════════════════════════════════════════════ */}
      {tab === 3 && (
        <section className="section sp-skills">
          <div className="sp-skills-layout">

            {/* Radar chart */}
            <div className="progress-panel sp-radar-panel">
              <h3 className="progress-panel-title">Skill Radar</h3>
              <p className="sp-radar-sub">Assessed by {STUDENT.facilitator} · Sessions 1–18</p>
              <div className="sp-radar-wrap">
                <RadarChart skills={SKILLS} />
              </div>
            </div>

            {/* Skill bars */}
            <div className="progress-panel sp-skills-panel">
              <h3 className="progress-panel-title">Skill Breakdown</h3>
              <div className="sp-skill-bars">
                {SKILLS.map(sk => (
                  <div key={sk.label} className="sp-skill-row">
                    <div className="sp-sk-info">
                      <span className="sp-sk-label">{sk.label}</span>
                      <span className="sp-sk-score" style={{ color: sk.color }}>{sk.score}</span>
                    </div>
                    <div className="sp-sk-desc">{sk.desc}</div>
                    <div className="sp-sk-bar-wrap">
                      <div className="sp-sk-bar" style={{ width: `${sk.score}%`, background: sk.color }} />
                    </div>
                    <div className="sp-sk-tier">
                      {sk.score >= 85 ? '🟢 Strong' : sk.score >= 70 ? '🟡 Developing' : '🔴 Focus area'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="sp-skills-note">
                <strong>Facilitator's focus for sessions 19–24:</strong> Push <em>Articulation</em> (76) — you have the presence, now build precision in word choice and sentence structure.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ACTIONS ── */}
      <div className="section progress-actions">
        <Link to="/booking" className="btn btn-primary">📅 Book Next Session →</Link>
        <Link to="/curriculum" className="btn btn-secondary">View Pack Details</Link>
        <Link to="/assistants" className="btn btn-secondary">Book a TA Session</Link>
      </div>

    </div>
  )
}
