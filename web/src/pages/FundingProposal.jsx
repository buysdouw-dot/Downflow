import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   DOWNFLOW — SPONSOR FUNDING PROPOSAL
   Built from 10-slide pitch deck
───────────────────────────────────────────────────────── */

/* Animated counter on scroll into view */
function AnimatedNumber({ target, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1200
        const step = (timestamp) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(step)
          else setValue(target)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>
}

/* Compounding loop SVG */
function CompoundingLoop() {
  const nodes = [
    { label: 'Sponsor',       icon: '💼', angle: 90,  color: '#d2ad44' },
    { label: 'Learning Cell', icon: '🏫', angle: 0,   color: '#4de8b0' },
    { label: 'Outcomes',      icon: '📈', angle: 270, color: '#72d0ff' },
    { label: '9% Rebate\nReinvestment', icon: '🔄', angle: 180, color: '#b083ff' },
  ]
  const cx = 160, cy = 160, r = 100

  return (
    <div className="fp-loop-wrap">
      <svg viewBox="0 0 320 320" className="fp-loop-svg">
        {/* Connecting arcs */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(210,173,68,0.15)" strokeWidth="2" strokeDasharray="6 4"/>
        {/* Directional arrows on circle */}
        {[45, 135, 225, 315].map(a => {
          const rad = (a * Math.PI) / 180
          const x = cx + r * Math.cos(rad)
          const y = cy + r * Math.sin(rad)
          return <circle key={a} cx={x} cy={y} r="3" fill="rgba(210,173,68,0.5)"/>
        })}
        {/* Center */}
        <circle cx={cx} cy={cy} r={28} fill="rgba(210,173,68,0.1)" stroke="rgba(210,173,68,0.4)" strokeWidth="1.5"/>
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="#c8a96e" fontWeight="700" fontFamily="Outfit,sans-serif">Capital</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#c8a96e" fontFamily="Outfit,sans-serif">multiplies</text>
        {/* Nodes */}
        {nodes.map(n => {
          const rad = ((n.angle - 90) * Math.PI) / 180
          const nx = cx + r * Math.cos(rad)
          const ny = cy + r * Math.sin(rad)
          return (
            <g key={n.label} transform={`translate(${nx},${ny})`}>
              <circle r="22" fill={`${n.color}18`} stroke={n.color} strokeWidth="1.5"/>
              <text y="4" textAnchor="middle" fontSize="14">{n.icon}</text>
              <text y="34" textAnchor="middle" fontSize="7.5" fill="#2c3e50" fontWeight="700" fontFamily="Outfit,sans-serif">
                {n.label.split('\n').map((line, i) => (
                  <tspan key={i} x="0" dy={i === 0 ? 0 : 10}>{line}</tspan>
                ))}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="fp-loop-caption">"Capital does not disappear. It multiplies access."</p>
    </div>
  )
}

/* Money flow donut (simplified) */
function MoneyFlowChart() {
  const slices = [
    { label: 'Teacher',              pct: 40, color: '#4de8b0', note: '35–45% transparent earnings' },
    { label: 'Connector',            pct: 20, color: '#72d0ff', note: '~20% + registration fee' },
    { label: 'Students (coin pool)', pct: 6,  color: '#d2ad44', note: '1% each — 6 students' },
    { label: 'Platform & Ops',       pct: 25, color: '#b083ff', note: 'Infrastructure & safety layer' },
    { label: 'Reinvestment',         pct: 9,  color: '#ff9f5a', note: '9% back into new cells' },
  ]

  return (
    <div className="fp-money-chart">
      <div className="fp-money-bars">
        {slices.map(s => (
          <div key={s.label} className="fp-money-bar-row">
            <span className="fp-money-label">{s.label}</span>
            <div className="fp-money-track">
              <div className="fp-money-fill" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
            <span className="fp-money-pct" style={{ color: s.color }}>{s.pct}%</span>
          </div>
        ))}
      </div>
      <div className="fp-money-notes">
        {slices.map(s => (
          <div key={s.label} className="fp-money-note-row">
            <span className="fp-money-dot" style={{ background: s.color }} />
            <span className="fp-money-note-label">{s.label}</span>
            <span className="fp-money-note-text">{s.note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Scaling path visual */
function ScalingPath() {
  const steps = [
    { icon: '👩‍🏫', label: '25 Teachers', sub: 'Trained & certified', color: '#b083ff' },
    { icon: '🏫', label: '100 Learning Cells', sub: 'Active 3-month cycles', color: '#72d0ff' },
    { icon: '🧑‍🎓', label: '600 Students', sub: 'Across all regions', color: '#4de8b0' },
  ]
  return (
    <div className="fp-scaling-path">
      {steps.map((s, i) => (
        <div key={s.label} className="fp-scale-step" style={{ '--scale-color': s.color }}>
          <div className="fp-scale-icon">{s.icon}</div>
          <strong>{s.label}</strong>
          <span>{s.sub}</span>
          {i < steps.length - 1 && <div className="fp-scale-arrow">→</div>}
        </div>
      ))}
    </div>
  )
}

export default function FundingProposal() {
  return (
    <div className="fp-page">

      {/* ── SLIDE 1: HERO ── */}
      <section className="fp-hero">
        <div className="fp-hero-inner">
          <p className="kicker">Sponsor Funding Proposal · DOWNFLOW School of Life</p>
          <h1 className="fp-hero-title">
            Partner With Us to Build<br />
            <span style={{ color: 'var(--gold)' }}>Sponsor-Funded Education Infrastructure.</span>
          </h1>
          <p className="fp-hero-sub">
            Your capital does more than fund classes.<br />
            <strong>It builds a compounding learning network.</strong>
          </p>
          <div className="fp-hero-stats">
            <div className="fp-hero-stat">
              <AnimatedNumber target={6} /><span>Students per Cell</span>
            </div>
            <div className="fp-hero-stat">
              <AnimatedNumber target={24} /><span>Lessons per Cycle</span>
            </div>
            <div className="fp-hero-stat">
              <AnimatedNumber target={3} suffix=" months" /><span>Structured Cycle</span>
            </div>
            <div className="fp-hero-stat">
              <AnimatedNumber target={9} suffix="%" /><span>Rebate Reinvested</span>
            </div>
          </div>
          <div className="fp-hero-cta">
            <a href="#cell-model" className="btn btn-primary">View the Model ↓</a>
            <Link to="/sponsor" className="btn btn-secondary">Open Sponsor Portal</Link>
          </div>
        </div>
      </section>

      {/* ── SLIDE 1: THE LEARNING CELL MODEL ── */}
      <section className="fp-section fp-cell-model" id="cell-model">
        <div className="fp-section-inner">
          <div className="fp-section-head">
            <p className="kicker">Slide 1 · The Foundational Unit</p>
            <h2>The Learning Cell Model</h2>
            <p className="fp-section-sub">Small, stable, sponsor-funded micro-classes.</p>
          </div>
          <div className="fp-cell-visual">
            <div className="fp-cell-hex">
              <span className="fp-cell-hex-icon">🏫</span>
              <strong>1 Learning Cell</strong>
            </div>
            <div className="fp-cell-specs">
              {[
                { n: '6',        label: 'Students',            color: '#4de8b0', icon: '🧑‍🎓' },
                { n: '1',        label: 'Teacher / Facilitator',color: '#72d0ff', icon: '👩‍🏫' },
                { n: '24',       label: 'Lessons',             color: '#d2ad44', icon: '📚' },
                { n: '3-Month',  label: 'Structured Cycle',    color: '#b083ff', icon: '📅' },
              ].map(s => (
                <div key={s.label} className="fp-cell-spec" style={{ '--spec-color': s.color }}>
                  <span className="fp-cell-spec-icon">{s.icon}</span>
                  <strong className="fp-cell-spec-n">{s.n}</strong>
                  <span className="fp-cell-spec-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="fp-cell-why">
            <p className="fp-why-head">Why cells, not classrooms?</p>
            <div className="fp-why-grid">
              {[
                { icon: '🛡️', title: 'No stigma', desc: 'Group sponsorship removes spotlight pressure from individuals.' },
                { icon: '🔗', title: 'Social learning', desc: 'Language develops socially. 6 is the optimal group for peer trust.' },
                { icon: '📦', title: 'Modular funding', desc: 'Each cell is a complete, repeatable economic unit.' },
                { icon: '🔁', title: 'Same economics', desc: 'Every new cell follows identical cost and outcome structure.' },
              ].map(w => (
                <div key={w.title} className="fp-why-card">
                  <span className="fp-why-icon">{w.icon}</span>
                  <strong>{w.title}</strong>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDE: WHERE THE MONEY FLOWS ── */}
      <section className="fp-section fp-money-section">
        <div className="fp-section-inner">
          <div className="fp-section-head">
            <p className="kicker">Slide 9 · Full Financial Transparency</p>
            <h2>Where the Money Flows</h2>
            <p className="fp-section-sub">Breakdown of 100% tuition. No hidden structures. No financial opacity.</p>
          </div>
          <MoneyFlowChart />
          <div className="fp-money-guarantee">
            <span className="fp-guarantee-icon">📌</span>
            <p>All tuition percentages are fixed, published, and visible to every stakeholder. Sponsors can see exactly where their investment goes — before they commit.</p>
          </div>
        </div>
      </section>

      {/* ── SLIDE: COMPOUNDING LOOP ── */}
      <section className="fp-section fp-loop-section">
        <div className="fp-section-inner">
          <div className="fp-two-col">
            <div>
              <div className="fp-section-head" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <p className="kicker">Slide 6 · Self-Reinforcing Growth</p>
                <h2>The Compounding Loop</h2>
                <p className="fp-section-sub">9% of every cycle is reinvested into new cells automatically.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { step: '01', icon: '💼', title: 'Sponsor funds a cell',        desc: 'One cell · 6 students · 24 lessons · 3 months' },
                  { step: '02', icon: '🏫', title: 'Students participate & produce', desc: 'Video reps, sessions, real output — not passive learning' },
                  { step: '03', icon: '📈', title: 'Outcomes are measured',       desc: 'Growth, participation, output quality, succession strength' },
                  { step: '04', icon: '🔄', title: '9% reinvested automatically', desc: 'Creates the next cell — the flywheel never stops' },
                ].map(s => (
                  <div key={s.step} className="fp-loop-step">
                    <div className="fp-loop-step-num">{s.step}</div>
                    <div>
                      <strong className="fp-loop-step-title">{s.icon} {s.title}</strong>
                      <p className="fp-loop-step-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CompoundingLoop />
          </div>
        </div>
      </section>

      {/* ── SLIDE: WHY DIFFERENT ── */}
      <section className="fp-section fp-different-section">
        <div className="fp-section-inner">
          <div className="fp-section-head">
            <p className="kicker">Slide 7 · Competitive Positioning</p>
            <h2>Why This Model Is Different</h2>
            <p className="fp-section-sub">Infrastructure, not a tutoring center.</p>
          </div>
          <div className="fp-compare-grid">
            <div className="fp-compare-col traditional">
              <p className="fp-compare-head">❌ Traditional Education</p>
              {[
                ['Tuition-dependent', 'Revenue fails if enrollment drops'],
                ['Marketing-heavy',   'Constant spend to acquire students'],
                ['Linear growth',     'More students = more overhead'],
              ].map(([t, d]) => (
                <div key={t} className="fp-compare-row">
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              ))}
            </div>
            <div className="fp-compare-divider">
              <span>VS</span>
            </div>
            <div className="fp-compare-col producing">
              <p className="fp-compare-head">✅ Producing Model (DOWNFLOW)</p>
              {[
                ['Sponsor-backed',             'Revenue is pre-secured per cell, per cycle'],
                ['Distribution via Connectors','Zero marketing cost — Connectors find students'],
                ['Compounding expansion',      'Every cell funds the next — exponential by design'],
              ].map(([t, d]) => (
                <div key={t} className="fp-compare-row">
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDE: TEACHER DIGNITY ── */}
      <section className="fp-section fp-teacher-section">
        <div className="fp-section-inner">
          <div className="fp-two-col">
            <div className="fp-section-head" style={{ textAlign: 'left', marginBottom: '0' }}>
              <p className="kicker">Slide 10 · Facilitator Experience</p>
              <h2>What Teachers Experience</h2>
              <p className="fp-section-sub" style={{ marginTop: '0.5rem' }}>Sponsor capital creates teacher dignity.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.5rem' }}>
                {[
                  { icon: '👥', point: 'Structured class size', detail: '6 students maximum — manageable, focused, effective' },
                  { icon: '💰', point: 'Daily or consistent payouts', detail: 'Transparent payment schedule tied to cell milestones' },
                  { icon: '📊', point: '35–45% transparent earnings', detail: 'Teachers know exactly what they earn before they start' },
                  { icon: '🏡', point: 'Long-term stability', detail: 'Sponsor-backed cells remove the enrollment uncertainty' },
                ].map(t => (
                  <div key={t.point} className="fp-teacher-point">
                    <span className="fp-teacher-icon">{t.icon}</span>
                    <div>
                      <strong>{t.point}</strong>
                      <p>{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fp-teacher-quote-block">
              <div className="fp-transparency-metrics">
                <p className="fp-trans-head">Platform Tracks (Slide 2)</p>
                {[
                  { icon: '🏫', label: 'Active Cells',          value: '142',    note: '+28% this cycle',  color: '#4de8b0' },
                  { icon: '🧑‍🎓', label: 'Student Participation',  value: '92%',   note: 'Network average',  color: '#72d0ff' },
                  { icon: '⭐', label: 'Teacher Performance',  value: '4.8/5',  note: 'Verified scores',  color: '#d2ad44' },
                  { icon: '🔄', label: 'Rebate Allocations',   value: '15%',    note: '9% + 6% split',    color: '#b083ff' },
                ].map(m => (
                  <div key={m.label} className="fp-trans-row" style={{ '--trans-color': m.color }}>
                    <span className="fp-trans-icon">{m.icon}</span>
                    <span className="fp-trans-label">{m.label}</span>
                    <span className="fp-trans-value">{m.value}</span>
                    <span className="fp-trans-note">{m.note}</span>
                  </div>
                ))}
                <p className="fp-trans-footer">Sponsors receive structured reporting after every cycle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDE: SCALING POTENTIAL ── */}
      <section className="fp-section fp-scaling-section">
        <div className="fp-section-inner">
          <div className="fp-section-head">
            <p className="kicker">Slide 4 · Growth Model</p>
            <h2>Scaling Potential</h2>
            <p className="fp-section-sub">The model scales predictably. Every new cell follows the same economics. No chaotic growth.</p>
          </div>
          <ScalingPath />
          <div className="fp-scaling-note">
            <p>Example: <strong>25 teachers → 100 Learning Cells → 600 students</strong></p>
            <p>This is not projection. It is arithmetic. Same teacher, same cell, same cost — replicated.</p>
          </div>
        </div>
      </section>

      {/* ── SLIDE: TARGET REGIONS ── */}
      <section className="fp-section fp-regions-section">
        <div className="fp-section-inner">
          <div className="fp-section-head">
            <p className="kicker">Slide 3 · Geographic Rollout</p>
            <h2>Target Regions</h2>
            <p className="fp-section-sub">Structured global rollout. Starting local, scaling with proof.</p>
          </div>
          <div className="fp-regions-grid">
            <div className="fp-region-card active">
              <span className="fp-region-flag">🇻🇳</span>
              <div>
                <strong>Vietnam</strong>
                <span className="fp-region-badge active-badge">● Initial Anchor</span>
                <p>Phase 1 launch · Hanoi & Ho Chi Minh City · 4 cells active · Connector network established</p>
              </div>
            </div>
            {[
              { flag: '🇩🇪', name: 'Germany',        note: 'Institutional credibility · Long-term compounding visibility · Berlin pilot planning' },
              { flag: '🌍', name: 'Eastern Europe',  note: 'Sponsor network expansion · High teacher supply · Russia & Poland pipeline' },
              { flag: '🌐', name: 'MENA Network',    note: 'Sponsor partner conversations active · Arabic-language curriculum adaptation' },
            ].map(r => (
              <div key={r.name} className="fp-region-card pipeline">
                <span className="fp-region-flag">{r.flag}</span>
                <div>
                  <strong>{r.name}</strong>
                  <span className="fp-region-badge pipeline-badge">→ Expansion</span>
                  <p>{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDE: 5-YEAR VISION ── */}
      <section className="fp-section fp-vision-section">
        <div className="fp-section-inner">
          <div className="fp-section-head">
            <p className="kicker">Slide 5 · Long-Term Infrastructure</p>
            <h2>5-Year Vision</h2>
            <p className="fp-section-sub">Not scaling hype. Scaling infrastructure.</p>
          </div>
          <div className="fp-vision-grid">
            {[
              { icon: '🌍', title: 'Multiple countries',          desc: 'Vietnam · Germany · Russia · MENA — all following the same cell model with local facilitators.' },
              { icon: '🏫', title: 'Thousands of learning cells', desc: 'Every cell is self-contained and sponsor-funded. 1,000 cells = 6,000 students = proven system.' },
              { icon: '📊', title: 'Measurable, transparent outcomes', desc: 'Public rankings, live data, full tuition transparency. Every sponsor sees exactly what they funded.' },
              { icon: '🔄', title: 'Self-sustaining network',     desc: 'The 9% reinvestment loop means the system expands without requiring new capital from existing sponsors.' },
            ].map(v => (
              <div key={v.title} className="fp-vision-card">
                <span className="fp-vision-icon">{v.icon}</span>
                <strong>{v.title}</strong>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="fp-vision-quote">
            <p>"Sponsor-backed distributed learning network across multiple countries, thousands of learning cells, with measurable, transparent outcomes."</p>
          </div>
        </div>
      </section>

      {/* ── SLIDE: CTA ── */}
      <section className="fp-cta-section">
        <div className="fp-cta-inner">
          <p className="kicker">Ready to Partner?</p>
          <h2 className="fp-cta-title">
            Partner With Us to Build<br />
            <span style={{ color: 'var(--gold)' }}>Sponsor-Funded Education Infrastructure.</span>
          </h2>
          <p className="fp-cta-sub">
            Your capital does more than fund classes.<br />
            It builds a compounding learning network.
          </p>

          {/* Tier selection */}
          <div className="fp-cta-tiers">
            {[
              { icon: '🌱', tier: 'Learning Cell Partner', cells: 1,  students: 6,   color: '#72d0ff', investment: '24,000,000 VND' },
              { icon: '🌿', tier: 'Growth Partner',         cells: 3,  students: 18,  color: '#d2ad44', investment: '72,000,000 VND', recommended: true },
              { icon: '🌳', tier: 'Impact Partner',         cells: 10, students: 60,  color: '#4de8b0', investment: '240,000,000 VND' },
            ].map(t => (
              <div key={t.tier} className={`fp-cta-tier${t.recommended ? ' recommended' : ''}`} style={{ '--cta-color': t.color }}>
                {t.recommended && <span className="fp-recommended-badge">RECOMMENDED</span>}
                <span className="fp-cta-tier-icon">{t.icon}</span>
                <strong className="fp-cta-tier-name">{t.tier}</strong>
                <div className="fp-cta-tier-stats">
                  <span><strong>{t.cells}</strong> cell{t.cells > 1 ? 's' : ''}</span>
                  <span><strong>{t.students}</strong> students</span>
                </div>
                <p className="fp-cta-tier-investment">{t.investment} / cycle</p>
                <Link to="/sponsor" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
                  Start Here →
                </Link>
              </div>
            ))}
          </div>

          <p className="fp-cta-note">
            No contracts. No lock-in. Cancel after any full cycle.<br />
            Rankings update after every cycle — your impact is visible from day one.
          </p>
        </div>
      </section>

    </div>
  )
}
