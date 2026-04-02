import { useState } from 'react'
import { Link } from 'react-router-dom'

const TIERS = [
  {
    icon: '🌱',
    name: 'Cell Partner',
    cells: 1,
    students: 6,
    cost: '26,000,000 VND',
    usd: '~$1,040 USD',
    color: '#72d0ff',
    perMonth: '~8,667,000 VND',
    rebate: '9%',
    rebateVND: '2,340,000 VND',
    perks: ['Website listing', 'Public leaderboard badge', 'End-of-cycle impact report', 'Cell named after you'],
  },
  {
    icon: '🌿',
    name: 'Growth Partner',
    cells: 3,
    students: 18,
    cost: '78,000,000 VND',
    usd: '~$3,120 USD',
    color: '#d2ad44',
    perMonth: '~26,000,000 VND',
    rebate: '9%',
    rebateVND: '7,020,000 VND',
    perks: ['All Cell Partner perks', 'Regional spotlight feature', 'Video impact reel', 'Priority matching', 'Quarterly review call'],
  },
  {
    icon: '🌳',
    name: 'Impact Partner',
    cells: 10,
    students: 60,
    cost: '260,000,000 VND',
    usd: '~$10,400 USD',
    color: '#4de8b0',
    perMonth: '~86,667,000 VND',
    rebate: '9%',
    rebateVND: '23,400,000 VND',
    perks: ['All Growth Partner perks', 'Named scholarship programme', 'Annual impact summit seat', 'Succession story feature', 'Co-branded content'],
  },
]

const MONEY_ROWS = [
  { icon: '🧭', label: 'Teacher / Facilitator', pct: '40%', vnd: '432,000', note: 'Paid per lesson delivered', color: '#4de8b0' },
  { icon: '🔗', label: 'Connector', pct: '25%', vnd: '270,000', note: '3-tranche stability payout', color: '#d2ad44' },
  { icon: '⚙️', label: 'Platform & Operations', pct: '20%', vnd: '216,000', note: 'Infrastructure & admin', color: '#72d0ff' },
  { icon: '🌍', label: 'Local Learning Reserve', pct: '9%', vnd: '97,200', note: 'Reinvested in your area', color: '#ff9f5a' },
  { icon: '🪙', label: 'Students (6 × 1% each)', pct: '6%', vnd: '64,800', note: 'Non-extractable coin credit', color: '#b083ff' },
]

const ADVANTAGES = [
  { icon: '📊', title: 'Capital Creates Measurable Impact', desc: 'Every VND you commit funds a named, trackable Learning Cell. You see exactly what your money produces — lessons delivered, students active, outputs created.' },
  { icon: '🔄', title: '9% Institutional Reinvestment Loop', desc: 'Your 9% rebate doesn\'t disappear. It seeds new cells in the same region — compounding your reach without additional cost.' },
  { icon: '🔍', title: 'Transparent Reporting', desc: 'Real-time dashboard access. See lesson attendance, content produced, facilitator performance, and community impact — all in one place.' },
  { icon: '🌐', title: 'Cross-Border Education Footprint', desc: 'One sponsorship covers Vietnam, Russia, Germany, or wherever your cell is placed. Your brand becomes global education infrastructure.' },
  { icon: '📈', title: 'Long-Term Compounding Visibility', desc: 'Students who complete the programme become community voices. Your sponsorship story grows with them — not just for one cycle.' },
]

const PROBLEMS = [
  'Teachers are underpaid and undervalued in most markets',
  'Students lack structured small-group attention',
  'Institutions lack scalable, replicable funding models',
  'Capital rarely compounds inside education — it disappears',
]

