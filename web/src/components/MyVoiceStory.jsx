import React, { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────
   SHORT VIDEO STORY — "MY VOICE"
   Full screenplay: spoken words + visual direction
   Awaken → Align → Apply → Amplify → Ascend
───────────────────────────────────────────────────────── */

const SCENES = [
  {
    level: 'AWAKEN',
    tag: '01 · Awareness of Language',
    name: 'Max',
    avatar: '🧒',
    color: '#b083ff',
    lightOpacity: 0.2,
    timing: '0–4 sec',

    /* What is seen on screen */
    visual: [
      'A quiet, open space — soft shadows, warm and still.',
      'Five children stand together, calm.',
      'No desks. No books. No pressure.',
      'A single warm light appears above — steady, kind, unhurried.',
      'The light finds Max. He steps forward, just slightly.',
    ],

    /* What Max actually says — word for word */
    spoken: [
      { type: 'breath', text: '[ takes a quiet breath ]' },
      { type: 'line',   text: 'My name is Max.' },
      { type: 'pause',  text: '[ small pause — he looks up ]' },
      { type: 'line',   text: 'I am learning English.' },
      { type: 'beat',   text: '[ beat — soft smile ]' },
      { type: 'line',   text: 'It is new. But I am here.' },
    ],

    /* Why this moment matters */
    why: 'The first word spoken is never perfect. It is brave. AWAKEN is the moment a learner decides to begin — not the moment they get it right.',
  },

  {
    level: 'ALIGN',
    tag: '02 · Understanding & Confidence',
    name: 'Lina',
    avatar: '👧',
    color: '#72d0ff',
    lightOpacity: 0.3,
    timing: '5–9 sec',

    visual: [
      'The light flows downward — wider now, softer at the edges.',
      'Lina rises. She does not rush.',
      'She looks at the others first, then forward.',
      'The shadows around her lift slightly — not gone, just easier.',
    ],

    spoken: [
      { type: 'breath', text: '[ breathes — steady ]' },
      { type: 'line',   text: 'My name is Lina.' },
      { type: 'pause',  text: '[ looks at the group, then back ]' },
      { type: 'line',   text: 'I am not afraid to try.' },
      { type: 'beat',   text: '[ quiet confidence — not performance ]' },
      { type: 'line',   text: 'I do not need to be perfect.' },
      { type: 'line',   text: 'I just need to begin.' },
    ],

    why: 'ALIGN is the shift from fear to willingness. The child is not fluent yet — but they are no longer frozen. Safety makes speech possible.',
  },

  {
    level: 'APPLY',
    tag: '03 · Using English to Create',
    name: 'Noah',
    avatar: '🧑',
    color: '#4de8b0',
    lightOpacity: 0.38,
    timing: '10–14 sec',

    visual: [
      'The light becomes clearer — more structured, more present.',
      'Noah steps into it with purpose.',
      'He holds something imaginary in his hands — an idea, a thought.',
      'He turns toward the others as he speaks.',
    ],

    spoken: [
      { type: 'line',   text: 'My name is Noah.' },
      { type: 'pause',  text: '[ lifts his hands slightly, like holding something ]' },
      { type: 'line',   text: 'I use English to share my ideas.' },
      { type: 'beat',   text: '[ looks at what he is "holding" ]' },
      { type: 'line',   text: 'I have things to say.' },
      { type: 'line',   text: 'And now — I can say them.' },
    ],

    why: 'APPLY is language becoming a tool. Not a subject to study — a vehicle for expression. The child moves from learning English to using it.',
  },

  {
    level: 'AMPLIFY',
    tag: '04 · Speaking With Others',
    name: 'Aiko',
    avatar: '👩',
    color: '#d2ad44',
    lightOpacity: 0.52,
    timing: '15–19 sec',

    visual: [
      'The light spreads outward — reaching the other children now.',
      'Aiko turns toward the group, not away from them.',
      'The others lean in, slightly. Listening.',
      'Connection forms — visible, warm, unforced.',
    ],

    spoken: [
      { type: 'line',   text: 'My name is Aiko.' },
      { type: 'pause',  text: '[ turns to face the others ]' },
      { type: 'line',   text: 'When I speak...' },
      { type: 'beat',   text: '[ pause — she waits, lets the silence breathe ]' },
      { type: 'line',   text: '...others listen.' },
      { type: 'pause',  text: '[ soft smile — she sees it happening in real time ]' },
      { type: 'line',   text: 'That is new for me.' },
      { type: 'line',   text: 'And it feels right.' },
    ],

    why: 'AMPLIFY is discovery. The child realises their voice has weight — not because they performed, but because they were genuinely heard.',
  },

  {
    level: 'ASCEND',
    tag: '05 · Belonging & Fluency',
    name: 'Maya',
    avatar: '🧑‍🎓',
    color: '#ff9f5a',
    lightOpacity: 0.68,
    timing: '20–24 sec',

    visual: [
      'All five children are softly illuminated now — equally, gently.',
      'Maya steps forward — not apart from the group, but among them.',
      'The light is steady. Full. No shadows.',
      'The children look at each other. Then outward. At ease.',
    ],

    spoken: [
      { type: 'line',   text: 'My name is Maya.' },
      { type: 'pause',  text: '[ looks at the group, then back — grounded ]' },
      { type: 'line',   text: 'English helps us connect.' },
      { type: 'beat',   text: '[ beat — simple, true, not dramatic ]' },
      { type: 'line',   text: 'It is not about being perfect.' },
      { type: 'line',   text: 'It is about being understood.' },
      { type: 'line',   text: 'It is about being here — together.' },
    ],

    why: 'ASCEND is belonging. Fluency is not a score — it is the moment a learner feels they have a right to speak, and a place where their words land.',
  },
]

const CLOSING = {
  direction: [
    'All five children stand together in the full light.',
    'Relaxed. Equal. No hierarchy.',
    'They look at each other — a quiet recognition.',
    'Then forward — steady, confident, unhurried.',
    'They speak together — not rehearsed, not performed.',
    'Slowly. Clearly. Meant.',
  ],
  spoken: '"This is our voice."',
  sub: 'Fade to soft white.',
  note: 'Leave space. Then: the DOWNFLOW mark.',
}

/* ─── Utilities ─── */
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

/* ─── Subtitle overlay — cycles through spoken lines when active ─── */
function SubtitleOverlay({ scene, active }) {
  const lines = scene.spoken.filter(s => s.type === 'line')
  const [subIndex, setSubIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) { setSubIndex(0); setVisible(false); return }
    setSubIndex(0)
    setVisible(true)
    const interval = setInterval(() => {
      setSubIndex(i => {
        const next = i + 1
        if (next >= lines.length) { clearInterval(interval); return i }
        return next
      })
    }, 520)
    return () => clearInterval(interval)
  }, [active, scene])

  if (!active || !visible || lines.length === 0) return null
  return (
    <div className="mvs-subtitle-bar">
      <span className="mvs-subtitle-text" key={subIndex}>
        {lines[subIndex]?.text}
      </span>
    </div>
  )
}

