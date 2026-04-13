import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

/* ─────────────────────────────────────────────────────────
   AUTOMATED FUNNEL — 7-Step System
   Ads → Landing → Signup → Redirect → Onboarding → Notifications → Retention
───────────────────────────────────────────────────────── */

const ROLES = ['facilitator', 'student', 'sponsor', 'connector']
const ROLE_META = {
  facilitator: { label: '👩‍🏫 Facilitator', color: '#a78bfa' },
  student:     { label: '🧒 Student',      color: '#34d399' },
  sponsor:     { label: '💰 Sponsor',      color: '#f1c40f' },
  connector:   { label: '🔗 Connector',    color: '#38bdf8' },
}

const STEPS = [
  {
    num: '01',
    icon: '📣',
    title: 'Ads',
    sub: 'Entry Point',
    color: '#f97316',
    desc: 'Role-targeted ads on social platforms drive cold traffic to the funnel.',
    platforms: {
      facilitator: ['Instagram Stories', 'LinkedIn Sponsored'],
      student:     ['TikTok 15s', 'Instagram Reels'],
      sponsor:     ['LinkedIn Feed', 'Email Campaign'],
      connector:   ['Facebook Carousel', 'LinkedIn Post'],
    },
    details: {
      facilitator: '"Stop teaching. Start building." — targets teachers 20–40',
      student:     '"This is not school." — targets parents + kids 8–16',
      sponsor:     '"Don\'t donate. Build." — targets business owners 30–60',
      connector:   '"Build income by building learning groups." — network builders 25–50',
    },
  },
  {
    num: '02',
    icon: '🌐',
    title: 'Landing Page',
    sub: 'Role-Specific Page',
    color: '#a78bfa',
    desc: 'Each ad links to a dedicated landing page that speaks directly to that role.',
    details: {
      facilitator: 'Earn Weekly. Grow as You Build. → Apply Now',
      student:     'This is Not School. → Join a Learning Cell',
      sponsor:     'Don\'t Donate. Build Learning. → Sponsor a Cell',
      connector:   'Build Learning Groups. → Become a Connector',
    },
    link: { label: 'View Role Pages →', to: '/join' },
  },
  {
    num: '03',
    icon: '📝',
    title: 'Signup Flow',
    sub: 'Role-Specific Form',
    color: '#38bdf8',
    desc: 'Custom signup fields per role capture exactly the info needed to activate them.',
    fields: {
      facilitator: ['Name', 'Teaching experience', 'Upload intro video'],
      student:     ['Age', 'Parent contact', 'Learning goals'],
      sponsor:     ['Budget selection', 'Number of cells', 'Company / CSR details'],
      connector:   ['Network size', 'Location', 'Community type'],
    },
  },
  {
    num: '04',
    icon: '⚡',
    title: 'Auto-Redirect',
    sub: 'Dashboard Preview',
    color: '#4de8b0',
    desc: 'After signup, users are instantly sent to a role-specific dashboard preview with a clear next step.',
    details: {
      facilitator: '→ Facilitator onboarding screen + "Book demo class"',
      student:     '→ Student cell assignment preview + "Start intro video"',
      sponsor:     '→ Sponsor dashboard preview + "Activate a cell"',
      connector:   '→ Connector tools preview + "Create your first cell"',
    },
  },
  {
    num: '05',
    icon: '🎓',
    title: 'Onboarding',
    sub: 'Automated Activation',
    color: '#6c63ff',
    desc: 'Each role gets a tailored onboarding sequence that guides them through first actions.',
    steps: {
      facilitator: ['Invite to demo class', 'Training video (system)', 'Assigned first cell'],
      student:     ['Assigned to cell', 'Intro video task', 'First daily rep'],
      sponsor:     ['Dashboard access granted', 'Cell activation form', 'First student progress report'],
      connector:   ['Cell creation tools unlocked', 'Tracking dashboard tour', 'First referral link'],
    },
  },
  {
    num: '06',
    icon: '🔔',
    title: 'Notifications',
    sub: 'Engagement System',
    color: '#f5c842',
    desc: 'Automated messages keep every role engaged and on track throughout the cycle.',
    items: {
      facilitator: ['Class reminder 1h before', 'Upload reminder 48h deadline', 'Weekly earnings summary'],
      student:     ['Daily rep reminder', 'Session time alert', 'Coin milestone notification'],
      sponsor:     ['New student clip uploaded', 'Weekly cell report', 'Compound growth milestone'],
      connector:   ['New cell registration bonus', 'Cell health alert', 'Network growth summary'],
    },
  },
  {
    num: '07',
    icon: '🔁',
    title: 'Retention Loop',
    sub: 'Compound Growth',
    color: '#e05a5a',
    desc: 'The system drives itself forward — performance tracking, coin rewards, and guider accountability keep every participant in the cycle.',
    items: {
      facilitator: ['Weekly performance score', 'Phase promotion tracking', 'Guider accountability score'],
      student:     ['Confidence growth progress', 'Coins earned & distributed', 'Clip library growing'],
      sponsor:     ['Student progress visibility', 'Cell compound tracking', 'ROI reporting dashboard'],
      connector:   ['Cells under management', 'Registration + bonus earnings', 'Network growth stats'],
    },
  },
]

