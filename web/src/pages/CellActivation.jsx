import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import { useFormSubmit } from '../hooks/useFormSubmit.js'

const STEPS = [
  {
    num: '01',
    icon: '🌱',
    title: 'Choose a Location',
    desc: 'A cell runs from any stable space: a home, community room, library, or café. You need a room for 6–8 people, weekly, for 90 minutes.',
    color: '#4de8b0',
  },
  {
    num: '02',
    icon: '📦',
    title: 'Select Your Pack',
    desc: 'Choose one of 10 curriculum packs based on the age group you want to serve. Each pack is 24 sessions, designed to run one full school year.',
    color: '#72d0ff',
  },
  {
    num: '03',
    icon: '🧭',
    title: 'Assign a Facilitator',
    desc: 'A facilitator is not a teacher. They are a guide who creates safety, asks questions, and holds the space. We train them in under 48 hours.',
    color: '#b083ff',
  },
  {
    num: '04',
    icon: '💛',
    title: 'Secure Sponsorship',
    desc: 'One sponsor funds one cell for one year: $2,400. That covers all materials, facilitator pay, platform access, and parent reporting.',
    color: '#f0c840',
  },
  {
    num: '05',
    icon: '👧',
    title: 'Enroll 5 Students',
    desc: 'Each cell runs exactly 5 students. This is not a class — it is a cell. Small enough for every voice to matter. Large enough for real collaboration.',
    color: '#ff9f5a',
  },
  {
    num: '06',
    icon: '🚀',
    title: 'Launch Session 1',
    desc: 'The first session activates the cell. From here, it runs itself. Students build, produce, and grow — one session at a time.',
    color: '#ff6b8a',
  },
]

const PACKS = [
  { id: 'voice', name: 'Voice & Presence', ages: '8–14', icon: '🗣️', desc: 'Confidence in self-expression, spoken language, and performance.' },
  { id: 'kidinomics', name: 'Kidinomics', ages: '9–14', icon: '💰', desc: 'Value creation, trade, money systems, and entrepreneurial thinking.' },
  { id: 'systems', name: 'Systems Thinking', ages: '10–14', icon: '⚙️', desc: 'How systems work, feedback loops, cause and effect in real life.' },
  { id: 'leadership', name: 'Leadership Foundations', ages: '11–14', icon: '🏛️', desc: 'Decision-making, responsibility, and leading without ego.' },
  { id: 'creativity', name: 'Creative Production', ages: '7–12', icon: '🎨', desc: 'Making things: stories, designs, music, and physical projects.' },
  { id: 'body', name: 'Body Intelligence', ages: '5–10', icon: '🏃', desc: 'Movement, breath, self-regulation, and physical awareness.' },
]

