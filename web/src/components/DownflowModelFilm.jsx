import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────
   DOWNFLOW MODEL FILM — Animated explainer (original)
   10 scenes · auto-advance · cinematic subtitles
   Pure CSS/SVG animated visuals — no video files needed
───────────────────────────────────────────────────────── */

const SCENES = [
  {
    id: 'hook',
    number: '01',
    label: 'HOOK',
    timing: '0–5 sec',
    color: '#6c63ff',
    accent: '#b5b0ff',
    bg: 'linear-gradient(135deg, #0d0b1e 0%, #1a1530 100%)',
    voice: [
      "Education doesn't fail",
      "because of students…",
    ],
    visual: <HookVisual />,
    caption: 'Bored classroom vs. active speaking children',
  },
  {
    id: 'problem',
    number: '02',
    label: 'PROBLEM',
    timing: '5–15 sec',
    color: '#e05a5a',
    accent: '#f7b5b5',
    bg: 'linear-gradient(135deg, #1c0a0a 0%, #2d1212 100%)',
    voice: [
      "It fails because",
      "value doesn't flow.",
    ],
    visual: <ProblemVisual />,
    caption: 'Passive learning, worksheets, low energy',
  },
  {
    id: 'shift',
    number: '03',
    label: 'THE SHIFT',
    timing: '15–25 sec',
    color: '#f5a623',
    accent: '#ffd89b',
    bg: 'linear-gradient(135deg, #1c1200 0%, #2e1e00 100%)',
    voice: [
      "So we redesigned the system.",
      "Students don't consume learning —",
      "they produce value.",
    ],
    visual: <ShiftVisual />,
    caption: 'Kids speaking, presenting, laughing, connecting',
  },
  {
    id: 'cell',
    number: '04',
    label: 'THE CELL MODEL',
    timing: '25–35 sec',
    color: '#27ae60',
    accent: '#a8f0c0',
    bg: 'linear-gradient(135deg, #011208 0%, #031f10 100%)',
    voice: [
      "Small learning cells.",
      "High engagement.",
      "Real output.",
    ],
    visual: <CellVisual />,
    caption: '5–6 students + 1 facilitator per cell',
  },
  {
    id: 'sponsor',
    number: '05',
    label: 'SPONSOR ENTRY',
    timing: '35–45 sec',
    color: '#2980b9',
    accent: '#aad4f5',
    bg: 'linear-gradient(135deg, #020e1c 0%, #061826 100%)',
    voice: [
      "A sponsor activates one cell —",
      "fully visible,",
      "fully measurable.",
    ],
    visual: <SponsorVisual />,
    caption: 'Sponsor → funds cell → class activates',
  },
  {
    id: 'guider',
    number: '06',
    label: 'THE GUIDER SYSTEM',
    timing: '45–65 sec',
    color: '#e67e22',
    accent: '#f9d4a0',
    bg: 'linear-gradient(135deg, #1c0e00 0%, #2e1800 100%)',
    voice: [
      "Then the system compounds.",
      "A student who completes — moves forward",
      "and sends value down.",
      "They become a guider.",
      "Their results are tied to those below.",
      "This creates accountability across levels.",
    ],
    visual: <GuiderVisual />,
    caption: 'Student → completes → becomes guider → new cell forms',
  },
  {
    id: 'loop',
    number: '07',
    label: 'ACCOUNTABILITY LOOP',
    timing: '65–75 sec',
    color: '#9b59b6',
    accent: '#dbb8f0',
    bg: 'linear-gradient(135deg, #120820 0%, #1e1030 100%)',
    voice: [
      "Every layer influences the next.",
      "And every result flows back up.",
    ],
    visual: <LoopVisual />,
    caption: 'Student → Guider → New Student → Results → back up',
  },
  {
    id: 'value',
    number: '08',
    label: 'VALUE SYSTEM',
    timing: '75–85 sec',
    color: '#f1c40f',
    accent: '#fdeea0',
    bg: 'linear-gradient(135deg, #181200 0%, #251c00 100%)',
    voice: [
      "Performance is shared.",
      "Cells are graded together.",
      "Effort becomes visible.",
    ],
    visual: <ValueVisual />,
    caption: 'Coins earned, shared, redistributed — group score shown',
  },
  {
    id: 'compound',
    number: '09',
    label: 'COMPOUNDING',
    timing: '85–95 sec',
    color: '#1abc9c',
    accent: '#a0f0de',
    bg: 'linear-gradient(135deg, #001c18 0%, #002e26 100%)',
    voice: [
      "One cell becomes many.",
      "Without losing structure.",
    ],
    visual: <CompoundVisual />,
    caption: 'One cell expanding into multiple cells',
  },
  {
    id: 'close',
    number: '10',
    label: 'CLOSE',
    timing: '95–110 sec',
    color: '#ffffff',
    accent: '#c0c8e0',
    bg: 'linear-gradient(135deg, #070d1c 0%, #0e1830 100%)',
    voice: [
      "This is not a donation.",
      "This is a system that produces value —",
      "and multiplies it.",
      "Fund one cell.",
      "Watch it grow.",
    ],
    visual: <CloseVisual />,
    caption: 'Confident students speaking directly to camera',
  },
]