function RolePill({ role, active, onClick }) {
  const m = ROLE_META[role]
  return (
    <button className={`af-role-pill${active ? ' active' : ''}`}
      style={active ? { background: m.color, borderColor: m.color, color: '#000' } : {}}
      onClick={onClick}>
      {m.label}
    </button>
  )
}

function StepCard({ step, role, active, onClick }) {
  const isExpanded = active
  const roleColor = ROLE_META[role].color

  const renderBody = () => {
    if (step.fields)   return <ul className="af-field-list">{step.fields[role].map((f, i) => <li key={i}><span className="af-field-bullet" style={{ background: roleColor }} />  {f}</li>)}</ul>
    if (step.steps)    return <ul className="af-field-list">{step.steps[role].map((s, i) => <li key={i}><span className="af-field-num" style={{ background: step.color }}>{i+1}</span> {s}</li>)}</ul>
    if (step.items)    return <ul className="af-field-list">{step.items[role].map((s, i) => <li key={i}><span style={{ color: step.color }}>→</span> {s}</li>)}</ul>
    if (step.platforms) return (
      <div>
        <div className="af-platforms">
          {step.platforms[role].map(p => <span key={p} className="af-platform-tag" style={{ borderColor: step.color, color: step.color }}>{p}</span>)}
        </div>
        <p className="af-role-detail">{step.details[role]}</p>
      </div>
    )
    if (step.details) return <p className="af-role-detail">{step.details[role]}</p>
    return null
  }

  return (
    <div className={`af-step-card${isExpanded ? ' expanded' : ''}`}
      style={{ '--step-col': step.color }}
      onClick={onClick}>
      <div className="af-sc-header">
        <div className="af-sc-left">
          <div className="af-sc-num" style={{ background: step.color + '22', color: step.color }}>{step.num}</div>
          <div>
            <p className="af-sc-title">{step.title}</p>
            <p className="af-sc-sub">{step.sub}</p>
          </div>
        </div>
        <span className="af-sc-icon">{step.icon}</span>
        <span className="af-sc-chevron">{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <div className="af-sc-body">
          <p className="af-sc-desc">{step.desc}</p>
          <div className="af-sc-role-block" style={{ borderColor: roleColor + '50', background: roleColor + '0d' }}>
            <p className="af-sc-rb-head" style={{ color: roleColor }}>{ROLE_META[role].label}</p>
            {renderBody()}
          </div>
          {step.link && (
            <Link to={step.link.to} className="af-sc-link" style={{ color: step.color }}>{step.link.label}</Link>
          )}
        </div>
      )}
    </div>
  )
}


export default function AutoFunnel() {
  usePageMeta("Automated Funnel", "The DOWNFLOW 7-step acquisition and activation system - from ads to retention, fully automated.")

  const [role, setRole] = useState('facilitator')
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="af-page">
      {/* Hero */}
      <div className="af-hero">
        <p className="af-eyebrow">DOWNFLOW — SCHOOL OF LIFE</p>
        <h1 className="af-title">Automated Funnel</h1>
        <p className="af-sub">7-step acquisition &amp; activation system · 4 audience segments · fully automated</p>
      </div>

      {/* Flow diagram */}
      <div className="af-flow-strip">
        {STEPS.map((s, i) => (
          <div key={s.num} className="af-flow-node" onClick={() => setActiveStep(i === activeStep ? null : i)}>
            <div className="af-fn-circle" style={{ background: s.color + '22', color: s.color, borderColor: s.color + '60' }}>
              {s.icon}
            </div>
            <p className="af-fn-label" style={{ color: i === activeStep ? s.color : undefined }}>{s.title}</p>
            {i < STEPS.length - 1 && <div className="af-fn-arrow">→</div>}
          </div>
        ))}
      </div>

      {/* Role switcher */}
      <div className="af-role-switcher">
        <p className="af-rs-label">Filter by role:</p>
        {ROLES.map(r => (
          <RolePill key={r} role={r} active={r === role} onClick={() => setRole(r)} />
        ))}
      </div>

      {/* Step cards */}
      <div className="af-steps">
        {STEPS.map((step, i) => (
          <StepCard
            key={step.num}
            step={step}
            role={role}
            active={i === activeStep}
            onClick={() => setActiveStep(i === activeStep ? null : i)}
          />
        ))}
      </div>

      {/* System flow summary */}
      <div className="af-system-flow">
        <h2 className="af-sf-title">🔥 System Flow</h2>
        <div className="af-sf-chain">
          {['Ads', 'Landing', 'Signup', 'Onboarding', 'Cell Activation', 'Content', 'Tracking', 'Growth', 'Reinvestment'].map((item, i, arr) => (
            <span key={item} className="af-sf-item">
              <span className="af-sf-node">{item}</span>
              {i < arr.length - 1 && <span className="af-sf-arrow">→</span>}
            </span>
          ))}
        </div>
        <p className="af-sf-tagline">
          👉 Not an app. Not a school.<br />
          A <strong>self-growing learning infrastructure.</strong>
        </p>
        <div className="af-sf-links">
          <Link to="/join" className="af-sf-btn primary">View Role Pages</Link>
          <Link to="/facilitator-onboarding" className="af-sf-btn">Facilitator Onboarding</Link>
          <Link to="/social-ads" className="af-sf-btn">Social Ads</Link>
        </div>
      </div>
    </div>
  )
}
