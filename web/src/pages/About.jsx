import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const VALUES = [
  { icon: '🌱', title: 'Start With the Learner',  desc: 'Before any subject is introduced, the student must feel seen. We build identity before we build skills.' },
  { icon: '🔁', title: 'Producing, Not Consuming', desc: 'Students create, teach, and share. Learning is validated by what it produces — not what it memorises.' },
  { icon: '🏘️', title: 'Local Before Global',      desc: 'Each cell is rooted in a community. The curriculum is global but the relationships are local and real.' },
  { icon: '💰', title: 'Value Must Flow',           desc: 'Facilitators earn fairly. Students are rewarded for contribution. Sponsors see exactly where their money goes.' },
  { icon: '📊', title: 'Radical Transparency',      desc: 'Every session is logged. Every cell is graded. Every parent gets a report. Nothing is hidden.' },
  { icon: '♻️', title: 'Succession by Design',      desc: 'The best students become guiders. The best guiders become facilitators. The system compounds.' },
]

const TIMELINE = [
  {
    year: '2021',
    label: 'The Idea',
    color: '#5b9bd5',
    event: 'Model conceived in Southeast Asia after years observing what formal schooling fails to do.',
    detail: 'After 8 years inside traditional education systems across Vietnam, Russia, and Germany — the pattern was unmistakable. Compliance was the product. Development was not.',
  },
  {
    year: '2022',
    label: 'First Cell',
    color: '#00c896',
    event: 'First pilot cell launched in Hanoi. 5 students. 1 facilitator. 1 curriculum pack. 100% completion.',
    detail: 'The Voice & Presence pack ran for 12 weeks. Every student completed all sessions and submitted outputs. The model worked on first attempt.',
  },
  {
    year: '2023',
    label: 'The Blueprint',
    color: '#a259ff',
    event: 'Model documented. Facilitator training curriculum built. First external cells activated.',
    detail: 'The cell operating system was written and tested with 3 external facilitators across 2 countries. Facilitator quality protocols were established.',
  },
  {
    year: '2024',
    label: 'Expansion',
    color: '#ffd740',
    event: 'Platform development begins. Sponsor model designed. First regional expansion into Malaysia and Philippines.',
    detail: 'The economics were solved: $2,400 per cell funds 5 students for one year. 60% to facilitator, 30% to platform, 10% to curriculum development.',
  },
  {
    year: '2025',
    label: 'Platform Live',
    color: '#ff9f5a',
    event: 'Platform launches. Growth system, parent dashboards, and facilitator earnings go live.',
    detail: 'Full transparency stack built: parents see every session output, sponsors see every cell grade, facilitators track earnings in real time.',
  },
  {
    year: '2026',
    label: 'Infrastructure',
    color: '#ff6b8a',
    event: '24 active cells across 6 countries. First cohort of student guiders graduate. Funding round open.',
    detail: 'The succession model proves itself: 4 students from the 2022 Hanoi pilot are now co-facilitating cells of their own.',
  },
]

const TEAM = [
  {
    initials: 'MA',
    name: 'The Model Architect',
    role: 'Founder',
    color: '#5b9bd5',
    desc: 'Spent a decade inside traditional education systems, documenting what failed. Built the inversion model after 8 years of field research across SE Asia.',
    tags: ['Curriculum Design', 'Cell Operations', 'Model Theory'],
  },
  {
    initials: 'CL',
    name: 'The Curriculum Lead',
    role: 'Head of Learning',
    color: '#00c896',
    desc: 'Developed all 10 curriculum packs. Former child-development researcher turned session designer. Expert in confidence-first pedagogical sequencing.',
    tags: ['10 Packs', 'Progression Framework', 'Output Design'],
  },
  {
    initials: 'CO',
    name: 'The Connector',
    role: 'Head of Growth',
    color: '#a259ff',
    desc: 'Builds and maintains the facilitator network. Runs the community intelligence layer. Responsible for all 24 active cells finding their facilitators.',
    tags: ['Network Growth', 'Facilitator Pipeline', 'Regional Expansion'],
  },
  {
    initials: 'PT',
    name: 'The Platform',
    role: 'Head of Technology',
    color: '#ffd740',
    desc: 'Built the parent dashboards, earnings engine, cell grading system, and full transparency stack. Keeps the financial model honest and automated.',
    tags: ['Dashboard', 'Payments', 'Transparency Stack'],
  },
]

