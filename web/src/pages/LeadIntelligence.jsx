import React from 'react'
import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   LeadIntelligence — Lead scoring, CRM pipeline, enrichment
   Route: /lead-intelligence  (platform only)
───────────────────────────────────────────────────────────── */

const MOCK_LEADS = [
  { id: 'ld_001', fullName: 'Jane Smith', email: 'jane@acme.com', type: 'sponsor', source: 'linkedin_ad', campaign: 'sponsor_april_2026', score: 82, status: 'qualified', company: 'Acme Group', jobTitle: 'CEO', country: 'South Africa', tags: ['high_intent', 'south_africa'] },
  { id: 'ld_002', fullName: 'Peter Nkosi', email: 'peter@gmail.com', type: 'facilitator', source: 'tiktok_ad', campaign: 'teacher_q2', score: 61, status: 'contacted', company: '', jobTitle: 'English Teacher', country: 'South Africa', tags: ['teaching_exp'] },
  { id: 'ld_003', fullName: 'Linh Nguyen', email: 'linh@vn.com', type: 'student', source: 'facebook_group', campaign: 'parent_vn', score: 44, status: 'new', company: '', jobTitle: 'Parent', country: 'Vietnam', tags: [] },
  { id: 'ld_004', fullName: 'David Mensah', email: 'david@mensah.co', type: 'connector', source: 'referral', campaign: '', score: 73, status: 'qualified', company: 'Mensah Networks', jobTitle: 'Recruiter', country: 'Ghana', tags: ['network_strong'] },
  { id: 'ld_005', fullName: 'Anna Müller', email: 'anna@corp.de', type: 'sponsor', source: 'cold_email', campaign: 'sponsor_de_march', score: 55, status: 'new', company: 'Corp GmbH', jobTitle: 'CSR Director', country: 'Germany', tags: [] },
  { id: 'ld_006', fullName: 'Ravi Sharma', email: 'ravi@edu.in', type: 'facilitator', source: 'whatsapp', campaign: '', score: 38, status: 'new', company: '', jobTitle: 'Tutor', country: 'India', tags: [] },
]

const PIPELINES = {
  sponsor: {
    label: 'Sponsor Pipeline',
    color: '#5b9bd5',
    stages: ['New', 'Enriched', 'Scored 50+', 'Case Study Sent', 'Call Booked', 'Paid'],
    counts: [12, 9, 7, 4, 3, 2],
  },
  facilitator: {
    label: 'Facilitator Pipeline',
    color: '#00c896',
    stages: ['New', 'Enriched', 'Applied', 'Video Submitted', 'Review', 'Onboarded'],
    counts: [18, 15, 11, 8, 4, 3],
  },
  student: {
    label: 'Parent/Student Pipeline',
    color: '#ffd740',
    stages: ['New', 'Form Filled', 'Cell Matched', 'Fee Paid', 'Account Created', 'Active'],
    counts: [45, 32, 24, 18, 15, 12],
  },
  connector: {
    label: 'Connector Pipeline',
    color: '#ff7043',
    stages: ['New', 'Applied', 'Approved', 'Code Active', '1st Referral', 'Phase 2'],
    counts: [10, 7, 5, 4, 3, 2],
  },
}

const SCORE_RULES = {
  sponsor: [
    { trigger: 'Company owner / CEO / Founder', pts: 50 },
    { trigger: 'Clicked pricing / sponsor page', pts: 30 },
    { trigger: 'Email opened 3+ times', pts: 20 },
    { trigger: 'Watched impact video >60s', pts: 25 },
    { trigger: 'Attended webinar', pts: 40 },
  ],
  facilitator: [
    { trigger: 'Watched payout video >90s', pts: 30 },
    { trigger: 'Submitted application form', pts: 50 },
    { trigger: 'Opened email 2+ times', pts: 15 },
    { trigger: 'Has teaching experience (enriched)', pts: 25 },
  ],
  student: [
    { trigger: 'Watched student transformation video', pts: 20 },
    { trigger: 'Filled inquiry form', pts: 30 },
    { trigger: 'Opened welcome email', pts: 10 },
    { trigger: 'Clicked cell signup link', pts: 35 },
  ],
  connector: [
    { trigger: 'Local network size ≥ 500 (enriched)', pts: 40 },
    { trigger: 'Referred 1+ person', pts: 40 },
    { trigger: 'Opened commission detail email', pts: 25 },
    { trigger: 'WhatsApp group admin (enriched)', pts: 35 },
  ],
}

