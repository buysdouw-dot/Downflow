import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   SOCIAL MEDIA ADS — 4 Audience Segments
   Facilitators · Students · Connectors · Sponsors
───────────────────────────────────────────────────────── */

const ADS = [
  {
    id: 'facilitator',
    segment: 'Facilitators',
    icon: '👩‍🏫',
    color: '#a78bfa',
    platform: 'Instagram / LinkedIn',
    format: 'Vertical Story + Feed Post',
    hook: 'Stop teaching.\nStart building.',
    body: [
      'Earn weekly. Grow your income from 35% → 45%.',
      'Guide students who actually speak, create, and perform.',
      'Not a classroom. A system.',
    ],
    cta: 'Apply to become a facilitator',
    ctaLink: '/facilitator',
    visual: '👩‍🏫 + 🧒🧒🧒🧒🧒',
    hashtags: ['#DownflowSystem', '#FacilitatorLife', '#TeachDifferently', '#EarnWhileYouGuide'],
    target: 'Ages 20–40 · Teachers, tutors, aspiring educators · Vietnam & diaspora',
  },
  {
    id: 'students',
    segment: 'Students',
    icon: '🧒',
    color: '#34d399',
    platform: 'TikTok / Instagram Reels',
    format: 'Short video (15–30 sec)',
    hook: 'This is not school.',
    body: [
      'Speak confidently.',
      'Make videos.',
      'Learn by doing — not memorizing.',
    ],
    cta: 'Join a learning cell',
    ctaLink: '/student',
    visual: '🎤 🎬 🗣️',
    hashtags: ['#LearnDifferently', '#DownflowCell', '#SpeakCreate', '#SchoolOfLife'],
    target: 'Ages 8–16 · Parents of children · English learning communities',
  },
  {
    id: 'connectors',
    segment: 'Connectors',
    icon: '🔗',
    color: '#38bdf8',
    platform: 'Facebook / LinkedIn',
    format: 'Feed Post + Carousel',
    hook: 'Build income by\nbuilding learning groups.',
    body: [
      'Create learning cells.',
      'Earn from registrations + system growth.',
      'No teaching required.',
    ],
    cta: 'Become a connector',
    ctaLink: '/connector',
    visual: '🔗 → 🧩 → 💰',
    hashtags: ['#ConnectorEconomy', '#DownflowConnector', '#PassiveEducationIncome', '#BuildTheCells'],
    target: 'Ages 25–50 · Community leaders, network builders, educators · Referral-focused',
  },
  {
    id: 'sponsors',
    segment: 'Sponsors',
    icon: '💰',
    color: '#f1c40f',
    platform: 'LinkedIn / Email',
    format: 'Sponsored Post + Video',
    hook: "Don't donate.\nBuild.",
    body: [
      'Fund one learning cell.',
      'Track every student.',
      'Watch impact multiply.',
    ],
    cta: 'Sponsor a learning cell',
    ctaLink: '/sponsor',
    visual: '💼 → 📊 → 📈',
    hashtags: ['#ImpactInvesting', '#DownflowSponsor', '#EducationInfrastructure', '#FundOneCell'],
    target: 'Ages 30–60 · Business owners, impact investors, CSR leads · Global',
  },
]

