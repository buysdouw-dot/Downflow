import { useState } from 'react'
import SponsorCheckout from '../components/SponsorCheckout.jsx'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const FLOW_ITEMS = [
  { from: 'Sponsor', to: 'Learning Cell', amount: '72,000,000 VND', pct: '100%', color: '#4de8b0', note: 'Full cycle funding — 12 weeks, 6 students' },
  { from: 'Cell Fund', to: 'Facilitator', amount: '18,000,000 VND', pct: '25%', color: '#72d0ff', note: 'Compensation for running 24 sessions' },
  { from: 'Cell Fund', to: 'Connector', amount: '25,200,000 VND', pct: '35%', color: '#ff9f5a', note: 'Registration share + lesson quality share' },
  { from: 'Cell Fund', to: 'Platform Reserve', amount: '18,000,000 VND', pct: '25%', color: '#b083ff', note: 'Operations, infrastructure, maintenance' },
  { from: 'Rebate 9%', to: 'New Cells', amount: '6,480,000 VND', pct: '9%', color: '#d2ad44', note: 'Reinvested automatically to open new cells' },
  { from: 'Rebate 6%', to: 'Student Coins', amount: '4,320,000 VND', pct: '6%', color: '#d2ad44', note: 'Credited to student coin wallets — non-extractable' },
]

const TRANSACTIONS = [
  { id: 'TX-2026-0041', type: 'sponsor', desc: 'TechCorp VN — Cell VN-01 Season 1 funding', amount: '+24,000,000', status: 'confirmed', date: '01 Apr 2026' },
  { id: 'TX-2026-0040', type: 'sponsor', desc: 'GlobalEd DE — Cell DE-01 Season 1 funding', amount: '+24,000,000', status: 'confirmed', date: '28 Mar 2026' },
  { id: 'TX-2026-0039', type: 'payout', desc: 'Facilitator payout — VN-01 Weeks 1–6', amount: '-9,000,000', status: 'paid', date: '25 Mar 2026' },
  { id: 'TX-2026-0038', type: 'payout', desc: 'Connector payout — Nguyen T.H. — VN-01 + VN-02', amount: '-12,600,000', status: 'paid', date: '25 Mar 2026' },
  { id: 'TX-2026-0037', type: 'rebate', desc: 'Rebate 9% — new cell fund — DE-03 Munich', amount: '-2,160,000', status: 'pending', date: '20 Mar 2026' },
  { id: 'TX-2026-0036', type: 'rebate', desc: 'Rebate 6% — student coins — 10 students', amount: '-1,440,000', status: 'paid', date: '20 Mar 2026' },
  { id: 'TX-2026-0035', type: 'sponsor', desc: 'Individual Sponsor — RU-01 Season 1 funding', amount: '+24,000,000', status: 'confirmed', date: '15 Mar 2026' },
]

const TIERS = [
  { icon: '🌱', name: 'Learning Cell Partner', cells: 1, students: 5, cost: '24,000,000 VND / cycle', usd: '~$960 USD', color: '#72d0ff', rebate: '15%', recognition: ['Website listing', 'Public leaderboard', 'End-of-cycle report'] },
  { icon: '🌿', name: 'Growth Partner', cells: 3, students: 15, cost: '72,000,000 VND / cycle', usd: '~$2,880 USD', color: '#d2ad44', rebate: '15%', recognition: ['All above', 'Regional spotlight', 'Video impact reel', 'Priority support'] },
  { icon: '🌳', name: 'Impact Partner', cells: 10, students: 50, cost: '240,000,000 VND / cycle', usd: '~$9,600 USD', color: '#4de8b0', rebate: '15%', recognition: ['All above', 'Named scholarship programme', 'Annual impact summit', 'Succession story feature'] },
]

