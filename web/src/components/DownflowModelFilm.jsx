import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────
   DOWNFLOW MODEL FILM — Real video cinema player
   10 scenes · auto-advance · cinematic subtitles
   Videos from /model/videos/, slides from /model/slides/
───────────────────────────────────────────────────────── */

/*
  Each scene has:
  - clips: array of video src paths (played one after another)
  - slide: optional slide image shown alongside or instead
  - voice: spoken lines cycling as subtitles
  - label / color / timing
*/
const SCENES = [
  {
    id: 'hook',
    num: '01',
    label: 'HOOK',
    timing: '0–5 sec',
    color: '#6c63ff',
    voice: [
      "Education doesn't fail",
      "because of students…",
    ],
    clips: ['/model/videos/v01.mp4', '/model/videos/v02.mp4'],
    slide: null,
  },
  {
    id: 'problem',
    num: '02',
    label: 'THE PROBLEM',
    timing: '5–15 sec',
    color: '#e05a5a',
    voice: [
      "It fails because",
      "value doesn't flow.",
    ],
    clips: ['/model/videos/v03.mp4', '/model/videos/v04.mp4'],
    slide: null,
  },
  {
    id: 'shift',
    num: '03',
    label: 'THE SHIFT',
    timing: '15–25 sec',
    color: '#f5a623',
    voice: [
      "So we redesigned the system.",
      "Students don't consume learning —",
      "they produce value.",
    ],
    clips: ['/model/videos/v05.mp4', '/model/videos/v06.mp4', '/model/videos/v07.mp4'],
    slide: null,
  },
  {
    id: 'cell',
    num: '04',
    label: 'THE CELL MODEL',
    timing: '25–35 sec',
    color: '#27ae60',
    voice: [
      "Small learning cells.",
      "High engagement.",
      "Real output.",
    ],
    clips: ['/model/videos/v08.mp4'],
    slide: '/model/slides/slide-cell-model.png',
  },
  {
    id: 'sponsor',
    num: '05',
    label: 'SPONSOR ENTRY',
    timing: '35–45 sec',
    color: '#2980b9',
    voice: [
      "A sponsor activates one cell —",
      "fully visible,",
      "fully measurable.",
    ],
    clips: ['/model/videos/v09.mp4', '/model/videos/v10.mp4'],
    slide: '/model/slides/slide-platform.png',
  },
  {
    id: 'guider',
    num: '06',
    label: 'THE GUIDER SYSTEM',
    timing: '45–65 sec',
    color: '#e67e22',
    voice: [
      "Then the system compounds.",
      "A student who completes — moves forward",
      "and sends value down.",
      "They become a guider.",
      "Their results are tied to those below.",
      "Accountability across every level.",
    ],
    clips: ['/model/videos/v11.mp4', '/model/videos/v12.mp4', '/model/videos/v13.mp4'],
    slide: null,
  },
  {
    id: 'loop',
    num: '07',
    label: 'ACCOUNTABILITY LOOP',
    timing: '65–75 sec',
    color: '#9b59b6',
    voice: [
      "Every layer influences the next.",
      "And every result flows back up.",
    ],
    clips: ['/model/videos/v14.mp4', '/model/videos/v15.mp4'],
    slide: '/model/slides/slide-compounding.png',
  },
  {
    id: 'value',
    num: '08',
    label: 'VALUE SYSTEM',
    timing: '75–85 sec',
    color: '#f1c40f',
    voice: [
      "Performance is shared.",
      "Cells are graded together.",
      "Effort becomes visible.",
    ],
    clips: ['/model/videos/v16.mp4', '/model/videos/v17.mp4'],
    slide: '/model/slides/slide-money.png',
  },
  {
    id: 'compound',
    num: '09',
    label: 'COMPOUNDING',
    timing: '85–95 sec',
    color: '#1abc9c',
    voice: [
      "One cell becomes many.",
      "Without losing structure.",
    ],
    clips: ['/model/videos/v18.mp4', '/model/videos/v19.mp4'],
    slide: '/model/slides/slide-scaling.png',
  },
  {
    id: 'close',
    num: '10',
    label: 'CLOSE',
    timing: '95–110 sec',
    color: '#ffffff',
    voice: [
      "This is not a donation.",
      "This is a system that produces value —",
      "and multiplies it.",
      "Fund one cell.",
      "Watch it grow.",
    ],
    clips: ['/model/videos/v20.mp4', '/model/videos/v21.mp4', '/model/videos/v22.mp4'],
    slide: '/model/slides/slide-cta.png',
  },
]

