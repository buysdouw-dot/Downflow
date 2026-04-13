// ============================================================
// BusinessMetrics — Weekly control dashboard + live calculator
// The "System Map" control panel from the business framework.
// Shows: signups, bookings, show-up rate, return rate, revenue,
//        teacher count needed, pressure points.
// ============================================================
import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta.js'

function pct(n, total) { return total > 0 ? Math.round((n / total) * 100) : 0 }
function fmt(n) { return Number(n).toLocaleString() }

export default function BusinessMetrics() {
  usePageMeta('Business Metrics', 'Weekly control dashboard — signups, retention, revenue, teacher capacity.')

  const [activeTab, setActiveTab] = useState('control')

  // Live calculator inputs
  const [totalStudents,  setTotalStudents]  = useState(100)
  const [activePct,      setActivePct]      = useState(40)
  const [classesPerWeek, setClassesPerWeek] = useState(1.5)
  const [pricePerClass,  setPricePerClass]  = useState(180)
  const [teacherCost,    setTeacherCost]    = useState(100)
  const [scenario,       setScenario]       = useState('current')

  // Calculated outputs
  const activeStudents = Math.round(totalStudents * (activePct / 100))
  const monthlyClasses = Math.round(activeStudents * classesPerWeek * 4)
  const revenue        = monthlyClasses * pricePerClass
  const tCost          = monthlyClasses * teacherCost
  const grossProfit    = revenue - tCost
  const margin         = revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0
  const teachersNeeded = Math.ceil(monthlyClasses / 64) // 64 classes/month per teacher

  // Scenarios
  const scenarios = {
    current:   { label: 'Current',          students: totalStudents, active: activePct, cpw: classesPerWeek, price: pricePerClass, tcost: teacherCost },
    retention: { label: '+10% Retention',   students: totalStudents, active: Math.min(activePct + 10, 100), cpw: classesPerWeek, price: pricePerClass, tcost: teacherCost },
    price:     { label: 'Price +R20',       students: totalStudents, active: activePct, cpw: classesPerWeek, price: pricePerClass + 20, tcost: teacherCost },
    usage:     { label: '+0.5 Class/week',  students: totalStudents, active: activePct, cpw: classesPerWeek + 0.5, price: pricePerClass, tcost: teacherCost },
    group:     { label: 'Group Model (3x)', students: totalStudents, active: activePct, cpw: classesPerWeek, price: pricePerClass * 0.75, tcost: teacherCost, groupFactor: 3 },
  }

  function calcScenario(s) {
    const active = Math.round(s.students * (s.active / 100))
    const classes = Math.round(active * s.cpw * 4)
    const group = s.groupFactor || 1
    const rev = classes * s.price * group
    const cost = classes * s.tcost
    return { active, classes, revenue: rev, profit: rev - cost }
  }

  // Weekly checklist (live)
  const WEEKLY_CHECKS = [
    { question: 'Are facilitators consistent?', metric: 'Avg cell health', value: '78%', status: 'ok', action: 'Check PlatformDashboard → Cell Health' },
    { question: 'Are bookings smooth?', metric: 'Cells active', value: '7 / 9', status: 'ok', action: 'Check ConnectorDashboard → Cell Status' },
    { question: 'Are students returning?', metric: 'Avg retention', value: '62%', status: 'warn', action: 'View StudentDashboard → Streak + Attendance. Send re-engagement emails.' },
    { question: 'Are payments clean?', metric: 'Pending payments', value: '1', status: 'warn', action: 'Check PlatformDashboard → Funding Requests' },
    { question: 'Are complaints increasing?', metric: 'Open tickets', value: '0', status: 'ok', action: 'Check Support → Ticket Queue' },
  ]

  // Growth stages
  const STAGES = [
    { label: 'Stage 1', students: 50, active: 20, classes: 120, revenue: 'R20k', profit: 'R8–10k', status: 'Survival', color: '#5b9bd5' },
    { label: 'Stage 2', students: 150, active: 60, classes: 360, revenue: 'R65k', profit: 'R25k', status: 'Getting stable', color: '#4de8b0' },
    { label: 'Stage 3', students: 500, active: 200, classes: 1200, revenue: 'R216k', profit: 'R60–80k', status: 'Real business', color: '#d4a840' },
    { label: 'Stage 4', students: 1000, active: 400, classes: 2400, revenue: 'R400k+', profit: 'R120–160k', status: 'System business', color: '#b083ff' },
  ]

  const currentStage = totalStudents < 75 ? 0 : totalStudents < 200 ? 1 : totalStudents < 700 ? 2 : 3

  return (
    <div className="bm-page">
      <div className="bm-hero">
        <span className="kicker">Operations Control</span>
        <h1>Business Metrics</h1>
        <p className="bm-sub">Your weekly control dashboard. Look at the numbers, find the biggest problem, fix only that.</p>
      </div>

      <div className="bm-tabs">
        {['control', 'calculator', 'scenarios', 'growth'].map(t => (
          <button key={t} className={`bm-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {{ control: '📊 Weekly Control', calculator: '🧮 Calculator', scenarios: '🔬 Scenarios', growth: '📈 Growth Stages' }[t]}
          </button>
        ))}
      </div>

      {/* Weekly control */}
      {activeTab === 'control' && (
        <div className="bm-panel">
          <h2 className="bm-panel-title">Weekly Checklist</h2>
          <p style={{ color: 'var(--text-soft)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>Run this every Monday. Find the ONE biggest problem. Fix only that this week.</p>
          <div className="bm-checks">
            {WEEKLY_CHECKS.map((c, i) => (
              <div key={i} className={`bm-check ${c.status}`}>
                <div className="bm-check-left">
                  <div className={`bm-check-dot ${c.status}`} />
                  <div>
                    <div className="bm-check-q">{c.question}</div>
                    <div className="bm-check-action">{c.action}</div>
                  </div>
                </div>
                <div className="bm-check-right">
                  <div className="bm-check-metric">{c.metric}</div>
                  <div className={`bm-check-value ${c.status}`}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bm-focus-box">
            <h3>🎯 This Week's Focus</h3>
            <p>Student retention is below target (62% vs 75% goal). Priority: send re-engagement emails to students with 0 attendance last week. Check facilitator performance in VN-03.</p>
          </div>

          <div className="bm-pressure-grid">
            <h2 className="bm-panel-title" style={{ marginTop: '2rem' }}>Pressure Points</h2>
            {[
              { threshold: '30–50 students', symptom: 'Scheduling gets messy, messages increasing', fix: 'Lock in automation. No manual booking.' },
              { threshold: '100–150 students', symptom: 'Support becomes daily work. Teachers need coordination.', fix: 'Add FAQ system. Standardise teacher process.' },
              { threshold: '200–300 students', symptom: "Can't track everything manually. Errors increase.", fix: 'Better dashboards. Possibly part-time admin.' },
              { threshold: '500+ students', symptom: 'You are managing a system, not people.', fix: 'Admin hire. 10–20 teachers. Group classes.' },
            ].map(p => (
              <div key={p.threshold} className={`bm-pressure ${totalStudents >= parseInt(p.threshold) ? 'active' : ''}`}>
                <div className="bm-pressure-threshold">{p.threshold}</div>
                <div className="bm-pressure-symptom">{p.symptom}</div>
                <div className="bm-pressure-fix">✓ {p.fix}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calculator */}
      {activeTab === 'calculator' && (
        <div className="bm-panel">
          <h2 className="bm-panel-title">Live Business Calculator</h2>
          <p style={{ color: 'var(--text-soft)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>Adjust the inputs — outputs recalculate instantly.</p>

          <div className="bm-calc-grid">
            <div className="bm-inputs">
              <h3 className="bm-sub-title">Inputs (you control these)</h3>
              {[
                { label: 'Total Students', value: totalStudents, set: setTotalStudents, min: 1, max: 2000, step: 10 },
                { label: 'Active % (of total)', value: activePct, set: setActivePct, min: 10, max: 100, step: 5, suffix: '%' },
                { label: 'Classes / student / week', value: classesPerWeek, set: setClassesPerWeek, min: 0.5, max: 5, step: 0.5 },
                { label: 'Price per class (R)', value: pricePerClass, set: setPricePerClass, min: 50, max: 1000, step: 10, prefix: 'R' },
                { label: 'Teacher cost per class (R)', value: teacherCost, set: setTeacherCost, min: 20, max: 500, step: 10, prefix: 'R' },
              ].map(inp => (
                <div key={inp.label} className="bm-input-row">
                  <label className="bm-input-label">
                    {inp.label}
                    <strong className="bm-input-val">{inp.prefix || ''}{inp.value}{inp.suffix || ''}</strong>
                  </label>
                  <input type="range" className="bm-slider"
                    min={inp.min} max={inp.max} step={inp.step}
                    value={inp.value} onChange={e => inp.set(Number(e.target.value))} />
                </div>
              ))}
            </div>

            <div className="bm-outputs">
              <h3 className="bm-sub-title">Monthly Output</h3>
              <div className="bm-output-cards">
                <div className="bm-output-card">
                  <div className="bm-output-val">{fmt(activeStudents)}</div>
                  <div className="bm-output-label">Active Students</div>
                </div>
                <div className="bm-output-card">
                  <div className="bm-output-val">{fmt(monthlyClasses)}</div>
                  <div className="bm-output-label">Monthly Classes</div>
                </div>
                <div className="bm-output-card green">
                  <div className="bm-output-val">R{fmt(revenue)}</div>
                  <div className="bm-output-label">Revenue</div>
                </div>
                <div className="bm-output-card red">
                  <div className="bm-output-val">R{fmt(tCost)}</div>
                  <div className="bm-output-label">Teacher Cost</div>
                </div>
                <div className="bm-output-card gold highlight">
                  <div className="bm-output-val">R{fmt(grossProfit)}</div>
                  <div className="bm-output-label">Gross Profit ({margin}% margin)</div>
                </div>
                <div className="bm-output-card">
                  <div className="bm-output-val">{teachersNeeded}</div>
                  <div className="bm-output-label">Teachers Needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenarios */}
      {activeTab === 'scenarios' && (
        <div className="bm-panel">
          <h2 className="bm-panel-title">What-If Scenarios</h2>
          <p style={{ color: 'var(--text-soft)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
            Small changes have outsized impact. These are the only 3 levers that matter: <strong>Retention</strong>, <strong>Price</strong>, <strong>Usage</strong>.
          </p>
          <div className="bm-scenarios">
            {Object.entries(scenarios).map(([key, s]) => {
              const out = calcScenario(s)
              const isCurrent = key === 'current'
              const baseProfit = calcScenario(scenarios.current).profit
              const diff = out.profit - baseProfit
              return (
                <div key={key} className={`bm-scenario-card ${isCurrent ? 'baseline' : ''}`}>
                  <div className="bm-sc-label">{s.label}</div>
                  <div className="bm-sc-stats">
                    <div><span>Active</span><strong>{fmt(out.active)}</strong></div>
                    <div><span>Classes</span><strong>{fmt(out.classes)}</strong></div>
                    <div><span>Revenue</span><strong>R{fmt(out.revenue)}</strong></div>
                    <div><span>Profit</span><strong>R{fmt(out.profit)}</strong></div>
                  </div>
                  {!isCurrent && (
                    <div className={`bm-sc-diff ${diff > 0 ? 'positive' : 'negative'}`}>
                      {diff > 0 ? '↑' : '↓'} R{fmt(Math.abs(diff))} vs current
                    </div>
                  )}
                  {isCurrent && <div className="bm-sc-baseline">Baseline</div>}
                </div>
              )
            })}
          </div>

          <div className="bm-insight-box">
            <h3>⚡ The 3 Real Levers</h3>
            <div className="bm-levers">
              <div className="bm-lever"><strong>1. Retention (most powerful)</strong> — If students stay longer, revenue doubles without more marketing.</div>
              <div className="bm-lever"><strong>2. Price (fastest)</strong> — A R20 increase has huge impact at scale with zero extra cost.</div>
              <div className="bm-lever"><strong>3. Usage (most scalable)</strong> — Getting students to book 2 sessions/week instead of 1 is the biggest multiplier.</div>
            </div>
          </div>
        </div>
      )}

      {/* Growth stages */}
      {activeTab === 'growth' && (
        <div className="bm-panel">
          <h2 className="bm-panel-title">Growth Stage Map</h2>
          <div className="bm-stages">
            {STAGES.map((s, i) => (
              <div key={i} className={`bm-stage ${i === currentStage ? 'current' : i < currentStage ? 'past' : ''}`}
                style={{ '--sc': s.color }}>
                <div className="bm-stage-label">{s.label}</div>
                <div className="bm-stage-students">{s.students} students</div>
                <div className="bm-stage-stats">
                  <div><span>Active</span><strong>{s.active}</strong></div>
                  <div><span>Classes/mo</span><strong>{fmt(s.classes)}</strong></div>
                  <div><span>Revenue</span><strong>{s.revenue}</strong></div>
                  <div><span>Profit</span><strong>{s.profit}</strong></div>
                </div>
                <div className="bm-stage-status">{s.status}</div>
                {i === currentStage && <div className="bm-stage-current-badge">You are here</div>}
              </div>
            ))}
          </div>

          <div className="bm-hire-grid">
            <h2 className="bm-panel-title" style={{ marginTop: '2rem' }}>When to Hire</h2>
            {[
              { trigger: 'You spend >2 hours/day answering messages', hire: '1st Hire: Admin / Support', role: 'Customer support, booking issues, basic coordination' },
              { trigger: 'Demand exceeds available time slots', hire: '2nd Hire: More Facilitators', role: 'Expand teacher pool (10–20 facilitators at scale)' },
              { trigger: 'You can\'t oversee everything', hire: '3rd Hire: Operations Manager', role: 'Manages teacher system, scheduling, quality control' },
            ].map(h => (
              <div key={h.hire} className="bm-hire-card">
                <div className="bm-hire-trigger">⚡ When: {h.trigger}</div>
                <div className="bm-hire-role"><strong>{h.hire}</strong></div>
                <div className="bm-hire-desc">{h.role}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
