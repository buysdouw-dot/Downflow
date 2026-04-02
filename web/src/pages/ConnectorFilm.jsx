import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   CONNECTOR FILM — 9-Scene Cinema Player
   "You don't teach. You build the system."
   60–75 sec · real video clips · cinematic subtitles
   On-screen text overlays · tranche payout animation
───────────────────────────────────────────────────────── */

const C = (name) => `/connector/videos/${name}.mp4`

const SCENES = [
  {
    id: 'hook',
    num: '01',
    label: 'OPENING HOOK',
    timing: '0–5s',
    color: '#d2ad44',
    onscreen: 'NOT A TEACHER. AN ARCHITECT.',
    voice: [
      "You don't teach.",
      "You build the system.",
    ],
    clips: [C('hook-1'), C('hook-2')],
  },
  {
    id: 'role',
    num: '02',
    label: 'THE ROLE',
    timing: '5–14s',
    color: '#4de8b0',
    onscreen: 'FIND. FORM. STABILISE.',
    voice: [
      "You find the students.",
      "You form the cell.",
      "You make it stable.",
    ],
    clips: [C('role-1'), C('role-2'), C('role-3')],
  },
  {
    id: 'cell',
    num: '03',
    label: 'THE CELL',
    timing: '14–22s',
    color: '#72d0ff',
    onscreen: '6 STUDENTS · 1 CELL · YOUR WORK',
    voice: [
      "Six students.",
      "One facilitator.",
      "One cell — activated by you.",
    ],
    clips: [C('cell-1'), C('cell-2')],
  },
  {
    id: 'ethics',
    num: '04',
    label: 'ETHICS FIRST',
    timing: '22–31s',
    color: '#f97316',
    onscreen: 'NO PRESSURE. GENUINE CONSENT.',
    voice: [
      "No pressure.",
      "No cash handling.",
      "Consent must be real —",
      "or the cell doesn't launch.",
    ],
    clips: [C('ethics-1'), C('ethics-2'), C('ethics-3')],
  },
  {
    id: 'pay',
    num: '05',
    label: 'PAYMENT MODEL',
    timing: '31–43s',
    color: '#b083ff',
    onscreen: 'REG FEE + 3 TRANCHES',
    voice: [
      "You earn in two streams:",
      "a registration fee share —",
      "and three stability tranches",
      "released as the cell grows.",
    ],
    clips: [C('pay-1'), C('pay-2')],
    showTrancheChart: true,
  },
  {
    id: 'tranche',
    num: '06',
    label: 'TRANCHE LOGIC',
    timing: '43–52s',
    color: '#4de8b0',
    onscreen: 'LAUNCH · STABILITY · GROWTH',
    voice: [
      "Tranche 1 — on launch.",
      "Tranche 2 — after one month stable.",
      "Tranche 3 — after two months.",
      "Quality is what unlocks your income.",
    ],
    clips: [C('tranche-1'), C('tranche-2'), C('tranche-3')],
  },
  {
    id: 'growth',
    num: '07',
    label: 'SCALE YOUR REACH',
    timing: '52–60s',
    color: '#38bdf8',
    onscreen: 'MORE CELLS → MORE INCOME',
    voice: [
      "One cell is a start.",
      "Three cells is a business.",
      "The system scales with you.",
    ],
    clips: [C('growth-1'), C('growth-2'), C('growth-3')],
  },
  {
    id: 'identity',
    num: '08',
    label: 'IDENTITY SHIFT',
    timing: '60–68s',
    color: '#e879f9',
    onscreen: 'YOU ARE INFRASTRUCTURE.',
    voice: [
      "You are not a recruiter.",
      "You are not a middleman.",
      "You are educational infrastructure.",
    ],
    clips: [C('identity-1'), C('identity-2')],
  },
  {
    id: 'close',
    num: '09',
    label: 'JOIN THE SYSTEM',
    timing: '68–75s',
    color: '#ffffff',
    onscreen: 'BUILD YOUR FIRST CELL',
    voice: [
      "If you know your community —",
      "you already have what it takes.",
    ],
    clips: [C('close-1'), C('close-2')],
  },
]

/* flat clip list */
const ALL_CLIPS = SCENES.flatMap(s =>
  s.clips.map(src => ({ src, scene: s }))
)

