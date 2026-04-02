import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────
   DOWNFLOW MODEL FILM — Cinematic Video Player
   Real videos · sequential auto-play · cinematic subtitles
   68 clips across 10 scenes · investment slide overlays
───────────────────────────────────────────────────────── */

const V = (n) => `/model/videos/v${String(n).padStart(2,'0')}.mp4`

/*
  Scene map — each scene has multiple real video clips.
  Videos are curated by theme from our 68-clip library.
  voice[] lines appear as subtitles, cycling per clip.
*/
const SCENES = [
  {
    id: 'hook',
    num: '01',
    label: 'HOOK',
    timing: '0–5s',
    color: '#7c6bff',
    clips: [V(1), V(2), V(14)],
    voice: [
      "Education doesn't fail",
      "because of students…",
    ],
    slide: null,
  },
  {
    id: 'problem',
    num: '02',
    label: 'THE PROBLEM',
    timing: '5–15s',
    color: '#e05a5a',
    clips: [V(3), V(4), V(15)],
    voice: [
      "It fails because",
      "value doesn't flow.",
    ],
    slide: null,
  },
  {
    id: 'shift',
    num: '03',
    label: 'THE SHIFT',
    timing: '15–25s',
    color: '#f5a623',
    clips: [V(5), V(6), V(16), V(17)],
    voice: [
      "So we redesigned the system.",
      "Students don't consume learning —",
      "they produce value.",
    ],
    slide: null,
  },
  {
    id: 'cell',
    num: '04',
    label: 'THE CELL MODEL',
    timing: '25–35s',
    color: '#27ae60',
    clips: [V(7), V(8), V(18)],
    voice: [
      "Small learning cells.",
      "High engagement.",
      "Real output.",
    ],
    slide: '/model/slides/slide-cell-model.png',
  },
  {
    id: 'sponsor',
    num: '05',
    label: 'SPONSOR ENTRY',
    timing: '35–45s',
    color: '#2980b9',
    clips: [V(9), V(19), V(20)],
    voice: [
      "A sponsor activates one cell —",
      "fully visible,",
      "fully measurable.",
    ],
    slide: '/model/slides/slide-platform.png',
  },
  {
    id: 'guider',
    num: '06',
    label: 'GUIDER SYSTEM',
    timing: '45–65s',
    color: '#e67e22',
    clips: [V(10), V(11), V(21), V(22), V(23)],
    voice: [
      "Then the system compounds.",
      "A student who completes — moves forward",
      "and sends value down.",
      "They become a guider.",
      "Their results tied to those below.",
      "Accountability across every level.",
    ],
    slide: null,
  },
  {
    id: 'loop',
    num: '07',
    label: 'ACCOUNTABILITY',
    timing: '65–75s',
    color: '#9b59b6',
    clips: [V(12), V(24), V(25)],
    voice: [
      "Every layer influences the next.",
      "And every result flows back up.",
    ],
    slide: '/model/slides/slide-compounding.png',
  },
  {
    id: 'value',
    num: '08',
    label: 'VALUE SYSTEM',
    timing: '75–85s',
    color: '#f1c40f',
    clips: [V(26), V(27), V(28)],
    voice: [
      "Performance is shared.",
      "Cells are graded together.",
      "Effort becomes visible.",
    ],
    slide: '/model/slides/slide-money.png',
  },
  {
    id: 'compound',
    num: '09',
    label: 'COMPOUNDING',
    timing: '85–95s',
    color: '#1abc9c',
    clips: [V(29), V(30), V(31), V(32)],
    voice: [
      "One cell becomes many.",
      "Without losing structure.",
    ],
    slide: '/model/slides/slide-scaling.png',
  },
  {
    id: 'close',
    num: '10',
    label: 'CLOSE',
    timing: '95–110s',
    color: '#c0c8ff',
    clips: [V(33), V(34), V(35), V(36)],
    voice: [
      "This is not a donation.",
      "This is a system that produces value —",
      "and multiplies it.",
      "Fund one cell.",
      "Watch it grow.",
    ],
    slide: '/model/slides/slide-cta.png',
  },
]

