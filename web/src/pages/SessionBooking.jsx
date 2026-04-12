import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import { useFormSubmit } from '../hooks/useFormSubmit.js'

const CELLS = [
  { id: 'VN-01', region: '🇻🇳 Hanoi', facilitator: 'Dr. Hoa Nguyen', pack: 'Voice & Presence', seats: 2, day: 'Tuesday', time: '5:00 PM', mode: 'In-person' },
  { id: 'VN-02', region: '🇻🇳 Ho Chi Minh City', facilitator: 'Mr. Binh Tran', pack: 'Kidinomics', seats: 3, day: 'Saturday', time: '9:00 AM', mode: 'In-person' },
  { id: 'VN-03', region: '🇻🇳 Da Nang', facilitator: 'Ms. Lan Pham', pack: 'Systems Thinking', seats: 1, day: 'Wednesday', time: '4:30 PM', mode: 'Hybrid' },
  { id: 'MY-01', region: '🇲🇾 Kuala Lumpur', facilitator: 'Mr. Azlan Yusof', pack: 'Voice & Presence', seats: 4, day: 'Thursday', time: '6:00 PM', mode: 'Online' },
  { id: 'PH-01', region: '🇵🇭 Manila', facilitator: 'Ms. Maria Santos', pack: 'Leadership Foundations', seats: 3, day: 'Saturday', time: '10:00 AM', mode: 'In-person' },
  { id: 'SG-01', region: '🇸🇬 Singapore', facilitator: 'Mr. Wei Chen', pack: 'Kidinomics', seats: 2, day: 'Sunday', time: '2:00 PM', mode: 'Hybrid' },
]

const PACKS = ['All', 'Voice & Presence', 'Kidinomics', 'Systems Thinking', 'Leadership Foundations']
const MODES = ['All', 'In-person', 'Hybrid', 'Online']

const AGE_GROUPS = ['5 – 7', '8 – 10', '11 – 13', '14+']

