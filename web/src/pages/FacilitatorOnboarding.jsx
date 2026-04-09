import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { db, isConfigured, doc, getDoc, updateDoc } from '../services/firebase.js'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   FACILITATOR ONBOARDING — Contract + 6-Step Flow
───────────────────────────────────────────────────────── */

const CONTRACT_SECTIONS = [
  {
    icon: '👤',
    title: 'Role',
    points: [
      'Facilitate learning cells of 5–6 students',
      'Drive active participation and real output',
      'Guide communication, confidence, and creation',
    ],
  },
  {
    icon: '📋',
    title: 'Responsibilities',
    points: [
      'Run 2 sessions per week per cell',
      'Record key class moments and student clips',
      'Assign daily reps (5–7 min tasks)',
      'Upload all content to the platform',
      'Maintain engagement and accountability',
    ],
  },
  {
    icon: '💰',
    title: 'Payment Structure',
    points: [
      'Weekly payouts — every Friday',
      'Phase 1 → 35% of sponsorship revenue',
      'Phase 2 → 40% after 4+ weeks consistency',
      'Phase 3 → 45% after introducing a new facilitator',
    ],
    highlight: true,
  },
  {
    icon: '📈',
    title: 'Growth Clause',
    points: [
      'Bring in a new qualified facilitator',
      'Automatically unlock Phase 3 (45%)',
      'Your earnings scale with the system you build',
    ],
  },
  {
    icon: '🎬',
    title: 'Content Clause',
    points: [
      'All class content must be uploaded within 48h',
      'Platform retains usage rights for transparency',
      'Content is visible to sponsors and guiders',
      'Clips used for student progress portfolios',
    ],
  },
  {
    icon: '⚡',
    title: 'Performance Clause',
    points: [
      'Low engagement or missing uploads → review meeting',
      'High performance → accelerated phase promotion',
      'Consistent excellence → cell expansion eligibility',
    ],
  },
]

const ONBOARDING_STEPS = [
  {
    num: '01',
    icon: '🎬',
    title: 'Application',
    sub: 'Short video intro',
    desc: 'Record a 1-minute speaking test — introduce yourself and explain why you want to guide, not lecture.',
    action: 'Record intro video',
    color: '#6c63ff',
  },
  {
    num: '02',
    icon: '🏫',
    title: 'Demo Class',
    sub: 'Run a 10-min mock session',
    desc: 'Facilitate a mock session with 3–4 volunteers. Demonstrate energy, structure, and student activation.',
    action: 'Book demo slot',
    color: '#f97316',
  },
  {
    num: '03',
    icon: '📚',
    title: 'Training',
    sub: 'System fundamentals',
    desc: 'Learn the cell structure, recording workflow, engagement methods, and the upload system.',
    action: 'Start training',
    color: '#27ae60',
    learn: ['Cell structure & roles', 'Recording system', 'Engagement methods', 'Upload workflow'],
  },
  {
    num: '04',
    icon: '🌱',
    title: 'First Cell Assignment',
    sub: 'Phase 1 · 35%',
    desc: 'You receive your first cell of 5–6 students. Begin at Phase 1 earning rate. Your journey starts.',
    action: 'Accept assignment',
    color: '#2980b9',
  },
  {
    num: '05',
    icon: '📊',
    title: 'Weekly Review',
    sub: 'Performance + uploads checked',
    desc: 'Every week, your session health, participation data, and content uploads are reviewed automatically.',
    action: 'View dashboard',
    color: '#9b59b6',
  },
  {
    num: '06',
    icon: '⭐',
    title: 'Growth Path',
    sub: 'Phase 2 → Phase 3',
    desc: 'Stable performance unlocks Phase 2 (40%). Recruit a new facilitator to unlock Phase 3 (45%).',
    action: 'Track progress',
    color: '#f1c40f',
    phases: [
      { label: 'Phase 2', trigger: 'Stability ≥4 weeks', pct: 40 },
      { label: 'Phase 3', trigger: 'Recruit a facilitator', pct: 45 },
    ],
  },
]