/* Total flat clip list for the global timeline */
const ALL_CLIPS = SCENES.flatMap(s => s.clips.map(src => ({ src, scene: s })))

/* ─── Main component ─── */
export default function DownflowModelFilm({ compact = false }) {
  const videoRef  = useRef(null)
  const [clipIdx, setClipIdx]   = useState(0)   // index into ALL_CLIPS
  const [playing, setPlaying]   = useState(false)
  const [ended,   setEnded]     = useState(false)
  const [muted,   setMuted]     = useState(false)
  const [subIdx,  setSubIdx]    = useState(0)
  const subTimer  = useRef(null)
  const [showSlide, setShowSlide] = useState(false)

  const clip  = ALL_CLIPS[clipIdx]
  const scene = clip.scene

  /* Figure out which clip-within-scene we're on, for the dot indicator */
  const sceneClipPos = scene.clips.indexOf(clip.src)
  const sceneIdx     = SCENES.indexOf(scene)

  /* ── subtitle cycling ── */
  const startSubs = useCallback((sc) => {
    clearInterval(subTimer.current)
    setSubIdx(0)
    if (!sc || sc.voice.length <= 1) return
    const ms = 6000 / sc.voice.length   // spread evenly across ~6s clip
    subTimer.current = setInterval(() => {
      setSubIdx(i => (i + 1 < sc.voice.length ? i + 1 : i))
    }, Math.max(ms, 1400))
  }, [])

  useEffect(() => () => clearInterval(subTimer.current), [])

  /* ── play/pause control ── */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.play().catch(() => {}); startSubs(scene) }
    else v.pause()
  }, [playing])

  /* ── when clip changes, reload and play if was playing ── */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    if (playing) { v.play().catch(() => {}); startSubs(scene) }
    setSubIdx(0)
    setShowSlide(false)
    // Show slide after 2s if scene has one and this is last clip in scene
    if (scene.slide && sceneClipPos === scene.clips.length - 1) {
      const t = setTimeout(() => setShowSlide(true), 2000)
      return () => clearTimeout(t)
    }
  }, [clipIdx])

  const handleEnded = () => {
    const next = clipIdx + 1
    if (next < ALL_CLIPS.length) {
      setClipIdx(next)
    } else {
      setPlaying(false)
      setEnded(true)
    }
  }

  const jumpToScene = (si) => {
    const firstClipOfScene = ALL_CLIPS.findIndex(c => c.scene === SCENES[si])
    if (firstClipOfScene < 0) return
    setClipIdx(firstClipOfScene)
    setEnded(false)
  }

  const handlePlay = () => {
    setEnded(false)
    if (ended) { setClipIdx(0); setTimeout(() => setPlaying(true), 50); return }
    setPlaying(true)
  }

  /* ── progress: fraction of all clips done ── */
  const progress = clipIdx / ALL_CLIPS.length

  return (
    <section className={`dmf-root${compact ? ' compact' : ''}`}>
      {/* Header */}
      <div className="dmf-header">
        <p className="dmf-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h2 className="dmf-title">The Downflow Model</h2>
        <p className="dmf-sub">A short film explaining how the system works</p>
      </div>

      {/* Cinema viewport */}
      <div className="dmf-cinema" style={{ '--sc': scene.color }}>

        {/* ── Progress bar ── */}
        <div className="dmf-progbar">
          <div className="dmf-progbar-fill" style={{ width: `${progress * 100}%`, background: scene.color }} />
          {/* Scene markers */}
          {SCENES.map((s, si) => {
            const idx = ALL_CLIPS.findIndex(c => c.scene === s)
            const pct = (idx / ALL_CLIPS.length) * 100
            return (
              <button
                key={s.id}
                className="dmf-progbar-marker"
                style={{ left: `${pct}%`, background: si <= sceneIdx ? s.color : 'rgba(255,255,255,0.2)' }}
                onClick={() => { jumpToScene(si); setPlaying(false) }}
                title={`${s.num} ${s.label}`}
              />
            )
          })}
        </div>

        {/* ── Video ── */}
        <div className="dmf-screen">
          <video
            ref={videoRef}
            key={clip.src}
            className="dmf-video"
            src={clip.src}
            muted={muted}
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />

          {/* Vignette */}
          <div className="dmf-vignette" />

          {/* Slide panel */}
          {showSlide && scene.slide && (
            <div className="dmf-slide-panel">
              <img src={scene.slide} alt={scene.label} />
            </div>
          )}

          {/* Scene label */}
          <div className="dmf-scene-label">
            <span className="dmf-sn" style={{ color: scene.color, borderColor: scene.color }}>{scene.num}</span>
            <span className="dmf-sl">{scene.label}</span>
          </div>

          {/* Clip pips */}
          <div className="dmf-pips">
            {scene.clips.map((_, i) => (
              <span key={i} className={`dmf-pip${i === sceneClipPos ? ' active' : ''}`}
                style={i === sceneClipPos ? { background: scene.color } : {}} />
            ))}
          </div>

          {/* Subtitles */}
          <div className={`dmf-subs${playing ? ' visible' : ''}`}>
            <span className="dmf-sub-line" key={`${scene.id}-${subIdx}`}>
              {scene.voice[subIdx]}
            </span>
          </div>

          {/* Center play button (when paused / not started) */}
          {!playing && (
            <button className="dmf-center-play" onClick={handlePlay}>
              <span>{ended ? '↺' : '▶'}</span>
            </button>
          )}
        </div>

        {/* ── Controls bar ── */}
        <div className="dmf-controls">
          <button className="dmf-btn-icon" onClick={handlePlay} title={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className="dmf-btn-icon" onClick={() => setMuted(m => !m)} title={muted ? 'Unmute' : 'Mute'}>
            {muted ? '🔇' : '🔊'}
          </button>
          <div className="dmf-ctrl-scene-info">
            <span style={{ color: scene.color }}>{scene.num}</span>
            <span>{scene.label}</span>
            <span className="dmf-ctrl-timing">{scene.timing}</span>
          </div>
          <div className="dmf-ctrl-right">
            <span className="dmf-clip-counter">{clipIdx + 1} / {ALL_CLIPS.length} clips</span>
          </div>
        </div>
      </div>

      {/* ── Scene strip ── */}
      <div className="dmf-strip">
        {SCENES.map((s, si) => (
          <button
            key={s.id}
            className={`dmf-strip-btn${si === sceneIdx ? ' active' : ''}${si < sceneIdx ? ' seen' : ''}`}
            style={si === sceneIdx ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => { jumpToScene(si); setPlaying(false) }}
          >
            <span className="dmf-stn">{s.num}</span>
            <span className="dmf-stl">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ── Current scene voice script ── */}
      <div className="dmf-script-row" style={{ '--sc': scene.color }}>
        <div className="dmf-script-meta">
          <strong style={{ color: scene.color }}>{scene.num} — {scene.label}</strong>
          <span>{scene.timing}</span>
        </div>
        <div className="dmf-script-voice">
          {scene.voice.map((line, i) => (
            <span key={i} className={`dmf-sv${i === subIdx && playing ? ' active' : ''}`}
              style={i === subIdx && playing ? { color: scene.color } : {}}>
              "{line}"
            </span>
          ))}
        </div>
      </div>

      {/* ── Slide deck ── */}
      <div className="dmf-deck">
        <p className="dmf-deck-head">Investment Deck — Reference Slides</p>
        <div className="dmf-deck-grid">
          {[
            ['/model/slides/slide-cell-model.png',  'Cell Model'],
            ['/model/slides/slide-compounding.png', 'Compounding'],
            ['/model/slides/slide-different.png',   'Why Different'],
            ['/model/slides/slide-money.png',       'Money Flow'],
            ['/model/slides/slide-teachers.png',    'Teachers'],
            ['/model/slides/slide-scaling.png',     'Scaling'],
            ['/model/slides/slide-regions.png',     'Regions'],
            ['/model/slides/slide-5year.png',       '5-Year Vision'],
            ['/model/slides/slide-platform.png',    'Platform'],
            ['/model/slides/slide-cta.png',         'Fund a Cell'],
          ].map(([src, label]) => (
            <div key={src} className="dmf-deck-slide">
              <img src={src} alt={label} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