const RULES = [
  { icon: '🏫', rule: 'Payments go to cells — not individuals', desc: 'Money funds a Learning Cell as a unit. No payment is tied to any individual student, family, or facilitator personally.' },
  { icon: '🔍', rule: 'Full transparency on every flow', desc: 'Every sponsor can see exactly where their money goes. Percentage splits are fixed by the system and cannot be changed.' },
  { icon: '🚫', rule: 'No hidden fees', desc: 'The breakdown is published. Platform reserve, facilitator compensation, connector share, and rebates are all declared upfront.' },
  { icon: '❤️', rule: 'No pressure pricing', desc: 'Families never pay. Students never pay. There is no upsell, no upgrade path, no debt. Sponsors fund access — not outcomes.' },
  { icon: '🔄', rule: 'Rebate funds the next generation', desc: '15% of every cycle is reinvested — 9% into new cells, 6% into student coin wallets. The system grows itself.' },
]


export default function Payments() {
  const [showCheckout, setShowCheckout] = useState(false)
  usePageMeta("Payments", "Transparent payment flows - see how funds move from sponsors to facilitators to students.")

  const [activeTab, setActiveTab] = useState('overview')

  const txColor = (type) => type === 'sponsor' ? '#4de8b0' : type === 'rebate' ? '#d2ad44' : '#72d0ff'

  return (
    <div className="dashboard-page">

      <div className="db-page-header" style={{ background: 'linear-gradient(135deg, #1a2f20 0%, #1a2a1a 100%)' }}>
        <div className="db-header-inner">
          <div>
            <p className="kicker">Module 5 — Payments & Circulation</p>
            <h1 className="db-title">💸 Payments & Circulation</h1>
            <p className="db-subtitle">Where money flows — transparently · Sponsors fund cells · Value circulates · No individual pressure</p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-primary">Download Statement</button>
            <button className="btn btn-secondary">Invite Sponsor</button>
          </div>
        </div>
        <div className="db-stats-row">
          {[
            ['💰', '72M', 'VND This Cycle', 'Total sponsor funding', '#4de8b0'],
            ['🏫', '7', 'Cells Funded', 'Across 3 regions', '#d2ad44'],
            ['🔁', '15%', 'Rebate Rate', '9% cells + 6% coins', '#72d0ff'],
            ['🚫', '0', 'Family Payments', 'Students always free', '#b083ff'],
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

      <div className="db-tabs">
        {[
          ['overview', '📊 Flow Overview'],
          ['per-lesson', '🧮 Per-Lesson Split'],
          ['transactions', '📋 Transactions'],
          ['tiers', '🌿 Sponsor Tiers'],
          ['rules', '⚖️ Money Rules'],
        ].map(([id, label]) => (
          <button key={id} className={`db-tab${activeTab === id ? ' active' : ''}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      <div className="db-content">

        {activeTab === 'per-lesson' && (
          <div className="db-tab-content">
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Every lesson generates <strong>1,080,000 VND</strong> split automatically across 4 wallets.
              The payer (sponsor or family) never changes the percentages — only the source changes.
            </p>

            {/* Summary table */}
            <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
              <h3 className="db-panel-title">📊 Per-Lesson Split Table</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                Base: 180,000 VND × 6 students = 1,080,000 VND per lesson
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 160px 160px', gap: '0', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
                {/* Header */}
                {['Recipient', '%', 'Per Lesson', 'Per Cycle (×24)'].map(h => (
                  <div key={h} style={{ padding: '0.7rem 1rem', background: 'var(--navy)', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
                ))}
                {/* Rows */}
                {[
                  { icon: '🧭', label: 'Facilitator',            pct: '40%', lesson: '432,000',   cycle: '10,368,000', color: '#4de8b0' },
                  { icon: '⚙️', label: 'Platform / Business',    pct: '20%', lesson: '216,000',   cycle: '5,184,000',  color: '#72d0ff' },
                  { icon: '🌱', label: 'Sponsor Pool / Cell Fund',pct: '15%', lesson: '162,000',   cycle: '3,888,000',  color: '#b083ff' },
                  { icon: '🔗', label: 'Connector (3 tranches)',  pct: '25%', lesson: '270,000',   cycle: '6,480,000',  color: '#d2ad44' },
                  { icon: '∑',  label: 'TOTAL',                  pct: '100%',lesson: '1,080,000', cycle: '25,920,000', color: '#fff', bold: true },
                ].map((row, i) => (
                  <>
                    <div key={row.label+'l'} style={{ padding: '0.75rem 1rem', background: row.bold ? 'var(--navy)' : i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-alt)', display: 'flex', alignItems: 'center', gap: '0.6rem', borderTop: row.bold ? '2px solid var(--border)' : '1px solid var(--border)' }}>
                      <span>{row.icon}</span>
                      <strong style={{ color: row.bold ? '#fff' : 'var(--navy)', fontSize: '0.88rem' }}>{row.label}</strong>
                    </div>
                    <div key={row.label+'p'} style={{ padding: '0.75rem 1rem', background: row.bold ? 'var(--navy)' : i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-alt)', fontWeight: 800, color: row.bold ? '#fff' : row.color, fontSize: '0.9rem', borderTop: row.bold ? '2px solid var(--border)' : '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>{row.pct}</div>
                    <div key={row.label+'a'} style={{ padding: '0.75rem 1rem', background: row.bold ? 'var(--navy)' : i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-alt)', fontWeight: 700, color: row.bold ? '#d2ad44' : row.color, fontSize: '0.88rem', borderTop: row.bold ? '2px solid var(--border)' : '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>{row.lesson} VND</div>
                    <div key={row.label+'c'} style={{ padding: '0.75rem 1rem', background: row.bold ? 'var(--navy)' : i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-alt)', fontWeight: 700, color: row.bold ? '#4de8b0' : 'var(--text-soft)', fontSize: '0.88rem', borderTop: row.bold ? '2px solid var(--border)' : '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>{row.cycle} VND</div>
                  </>
                ))}
              </div>
            </div>

            {/* Role explanations */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🧭', label: 'Facilitator — 40%', color: '#4de8b0', vnd: '432,000 / lesson', cycle: '10,368,000 / cycle', items: ['Live lesson delivery', 'Psychological safety & engagement', 'Speaking facilitation', 'Content recording & upload for reuse'] },
                { icon: '⚙️', label: 'Platform — 20%', color: '#72d0ff', vnd: '216,000 / lesson', cycle: '5,184,000 / cycle', items: ['App & server infrastructure', 'Payment processing', 'Admin & coordination', 'Lesson editing, reuse pipeline', 'System buffer & growth'] },
                { icon: '🌱', label: 'Sponsor Pool / Cell Fund — 15%', color: '#b083ff', vnd: '162,000 / lesson', cycle: '3,888,000 / cycle', items: ['Seed new sponsored cells', 'Stabilise attendance gaps', 'Student grant ≈ 260,000 VND after programme', 'Scholarships & de-risk growth'] },
                { icon: '🔗', label: 'Connector — 25%', color: '#d2ad44', vnd: '270,000 / lesson', cycle: '6,480,000 / cycle', items: ['33% on cell launch (2,138,400 VND)', '33% after 1-month stability confirmed', '34% after month 2 / week 8 (2,203,200 VND)', 'Prevents rushed or unethical cells'] },
              ].map(card => (
                <div key={card.label} style={{ background: 'var(--bg-card)', border: `1.5px solid ${card.color}33`, borderLeft: `5px solid ${card.color}`, borderRadius: '12px', padding: '1.1rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.3rem' }}>{card.icon}</span>
                      <strong style={{ color: 'var(--navy)', fontSize: '0.92rem' }}>{card.label}</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ display: 'block', color: card.color, fontSize: '0.88rem' }}>{card.vnd}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{card.cycle}</span>
                    </div>
                  </div>
                  {card.items.map(it => (
                    <div key={it} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.81rem', color: 'var(--text-soft)', padding: '0.18rem 0' }}>
                      <span style={{ color: card.color, flexShrink: 0 }}>→</span>{it}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Immutable rule */}
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--navy)', borderRadius: '14px', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>🔒</span>
              <div>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem', marginBottom: '0.35rem' }}>The Immutable Rule</strong>
                <p style={{ margin: '0 0 0.75rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: 1.7 }}>
                  Whether a lesson is paid by a parent or a sponsor — the split is identical. The payer changes. The ethics, the wallets, and the percentages do not. This makes the system auditable, trustworthy, and scalable.
                </p>
                <code style={{ display: 'block', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.07)', borderRadius: '8px', fontSize: '0.82rem', color: '#4de8b0', fontFamily: 'monospace' }}>
                  splitLesson(total=1,080,000) → 4 wallet credits, always identical
                </code>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link to="/payment-engine" className="btn btn-primary">
                Open Full Payment Engine →
              </Link>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', marginTop: '0.6rem' }}>
                Wallet architecture · SQL schema · Split logic · Coin version
              </p>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="db-tab-content">

            {/* Value flow visual */}
            <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
              <h3 className="db-panel-title">💸 Where Every VND Goes</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.5rem' }}>
                Per cycle · 12 weeks · 6 students · 1 cell. Every split is fixed and transparent.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {FLOW_ITEMS.map(item => (
                  <div key={item.to} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-card-alt)', borderRadius: '10px', border: `1.5px solid ${item.color}33` }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', minWidth: '240px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.from}</span>
                      <span style={{ color: item.color, fontWeight: 700 }}>→</span>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--navy)' }}>{item.to}</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-page)', overflow: 'hidden' }}>
                        <div style={{ width: item.pct, height: '100%', background: item.color, borderRadius: '3px' }} />
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: item.color, minWidth: '80px', textAlign: 'right', fontSize: '0.82rem' }}>{item.pct}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-soft)', minWidth: '160px' }}>{item.amount}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flex: 1 }}>{item.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🔄 The Rebate Loop</h3>
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {[
                      { pct: '85%', label: 'Cell Operations', color: '#4de8b0' },
                      { pct: '9%', label: 'New Cells', color: '#72d0ff' },
                      { pct: '6%', label: 'Student Coins', color: '#d2ad44' },
                    ].map(s => (
                      <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: `6px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: s.color }}>{s.pct}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginTop: '1.25rem', maxWidth: '320px', margin: '1.25rem auto 0' }}>
                    15% of every sponsorship cycles back into the ecosystem — automatically. No approval needed.
                  </p>
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">🪙 Student Coin Wallets</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>
                  Coins are earned through participation, not purchased. The 6% rebate is distributed as coins — not cash.
                </p>
                {[
                  ['How coins are earned', 'Video rep submissions, session attendance, challenges, streaks'],
                  ['What coins unlock', 'Extra pack depth, bonus exercises — never core learning'],
                  ['Can coins be withdrawn', 'No. Coins are learning credits only. No cash value.'],
                  ['Are coins tracked per student', 'Yes — privately. Facilitator and guider can see. Never sponsors.'],
                ].map(([k, v]) => (
                  <div key={k} className="cell-info-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.15rem', padding: '0.65rem 0' }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--navy)' }}>{k}</strong>
                    <span style={{ fontSize: '0.79rem', color: 'var(--text-soft)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="db-tab-content">
            <div className="db-panel">
              <div className="db-panel-header">
                <h3 className="db-panel-title">📋 Transaction Log</h3>
                <button className="btn btn-secondary btn-sm">Export CSV</button>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>All transactions are logged and auditable. No payment is hidden from the system steward.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {TRANSACTIONS.map(tx => (
                  <div key={tx.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-card-alt)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', minWidth: '100px' }}>{tx.id}</span>
                    <span style={{ flex: 1, fontSize: '0.85rem', color: 'var(--navy)' }}>{tx.desc}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: txColor(tx.type), minWidth: '140px', textAlign: 'right' }}>{tx.amount} VND</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '20px', background: tx.status === 'confirmed' ? '#4de8b022' : tx.status === 'paid' ? '#72d0ff22' : '#d2ad4422', color: tx.status === 'confirmed' ? '#4de8b0' : tx.status === 'paid' ? '#72d0ff' : '#a8843e', minWidth: '70px', textAlign: 'center' }}>
                      {tx.status === 'confirmed' ? '✓ Confirmed' : tx.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '90px', textAlign: 'right' }}>{tx.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tiers' && (
          <div className="db-tab-content">
            <p className="lead" style={{ marginBottom: '2rem' }}>Sponsor tiers are based on cells funded — not money spent. Every tier earns the same 15% rebate. Recognition scales with commitment.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {TIERS.map(tier => (
                <div key={tier.name} className="db-panel" style={{ borderTop: `4px solid ${tier.color}`, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '2.5rem', display: 'block' }}>{tier.icon}</span>
                    <h3 style={{ margin: '0.5rem 0 0.25rem', color: 'var(--navy)', fontSize: '1.05rem' }}>{tier.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-soft)' }}>{tier.cells} cell{tier.cells > 1 ? 's' : ''} · {tier.students} students</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: tier.color + '11', borderRadius: '10px', border: `1px solid ${tier.color}33` }}>
                    <strong style={{ display: 'block', fontSize: '1.2rem', color: tier.color }}>{tier.cost}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-soft)' }}>{tier.usd}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Recognition</p>
                    {tier.recognition.map(r => (
                      <div key={r} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-soft)', padding: '0.2rem 0' }}>
                        <span style={{ color: tier.color }}>✓</span> {r}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', padding: '0.65rem', background: '#4de8b011', border: '1px solid #4de8b033', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                    🔄 {tier.rebate} rebate — {tier.cells === 1 ? '1 new cell seeded + student coins' : tier.cells === 3 ? '3+ new cells seeded + student coins' : '10+ new cells seeded + student coins'}
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: '0.25rem' }}>Become a Sponsor →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="db-tab-content">
            <div className="db-panel">
              <h3 className="db-panel-title">⚖️ The Money Rules — Non-Negotiable</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.5rem' }}>
                These rules are hard-coded into the payment architecture. No role — including the System Steward — can override them without restructuring the entire system.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {RULES.map(rule => (
                  <div key={rule.rule} style={{ display: 'flex', gap: '1.25rem', padding: '1.1rem 1.25rem', background: 'var(--bg-card-alt)', borderRadius: '12px', borderLeft: '4px solid #4de8b0' }}>
                    <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{rule.icon}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '0.3rem' }}>{rule.rule}</strong>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-panel" style={{ marginTop: '1.5rem' }}>
              <h3 className="db-panel-title">🔧 Upcoming: Stripe Integration</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>Phase 1 MVP uses manual invoicing. Stripe will be integrated in Phase 2 for automated sponsor billing.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                {[
                  { icon: '💳', label: 'Stripe Payments', desc: 'Automated sponsor billing in USD, EUR, and VND', status: 'Phase 2' },
                  { icon: '🔗', label: 'ClassDojo Webhooks', desc: 'Sync attendance data to coin rewards automatically', status: 'Phase 2' },
                  { icon: '🤖', label: 'Auto-Rebate Engine', desc: 'Automatic 15% rebate split on each payment received', status: 'Phase 3' },
                ].map(item => (
                  <div key={item.label} style={{ padding: '1rem', background: 'var(--bg-card-alt)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.4rem' }}>{item.icon}</span>
                    <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>{item.label}</strong>
                    <p style={{ margin: '0 0 0.6rem', fontSize: '0.78rem', color: 'var(--text-soft)', lineHeight: 1.5 }}>{item.desc}</p>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '20px', background: '#d2ad4422', color: '#a8843e', border: '1px solid #d2ad4444' }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
  {showCheckout && <SponsorCheckout onClose={()=>setShowCheckout(false)} />}
}