const STATS = [
  { val: '24',   label: 'Active Cells',         sub: 'Across 6 countries',    icon: '🏫' },
  { val: '120',  label: 'Students Enrolled',    sub: '2025–2026 cohort',       icon: '🧑‍🎓' },
  { val: '18',   label: 'Facilitators',         sub: '6 countries, 1 network', icon: '🧭' },
  { val: '91%',  label: 'Cell Completion Rate', sub: 'Sessions run as scheduled',icon: '✅' },
  { val: '$2.4k',label: 'Cost Per Cell / Year', sub: 'Full year, 5 students',  icon: '💰' },
  { val: '100%', label: 'Output Transparency',  sub: 'Every session logged',   icon: '📊' },
]

const PRINCIPLES = [
  { num: '01', title: 'Inversion First',    body: 'Every other education reform starts with the curriculum and asks how to improve delivery. We start with the learner and ask what they need to produce.' },
  { num: '02', title: 'Small is the Model', body: 'Cells of exactly 5 students. Not 20. Not 30. 5. The number is not a constraint — it is the mechanism. Everyone is seen. No one hides.' },
  { num: '03', title: 'Succession is the Proof', body: 'The real output of DOWNFLOW is not a confident student. It is a student who makes the next student confident. The succession loop is how we know it worked.' },
  { num: '04', title: 'Economics Must Serve the Mission', body: 'Facilitators earn fair wages. Students pay nothing (when sponsored). Sponsors get complete transparency. If the economics are wrong, the mission fails. So we fixed the economics first.' },
]

