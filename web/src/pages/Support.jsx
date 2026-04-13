import React from 'react'
// ============================================================
// Support — FAQ + Issue Submission
// Covers: missed class, wrong booking, payment confusion,
//         teacher issue, account problems.
// ============================================================
import { useState } from 'react'
import { db, isConfigured, addDoc, collection, serverTimestamp } from '../services/firebase.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const FAQS = [
  {
    category: 'Sessions',
    icon: '📅',
    items: [
      { q: 'What if my facilitator doesn\'t show up?', a: 'Contact us immediately via the form below (select "Teacher No-Show"). We will assign a backup facilitator within 2 hours and your session will not be marked absent. Repeated no-shows are investigated and may result in the facilitator being removed.' },
      { q: 'Can I reschedule a session?', a: 'Sessions are group-based and run on a fixed 12-week schedule. Individual rescheduling is not available. However, if you miss a session, you can watch the recording in the Session Recordings library and submit your video rep to stay on track.' },
      { q: 'What happens if I miss a session?', a: 'Missing one session does not remove you from your cell. Watch the session recording, complete your rep, and attend the next session. Missing 3+ consecutive sessions may trigger a check-in from your facilitator.' },
      { q: 'How long is each session?', a: 'Sessions run exactly 60 minutes: 5-min warm-up, 40-min core teaching, 10-min practice, 5-min wrap-up. Join via Google Meet — links are in your Student Dashboard.' },
    ]
  },
  {
    category: 'Payments',
    icon: '💳',
    items: [
      { q: 'How does sponsorship payment work?', a: 'Sponsors fund cells via Wise bank transfer. After submitting a funding request, you receive payment instructions with a unique reference number. Once payment clears (1–3 business days), your cells are activated within 24 hours.' },
      { q: 'I was charged but my cell is not active', a: 'Please allow 24 hours after payment confirmation. If your cell is still not active after 24 hours, submit a support ticket below with your invoice reference number and we will investigate immediately.' },
      { q: 'Can I get a refund?', a: 'Refunds are available before Week 1 begins. After the cycle starts, no refunds are issued except in cases of documented platform failure or consent withdrawal. See our Terms for full refund policy.' },
      { q: 'What currencies are supported?', a: 'We accept USD, EUR, and VND via Wise bank transfer. The exchange rate used is the Wise mid-market rate at the time of payment.' },
    ]
  },
  {
    category: 'Accounts',
    icon: '👤',
    items: [
      { q: 'I lost my progress / data is missing', a: 'Your progress is stored in Firebase and syncs across devices. Try logging out and back in. If data is still missing, submit a ticket below with your account email and we will restore it within 24 hours.' },
      { q: 'How do I change my role?', a: 'Role changes (e.g. Student → Facilitator) must go through the proper progression pathway. A student cannot self-assign a facilitator role — it is granted by a platform admin after meeting criteria. Contact us if you believe you qualify.' },
      { q: 'I can\'t log in to my account', a: 'Use the "Forgot password" link on the login page. If you do not receive the reset email within 5 minutes, check your spam folder. If still blocked, submit a ticket with your registered email address.' },
      { q: 'How do I link a parent account?', a: 'Parent linking is managed by your facilitator or platform admin. Ask your facilitator to request a parent account link from the Platform Dashboard.' },
    ]
  },
  {
    category: 'Facilitators',
    icon: '🧭',
    items: [
      { q: 'How do I apply to become a facilitator?', a: 'Submit an application on the Join page. You\'ll go through: short application form → demo lesson → training video → supervised session → full assignment. The full process takes approximately 2 weeks.' },
      { q: 'When do facilitators get paid?', a: 'Facilitators receive weekly payouts every Friday, calculated as a percentage of the cell\'s sponsorship revenue (Phase 1: 35%, Phase 2: 40%, Phase 3: 45%). Payouts are processed via Wise.' },
      { q: 'What happens if my rating drops below 4/5?', a: 'A rating below 4/5 for 2 consecutive sessions triggers a warning and a check-in with the platform team. Repeated low scores lead to a supervised session review. This system protects both students and facilitators.' },
      { q: 'Can I run sessions from anywhere?', a: 'Yes — all sessions are run via Google Meet. You need a stable internet connection, a quiet space, and a device with a camera. Location does not matter.' },
    ]
  },
  {
    category: 'Coins & Progress',
    icon: '🪙',
    items: [
      { q: 'How do I earn coins?', a: 'Coins are earned — never purchased. You earn them by attending sessions, submitting video reps, being promoted, and contributing to your cell. This ensures coins reflect real learning, not spending power.' },
      { q: 'What can I do with coins?', a: 'Coins unlock Teacher Assistant (TA) sessions, advanced curriculum packs, and recognition badges. They are your learning currency — spend them on learning, not status.' },
      { q: 'Why can\'t I buy more coins?', a: 'Purchasing coins would corrupt the integrity of the system. A student with 200 coins genuinely earned them through 200 units of real work. That cannot be bought.' },
      { q: 'How does the Student → Facilitator pathway work?', a: 'Progress from Student → SG (Student Guider) → ASG (Assistant Student Guider) → Intern Facilitator → Facilitator. Each stage requires a readiness % that your facilitator tracks. Promotion is based on performance, not time.' },
    ]
  },
]