/* ─── Scene Visuals ─── */
function HookVisual() {
  return (
    <div className="dmf-visual-split">
      <div className="dmf-split-left">
        <div className="dmf-desk-row">
          <span className="dmf-desk-figure dim">😶</span>
          <span className="dmf-desk-figure dim">😑</span>
          <span className="dmf-desk-figure dim">😔</span>
        </div>
        <div className="dmf-split-label muted">Traditional Classroom</div>
      </div>
      <div className="dmf-split-divider"><span>VS</span></div>
      <div className="dmf-split-right">
        <div className="dmf-desk-row spread">
          <span className="dmf-desk-figure bright">😄</span>
          <span className="dmf-desk-figure bright">🗣️</span>
          <span className="dmf-desk-figure bright">✋</span>
        </div>
        <div className="dmf-split-label bright">Downflow Cell</div>
      </div>
    </div>
  )
}

function ProblemVisual() {
  return (
    <div className="dmf-problem-vis">
      <div className="dmf-worksheet">
        <div className="dmf-ws-line" /><div className="dmf-ws-line short" />
        <div className="dmf-ws-line" /><div className="dmf-ws-line short" />
        <div className="dmf-ws-line mid" />
      </div>
      <div className="dmf-no-flow">
        <span className="dmf-arrow-blocked">→</span>
        <span className="dmf-blocked-label">Value doesn't reach students</span>
      </div>
    </div>
  )
}

function ShiftVisual() {
  const items = ['Speaking', 'Presenting', 'Laughing', 'Connecting']
  return (
    <div className="dmf-shift-grid">
      {items.map((item, i) => (
        <div key={item} className="dmf-shift-chip" style={{ animationDelay: `${i * 0.15}s` }}>
          {item}
        </div>
      ))}
    </div>
  )
}

