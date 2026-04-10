import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   GrowthSystem — Automation Architecture + Full Funnel Map
   Route: /growth-system  (platform only)
───────────────────────────────────────────────────────────── */

const STACK_LAYERS = [
  {
    id: 'traffic',
    label: 'Traffic',
    color: '#5b9bd5',
    icon: '📡',
    tools: ['LinkedIn Ads', 'Facebook/TikTok Ads', 'Cold Email (Instantly)', 'WhatsApp Outreach'],
    description: 'All 4 entry points running simultaneously — sponsors via LinkedIn, teachers via Instagram/TikTok, parents via Facebook, connectors via WhatsApp.',
    entries: [
      { role: 'Sponsor', channel: 'LinkedIn ads + cold email', msg: '"Sponsor 1 learning cell. See measurable human impact."' },
      { role: 'Facilitator', channel: 'TikTok / Instagram', msg: '"Earn weekly. Build something meaningful."' },
      { role: 'Student/Parent', channel: 'Facebook + local communities', msg: '"Confidence > grammar. Real speaking."' },
      { role: 'Connector', channel: 'WhatsApp group admins', msg: '"Build cells. Earn recurring income."' },
    ]
  },
  {
    id: 'enrichment',
    label: 'Clay Enrichment',
    color: '#a259ff',
    icon: '🧪',
    tools: ['Clay', 'LinkedIn enrichment', 'Company data', 'AI first-lines'],
    description: 'Every lead instantly enriched. Job title, company size, income bracket, behaviour signals — all added before human touch.',
    fields: ['Job title', 'Company / org size', 'Income bracket', 'Country / timezone', 'LinkedIn profile', 'Behaviour signals', 'AI-generated first outreach line', 'Sponsorship angle hypothesis'],
  },
  {
    id: 'scoring',
    label: 'HubSpot Scoring',
    color: '#ff7043',
    icon: '🎯',
    tools: ['HubSpot CRM', 'Lead scoring', 'Pipeline stages', 'Smart lists'],
    description: 'Each lead scored automatically by role. Score threshold triggers outreach sequence or assigns sales owner.',
    rules: [
      { role: 'Sponsor', triggers: [{ label: 'Company owner', pts: '+50' }, { label: 'Clicked pricing page', pts: '+30' }, { label: 'Email engagement', pts: '+20' }] },
      { role: 'Facilitator', triggers: [{ label: 'Watched earnings video', pts: '+30' }, { label: 'Submitted application', pts: '+50' }] },
      { role: 'Parent', triggers: [{ label: 'Watched student transformation', pts: '+20' }, { label: 'Filled inquiry form', pts: '+30' }] },
      { role: 'Connector', triggers: [{ label: 'Referred 1+ person', pts: '+40' }, { label: 'Opened 3+ emails', pts: '+25' }] },
    ]
  },
  {
    id: 'personalization',
    label: 'Personalization',
    color: '#00c896',
    icon: '🧠',
    tools: ['Mutiny', 'Segment', 'Dynamic content', 'Role-routing'],
    description: 'Website + email content changes per visitor role. Sponsor sees impact numbers. Teacher sees earnings. Parent sees confidence story.',
    examples: [
      { role: 'Sponsor', sees: '"Fund Human Potential" — impact metrics + reinvestment loop' },
      { role: 'Facilitator', sees: '"Earn Weekly While Building Impact" — payout dashboard preview' },
      { role: 'Parent/Student', sees: '"Confidence Through Action" — student transformation video' },
      { role: 'Connector', sees: '"Build Cells. Earn Recurring Income" — commission phase chart' },
    ]
  },
  {
    id: 'outreach',
    label: 'AI Outreach',
    color: '#ffd740',
    icon: '✉️',
    tools: ['Instantly.ai', 'Lemlist', 'AI email writing', 'Multi-touch sequences'],
    description: 'AI writes personalised messages in your tone per lead. Score threshold triggers sequences. 3-email chains with case studies.',
    sequences: [
      { label: 'Email 1', content: '"We built a system where your funding directly creates measurable human outcomes…"' },
      { label: 'Email 2', content: 'Case study — student transformation story + cell metrics' },
      { label: 'Email 3', content: '"Would you like to sponsor just 1 cell to start?" — low-commitment CTA' },
    ]
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    color: '#5b9bd5',
    icon: '🚀',
    tools: ['Firebase Auth', 'Firestore', 'Email sequences', 'Contract signing'],
    description: 'Role-specific onboarding flow. Sponsor pays → cell created. Teacher applies → contract → assigned to cell. Student joins → first output.',
    paths: [
      { role: 'Sponsor', steps: ['Pays → Stripe webhook', 'Cell auto-created', 'Dashboard opens', 'Facilitator assigned'] },
      { role: 'Facilitator', steps: ['Application form', 'Intro video upload', 'Admin review', 'Contract signed → assigned'] },
      { role: 'Student', steps: ['Join cell → profile created', 'Onboarding tasks', 'Must upload first output'] },
      { role: 'Connector', steps: ['Register → referral code generated', 'Commission tracking starts', 'Phase 1 payout on 1st enrolment'] },
    ]
  },
  {
    id: 'loop',
    label: 'Reinvestment Loop',
    color: '#00c896',
    icon: '🔄',
    tools: ['Firebase triggers', 'Sponsor dashboard', '9% reinvestment', 'Auto cell creation'],
    description: 'The compounding secret. 9% of every sponsor cycle auto-reinvests. Student outputs become marketing. Best ads scaled. System grows itself.',
    flow: [
      'Sponsor funds cell (R25,000 / $1,500 / etc.)',
      'Facilitator teaches → students produce outputs',
      'Outputs visible on Sponsor Dashboard',
      '9% reinvestment balance grows',
      'Sponsor triggers new cell → system scales',
      'Best student videos become next ad creative',
      'Ad → new leads → Clay enriches → score → loop repeats',
    ]
  },
]

