import { useState } from 'react'

// ─── Core constants from blueprint ───────────────────────────────────────────
const LESSON_PRICE_PER_STUDENT = 180000   // VND
const STUDENTS_PER_CELL        = 6
const LESSONS_PER_CYCLE        = 24
const LESSON_TOTAL             = LESSON_PRICE_PER_STUDENT * STUDENTS_PER_CELL  // 1,080,000
const CYCLE_TOTAL              = LESSON_TOTAL * LESSONS_PER_CYCLE               // 25,920,000

const WALLETS = [
  {
    id:      'facilitator',
    icon:    '🧭',
    label:   'Facilitator',
    role:    'Core English teacher',
    pct:     40,
    perLesson: 432000,
    perCycle:  10368000,
    color:   '#4de8b0',
    timing:  'Paid per lesson delivered',
    used_for: [
      'Live lesson delivery',
      'Safety & engagement',
      'Speaking facilitation',
      'Content recording & upload for reuse',
    ],
  },
  {
    id:      'platform',
    icon:    '⚙️',
    label:   'Platform',
    role:    'Business / system sustainability',
    pct:     20,
    perLesson: 216000,
    perCycle:  5184000,
    color:   '#72d0ff',
    timing:  'Auto-deducted per lesson',
    used_for: [
      'App & server costs',
      'Payment processing',
      'Admin & coordination',
      'Lesson editing & reuse',
      'System buffer & growth',
    ],
  },
  {
    id:      'cell-fund',
    icon:    '🌱',
    label:   'Sponsor Pool / Cell Fund',
    role:    'Access & growth reserve',
    pct:     15,
    perLesson: 162000,
    perCycle:  3888000,
    color:   '#b083ff',
    timing:  'Held in escrow, released post-cycle',
    used_for: [
      'Seed new sponsored cells',
      'Stabilise attendance gaps',
      'Grant students ~1% each after programme (≈260,000 VND)',
      'Support scholarships',
      'De-risk growth',
    ],
  },
  {
    id:      'connector',
    icon:    '🔗',
    label:   'Connector',
    role:    'Cell formation & stability',
    pct:     25,
    perLesson: 270000,
    perCycle:  6480000,
    color:   '#d2ad44',
    timing:  'Released in 3 tranches over cycle',
    used_for: [
      '33% on cell launch (activation)',
      '33% after 1-month stability + growth',
      '34% after 2-month (week 8) stability',
    ],
    tranches: [
      { pct: '33%', amount: 2138400, label: 'Tranche 1 — Cell launch', color: '#4de8b0' },
      { pct: '33%', amount: 2138400, label: 'Tranche 2 — Month 1 stability', color: '#d2ad44' },
      { pct: '34%', amount: 2203200, label: 'Tranche 3 — Month 2 (week 8)', color: '#b083ff' },
    ],
  },
]

const COIN_EQUIVALENTS = [
  { action: 'Attend a session',       coins: 5,  cashEquiv: '9,000 VND',  note: '1% of lesson value per student' },
  { action: 'Submit video rep',       coins: 5,  cashEquiv: '9,000 VND',  note: 'Output production reward' },
  { action: 'Complete a challenge',   coins: 15, cashEquiv: '27,000 VND', note: '3× attendance rate' },
  { action: '7-session streak',       coins: 20, cashEquiv: '36,000 VND', note: 'Consistency premium' },
  { action: 'Help a peer',            coins: 10, cashEquiv: '18,000 VND', note: 'Social value creation' },
  { action: 'Content reused by cell', coins: 25, cashEquiv: '45,000 VND', note: 'Asset creation premium' },
]

const COIN_SPENDS = [
  { item: 'TA session (Vietnamese)',     cost: 20, cashEquiv: '50,000 VND' },
  { item: 'TA session (German/Russian)', cost: 25, cashEquiv: '60,000 VND' },
  { item: 'Extra pack depth',            cost: '30–40', cashEquiv: '65,000–85,000 VND' },
  { item: 'Premium mini-lesson',         cost: 15, cashEquiv: '30,000 VND' },
]

