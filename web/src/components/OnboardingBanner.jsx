// ============================================================
// DOWNFLOW Onboarding Banners
// Role-specific welcome flows: Parent · Connector · Facilitator · Sponsor
// Based on onboarding visual design system (Slide 11)
// ============================================================

import { useState } from 'react'
import { HexIcon } from './HexSymbols.jsx'

const ONBOARDING = {
  sponsor: {
    hex: 'sponsor',
    color: '#d2ad44',
    gradient: 'linear-gradient(135deg, rgba(210,173,68,0.12), rgba(210,173,68,0.04))',
    border: 'rgba(210,173,68,0.3)',
    title: 'Welcome to DOWNFLOW — Sponsor Portal',
    subtitle: 'You are funding real learning. Here is how your investment flows.',
    steps: [
      { icon:'🏦', title:'Explore the Packs', desc:'Browse 10 evidence-based content packs. Gift one to a cell of 5 students in Vietnam, Germany, or Russia.' },
      { icon:'🌱', title:'Support the Journey', desc:'Your 15% rebate reinvests 9% back into growth and sends 6% directly to student coin wallets as recognition.' },
      { icon:'📊', title:'Track Real Impact', desc:'Watch your cell\'s weekly progress — attendance, speaking scores, video submissions. No noise, only signal.' },
      { icon:'🛡️', title:'Your Ethical Boundaries', desc:'You never interact with students directly. The platform enforces this automatically. Your brand stays protected.' },
    ],
    cta: 'View My Dashboard',
    ctaNote: 'Your first cell is ready to be funded.',
  },
  student: {
    hex: 'cell',
    color: '#4de8b0',
    gradient: 'linear-gradient(135deg, rgba(77,232,176,0.1), rgba(77,232,176,0.03))',
    border: 'rgba(77,232,176,0.25)',
    title: 'Welcome to Your Learning Cell',
    subtitle: 'A small group, a big journey. This is your space to grow.',
    steps: [
      { icon:'👥', title:'Join the Learning', desc:'You\'re in a cell of 5 students. Same age, same region. You\'ll grow together over 12 weekly sessions.' },
      { icon:'🔄', title:'Uplifting Growth', desc:'Every video rep, every session, every micro-challenge earns you coins and builds your streak.' },
      { icon:'⭐', title:'Monitoring Growth', desc:'Your Student Guider tracks progress privately. No public rankings — only your own growth matters.' },
      { icon:'🚀', title:'Your Pathway', desc:'Student → Student Guider → ASG → Intern Facilitator → Facilitator. Every step is earned, never given.' },
    ],
    cta: 'Start My Journey',
    ctaNote: 'Session 1 is waiting for you.',
  },
  facilitator: {
    hex: 'growth',
    color: '#72d0ff',
    gradient: 'linear-gradient(135deg, rgba(114,208,255,0.1), rgba(114,208,255,0.03))',
    border: 'rgba(114,208,255,0.25)',
    title: 'Facilitator Guide — DOWNFLOW',
    subtitle: 'You don\'t teach. You create conditions for students to discover.',
    steps: [
      { icon:'🧭', title:'Overview of Roles', desc:'You run 2–4 learning cells. Each has a Student Guider you develop. Your job is facilitation, not instruction.' },
      { icon:'📋', title:'Facilitator Guide', desc:'Use the session structure template: warm-up → video → discussion → challenge → reflection. 60 minutes, every time.' },
      { icon:'🏫', title:'Connected Learner Cell', desc:'Each cell is a micro-ecosystem. Health score, streak, weekly GPA, video count — you monitor all of it.' },
      { icon:'📈', title:'Monitoring Growth', desc:'SG readiness scores tell you who is ready to progress. You nominate, the platform confirms.' },
    ],
    cta: 'Open My Cells',
    ctaNote: 'Your cells are active and waiting.',
  },
  connector: {
    hex: 'equitable',
    color: '#ff9f5a',
    gradient: 'linear-gradient(135deg, rgba(255,159,90,0.1), rgba(255,159,90,0.03))',
    border: 'rgba(255,159,90,0.25)',
    title: 'Connector Onboarding — DOWNFLOW',
    subtitle: 'You build cells. You earn per cell. You grow the network.',
    steps: [
      { icon:'🔗', title:'Join the Network', desc:'A Connector forms learning cells by recruiting 5 students, pairing with a facilitator, and securing a sponsor.' },
      { icon:'💰', title:'Your Earnings', desc:'Registration share: 1,200,000 VND. Lesson share: 2,400,000 VND. Total per cell: 3,600,000 VND per cycle.' },
      { icon:'🛡️', title:'Safe Participation', desc:'You never interact with students during sessions. Your role ends at cell formation. The cell runs itself.' },
      { icon:'📊', title:'Track & Expand', desc:'Monitor your active cells, trigger new formations, and grow your connector network across regions.' },
    ],
    cta: 'Form My First Cell',
    ctaNote: 'Start with 5 students and one facilitator.',
  },
}

export default function OnboardingBanner({ role = 'sponsor', onDismiss }) {
  const [step, setStep] = useState(0)
  const cfg = ONBOARDING[role] || ONBOARDING.sponsor
  const isLast = step === cfg.steps.length - 1

  return (
    <div className="onboarding-banner" style={{
      background: cfg.gradient,
      borderColor: cfg.border,
      '--ob-color': cfg.color,
    }}>
      <div className="ob-header">
        <HexIcon type={cfg.hex} size={52} glow/>
        <div className="ob-header-text">
          <h2 className="ob-title">{cfg.title}</h2>
          <p className="ob-subtitle">{cfg.subtitle}</p>
        </div>
        <button className="ob-dismiss" onClick={onDismiss} title="Dismiss">✕</button>
      </div>

      <div className="ob-steps">
        {cfg.steps.map((s, i) => (
          <div
            key={i}
            className={`ob-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
            onClick={() => setStep(i)}
          >
            <div className="ob-step-num">
              {i < step ? '✓' : i + 1}
            </div>
            <div className="ob-step-body">
              <strong>{s.icon} {s.title}</strong>
              {i === step && <p className="ob-step-desc">{s.desc}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="ob-footer">
        <div className="ob-progress-dots">
          {cfg.steps.map((_, i) => (
            <button
              key={i}
              className={`ob-dot${i === step ? ' active' : ''}`}
              onClick={() => setStep(i)}
            />
          ))}
        </div>
        <div className="ob-actions">
          {step > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={() => setStep(s => s - 1)}>← Back</button>
          )}
          {!isLast ? (
            <button className="btn btn-primary btn-sm" onClick={() => setStep(s => s + 1)}>Next →</button>
          ) : (
            <button className="btn btn-primary" onClick={onDismiss} style={{background:`linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)`}}>
              {cfg.cta}
            </button>
          )}
        </div>
        {isLast && <p className="ob-cta-note">{cfg.ctaNote}</p>}
      </div>
    </div>
  )
}
