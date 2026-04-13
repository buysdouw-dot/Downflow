import React from 'react'
import { useState } from 'react'

const TAS = [
  {
    id: 'ta-vn-01',
    name: 'Nguyen Thi Lan',
    flag: '🇻🇳',
    lang: 'Vietnamese',
    region: 'Vietnam',
    speciality: 'Foundation & Ages 6–10',
    bio: 'Specialist in building confidence in shy learners. Explains grammar in Vietnamese so nothing stays confusing.',
    packs: ['Swimming', 'Body Intelligence', 'Kidinomics', 'Pencil Proof'],
    slots: ['Mon 5:00 PM', 'Tue 5:00 PM', 'Thu 4:30 PM', 'Sat 9:00 AM'],
    rate: { coins: 20, vnd: '50,000' },
    rating: 4.9,
    sessions: 142,
    available: true,
  },
  {
    id: 'ta-vn-02',
    name: 'Pham Duc Minh',
    flag: '🇻🇳',
    lang: 'Vietnamese',
    region: 'Vietnam',
    speciality: 'Expression & Ages 11–14',
    bio: 'Works with older students on voice, presence, and speaking identity. Creates a zero-pressure environment.',
    packs: ['Voice & Expression', 'Social Systems', 'Personality'],
    slots: ['Wed 6:00 PM', 'Fri 5:00 PM', 'Sat 2:00 PM'],
    rate: { coins: 25, vnd: '60,000' },
    rating: 4.8,
    sessions: 87,
    available: true,
  },
  {
    id: 'ta-de-01',
    name: 'Lena Fischer',
    flag: '🇩🇪',
    lang: 'German',
    region: 'Germany',
    speciality: 'All Stages',
    bio: 'Bridges German and English naturally. Helps students connect ideas they already have to new language.',
    packs: ['Pencil Proof', 'Kidinomics', 'Natural Medicines', 'Music'],
    slots: ['Mon 4:00 PM', 'Wed 4:00 PM', 'Thu 5:00 PM'],
    rate: { coins: 25, vnd: null, eur: '€8' },
    rating: 4.9,
    sessions: 64,
    available: true,
  },
  {
    id: 'ta-ru-01',
    name: 'Alexei Sorokin',
    flag: '🇷🇺',
    lang: 'Russian',
    region: 'Russia',
    speciality: 'Foundation & Confidence',
    bio: 'Focuses on helping introverted learners find their voice. Uses storytelling and play to lower the barrier to speaking.',
    packs: ['My Hobbies', 'Body Intelligence', 'Swimming', 'Music'],
    slots: ['Tue 6:00 PM', 'Sat 11:00 AM'],
    rate: { coins: 20, vnd: null },
    rating: 4.7,
    sessions: 31,
    available: false,
  },
]

const EARN_METHODS = [
  { icon: '🎬', label: 'Submit a video rep', coins: '+5', note: 'Per rep reviewed' },
  { icon: '✅', label: 'Complete a challenge', coins: '+15', note: 'Per challenge' },
  { icon: '🔥', label: 'Weekly streak bonus', coins: '+20', note: 'After 7 sessions' },
  { icon: '💡', label: 'Helpful contribution', coins: '+10', note: 'Per session' },
  { icon: '👥', label: 'Help a peer understand', coins: '+10', note: 'Recognised by guider' },
  { icon: '📤', label: 'Content reused by another cell', coins: '+25', note: 'One-time per asset' },
]