export default function Funding() {
  const [activeTier, setActiveTier] = useState(1)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="fund-page">

      {/* ── HERO ── */}
      <section className="fund-hero">
        <div className="fund-hero-img-wrap">
          <img src="/sponsor/slide-hero.jpg" alt="Sponsor-Funded Education Infrastructure" className="fund-hero-img" />
          <div className="fund-hero-overlay" />
        </div>
        <div className="fund-hero-content">
          <p className="kicker" style={{ color: '#d2ad44', letterSpacing: '0.12em' }}>DOWNFLOW — SCHOOL OF LIFE</p>
          <h1 className="fund-hero-title">Sponsor-Funded<br/>Education Infrastructure</h1>
          <p className="fund-hero-sub">Capital Into Classrooms. Compounding Impact.</p>
          <div className="fund-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setContactOpen(true)}>Become a Sponsor →</button>
            <Link to="/payments" className="btn btn-secondary btn-lg">View Payment Model</Link>
          </div>
          <div className="fund-hero-stats">
            {[
              ['26,000,000 VND', 'Per cell / cycle'],
              ['6 students', 'Per learning cell'],
              ['24 lessons', 'Over 3 months'],
              ['9%', 'Reinvestment rebate'],
            ].map(([v, l]) => (
              <div key={l} className="fund-hero-stat">
                <strong>{v}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="fund-section fund-section-alt">
        <div className="fund-inner fund-two-col">
          <div className="fund-slide-wrap">
            <img src="/sponsor/slide-problem.png" alt="Education is fragmented and underfunded" className="fund-slide-img" />
          </div>
          <div className="fund-text-col">
            <p className="fund-section-kicker">THE PROBLEM</p>
            <h2 className="fund-section-title">Education Is Fragmented<br/>and Underfunded</h2>
            <p className="fund-section-lead">Education needs infrastructure — not donations.</p>
            <div className="fund-problem-list">
              {PROBLEMS.map(p => (
                <div key={p} className="fund-problem-item">
                  <span className="fund-problem-dot" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <div className="fund-callout">
              The system isn't broken because people don't care.<br/>
              It's broken because the <strong>funding model doesn't compound</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* ── THE LEARNING CELL ── */}
      <section className="fund-section">
        <div className="fund-inner fund-two-col fund-two-col-reverse">
          <div className="fund-text-col">
            <p className="fund-section-kicker">THE UNIT</p>
            <h2 className="fund-section-title">The Learning Cell</h2>
            <p className="fund-section-lead">The smallest fundable unit of structured education.</p>
            <div className="fund-cell-stats">
              {[
                { val: '180,000 VND', label: 'Per student · per lesson', color: '#4de8b0' },
                { val: '1,080,000 VND', label: '6 students = per class', color: '#d2ad44' },
                { val: '24 classes', label: 'Over 3 months', color: '#72d0ff' },
                { val: '26,000,000 VND', label: 'Total programme value per cell', color: '#b083ff' },
              ].map(s => (
                <div key={s.label} className="fund-cell-stat" style={{ borderColor: s.color + '44' }}>
                  <strong style={{ color: s.color }}>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="fund-badge-row">
              <span className="fund-badge">Transparent</span>
              <span className="fund-badge">Predictable</span>
              <span className="fund-badge">Trackable</span>
            </div>
          </div>
          <div className="fund-slide-wrap">
            <img src="/sponsor/slide-learning-cell.png" alt="The Learning Cell" className="fund-slide-img" />
          </div>
        </div>
      </section>

      {/* ── WHAT STUDENTS SEE ── */}
      <section className="fund-section fund-section-dark">
        <div className="fund-inner">
          <div className="fund-center-header">
            <p className="fund-section-kicker" style={{ color: '#d2ad44' }}>STUDENT EXPERIENCE</p>
            <h2 className="fund-section-title" style={{ color: '#fff' }}>What Students See</h2>
            <p className="fund-section-lead" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Sponsors fund stability, not randomness.
            </p>
          </div>
          <div className="fund-students-wrap">
            <div className="fund-slide-wrap fund-slide-lg">
              <img src="/sponsor/slide-students.png" alt="What Students See" className="fund-slide-img" />
            </div>
            <div className="fund-students-list">
              {[
                { icon: '👥', title: 'Small-group focus', desc: '6 students per cell — every student is seen, heard, and engaged every session.' },
                { icon: '📅', title: 'Stable 3-month structure', desc: 'No random lessons. A full cycle: 24 lessons, consistent facilitator, consistent peers.' },
                { icon: '🪙', title: 'Incentivised engagement', desc: 'Students earn coins for attendance, output, and peer support. Real value, no pressure.' },
                { icon: '🌍', title: 'Community-based learning', desc: 'Learning happens where students live. The cell is their neighbourhood, their world.' },
              ].map(item => (
                <div key={item.title} className="fund-student-item">
                  <span className="fund-student-icon">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE REBATE ENGINE ── */}
      <section className="fund-section fund-section-alt">
        <div className="fund-inner fund-two-col">
          <div className="fund-slide-wrap">
            <img src="/sponsor/slide-rebate-engine.png" alt="The 15% Rebate Engine" className="fund-slide-img" />
          </div>
          <div className="fund-text-col">
            <p className="fund-section-kicker">THE MECHANISM</p>
            <h2 className="fund-section-title">The Reinvestment Engine</h2>
            <p className="fund-section-lead">This is not a cost. It is a reinvestment mechanism.</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              15% of every sponsorship is ring-fenced and redirected — automatically, without approval — back into the ecosystem that your money created.
            </p>
            <div className="fund-rebate-pills">
              <div className="fund-rebate-pill" style={{ background: '#d2ad4422', borderColor: '#d2ad44' }}>
                <strong style={{ color: '#d2ad44', fontSize: '1.5rem' }}>9%</strong>
                <span>Sponsoring Institution</span>
                <p>Seeds new learning cells in the same region. Your capital compounds access.</p>
              </div>
              <div className="fund-rebate-pill" style={{ background: '#b083ff22', borderColor: '#b083ff' }}>
                <strong style={{ color: '#b083ff', fontSize: '1.5rem' }}>6%</strong>
                <span>Students</span>
                <p>1% per student credited as learning coins. Non-extractable. Participation-driven.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHERE MONEY FLOWS ── */}
      <section className="fund-section">
        <div className="fund-inner">
          <div className="fund-center-header">
            <p className="fund-section-kicker">FINANCIAL TRANSPARENCY</p>
            <h2 className="fund-section-title">Where the Money Flows</h2>
            <p className="fund-section-lead">No hidden structures. No financial opacity.</p>
          </div>
          <div className="fund-money-wrap">
            <div className="fund-slide-wrap fund-slide-md">
              <img src="/sponsor/slide-money-flow.png" alt="Where the Money Flows" className="fund-slide-img" />
            </div>
            <div className="fund-money-table">
              <div className="fund-money-header">
                <span>Recipient</span><span>Split</span><span>Per Lesson</span><span>Notes</span>
              </div>
              {MONEY_ROWS.map(row => (
                <div key={row.label} className="fund-money-row" style={{ borderLeftColor: row.color }}>
                  <span className="fund-money-label">
                    <span style={{ marginRight: '0.5rem' }}>{row.icon}</span>
                    <strong style={{ color: 'var(--navy)' }}>{row.label}</strong>
                  </span>
                  <span className="fund-money-pct" style={{ color: row.color }}>{row.pct}</span>
                  <span className="fund-money-vnd" style={{ color: row.color }}>{row.vnd} VND</span>
                  <span className="fund-money-note">{row.note}</span>
                </div>
              ))}
              <div className="fund-money-total">
                <span>TOTAL PER LESSON</span>
                <span>100%</span>
                <span>1,080,000 VND</span>
                <span>6 students × 180,000 VND</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/payment-engine" className="btn btn-secondary">
              Full Payment Engine (SQL · Wallets · Logic) →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SPONSOR ADVANTAGES ── */}
      <section className="fund-section fund-section-dark">
        <div className="fund-inner">
          <div className="fund-center-header">
            <p className="fund-section-kicker" style={{ color: '#d2ad44' }}>WHY SPONSORS CHOOSE DOWNFLOW</p>
            <h2 className="fund-section-title" style={{ color: '#fff' }}>Sponsor Advantages</h2>
          </div>
          <div className="fund-advantages-wrap">
            <div className="fund-slide-wrap fund-slide-md" style={{ marginBottom: '2rem' }}>
              <img src="/sponsor/slide-advantages.png" alt="Sponsor Advantages" className="fund-slide-img" />
            </div>
            <div className="fund-advantages-grid">
              {ADVANTAGES.map(a => (
                <div key={a.title} className="fund-advantage-card">
                  <span className="fund-advantage-icon">{a.icon}</span>
                  <div>
                    <strong>{a.title}</strong>
                    <p>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE COMPOUNDING LOOP ── */}
      <section className="fund-section fund-section-alt">
        <div className="fund-inner fund-two-col">
          <div className="fund-slide-wrap">
            <img src="/sponsor/slide-compounding.png" alt="The Compounding Loop" className="fund-slide-img" />
          </div>
          <div className="fund-text-col">
            <p className="fund-section-kicker">THE LOOP</p>
            <h2 className="fund-section-title">Capital Does Not Disappear.<br/>It Multiplies Access.</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Most educational donations are linear — money in, outcome out, relationship ends.
              DOWNFLOW is circular. Every cell you fund generates outputs that seed the next cell.
            </p>
            <div className="fund-loop-steps">
              {[
                { step: '01', label: 'Sponsor funds a cell', color: '#4de8b0' },
                { step: '02', label: 'Learning Cell delivers 24 lessons', color: '#72d0ff' },
                { step: '03', label: 'Outcomes produced — content, coins, community', color: '#b083ff' },
                { step: '04', label: '9% rebate seeds the next cell in the region', color: '#d2ad44' },
                { step: '05', label: 'Sponsor visibility compounds with each new cell', color: '#ff9f5a' },
              ].map(s => (
                <div key={s.step} className="fund-loop-step">
                  <span className="fund-loop-num" style={{ background: s.color + '22', color: s.color, borderColor: s.color + '55' }}>{s.step}</span>
                  <span className="fund-loop-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPONSORSHIP TIERS ── */}
      <section className="fund-section" id="tiers">
        <div className="fund-inner">
          <div className="fund-center-header">
            <p className="fund-section-kicker">COMMITMENT LEVELS</p>
            <h2 className="fund-section-title">Choose Your Tier</h2>
            <p className="fund-section-lead">Every tier gets the same 9% reinvestment rebate. Recognition scales with commitment.</p>
          </div>

          <div className="fund-tier-toggle">
            {TIERS.map((t, i) => (
              <button key={t.name} className={`fund-tier-btn${activeTier === i ? ' active' : ''}`} style={activeTier === i ? { background: t.color + '22', borderColor: t.color, color: t.color } : {}} onClick={() => setActiveTier(i)}>
                {t.icon} {t.name}
              </button>
            ))}
          </div>

          <div className="fund-tier-detail" style={{ borderColor: TIERS[activeTier].color + '44', borderTopColor: TIERS[activeTier].color }}>
            <div className="fund-tier-detail-top">
              <div>
                <h3 className="fund-tier-name">{TIERS[activeTier].icon} {TIERS[activeTier].name}</h3>
                <p className="fund-tier-meta">{TIERS[activeTier].cells} cell{TIERS[activeTier].cells > 1 ? 's' : ''} · {TIERS[activeTier].students} students · 3 months</p>
              </div>
              <div className="fund-tier-price-block" style={{ borderColor: TIERS[activeTier].color + '55', background: TIERS[activeTier].color + '11' }}>
                <strong style={{ color: TIERS[activeTier].color }}>{TIERS[activeTier].cost}</strong>
                <span>{TIERS[activeTier].usd} per cycle</span>
                <span className="fund-tier-monthly">{TIERS[activeTier].perMonth} / month</span>
              </div>
            </div>

            <div className="fund-tier-detail-body">
              <div className="fund-tier-rebate-box" style={{ background: TIERS[activeTier].color + '11', borderColor: TIERS[activeTier].color + '44' }}>
                <strong style={{ color: TIERS[activeTier].color }}>🔄 Your 9% Reinvestment Rebate</strong>
                <p>{TIERS[activeTier].rebateVND} reinvested per cycle — seeds {TIERS[activeTier].cells} new cell{TIERS[activeTier].cells > 1 ? 's' : ''} in your chosen region</p>
              </div>
              <div className="fund-tier-perks">
                <p className="fund-tier-perks-label">WHAT YOU GET</p>
                {TIERS[activeTier].perks.map(perk => (
                  <div key={perk} className="fund-tier-perk-row">
                    <span style={{ color: TIERS[activeTier].color }}>✓</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary fund-tier-cta" onClick={() => setContactOpen(true)}>
              Start as {TIERS[activeTier].name} →
            </button>
          </div>
        </div>
      </section>

      {/* ── POLICY LINE ── */}
      <section className="fund-section fund-section-dark fund-policy">
        <div className="fund-inner">
          <blockquote className="fund-policy-quote">
            "A portion of sponsor funding is reserved locally to remove practical barriers to learning
            and to grow sustainable learning capacity in the communities where students live."
          </blockquote>
          <p className="fund-policy-label">— DOWNFLOW Local Learning Reserve Policy</p>
          <div className="fund-policy-links">
            <Link to="/payments" className="btn btn-secondary">Payment Model</Link>
            <Link to="/payment-engine" className="btn btn-secondary">Technical Spec</Link>
            <Link to="/sponsor" className="btn btn-secondary">Sponsor Dashboard</Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT MODAL ── */}
      {contactOpen && (
        <div className="fund-modal-overlay" onClick={() => setContactOpen(false)}>
          <div className="fund-modal" onClick={e => e.stopPropagation()}>
            <button className="fund-modal-close" onClick={() => setContactOpen(false)}>✕</button>
            <h2 className="fund-modal-title">Start Your Sponsorship</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', marginBottom: '1.5rem' }}>
              Tell us which tier and region you're interested in — we'll follow up within 48 hours.
            </p>
            <div className="fund-modal-form">
              <div className="fund-form-row">
                <div className="fund-form-group">
                  <label>Organisation Name</label>
                  <input type="text" placeholder="e.g. TechCorp Vietnam" />
                </div>
                <div className="fund-form-group">
                  <label>Contact Name</label>
                  <input type="text" placeholder="Your full name" />
                </div>
              </div>
              <div className="fund-form-row">
                <div className="fund-form-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@company.com" />
                </div>
                <div className="fund-form-group">
                  <label>Preferred Tier</label>
                  <select>
                    <option>Cell Partner (1 cell)</option>
                    <option>Growth Partner (3 cells)</option>
                    <option>Impact Partner (10 cells)</option>
                  </select>
                </div>
              </div>
              <div className="fund-form-group">
                <label>Preferred Region</label>
                <select>
                  <option>🇻🇳 Vietnam</option>
                  <option>🇷🇺 Russia</option>
                  <option>🇩🇪 Germany</option>
                  <option>🌍 Open (any region)</option>
                </select>
              </div>
              <div className="fund-form-group">
                <label>Message (optional)</label>
                <textarea rows={3} placeholder="Any specific communities, regions, or requirements?" />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.9rem' }}>
                Submit Enquiry →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