const FUNNEL_STAGES = [
  { n: 1, label: 'Traffic', desc: 'Visitors from ads, cold outreach, referrals', kpi: '1,000+ impressions/week', color: '#5b9bd5' },
  { n: 2, label: 'Landing', desc: 'Role-personalised page (Mutiny/Webflow)', kpi: '8–15% form fill rate', color: '#a259ff' },
  { n: 3, label: 'Lead Capture', desc: 'Clay enriches, HubSpot scores, lists update', kpi: '100+ leads/month', color: '#ff7043' },
  { n: 4, label: 'Outreach', desc: 'AI-personalised email sequence triggers at score 50+', kpi: '35–55% open rate', color: '#ffd740' },
  { n: 5, label: 'Conversion', desc: 'Call booked / payment made / application submitted', kpi: '5–12% conversion', color: '#00c896' },
  { n: 6, label: 'Onboarding', desc: 'Role-specific activation flow in Firebase', kpi: '80%+ onboarding completion', color: '#5b9bd5' },
  { n: 7, label: 'Loop', desc: 'Outputs → marketing assets → new traffic → repeat', kpi: 'CAC halves every 3 cycles', color: '#a259ff' },
]

const WORKFLOWS = [
  {
    id: 'sponsor',
    label: '🟦 Sponsor Acquisition',
    steps: [
      'Ad click or cold email reply',
      'Lead enters HubSpot → Clay enriches',
      'Score calculated → threshold triggers sequence',
      'Personalised landing page shown',
      'Sponsor books call or pays direct',
      'Stripe confirms → Firebase creates sponsorCycle + cell',
      'Sponsor dashboard opens with impact metrics',
    ]
  },
  {
    id: 'facilitator',
    label: '🟩 Facilitator Onboarding',
    steps: [
      'Teacher ad click → landing page (payout focus)',
      'Application form submitted → HubSpot stage moves',
      'Intro video upload requested',
      'Admin review → approved/declined',
      'Firebase facilitator profile created',
      'Contract signing stage',
      'Assigned to first cell → teaching starts',
    ]
  },
  {
    id: 'student',
    label: '🟨 Parent/Student Intake',
    steps: [
      'Parent lead captured via Facebook/community',
      'Student age + level form',
      'Best-fit cell suggested',
      'Registration fee paid (if applicable)',
      'Student account created + linked to parent',
      'Student receives onboarding tasks',
      'Must upload first output to complete setup',
    ]
  },
  {
    id: 'connector',
    label: '🟥 Connector Engine',
    steps: [
      'Connector application submitted',
      'Admin approval → referral code generated',
      'Referral dashboard opens',
      'Every referred student tracked by code',
      'Phase 1 payout on first enrolment',
      'Phase 2 at 50% cell completion',
      'Phase 3 at end of cycle',
    ]
  },
]