function CellVisual() {
  const positions = [
    { x: '50%', y: '18%' },
    { x: '20%', y: '52%' },
    { x: '36%', y: '72%' },
    { x: '64%', y: '72%' },
    { x: '80%', y: '52%' },
  ]
  return (
    <div className="dmf-cell-vis">
      <svg viewBox="0 0 200 120" className="dmf-cell-svg">
        {[1,2,3,4].map(i => (
          <line key={i} x1="100" y1="22"
            x2={parseFloat(positions[i].x)} y2={parseFloat(positions[i].y)}
            stroke="rgba(39,174,96,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        ))}
        {[1,2,3,4].map(i => (
          <circle key={`c${i}`}
            cx={parseFloat(positions[i].x)} cy={parseFloat(positions[i].y)} r="10"
            fill="rgba(39,174,96,0.15)" stroke="rgba(39,174,96,0.5)" strokeWidth="1" />
        ))}
        <circle cx="100" cy="22" r="14"
          fill="rgba(39,174,96,0.2)" stroke="#27ae60" strokeWidth="1.5" />
      </svg>
      <div className="dmf-cell-label">5–6 Students + 1 Facilitator</div>
    </div>
  )
}

function SponsorVisual() {
  return (
    <div className="dmf-sponsor-flow">
      <div className="dmf-sf-node sponsor">💼<span>Sponsor</span></div>
      <div className="dmf-sf-arrow">
        <span className="dmf-sf-money">$</span>
        <span className="dmf-sf-arrow-line">→</span>
      </div>
      <div className="dmf-sf-node cell">🧩<span>Cell</span></div>
      <div className="dmf-sf-arrow"><span className="dmf-sf-arrow-line">→</span></div>
      <div className="dmf-sf-node active">⚡<span>Activated</span></div>
    </div>
  )
}

function GuiderVisual() {
  return (
    <div className="dmf-guider-tree">
      <div className="dmf-gt-row top">
        <div className="dmf-gt-node graduate">🎓<span>Graduate</span></div>
      </div>
      <div className="dmf-gt-arrow down">↓ becomes</div>
      <div className="dmf-gt-row mid">
        <div className="dmf-gt-node guider">⭐<span>Guider</span></div>
      </div>
      <div className="dmf-gt-arrow down">↓ mentors</div>
      <div className="dmf-gt-row bottom">
        <div className="dmf-gt-node student">🧒<span>New Cell</span></div>
        <div className="dmf-gt-node student">👧<span>New Cell</span></div>
      </div>
      <div className="dmf-gt-feedback">
        <span className="dmf-gt-feedback-line">results flow back ↑</span>
      </div>
    </div>
  )
}

function LoopVisual() {
  const nodes = ['Student', 'Guider', 'New Student', 'Results']
  const colors = ['#9b59b6', '#e67e22', '#27ae60', '#f1c40f']
  return (
    <div className="dmf-loop-ring">
      <svg viewBox="0 0 160 160" className="dmf-loop-svg">
        <circle cx="80" cy="80" r="55" fill="none" stroke="rgba(155,89,182,0.15)" strokeWidth="2" strokeDasharray="6 4" />
        {nodes.map((n, i) => {
          const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2
          const x = 80 + 55 * Math.cos(angle)
          const y = 80 + 55 * Math.sin(angle)
          return (
            <g key={n}>
              <circle cx={x} cy={y} r="16" fill={colors[i] + '33'} stroke={colors[i]} strokeWidth="1.5" />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="6" fill={colors[i]} fontWeight="700">
                {n.split(' ').map((w, j) => <tspan key={j} x={x} dy={j === 0 ? '-3' : '7'}>{w}</tspan>)}
              </text>
            </g>
          )
        })}
        {nodes.map((_, i) => {
          const a1 = (i / nodes.length) * 2 * Math.PI - Math.PI / 2
          const a2 = ((i + 1) / nodes.length) * 2 * Math.PI - Math.PI / 2
          const midA = (a1 + a2) / 2
          return (
            <text key={`arrow${i}`} x={80 + 55 * Math.cos(midA)} y={80 + 55 * Math.sin(midA)}
              textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="rgba(255,255,255,0.4)">→</text>
          )
        })}
      </svg>
    </div>
  )
}

function ValueVisual() {
  const members = ['Anh', 'Ben', 'Cai', 'Dara', 'Eva']
  const scores  = [88, 74, 91, 67, 82]
  return (
    <div className="dmf-value-vis">
      {members.map((m, i) => (
        <div key={m} className="dmf-vv-row">
          <span className="dmf-vv-name">{m}</span>
          <div className="dmf-vv-bar-track">
            <div className="dmf-vv-bar" style={{ width: `${scores[i]}%`, animationDelay: `${i * 0.1}s` }} />
          </div>
          <span className="dmf-vv-score">{scores[i]}</span>
        </div>
      ))}
      <div className="dmf-vv-total">Group Score: <strong>80.4</strong></div>
    </div>
  )
}

function CompoundVisual() {
  return (
    <div className="dmf-compound-vis">
      <div className="dmf-cv-row row1"><div className="dmf-cv-cell seed">🧩</div></div>
      <div className="dmf-cv-row row2">
        <div className="dmf-cv-cell grow">🧩</div>
        <div className="dmf-cv-cell grow">🧩</div>
      </div>
      <div className="dmf-cv-row row3">
        <div className="dmf-cv-cell grow delay">🧩</div>
        <div className="dmf-cv-cell grow delay">🧩</div>
        <div className="dmf-cv-cell grow delay">🧩</div>
        <div className="dmf-cv-cell grow delay">🧩</div>
      </div>
      <div className="dmf-cv-label">1 → 2 → 4 → ∞</div>
    </div>
  )
}

function CloseVisual() {
  const students = ['🧒', '👧', '🧑', '👦', '👩']
  return (
    <div className="dmf-close-vis">
      {students.map((s, i) => (
        <div key={i} className="dmf-close-student" style={{ animationDelay: `${i * 0.12}s` }}>
          <span className="dmf-close-avatar">{s}</span>
        </div>
      ))}
      <div className="dmf-close-tagline">DOWNFLOW — School of Life</div>
    </div>
  )
}

/* ─── Subtitle cycling hook ─── */
function useSubtitles(lines, active, intervalMs = 1800) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) { setIdx(0); setVisible(false); return }
    setIdx(0); setVisible(true)
    const t = setInterval(() => {
      setIdx(i => (i + 1 < lines.length ? i + 1 : i))
    }, intervalMs)
    return () => clearInterval(t)
  }, [active, lines])

  return { idx, visible }
}

