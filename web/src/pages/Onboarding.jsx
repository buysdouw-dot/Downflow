import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const ROLES = [
  {
    id: 'parent',
    icon: '👨‍👩‍👧',
    title: 'Parent or Guardian',
    desc: 'I want to enrol my child in a learning cell.',
    color: '#72d0ff',
    destination: '/booking',
    destinationLabel: 'Find a Cell →',
    steps: [
      { title: 'Find a cell near you', body: 'Browse available cells by region, pack, and schedule. Most cells meet weekly for 90 minutes.' },
      { title: 'Book a seat', body: 'Reserve a place for your child. If a sponsored seat is available, it\'s free. Otherwise, direct enrolment is $480/year.' },
      { title: 'Meet the facilitator', body: 'Your facilitator will contact you within 24 hours with session details and a parent WhatsApp group link.' },
      { title: 'Track progress weekly', body: 'Log in to your Parent Dashboard to see session reports, milestones, and facilitator notes.' },
    ],
  },
  {
    id: 'student',
    icon: '🎓',
    title: 'Student',
    desc: 'I want to join a cell and grow my skills.',
    color: '#4de8b0',
    destination: '/booking',
    destinationLabel: 'Book a Session →',
    steps: [
      { title: 'Choose your pack', body: 'Each cell runs one life-skills pack. Voice & Presence, Kidinomics, Systems Thinking, and more. Pick what speaks to you.' },
      { title: 'Join a cell', body: 'Five students. One facilitator. Weekly sessions. You\'ll know everyone by name within two weeks.' },
      { title: 'Show up and contribute', body: 'Sessions are not lessons. You will speak, build, create, and teach. The more you give, the more you earn.' },
      { title: 'Graduate and guide', body: 'Top students from each cohort become Guiders for the next one. Your learning compounds into the system.' },
    ],
  },
  {
    id: 'facilitator',
    icon: '🧭',
    title: 'Facilitator',
    desc: 'I want to run a cell and earn from it.',
    color: '#b083ff',
    destination: '/facilitator-onboarding',
    destinationLabel: 'Start Training →',
    steps: [
      { title: 'Complete 48-hour certification', body: 'Our certification is fully online. No teaching degree needed. You need curiosity, patience, and a safe space to meet.' },
      { title: 'Get matched to a cell', body: 'We match you with a community and sponsor based on your location and availability. You don\'t find students — we do.' },
      { title: 'Run weekly sessions', body: 'Sessions follow the curriculum, but you hold the space. Your job is not to teach — it\'s to create conditions for growth.' },
      { title: 'Earn and advance', body: 'Facilitators earn $800–$1,200/year per cell. Bonuses are paid based on student outcomes and cell grade.' },
    ],
  },
  {
    id: 'sponsor',
    icon: '💼',
    title: 'Sponsor',
    desc: 'I want to fund learning cells and track impact.',
    color: '#f0c840',
    destination: '/funding',
    destinationLabel: 'See Funding Options →',
    steps: [
      { title: 'Choose a sponsorship tier', body: 'Fund one student ($480), one cell ($2,400), or a regional cluster ($12,000). All tiers include full visibility.' },
      { title: 'Get your dashboard', body: 'Real-time data on every session your funding supports: attendance, health scores, student milestones, and facilitator notes.' },
      { title: 'Receive monthly reports', body: 'Automated impact reports delivered to your inbox. Share them with your board, your team, or your family.' },
      { title: 'Renew and expand', body: 'High-performing cells earn sponsor renewal priority. Watch the system compound over time.' },
    ],
  },
  {
    id: 'connector',
    icon: '🔗',
    title: 'Connector',
    desc: 'I want to grow the network in my region.',
    color: '#ff9f5a',
    destination: '/connector',
    destinationLabel: 'Connector Portal →',
    steps: [
      { title: 'Identify your region', body: 'A connector owns a geographic zone. You are responsible for forming cells, finding sponsors, and placing facilitators.' },
      { title: 'Apply for a connector slot', body: 'Each region has one connector. Submit an application with your community context and network capacity.' },
      { title: 'Build the cell network', body: 'Your job is cell formation: find the space, the sponsor, and the facilitator. The platform handles everything else.' },
      { title: 'Earn from the network', body: 'Connectors earn a percentage of each cell they activate and maintain. As your network grows, your income compounds.' },
    ],
  },
]