function AdCard({ ad, expanded, onToggle }) {
  return (
    <div className={`sad-card${expanded ? ' expanded' : ''}`} style={{ '--ad-col': ad.color }}>

      {/* Header */}
      <div className="sad-card-header" onClick={onToggle}>
        <div className="sad-header-left">
          <span className="sad-segment-icon">{ad.icon}</span>
          <div>
            <p className="sad-segment">{ad.segment}</p>
            <p className="sad-platform">{ad.platform}</p>
          </div>
        </div>
        <span className="sad-expand-btn">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Ad preview */}
      <div className="sad-preview" style={{ borderColor: ad.color + '40' }}>
        <div className="sad-phone-frame">
          <div className="sad-pf-inner">
            {/* Platform bar */}
            <div className="sad-pf-bar">
              <span className="sad-pf-dot" style={{ background: ad.color }} />
              <span className="sad-pf-name">downflow.official</span>
              <span className="sad-pf-follow" style={{ color: ad.color }}>Follow</span>
            </div>

            {/* Visual area */}
            <div className="sad-pf-visual" style={{ background: `${ad.color}18`, borderColor: `${ad.color}30` }}>
              <span className="sad-pf-visual-icons">{ad.visual}</span>
            </div>

            {/* Hook */}
            <div className="sad-pf-hook">
              {ad.hook.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>

            {/* Body */}
            <div className="sad-pf-body">
              {ad.body.map((line, i) => <p key={i}>{line}</p>)}
            </div>

            {/* CTA */}
            <div className="sad-pf-cta" style={{ background: ad.color }}>
              {ad.cta} →
            </div>

            {/* Hashtags */}
            <div className="sad-pf-tags">
              {ad.hashtags.slice(0, 2).map(h => <span key={h}>{h}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="sad-details">
          <div className="sad-detail-row">
            <span className="sad-dl-label">Format</span>
            <span className="sad-dl-value">{ad.format}</span>
          </div>
          <div className="sad-detail-row">
            <span className="sad-dl-label">Target</span>
            <span className="sad-dl-value">{ad.target}</span>
          </div>
          <div className="sad-detail-row">
            <span className="sad-dl-label">Hashtags</span>
            <div className="sad-hashtag-list">
              {ad.hashtags.map(h => (
                <span key={h} className="sad-hashtag" style={{ color: ad.color }}>{h}</span>
              ))}
            </div>
          </div>
          <div className="sad-copy-block">
            <p className="sad-copy-head">Full Ad Copy</p>
            <div className="sad-copy-text">
              <p className="sad-copy-hook">{ad.hook.replace('\n', ' ')}</p>
              {ad.body.map((line, i) => <p key={i}>{line}</p>)}
              <p className="sad-copy-cta">👉 {ad.cta}</p>
            </div>
          </div>
          <Link to={ad.ctaLink} className="sad-view-btn" style={{ background: ad.color }}>
            View {ad.segment} Page →
          </Link>
        </div>
      )}
    </div>
  )
}

export default function SocialAds() {
  const [expanded, setExpanded] = useState('facilitator')

  return (
    <div className="sad-page">
      <div className="sad-hero">
        <p className="sad-eyebrow">DOWNFLOW — ACQUISITION ENGINE</p>
        <h1 className="sad-title">Social Media Ads</h1>
        <p className="sad-sub">
          4 audience segments · platform-native ad copy · ready to deploy
        </p>
      </div>

      {/* Segment pills */}
      <div className="sad-seg-pills">
        {ADS.map(ad => (
          <button key={ad.id}
            className={`sad-seg-pill${expanded === ad.id ? ' active' : ''}`}
            style={expanded === ad.id ? { background: ad.color, borderColor: ad.color } : {}}
            onClick={() => setExpanded(expanded === ad.id ? null : ad.id)}>
            {ad.icon} {ad.segment}
          </button>
        ))}
      </div>

      <div className="sad-cards-grid">
        {ADS.map(ad => (
          <AdCard key={ad.id} ad={ad}
            expanded={expanded === ad.id}
            onToggle={() => setExpanded(expanded === ad.id ? null : ad.id)} />
        ))}
      </div>

      {/* System summary */}
      <div className="sad-system-summary">
        <h2 className="sad-ss-title">⚡ The Full Ecosystem</h2>
        <div className="sad-ss-grid">
          {[
            { label: 'System UI',           icon: '📱', desc: 'Facilitator app · 8 screens · upload flow' },
            { label: 'Operational Structure', icon: '🏗️', desc: 'Cells · guiders · phases · weekly reviews' },
            { label: 'Growth Engine',        icon: '📈', desc: 'Guider system · compound cells · phases' },
            { label: 'Content Engine',       icon: '🎬', desc: 'Record · edit · upload · cell feed' },
            { label: 'Acquisition Engine',   icon: '📣', desc: '4-segment ads · platform-native · ready' },
          ].map(item => (
            <div key={item.label} className="sad-ss-card">
              <span className="sad-ss-icon">{item.icon}</span>
              <strong>{item.label}</strong>
              <span>{item.desc}</span>
            </div>
          ))}
        </div>
        <p className="sad-ss-truth">
          👉 This is no longer an idea.<br />
          👉 This is a <strong>deployable ecosystem.</strong>
        </p>
      </div>
    </div>
  )
}
