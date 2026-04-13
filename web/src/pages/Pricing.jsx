import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const SPONSOR_TIERS = [
  {
    id: 'cell',
    name: 'Cell Sponsor',
    price: '$2,400',
    period: 'per year',
    color: '#f0c840',
    icon: '💛',
    tagline: 'One cell. Five students. One year.',
    features: [
      '5 students enrolled for a full year',
      '24 weekly sessions (90 min each)',
      'Dedicated facilitator, trained by DOWNFLOW',
      'Real-time sponsor dashboard',
      'Monthly impact reports',
      'Named sponsorship plaque in cell',
      'Priority renewal rights',
    ],
    cta: 'Sponsor a Cell',
    ctaLink: '/funding',
    highlight: true,
  },
  {
    id: 'pack',
    name: 'Pack Sponsor',
    price: '$480',
    period: 'per student / year',
    color: '#5b9bd5',
    icon: '📦',
    tagline: 'Fund one student through one pack.',
    features: [
      '1 student enrolled for a full year',
      'Monthly progress reports to you',
      'Student profile access',
      'Named contribution in cell records',
      'Certificate of impact at year end',
    ],
    cta: 'Sponsor a Student',
    ctaLink: '/funding',
    highlight: false,
  },
  {
    id: 'region',
    name: 'Regional Sponsor',
    price: '$12,000',
    period: 'per year',
    color: '#3ecf8e',
    icon: '🌏',
    tagline: 'Activate a cluster of 5 cells in one region.',
    features: [
      '5 cells funded (25 students)',
      'Regional branding across all cells',
      'Quarterly strategy sessions with DOWNFLOW team',
      'Co-branded marketing materials',
      'Full platform analytics access',
      'Invite to annual DOWNFLOW summit',
      'First right of expansion refusal',
    ],
    cta: 'Discuss Regional Sponsorship',
    ctaLink: '/funding',
    highlight: false,
  },
]

const PARENT_TIERS = [
  {
    id: 'standard',
    name: 'Standard Enrolment',
    price: '$0',
    period: '(sponsor-funded)',
    color: '#4de8b0',
    icon: '🌱',
    tagline: 'Your child joins a sponsored cell at no cost.',
    features: [
      'Full 24-session curriculum',
      'Weekly parent progress reports',
      'Parent dashboard access',
      'Facilitator WhatsApp communication',
      'Completion certificate',
    ],
    cta: 'Find a Cell',
    ctaLink: '/booking',
    highlight: false,
  },
  {
    id: 'direct',
    name: 'Direct Enrolment',
    price: '$480',
    period: 'per year',
    color: '#f0c840',
    icon: '⭐',
    tagline: 'Enrol directly without waiting for sponsorship.',
    features: [
      'All standard enrolment features',
      'Priority seat reservation',
      'Flexible session scheduling',
      'Dedicated facilitator match',
      'Extended parent portal features',
      'Progress benchmark reports',
    ],
    cta: 'Enrol Directly',
    ctaLink: '/booking',
    highlight: true,
  },
]

const FACILITATOR_TIERS = [
  {
    id: 'certified',
    name: 'Certified Facilitator',
    price: 'Free',
    period: 'to join',
    color: '#b083ff',
    icon: '🧭',
    tagline: 'Get trained, get matched, get paid.',
    features: [
      '48-hour online certification',
      'Matched to a cell in your region',
      'Earn $800–$1,200/year per cell',
      'Bonus pay for high cell grades',
      'Platform tools and session materials',
      'Community of practice access',
    ],
    cta: 'Apply as Facilitator',
    ctaLink: '/facilitator-onboarding',
    highlight: false,
  },
  {
    id: 'guider',
    name: 'Student Guider',
    price: 'Earn',
    period: 'from $200/yr',
    color: '#ff9f5a',
    icon: '🏆',
    tagline: 'Graduate students who mentor the next cell.',
    features: [
      'For top-completing students (12+)',
      'Co-facilitate one session per month',
      'Earn per session contribution',
      'Builds toward full facilitator path',
      'Leadership record on DOWNFLOW profile',
    ],
    cta: 'Learn About Guiders',
    ctaLink: '/curriculum',
    highlight: false,
  },
]

const TABS = ['Sponsors', 'Parents & Students', 'Facilitators']