export default function About() {
  usePageMeta('About DOWNFLOW', 'Our mission, model, and the story behind the inverted education system.')
  const [activeYear, setActiveYear] = useState(0)
  const [activeTeam, setActiveTeam] = useState(null)

  return (
    <div className="about-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="kicker">Our Mission · The Model · Why We Exist</p>
          <h1 className="about-hero-title">
            Education was designed<br />
            <span className="about-hero-gold">to produce compliance.</span>
          </h1>
          <p className="about-hero-sub">
            We built DOWNFLOW to produce something else entirely:<br />
            <strong>confident, capable, contributing human beings.</strong>
          </p>
          <div className="about-hero-btns">
            <Link to="/funding"  className="btn btn-gold">Sponsor a Cell →</Link>
            <Link to="/onboarding" className="btn btn-secondary">Find Your Role</Link>
          </div>
        </div>
        <div className="about-hero-scroll-hint">↓</div>
      </section>

      {/* ══ IMPACT STATS ══════════════════════════════════════ */}
      <section className="about-stats-strip">
        {STATS.map(s => (
          <div key={s.label} className="about-stat-item">
            <span className="about-stat-icon">{s.icon}</span>
            <div className="about-stat-val">{s.val}</div>
            <div className="about-stat-label">{s.label}</div>
            <div className="about-stat-sub">{s.sub}</div>
          </div>
        ))}
      </section>

      {/* ══ MANIFESTO ═════════════════════════════════════════ */}
      <section className="section about-manifesto-section">
        <div className="about-manifesto-inner">
          <div className="about-manifesto-block">
            <p className="kicker">The Problem We Are Solving</p>
            <h2 className="about-manifesto-title">Built for an economy<br />that no longer exists.</h2>
            <p>Traditional education systems were not designed to unlock potential. They were designed to sort, standardise, and credential — at scale, for an industrial economy that no longer exists.</p>
            <p>The result: students who know how to pass tests but cannot speak confidently, think systemically, or create value for others. Learners who have been educated but not developed.</p>
            <p>We are not reforming this system. We are building <strong className="about-gold">an alternative infrastructure</strong> — small, local, and accountable — that starts where school should have started: with the learner.</p>
            <div className="about-manifesto-links">
              <Link to="/curriculum" className="about-text-link">See the curriculum packs →</Link>
              <Link to="/pricing" className="about-text-link">See how it's funded →</Link>
            </div>
          </div>
          <div className="about-manifesto-quote-block">
            <blockquote className="about-big-quote">
              "The system doesn't fail because children aren't capable.<br />
              It fails because <em>value doesn't flow.</em>"
            </blockquote>
            <cite className="about-big-cite">— The DOWNFLOW Model, 2022</cite>
            <div className="about-mq-divider" />
            <div className="about-mq-footnote">
              Written after observing 400+ students across Vietnam, Russia, and Germany over 8 years.
            </div>
          </div>
        </div>
      </section>

      {/* ══ INVERSION COMPARISON ══════════════════════════════ */}
      <section className="section about-inversion-section">
        <div className="section-header">
          <p className="kicker">The Core Idea</p>
          <h2>The Inverted Education Model</h2>
          <p className="section-sub">Every other education reform starts with the curriculum. We start with the learner.</p>
        </div>
        <div className="about-compare-grid">
          <div className="about-compare-panel traditional">
            <div className="about-cp-header">
              <h3>Traditional Model</h3>
              <span className="about-cp-tag red">Compliance-first</span>
            </div>
            <p className="about-compare-sub">Starts outside, works inward</p>
            {[
              'Curriculum first → student adapts',
              'Knowledge is consumed, not produced',
              'Assessment = grades and compliance',
              'Teacher holds all authority',
              'Success = passing standardised tests',
              'Exits: credentials without capability',
            ].map(item => (
              <div key={item} className="about-compare-row red">
                <span className="about-compare-x">✕</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="about-compare-centre">
            <div className="about-compare-arrow">⇄</div>
            <div className="about-compare-vs">vs</div>
          </div>

          <div className="about-compare-panel producing">
            <div className="about-cp-header">
              <h3>DOWNFLOW Model</h3>
              <span className="about-cp-tag green">Learner-first</span>
            </div>
            <p className="about-compare-sub">Starts inside, builds outward</p>
            {[
              'Learner first → curriculum adapts',
              'Knowledge is created and shared',
              'Assessment = what you produce for others',
              'Facilitator holds space, not authority',
              'Success = confidence + contribution',
              'Exits: capable contributors who teach the next cohort',
            ].map(item => (
              <div key={item} className="about-compare-row green">
                <span className="about-compare-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4 PRINCIPLES ══════════════════════════════════════ */}
      <section className="section about-principles-section">
        <div className="section-header">
          <p className="kicker">The Foundation</p>
          <h2>Four Principles That Cannot Be Compromised</h2>
        </div>
        <div className="about-principles-grid">
          {PRINCIPLES.map(p => (
            <div key={p.num} className="about-principle-card">
              <div className="about-pc-num">{p.num}</div>
              <h3 className="about-pc-title">{p.title}</h3>
              <p className="about-pc-body">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ VALUES ════════════════════════════════════════════ */}
      <section className="section about-values-section">
        <div className="section-header">
          <p className="kicker">What We Stand For</p>
          <h2>Six Principles We Won't Compromise</h2>
        </div>
        <div className="about-values-grid">
          {VALUES.map(v => (
            <div key={v.title} className="about-value-card">
              <span className="about-value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TIMELINE ══════════════════════════════════════════ */}
      <section className="section about-timeline-section">
        <div className="section-header">
          <p className="kicker">Our Story</p>
          <h2>From Idea to Infrastructure</h2>
          <p className="section-sub">Six years. Zero outside funding. Built from field research.</p>
        </div>

        {/* Year selector tabs */}
        <div className="about-tl-tabs">
          {TIMELINE.map((t, i) => (
            <button
              key={t.year}
              className={`about-tl-tab${activeYear === i ? ' active' : ''}`}
              style={activeYear === i ? { borderColor: t.color, color: t.color } : {}}
              onClick={() => setActiveYear(i)}
            >
              <span className="about-tl-tab-year">{t.year}</span>
              <span className="about-tl-tab-label">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Active year card */}
        <div className="about-tl-card" style={{ borderColor: TIMELINE[activeYear].color + '40' }}>
          <div className="about-tl-card-top" style={{ borderLeftColor: TIMELINE[activeYear].color }}>
            <div>
              <div className="about-tl-card-year" style={{ color: TIMELINE[activeYear].color }}>
                {TIMELINE[activeYear].year}
              </div>
              <div className="about-tl-card-label">{TIMELINE[activeYear].label}</div>
            </div>
          </div>
          <p className="about-tl-card-event">{TIMELINE[activeYear].event}</p>
          <p className="about-tl-card-detail">{TIMELINE[activeYear].detail}</p>
          <div className="about-tl-nav">
            <button className="about-tl-nav-btn" onClick={() => setActiveYear(i => Math.max(0, i - 1))} disabled={activeYear === 0}>← Previous</button>
            <div className="about-tl-dots">
              {TIMELINE.map((_, i) => (
                <span key={i} className={`about-tl-dot${activeYear === i ? ' active' : ''}`}
                  style={activeYear === i ? { background: TIMELINE[i].color } : {}}
                  onClick={() => setActiveYear(i)} />
              ))}
            </div>
            <button className="about-tl-nav-btn" onClick={() => setActiveYear(i => Math.min(TIMELINE.length - 1, i + 1))} disabled={activeYear === TIMELINE.length - 1}>Next →</button>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════ */}
      <section className="section about-team-section">
        <div className="section-header">
          <p className="kicker">The People</p>
          <h2>Who Runs DOWNFLOW</h2>
          <p className="section-sub">We don't use names here. The model speaks louder than the people behind it.</p>
        </div>
        <div className="about-team-grid">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`about-team-card${activeTeam === i ? ' flipped' : ''}`}
              style={{ '--tc': m.color }}
              onClick={() => setActiveTeam(activeTeam === i ? null : i)}
            >
              <div className="about-team-front">
                <div className="about-team-avatar" style={{ background: m.color + '22', color: m.color, border: `2px solid ${m.color}40` }}>
                  {m.initials}
                </div>
                <h3 className="about-team-name">{m.name}</h3>
                <span className="about-team-role" style={{ color: m.color }}>{m.role}</span>
                <p className="about-team-desc">{m.desc}</p>
                <div className="about-team-tags">
                  {m.tags.map(tag => (
                    <span key={tag} className="about-team-tag" style={{ borderColor: m.color + '40', color: m.color }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="section about-cta-section">
        <div className="about-cta-inner">
          <p className="kicker">Ready to Join?</p>
          <h2>Be Part of the System</h2>
          <p>Whether you fund a cell, facilitate one, or enrol a child — every role matters. The model only works when all parts flow.</p>
          <div className="about-cta-buttons">
            <Link to="/activate"   className="btn btn-gold">Activate a Cell →</Link>
            <Link to="/funding"    className="btn btn-primary">Sponsor a Cell</Link>
            <Link to="/onboarding" className="btn btn-secondary">Find Your Role</Link>
          </div>
          <div className="about-cta-meta">
            <Link to="/pricing"    className="about-text-link">See full pricing →</Link>
            <span>·</span>
            <Link to="/curriculum" className="about-text-link">View curriculum →</Link>
            <span>·</span>
            <Link to="/support"    className="about-text-link">Ask a question →</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