export default function CellActivation() {
  usePageMeta('Activate a Cell', 'Start a DOWNFLOW learning cell in your community.')

  const [activeStep, setActiveStep] = useState(null)
  const [selectedPack, setSelectedPack] = useState(null)
  const [formStep, setFormStep] = useState(0) // 0=intro, 1=form, 2=done
  const [form, setForm] = useState({ name: '', email: '', org: '', location: '', pack: '', role: '', notes: '' })
  const { send, status: sendStatus, error: sendError } = useFormSubmit()

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await send({
      templateId: 'template_activation',
      params: {
        name:     form.name,
        email:    form.email,
        org:      form.org || '—',
        location: form.location,
        pack:     form.pack || '—',
        role:     form.role,
        notes:    form.notes || '—',
      }
    })
    if (result.ok) setFormStep(2)
  }

  return (
    <div className="activate-page">

      {/* ── HERO ── */}
      <section className="activate-hero">
        <div className="activate-hero-inner">
          <p className="kicker">Cell Activation · 6-Step Process · Live in 30 Days</p>
          <h1 className="activate-hero-title">
            Start a <span style={{ color: 'var(--gold)' }}>Learning Cell</span>
          </h1>
          <p className="activate-hero-sub">
            A learning cell is the base unit of DOWNFLOW. One facilitator. Five students.
            One pack. Weekly sessions. This is how real education starts — small, local, and accountable.
          </p>
          <div className="activate-hero-actions">
            <button className="btn btn-gold" onClick={() => setFormStep(1)}>Apply to Activate →</button>
            <Link to="/funding" className="btn btn-secondary">Find a Sponsor</Link>
          </div>
        </div>
      </section>

      {/* ── 6-STEP PROCESS ── */}
      <section className="section activate-steps-section">
        <div className="section-header">
          <p className="kicker">The Process</p>
          <h2>Six Steps to Launch</h2>
          <p className="section-sub">From idea to first session in 30 days or less.</p>
        </div>
        <div className="activate-steps-track">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`activate-step-card${activeStep === i ? ' expanded' : ''}`}
              style={{ '--step-color': s.color }}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
            >
              <div className="activate-step-head">
                <span className="activate-step-icon">{s.icon}</span>
                <div>
                  <span className="activate-step-num">Step {s.num}</span>
                  <h3 className="activate-step-title">{s.title}</h3>
                </div>
                <span className="activate-step-toggle">{activeStep === i ? '−' : '+'}</span>
              </div>
              {activeStep === i && (
                <p className="activate-step-desc">{s.desc}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PACK SELECTOR ── */}
      <section className="section activate-packs-section">
        <div className="section-header">
          <p className="kicker">Curriculum</p>
          <h2>Choose Your Pack</h2>
          <p className="section-sub">Each cell runs one pack per year. Pick what fits your community.</p>
        </div>
        <div className="activate-packs-grid">
          {PACKS.map(p => (
            <div
              key={p.id}
              className={`activate-pack-card${selectedPack === p.id ? ' selected' : ''}`}
              onClick={() => { setSelectedPack(p.id); setForm(f => ({ ...f, pack: p.name })) }}
            >
              <span className="activate-pack-icon">{p.icon}</span>
              <h3 className="activate-pack-name">{p.name}</h3>
              <span className="activate-pack-ages">Ages {p.ages}</span>
              <p className="activate-pack-desc">{p.desc}</p>
              {selectedPack === p.id && <span className="activate-pack-check">✓ Selected</span>}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/curriculum" className="btn btn-secondary">View Full Curriculum →</Link>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="section activate-includes-section">
        <div className="section-header">
          <p className="kicker">What's Included</p>
          <h2>Everything in One Cell</h2>
        </div>
        <div className="activate-includes-grid">
          {[
            { icon: '📋', title: '24-Session Curriculum', desc: 'Full lesson plans, student worksheets, and facilitator notes for every session.' },
            { icon: '🧭', title: 'Facilitator Training', desc: '48-hour virtual certification. No teaching degree required. Just curiosity and commitment.' },
            { icon: '📊', title: 'Parent Dashboard', desc: 'Weekly reports automatically generated. Parents track progress without extra admin.' },
            { icon: '💬', title: 'Platform Access', desc: 'Cell management, recordings, messaging, and analytics — all in one place.' },
            { icon: '💰', title: 'Facilitator Earnings', desc: 'Facilitators earn per session, plus bonuses for student progression and cell grade.' },
            { icon: '🔁', title: 'Succession System', desc: 'Top students from each cell become guiders for the next cohort. The system compounds.' },
          ].map(item => (
            <div key={item.title} className="activate-include-card">
              <span className="activate-include-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="section activate-form-section" id="apply">
        {formStep === 0 && (
          <div className="activate-cta-block">
            <h2>Ready to Activate?</h2>
            <p>Tell us where you are and what you need. We'll match you with a sponsor and a curriculum pack within 72 hours.</p>
            <button className="btn btn-gold" onClick={() => setFormStep(1)}>Start Your Application →</button>
          </div>
        )}

        {formStep === 1 && (
          <div className="activate-form-wrap">
            <h2 className="activate-form-title">Cell Activation Application</h2>
            <form className="activate-form" onSubmit={handleSubmit}>
              <div className="activate-field-row">
                <div className="activate-field">
                  <label>Your Name *</label>
                  <input required placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="activate-field">
                  <label>Email *</label>
                  <input type="email" required placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="activate-field-row">
                <div className="activate-field">
                  <label>Organisation / School</label>
                  <input placeholder="If applicable" value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} />
                </div>
                <div className="activate-field">
                  <label>Location (City, Country) *</label>
                  <input required placeholder="e.g. Hanoi, Vietnam" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
              </div>
              <div className="activate-field-row">
                <div className="activate-field">
                  <label>Preferred Pack</label>
                  <select value={form.pack} onChange={e => setForm(f => ({ ...f, pack: e.target.value }))}>
                    <option value="">Select a pack</option>
                    {PACKS.map(p => <option key={p.id} value={p.name}>{p.name} (Ages {p.ages})</option>)}
                  </select>
                </div>
                <div className="activate-field">
                  <label>Your Role *</label>
                  <select required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    <option value="">I am a…</option>
                    <option value="parent">Parent wanting to start a cell</option>
                    <option value="facilitator">Aspiring facilitator</option>
                    <option value="connector">Community connector</option>
                    <option value="school">School / institution</option>
                    <option value="sponsor">Potential sponsor</option>
                  </select>
                </div>
              </div>
              <div className="activate-field">
                <label>Anything else we should know?</label>
                <textarea rows={3} placeholder="Community context, timing, questions…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              {sendError && (
                <div className="form-send-error">⚠️ {sendError}</div>
              )}
              <button type="submit" className="booking-submit-btn" disabled={sendStatus === 'sending'}>
                {sendStatus === 'sending' ? 'Sending…' : 'Submit Application →'}
              </button>
            </form>
          </div>
        )}

        {formStep === 2 && (
          <div className="activate-done-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h2>Application Received</h2>
            <p>We'll review your application and reach out to <strong>{form.email}</strong> within 72 hours.</p>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>
              Next step: we'll match you with a sponsor and help you find your first five students.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/curriculum" className="btn btn-primary">Explore Curriculum →</Link>
              <Link to="/facilitator-onboarding" className="btn btn-secondary">Facilitator Training →</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
