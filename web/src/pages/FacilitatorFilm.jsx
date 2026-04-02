import { useState } from 'react'
import { Link } from 'react-router-dom'

const PHASES = [
  {
    phase: 'Phase 1',
    label: 'Starting Facilitator',
    pct: 35,
    vnd: 378000,
    cycleVND: 9072000,
    color: '#72d0ff',
    trigger: 'New facilitator, first cell',
    desc: 'Starting rate for all new facilitators joining the system.',
  },
  {
    phase: 'Phase 2',
    label: 'Consistent Performance',
    pct: 40,
    vnd: 432000,
    cycleVND: 10368000,
    color: '#4de8b0',
    trigger: 'Stability confirmed over 4+ weeks',
    desc: 'Awarded after consistent cell health, attendance ≥80%, and output submissions.',
  },
  {
    phase: 'Phase 3',
    label: 'System Builder',
    pct: 45,
    vnd: 486000,
    cycleVND: 11664000,
    color: '#d2ad44',
    trigger: 'Introduces 1st new facilitator when schedule is full',
    desc: "Facilitator's schedule is full \u2192 recruits & onboards a new facilitator into the system. +5% per recruit, max 45%.",
    badge: '⭐ MAX TIER',
  },
]

const SCENES = [
  {
    num: '01',
    label: 'OPENING HOOK',
    timing: '0–4 sec',
    color: '#4de8b0',
    bg: 'linear-gradient(135deg, #0a1a10 0%, #0d2016 100%)',
    voice: ['This is not a normal teaching role.'],
    text: 'NOT A CLASSROOM. A SYSTEM.',
    camera: 'Close-up: student speaking confidently → cut to facilitator smiling, nodding',
    angle: 'Eye-level · slight slow motion (0.8×)',
    music: 'Soft cinematic piano',
    icon: '🎯',
  },
  {
    num: '02',
    label: 'ENERGY SHIFT',
    timing: '4–10 sec',
    color: '#72d0ff',
    bg: 'linear-gradient(135deg, #0a1020 0%, #0d1830 100%)',
    voice: ['Students don\'t sit and listen.', 'They speak, create, and perform.'],
    text: 'SPEAK. CREATE. PERFORM.',
    camera: 'Fast cuts: students standing, speaking, group interaction, laughter',
    angle: 'Handheld slight motion — alive feeling',
    music: 'Piano continues, energy lifts',
    icon: '⚡',
  },
  {
    num: '03',
    label: 'THE ROLE',
    timing: '10–18 sec',
    color: '#b083ff',
    bg: 'linear-gradient(135deg, #120a20 0%, #1a0d30 100%)',
    voice: ['You don\'t deliver content.', 'You activate production.'],
    text: 'YOU GUIDE. NOT LECTURE.',
    camera: 'Medium shot: facilitator guiding circle · over-shoulder student speaking',
    angle: 'Static, centred — authority feel',
    music: 'Light percussion enters',
    icon: '🧭',
  },
  {
    num: '04',
    label: 'COURSE OVERVIEW',
    timing: '18–28 sec',
    color: '#ff9f5a',
    bg: 'linear-gradient(135deg, #1a0f00 0%, #2a1800 100%)',
    voice: ['You guide programs focused on communication,', 'confidence, and real-world value creation.'],
    text: 'COMMUNICATION • CONFIDENCE • CREATION',
    camera: 'Montage: speaking exercise, role play, drawing / creative work, movement activity',
    angle: 'Mix of close-up and wide — dynamic',
    music: 'Rhythm builds, warm tones',
    icon: '📚',
    aiPrompt: '"diverse group of children learning in small interactive classroom, speaking confidently, creative activities, warm lighting, cinematic, natural expressions"',
  },
  {
    num: '05',
    label: 'RESPONSIBILITIES',
    timing: '28–40 sec',
    color: '#ff6b9d',
    bg: 'linear-gradient(135deg, #1a0a10 0%, #2a0d1a 100%)',
    voice: ['You capture key moments, assign daily reps,', 'and upload content — so learning continues beyond the class.'],
    text: 'RECORD • ASSIGN • UPLOAD',
    camera: 'Phone screen recording → facilitator recording student → laptop editing clip',
    angle: 'Close-up hands (recording) · screen capture (uploading)',
    music: 'Steady pulse, focused feel',
    icon: '📱',
    aiPrompts: [
      '"teacher recording student presentation on smartphone, classroom setting"',
      '"editing short video on laptop, clean interface, modern workspace"',
    ],
  },
  {
    num: '06',
    label: 'PAYMENT STRUCTURE',
    timing: '40–50 sec',
    color: '#d2ad44',
    bg: 'linear-gradient(135deg, #1a1400 0%, #2a2000 100%)',
    voice: ['You earn weekly — starting at 35%,', 'growing to 40%, and reaching 45% as you expand the system.'],
    text: 'WEEKLY PAY\n35% → 40% → 45%',
    camera: 'Clean animated overlay — bars rising: 35% → 40% → 45%',
    angle: 'Motion graphic / screen animation',
    music: 'Slight rise — motivational tone',
    icon: '💰',
    isPayment: true,
  },
  {
    num: '07',
    label: 'GROWTH TRIGGER',
    timing: '50–58 sec',
    color: '#4de8b0',
    bg: 'linear-gradient(135deg, #0a1a10 0%, #0d2016 100%)',
    voice: ['Bring another facilitator into the system —', 'and your earnings increase.'],
    text: 'GROW THE SYSTEM → GROW YOUR INCOME',
    camera: 'Two facilitators talking · new teacher entering classroom',
    angle: 'Over-shoulder, warm depth-of-field',
    music: 'Energy builds',
    icon: '🌱',
  },
  {
    num: '08',
    label: 'IDENTITY SHIFT',
    timing: '58–65 sec',
    color: '#b083ff',
    bg: 'linear-gradient(135deg, #120a20 0%, #1a0d30 100%)',
    voice: ['This is where teachers don\'t burn out —', 'they build.'],
    text: 'BUILD. DON\'T BURN OUT.',
    camera: 'Slow-motion: student speaking confidently · facilitator observing proudly',
    angle: 'Slow-mo, warm tones, cinematic',
    music: 'Emotional, human, clean',
    icon: '🔥',
  },
  {
    num: '09',
    label: 'CLOSE',
    timing: '65–75 sec',
    color: '#d2ad44',
    bg: 'linear-gradient(135deg, #1a1400 0%, #2a2000 100%)',
    voice: ['If you\'re ready to guide, not lecture —', 'you belong here.'],
    text: 'JOIN THE SYSTEM',
    camera: 'Direct-to-camera facilitator shot',
    angle: 'Eye-level · clean background · confident',
    music: 'Emotional clean finish',
    icon: '🎬',
  },
]