/* ─── Subtitle hook — cycles voice lines while playing ─── */
function useSubtitles(scene, playing) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef()

  useEffect(() => {
    setIdx(0)
    clearInterval(timerRef.current)
    if (!playing || !scene) return
    const ms = Math.max(1800, (6000 / scene.voice.length))
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1 < scene.voice.length ? i + 1 : i))
    }, ms)
    return () => clearInterval(timerRef.current)
  }, [scene?.id, playing])

  return idx
}

/* ─── Single scene video player ─── */
function ScenePlayer({ scene, playing, onEnded }) {
  const videoRef = useRef()
  const [clipIdx, setClipIdx] = useState(0)
  const subIdx = useSubtitles(scene, playing)

  // Reset clip on scene change
  useEffect(() => {
    setClipIdx(0)
  }, [scene.id])

  // Play/pause
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [playing, clipIdx, scene.id])

  const handleVideoEnd = () => {
    const nextClip = clipIdx + 1
    if (nextClip < scene.clips.length) {
      setClipIdx(nextClip)
    } else {
      onEnded()
    }
  }

  const currentClip = scene.clips[clipIdx]

  return (
    <div className="dmf-player" style={{ '--sc': scene.color }}>

      {/* Cinematic letterbox bars */}
      <div className="dmf-letterbox-top" />
      <div className="dmf-letterbox-bot" />

      {/* Video */}
      <video
        ref={videoRef}
        key={currentClip}
        className="dmf-video"
        src={currentClip}
        onEnded={handleVideoEnd}
        playsInline
        muted={false}
        preload="auto"
      />

      {/* Slide overlay — appears as side panel or full overlay when no video plays */}
      {scene.slide && (
        <div className="dmf-slide-overlay">
          <img src={scene.slide} alt={scene.label} className="dmf-slide-img" />
        </div>
      )}

      {/* Dark vignette */}
      <div className="dmf-vignette" />

      {/* Scene label — top left */}
      <div className="dmf-scene-badge">
        <span className="dmf-badge-num" style={{ color: scene.color, borderColor: scene.color }}>
          {scene.num}
        </span>
        <span className="dmf-badge-label">{scene.label}</span>
        <span className="dmf-badge-timing">{scene.timing}</span>
      </div>

      {/* Clip dots — top right */}
      <div className="dmf-clip-dots">
        {scene.clips.map((_, i) => (
          <span key={i} className={`dmf-clip-dot${i === clipIdx ? ' active' : ''}`}
            style={i === clipIdx ? { background: scene.color } : {}} />
        ))}
      </div>

      {/* Subtitles */}
      {playing && (
        <div className="dmf-sub-bar">
          <span className="dmf-sub-text" key={`${scene.id}-${subIdx}`}>
            {scene.voice[subIdx]}
          </span>
        </div>
      )}
    </div>
  )
}