const PSEUDO_CODE = `// ─── WALLET SPLIT ENGINE ──────────────────────────────────
// Triggered: every time a lesson payment is confirmed

function splitLesson(paymentEvent) {
  const {
    lessonId,
    cellId,
    payerType,   // 'sponsor' | 'family'
    totalVND,    // always 1,080,000 regardless of payer
  } = paymentEvent

  // Fixed split — payer identity NEVER changes percentages
  const split = {
    facilitator : totalVND * 0.40,   // 432,000 VND
    platform    : totalVND * 0.20,   // 216,000 VND
    cellFund    : totalVND * 0.15,   // 162,000 VND
    connector   : totalVND * 0.25,   // 270,000 VND (held)
  }

  // Facilitator → immediate release to facilitator wallet
  creditWallet('FACILITATOR', cellId, split.facilitator)

  // Platform → immediate deduction to platform reserve
  creditWallet('PLATFORM', 'global', split.platform)

  // Cell Fund → held in escrow until cycle end
  creditEscrow('CELL_FUND', cellId, split.cellFund, {
    releaseCondition: 'cycle_complete',
    studentGrant: split.cellFund / STUDENTS_PER_CELL  // ~27,000/student/lesson
  })

  // Connector → held, released in 3 tranches
  holdForTranches('CONNECTOR', cellId, split.connector, [
    { pct: 0.33, trigger: 'cell_launched'          },
    { pct: 0.33, trigger: 'stability_month_1'      },
    { pct: 0.34, trigger: 'stability_month_2_wk8'  },
  ])

  logTransaction(lessonId, split, payerType)
}

// ─── STABILITY CHECK (auto-runs weekly) ─────────────────
function checkStability(cellId, week) {
  const cell = getCell(cellId)
  return (
    cell.attendanceRate >= 0.80   &&  // ≥80% attendance
    cell.participationScore > 0   &&  // active engagement
    cell.ethicsFlags === 0        &&  // zero pressure signals
    cell.outputCount > 0              // ≥1 reusable asset
  )
}

// ─── TRANCHE RELEASE ENGINE ──────────────────────────────
function releaseTranche(cellId, trigger) {
  const held = getHeldConnectorFunds(cellId)
  const tranche = held.tranches.find(t => t.trigger === trigger)

  if (!tranche || tranche.released) return
  if (trigger !== 'cell_launched' && !checkStability(cellId)) return

  const amount = held.totalConnector * tranche.pct
  creditWallet('CONNECTOR', cellId, amount)
  tranche.released = true
  tranche.releasedAt = now()
  logPayout(cellId, 'connector_tranche', amount, trigger)
}

// ─── CYCLE END: STUDENT GRANTS ───────────────────────────
function closeCycle(cellId) {
  const escrow = getCellFundEscrow(cellId)
  const students = getActiveStudents(cellId)

  // ~1% of total per student (260,000 VND across 24 lessons)
  const grantPerStudent = escrow.total / students.length

  students.forEach(student => {
    creditCoinWallet(student.id, vndToCoins(grantPerStudent))
  })

  // Remaining goes to scholarship pool
  const remainder = escrow.total - (grantPerStudent * students.length)
  creditWallet('SCHOLARSHIP_POOL', 'global', remainder)
}`