const MUSIC_GUIDE = [
  { time: '0–10s',  mood: 'Soft piano intro' },
  { time: '10–40s', mood: 'Add light percussion + rhythm' },
  { time: '40–60s', mood: 'Slight rise — motivational tone' },
  { time: '60–75s', mood: 'Emotional + clean finish' },
]

export default function FacilitatorFilm() {
  const [activeScene, setActiveScene] = useState(null)
  const [view, setView] = useState('storyboard') // storyboard | payment

  return (
    <div className="ff-page">

      {/* ── HEADER ── */}
      <div className="ff-header">
        <div className="ff-header-inner">
          <div>
            <p className="kicker" style={{ color: '#4de8b0' }}>FACILITATOR RECRUITMENT — PRODUCTION PACK</p>
            <h1 className="ff-title">🎬 Facilitator Video</h1>
            <p className="ff-subtitle">
              9 scenes · 60–75 seconds · Cinematic / minimal / inspiring · "Startup + human impact"
            </p>
          </div>
          <div className="ff-header-actions">
            <Link to="/facilitator" className="btn btn-secondary">← Facilitator Dashboard</Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="ff-stats-row">
          {[
            ['🎬', '9', 'Scenes', '60–75 seconds total', '#4de8b0'],
            ['💰', '35–45%', 'Weekly Earnings', '3-phase progression', '#d2ad44'],
            ['✂️', '1.5–2.5s', 'Cut Rhythm', 'Fast, alive pacing', '#72d0ff'],
            ['🎞', '70/30', 'Real / AI Footage', 'Warm cinematic tones', '#b083ff'],
          ].map(([icon, val, label, sub, color]) => (
            <div key={label} className="db-stat-card" style={{ '--stat-color': color }}>
              <span className="db-stat-icon">{icon}</span>
              <div>
                <p className="db-stat-value" style={{ fontSize: '1rem' }}>{val}</p>
                <p className="db-stat-label">{label}</p>
                <p className="db-stat-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VIEW TOGGLE ── */}
      <div className="ff-view-toggle">
        <button className={`ff-vbtn${view === 'storyboard' ? ' active' : ''}`} onClick={() => setView('storyboard')}>
          🎬 Storyboard
        </button>
        <button className={`ff-vbtn${view === 'payment' ? ' active' : ''}`} onClick={() => setView('payment')}>
          💰 Payment Structure
        </button>
      </div>

      {/* ── STORYBOARD VIEW ── */}
      {view === 'storyboard' && (
        <div className="ff-content">

          {/* Timeline bar */}
          <div className="ff-timeline">
            {SCENES.map((s, i) => (
              <button
                key={s.num}
                className={`ff-tl-seg${activeScene === i ? ' active' : ''}`}
                style={{ '--sc': s.color, flex: i === 4 ? 1.5 : 1 }}
                onClick={() => setActiveScene(activeScene === i ? null : i)}
                title={`${s.num} ${s.label} ${s.timing}`}
              >
                <span className="ff-tl-num">{s.num}</span>
                <span className="ff-tl-label">{s.label}</span>
                <span className="ff-tl-time">{s.timing}</span>
              </button>
            ))}
          </div>

          {/* Scene cards */}
          <div className="ff-scenes-grid">
            {SCENES.map((s, i) => (
              <div
                key={s.num}
                className={`ff-scene-card${activeScene === i ? ' expanded' : ''}`}
                style={{ '--sc': s.color, background: s.bg, borderColor: s.color + '44' }}
                onClick={() => setActiveScene(activeScene === i ? null : i)}
              >
                {/* Card header */}
                <div className="ff-card-header">
                  <div className="ff-card-num" style={{ background: s.color + '22', color: s.color, borderColor: s.color + '55' }}>
                    {s.num}
                  </div>
                  <div className="ff-card-meta">
                    <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{s.label}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>{s.timing}</span>
                  </div>
                  <span style={{ fontSize: '1.4rem', marginLeft: 'auto' }}>{s.icon}</span>
                </div>

                {/* Voice lines */}
                <div className="ff-card-voice">
                  {s.voice.map((line, li) => (
                    <p key={li} style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                      {li === 0 && <span style={{ color: s.color, marginRight: '0.35rem' }}>🗣</span>}"{line}"
                    </p>
                  ))}
                </div>

                {/* On-screen text */}
                <div className="ff-card-text-overlay" style={{ background: s.color + '15', borderColor: s.color + '44' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', color: s.color, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>On-screen text</span>
                  {s.text.split('\n').map((t, ti) => (
                    <strong key={ti} style={{ display: 'block', color: '#fff', fontSize: '0.85rem', letterSpacing: '0.04em' }}>{t}</strong>
                  ))}
                </div>

                {/* Expanded details */}
                {activeScene === i && (
                  <div className="ff-card-details">
                    <div className="ff-detail-row">
                      <span className="ff-detail-label">📷 Camera</span>
                      <span className="ff-detail-val">{s.camera}</span>
                    </div>
                    <div className="ff-detail-row">
                      <span className="ff-detail-label">🎥 Angle</span>
                      <span className="ff-detail-val">{s.angle}</span>
                    </div>
                    <div className="ff-detail-row">
                      <span className="ff-detail-label">🎵 Music</span>
                      <span className="ff-detail-val">{s.music}</span>
                    </div>
                    {s.aiPrompt && (
                      <div className="ff-ai-prompt">
                        <span className="ff-detail-label" style={{ marginBottom: '0.4rem', display: 'block' }}>🤖 AI Prompt</span>
                        <code>{s.aiPrompt}</code>
                      </div>
                    )}
                    {s.aiPrompts && s.aiPrompts.map((p, pi) => (
                      <div key={pi} className="ff-ai-prompt">
                        <span className="ff-detail-label" style={{ marginBottom: '0.4rem', display: 'block' }}>🤖 AI Prompt {pi + 1}</span>
                        <code>{p}</code>
                      </div>
                    ))}
                    {s.isPayment && (
                      <div className="ff-payment-preview">
                        <div className="ff-pay-bars">
                          {PHASES.map((ph, pi) => (
                            <div key={ph.phase} className="ff-pay-bar-item">
                              <div className="ff-pay-bar-track">
                                <div
                                  className="ff-pay-bar-fill"
                                  style={{ height: `${ph.pct * 1.8}px`, background: ph.color }}
                                />
                              </div>
                              <strong style={{ color: ph.color, fontSize: '1rem' }}>{ph.pct}%</strong>
                              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)' }}>{ph.phase}</span>
                            </div>
                          ))}
                        </div>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                          Animated rising bars — paid weekly
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="ff-card-expand-hint" style={{ color: s.color }}>
                  {activeScene === i ? '▲ collapse' : '▼ full details'}
                </div>
              </div>
            ))}
          </div>

          {/* Music guide */}
          <div className="ff-section">
            <h3 className="ff-section-title">🎵 Music & Pacing Guide</h3>
            <div className="ff-music-grid">
              {MUSIC_GUIDE.map(m => (
                <div key={m.time} className="ff-music-row">
                  <span className="ff-music-time">{m.time}</span>
                  <span className="ff-music-bar">
                    <span className="ff-music-fill" />
                  </span>
                  <span className="ff-music-mood">{m.mood}</span>
                </div>
              ))}
            </div>
            <div className="ff-style-note">
              <span>✂️ Cuts every 1.5–2.5 seconds</span>
              <span>🎞 Mix: 70% real footage / 30% AI visuals</span>
              <span>💡 Light zoom-ins + subtle motion blur transitions</span>
              <span>🌡 Warm tones — human, inviting</span>
            </div>
          </div>

          {/* Final message */}
          <div className="ff-final-message">
            <p className="ff-final-quote">
              "This is not just a job.<br/>
              This is a system where I grow, earn, and build something bigger."
            </p>
            <span className="ff-final-label">— The feeling this video must create in every facilitator who watches it</span>
          </div>
        </div>
      )}

      {/* ── PAYMENT VIEW ── */}
      {view === 'payment' && (
        <div className="ff-content">
          <div className="ff-pay-header">
            <h2 className="ff-pay-title">💰 Facilitator Pay Structure</h2>
            <p className="ff-pay-sub">3 phases · Weekly payouts · Grows as you grow the system</p>
          </div>

          {/* Phase cards */}
          <div className="ff-phases-row">
            {PHASES.map((ph, i) => (
              <div key={ph.phase} className="ff-phase-card" style={{ borderTopColor: ph.color, '--phc': ph.color }}>
                {ph.badge && (
                  <span className="ff-phase-badge" style={{ background: ph.color + '22', color: ph.color, borderColor: ph.color + '44' }}>
                    {ph.badge}
                  </span>
                )}
                <div className="ff-phase-top">
                  <span className="ff-phase-tag" style={{ color: ph.color }}>{ph.phase}</span>
                  <strong className="ff-phase-pct" style={{ color: ph.color }}>{ph.pct}%</strong>
                </div>
                <strong className="ff-phase-label">{ph.label}</strong>
                <p className="ff-phase-desc">{ph.desc}</p>
                <div className="ff-phase-amounts">
                  <div>
                    <span>Per lesson</span>
                    <strong style={{ color: ph.color }}>{ph.vnd.toLocaleString()} VND</strong>
                  </div>
                  <div>
                    <span>Per cycle (24)</span>
                    <strong style={{ color: ph.color }}>{ph.cycleVND.toLocaleString()} VND</strong>
                  </div>
                </div>
                <div className="ff-phase-trigger">
                  <span className="ff-trigger-label">TRIGGER</span>
                  <span>{ph.trigger}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Visual progression bar */}
          <div className="ff-progression">
            <h3 className="ff-section-title">📈 Earnings Progression per Lesson</h3>
            <div className="ff-prog-bars">
              {PHASES.map((ph, i) => (
                <div key={ph.phase} className="ff-prog-item">
                  <div className="ff-prog-bar-track">
                    <div
                      className="ff-prog-bar-fill"
                      style={{ width: `${(ph.pct / 45) * 100}%`, background: `linear-gradient(90deg, ${ph.color}88, ${ph.color})` }}
                    />
                  </div>
                  <div className="ff-prog-info">
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>{ph.phase} · {ph.label}</span>
                    <strong style={{ color: ph.color }}>{ph.pct}% · {ph.vnd.toLocaleString()} VND/lesson</strong>
                  </div>
                  {i < PHASES.length - 1 && (
                    <div className="ff-prog-arrow">+5% →</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recruit mechanic */}
          <div className="ff-recruit-box">
            <div className="ff-recruit-header">
              <span style={{ fontSize: '2rem' }}>🌱</span>
              <div>
                <strong>The Recruitment Mechanic — How You Reach 45%</strong>
                <p>When your schedule is full, you don't stop earning. You grow the system instead.</p>
              </div>
            </div>
            <div className="ff-recruit-steps">
              <div className="ff-recruit-step">
                <div className="ff-rs-circle" style={{ background: '#72d0ff22', borderColor: '#72d0ff55', color: '#72d0ff' }}>1</div>
                <div>
                  <strong style={{ color: '#72d0ff' }}>Schedule Full at 40%</strong>
                  <p>You've hit Phase 2 — consistent, stable, fully booked.</p>
                </div>
              </div>
              <div className="ff-recruit-arrow">→</div>
              <div className="ff-recruit-step">
                <div className="ff-rs-circle" style={{ background: '#4de8b022', borderColor: '#4de8b055', color: '#4de8b0' }}>2</div>
                <div>
                  <strong style={{ color: '#4de8b0' }}>Introduce New Facilitator</strong>
                  <p>You refer, onboard, and vouch for a new facilitator entering the system.</p>
                </div>
              </div>
              <div className="ff-recruit-arrow">→</div>
              <div className="ff-recruit-step">
                <div className="ff-rs-circle" style={{ background: '#d2ad4422', borderColor: '#d2ad4455', color: '#d2ad44' }}>3</div>
                <div>
                  <strong style={{ color: '#d2ad44' }}>Unlock 45% — Max Tier</strong>
                  <p>+5% added to your rate. Your income grows because the system grows.</p>
                </div>
              </div>
            </div>
            <div className="ff-recruit-note">
              <span>📋</span>
              <p>
                Each new facilitator you introduce earns you +5%, up to a maximum of 45%.
                This keeps top facilitators motivated to build the system — not just their own cells.
              </p>
            </div>
          </div>

          {/* Weekly payout note */}
          <div className="ff-weekly-note">
            <div>
              <strong style={{ color: '#4de8b0', fontSize: '1.1rem' }}>⏰ Weekly Payouts</strong>
              <p>Facilitator earnings are paid weekly — not monthly, not at cycle end. Every week of consistent delivery is rewarded immediately.</p>
            </div>
            <div className="ff-weekly-calc">
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weekly at Phase 2 (40%) · 2 sessions/week</p>
              <strong style={{ color: '#4de8b0', fontSize: '1.3rem' }}>864,000 VND</strong>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>2 lessons × 432,000 VND</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