/* ─── Single scene frame ─── */
function SceneFrame({ scene, isActive, sceneIndex, totalScenes, onNav }) {
  const { idx, visible } = useSubtitles(scene.voice, isActive, 1700)

  return (
    <div className="dmf-frame" style={{ background: scene.bg, '--scene-col': scene.color, '--scene-accent': scene.accent }}>
      <div className="dmf-grain" />
      <div className="dmf-topbar">
        <span className="dmf-scene-num">{scene.number}</span>
        <span className="dmf-scene-label">{scene.label}</span>
        <span className="dmf-timing">{scene.timing}</span>
      </div>
      <div className="dmf-vis-area">{scene.visual}</div>
      <div className="dmf-caption">{scene.caption}</div>
      {visible && (
        <div className="dmf-sub-bar">
          <span className="dmf-sub-text" key={idx}>{scene.voice[idx]}</span>
        </div>
      )}
      <div className="dmf-nav">
        <button className="dmf-nav-btn" onClick={() => onNav(-1)} disabled={sceneIndex === 0}>‹</button>
        <div className="dmf-dots">
          {Array.from({ length: totalScenes }).map((_, i) => (
            <span key={i} className={`dmf-dot${i === sceneIndex ? ' active' : ''}`}
              style={i === sceneIndex ? { background: scene.color } : {}} />
          ))}
        </div>
        <button className="dmf-nav-btn" onClick={() => onNav(1)} disabled={sceneIndex === totalScenes - 1}>›</button>
      </div>
    </div>
  )
}

/* ─── Auto-play progress bar ─── */
function ProgressBar({ active, duration, onComplete }) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef()
  const startRef = useRef()

  useEffect(() => {
    if (!active) { setProgress(0); return }
    startRef.current = performance.now()
    const tick = (now) => {
      const pct = Math.min(((now - startRef.current) / duration) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
      else onComplete()
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, duration])

  return (
    <div className="dmf-progress-track">
      <div className="dmf-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  )
}

/* ─── Main film component ─── */
export default function DownflowModelFilm({ compact = false }) {
  const [current, setCurrent]   = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [completed, setCompleted] = useState(false)

  const SCENE_DURATION = 4500

  const handleProgress = useCallback(() => {
    setCurrent(c => {
      if (c + 1 < SCENES.length) return c + 1
      setPlaying(false); setCompleted(true); return c
    })
  }, [])

  const navigate = (dir) => {
    setPlaying(false)
    setCurrent(c => Math.max(0, Math.min(SCENES.length - 1, c + dir)))
  }

  const handlePlay = () => {
    setCompleted(false)
    if (current === SCENES.length - 1) setCurrent(0)
    setPlaying(true)
  }

  return (
    <section className={`dmf-root${compact ? ' compact' : ''}`}>
      <div className="dmf-header">
        <h2 className="dmf-title">The Downflow Model</h2>
        <p className="dmf-subtitle">A 10-scene explainer — from problem to system</p>
      </div>

      <div className="dmf-viewport">
        <ProgressBar key={`${current}-${playing}`} active={playing} duration={SCENE_DURATION} onComplete={handleProgress} />
        <SceneFrame scene={SCENES[current]} isActive={playing} sceneIndex={current} totalScenes={SCENES.length} onNav={navigate} />
        <div className="dmf-controls">
          <button className={`dmf-play-btn${playing ? ' playing' : ''}`} onClick={() => playing ? setPlaying(false) : handlePlay()}>
            {playing ? '⏸ Pause' : completed ? '↺ Replay' : '▶ Play Film'}
          </button>
          <span className="dmf-scene-counter">{current + 1} / {SCENES.length}</span>
        </div>
      </div>

      <div className="dmf-strip">
        {SCENES.map((s, i) => (
          <button key={s.id}
            className={`dmf-strip-btn${i === current ? ' active' : ''}`}
            style={i === current ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => { setPlaying(false); setCurrent(i) }}
          >
            <span className="dmf-strip-num">{s.number}</span>
            <span className="dmf-strip-lbl">{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