const SQL_SCHEMA = `-- ─── WALLET TABLES ──────────────────────────────────────────
CREATE TABLE wallets (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_type   TEXT NOT NULL,  -- 'facilitator'|'platform'|'cell_fund'|'connector'
  owner_id     TEXT NOT NULL,  -- cell_id or 'global'
  balance_vnd  BIGINT DEFAULT 0,
  coins        INT    DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lesson_splits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id       UUID NOT NULL REFERENCES lessons(id),
  cell_id         TEXT NOT NULL,
  payer_type      TEXT NOT NULL,  -- 'sponsor' | 'family'
  total_vnd       BIGINT NOT NULL,  -- always 1,080,000
  facilitator_vnd BIGINT NOT NULL,  -- 40%
  platform_vnd    BIGINT NOT NULL,  -- 20%
  cell_fund_vnd   BIGINT NOT NULL,  -- 15%
  connector_vnd   BIGINT NOT NULL,  -- 25% (held)
  split_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE connector_tranches (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cell_id     TEXT NOT NULL,
  tranche_num SMALLINT NOT NULL,  -- 1, 2, 3
  pct         NUMERIC(5,2),        -- 33, 33, 34
  amount_vnd  BIGINT NOT NULL,
  trigger     TEXT NOT NULL,       -- 'cell_launched' | 'stability_month_1' | ...
  released    BOOLEAN DEFAULT FALSE,
  released_at TIMESTAMPTZ
);

CREATE TABLE student_grants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cell_id     TEXT NOT NULL,
  student_id  UUID NOT NULL,
  coins       INT NOT NULL,
  vnd_equiv   BIGINT NOT NULL,
  reason      TEXT DEFAULT 'cycle_completion_grant',
  granted_at  TIMESTAMPTZ DEFAULT now()
);

-- ─── SPLIT FUNCTION (PostgreSQL) ─────────────────────────
CREATE OR REPLACE FUNCTION process_lesson_split(
  p_lesson_id UUID, p_cell_id TEXT,
  p_total_vnd BIGINT, p_payer_type TEXT
) RETURNS VOID AS $$
DECLARE
  fac_amt  BIGINT := (p_total_vnd * 0.40)::BIGINT;
  plt_amt  BIGINT := (p_total_vnd * 0.20)::BIGINT;
  cf_amt   BIGINT := (p_total_vnd * 0.15)::BIGINT;
  con_amt  BIGINT := p_total_vnd - fac_amt - plt_amt - cf_amt;
BEGIN
  INSERT INTO lesson_splits VALUES (
    gen_random_uuid(), p_lesson_id, p_cell_id, p_payer_type,
    p_total_vnd, fac_amt, plt_amt, cf_amt, con_amt, now()
  );
  UPDATE wallets SET balance_vnd = balance_vnd + fac_amt
    WHERE owner_type='facilitator' AND owner_id=p_cell_id;
  UPDATE wallets SET balance_vnd = balance_vnd + plt_amt
    WHERE owner_type='platform'    AND owner_id='global';
  UPDATE wallets SET balance_vnd = balance_vnd + cf_amt
    WHERE owner_type='cell_fund'   AND owner_id=p_cell_id;
  UPDATE wallets SET balance_vnd = balance_vnd + con_amt
    WHERE owner_type='connector'   AND owner_id=p_cell_id;
END;
$$ LANGUAGE plpgsql;`

