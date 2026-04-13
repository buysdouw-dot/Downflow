import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   FACILITATOR FILM — 9-Scene Cinema Player
   "This is not a normal teaching role."
   60–75 sec · real video clips · cinematic subtitles
   On-screen text overlays · payment structure animation
───────────────────────────────────────────────────────── */

const F = (name) => `/facilitator/videos/${name}.mp4`

const SCENES = [
  {
    id: 'hook',
    num: '01',
    label: 'OPENING HOOK',
    timing: '0–4s',
    color: '#a78bfa',
    onscreen: 'NOT A CLASSROOM. A SYSTEM.',
    voice: [
      "This is not a normal",
      "teaching role.",
    ],
    clips: [F('hook-1'), F('hook-2')],
  },
  {
    id: 'energy',
    num: '02',
    label: 'ENERGY SHIFT',
    timing: '4–10s',
    color: '#f97316',
    onscreen: 'SPEAK. CREATE. PERFORM.',
    voice: [
      "Students don't sit and listen.",
      "They speak, create,",
      "and perform.",
    ],
    clips: [F('energy-1'), F('energy-2'), F('energy-3')],
  },
  {
    id: 'role',
    num: '03',
    label: 'THE ROLE',
    timing: '10–18s',
    color: '#34d399',
    onscreen: 'YOU GUIDE. NOT LECTURE.',
    voice: [
      "You don't deliver content.",
      "You activate production.",
    ],
    clips: [F('role-1'), F('role-2')],
  },
  {
    id: 'course',
    num: '04',
    label: 'COURSE OVERVIEW',
    timing: '18–28s',
    color: '#60a5fa',
    onscreen: 'COMMUNICATION · CONFIDENCE · CREATION',
    voice: [
      "You guide programs focused on",
      "communication, confidence,",
      "and real-world value creation.",
    ],
    clips: [F('course-1'), F('course-2'), F('course-3')],
  },
  {
    id: 'resp',
    num: '05',
    label: 'RESPONSIBILITIES',
    timing: '28–40s',
    color: '#f59e0b',
    onscreen: 'RECORD · ASSIGN · UPLOAD',
    voice: [
      "You capture key moments,",
      "assign daily reps,",
      "and upload content —",
      "so learning continues beyond the class.",
    ],
    clips: [F('resp-1'), F('resp-2'), F('resp-3')],
  },
  {
    id: 'pay',
    num: '06',
    label: 'PAYMENT STRUCTURE',
    timing: '40–50s',
    color: '#4ade80',
    onscreen: 'WEEKLY PAY · 35% → 40% → 45%',
    voice: [
      "You earn weekly —",
      "starting at 35%,",
      "growing to 40%,",
      "and reaching 45%",
      "as you expand the system.",
    ],
    clips: [F('pay-1'), F('pay-2')],
    showPayChart: true,
  },
  {
    id: 'growth',
    num: '07',
    label: 'GROWTH TRIGGER',
    timing: '50–58s',
    color: '#38bdf8',
    onscreen: 'GROW THE SYSTEM → GROW YOUR INCOME',
    voice: [
      "Bring another facilitator",
      "into the system —",
      "and your earnings increase.",
    ],
    clips: [F('growth-1'), F('growth-2'), F('growth-3')],
  },
  {
    id: 'identity',
    num: '08',
    label: 'IDENTITY SHIFT',
    timing: '58–65s',
    color: '#e879f9',
    onscreen: 'BUILD. DON\'T BURN OUT.',
    voice: [
      "This is where teachers",
      "don't burn out —",
      "they build.",
    ],
    clips: [F('identity-1'), F('identity-2')],
  },
  {
    id: 'close',
    num: '09',
    label: 'JOIN THE SYSTEM',
    timing: '65–75s',
    color: '#ffffff',
    onscreen: 'JOIN THE SYSTEM',
    voice: [
      "If you're ready to guide,",
      "not lecture —",
      "you belong here.",
    ],
    clips: [F('close-1'), F('close-2'), F('close-3')],
  },
]

/* flat clip list */
const ALL_CLIPS = SCENES.flatMap(s =>
  s.clips.map(src => ({ src, scene: s }))
)

