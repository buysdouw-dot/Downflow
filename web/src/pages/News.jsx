import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormSubmit } from '../hooks/useFormSubmit.js'

const SIGNALS = [
  { id: 1, slug: 'cell-vn01-season-1', type: 'milestone', icon: '🏆', title: 'Cell VN-01 completes Season 1', body: 'Hanoi Learning Cell VN-01 has completed all 24 sessions of Season 1. All 5 students advanced to the next cycle. Succession rate: 100%.', date: '1 Apr 2026', region: '🇻🇳 Vietnam', pinned: true },
  { id: 2, slug: 'globalEd-germany-partner', type: 'sponsor', icon: '🏦', title: 'GlobalEd Germany joins as Growth Partner', body: 'GlobalEd Germany has committed to fund 2 Learning Cells in Berlin and Hamburg for the full 2026 cycle. This brings the Germany network to full operational capacity.', date: '28 Mar 2026', region: '🇩🇪 Germany', pinned: true },
  { id: 3, slug: null, type: 'growth', icon: '🌱', title: 'DE-03 Munich — cell formation begins', body: 'A new Learning Cell is forming in Munich. Connector Klaus B. has confirmed facilitator placement. First session targeted for May 2026.', date: '25 Mar 2026', region: '🇩🇪 Germany', pinned: false },
  { id: 4, slug: 'russia-moscow-live', type: 'expansion', icon: '🌍', title: 'Russia Phase 1 — Moscow cell live', body: 'RU-01 Moscow has completed its first session. Week 1 health score: 70. Student engagement rated as strong by the facilitator. Connector recruitment ongoing.', date: '20 Mar 2026', region: '🇷🇺 Russia', pinned: false },
  { id: 5, slug: '50-students-milestone', type: 'milestone', icon: '⭐', title: '50 students now active across all cells', body: 'As of March 2026, the Downflow network supports 50 active students across 7 cells in 3 countries. All participate at zero cost to their families.', date: '15 Mar 2026', region: '🌍 Global', pinned: false },
  { id: 6, slug: 'coin-system-update', type: 'update', icon: '🔧', title: 'Coin system update — participation bonus added', body: 'Students now earn +5 coins for consistent attendance across 3 consecutive sessions. The system calculates this automatically at the end of each week.', date: '10 Mar 2026', region: '🌍 Global', pinned: false },
  { id: 7, slug: 'content-engine-47', type: 'growth', icon: '📈', title: 'Content Engine reaches 47 reusable lessons', body: 'The Downflow Content Engine now holds 47 edited lesson clips and 24 reusable prompts sourced from live learning cells. Average reuse rate: 4.6 per lesson.', date: '5 Mar 2026', region: '🌍 Global', pinned: false },
  { id: 8, slug: null, type: 'expansion', icon: '🔗', title: 'New connector opportunity — Southeast Asia', body: 'An open connector slot has been published for Southeast Asia expansion. Interested connectors can apply via the Connector Portal.', date: '1 Mar 2026', region: '🌏 Southeast Asia', pinned: false },
]

const METRICS = [
  { icon: '🏫', value: '7', label: 'Active Cells', trend: '+3 this quarter' },
  { icon: '👥', value: '50', label: 'Students', trend: '+21 this quarter' },
  { icon: '🌍', value: '3', label: 'Countries', trend: 'Vietnam · Germany · Russia' },
  { icon: '🏦', value: '3', label: 'Sponsors', trend: 'All tiers represented' },
  { icon: '🎬', value: '47', label: 'Content Assets', trend: '68 total reuses' },
  { icon: '⭐', value: '100%', label: 'Season 1 Succession', trend: 'VN-01 — 5 of 5 advanced' },
]

const TYPE_LABELS = {
  milestone: { label: 'Milestone', color: '#4de8b0' },
  sponsor: { label: 'Sponsor', color: '#d2ad44' },
  growth: { label: 'Growth', color: '#72d0ff' },
  expansion: { label: 'Expansion', color: '#b083ff' },
  update: { label: 'Update', color: '#ff9f5a' },
}

