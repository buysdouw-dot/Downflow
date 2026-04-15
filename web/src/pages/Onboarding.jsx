import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const ROLES = [
  {
    id: 'parent',
    icon: '👨‍👩‍👧',
    title: 'Parent or Guardian',
    desc: 'Enrol my child in a learning cell.',
    color: '#72d0ff',
    destination: '/booking',
    destinationLabel: 'Find a Cell →',
    benefit: 'Your child gets a structured, safe environment to grow — backed by a real facilitator, not an algorithm.',
    stats: [
      { v: 'Free',  l: 'Sponsored seats' },
      { v: '91%',   l: 'Completion rate' },
      { v: '24',    l: 'Sessions per cycle' },
      { v: 'Weekly',l: 'Progress reports' },
    ],
    steps: [
      { title: 'Find a cell near you',    body: 'Browse available cells by region, pack, and schedule. Most cells meet weekly for 90 minutes.' },
      { title: 'Book a seat',             body: 'Reserve a place for your child. If a sponsored seat is available, it\'s free. Otherwise, direct enrolment is $480/year.' },
      { title: 'Meet the facilitator',    body: 'Your facilitator will contact you within 24 hours with session details and a parent WhatsApp group link.' },
      { title: 'Track progress weekly',   body: 'Log in to your Parent Dashboard to see session reports, milestones, and facilitator notes.' },
    ],
  },
  {
    id: 'student',
    icon: '🎓',
    title: 'Student',
    desc: 'Join a cell and grow my skills.',
    color: '#4de8b0',
    destination: '/booking',
    destinationLabel: 'Book a Session →',
    benefit: 'You\'ll learn by doing — speaking, building, teaching. Earn FLOW coins that track your real progress.',
    stats: [
      { v: '10',    l: 'Life-skills packs' },
      { v: '5–8',   l: 'Students per cell' },
      { v: '🪙',    l: 'Coin rewards' },
      { v: 'Guider',l: 'Top graduate path' },
    ],
    steps: [
      { title: 'Choose your pack',       body: 'Each cell runs one life-skills pack. Voice & Presence, Kidinomics, Systems Thinking, and more. Pick what speaks to you.' },
      { title: 'Join a cell',            body: 'Five students. One facilitator. Weekly sessions. You\'ll know everyone by name within two weeks.' },
      { title: 'Show up and contribute', body: 'Sessions are not lessons. You will speak, build, create, and teach. The more you give, the more you earn.' },
      { title: 'Graduate and guide',     body: 'Top students from each cohort become Guiders for the next one. Your learning compounds into the system.' },
    ],
  },
  {
    id: 'facilitator',
    icon: '🧭',
    title: 'Facilitator',
    desc: 'Run a cell and earn real income.',
    color: '#b083ff',
    destination: '/facilitator-onboarding',
    destinationLabel: 'Start Training →',
    benefit: 'No teaching degree needed. Earn $800–$1,200 per cell. Run up to 3 cells simultaneously.',
    stats: [
      { v: '$800+', l: 'Per cell / year' },
      { v: '3',     l: 'Max cells at once' },
      { v: '48h',   l: 'Certification time' },
      { v: 'Wallet',l: 'Earnings dashboard' },
    ],
    steps: [
      { title: 'Complete 48-hour certification', body: 'Our certification is fully online. No teaching degree needed. You need curiosity, patience, and a safe space to meet.' },
      { title: 'Get matched to a cell',          body: 'We match you with a community and sponsor based on your location and availability. You don\'t find students — we do.' },
      { title: 'Run weekly sessions',            body: 'Sessions follow the curriculum, but you hold the space. Your job is not to teach — it\'s to create conditions for growth.' },
      { title: 'Earn and advance',               body: 'Facilitators earn $800–$1,200/year per cell. Bonuses are paid based on student outcomes and cell grade.' },
    ],
  },
  {
    id: 'sponsor',
    icon: '💼',
    title: 'Sponsor',
    desc: 'Fund learning cells and track impact.',
    color: '#f0c840',
    destination: '/funding',
    destinationLabel: 'See Funding Options →',
    benefit: 'Every dollar is tracked. Real-time dashboards show exactly what your funding produces — no abstractions.',
    stats: [
      { v: '$200',   l: 'Per cell / month' },
      { v: '6–8',    l: 'Students per cell' },
      { v: '100%',   l: 'Fund transparency' },
      { v: 'Weekly', l: 'Impact reports' },
    ],
    steps: [
      { title: 'Choose a sponsorship tier', body: 'Fund one student ($480), one cell ($2,400), or a regional cluster ($12,000). All tiers include full visibility.' },
      { title: 'Get your dashboard',        body: 'Real-time data on every session your funding supports: attendance, health scores, student milestones, and facilitator notes.' },
      { title: 'Receive monthly reports',   body: 'Automated impact reports delivered to your inbox. Share them with your board, your team, or your family.' },
      { title: 'Renew and expand',          body: 'High-performing cells earn sponsor renewal priority. Watch the system compound over time.' },
    ],
  },
  {
    id: 'connector',
    icon: '🔗',
    title: 'Connector',
    desc: 'Grow the network in my region.',
    color: '#ff9f5a',
    destination: '/connector',
    destinationLabel: 'Connector Portal →',
    benefit: 'Own a region. Build cells. Earn from every cell you activate and every cell that follows.',
    stats: [
      { v: '1',     l: 'Per region' },
      { v: 'Equity',l: 'Network earnings' },
      { v: 'Cell',  l: 'Formation focus' },
      { v: 'Scale', l: 'Compounds over time' },
    ],
    steps: [
      { title: 'Identify your region',         body: 'A connector owns a geographic zone. You are responsible for forming cells, finding sponsors, and placing facilitators.' },
      { title: 'Apply for a connector slot',   body: 'Each region has one connector. Submit an application with your community context and network capacity.' },
      { title: 'Build the cell network',       body: 'Your job is cell formation: find the space, the sponsor, and the facilitator. The platform handles everything else.' },
      { title: 'Earn from the network',        body: 'Connectors earn a percentage of each cell they activate and maintain. As your network grows, your income compounds.' },
    ],
  },
]