export default function GrowthSystem() {
  const [activeLayer, setActiveLayer] = useState('traffic')
  const [activeTab, setActiveTab] = useState('architecture')
  const [activeWf, setActiveWf] = useState('sponsor')

  const layer = STACK_LAYERS.find(l => l.id === activeLayer)

  return (
    <div className="gs-page">
      {/* Hero */}
      <div className="gs-hero">
        <div>
          <div className="gs-eyebrow">Growth Operating System</div>
          <h1 className="gs-h1">Automation Architecture</h1>
          <p className="gs-sub">
            Score → Personalise → Test → Adapt in real-time.<br />
            Traffic → Data → Scoring → Personalization → Action → Feedback → Repeat.
          </p>
        </div>
        <div className="gs-loop-badge">
          <span className="gs-loop-icon">♾️</span>
          <div>
            <div className="gs-lb-title">Self-Improving System</div>
            <div className="gs-lb-sub">Outputs feed back into ads. CAC halves every 3 cycles.</div>
          </div>
        </div>
      </div>

      {/* Main tabs */}
      <div className="gs-tabs">
        {['architecture', 'funnel', 'workflows'].map(t => (
          <button key={t} className={`gs-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t === 'architecture' ? '⚙️ Architecture' : t === 'funnel' ? '📊 Full Funnel' : '🔁 Workflows'}
          </button>
        ))}
      </div>

      {/* ── Architecture tab ── */}
      {activeTab === 'architecture' && (
        <div className="gs-arch">
          {/* Layer selector */}
          <div className="gs-layer-nav">
            {STACK_LAYERS.map((l, i) => (
              <button
                key={l.id}
                className={`gs-layer-btn ${activeLayer === l.id ? 'active' : ''}`}
                style={{ '--lc': l.color }}
                onClick={() => setActiveLayer(l.id)}
              >
                <span className="gs-lb-icon">{l.icon}</span>
                <span className="gs-lb-label">{l.label}</span>
                {i < STACK_LAYERS.length - 1 && <span className="gs-lb-arrow">↓</span>}
              </button>
            ))}
          </div>

          {/* Layer detail */}
          {layer && (
            <div className="gs-layer-detail" style={{ '--lc': layer.color }}>
              <div className="gs-ld-header">
                <span className="gs-ld-icon">{layer.icon}</span>
                <div>
                  <div className="gs-ld-title">{layer.label}</div>
                  <p className="gs-ld-desc">{layer.description}</p>
                </div>
              </div>

              <div className="gs-ld-tools">
                {layer.tools.map(t => (
                  <span key={t} className="gs-tool-tag">{t}</span>
                ))}
              </div>

              {/* Traffic entries */}
              {layer.entries && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">Entry Points</div>
                  <div className="gs-entry-grid">
                    {layer.entries.map(e => (
                      <div key={e.role} className="gs-entry-card">
                        <div className="gs-ec-role">{e.role}</div>
                        <div className="gs-ec-ch">{e.channel}</div>
                        <div className="gs-ec-msg">"{e.msg}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clay fields */}
              {layer.fields && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">Enrichment Fields</div>
                  <div className="gs-fields-grid">
                    {layer.fields.map(f => (
                      <div key={f} className="gs-field-tag">✓ {f}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scoring rules */}
              {layer.rules && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">Scoring Rules</div>
                  <div className="gs-rules-grid">
                    {layer.rules.map(r => (
                      <div key={r.role} className="gs-rule-card">
                        <div className="gs-rc-role">{r.role}</div>
                        {r.triggers.map(t => (
                          <div key={t.label} className="gs-rc-trigger">
                            <span>{t.label}</span>
                            <span className="gs-rc-pts">{t.pts}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalization examples */}
              {layer.examples && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">What Each Role Sees</div>
                  {layer.examples.map(e => (
                    <div key={e.role} className="gs-pers-row">
                      <span className="gs-pers-role">{e.role}</span>
                      <span className="gs-pers-sees">{e.sees}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Outreach sequences */}
              {layer.sequences && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">Sponsor Email Sequence (AI-written)</div>
                  {layer.sequences.map(s => (
                    <div key={s.label} className="gs-seq-row">
                      <span className="gs-seq-label">{s.label}</span>
                      <span className="gs-seq-content">{s.content}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Onboarding paths */}
              {layer.paths && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">Role Onboarding Paths</div>
                  <div className="gs-paths-grid">
                    {layer.paths.map(p => (
                      <div key={p.role} className="gs-path-card">
                        <div className="gs-path-role">{p.role}</div>
                        {p.steps.map((s, i) => (
                          <div key={i} className="gs-path-step">
                            <span className="gs-ps-num">{i + 1}</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loop flow */}
              {layer.flow && (
                <div className="gs-ld-section">
                  <div className="gs-ld-sec-label">The Compounding Loop</div>
                  <div className="gs-loop-flow">
                    {layer.flow.map((step, i) => (
                      <div key={i} className="gs-lf-step">
                        <div className="gs-lf-dot" />
                        <span>{step}</span>
                        {i < layer.flow.length - 1 && <div className="gs-lf-line" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Funnel tab ── */}
      {activeTab === 'funnel' && (
        <div className="gs-funnel-panel">
          <div className="gs-funnel-intro">
            <h2 className="gs-fh2">End-to-End Funnel</h2>
            <p className="gs-fsub">7 stages from first impression to reinvestment loop. Each stage has target KPIs and conversion benchmarks.</p>
          </div>

          <div className="gs-funnel-stages">
            {FUNNEL_STAGES.map((s, i) => {
              const width = 100 - i * 10
              return (
                <div key={s.n} className="gs-fstage" style={{ '--fw': `${width}%`, '--fc': s.color }}>
                  <div className="gs-fstage-bar" />
                  <div className="gs-fstage-content">
                    <div className="gs-fs-num">{s.n}</div>
                    <div className="gs-fs-info">
                      <strong>{s.label}</strong>
                      <span>{s.desc}</span>
                    </div>
                    <div className="gs-fs-kpi">{s.kpi}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="gs-funnel-math">
            <h3>Conversion Math (Conservative)</h3>
            <div className="gs-fm-grid">
              <div className="gs-fm-row"><span>Monthly impressions</span><strong>10,000</strong></div>
              <div className="gs-fm-row"><span>Landing page form fills (10%)</span><strong>1,000</strong></div>
              <div className="gs-fm-row"><span>Qualified leads (score 50+)</span><strong>400</strong></div>
              <div className="gs-fm-row"><span>Email sequence opens (40%)</span><strong>160</strong></div>
              <div className="gs-fm-row gs-fm-highlight"><span>Conversions (8%)</span><strong>32 new users</strong></div>
              <div className="gs-fm-row"><span>Mix: ~4 sponsors, 8 teachers, 20 students/parents</span><strong>—</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* ── Workflows tab ── */}
      {activeTab === 'workflows' && (
        <div className="gs-wf-panel">
          <div className="gs-wf-tabs">
            {WORKFLOWS.map(w => (
              <button key={w.id} className={`gs-wf-tab ${activeWf === w.id ? 'active' : ''}`} onClick={() => setActiveWf(w.id)}>
                {w.label}
              </button>
            ))}
          </div>

          {WORKFLOWS.filter(w => w.id === activeWf).map(wf => (
            <div key={wf.id} className="gs-wf-steps">
              {wf.steps.map((step, i) => (
                <div key={i} className="gs-wf-step">
                  <div className="gs-wfs-left">
                    <div className="gs-wfs-num">{i + 1}</div>
                    {i < wf.steps.length - 1 && <div className="gs-wfs-line" />}
                  </div>
                  <div className="gs-wfs-content">{step}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