function SignalCard({ signal, featured }) {
  const meta = TYPE_LABELS[signal.type]
  const inner = (
    <article className={`news-card${featured ? ' featured' : ''}${signal.slug ? ' clickable' : ''}`} style={{ '--signal-color': meta.color }}>
      {signal.pinned && <div className="news-pinned">📌 Pinned</div>}
      <div className="news-card-header">
        <span className="news-type-badge" style={{ background: meta.color + '22', color: meta.color, borderColor: meta.color + '44' }}>{meta.label}</span>
        <span className="news-region">{signal.region}</span>
      </div>
      <div className="news-card-icon">{signal.icon}</div>
      <h3 className="news-title">{signal.title}</h3>
      <p className="news-body">{signal.body}</p>
      <div className="news-date-row">
        <span className="news-date">{signal.date}</span>
        {signal.slug && <span className="news-read-more">Read full story →</span>}
      </div>
    </article>
  )
  return signal.slug
    ? <Link to={`/news/${signal.slug}`} style={{ textDecoration: 'none', display: 'contents' }}>{inner}</Link>
    : inner
}

export default function News() {
  const [filter, setFilter] = useState('all')
  const [subEmail, setSubEmail] = useState('')
  const { send, status: subStatus } = useFormSubmit()

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!subEmail) return
    await send({ templateId: 'template_subscribe', params: { email: subEmail, source: 'news-signal' } })
  }

  const pinned = SIGNALS.filter(s => s.pinned)
  const rest = SIGNALS.filter(s => !s.pinned && (filter === 'all' || s.type === filter))

  return (
    <div className="news-page">

      {/* Hero */}
      <section className="news-hero">
        <div className="news-hero-inner">
          <p className="kicker">Module 6 — News, Signals & Trust</p>
          <h1 className="news-hero-title">The Downflow Signal</h1>
          <p className="news-hero-sub">
            Milestones, expansion news, sponsor announcements, and system updates.
            No marketing. No noise. Only what is real and what matters.
          </p>
        </div>
      </section>

      {/* Live impact bar */}
      <div className="news-metrics-bar">
        {METRICS.map(m => (
          <div key={m.label} className="news-metric-item">
            <span className="news-metric-icon">{m.icon}</span>
            <strong className="news-metric-val">{m.value}</strong>
            <span className="news-metric-label">{m.label}</span>
            <span className="news-metric-trend">{m.trend}</span>
          </div>
        ))}
      </div>

      <div className="section news-content">

        {/* Pinned */}
        {pinned.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="kicker" style={{ marginBottom: '1rem' }}>Latest & Pinned</p>
            <div className="news-pinned-grid">
              {pinned.map(s => <SignalCard key={s.id} signal={s} featured />)}
            </div>
          </div>
        )}

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginRight: '0.25rem' }}>Filter:</span>
          {[['all', 'All'], ['milestone', '🏆 Milestones'], ['sponsor', '🏦 Sponsors'], ['growth', '🌱 Growth'], ['expansion', '🌍 Expansion'], ['update', '🔧 Updates']].map(([id, label]) => (
            <button key={id} className={`filter-btn${filter === id ? ' active' : ''}`} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>

        <div className="news-grid">
          {rest.map(s => <SignalCard key={s.id} signal={s} />)}
        </div>

        {/* Trust note */}
        <div className="news-trust-note">
          <div className="news-trust-inner">
            <span style={{ fontSize: '1.75rem' }}>🛡️</span>
            <div>
              <strong>What you will never see here</strong>
              <p>Individual student names, performance scores, family information, sponsor logos inside classrooms, or pressure narratives. This feed reports on systems and milestones — never on people.</p>
            </div>
          </div>
        </div>

        {/* Subscribe */}
        <div className="news-subscribe">
          <h3>Stay in the loop</h3>
          <p>Get system updates, expansion news, and milestone reports delivered to sponsors, connectors, and facilitators when they matter.</p>
          {subStatus === 'sent' ? (
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.75rem 1.25rem', background:'rgba(62,207,142,0.1)', border:'1.5px solid var(--green)', borderRadius:'12px', color:'var(--green)', fontWeight:700, fontSize:'0.9rem' }}>
              ✓ You're subscribed. We'll reach out when something real happens.
            </div>
          ) : (
            <form className="news-subscribe-row" onSubmit={handleSubscribe}>
              <input
                className="form-input"
                placeholder="Your email address"
                style={{ maxWidth: '320px' }}
                type="email"
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={subStatus === 'sending'}>
                {subStatus === 'sending' ? 'Subscribing…' : 'Subscribe to Signals'}
              </button>
            </form>
          )}
          <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', marginTop: '0.6rem' }}>No marketing. No frequency pressure. Only real updates.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/sponsor" className="btn btn-primary">Become a Sponsor →</Link>
          <Link to="/curriculum" className="btn btn-secondary">View Curriculum</Link>
          <Link to="/platform" className="btn btn-secondary">Platform Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
