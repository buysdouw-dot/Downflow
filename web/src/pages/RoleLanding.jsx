import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

/* ─────────────────────────────────────────────────────────
   ROLE LANDING PAGES — 4 Segments
   Sponsor · Facilitator · Student · Connector
   Route: /join?role=sponsor|facilitator|student|connector
───────────────────────────────────────────────────────── */

/* ── Shared components ── */
function Section({ children, dark }) {
  return <section className={`rl-section${dark ? ' dark' : ''}`}>{children}</section>
}

function Check({ children }) {
  return <li className="rl-check"><span>✓</span><span>{children}</span></li>
}

function Step({ num, title, desc, color }) {
  return (
    <div className="rl-step">
      <div className="rl-step-num" style={{ background: color + '22', color }}>{num}</div>
      <div><p className="rl-step-title">{title}</p><p className="rl-step-desc">{desc}</p></div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   SPONSOR LANDING
══════════════════════════════════════════════════════════ */
function SponsorPage() {
  return (
    <div className="rl-page">
      {/* Hero */}
      <div className="rl-hero sponsor">
        <p className="rl-eyebrow">DOWNFLOW — SCHOOL OF LIFE · SPONSOR</p>
        <h1 className="rl-headline">Don't Donate.<br />Build Learning That<br /><span className="rl-accent sponsor">Multiplies.</span></h1>
        <p className="rl-lead">Fund one learning cell. Track every student. Watch impact compound.</p>
        <div className="rl-hero-btns">
          <Link to="/sponsor" className="rl-cta-btn sponsor">Sponsor a Cell — R25,000</Link>
          <Link to="/model" className="rl-secondary-btn">▶ See the Model</Link>
        </div>
      </div>

      {/* Problem */}
      <Section dark>
        <h2 className="rl-sh">The Problem with Education Funding</h2>
        <div className="rl-2col">
          <div className="rl-problem-card">
            <p className="rl-pc-head">❌ Traditional Donation</p>
            <ul className="rl-problem-list">
              <li>No visibility into outcomes</li>
              <li>No measurable impact</li>
              <li>Doesn't scale</li>
              <li>Relies on trust, not data</li>
            </ul>
          </div>
          <div className="rl-problem-card solution">
            <p className="rl-pc-head">✅ Downflow Sponsorship</p>
            <ul className="rl-problem-list green">
              <li>Track every student's progress</li>
              <li>See content from every session</li>
              <li>Your cell compounds over time</li>
              <li>Transparent earnings distribution</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Model */}
      <Section>
        <h2 className="rl-sh">The Simple Loop</h2>
        <div className="rl-loop-row">
          {[
            { icon: '💼', label: 'You Fund', sub: '1 Learning Cell' },
            { icon: '→', label: '', plain: true },
            { icon: '🧩', label: 'Cell Activates', sub: '5–6 Students + Facilitator' },
            { icon: '→', label: '', plain: true },
            { icon: '📊', label: 'You Track', sub: 'Every session, every clip' },
            { icon: '→', label: '', plain: true },
            { icon: '📈', label: 'Value Grows', sub: 'Students become guiders' },
          ].map((item, i) => item.plain
            ? <span key={i} className="rl-loop-arrow">→</span>
            : (
              <div key={i} className="rl-loop-node sponsor">
                <span className="rl-ln-icon">{item.icon}</span>
                <p className="rl-ln-label">{item.label}</p>
                <p className="rl-ln-sub">{item.sub}</p>
              </div>
            )
          )}
        </div>
      </Section>

      {/* What you fund */}
      <Section dark>
        <h2 className="rl-sh">What R25,000 Funds</h2>
        <div className="rl-fund-grid">
          {[
            { icon: '👩‍🏫', label: 'Facilitator', desc: 'Paid weekly · Phase-based earnings' },
            { icon: '🧒', label: '5–6 Students', desc: 'Full cycle of guided learning' },
            { icon: '🎬', label: 'Content Production', desc: 'Every session recorded & uploaded' },
            { icon: '📊', label: 'Your Dashboard', desc: 'Real-time tracking & transparency' },
          ].map(f => (
            <div key={f.label} className="rl-fund-card">
              <span className="rl-fc-icon">{f.icon}</span>
              <p className="rl-fc-label">{f.label}</p>
              <p className="rl-fc-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Compounding */}
      <Section>
        <h2 className="rl-sh">Compounding Growth</h2>
        <p className="rl-body-text">Students who complete the program become guiders for the next cell. Your investment doesn't end — it multiplies.</p>
        <div className="rl-compound-visual">
          {[1, 2, 4, 8].map((n, i) => (
            <div key={i} className="rl-cv-tier">
              {Array(n).fill(0).map((_, j) => (
                <span key={j} className="rl-cv-cell" style={{ animationDelay: `${(i + j) * 0.1}s` }}>🧩</span>
              ))}
              <span className="rl-cv-label">Year {i + 1}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="rl-final-cta sponsor">
        <h2>Ready to build — not donate?</h2>
        <p>One cell. Visible impact. Compounding value.</p>
        <Link to="/sponsor" className="rl-cta-btn sponsor large">Sponsor a Learning Cell</Link>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   FACILITATOR LANDING
══════════════════════════════════════════════════════════ */
function FacilitatorPage() {
  return (
    <div className="rl-page">
      <div className="rl-hero facilitator">
        <p className="rl-eyebrow">DOWNFLOW — SCHOOL OF LIFE · FACILITATOR</p>
        <h1 className="rl-headline">Earn Weekly.<br />Grow as You <span className="rl-accent facilitator">Build.</span></h1>
        <p className="rl-lead">Guide students who speak, create, and perform. Not a classroom — a system where you earn more as you expand it.</p>
        <div className="rl-hero-btns">
          <Link to="/facilitator" className="rl-cta-btn facilitator">Apply Now</Link>
          <Link to="/facilitator-film" className="rl-secondary-btn">▶ Watch Film</Link>
        </div>
      </div>

      <Section dark>
        <h2 className="rl-sh">The Role</h2>
        <div className="rl-2col">
          <div>
            <p className="rl-body-text">You don't deliver content. You activate production. Students speak, present, and perform — you guide the process.</p>
            <ul className="rl-checklist">
              <Check>Run 2 sessions per week</Check>
              <Check>Record key class moments</Check>
              <Check>Assign daily speaking reps</Check>
              <Check>Upload content to the platform</Check>
            </ul>
          </div>
          <div className="rl-role-visual">
            <div className="rl-rv-center">👩‍🏫</div>
            {['🧒','👧','🧑','👦','👩'].map((s, i) => (
              <div key={i} className="rl-rv-student" style={{ '--a': `${i * 72}deg` }}>{s}</div>
            ))}
          </div>
        </div>
      </Section>

      {/* Payment */}
      <Section>
        <h2 className="rl-sh">How You Earn</h2>
        <div className="rl-phases-row">
          {[
            { n: 1, pct: 35, label: 'Starting Facilitator', trigger: 'Join system', color: '#72d0ff', icon: '🌱' },
            { n: 2, pct: 40, label: 'Consistent Performance', trigger: 'Stable 4+ weeks', color: '#4de8b0', icon: '📈' },
            { n: 3, pct: 45, label: 'System Builder', trigger: 'Recruit facilitator', color: '#f5c842', icon: '⭐' },
          ].map(p => (
            <div key={p.n} className="rl-phase-card" style={{ '--pc': p.color }}>
              <span className="rl-pc-icon">{p.icon}</span>
              <span className="rl-pc-phase">Phase {p.n}</span>
              <span className="rl-pc-pct" style={{ color: p.color }}>{p.pct}%</span>
              <span className="rl-pc-label">{p.label}</span>
              <span className="rl-pc-trigger">{p.trigger}</span>
            </div>
          ))}
        </div>
        <p className="rl-pay-note">Weekly payouts · Every Friday · Grows as you expand the system</p>
      </Section>

      <Section dark>
        <h2 className="rl-sh">Growth via Recruiting</h2>
        <p className="rl-body-text">Bring a new facilitator into the system — and your earnings jump to Phase 3 (45%). You don't just teach. You build.</p>
        <div className="rl-growth-flow">
          <div className="rl-gf-node you">You<br/><small>Phase 2</small></div>
          <span className="rl-gf-arrow">→ recruit →</span>
          <div className="rl-gf-node new">New Facilitator<br/><small>Phase 1</small></div>
          <span className="rl-gf-arrow">→</span>
          <div className="rl-gf-node unlock">You unlock<br/><small style={{ color: '#f5c842' }}>Phase 3 · 45%</small></div>
        </div>
      </Section>

      <div className="rl-final-cta facilitator">
        <h2>"Stop teaching. Start building."</h2>
        <p>This is where teachers don't burn out — they build.</p>
        <Link to="/facilitator" className="rl-cta-btn facilitator large">Apply as Facilitator</Link>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   STUDENT LANDING
══════════════════════════════════════════════════════════ */
function StudentPage() {
  return (
    <div className="rl-page">
      <div className="rl-hero student">
        <p className="rl-eyebrow">DOWNFLOW — SCHOOL OF LIFE · STUDENT</p>
        <h1 className="rl-headline">This is Not School.<br />This is <span className="rl-accent student">Real Learning.</span></h1>
        <p className="rl-lead">Speak confidently. Make videos. Learn by doing — not memorizing. In a small group that actually knows you.</p>
        <div className="rl-hero-btns">
          <Link to="/student" className="rl-cta-btn student">Join a Learning Cell</Link>
          <Link to="/curriculum" className="rl-secondary-btn">See the Curriculum</Link>
        </div>
      </div>

      <Section dark>
        <h2 className="rl-sh">Speak. Create. Perform.</h2>
        <div className="rl-activity-grid">
          {[
            { icon: '🗣️', title: 'Speaking',     desc: 'Real conversations, not drills' },
            { icon: '🎬', title: 'Create Videos', desc: 'Daily reps you actually watch back' },
            { icon: '🎤', title: 'Perform',       desc: 'Present to your cell, earn coins' },
            { icon: '🤝', title: 'Small Groups',  desc: '5–6 people who know your name' },
          ].map(a => (
            <div key={a.title} className="rl-activity-card">
              <span className="rl-ac-icon">{a.icon}</span>
              <p className="rl-ac-title">{a.title}</p>
              <p className="rl-ac-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="rl-sh">Daily Reps — 5 to 7 Minutes</h2>
        <p className="rl-body-text">Every day you get a short speaking task. Record it. Upload it. Watch your confidence grow week by week.</p>
        <div className="rl-rep-timeline">
          {['Mon','Tue','Wed','Thu','Fri'].map((d, i) => (
            <div key={d} className="rl-rep-day">
              <div className="rl-rd-dot" style={{ background: i < 3 ? '#4de8b0' : 'rgba(255,255,255,0.15)' }}>{i < 3 ? '✓' : ''}</div>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <h2 className="rl-sh">Confidence Grows. Coins Too.</h2>
        <div className="rl-2col center">
          <div className="rl-growth-card">
            <p className="rl-gc-week">Week 1</p>
            <div className="rl-gc-bar"><div style={{ width: '35%', background: '#4de8b0' }} /></div>
            <p className="rl-gc-label">First introduction</p>
          </div>
          <div className="rl-growth-card">
            <p className="rl-gc-week">Week 8</p>
            <div className="rl-gc-bar"><div style={{ width: '85%', background: '#a78bfa' }} /></div>
            <p className="rl-gc-label">Presenting to the group</p>
          </div>
        </div>
        <p className="rl-body-text center">Your cell earns coins together. The better the group performs, the more coins flow to everyone.</p>
      </Section>

      <div className="rl-final-cta student">
        <h2>"This is not school."</h2>
        <p>It's a place where you find your voice.</p>
        <Link to="/student" className="rl-cta-btn student large">Join a Learning Cell</Link>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   CONNECTOR LANDING
══════════════════════════════════════════════════════════ */
function ConnectorPage() {
  return (
    <div className="rl-page">
      <div className="rl-hero connector">
        <p className="rl-eyebrow">DOWNFLOW — SCHOOL OF LIFE · CONNECTOR</p>
        <h1 className="rl-headline">Build Learning Groups.<br />Earn From <span className="rl-accent connector">Growth.</span></h1>
        <p className="rl-lead">Create learning cells. Earn from registrations and system growth. No teaching required.</p>
        <div className="rl-hero-btns">
          <Link to="/connector" className="rl-cta-btn connector">Become a Connector</Link>
          <Link to="/social-ads" className="rl-secondary-btn">See the Model</Link>
        </div>
      </div>

      <Section dark>
        <h2 className="rl-sh">What a Connector Does</h2>
        <div className="rl-step-list">
          <Step num="1" title="Create a Learning Cell" desc="Connect a sponsor, a facilitator, and 5–6 students." color="#38bdf8" />
          <Step num="2" title="Register the Cell" desc="Submit through the platform — gets verified and activated." color="#38bdf8" />
          <Step num="3" title="Earn from Registrations" desc="You earn for every cell you bring into the system." color="#38bdf8" />
          <Step num="4" title="Earn from Growth" desc="As your cells grow and produce outcomes, your income compounds." color="#38bdf8" />
        </div>
      </Section>

      <Section>
        <h2 className="rl-sh">No Teaching Required</h2>
        <div className="rl-2col">
          <div>
            <p className="rl-body-text">You don't run classes. You build networks. Connect the right people and earn from the value they create.</p>
            <ul className="rl-checklist">
              <Check>Find sponsors in your network</Check>
              <Check>Recruit qualified facilitators</Check>
              <Check>Register student groups</Check>
              <Check>Track your cells from dashboard</Check>
            </ul>
          </div>
          <div className="rl-connector-visual">
            <div className="rl-cnv-center">🔗</div>
            <div className="rl-cnv-nodes">
              {['💼 Sponsor','👩‍🏫 Facilitator','🧒 Students'].map(n => (
                <div key={n} className="rl-cnv-node">{n}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section dark>
        <h2 className="rl-sh">Earnings from the System</h2>
        <div className="rl-earn-table">
          {[
            { action: 'Cell registration', earn: 'One-time fee' },
            { action: 'Cell completes cycle', earn: 'Bonus payout' },
            { action: 'Cell grows to new guider', earn: 'Compound earning' },
            { action: 'You recruit new connector', earn: 'Network fee' },
          ].map(r => (
            <div key={r.action} className="rl-et-row">
              <span className="rl-et-action">{r.action}</span>
              <span className="rl-et-earn connector">→ {r.earn}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="rl-final-cta connector">
        <h2>"Build income by building learning groups."</h2>
        <p>No classroom. No teaching. Just connections that earn.</p>
        <Link to="/connector" className="rl-cta-btn connector large">Become a Connector</Link>
      </div>
    </div>
  )
}

/* ── Role selector / router ── */
const ROLE_PAGES = { sponsor: SponsorPage, facilitator: FacilitatorPage, student: StudentPage, connector: ConnectorPage }
const ROLES = [
  { id: 'sponsor',     label: '💰 Sponsor',     color: '#f1c40f' },
  { id: 'facilitator', label: '👩‍🏫 Facilitator', color: '#a78bfa' },
  { id: 'student',     label: '🧒 Student',      color: '#34d399' },
  { id: 'connector',   label: '🔗 Connector',    color: '#38bdf8' },
]


export default function RoleLanding() {
  usePageMeta("Join DOWNFLOW", "Apply as a Sponsor, Facilitator, Student or Connector. Every role earns. Every role grows.")

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const initialRole = params.get('role') || 'sponsor'
  const [role, setRole] = useState(ROLES.find(r => r.id === initialRole)?.id || 'sponsor')
  const Page = ROLE_PAGES[role]
  const activeRole = ROLES.find(r => r.id === role)

  return (
    <div>
      <div className="rl-role-switcher">
        <p className="rl-rs-label">I am a:</p>
        {ROLES.map(r => (
          <button key={r.id}
            className={`rl-rs-btn${r.id === role ? ' active' : ''}`}
            style={r.id === role ? { background: r.color, borderColor: r.color, color: '#000' } : {}}
            onClick={() => setRole(r.id)}>
            {r.label}
          </button>
        ))}
      </div>
      <Page />
    </div>
  )
}