/* ─── Scene card (compact timeline view) ─── */
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
        <p className="mvs-scene-line1">"{scene.spoken[1]?.text}"</p>
        <p className={`mvs-scene-line2${isActive ? ' visible' : ''}`}>
          "{scene.spoken.find(s => s.type === 'line' && scene.spoken.indexOf(s) > 1)?.text}"
        </p>
      </div>
      <SubtitleOverlay scene={scene} active={isActive} />
      <div className="mvs-scene-tag">{scene.tag}</div>
    </button>
  )
}

/* ─── Full screenplay panel ─── */
function SceneScript({ scene }) {
  return (
    <div className="mvs-script-panel" style={{ '--scene-color': scene.color }}>
      <div className="mvs-script-header">
        <span className="mvs-script-level-badge">{scene.level}</span>
        <span className="mvs-script-avatar">{scene.avatar}</span>
        <div>
          <h3 className="mvs-script-name">{scene.name}</h3>
          <span className="mvs-script-tag">{scene.tag} · {scene.timing}</span>
        </div>
      </div>

      <div className="mvs-script-body">
        {/* Visual direction column */}
        <div className="mvs-script-col visual-col">
          <p className="mvs-script-col-head">🎬 Visual Direction</p>
          <div className="mvs-script-visual-lines">
            {scene.visual.map((v, i) => (
              <div key={i} className="mvs-visual-line">
                <span className="mvs-visual-bullet" />
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spoken dialogue column */}
        <div className="mvs-script-col dialogue-col">
          <p className="mvs-script-col-head">🗣️ Spoken Dialogue — {scene.name}</p>
          <div className="mvs-script-dialogue">
            {scene.spoken.map((line, i) => (
              <div
                key={i}
                className={`mvs-dialogue-line ${line.type}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {line.type === 'line'
                  ? <span className="mvs-speech">"{line.text}"</span>
                  : <span className="mvs-direction">{line.text}</span>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why this moment matters */}
      <div className="mvs-script-why">
        <span className="mvs-why-icon">💡</span>
        <p>{scene.why}</p>
      </div>
    </div>
  )
}

/* ─── Closing screenplay ─── */
function ClosingScript({ visible, onReplay }) {
  return (
    <div className={`mvs-closing-full${visible ? ' visible' : ''}`}>
      <div className="mvs-closing-script-grid">
        <div className="mvs-script-col visual-col">
          <p className="mvs-script-col-head">🎬 Visual Direction</p>
          {CLOSING.direction.map((d, i) => (
            <div key={i} className="mvs-visual-line">
              <span className="mvs-visual-bullet" />
              <span>{d}</span>
            </div>
          ))}
          <div className="mvs-visual-line" style={{ marginTop: '0.75rem', opacity: 0.6 }}>
            <span className="mvs-visual-bullet" style={{ background: 'var(--text-muted)' }} />
            <span style={{ fontStyle: 'italic' }}>{CLOSING.sub}</span>
          </div>
          <div className="mvs-visual-line" style={{ opacity: 0.5 }}>
            <span className="mvs-visual-bullet" style={{ background: 'var(--text-muted)' }} />
            <span style={{ fontStyle: 'italic' }}>{CLOSING.note}</span>
          </div>
        </div>

        <div className="mvs-script-col dialogue-col">
          <p className="mvs-script-col-head">🗣️ All Five — Together</p>
          <div className="mvs-closing-avatars-row">
            {SCENES.map(s => (
              <span key={s.level} className="mvs-closing-av-sm">{s.avatar}</span>
            ))}
          </div>
          <div className="mvs-closing-final-line">
            <span className="mvs-closing-quote">{CLOSING.spoken}</span>
            <p className="mvs-closing-direction">spoken together — slowly and clearly</p>
          </div>
        </div>
      </div>

      <div className="mvs-closing-footer">
        <p className="mvs-closing-tag">English is not about being perfect. <strong>It is about being heard.</strong></p>
        <button className="mvs-replay-btn" onClick={onReplay}>▶ Watch again</button>
      </div>
    </div>
  )
}

/* ─── Main component ─── */
export default function MyVoiceStory({ compact = false }) {
  const [active, setActive] = useState(null)
  const [autoPlaying, setAutoPlaying] = useState(false)
  const [autoIndex, setAutoIndex] = useState(0)
  const [closing, setClosing] = useState(false)
  const [sectionRef, inView] = useInView(0.25)
  const timerRef = useRef(null)

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
    }, 2200)
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

      {/* Header — full mode only */}
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
          <p className="mvs-instruction">Click any scene to read the full script — what they say and what the camera shows.</p>
        </div>
      )}

      {/* Timeline cards */}
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

      {/* Progress connector */}
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

      {/* Full screenplay panel — shown when a scene is active */}
      {active !== null && (
        <SceneScript scene={SCENES[active]} key={active} />
      )}

      {/* Closing screenplay */}
      <ClosingScript visible={closing} onReplay={handleReplay} />

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