const ISSUE_CATEGORIES = [
  'Teacher No-Show',
  'Missed / Wrong Booking',
  'Payment Not Confirmed',
  'Account Access Issue',
  'Data / Progress Missing',
  'Technical Problem (app)',
  'Feedback on Facilitator',
  'Other',
]

export default function Support() {
  usePageMeta('Support & FAQ', 'Get help with sessions, payments, accounts, and facilitator questions.')

  const { uid, displayName, profile } = useAuth()
  const toast = useToast()

  const [openFaq,    setOpenFaq]    = useState(null)
  const [activeTab,  setActiveTab]  = useState('faq')
  const [category,   setCategory]   = useState('')
  const [message,    setMessage]    = useState('')
  const [email,      setEmail]      = useState(profile?.email || '')
  const [name,       setName]       = useState(displayName || '')
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [search,     setSearch]     = useState('')

  const filtered = search.trim()
    ? FAQS.map(cat => ({
        ...cat,
        items: cat.items.filter(i =>
          i.q.toLowerCase().includes(search.toLowerCase()) ||
          i.a.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(cat => cat.items.length > 0)
    : FAQS

  async function handleSubmit(e) {
    e.preventDefault()
    if (!category || !message.trim() || !email.trim()) return
    setSubmitting(true)
    try {
      const ticket = {
        userId:    uid || 'guest',
        name:      name.trim(),
        email:     email.trim(),
        category,
        message:   message.trim(),
        status:    'open',
        createdAt: isConfigured ? serverTimestamp() : new Date().toISOString(),
      }
      if (isConfigured) {
        await addDoc(collection(db, 'supportTickets'), ticket)
      } else {
        console.log('[Support ticket — dev mode]', ticket)
      }
      setSubmitted(true)
      toast('Ticket submitted — we\'ll respond within 24 hours.', 'success')
    } catch (err) {
      toast('Failed to submit: ' + err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="sup-page">
      <div className="sup-hero">
        <span className="kicker">Help Centre</span>
        <h1 className="sup-title">How can we help?</h1>
        <p className="sup-subtitle">Find answers instantly or submit a support ticket — we respond within 24 hours.</p>
        <input className="sup-search" type="text" placeholder="Search for answers…"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="sup-tabs">
        {['faq', 'ticket'].map(t => (
          <button key={t} className={`sup-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t === 'faq' ? '❓ FAQ' : '📩 Submit Ticket'}
          </button>
        ))}
      </div>

      {/* ── FAQ ── */}
      {activeTab === 'faq' && (
        <div className="sup-faq">
          {filtered.length === 0 && (
            <div className="sup-empty">
              <p>No results for "<strong>{search}</strong>"</p>
              <button className="sup-link-btn" onClick={() => { setSearch(''); setActiveTab('ticket') }}>
                Submit a support ticket instead →
              </button>
            </div>
          )}
          {filtered.map(cat => (
            <div key={cat.category} className="sup-cat">
              <h2 className="sup-cat-title">{cat.icon} {cat.category}</h2>
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`
                return (
                  <div key={key} className={`sup-item ${openFaq === key ? 'open' : ''}`}>
                    <button className="sup-q" onClick={() => setOpenFaq(openFaq === key ? null : key)}>
                      <span>{item.q}</span>
                      <span className="sup-chevron">{openFaq === key ? '▲' : '▼'}</span>
                    </button>
                    {openFaq === key && (
                      <div className="sup-a">{item.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── Ticket ── */}
      {activeTab === 'ticket' && (
        <div className="sup-ticket-wrap">
          {submitted ? (
            <div className="sup-submitted">
              <div className="sup-submitted-icon">✅</div>
              <h2>Ticket Submitted</h2>
              <p>We'll respond to <strong>{email}</strong> within 24 hours.</p>
              <p className="sup-ticket-note">In the meantime, check our <button className="sup-link-btn" onClick={() => { setActiveTab('faq'); setSubmitted(false) }}>FAQ</button> — your answer may already be there.</p>
              <button className="sup-btn-primary" onClick={() => { setSubmitted(false); setMessage(''); setCategory('') }}>
                Submit Another Ticket
              </button>
            </div>
          ) : (
            <form className="sup-form" onSubmit={handleSubmit}>
              <h2 className="sup-form-title">Submit a Support Ticket</h2>
              <p className="sup-form-sub">We respond within 24 hours, usually much faster.</p>

              <div className="sup-row">
                <div className="sup-field">
                  <label>Your name</label>
                  <input className="sup-input" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Full name" required />
                </div>
                <div className="sup-field">
                  <label>Email address</label>
                  <input className="sup-input" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com" required />
                </div>
              </div>

              <div className="sup-field">
                <label>Issue category</label>
                <select className="sup-select" value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="">Select a category…</option>
                  {ISSUE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="sup-field">
                <label>Describe your issue</label>
                <textarea className="sup-textarea" rows={5} value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Please give as much detail as possible — include cell ID, date, and what you expected to happen…"
                  required />
              </div>

              <button className="sup-btn-primary" type="submit" disabled={submitting || !category || !message.trim()}>
                {submitting ? 'Submitting…' : 'Submit Ticket →'}
              </button>
            </form>
          )}

          {/* Common issues quick links */}
          <div className="sup-quick">
            <h3>Common Issues</h3>
            <div className="sup-quick-grid">
              {[
                { icon: '👩‍🏫', label: 'Teacher didn\'t show up', action: () => { setCategory('Teacher No-Show'); setActiveTab('ticket') } },
                { icon: '💳', label: 'Payment not confirmed', action: () => { setCategory('Payment Not Confirmed'); setActiveTab('ticket') } },
                { icon: '🔐', label: 'Can\'t log in', action: () => { setCategory('Account Access Issue'); setActiveTab('ticket') } },
                { icon: '📊', label: 'Lost my progress', action: () => { setCategory('Data / Progress Missing'); setActiveTab('ticket') } },
              ].map(q => (
                <button key={q.label} className="sup-quick-btn" onClick={q.action}>
                  <span>{q.icon}</span> {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="sup-contact-bar">
        <span>Still need help?</span>
        <a href="mailto:support@downflow.app" className="sup-email-link">support@downflow.app</a>
        <span>·</span>
        <span>Response time: &lt; 24 hours</span>
      </div>
    </div>
  )
}