const ROLE_COLORS = { sponsor: '#5b9bd5', facilitator: '#00c896', student: '#ffd740', connector: '#ff7043' }

function ScoreBadge({ score }) {
  const bg = score >= 70 ? '#00c896' : score >= 45 ? '#ffd740' : '#ff7043'
  return (
    <span style={{
      background: `${bg}22`,
      border: `1px solid ${bg}55`,
      color: bg,
      borderRadius: 5,
      padding: '2px 8px',
      fontSize: '0.78rem',
      fontWeight: 700,
    }}>{score}</span>
  )
}

export default function LeadIntelligence() {
  const [activeTab, setActiveTab] = useState('leads')
  const [activePipeline, setActivePipeline] = useState('sponsor')
  const [activeScore, setActiveScore] = useState('sponsor')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)

  const filtered = MOCK_LEADS.filter(l => {
    if (filterType !== 'all' && l.type !== filterType) return false
    if (filterStatus !== 'all' && l.status !== filterStatus) return false
    if (search && !l.fullName.toLowerCase().includes(search.toLowerCase()) && !l.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const pipeline = PIPELINES[activePipeline]
  const maxCount = Math.max(...pipeline.counts)

  return (
    <div className="li-page">
      {/* Hero */}
      <div className="li-hero">
        <div>
          <div className="li-eyebrow">CRM + Growth Intelligence</div>
          <h1 className="li-h1">Lead Intelligence</h1>
          <p className="li-sub">AI-scored leads, enriched profiles, pipeline stages and outreach triggers. Every role has its own scoring logic and pipeline.</p>
        </div>
        <div className="li-hero-stats">
          {Object.entries(PIPELINES).map(([k, p]) => (
            <div key={k} className="li-hs" style={{ '--pc': p.color }}>
              <span className="li-hs-label">{k}</span>
              <span className="li-hs-val">{p.counts[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="li-tabs">
        {['leads', 'pipeline', 'scoring'].map(t => (
          <button key={t} className={`li-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t === 'leads' ? '👥 All Leads' : t === 'pipeline' ? '📊 Pipeline' : '🎯 Score Rules'}
          </button>
        ))}
      </div>

      {/* ── Leads tab ── */}
      {activeTab === 'leads' && (
        <div className="li-leads-panel">
          <div className="li-filters">
            <input className="li-search" placeholder="Search name or email…" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="li-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">All types</option>
              <option value="sponsor">Sponsor</option>
              <option value="facilitator">Facilitator</option>
              <option value="student">Student</option>
              <option value="connector">Connector</option>
            </select>
            <select className="li-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          <div className="li-leads-table">
            <div className="li-table-header">
              <span>Name</span><span>Type</span><span>Company</span><span>Source</span><span>Score</span><span>Status</span>
            </div>
            {filtered.map(lead => (
              <div key={lead.id} className={`li-table-row ${selectedLead?.id === lead.id ? 'selected' : ''}`} onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}>
                <span>
                  <div className="li-lead-name">{lead.fullName}</div>
                  <div className="li-lead-email">{lead.email}</div>
                </span>
                <span>
                  <span className="li-type-badge" style={{ '--tc': ROLE_COLORS[lead.type] || '#888' }}>{lead.type}</span>
                </span>
                <span className="li-lead-co">{lead.company || '—'}</span>
                <span className="li-lead-src">{lead.source.replace(/_/g, ' ')}</span>
                <span><ScoreBadge score={lead.score} /></span>
                <span>
                  <span className={`li-status-badge li-s-${lead.status}`}>{lead.status}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Lead detail */}
          {selectedLead && (
            <div className="li-lead-detail">
              <div className="li-ld-header">
                <div>
                  <div className="li-ld-name">{selectedLead.fullName}</div>
                  <div className="li-ld-email">{selectedLead.email} · {selectedLead.country}</div>
                </div>
                <button className="li-ld-close" onClick={() => setSelectedLead(null)}>✕</button>
              </div>

              <div className="li-ld-grid">
                <div className="li-ld-field"><span>Job Title</span><strong>{selectedLead.jobTitle || '—'}</strong></div>
                <div className="li-ld-field"><span>Company</span><strong>{selectedLead.company || '—'}</strong></div>
                <div className="li-ld-field"><span>Source</span><strong>{selectedLead.source.replace(/_/g, ' ')}</strong></div>
                <div className="li-ld-field"><span>Campaign</span><strong>{selectedLead.campaign || '—'}</strong></div>
                <div className="li-ld-field"><span>Score</span><strong><ScoreBadge score={selectedLead.score} /></strong></div>
                <div className="li-ld-field"><span>Status</span><strong>{selectedLead.status}</strong></div>
              </div>

              {selectedLead.tags.length > 0 && (
                <div className="li-ld-tags">
                  {selectedLead.tags.map(t => <span key={t} className="li-tag">{t}</span>)}
                </div>
              )}

              <div className="li-ld-actions">
                <button className="li-action-btn primary">📧 Trigger Outreach</button>
                <button className="li-action-btn">✅ Mark Qualified</button>
                <button className="li-action-btn">📞 Log Call</button>
                <button className="li-action-btn danger">⚠️ Disqualify</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Pipeline tab ── */}
      {activeTab === 'pipeline' && (
        <div className="li-pipeline-panel">
          <div className="li-pipeline-tabs">
            {Object.entries(PIPELINES).map(([k, p]) => (
              <button key={k} className={`li-pipe-tab ${activePipeline === k ? 'active' : ''}`} style={{ '--pc': p.color }} onClick={() => setActivePipeline(k)}>
                {k}
              </button>
            ))}
          </div>

          <div className="li-pipeline-chart">
            <div className="li-pc-title">{pipeline.label}</div>
            <div className="li-pc-stages">
              {pipeline.stages.map((stage, i) => {
                const pct = Math.round((pipeline.counts[i] / maxCount) * 100)
                const convRate = i > 0 ? Math.round((pipeline.counts[i] / pipeline.counts[i - 1]) * 100) : 100
                return (
                  <div key={stage} className="li-stage">
                    <div className="li-stage-label">{stage}</div>
                    <div className="li-stage-bar-wrap">
                      <div className="li-stage-bar" style={{ width: `${pct}%`, background: pipeline.color }} />
                      <span className="li-stage-count">{pipeline.counts[i]}</span>
                    </div>
                    {i > 0 && (
                      <div className="li-stage-conv" style={{ color: convRate >= 70 ? '#00c896' : convRate >= 50 ? '#ffd740' : '#ff7043' }}>
                        {convRate}% from previous
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="li-pipe-insight">
            <div className="li-pi-icon">💡</div>
            <div>
              <strong>Biggest drop-off:</strong>
              <span> Stage 2 → Stage 3 typically. Focus enrichment + scoring triggers here to push more leads past the 50-point threshold faster.</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Scoring tab ── */}
      {activeTab === 'scoring' && (
        <div className="li-scoring-panel">
          <div className="li-score-role-tabs">
            {Object.keys(SCORE_RULES).map(r => (
              <button key={r} className={`li-sr-tab ${activeScore === r ? 'active' : ''}`} style={{ '--rc': ROLE_COLORS[r] }} onClick={() => setActiveScore(r)}>
                {r}
              </button>
            ))}
          </div>

          <div className="li-score-rules">
            <div className="li-sr-header">
              <div className="li-srh-title">Scoring Rules — {activeScore}</div>
              <div className="li-srh-note">Threshold to trigger outreach: <strong>50 points</strong></div>
            </div>
            {SCORE_RULES[activeScore].map((rule, i) => (
              <div key={i} className="li-sr-rule">
                <div className="li-srr-trigger">{rule.trigger}</div>
                <div className="li-srr-bar-wrap">
                  <div className="li-srr-bar" style={{ width: `${rule.pts}%`, background: ROLE_COLORS[activeScore] }} />
                </div>
                <div className="li-srr-pts">+{rule.pts}</div>
              </div>
            ))}

            <div className="li-score-sim">
              <div className="li-ss-title">Score Simulator</div>
              <div className="li-ss-sub">Example: Sponsor CEO who clicked pricing + opened email 3x</div>
              <div className="li-ss-result">
                <span>CEO (+50) + Clicked pricing (+30) + Email opens (+20)</span>
                <strong>=&nbsp;100 points → Auto-trigger outreach ✓</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
