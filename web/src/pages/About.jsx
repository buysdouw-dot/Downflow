import React from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const VALUES = [
  { icon: '🌱', title: 'Start With the Learner', desc: 'Before any subject is introduced, the student must feel seen. We build identity before we build skills.' },
  { icon: '🔁', title: 'Producing, Not Consuming', desc: 'Students create, teach, and share. Learning is validated by what it produces — not what it memorises.' },
  { icon: '🏘️', title: 'Local Before Global', desc: 'Each cell is rooted in a community. The curriculum is global but the relationships are local and real.' },
  { icon: '💰', title: 'Value Must Flow', desc: 'Facilitators earn fairly. Students are rewarded for contribution. Sponsors see exactly where their money goes.' },
  { icon: '📊', title: 'Radical Transparency', desc: 'Every session is logged. Every cell is graded. Every parent gets a report. Nothing is hidden.' },
  { icon: '♻️', title: 'Succession by Design', desc: 'The best students become guiders. The best guiders become facilitators. The system is designed to compound.' },
]

const TIMELINE = [
  { year: '2021', event: 'Model conceived in Southeast Asia after years observing what formal schooling fails to do.' },
  { year: '2022', event: 'First pilot cell launched in Hanoi. 5 students. 1 facilitator. 1 curriculum pack. 100% completion.' },
  { year: '2023', event: 'Model documented. Facilitator training curriculum built. First external cells activated.' },
  { year: '2024', event: 'Platform development begins. Sponsor model designed. First regional expansion into Malaysia and Philippines.' },
  { year: '2025', event: 'Platform launches. Growth system, parent dashboards, and facilitator earnings go live.' },
  { year: '2026', event: '24 active cells across 6 countries. First cohort of student guiders graduate. Funding round open.' },
]

const TEAM = [
  { name: 'The Model Architect', role: 'Founder', desc: 'Spent a decade inside traditional education systems, documenting what failed. Built the inversion.' },
  { name: 'The Curriculum Lead', role: 'Head of Learning', desc: 'Developed all 10 curriculum packs. Former child-development researcher turned session designer.' },
  { name: 'The Connector', role: 'Head of Growth', desc: 'Builds and maintains the facilitator network. Runs the community intelligence layer.' },
  { name: 'The Platform', role: 'Head of Technology', desc: 'Keeps the system transparent. Built the parent dashboards, earnings engine, and cell grading system.' },
]

export default function About() {
  usePageMeta('About DOWNFLOW', 'Our mission, model, and the story behind the inverted education system.')

  return (
    <div className="about-page">

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="kicker">Our Mission · The Model · Why We Exist</p>
          <h1 className="about-hero-title">
            Education was designed<br />
            <span style={{ color: 'var(--gold)' }}>to produce compliance.</span>
          </h1>
          <p className="about-hero-sub">
            We built DOWNFLOW to produce something else entirely:<br />
            <strong>confident, capable, contributing human beings.</strong>
          </p>
        </div>
        <div className="about-hero-scroll-hint">↓</div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="section about-manifesto-section">
        <div className="about-manifesto-inner">
          <div className="about-manifesto-block">
            <h2 className="about-manifesto-title">The Problem We Are Solving</h2>
            <p>Traditional education systems were not designed to unlock potential. They were designed to sort, standardise, and credential — at scale, for an industrial economy that no longer exists.</p>
            <p>The result: students who know how to pass tests but cannot speak confidently, think systemically, or create value for others. Learners who have been educated but not developed.</p>
            <p>We are not reforming this system. We are building <strong style={{ color: 'var(--gold)' }}>an alternative infrastructure</strong> — small, local, and accountable — that starts where school should have started: with the learner.</p>
          </div>
          <div className="about-manifesto-quote">
            <blockquote>
              "The system doesn't fail because children aren't capable.<br />
              It fails because <em>value doesn't flow.</em>"
            </blockquote>
            <cite>— The DOWNFLOW Model, 2022</cite>
          </div>
        </div>
      </section>

      {/* ── THE INVERSION ── */}
      <section className="section about-inversion-section">
        <div className="section-header">
          <p className="kicker">The Core Idea</p>
          <h2>The Inverted Education Model</h2>
        </div>
        <div className="about-compare-grid">
          <div className="about-compare-panel traditional">
            <h3>Traditional Model</h3>
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
          <div className="about-compare-divider">
            <div className="about-compare-arrow">⇄</div>
          </div>
          <div className="about-compare-panel producing">
            <h3>DOWNFLOW Model</h3>
            <p className="about-compare-sub">Starts inside, builds outward</p>
            {[
              'Learner first → curriculum adapts',
              'Knowledge is created and shared',
              'Assessment = what you produce for others',
              'Facilitator holds space, not authority',
              'Success = confidence + contribution',
              'Exits: capable contributors who teach next cohort',
            ].map(item => (
              <div key={item} className="about-compare-row green">
                <span className="about-compare-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
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

      {/* ── TIMELINE ── */}
      <section className="section about-timeline-section">
        <div className="section-header">
          <p className="kicker">Our Story</p>
          <h2>From Idea to Infrastructure</h2>
        </div>
        <div className="about-timeline">
          {TIMELINE.map((t, i) => (
            <div key={t.year} className={`about-timeline-item${i % 2 === 0 ? ' left' : ' right'}`}>
              <div className="about-timeline-year">{t.year}</div>
              <div className="about-timeline-connector"><span className="about-timeline-dot" /></div>
              <div className="about-timeline-content">{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section about-team-section">
        <div className="section-header">
          <p className="kicker">The People</p>
          <h2>Who Runs DOWNFLOW</h2>
          <p className="section-sub">We don't use names here. The model speaks louder than the people behind it.</p>
        </div>
        <div className="about-team-grid">
          {TEAM.map(m => (
            <div key={m.name} className="about-team-card">
              <div className="about-team-avatar">{m.name.split(' ').map(w => w[0]).join('')}</div>
              <h3 className="about-team-name">{m.name}</h3>
              <span className="about-team-role">{m.role}</span>
              <p className="about-team-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section about-cta-section">
        <div className="about-cta-inner">
          <h2>Be Part of the System</h2>
          <p>Whether you fund a cell, facilitate one, or enrol a child — every role matters. The model only works when all parts flow.</p>
          <div className="about-cta-buttons">
            <Link to="/activate" className="btn btn-gold">Activate a Cell →</Link>
            <Link to="/funding" className="btn btn-primary">Sponsor a Cell</Link>
            <Link to="/join" className="btn btn-secondary">Find Your Role</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