const NETWORK_STATS = [
  { icon: '🏫', v: '24', l: 'Active Cells' },
  { icon: '👥', v: '120+', l: 'Students' },
  { icon: '🧭', v: '18', l: 'Facilitators' },
  { icon: '🌍', v: '6', l: 'Countries' },
  { icon: '💛', v: '9', l: 'Sponsors' },
  { icon: '✅', v: '91%', l: 'Completion' },
]

// SVG system diagram showing how 5 roles connect
function SystemDiagram({ onRoleClick, hoveredRole }) {
  const cx = 260, cy = 180, r = 120
  const nodes = [
    { id: 'parent',     icon: '👨‍👩‍👧', label: 'Parent',      angle: -90,  color: '#72d0ff' },
    { id: 'facilitator',icon: '🧭',     label: 'Facilitator', angle: -18,  color: '#b083ff' },
    { id: 'sponsor',    icon: '💼',     label: 'Sponsor',     angle: 54,   color: '#f0c840' },
    { id: 'connector',  icon: '🔗',     label: 'Connector',   angle: 126,  color: '#ff9f5a' },
    { id: 'student',    icon: '🎓',     label: 'Student',     angle: 198,  color: '#4de8b0' },
  ]

  return (
    <svg viewBox="0 0 520 360" style={{ width: '100%', maxWidth: 480, display: 'block', margin: '0 auto' }}>
      {/* Background pulse ring */}
      <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="rgba(212,168,64,0.08)" strokeWidth="28" />
      <circle cx={cx} cy={cy} r={r + 4}  fill="none" stroke="rgba(212,168,64,0.14)" strokeWidth="2" strokeDasharray="6 4" />

      {/* Centre cell */}
      <circle cx={cx} cy={cy} r={42} fill="#152336" stroke="#d4a840" strokeWidth="2" />
      <text x={cx} y={cy - 8}  textAnchor="middle" fontSize="18">🏫</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#d4a840" fontWeight="700" letterSpacing="1">LEARNING</text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" fill="#d4a840" fontWeight="700" letterSpacing="1">CELL</text>

      {/* Spokes + nodes */}
      {nodes.map(n => {
        const rad = (n.angle * Math.PI) / 180
        const nx  = cx + r * Math.cos(rad)
        const ny  = cy + r * Math.sin(rad)
        const isHovered = hoveredRole === n.id
        return (
          <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => onRoleClick(n.id)}>
            {/* spoke */}
            <line
              x1={cx + 44 * Math.cos(rad)} y1={cy + 44 * Math.sin(rad)}
              x2={nx - 24 * Math.cos(rad)} y2={ny - 24 * Math.sin(rad)}
              stroke={isHovered ? n.color : 'rgba(255,255,255,0.12)'}
              strokeWidth={isHovered ? 2 : 1}
              strokeDasharray={isHovered ? 'none' : '4 3'}
            />
            {/* node circle */}
            <circle cx={nx} cy={ny} r={isHovered ? 27 : 24}
              fill={isHovered ? n.color + '33' : '#152336'}
              stroke={n.color}
              strokeWidth={isHovered ? 2.5 : 1.5}
              style={{ transition: 'all 0.2s' }}
            />
            <text x={nx} y={ny + 6} textAnchor="middle" fontSize="16">{n.icon}</text>
            {/* label */}
            <text
              x={nx + (nx < cx - 10 ? -34 : nx > cx + 10 ? 34 : 0)}
              y={ny + (ny < cy - 10 ? -32 : ny > cy + 10 ? 40 : 6)}
              textAnchor={nx < cx - 10 ? 'end' : nx > cx + 10 ? 'start' : 'middle'}
              fontSize="9.5"
              fill={isHovered ? n.color : '#8fa8c4'}
              fontWeight={isHovered ? '700' : '500'}
              style={{ transition: 'fill 0.2s' }}
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Onboarding() {
  usePageMeta('Get Started', 'Find your role in the DOWNFLOW system.')
  const [selectedRole, setSelectedRole] = useState(null)
  const [hoveredRole,  setHoveredRole]  = useState(null)
  const [step, setStep] = useState(0)
  const [tickerIdx, setTickerIdx] = useState(0)

  // Rotate network stats ticker
  useEffect(() => {
    if (selectedRole) return
    const t = setInterval(() => setTickerIdx(i => (i + 1) % NETWORK_STATS.length), 2400)
    return () => clearInterval(t)
  }, [selectedRole])

  const role = ROLES.find(r => r.id === selectedRole)

  function selectRole(id) {
    setSelectedRole(id)
    setStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

      {/* ── LIVE NETWORK TICKER ── */}
      <div className="ob-ticker">
        <span className="ob-ticker-label">Live Network</span>
        {NETWORK_STATS.map((s, i) => (
          <div key={s.l} className={`ob-ticker-item${i === tickerIdx ? ' ob-ticker-active' : ''}`}>
            <span>{s.icon}</span>
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ── ROLE SELECTOR ── */}
      {!selectedRole && (
        <section className="section onboarding-roles-section">

          {/* System diagram + role cards layout */}
          <div className="ob-two-col">

            {/* Left — diagram */}
            <div className="ob-diagram-col">
              <p className="kicker" style={{ marginBottom: '0.75rem' }}>The DOWNFLOW System</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Five roles, one learning cell. Every role connects to the centre.
                Click a role on the diagram — or choose a card below.
              </p>
              <SystemDiagram onRoleClick={selectRole} hoveredRole={hoveredRole} />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                Click any role to begin
              </p>
            </div>

            {/* Right — cards */}
            <div className="ob-cards-col">
              <p className="kicker" style={{ marginBottom: '0.75rem' }}>Choose Your Role</p>
              <div className="onboarding-roles-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    className="onboarding-role-card"
                    style={{ '--role-color': r.color }}
                    onMouseEnter={() => setHoveredRole(r.id)}
                    onMouseLeave={() => setHoveredRole(null)}
                    onClick={() => selectRole(r.id)}
                  >
                    <span className="onboarding-role-icon">{r.icon}</span>
                    <h3 className="onboarding-role-title">{r.title}</h3>
                    <p className="onboarding-role-desc">{r.desc}</p>
                    <span className="onboarding-role-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem' }}>
              Not sure? <Link to="/about" style={{ color: 'var(--gold)' }}>Read about the model first →</Link>
            </p>
          </div>
        </section>
      )}

      {/* ── ROLE PATHWAY ── */}
      {selectedRole && role && (
        <section className="section onboarding-pathway-section">
          <button className="booking-back-btn" onClick={() => setSelectedRole(null)}>← Choose a different role</button>

          {/* Role header */}
          <div className="onboarding-pathway-header" style={{ '--role-color': role.color }}>
            <span className="onboarding-pathway-icon">{role.icon}</span>
            <div>
              <h2 className="onboarding-pathway-title">{role.title} Pathway</h2>
              <p className="onboarding-pathway-sub">{role.benefit}</p>
            </div>
          </div>

          {/* Role stats strip */}
          <div className="ob-role-stats">
            {role.stats.map(s => (
              <div key={s.l} className="ob-role-stat" style={{ '--role-color': role.color }}>
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Step tracker */}
          <div className="onboarding-steps-nav">
            {role.steps.map((s, i) => (
              <button
                key={i}
                className={`onboarding-step-dot${step === i ? ' active' : step > i ? ' done' : ''}`}
                style={{ '--role-color': role.color }}
                onClick={() => setStep(i)}
                title={s.title}
              >
                {step > i ? '✓' : i + 1}
              </button>
            ))}
            <span className="ob-step-connector" />
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

          {/* All steps overview */}
          <div className="onboarding-all-steps">
            {role.steps.map((s, i) => (
              <div
                key={i}
                className={`onboarding-all-step${i <= step ? ' active' : ''}`}
                onClick={() => setStep(i)}
                style={{ '--role-color': role.color }}
              >
                <span
                  className="onboarding-all-step-num"
                  style={{ background: i <= step ? role.color : undefined, color: i <= step ? '#0f1b2d' : undefined }}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                <span className="onboarding-all-step-title">{s.title}</span>
              </div>
            ))}
          </div>

          {/* Other roles teaser */}
          <div className="ob-other-roles">
            <p className="kicker" style={{ marginBottom: '0.75rem' }}>Other Roles</p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {ROLES.filter(r => r.id !== selectedRole).map(r => (
                <button
                  key={r.id}
                  onClick={() => selectRole(r.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.4rem 0.9rem',
                    background: 'var(--bg-card)',
                    border: `1.5px solid ${r.color}33`,
                    borderRadius: '999px',
                    color: r.color,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = r.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = r.color + '33'}
                >
                  {r.icon} {r.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW THE CELL WORKS ── */}
      {!selectedRole && (
        <section className="section" style={{ paddingTop: '1rem' }}>
          <div className="section-header">
            <p className="kicker">The Cell Model</p>
            <h2>How a Learning Cell Works</h2>
            <p className="section-sub">One sponsor. One facilitator. Six students. Twenty-four sessions. One transformation.</p>
          </div>
          <div className="ob-flow-row">
            {[
              { icon: '💛', label: 'Sponsor funds cell', arrow: true },
              { icon: '🧭', label: 'Facilitator is matched', arrow: true },
              { icon: '👥', label: '6–8 students join', arrow: true },
              { icon: '📚', label: '24 live sessions', arrow: true },
              { icon: '🪙', label: 'Students earn coins', arrow: true },
              { icon: '🎓', label: 'Graduate + guide next', arrow: false },
            ].map((item, i) => (
              <div key={i} className="ob-flow-step">
                <div className="ob-flow-icon">{item.icon}</div>
                <p className="ob-flow-label">{item.label}</p>
                {item.arrow && <span className="ob-flow-arrow">→</span>}
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