/* ─── Main film component ─── */
export default function DownflowModelFilm({ compact = false }) {
  const [current, setCurrent]   = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef()

  const scene = SCENES[current]

  const handleSceneEnd = useCallback(() => {
    if (current + 1 < SCENES.length) {
      setCurrent(c => c + 1)
    } else {
      setPlaying(false)
      setFinished(true)
    }
  }, [current])

  const handlePlay = () => {
    setFinished(false)
    if (finished) setCurrent(0)
    setPlaying(true)
  }

  const jumpTo = (i) => {
    setPlaying(false)
    setCurrent(i)
    setFinished(false)
  }

  const nav = (dir) => {
    setPlaying(false)
    setCurrent(c => Math.max(0, Math.min(SCENES.length - 1, c + dir)))
    setFinished(false)
  }

  return (
    <section className={`dmf-root${compact ? ' compact' : ''}`} ref={containerRef}>

      {/* Header */}
      <div className="dmf-header">
        <div className="dmf-header-eyebrow">DOWNFLOW — SCHOOL OF LIFE</div>
        <h2 className="dmf-title">The Downflow Model</h2>
        <p className="dmf-subtitle">
          A short film — from broken education to compounding infrastructure
        </p>
      </div>

      {/* Cinema viewport */}
      <div className="dmf-cinema">

        {/* Player */}
        <ScenePlayer
          scene={scene}
          playing={playing}
          onEnded={handleSceneEnd}
        />

        {/* Controls bar */}
        <div className="dmf-controls-bar" style={{ '--sc': scene.color }}>
          {/* Left nav */}
          <button className="dmf-ctrl-btn" onClick={() => nav(-1)} disabled={current === 0}>‹</button>

          {/* Play / Pause / Replay */}
          <button className="dmf-play-pill" onClick={playing ? () => setPlaying(false) : handlePlay}>
            {playing
              ? <><span className="dmf-play-icon">⏸</span> Pause</>
              : finished
                ? <><span className="dmf-play-icon">↺</span> Replay</>
                : <><span className="dmf-play-icon">▶</span> Play Film</>
            }
          </button>

          {/* Progress dots */}
          <div className="dmf-progress-dots">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                className={`dmf-prog-dot${i === current ? ' active' : ''} ${i < current ? 'seen' : ''}`}
                style={i === current ? { background: s.color, boxShadow: `0 0 6px ${s.color}88` } : {}}
                onClick={() => jumpTo(i)}
                title={`${s.num} ${s.label}`}
              />
            ))}
          </div>

          {/* Right nav */}
          <button className="dmf-ctrl-btn" onClick={() => nav(1)} disabled={current === SCENES.length - 1}>›</button>
        </div>
      </div>

      {/* Scene strip — timeline */}
      <div className="dmf-scene-strip">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            className={`dmf-strip-scene${i === current ? ' active' : ''}${i < current ? ' seen' : ''}`}
            style={i === current ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => jumpTo(i)}
          >
            <span className="dmf-ss-num">{s.num}</span>
            <span className="dmf-ss-lbl">{s.label}</span>
            <span className="dmf-ss-time">{s.timing}</span>
          </button>
        ))}
      </div>

      {/* Current scene voice — shown below player */}
      <div className="dmf-voice-panel" style={{ '--sc': scene.color }}>
        <div className="dmf-voice-left">
          <span className="dmf-voice-num" style={{ color: scene.color }}>{scene.num}</span>
          <strong className="dmf-voice-label">{scene.label}</strong>
        </div>
        <div className="dmf-voice-lines">
          {scene.voice.map((line, i) => (
            <span key={i} className="dmf-voice-line">"{line}"</span>
          ))}
        </div>
      </div>

      {/* Slide gallery row */}
      <div className="dmf-slides-row">
        <p className="dmf-slides-heading">Investment Deck · Reference Slides</p>
        <div className="dmf-slides-grid">
          {[
            { src: '/model/slides/slide-cell-model.png',  label: 'Cell Model' },
            { src: '/model/slides/slide-compounding.png', label: 'Compounding Loop' },
            { src: '/model/slides/slide-different.png',   label: 'Why Different' },
            { src: '/model/slides/slide-money.png',       label: 'Money Flow' },
            { src: '/model/slides/slide-teachers.png',    label: 'Teacher Experience' },
            { src: '/model/slides/slide-scaling.png',     label: 'Scaling Potential' },
            { src: '/model/slides/slide-regions.png',     label: 'Target Regions' },
            { src: '/model/slides/slide-5year.png',       label: '5-Year Vision' },
            { src: '/model/slides/slide-platform.png',    label: 'Platform Transparency' },
            { src: '/model/slides/slide-cta.png',         label: 'Partner CTA' },
          ].map(sl => (
            <div key={sl.src} className="dmf-slide-thumb">
              <img src={sl.src} alt={sl.label} />
              <span>{sl.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
