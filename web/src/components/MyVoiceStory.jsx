import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────
   SHORT VIDEO STORY — "MY VOICE"
   Aligned to English Learning & the Producing Levels
   Awaken → Align → Apply → Amplify → Ascend
───────────────────────────────────────────────────────── */

const SCENES = [
  {
    level: 'AWAKEN',
    tag: '01 · Awareness of Language',
    name: 'Max',
    line1: 'My name is Max.',
    line2: 'I am learning English.',
    desc: 'Learning begins with a single step forward. No pressure — just presence.',
    color: '#b083ff',
    lightOpacity: 0.18,
    avatar: '🧒',
    timing: '0–4 sec',
  },
  {
    level: 'ALIGN',
    tag: '02 · Understanding & Confidence',
    name: 'Lina',
    line1: 'My name is Lina.',
    line2: 'I am not afraid to try.',
    desc: 'Confidence comes before vocabulary. Safety comes before speech.',
    color: '#72d0ff',
    lightOpacity: 0.28,
    avatar: '👧',
    timing: '5–9 sec',
  },
  {
    level: 'APPLY',
    tag: '03 · Using English to Create',
    name: 'Noah',
    line1: 'My name is Noah.',
    line2: 'I use English to share my ideas.',
    desc: 'Language is a tool for expression — not a test to pass.',
    color: '#4de8b0',
    lightOpacity: 0.36,
    avatar: '🧑',
    timing: '10–14 sec',
  },
  {
    level: 'AMPLIFY',
    tag: '04 · Speaking With Others',
    name: 'Aiko',
    line1: 'My name is Aiko.',
    line2: 'When I speak, others listen.',
    desc: 'Voice grows when it is heard by people who care.',
    color: '#d2ad44',
    lightOpacity: 0.5,
    avatar: '👩',
    timing: '15–19 sec',
  },
  {
    level: 'ASCEND',
    tag: '05 · Belonging & Fluency',
    name: 'Maya',
    line1: 'My name is Maya.',
    line2: 'English helps us connect.',
    desc: 'Fluency is belonging. It is the moment language becomes yours.',
    color: '#ff9f5a',
    lightOpacity: 0.65,
    avatar: '🧑‍🎓',
    timing: '20–24 sec',
  },
]

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* Single scene card */
function SceneCard({ scene, index, active, onClick }) {
  const isActive = active === index
  return (
    <button
      className={`mvs-scene-card${isActive ? ' active' : ''}`}
      style={{ '--scene-color': scene.color }}
      onClick={() => onClick(index)}
      aria-label={`Scene ${index + 1}: ${scene.level}`}
    >
      <div className="mvs-scene-light" style={{ opacity: isActive ? scene.lightOpacity : 0.06 }} />
      <div className="mvs-scene-level">{scene.level}</div>
      <div className="mvs-scene-avatar">{scene.avatar}</div>
      <div className="mvs-scene-body">
        <p className="mvs-scene-name">{scene.name}</p>
        <p className="mvs-scene-line1">"{scene.line1}"</p>
        <p className={`mvs-scene-line2${isActive ? ' visible' : ''}`}>"{scene.line2}"</p>
      </div>
      <div className="mvs-scene-tag">{scene.tag}</div>
      {isActive && <div className="mvs-scene-desc">{scene.desc}</div>}
    </button>
  )
}

export default function MyVoiceStory({ compact = false }) {
  const [active, setActive] = useState(null)
  const [autoPlaying, setAutoPlaying] = useState(false)
  const [autoIndex, setAutoIndex] = useState(0)
  const [closing, setClosing] = useState(false)
  const [sectionRef, inView] = useInView(0.3)
  const timerRef = useRef(null)

  /* Auto-play when scrolled into view */
  useEffect(() => {
    if (inView && !autoPlaying && active === null) {
      setAutoPlaying(true)
      setAutoIndex(0)
      setActive(0)
    }
  }, [inView])

  useEffect(() => {
    if (!autoPlaying) return
    timerRef.current = setTimeout(() => {
      const next = autoIndex + 1
      if (next < SCENES.length) {
        setAutoIndex(next)
        setActive(next)
      } else {
        setClosing(true)
        setActive(null)
        setAutoPlaying(false)
      }
    }, 1800)
    return () => clearTimeout(timerRef.current)
  }, [autoPlaying, autoIndex])

  function handleCardClick(i) {
    clearTimeout(timerRef.current)
    setAutoPlaying(false)
    setClosing(false)
    setActive(active === i ? null : i)
  }

  function handleReplay() {
    setClosing(false)
    setActive(0)
    setAutoIndex(0)
    setAutoPlaying(true)
  }

  return (
    <section className={`mvs-section${compact ? ' compact' : ''}`} ref={sectionRef}>
      {/* Header */}
      {!compact && (
        <div className="mvs-header">
          <p className="kicker">Short Video Story · ~20 seconds · Cinematic</p>
          <h2 className="mvs-title">
            <span style={{ color: 'var(--gold)' }}>"My Voice"</span>
          </h2>
          <p className="mvs-sub">
            English is not about being perfect.<br />
            <strong>English is about being heard.</strong>
          </p>
        </div>
      )}

      {/* Scene timeline */}
      <div className="mvs-scene-row">
        {SCENES.map((scene, i) => (
          <SceneCard
            key={scene.level}
            scene={scene}
            index={i}
            active={active}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* Connector line */}
      <div className="mvs-connector-track">
        {SCENES.map((scene, i) => (
          <div
            key={i}
            className={`mvs-connector-dot${active !== null && i <= active ? ' lit' : ''}`}
            style={{ '--scene-color': scene.color }}
          />
        ))}
        <div
          className="mvs-connector-line"
          style={{ width: active !== null ? `${(active / (SCENES.length - 1)) * 100}%` : '0%' }}
        />
      </div>

      {/* Closing scene */}
      <div className={`mvs-closing${closing ? ' visible' : ''}`}>
        <div className="mvs-closing-avatars">
          {SCENES.map(s => (
            <span key={s.level} className="mvs-closing-av">{s.avatar}</span>
          ))}
        </div>
        <p className="mvs-closing-together">spoken together, slowly and clearly —</p>
        <p className="mvs-closing-line">"This is our voice."</p>
        <p className="mvs-closing-sub">Relaxed. Equal. Confident.</p>
        <button className="mvs-replay-btn" onClick={handleReplay}>▶ Watch again</button>
      </div>

      {/* Producing level legend */}
      {!compact && (
        <div className="mvs-legend">
          <p className="mvs-legend-head">The Producing Levels</p>
          <div className="mvs-legend-row">
            {SCENES.map(s => (
              <div key={s.level} className="mvs-legend-item" style={{ '--scene-color': s.color }}>
                <span className="mvs-legend-dot" />
                <span className="mvs-legend-level">{s.level}</span>
                <span className="mvs-legend-timing">{s.timing}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom message */}
      {!compact && (
        <div className="mvs-message">
          <p>
            <strong>Learning → Trying → Using → Sharing → Belonging.</strong><br />
            Parents immediately understand the value.
            Children can see themselves in the story.
          </p>
        </div>
      )}
    </section>
  )
}