export default function FacilitatorOnboarding() {
  const { uid } = useAuth()
  const toast = useToast()
  const [contractOpen, setContractOpen] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [saving, setSaving] = useState(false)

  // Load saved progress from Firestore
  useEffect(() => {
    if (!uid || !isConfigured) return
    getDoc(doc(db, 'users', uid)).then(snap => {
      if (snap.exists()) {
        const data = snap.data()
        if (data.onboardingSteps) setCompletedSteps(data.onboardingSteps)
        if (data.onboardingStep != null) setActiveStep(data.onboardingStep)
      }
    }).catch(() => {})
  }, [uid])

  async function completeStep(stepIndex) {
    const updated = [...new Set([...completedSteps, stepIndex])]
    setCompletedSteps(updated)
    const next = Math.min(stepIndex + 1, 5)
    setActiveStep(next)
    if (!uid || !isConfigured) return
    setSaving(true)
    try {
      await updateDoc(doc(db, 'users', uid), {
        onboardingSteps: updated,
        onboardingStep: next,
        onboardingPhase: updated.length >= 6 ? 1 : 0,
      })
      if (updated.length >= 6) toast('Onboarding complete! You can now run your first cell.', 'success')
      else toast('Step saved', 'success')
    } catch { toast('Could not save progress', 'error') }
    finally { setSaving(false) }
  }

  return (
    <div className="fob-page">
      <div className="fob-hero">
        <p className="fob-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h1 className="fob-title">Facilitator Contract<br />&amp; Onboarding</h1>
        <p className="fob-sub">Everything you need to understand the role, sign on, and start building.</p>
        <Link to="/facilitator-film" className="fob-film-link">▶ Watch Facilitator Film</Link>
      </div>

      {/* ── Contract ── */}
      <section className="fob-section">
        <h2 className="fob-section-title">📄 The Contract</h2>
        <p className="fob-section-desc">Core points every facilitator agrees to before their first cell.</p>
        <div className="fob-contract-grid">
          {CONTRACT_SECTIONS.map((cs, i) => (
            <div key={cs.title} className={`fob-contract-card${cs.highlight ? ' highlight' : ''}`}
              onClick={() => setContractOpen(contractOpen === i ? null : i)}>
              <div className="fob-cc-header">
                <span className="fob-cc-icon">{cs.icon}</span>
                <strong className="fob-cc-title">{cs.title}</strong>
                <span className="fob-cc-toggle">{contractOpen === i ? '▲' : '▼'}</span>
              </div>
              {contractOpen === i && (
                <ul className="fob-cc-points">
                  {cs.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="fob-sign-row">
          <p className="fob-sign-note">By joining as a facilitator, you agree to these terms and commit to the system.</p>
          <Link to="/facilitator" className="fob-sign-btn">Apply &amp; Sign On →</Link>
        </div>
      </section>

      {/* ── Onboarding Steps ── */}
      <section className="fob-section">
        <h2 className="fob-section-title">🔄 Onboarding Flow</h2>
        <p className="fob-section-desc">Six steps from application to your first earning phase.</p>

        <div className="fob-steps-layout">
          {/* Step nav */}
          <div className="fob-step-nav">
            {ONBOARDING_STEPS.map((step, i) => (
              <button key={step.num}
                className={`fob-step-navbtn${i === activeStep ? ' active' : ''}${completedSteps.includes(i) ? ' done' : ''}`}
                style={i === activeStep ? { borderColor: step.color, color: step.color } : {}}
                onClick={() => setActiveStep(i)}>
                <span className="fob-sn-num">{step.num}</span>
                <span className="fob-sn-title">{step.title}</span>
                <span className="fob-sn-sub">{step.sub}</span>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="fob-step-detail" style={{ '--step-col': ONBOARDING_STEPS[activeStep].color }}>
            {(() => {
              const step = ONBOARDING_STEPS[activeStep]
              return (
                <>
                  <div className="fob-sd-header">
                    <span className="fob-sd-icon">{step.icon}</span>
                    <div>
                      <p className="fob-sd-num">Step {step.num}</p>
                      <h3 className="fob-sd-title" style={{ color: step.color }}>{step.title}</h3>
                      <p className="fob-sd-sub">{step.sub}</p>
                    </div>
                  </div>
                  <p className="fob-sd-desc">{step.desc}</p>
                  {step.learn && (
                    <div className="fob-sd-learn">
                      <p className="fob-sdl-head">You'll learn:</p>
                      <ul>{step.learn.map((l, i) => <li key={i}>✓ {l}</li>)}</ul>
                    </div>
                  )}
                  {step.phases && (
                    <div className="fob-sd-phases">
                      {step.phases.map(p => (
                        <div key={p.label} className="fob-sdp-row">
                          <span className="fob-sdp-label">{p.label}</span>
                          <span className="fob-sdp-trigger">{p.trigger}</span>
                          <span className="fob-sdp-pct" style={{ color: step.color }}>{p.pct}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="fob-sd-nav-row">
                    <button className="fob-sd-prev" disabled={activeStep === 0}
                      onClick={() => setActiveStep(s => s - 1)}>← Prev</button>
                    <button className="fob-sd-action" style={{ background: step.color }}
                      onClick={() => completeStep(activeStep)} disabled={saving || completedSteps.includes(activeStep)}>
                      {saving ? "Saving…" : completedSteps.includes(activeStep) ? "✓ Completed" : step.action}
                    </button>
                    <button className="fob-sd-next" disabled={activeStep === ONBOARDING_STEPS.length - 1}
                      onClick={() => setActiveStep(s => s + 1)}>Next →</button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ── Pay phases summary ── */}
      <section className="fob-section">
        <h2 className="fob-section-title">💰 Earning Phases at a Glance</h2>
        <div className="fob-phases-row">
          {[
            { phase: 1, pct: 35, label: 'Starting Facilitator', trigger: 'Join system', color: '#72d0ff', icon: '🌱' },
            { phase: 2, pct: 40, label: 'Consistent Performance', trigger: 'Stable 4+ weeks', color: '#4de8b0', icon: '📈' },
            { phase: 3, pct: 45, label: 'System Builder', trigger: 'Recruit a facilitator', color: '#f5c842', icon: '⭐' },
          ].map(p => (
            <div key={p.phase} className="fob-phase-card" style={{ '--pc': p.color }}>
              <span className="fob-pc-icon">{p.icon}</span>
              <span className="fob-pc-phase">Phase {p.phase}</span>
              <span className="fob-pc-pct" style={{ color: p.color }}>{p.pct}%</span>
              <span className="fob-pc-label">{p.label}</span>
              <span className="fob-pc-trigger">{p.trigger}</span>
            </div>
          ))}
        </div>
        <div className="fob-arrow-divider">35% → 40% → 45% · Weekly payouts</div>
      </section>

      <div className="fob-cta-final">
        <p>"This is not just a job. This is a system where I grow, earn, and build something bigger."</p>
        <Link to="/facilitator" className="fob-cta-btn">Apply as Facilitator</Link>
        <Link to="/facilitator-app" className="fob-cta-sec">Explore the App →</Link>
      </div>
    </div>
  )
}