function TACard({ ta, onBook }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ta-card${!ta.available ? ' unavailable' : ''}`}>
      <div className="ta-card-header">
        <div className="ta-avatar">{ta.flag}</div>
        <div className="ta-info">
          <strong className="ta-name">{ta.name}</strong>
          <span className="ta-lang">{ta.lang} · {ta.region}</span>
          <span className="ta-specialty">{ta.speciality}</span>
        </div>
        <div className="ta-rating">
          <span className="ta-stars">★ {ta.rating}</span>
          <span className="ta-sessions">{ta.sessions} sessions</span>
        </div>
      </div>

      <p className="ta-bio">{ta.bio}</p>

      <div className="ta-packs">
        {ta.packs.map(p => <span key={p} className="ta-pack-chip">{p}</span>)}
      </div>

      {open && (
        <div className="ta-slots">
          <p className="ta-slots-head">Available Slots</p>
          <div className="ta-slots-grid">
            {ta.slots.map(slot => (
              <button key={slot} className="ta-slot-btn" onClick={() => onBook(ta, slot)}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="ta-card-footer">
        <div className="ta-rate">
          <span className="ta-rate-coins">🪙 {ta.rate.coins} coins / session</span>
          {ta.rate.vnd && <span className="ta-rate-cash">or {ta.rate.vnd} VND</span>}
          {ta.rate.eur && <span className="ta-rate-cash">or {ta.rate.eur}</span>}
        </div>
        {ta.available
          ? <button className="btn btn-primary btn-sm" onClick={() => setOpen(o => !o)}>
              {open ? 'Hide Slots' : 'Book Session'}
            </button>
          : <span className="ta-unavail-badge">● Joining soon</span>
        }
      </div>
    </div>
  )
}

export default function TeacherAssistants() {
  const [regionFilter, setRegionFilter] = useState('all')
  const [booked, setBooked] = useState(null)

  const filtered = regionFilter === 'all' ? TAS : TAS.filter(ta => ta.lang.toLowerCase() === regionFilter)

  function handleBook(ta, slot) {
    setBooked({ ta, slot })
  }

  return (
    <div className="dashboard-page">

      <div className="db-page-header" style={{ background: 'linear-gradient(135deg, #1a2038 0%, #1f2d20 100%)' }}>
        <div className="db-header-inner">
          <div>
            <p className="kicker">Module D — Extra Lessons & Assistants</p>
            <h1 className="db-title">🌐 Teacher Assistants</h1>
            <p className="db-subtitle">Local-language support · Optional, never mandatory · Book with coins or cash · Vietnamese · Russian · German</p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-secondary">Become a TA →</button>
          </div>
        </div>
        <div className="db-stats-row">
          {[
            ['🌐', '3', 'Languages', 'VN · DE · RU', '#72d0ff'],
            ['👩‍🏫', '4', 'Active TAs', 'Growing roster', '#4de8b0'],
            ['🪙', '20–25', 'Coins/Session', 'Or local cash', '#d2ad44'],
            ['✅', '100%', 'Optional', 'Never mandatory', '#b083ff'],
          ].map(([icon, val, label, sub, color]) => (
            <div key={label} className="db-stat-card" style={{ '--stat-color': color }}>
              <span className="db-stat-icon">{icon}</span>
              <div>
                <p className="db-stat-value">{val}</p>
                <p className="db-stat-label">{label}</p>
                <p className="db-stat-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="db-content" style={{ paddingTop: '2rem' }}>

        {/* What TAs do */}
        <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
          <h3 className="db-panel-title">What Teacher Assistants Do</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '0.75rem' }}>
            {[
              { icon: '🗣️', title: 'Run extra sessions', desc: 'Optional sessions in your local language alongside the core English cell. Builds reinforcement without pressure.' },
              { icon: '🌍', title: 'Explain in your language', desc: 'Concepts that need clarification come through your first language — Vietnamese, Russian, or German — so nothing stays confusing.' },
              { icon: '🤝', title: 'Support shy learners', desc: 'TAs focus on students who need a quieter entry point. They assist repetition and build confidence before group sessions.' },
            ].map(item => (
              <div key={item.title} style={{ padding: '1.1rem', background: 'var(--bg-card-alt)', borderRadius: '12px' }}>
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '0.35rem' }}>{item.title}</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', padding: '0.85rem 1.1rem', background: 'var(--green-pale)', border: '1px solid var(--green)', borderRadius: '10px', fontSize: '0.84rem', color: 'var(--text-soft)' }}>
            <strong style={{ color: 'var(--navy)' }}>Important:</strong> TAs do not control curriculum or rankings. They do not sell. They do not reference sponsors. They create a local talent pipeline — and local employment.
          </div>
        </div>

        {/* Booking confirmation */}
        {booked && (
          <div className="db-panel" style={{ marginBottom: '1.5rem', background: 'var(--green-pale)', border: '2px solid var(--green)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '2rem' }}>✅</span>
              <div>
                <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '1rem' }}>Session Requested</strong>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: 'var(--text-soft)' }}>
                  {booked.ta.name} · {booked.slot} · 🪙 {booked.ta.rate.coins} coins will be deducted on confirmation.
                </p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setBooked(null)}>✕</button>
            </div>
          </div>
        )}

        {/* Filter + TA list */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-soft)' }}>Language:</span>
          {[['all', '🌐 All'], ['vietnamese', '🇻🇳 Vietnamese'], ['german', '🇩🇪 German'], ['russian', '🇷🇺 Russian']].map(([id, label]) => (
            <button key={id} className={`filter-btn${regionFilter === id ? ' active' : ''}`} onClick={() => setRegionFilter(id)}>{label}</button>
          ))}
        </div>

        <div className="ta-grid">
          {filtered.map(ta => <TACard key={ta.id} ta={ta} onBook={handleBook} />)}
        </div>

        {/* Coin earn guide */}
        <div className="db-panel" style={{ marginTop: '2rem' }}>
          <h3 className="db-panel-title">🪙 How to Earn Coins for TA Sessions</h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
            Coins are earned through participation — never purchased. Here is how you earn them:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {EARN_METHODS.map(m => (
              <div key={m.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem', background: 'var(--bg-card-alt)', borderRadius: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{m.icon}</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.84rem', color: 'var(--navy)' }}>{m.label}</strong>
                  <span style={{ color: '#4de8b0', fontWeight: 700, fontSize: '0.88rem' }}>{m.coins}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>{m.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a TA */}
        <div className="db-panel" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, var(--navy), #1a2a3a)', border: 'none' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#fff', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>🌱 Become a Teacher Assistant</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
                TAs are local teachers, tutors, or advanced students in Vietnam, Germany, and Russia who want to support learners in their own language.
                This is paid work. It builds a local employment pipeline.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {[['🪙', 'Earn per session'], ['🌍', 'Work in your language'], ['📚', 'No curriculum control'], ['🔐', 'Zero pressure role']].map(([icon, label]) => (
                  <div key={label} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', alignItems: 'center' }}>
                    <span>{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <button className="btn btn-primary">Apply as TA →</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