export default function PaymentEngine() {
  const [activeTab, setActiveTab] = useState('flow')
  const [lessonCount, setLessonCount] = useState(1)

  const mult = lessonCount
  const total = LESSON_TOTAL * mult

  return (
    <div className="dashboard-page">

      <div className="db-page-header" style={{ background: 'linear-gradient(135deg, #0f1f12 0%, #162018 100%)' }}>
        <div className="db-header-inner">
          <div>
            <p className="kicker">Financial Architecture — Per-Lesson Split Engine</p>
            <h1 className="db-title">💸 Payment Engine</h1>
            <p className="db-subtitle">
              4 wallets · Fixed percentages · Payer-agnostic · Auto-split per lesson · Smart tranche release
            </p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-secondary">Export Spec</button>
          </div>
        </div>
        <div className="db-stats-row">
          {[
            ['💰', '180,000', 'VND / student',     'Per lesson',       '#4de8b0'],
            ['🏫', '1,080,000', 'VND / lesson',    '6 students × 180k','#d2ad44'],
            ['🔄', '24', 'Lessons / cycle',         '4 months',         '#72d0ff'],
            ['📦', '25,920,000', 'VND / cycle',    'Full cell value',  '#b083ff'],
          ].map(([icon, val, label, sub, color]) => (
            <div key={label} className="db-stat-card" style={{ '--stat-color': color }}>
              <span className="db-stat-icon">{icon}</span>
              <div>
                <p className="db-stat-value" style={{ fontSize: '1rem' }}>{val}</p>
                <p className="db-stat-label">{label}</p>
                <p className="db-stat-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="db-tabs">
        {[
          ['flow',    '📊 Flow Diagram'],
          ['wallets', '👛 Wallet Structure'],
          ['calc',    '🧮 Live Calculator'],
          ['code',    '💻 Split Logic'],
          ['sql',     '🗄 SQL Schema'],
          ['coins',   '🪙 Coin Version'],
        ].map(([id, label]) => (
          <button key={id} className={`db-tab${activeTab === id ? ' active' : ''}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      <div className="db-content">

        {/* ── FLOW DIAGRAM ── */}
        {activeTab === 'flow' && (
          <div className="db-tab-content">
            <p className="lead" style={{ marginBottom: '2rem' }}>
              Every lesson generates 1,080,000 VND, split automatically across 4 wallets.
              The payer (sponsor or family) <strong>never changes the split</strong> — only the source changes.
            </p>

            {/* Source row */}
            <div className="pe-flow-wrap">
              <div className="pe-payers-row">
                {[
                  { icon: '🏦', label: 'Sponsor', sub: 'Funds entire cell', color: '#4de8b0' },
                  { icon: '👨‍👩‍👧', label: 'Family', sub: 'Pays if no sponsor', color: '#72d0ff' },
                ].map(p => (
                  <div key={p.label} className="pe-payer-box" style={{ borderColor: p.color }}>
                    <span style={{ fontSize: '1.75rem' }}>{p.icon}</span>
                    <strong style={{ color: 'var(--navy)' }}>{p.label}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{p.sub}</span>
                  </div>
                ))}
              </div>

              {/* Merge arrow */}
              <div className="pe-merge-row">
                <div className="pe-merge-line"/>
                <div className="pe-central-box">
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>LESSON PAYMENT</strong>
                  <span style={{ color: '#4de8b0', fontSize: '1.1rem', fontWeight: 800 }}>1,080,000 VND</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>6 students × 180,000 VND</span>
                  <div className="pe-lock-note">🔒 Split is fixed. Payer never changes percentages.</div>
                </div>
                <div className="pe-merge-line"/>
              </div>

              {/* 4 wallets */}
              <div className="pe-wallets-row">
                {WALLETS.map(w => (
                  <div key={w.id} className="pe-wallet-output" style={{ '--w-color': w.color }}>
                    <div className="pe-wallet-arrow" style={{ background: w.color }}/>
                    <div className="pe-wallet-box" style={{ borderColor: w.color + '66' }}>
                      <div className="pe-wallet-pct" style={{ color: w.color }}>{w.pct}%</div>
                      <span className="pe-wallet-icon">{w.icon}</span>
                      <strong className="pe-wallet-label">{w.label}</strong>
                      <span className="pe-wallet-amount" style={{ color: w.color }}>
                        {w.perLesson.toLocaleString()} VND
                      </span>
                      <span className="pe-wallet-timing">{w.timing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connector tranche detail */}
            <div className="db-panel" style={{ marginTop: '2rem' }}>
              <h3 className="db-panel-title">🔗 Connector Tranche Release — How the 25% is held and released</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                The connector's 270,000 VND per lesson (6,480,000 VND/cycle) is held and released in 3 tranches to prevent rushed or unethical cells.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                {WALLETS.find(w => w.id === 'connector').tranches.map((t, i) => (
                  <div key={i} style={{ padding: '1.1rem', background: 'var(--bg-card-alt)', borderRadius: '12px', borderTop: `4px solid ${t.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--navy)' }}>{t.label}</strong>
                      <span style={{ fontWeight: 800, color: t.color }}>{t.pct}</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)' }}>
                      {t.amount.toLocaleString()} VND
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                      {i === 0 ? 'Released automatically when cell launches with 6 confirmed students'
                        : i === 1 ? 'Released after: attendance ≥80%, no ethics flags, output produced'
                        : 'Released after: 8 weeks stable, growth confirmed, output quality rated'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key principle */}
            <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'var(--navy)', borderRadius: '14px' }}>
              <strong style={{ color: '#fff', display: 'block', fontSize: '1rem', marginBottom: '0.4rem' }}>
                🔒 The Immutable Rule
              </strong>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                Whether a lesson is paid by a parent or a sponsor — the split is identical.
                The payer changes. The ethics, the wallets, and the percentages do not.
                This makes the system auditable, trustworthy, and scalable.
              </p>
              <code style={{ display: 'block', marginTop: '0.85rem', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.07)', borderRadius: '8px', fontSize: '0.85rem', color: '#4de8b0', fontFamily: 'monospace' }}>
                splitLesson(totalVND=1080000) → always the same 4 wallet credits
              </code>
            </div>
          </div>
        )}

        {/* ── WALLET STRUCTURE ── */}
        {activeTab === 'wallets' && (
          <div className="db-tab-content">
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Four wallets. Each has a clear owner, a fixed percentage, a release timing, and a specific use. No wallet can be repurposed.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem' }}>
              {WALLETS.map(w => (
                <div key={w.id} className="db-panel pe-wallet-card" style={{ borderLeft: `5px solid ${w.color}` }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>{w.icon}</span>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.05rem' }}>{w.label}</h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-soft)' }}>{w.role}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                      <strong style={{ display: 'block', fontSize: '2rem', fontWeight: 900, color: w.color, lineHeight: 1 }}>{w.pct}%</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>of lesson total</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                    {[
                      ['Per lesson', `${w.perLesson.toLocaleString()} VND`],
                      ['Per cycle (24)', `${w.perCycle.toLocaleString()} VND`],
                    ].map(([k, v]) => (
                      <div key={k} style={{ padding: '0.6rem 0.75rem', background: 'var(--bg-card-alt)', borderRadius: '8px' }}>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' }}>{k}</span>
                        <strong style={{ fontSize: '0.9rem', color: w.color }}>{v}</strong>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', margin: '0 0 0.4rem' }}>Used for</p>
                    {w.used_for.map(u => (
                      <div key={u} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-soft)', padding: '0.18rem 0' }}>
                        <span style={{ color: w.color }}>→</span>{u}
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '0.6rem 0.75rem', background: w.color + '11', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-soft)', borderLeft: `3px solid ${w.color}` }}>
                    <strong style={{ color: 'var(--navy)' }}>Timing: </strong>{w.timing}
                  </div>

                  {w.tranches && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', margin: '0 0 0.4rem' }}>Tranche schedule</p>
                      {w.tranches.map(t => (
                        <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.25rem 0', color: 'var(--text-soft)' }}>
                          <span>{t.label}</span>
                          <strong style={{ color: t.color }}>{t.pct} — {t.amount.toLocaleString()} VND</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LIVE CALCULATOR ── */}
        {activeTab === 'calc' && (
          <div className="db-tab-content">
            <div className="db-panel" style={{ maxWidth: '720px' }}>
              <h3 className="db-panel-title">🧮 Live Split Calculator</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.5rem' }}>
                Adjust lessons to see exact wallet amounts for any number of lessons.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-soft)', marginBottom: '0.4rem' }}>LESSONS</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setLessonCount(l => Math.max(1, l - 1))}>−</button>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', minWidth: '40px', textAlign: 'center' }}>{lessonCount}</span>
                    <button className="btn btn-secondary btn-sm" onClick={() => setLessonCount(l => Math.min(24, l + 1))}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {[1, 4, 8, 12, 24].map(n => (
                    <button key={n} className={`filter-btn${lessonCount === n ? ' active' : ''}`} onClick={() => setLessonCount(n)}>
                      {n === 24 ? 'Full cycle (24)' : `${n} lesson${n > 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'var(--bg-card-alt)', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-soft)' }}>Total lesson revenue ({lessonCount} × 1,080,000 VND)</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--navy)', fontWeight: 900 }}>{total.toLocaleString()} VND</strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {WALLETS.map(w => {
                  const amt = w.perLesson * mult
                  const barW = w.pct
                  return (
                    <div key={w.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ width: '24px', textAlign: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{w.icon}</span>
                      <span style={{ minWidth: '160px', fontSize: '0.84rem', color: 'var(--navy)', fontWeight: 600 }}>{w.label}</span>
                      <div style={{ flex: 1, height: '10px', background: 'var(--bg-card-alt)', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${barW}%`, height: '100%', background: w.color, borderRadius: '5px', transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontWeight: 700, color: w.color, minWidth: '60px', textAlign: 'center', fontSize: '0.85rem' }}>{w.pct}%</span>
                      <strong style={{ minWidth: '160px', textAlign: 'right', color: 'var(--navy)', fontSize: '0.88rem' }}>
                        {amt.toLocaleString()} VND
                      </strong>
                    </div>
                  )
                })}
              </div>

              <div style={{ marginTop: '1.5rem', padding: '0.85rem 1rem', background: 'var(--gold-pale)', border: '1.5px solid var(--gold)', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-soft)' }}>
                <strong style={{ color: 'var(--navy)' }}>Student grant at cycle end: </strong>
                ~{Math.round((WALLETS.find(w=>w.id==='cell-fund').perLesson * mult) / STUDENTS_PER_CELL).toLocaleString()} VND per student
                → credited as coins after cycle completion
              </div>
            </div>
          </div>
        )}

        {/* ── PSEUDO-CODE ── */}
        {activeTab === 'code' && (
          <div className="db-tab-content">
            <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
              <h3 className="db-panel-title">💻 Split Logic — JavaScript / Pseudo-code</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                Ready for backend implementation. Works with any payment provider — Stripe, VNPay, or manual. Payer type is stored but never changes the split.
              </p>
              <pre className="pe-code-block">{PSEUDO_CODE}</pre>
            </div>
          </div>
        )}

        {/* ── SQL SCHEMA ── */}
        {activeTab === 'sql' && (
          <div className="db-tab-content">
            <div className="db-panel">
              <h3 className="db-panel-title">🗄 SQL Schema — PostgreSQL / Supabase-ready</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                Drop into any PostgreSQL database or paste into Supabase SQL editor. The <code style={{ background: 'var(--bg-card-alt)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.82rem' }}>process_lesson_split</code> function runs on every confirmed payment.
              </p>
              <pre className="pe-code-block">{SQL_SCHEMA}</pre>
            </div>
          </div>
        )}

        {/* ── COIN VERSION ── */}
        {activeTab === 'coins' && (
          <div className="db-tab-content">
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Coins are the non-cash parallel system. They mirror cash value without extractability — students earn real economic participation without real money pressure.
            </p>

            <div className="two-col-grid" style={{ marginBottom: '1.5rem' }}>
              <div className="db-panel">
                <h3 className="db-panel-title">🪙 Coin Exchange Rate</h3>
                <div style={{ padding: '1rem', background: 'var(--gold-pale)', border: '1.5px solid var(--gold)', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center' }}>
                  <strong style={{ display: 'block', fontSize: '1.75rem', color: 'var(--gold-dark)', fontWeight: 900 }}>1 coin ≈ 1,800 VND</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-soft)' }}>Notional rate — coins have no cash withdrawal value</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', lineHeight: 1.6, margin: 0 }}>
                  The coin rate is set so a full participation cycle (≈80 coins) is equivalent to the student grant (~144,000 VND).
                  Students experience real economic value — without real financial pressure.
                </p>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">📊 Student Grant in Coins</h3>
                {[
                  ['Cell fund per lesson (15%)', '162,000 VND'],
                  ['Cell fund per cycle (24 lessons)', '3,888,000 VND'],
                  ['Per student (÷6)', '648,000 VND'],
                  ['Converted to coins', '≈ 360 coins'],
                  ['Equivalent spend', '18 TA sessions or 9 extra packs'],
                ].map(([k, v]) => (
                  <div key={k} className="cell-info-row">
                    <span style={{ fontSize: '0.82rem' }}>{k}</span>
                    <strong style={{ color: 'var(--gold-dark)', fontSize: '0.82rem' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
              <h3 className="db-panel-title">⬆️ Coin Earn Table — with Cash Equivalents</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.65rem' }}>
                {COIN_EQUIVALENTS.map(c => (
                  <div key={c.action} style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem', background: 'var(--bg-card-alt)', borderRadius: '10px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--navy)', marginBottom: '0.15rem' }}>{c.action}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{c.note}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <strong style={{ display: 'block', color: '#d2ad44', fontSize: '0.95rem' }}>+{c.coins} 🪙</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>≈ {c.cashEquiv}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🔓 Coin Spend Table</h3>
                {COIN_SPENDS.map(s => (
                  <div key={s.item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--bg-card-alt)', fontSize: '0.84rem' }}>
                    <span style={{ color: 'var(--navy)' }}>{s.item}</span>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ display: 'block', color: '#d2ad44' }}>🪙 {s.cost}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>≈ {s.cashEquiv}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="db-panel" style={{ background: 'var(--navy)', border: 'none' }}>
                <h3 className="db-panel-title" style={{ color: '#fff' }}>🔒 Coin Safety Rules</h3>
                {[
                  ['Coins can never be withdrawn as cash', 'They are learning credits, not currency'],
                  ['Coins never affect rankings', 'Rankings are system-level, not coin-weighted'],
                  ['Coins never create pressure', 'Earning is celebrated — not having them is never penalised'],
                  ['Coins are private', 'Sponsors and parents cannot see individual coin balances'],
                  ['Coins expire only on ethics violation', 'Consistent participation protects the balance'],
                ].map(([rule, sub]) => (
                  <div key={rule} style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <strong style={{ display: 'block', fontSize: '0.84rem', color: '#fff' }}>{rule}</strong>
                    <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.45)' }}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