export default function Pricing() {
  usePageMeta('Pricing', 'Transparent pricing for sponsors, parents, and facilitators.')
  const [tab, setTab] = useState(0)

  const tiers = tab === 0 ? SPONSOR_TIERS : tab === 1 ? PARENT_TIERS : FACILITATOR_TIERS

  return (
    <div className="pricing-page">

      {/* ── HERO ── */}
      <section className="pricing-hero">
        <div className="pricing-hero-inner">
          <p className="kicker">Transparent Pricing · No Hidden Fees · Value-Based Structure</p>
          <h1 className="pricing-hero-title">
            Every dollar has a<br />
            <span style={{ color: 'var(--gold)' }}>visible destination.</span>
          </h1>
          <p className="pricing-hero-sub">
            DOWNFLOW is funded by sponsors, not by families. When sponsorship is in place,
            education is free. Our pricing model rewards contribution at every layer.
          </p>
        </div>
      </section>

      {/* ── WHERE MONEY GOES ── */}
      <section className="section pricing-breakdown-section">
        <div className="section-header">
          <p className="kicker">Cost Breakdown</p>
          <h2>Where $2,400 Goes</h2>
          <p className="section-sub">One cell. One year. Full transparency.</p>
        </div>
        <div className="pricing-breakdown-grid">
          {[
            { pct: '40%', amt: '$960', label: 'Facilitator Pay', desc: 'Per-session earnings + bonuses for cell grade performance.' },
            { pct: '25%', amt: '$600', label: 'Curriculum & Materials', desc: 'Printed packs, digital tools, and session consumables.' },
            { pct: '20%', amt: '$480', label: 'Platform & Operations', desc: 'Parent dashboards, recordings, analytics, and support.' },
            { pct: '15%', amt: '$360', label: 'Network & Growth', desc: 'Facilitator training, new cell onboarding, and regional coordination.' },
          ].map(b => (
            <div key={b.label} className="pricing-breakdown-card">
              <div className="pricing-breakdown-pct">{b.pct}</div>
              <div className="pricing-breakdown-amt">{b.amt}</div>
              <h3>{b.label}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="section pricing-tiers-section">
        <div className="section-header">
          <p className="kicker">Who Are You?</p>
          <h2>Pricing By Role</h2>
        </div>
        <div className="pricing-tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`pricing-tab${tab === i ? ' active' : ''}`}
              onClick={() => setTab(i)}
            >{t}</button>
          ))}
        </div>

        <div className="pricing-cards-grid">
          {tiers.map(tier => (
            <div key={tier.id} className={`pricing-card${tier.highlight ? ' highlight' : ''}`} style={{ '--tier-color': tier.color }}>
              {tier.highlight && <div className="pricing-card-badge">Most Popular</div>}
              <div className="pricing-card-icon">{tier.icon}</div>
              <h3 className="pricing-card-name">{tier.name}</h3>
              <div className="pricing-card-price">
                <span className="pricing-price-val">{tier.price}</span>
                <span className="pricing-price-period">{tier.period}</span>
              </div>
              <p className="pricing-card-tagline">{tier.tagline}</p>
              <ul className="pricing-features">
                {tier.features.map(f => (
                  <li key={f}><span className="pricing-check">✓</span>{f}</li>
                ))}
              </ul>
              <Link to={tier.ctaLink} className={`pricing-cta-btn${tier.highlight ? ' gold' : ''}`}>
                {tier.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section pricing-faq-section">
        <div className="section-header">
          <p className="kicker">Common Questions</p>
          <h2>Pricing FAQ</h2>
        </div>
        <div className="pricing-faq-grid">
          {[
            { q: 'Can I sponsor part of a cell?', a: 'Yes — the Pack Sponsor tier lets you fund a single student at $480/year. Five pack sponsors together fund one complete cell.' },
            { q: "What if the cell doesn't complete the year?", a: 'We offer a pro-rated refund or credit toward a new cell. Completion rates are above 90% across all active cells.' },
            { q: 'Are parents ever charged?', a: 'Only when they choose Direct Enrolment ($480/yr). Sponsor-funded cells are always free for families.' },
            { q: 'How do facilitators get paid?', a: 'Via the Earnings Wallet on the platform. Payments are issued monthly, with bonuses tied to cell grade outcomes.' },
            { q: 'Is there a discount for multi-year commitments?', a: 'Yes — 10% for 2-year sponsorships and 20% for 3-year. Contact us for regional partnership pricing.' },
            { q: 'Can I see how my money is spent?', a: 'Yes. Every sponsor gets a real-time dashboard showing session attendance, student progress, and cost-per-outcome data.' },
          ].map(item => (
            <div key={item.q} className="pricing-faq-item">
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section pricing-cta-section">
        <div className="pricing-cta-inner">
          <h2>Start the Conversation</h2>
          <p>Not sure which tier is right for you? We'll help you find the best fit.</p>
          <div className="pricing-cta-btns">
            <Link to="/funding" className="btn btn-gold">Become a Sponsor →</Link>
            <Link to="/support" className="btn btn-secondary">Talk to the Team</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