/* ─── Animated tranche chart overlay ─── */
function TrancheChart({ visible }) {
  const tranches = [
    { label: 'Reg Fee',  amount: '3,000,000', sub: '50% upfront + 50% close',   color: '#72d0ff', pct: 29 },
    { label: 'Tranche 1', amount: '2,376,000', sub: 'Cell launch',              color: '#4de8b0', pct: 33 },
    { label: 'Tranche 2', amount: '2,376,000', sub: 'Month 1 stable',           color: '#d2ad44', pct: 33 },
    { label: 'Tranche 3', amount: '2,448,000', sub: 'Month 2 (week 8)',         color: '#b083ff', pct: 34 },
  ]
  return (
    <div className={`cf-tranche-chart${visible ? ' visible' : ''}`}>
      <p className="cf-tc-head">Per Cell · Total: ~10,200,000 VND</p>
      <div className="cf-tc-bars">
        {tranches.map((t, i) => (
          <div key={t.label} className="cf-tc-bar-wrap" style={{ '--delay': `${i * 0.15}s` }}>
            <div className="cf-tc-bar-bg">
              <div
                className="cf-tc-bar-fill"
                style={{
                  height: visible ? `${(t.pct / 34) * 100}%` : '0%',
                  background: t.color,
                  transitionDelay: visible ? `${i * 0.15}s` : '0s',
                }}
              />
            </div>
            <span className="cf-tc-amount" style={{ color: t.color }}>{t.amount}</span>
            <span className="cf-tc-label">{t.label}</span>
            <span className="cf-tc-sub">{t.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main film component ─── */
export default function ConnectorFilm() {
  const videoRef = useRef(null)
  const subTimer = useRef(null)

  const [clipIdx, setClipIdx]   = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [ended,   setEnded]     = useState(false)
  const [muted,   setMuted]     = useState(false)
  const [subIdx,  setSubIdx]    = useState(0)
  const [showText, setShowText] = useState(false)
  const [showTranche, setShowTranche] = useState(false)

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
    setShowTranche(false)
    if (playing) { v.play().catch(() => {}); startSubs(scene) }
    const t1 = setTimeout(() => setShowText(true), 800)
    const t2 = scene.showTrancheChart ? setTimeout(() => setShowTranche(true), 1200) : null
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
    <div className="cf-page">

      {/* ── Hero header ── */}
      <div className="cf-hero">
        <p className="cf-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h1 className="cf-title">Connector Film</h1>
        <p className="cf-desc">
          How to build learning cells, earn in three tranches, and grow your income by growing the system.
        </p>
        <Link to="/connector" className="cf-cta-link">Apply as Connector →</Link>
      </div>

      {/* ── Cinema viewport ── */}
      <div className="cf-cinema" style={{ '--sc': scene.color }}>

        {/* Progress bar */}
        <div className="cf-progbar">
          <div className="cf-progbar-fill" style={{ width: `${progress * 100}%`, background: scene.color }} />
          {SCENES.map((s, si) => {
            const idx = ALL_CLIPS.findIndex(c => c.scene === s)
            const pct = (idx / ALL_CLIPS.length) * 100
            return (
              <button key={s.id} className="cf-prog-marker"
                style={{ left: `${pct}%`, background: si <= sceneIdx ? s.color : 'rgba(255,255,255,0.18)' }}
                onClick={() => { jumpToScene(si); setPlaying(false) }}
                title={`${s.num} ${s.label}`}
              />
            )
          })}
        </div>

        {/* Screen */}
        <div className="cf-screen">
          <video
            ref={videoRef}
            key={clip.src}
            className="cf-video"
            src={clip.src}
            muted={muted}
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />

          {/* Warm color grade overlay */}
          <div className="cf-warmgrade" />

          {/* Vignette */}
          <div className="cf-vignette" />

          {/* Tranche chart */}
          {scene.showTrancheChart && <TrancheChart visible={showTranche} />}

          {/* Scene badge */}
          <div className="cf-badge">
            <span className="cf-badge-num" style={{ color: scene.color, borderColor: scene.color }}>
              {scene.num}
            </span>
            <span className="cf-badge-label">{scene.label}</span>
          </div>

          {/* Clip pips */}
          <div className="cf-pips">
            {scene.clips.map((_, i) => (
              <span key={i} className={`cf-pip${i === sceneClipPos ? ' active' : ''}`}
                style={i === sceneClipPos ? { background: scene.color } : {}} />
            ))}
          </div>

          {/* On-screen text overlay */}
          <div className={`cf-onscreen${showText ? ' visible' : ''}`}>
            {scene.onscreen}
          </div>

          {/* Subtitles */}
          <div className={`cf-subs${playing ? ' visible' : ''}`}>
            <span className="cf-sub-line" key={`${scene.id}-${subIdx}`}>
              {scene.voice[subIdx]}
            </span>
          </div>

          {/* Center play button */}
          {!playing && (
            <button className="cf-center-play" onClick={handlePlay}>
              <span>{ended ? '\u21ba' : '\u25b6'}</span>
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="cf-controls">
          <button className="cf-ctrl-btn" onClick={handlePlay}>{playing ? '\u23f8' : '\u25b6'}</button>
          <button className="cf-ctrl-btn" onClick={() => setMuted(m => !m)}>{muted ? '\ud83d\udd07' : '\ud83d\udd0a'}</button>
          <div className="cf-ctrl-info">
            <span style={{ color: scene.color }}>{scene.num}</span>
            <span className="cf-ctrl-label">{scene.label}</span>
            <span className="cf-ctrl-timing">{scene.timing}</span>
          </div>
          <div className="cf-ctrl-right">
            <span className="cf-clip-count">{clipIdx + 1} / {ALL_CLIPS.length}</span>
          </div>
        </div>
      </div>

      {/* Scene strip */}
      <div className="cf-strip">
        {SCENES.map((s, si) => (
          <button key={s.id}
            className={`cf-strip-btn${si === sceneIdx ? ' active' : ''}${si < sceneIdx ? ' seen' : ''}`}
            style={si === sceneIdx ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => { jumpToScene(si); setPlaying(false) }}
          >
            <span className="cf-stn">{s.num}</span>
            <span className="cf-stl">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Voice script panel */}
      <div className="cf-script" style={{ '--sc': scene.color }}>
        <div className="cf-script-left">
          <strong style={{ color: scene.color }}>{scene.num}</strong>
          <span>{scene.label}</span>
          <span className="cf-script-t">{scene.timing}</span>
        </div>
        <div className="cf-script-lines">
          {scene.voice.map((line, i) => (
            <span key={i}
              className={`cf-sl${i === subIdx && playing ? ' lit' : ''}`}
              style={i === subIdx && playing ? { color: scene.color } : {}}>
              &ldquo;{line}&rdquo;
            </span>
          ))}
        </div>
        <div className="cf-script-text">
          <span className="cf-onscreen-label">ON-SCREEN TEXT</span>
          <strong className="cf-onscreen-val">{scene.onscreen}</strong>
        </div>
      </div>

      {/* ── Payout model ── */}
      <div className="cf-pay-section">
        <h2 className="cf-pay-title">How You Earn</h2>
        <p className="cf-pay-sub">Per cell. Quality-gated tranches. Scales with every cell you build.</p>

        <div className="cf-pay-streams">
          <div className="cf-pay-stream" style={{ '--psc': '#72d0ff' }}>
            <div className="cf-ps-header">
              <span className="cf-ps-icon">📋</span>
              <div>
                <strong>Registration Fee Share</strong>
                <span>50% of 6,000,000 VND</span>
              </div>
              <strong className="cf-ps-amount" style={{ color: '#72d0ff' }}>3,000,000 VND</strong>
            </div>
            <div className="cf-ps-split">
              <div className="cf-ps-half" style={{ background: '#72d0ff22', borderColor: '#72d0ff44' }}>
                <strong style={{ color: '#72d0ff' }}>1,500,000 VND</strong>
                <span>50% upfront on onboarding</span>
              </div>
              <div className="cf-ps-half" style={{ background: '#72d0ff22', borderColor: '#72d0ff44' }}>
                <strong style={{ color: '#72d0ff' }}>1,500,000 VND</strong>
                <span>50% at programme close</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cf-pay-grid">
          {[
            { tranche: '01', label: 'Cell Launch',         amount: '2,376,000', trigger: '6 students confirmed', color: '#4de8b0', icon: '\ud83d\ude80', pct: '33%' },
            { tranche: '02', label: 'Month 1 Stability',   amount: '2,376,000', trigger: 'Attendance \u226580% \u00b7 no flags \u00b7 output', color: '#d2ad44', icon: '\u2705', pct: '33%' },
            { tranche: '03', label: 'Month 2 (Week 8)',     amount: '2,448,000', trigger: 'Growth confirmed \u00b7 quality rated', color: '#b083ff', icon: '\ud83c\udfc1', pct: '34%' },
          ].map(t => (
            <div key={t.tranche} className="cf-pay-card" style={{ '--tc': t.color }}>
              <div className="cf-pay-icon">{t.icon}</div>
              <div className="cf-pay-tranche">Tranche {t.tranche}</div>
              <div className="cf-pay-pct" style={{ color: t.color }}>{t.pct}</div>
              <div className="cf-pay-amount" style={{ color: t.color }}>{t.amount} VND</div>
              <div className="cf-pay-label">{t.label}</div>
              <div className="cf-pay-trigger">{t.trigger}</div>
            </div>
          ))}
        </div>

        <div className="cf-pay-total">
          <div className="cf-pt-row">
            <span>Total per cell (full cycle)</span>
            <strong style={{ color: '#d2ad44', fontSize: '1.4rem' }}>~10,200,000 VND</strong>
          </div>
          <div className="cf-pt-note">
            Reg fee (3,000,000) + Tuition tranches (7,200,000) · Quality gates protect the system
          </div>
        </div>

        <div className="cf-pay-scale">
          <h3>Scale Your Income</h3>
          <div className="cf-scale-grid">
            {[
              { cells: 1, vnd: '10,200,000',  color: '#72d0ff' },
              { cells: 3, vnd: '30,600,000',  color: '#4de8b0' },
              { cells: 5, vnd: '51,000,000',  color: '#d2ad44' },
              { cells: 10, vnd: '102,000,000', color: '#b083ff' },
            ].map(r => (
              <div key={r.cells} className="cf-scale-card" style={{ '--scc': r.color }}>
                <strong style={{ color: r.color, fontSize: '1.6rem', fontWeight: 900 }}>{r.cells}</strong>
                <span>cell{r.cells > 1 ? 's' : ''}</span>
                <strong style={{ color: 'var(--navy)', fontSize: '0.88rem' }}>{r.vnd} VND</strong>
                <span className="cf-scale-sub">per cycle</span>
              </div>
            ))}
          </div>
          <p className="cf-scale-note">
            Every cell you build is a new recurring income stream. Stable cells qualify for cycle renewal — your income compounds.
          </p>
        </div>
      </div>

      {/* Ethics rules */}
      <div className="cf-ethics">
        <h3 className="cf-ethics-title">The Connector Code</h3>
        <div className="cf-ethics-grid">
          {[
            { icon: '\ud83d\udee1\ufe0f', rule: 'You do not teach', sub: 'That is the facilitator\'s role. You form and stabilise.' },
            { icon: '\ud83d\udcb0', rule: 'You do not handle cash', sub: 'All payments are processed through the platform directly.' },
            { icon: '\ud83e\udd1d', rule: 'No pressure, ever', sub: 'Consent must be genuine. Coercion voids the cell.' },
            { icon: '\ud83d\udd12', rule: 'Student privacy protected', sub: 'You cannot see individual student records or recordings.' },
            { icon: '\u2705', rule: 'Quality over volume', sub: 'Rushing cells costs you tranches. Stability is your incentive.' },
          ].map(e => (
            <div key={e.rule} className="cf-ethics-card">
              <span className="cf-ethics-icon">{e.icon}</span>
              <div>
                <strong>{e.rule}</strong>
                <p>{e.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cf-cta">
        <p className="cf-cta-quote">&ldquo;This is not recruitment.<br/>This is infrastructure-building.<br/>And I get paid every time it holds.&rdquo;</p>
        <Link to="/connector" className="cf-cta-btn">Apply as Connector</Link>
        <Link to="/facilitator-film" className="cf-cta-secondary">&larr; Watch the Facilitator Film</Link>
      </div>

    </div>
  )
}