export default function SessionBooking() {
  usePageMeta('Book a Session', 'Find and book a DOWNFLOW learning cell near you.')

  const [packFilter, setPackFilter] = useState('All')
  const [modeFilter, setModeFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState(1) // 1=browse, 2=form, 3=confirm

  // Form state
  const [form, setForm] = useState({ name: '', email: '', phone: '', childName: '', age: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const { send, status: sendStatus, error: sendError } = useFormSubmit()

  const filtered = CELLS.filter(c =>
    (packFilter === 'All' || c.pack === packFilter) &&
    (modeFilter === 'All' || c.mode === modeFilter)
  )

  function handleSelect(cell) {
    setSelected(cell)
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await send({
      templateId: 'template_booking',
      params: {
        parent_name:    form.name,
        email:          form.email,
        phone:          form.phone || '—',
        child_name:     form.childName,
        age_group:      form.age,
        notes:          form.notes || '—',
        cell_id:        selected?.id,
        cell_region:    selected?.region,
        cell_pack:      selected?.pack,
        facilitator:    selected?.facilitator,
        schedule:       `${selected?.day} at ${selected?.time}`,
      }
    })
    if (result.ok) {
      setSubmitted(true)
      setStep(3)
    }
  }

  return (
    <div className="booking-page">
      {/* ── HERO ── */}
      <section className="booking-hero">
        <div className="booking-hero-inner">
          <p className="kicker">Learning Cells · Ages 5–14 · Southeast Asia</p>
          <h1 className="booking-hero-title">
            Book a <span style={{ color: 'var(--gold)' }}>Session</span>
          </h1>
          <p className="booking-hero-sub">
            Find a learning cell in your region. Each cell runs 5 students, one facilitator,
            and one life-skills curriculum pack. Sessions meet weekly.
          </p>
          <div className="booking-stats-row">
            {[
              { val: '24', label: 'Active Cells' },
              { val: '6', label: 'Countries' },
              { val: '94%', label: 'Retention Rate' },
              { val: '5 – 14', label: 'Age Range' },
            ].map(s => (
              <div key={s.label} className="booking-stat">
                <span className="booking-stat-val">{s.val}</span>
                <span className="booking-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP INDICATOR ── */}
      <div className="booking-steps">
        {['Choose a Cell', 'Your Details', 'Confirmed'].map((s, i) => (
          <div key={s} className={`booking-step${step === i + 1 ? ' active' : step > i + 1 ? ' done' : ''}`}>
            <span className="booking-step-num">{step > i + 1 ? '✓' : i + 1}</span>
            <span className="booking-step-label">{s}</span>
            {i < 2 && <span className="booking-step-line" />}
          </div>
        ))}
      </div>

      {/* ── STEP 1: BROWSE CELLS ── */}
      {step === 1 && (
        <section className="section booking-browse">
          {/* Filters */}
          <div className="booking-filters">
            <div className="booking-filter-group">
              <label className="booking-filter-label">Pack</label>
              <div className="booking-filter-pills">
                {PACKS.map(p => (
                  <button
                    key={p}
                    className={`booking-pill${packFilter === p ? ' active' : ''}`}
                    onClick={() => setPackFilter(p)}
                  >{p}</button>
                ))}
              </div>
            </div>
            <div className="booking-filter-group">
              <label className="booking-filter-label">Mode</label>
              <div className="booking-filter-pills">
                {MODES.map(m => (
                  <button
                    key={m}
                    className={`booking-pill${modeFilter === m ? ' active' : ''}`}
                    onClick={() => setModeFilter(m)}
                  >{m}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Cell cards */}
          <div className="booking-cells-grid">
            {filtered.map(cell => (
              <div key={cell.id} className="booking-cell-card">
                <div className="booking-cell-top">
                  <span className="booking-cell-id">{cell.id}</span>
                  <span className={`booking-mode-badge ${cell.mode.toLowerCase().replace('-','')}`}>{cell.mode}</span>
                </div>
                <div className="booking-cell-region">{cell.region}</div>
                <div className="booking-cell-pack">{cell.pack}</div>
                <div className="booking-cell-facilitator">👤 {cell.facilitator}</div>
                <div className="booking-cell-schedule">
                  <span>📅 {cell.day}</span>
                  <span>🕐 {cell.time}</span>
                </div>
                <div className="booking-cell-seats">
                  <span className={`booking-seats-badge${cell.seats <= 1 ? ' low' : ''}`}>
                    {cell.seats} seat{cell.seats !== 1 ? 's' : ''} left
                  </span>
                </div>
                <button className="booking-select-btn" onClick={() => handleSelect(cell)}>
                  Select This Cell →
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="booking-empty">No cells match your filters. <button onClick={() => { setPackFilter('All'); setModeFilter('All') }}>Clear filters</button></div>
            )}
          </div>

          <div className="booking-no-cell">
            <p>Don't see a cell near you?</p>
            <Link to="/activate" className="btn btn-secondary">Activate a New Cell →</Link>
          </div>
        </section>
      )}

      {/* ── STEP 2: BOOKING FORM ── */}
      {step === 2 && selected && (
        <section className="section booking-form-section">
          <button className="booking-back-btn" onClick={() => setStep(1)}>← Back to cells</button>
          <div className="booking-form-layout">
            {/* Summary */}
            <div className="booking-summary-card">
              <p className="booking-summary-label">Booking for</p>
              <h3 className="booking-summary-cell">{selected.id}</h3>
              <div className="booking-summary-detail"><span>📍</span>{selected.region}</div>
              <div className="booking-summary-detail"><span>📦</span>{selected.pack}</div>
              <div className="booking-summary-detail"><span>👤</span>{selected.facilitator}</div>
              <div className="booking-summary-detail"><span>📅</span>{selected.day} at {selected.time}</div>
              <div className="booking-summary-detail"><span>🏷</span>{selected.mode}</div>
              <div className="booking-summary-seats">{selected.seats} seat{selected.seats !== 1 ? 's' : ''} remaining</div>
            </div>

            {/* Form */}
            <form className="booking-form" onSubmit={handleSubmit}>
              <h2 className="booking-form-title">Your Details</h2>
              <div className="booking-field-row">
                <div className="booking-field">
                  <label>Parent / Guardian Name *</label>
                  <input required placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="booking-field">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="booking-field-row">
                <div className="booking-field">
                  <label>Phone / WhatsApp</label>
                  <input placeholder="+84 …" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="booking-field">
                  <label>Child's Name *</label>
                  <input required placeholder="Child's first name" value={form.childName} onChange={e => setForm(f => ({ ...f, childName: e.target.value }))} />
                </div>
              </div>
              <div className="booking-field-row">
                <div className="booking-field">
                  <label>Child's Age Group *</label>
                  <select required value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}>
                    <option value="">Select age group</option>
                    {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div className="booking-field">
                <label>Additional Notes</label>
                <textarea rows={3} placeholder="Any questions or context for the facilitator…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              {sendError && (
                <div className="form-send-error">⚠️ {sendError}</div>
              )}
              <button type="submit" className="booking-submit-btn" disabled={sendStatus === 'sending'}>
                {sendStatus === 'sending' ? 'Sending…' : 'Confirm Booking →'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ── STEP 3: CONFIRMED ── */}
      {step === 3 && (
        <section className="section booking-confirmed">
          <div className="booking-confirmed-card">
            <div className="booking-confirmed-icon">✅</div>
            <h2>Booking Received!</h2>
            <p>We've sent a confirmation to <strong>{form.email}</strong>.</p>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.92rem', marginTop: '0.5rem' }}>
              Your facilitator <strong style={{ color: 'var(--text-main)' }}>{selected?.facilitator}</strong> will reach out
              within 24 hours with session details and a WhatsApp group link.
            </p>
            <div className="booking-confirmed-summary">
              <div><span>Cell</span><strong>{selected?.id}</strong></div>
              <div><span>Region</span><strong>{selected?.region}</strong></div>
              <div><span>Schedule</span><strong>{selected?.day} · {selected?.time}</strong></div>
              <div><span>Child</span><strong>{form.childName}</strong></div>
            </div>
            <div className="booking-confirmed-actions">
              <Link to="/curriculum" className="btn btn-primary">Explore Curriculum →</Link>
              <Link to="/" className="btn btn-secondary">Back to Home</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