export default function Onboarding() {
  usePageMeta('Get Started', 'Find your role in the DOWNFLOW system.')
  const [selectedRole, setSelectedRole] = useState(null)
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const role = ROLES.find(r => r.id === selectedRole)

  return (
    <div className="onboarding-page">

      {/* ── HERO ── */}
      <section className="onboarding-hero">
        <div className="onboarding-hero-inner">
          <p className="kicker">Welcome to DOWNFLOW · Role-Based Onboarding</p>
          <h1 className="onboarding-hero-title">
            Where do you<br />
            <span style={{ color: 'var(--gold)' }}>fit in the system?</span>
          </h1>
          <p className="onboarding-hero-sub">
            DOWNFLOW has five roles. Every role matters. Every role earns or benefits.
            Choose yours and we'll walk you through exactly how to get started.
          </p>
        </div>
      </section>

      {/* ── ROLE SELECTOR ── */}
      {!selectedRole && (
        <section className="section onboarding-roles-section">
          <div className="onboarding-roles-grid">
            {ROLES.map(r => (
              <button
                key={r.id}
                className="onboarding-role-card"
                style={{ '--role-color': r.color }}
                onClick={() => { setSelectedRole(r.id); setStep(0) }}
              >
                <span className="onboarding-role-icon">{r.icon}</span>
                <h3 className="onboarding-role-title">{r.title}</h3>
                <p className="onboarding-role-desc">{r.desc}</p>
                <span className="onboarding-role-arrow">→</span>
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>Not sure? <Link to="/about" style={{ color: 'var(--gold)' }}>Read about the model first →</Link></p>
          </div>
        </section>
      )}

      {/* ── ROLE PATHWAY ── */}
      {selectedRole && role && (
        <section className="section onboarding-pathway-section">
          <button className="booking-back-btn" onClick={() => setSelectedRole(null)}>← Choose a different role</button>

          <div className="onboarding-pathway-header" style={{ '--role-color': role.color }}>
            <span className="onboarding-pathway-icon">{role.icon}</span>
            <div>
              <h2 className="onboarding-pathway-title">{role.title} Pathway</h2>
              <p className="onboarding-pathway-sub">{role.desc}</p>
            </div>
          </div>

          {/* Step tracker */}
          <div className="onboarding-steps-nav">
            {role.steps.map((s, i) => (
              <button
                key={i}
                className={`onboarding-step-dot${step === i ? ' active' : step > i ? ' done' : ''}`}
                style={{ '--role-color': role.color }}
                onClick={() => setStep(i)}
              >
                {step > i ? '✓' : i + 1}
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="onboarding-step-content" style={{ '--role-color': role.color }}>
            <div className="onboarding-step-num">Step {step + 1} of {role.steps.length}</div>
            <h3 className="onboarding-step-title">{role.steps[step].title}</h3>
            <p className="onboarding-step-body">{role.steps[step].body}</p>
            <div className="onboarding-step-actions">
              {step < role.steps.length - 1
                ? <button className="btn btn-gold" onClick={() => setStep(s => s + 1)}>Next →</button>
                : <Link to={role.destination} className="btn btn-gold">{role.destinationLabel}</Link>
              }
              {step > 0 && (
                <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
            </div>
          </div>

          {/* All steps preview */}
          <div className="onboarding-all-steps">
            {role.steps.map((s, i) => (
              <div
                key={i}
                className={`onboarding-all-step${i <= step ? ' active' : ''}`}
                onClick={() => setStep(i)}
              >
                <span className="onboarding-all-step-num" style={{ background: i <= step ? role.color : undefined }}>{i < step ? '✓' : i + 1}</span>
                <span className="onboarding-all-step-title">{s.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── QUICK LINKS ── */}
      <section className="section onboarding-quick-section">
        <div className="section-header">
          <p className="kicker">Explore More</p>
          <h2>Before You Start</h2>
        </div>
        <div className="onboarding-quick-grid">
          <Link to="/about" className="onboarding-quick-card">
            <span>📖</span>
            <h3>About the Model</h3>
            <p>Understand the philosophy behind DOWNFLOW before you commit.</p>
          </Link>
          <Link to="/curriculum" className="onboarding-quick-card">
            <span>📦</span>
            <h3>View Curriculum</h3>
            <p>See all 10 life-skills packs and what each one builds.</p>
          </Link>
          <Link to="/pricing" className="onboarding-quick-card">
            <span>💰</span>
            <h3>Pricing</h3>
            <p>Full transparency on what things cost and where money goes.</p>
          </Link>
          <Link to="/support" className="onboarding-quick-card">
            <span>❓</span>
            <h3>FAQ & Support</h3>
            <p>Common questions answered. Direct contact if you need it.</p>
          </Link>
        </div>
      </section>

    </div>
  )
}