/* ─── Animated pay chart overlay ─── */
function PayChart({ visible }) {
  const phases = [
    { label: 'Phase 1', pct: 35, sub: 'Starting Facilitator', color: '#72d0ff' },
    { label: 'Phase 2', pct: 40, sub: 'Consistent Performance', color: '#4de8b0' },
    { label: 'Phase 3', pct: 45, sub: 'System Builder', color: '#f5c842' },
  ]
  return (
    <div className={`ff-pay-chart${visible ? ' visible' : ''}`}>
      <p className="ff-pc-head">Weekly Earnings</p>
      <div className="ff-pc-bars">
        {phases.map((p, i) => (
          <div key={p.label} className="ff-pc-bar-wrap" style={{ '--delay': `${i * 0.18}s` }}>
            <div className="ff-pc-bar-bg">
              <div
                className="ff-pc-bar-fill"
                style={{
                  height: visible ? `${(p.pct / 45) * 100}%` : '0%',
                  background: p.color,
                  transitionDelay: visible ? `${i * 0.18}s` : '0s',
                }}
              />
            </div>
            <span className="ff-pc-pct" style={{ color: p.color }}>{p.pct}%</span>
            <span className="ff-pc-label">{p.label}</span>
            <span className="ff-pc-sub">{p.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main film component ─── */
export default function FacilitatorFilm() {
  const videoRef = useRef(null)
  const subTimer = useRef(null)

  const [clipIdx, setClipIdx]     = useState(0)
  const [playing, setPlaying]     = useState(false)
  const [ended,   setEnded]       = useState(false)
  const [muted,   setMuted]       = useState(false)
  const [subIdx,  setSubIdx]      = useState(0)
  const [showText, setShowText]   = useState(false)
  const [showPay,  setShowPay]    = useState(false)

  const clip  = ALL_CLIPS[clipIdx]
  const scene = clip.scene
  const sceneIdx     = SCENES.indexOf(scene)
  const sceneClipPos = scene.clips.indexOf(clip.src)
  const progress     = clipIdx / ALL_CLIPS.length

  /* subtitle cycling */
  const startSubs = useCallback((sc) => {
    clearInterval(subTimer.current)
    setSubIdx(0)
    if (!sc || sc.voice.length <= 1) return
    const ms = Math.max(1400, 6000 / sc.voice.length)
    subTimer.current = setInterval(() => {
      setSubIdx(i => (i + 1 < sc.voice.length ? i + 1 : i))
    }, ms)
  }, [])

  useEffect(() => () => clearInterval(subTimer.current), [])

  /* play/pause */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.play().catch(() => {}); startSubs(scene) }
    else v.pause()
  }, [playing])

  /* clip change */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    setSubIdx(0)
    setShowText(false)
    setShowPay(false)
    if (playing) { v.play().catch(() => {}); startSubs(scene) }
    // Show on-screen text after 0.8s
    const t1 = setTimeout(() => setShowText(true), 800)
    // Show pay chart if this is the pay scene
    const t2 = scene.showPayChart ? setTimeout(() => setShowPay(true), 1200) : null
    return () => { clearTimeout(t1); if (t2) clearTimeout(t2) }
  }, [clipIdx])

  const handleEnded = () => {
    const next = clipIdx + 1
    if (next < ALL_CLIPS.length) setClipIdx(next)
    else { setPlaying(false); setEnded(true) }
  }

  const jumpToScene = (si) => {
    const idx = ALL_CLIPS.findIndex(c => c.scene === SCENES[si])
    if (idx >= 0) { setClipIdx(idx); setEnded(false) }
  }

  const handlePlay = () => {
    setEnded(false)
    if (ended) { setClipIdx(0); setTimeout(() => setPlaying(true), 40); return }
    setPlaying(true)
  }

  return (
    <div className="ff2-page">

      {/* ── Hero header ── */}
      <div className="ff2-hero">
        <p className="ff2-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h1 className="ff2-title">Facilitator Film</h1>
        <p className="ff2-desc">
          What it means to guide, not lecture — and build income by building the system.
        </p>
        <Link to="/facilitator" className="ff2-cta-link">Apply as Facilitator →</Link>
      </div>

      {/* ── Cinema viewport ── */}
      <div className="ff2-cinema" style={{ '--sc': scene.color }}>

        {/* Progress bar */}
        <div className="ff2-progbar">
          <div className="ff2-progbar-fill" style={{ width: `${progress * 100}%`, background: scene.color }} />
          {SCENES.map((s, si) => {
            const idx = ALL_CLIPS.findIndex(c => c.scene === s)
            const pct = (idx / ALL_CLIPS.length) * 100
            return (
              <button key={s.id} className="ff2-prog-marker"
                style={{ left: `${pct}%`, background: si <= sceneIdx ? s.color : 'rgba(255,255,255,0.18)' }}
                onClick={() => { jumpToScene(si); setPlaying(false) }}
                title={`${s.num} ${s.label}`}
              />
            )
          })}
        </div>

        {/* Screen */}
        <div className="ff2-screen">
          <video
            ref={videoRef}
            key={clip.src}
            className="ff2-video"
            src={clip.src}
            muted={muted}
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />

          {/* Warm color grade overlay */}
          <div className="ff2-warmgrade" />

          {/* Vignette */}
          <div className="ff2-vignette" />

          {/* Pay chart */}
          {scene.showPayChart && <PayChart visible={showPay} />}

          {/* Scene badge */}
          <div className="ff2-badge">
            <span className="ff2-badge-num" style={{ color: scene.color, borderColor: scene.color }}>
              {scene.num}
            </span>
            <span className="ff2-badge-label">{scene.label}</span>
          </div>

          {/* Clip pips */}
          <div className="ff2-pips">
            {scene.clips.map((_, i) => (
              <span key={i} className={`ff2-pip${i === sceneClipPos ? ' active' : ''}`}
                style={i === sceneClipPos ? { background: scene.color } : {}} />
            ))}
          </div>

          {/* On-screen text overlay */}
          <div className={`ff2-onscreen${showText ? ' visible' : ''}`}>
            {scene.onscreen}
          </div>

          {/* Subtitles */}
          <div className={`ff2-subs${playing ? ' visible' : ''}`}>
            <span className="ff2-sub-line" key={`${scene.id}-${subIdx}`}>
              {scene.voice[subIdx]}
            </span>
          </div>

          {/* Center play button */}
          {!playing && (
            <button className="ff2-center-play" onClick={handlePlay}>
              <span>{ended ? '↺' : '▶'}</span>
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="ff2-controls">
          <button className="ff2-ctrl-btn" onClick={handlePlay}>{playing ? '⏸' : '▶'}</button>
          <button className="ff2-ctrl-btn" onClick={() => setMuted(m => !m)}>{muted ? '🔇' : '🔊'}</button>
          <div className="ff2-ctrl-info">
            <span style={{ color: scene.color }}>{scene.num}</span>
            <span className="ff2-ctrl-label">{scene.label}</span>
            <span className="ff2-ctrl-timing">{scene.timing}</span>
          </div>
          <div className="ff2-ctrl-right">
            <span className="ff2-clip-count">{clipIdx + 1} / {ALL_CLIPS.length}</span>
          </div>
        </div>
      </div>

      {/* Scene strip */}
      <div className="ff2-strip">
        {SCENES.map((s, si) => (
          <button key={s.id}
            className={`ff2-strip-btn${si === sceneIdx ? ' active' : ''}${si < sceneIdx ? ' seen' : ''}`}
            style={si === sceneIdx ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => { jumpToScene(si); setPlaying(false) }}
          >
            <span className="ff2-stn">{s.num}</span>
            <span className="ff2-stl">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Voice script panel */}
      <div className="ff2-script" style={{ '--sc': scene.color }}>
        <div className="ff2-script-left">
          <strong style={{ color: scene.color }}>{scene.num}</strong>
          <span>{scene.label}</span>
          <span className="ff2-script-t">{scene.timing}</span>
        </div>
        <div className="ff2-script-lines">
          {scene.voice.map((line, i) => (
            <span key={i}
              className={`ff2-sl${i === subIdx && playing ? ' lit' : ''}`}
              style={i === subIdx && playing ? { color: scene.color } : {}}>
              "{line}"
            </span>
          ))}
        </div>
        <div className="ff2-script-text">
          <span className="ff2-onscreen-label">ON-SCREEN TEXT</span>
          <strong className="ff2-onscreen-val">{scene.onscreen}</strong>
        </div>
      </div>

      {/* ── Payment tiers ── */}
      <div className="ff2-pay-section">
        <h2 className="ff2-pay-title">How You Earn</h2>
        <p className="ff2-pay-sub">Weekly payouts. Growth-based phases.</p>
        <div className="ff2-pay-grid">
          {[
            { phase: '01', label: 'Starting Facilitator', pct: 35, trigger: 'Join the system', color: '#72d0ff', icon: '🌱' },
            { phase: '02', label: 'Consistent Performance', pct: 40, trigger: 'Stable cell · 4+ weeks', color: '#4de8b0', icon: '📈' },
            { phase: '03', label: 'System Builder', pct: 45, trigger: 'Introduce new facilitator', color: '#f5c842', icon: '⭐' },
          ].map(p => (
            <div key={p.phase} className="ff2-pay-card" style={{ '--pc': p.color }}>
              <div className="ff2-pay-icon">{p.icon}</div>
              <div className="ff2-pay-phase">Phase {p.phase}</div>
              <div className="ff2-pay-pct" style={{ color: p.color }}>{p.pct}%</div>
              <div className="ff2-pay-label">{p.label}</div>
              <div className="ff2-pay-trigger">{p.trigger}</div>
              <div className="ff2-pay-note">of sponsorship revenue · weekly</div>
            </div>
          ))}
        </div>
        <div className="ff2-pay-arrow-row">
          <span className="ff2-pay-arrow-line" />
          <span className="ff2-pay-arrow-label">35% → 40% → 45%</span>
          <span className="ff2-pay-arrow-line" />
        </div>
      </div>

      {/* CTA */}
      <div className="ff2-cta">
        <p className="ff2-cta-quote">"This is not just a job.<br/>This is a system where I grow, earn,<br/>and build something bigger."</p>
        <Link to="/facilitator" className="ff2-cta-btn">Apply as Facilitator</Link>
        <Link to="/model" className="ff2-cta-secondary">← Watch the Model Film</Link>
      </div>

    </div>
  )
}
