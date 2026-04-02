import { useState, useEffect } from 'react'
import { getCells, getProgressLogs, getPromotions } from '../services/api.js'
import AIAssistant from '../components/AIAssistant.jsx'
import OnboardingBanner from '../components/OnboardingBanner.jsx'
import { HexIcon } from '../components/HexSymbols.jsx'

const CELLS = [
  { id:'VN-01', region:'Hanoi 🇻🇳', sg:'Minh P.', students:5, week:7, health:92, streak:7, packs:['✏️ Pencil Proof','🗣️ Voice'], status:'active' },
  { id:'VN-02', region:'HCMC 🇻🇳',  sg:'Linh T.', students:5, week:3, health:74, streak:4, packs:['💰 Kidinomics','🧩 Systems'], status:'active' },
  { id:'VN-03', region:'Da Nang 🇻🇳',sg:'Hoa N.', students:5, week:5, health:58, streak:2, packs:['🎯 Confidence','🛠️ Life Skills'], status:'flagged' },
  { id:'DE-01', region:'Berlin 🇩🇪',  sg:'Felix K.', students:5, week:11, health:88, streak:9, packs:['🗣️ Voice','🧠 Self-Awareness'], status:'completing' },
]

const SGS = [
  { name:'Minh P.', cell:'VN-01', streak:14, reps:18, readiness:82, level:'SG', flag:'🇻🇳' },
  { name:'Linh T.', cell:'VN-02', streak:9,  reps:12, readiness:65, level:'SG', flag:'🇻🇳' },
  { name:'Hoa N.', cell:'VN-03', streak:5,  reps:7,  readiness:40, level:'SG', flag:'🇻🇳' },
  { name:'Felix K.',cell:'DE-01', streak:21, reps:24, readiness:91, level:'ASG',flag:'🇩🇪' },
]

function HealthRing({ score }) {
  const r = 28, circ = 2 * Math.PI * r
  const fill = score / 100
  const color = score >= 80 ? '#4de8b0' : score >= 60 ? '#d2ad44' : '#ff6b9d'
  return (
    <svg width="68" height="68" viewBox="0 0 68 68">
      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(114,208,255,0.1)" strokeWidth="6"/>
      <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${fill*circ} ${circ}`} strokeDashoffset={circ*0.25} strokeLinecap="round"/>
      <text x="34" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill={color} fontFamily="Sora,sans-serif">{score}</text>
    </svg>
  )
}

export default function FacilitatorDashboard() {
  const [activeTab, setActiveTab]   = useState('overview')
  const [sessionTheme, setSessionTheme] = useState('')
  const [sessionPack, setSessionPack]   = useState('')
  const [sessionCell, setSessionCell]   = useState('')
  const [cells, setCells]           = useState(CELLS)
  const [loading, setLoading]       = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCells({ facilitatorId: 'user-f01' })
      .then(data => { if (data?.length) setCells(data) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dashboard-page">
      {showOnboarding && (
        <div style={{padding:'2rem 2rem 0'}}>
          <OnboardingBanner role="facilitator" onDismiss={()=>setShowOnboarding(false)}/>
        </div>
      )}
      <div className="db-page-header facilitator-header">
        <div className="db-header-inner">
          <div>
            <p className="kicker">Facilitator Portal — DOWNFLOW School of Life</p>
            <h1 className="db-title">🧭 Facilitator Dashboard</h1>
            <p className="db-subtitle">Manage cells · Develop guiders · Run sessions · Track progress</p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-primary">+ Plan Session</button>
            <button className="btn btn-secondary">Download Report</button>
          </div>
        </div>
        <div className="db-stats-row">
          {[
            ['🏫','4','Active Cells','VN-01 · VN-02 · VN-03 · DE-01','#4de8b0'],
            ['🧑‍🏫','4','Student Guiders','3 SG · 1 ASG','#72d0ff'],
            ['👩‍🎓','20','Students','Across 4 cells','#ff9f5a'],
            ['🎬','47','Video Reps','This cycle','#d2ad44'],
          ].map(([icon,val,label,sub,color])=>(
            <div key={label} className="db-stat-card" style={{'--stat-color':color}}>
              <span className="db-stat-icon">{icon}</span>
              <div><p className="db-stat-value">{val}</p><p className="db-stat-label">{label}</p><p className="db-stat-sub">{sub}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="db-tabs">
        {[['overview','🔭 Overview'],['cells','🏫 Cells'],['guiders','🧑‍🏫 Guiders'],['sessions','📅 Sessions'],['tools','🔗 ClassDojo & Meet'],['progress','📊 Progress'],['ai','🤖 AI Tool']].map(([id,label])=>(
          <button key={id} className={`db-tab${activeTab===id?' active':''}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>

      <div className="db-content">

        {activeTab==='overview'&&(
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🏫 Cell Health Overview</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  {CELLS.map(cell=>{
                    const hc=cell.health>=80?'#4de8b0':cell.health>=60?'#d2ad44':'#ff6b9d'
                    return(
                      <div key={cell.id} className="cell-health-row">
                        <HealthRing score={cell.health}/>
                        <div style={{flex:1}}>
                          <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                            <strong style={{fontSize:'0.9rem'}}>{cell.id}</strong>
                            <span style={{fontSize:'0.78rem',color:'var(--text-soft)'}}>{cell.region}</span>
                            <span style={{fontSize:'0.72rem',color:hc,fontWeight:700,marginLeft:'auto'}}>{cell.status==='active'?'● Active':cell.status==='flagged'?'⚠ Flagged':'◐ Completing'}</span>
                          </div>
                          <p style={{margin:'0.2rem 0 0',fontSize:'0.8rem',color:'var(--text-soft)'}}>SG: {cell.sg} · Week {cell.week}/12 · 🔥 {cell.streak}d streak</p>
                          <div className="sp-bar-track" style={{marginTop:'0.4rem'}}><div className="sp-bar-fill" style={{width:`${(cell.week/12)*100}%`,background:hc}}/></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">⚡ Actions Required</h3>
                <div className="action-item-list">
                  {[
                    {urgent:true, label:'VN-03 health below threshold (58). Check participation & streak.'},
                    {urgent:false, label:'Felix K. (DE-01) ready for ASG nomination — readiness 91%.'},
                    {urgent:false, label:'VN-02 Session 7 rep submissions pending. Follow up with Linh T.'},
                    {urgent:false, label:'DE-01 completing Week 11 — begin succession planning.'},
                  ].map((a,i)=>(
                    <div key={i} className={`action-item${a.urgent?' urgent':''}`}>
                      <span>{a.urgent?'🔴':'🟡'}</span>
                      <p style={{flex:1,margin:0,fontSize:'0.85rem'}}>{a.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="two-col-grid" style={{marginTop:'1.5rem'}}>
              <div className="db-panel">
                <h3 className="db-panel-title">📅 Upcoming Sessions</h3>
                {[
                  {cell:'VN-01',theme:'Voice & Confidence',day:'WED',num:'9',time:'4:00 PM'},
                  {cell:'VN-02',theme:'Value Creation',day:'THU',num:'10',time:'5:00 PM'},
                  {cell:'DE-01',theme:'Final Reflection',day:'FRI',num:'11',time:'3:00 PM'},
                ].map(s=>(
                  <div key={s.cell} className="next-session" style={{marginBottom:'0.75rem'}}>
                    <div className="ns-date"><span className="ns-day">{s.day}</span><span className="ns-num">{s.num}</span></div>
                    <div className="ns-info"><strong>{s.cell} · {s.theme}</strong><p style={{color:'var(--text-soft)',fontSize:'0.82rem',margin:'0.2rem 0 0'}}>{s.time} · 60 min · Google Meet</p></div>
                    <button className="btn btn-primary btn-sm">Prepare</button>
                  </div>
                ))}
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">🏆 Rep Leaderboard (Facilitator View)</h3>
                <p style={{fontSize:'0.78rem',color:'var(--text-soft)',marginBottom:'0.75rem'}}>Private — visible only to you. Tracks submission consistency, not performance.</p>
                <div className="rep-leaderboard">
                  {[
                    {rank:1,name:'Felix K.',cell:'DE-01',reps:24,streak:21},
                    {rank:2,name:'Minh P.',cell:'VN-01',reps:18,streak:14},
                    {rank:3,name:'Linh T.',cell:'VN-02',reps:12,streak:9},
                    {rank:4,name:'Hoa N.',cell:'VN-03',reps:7,streak:5},
                  ].map(r=>(
                    <div className="rep-row" key={r.name}>
                      <span className="rep-rank" style={{color:r.rank===1?'#d2ad44':r.rank===2?'#b4c8e6':'#cd7f32'}}>#{r.rank}</span>
                      <span className="rep-name">{r.name}</span>
                      <span className="rep-cell-tag">{r.cell}</span>
                      <span style={{fontSize:'0.8rem',color:'var(--text-soft)'}}>{r.reps} reps · 🔥{r.streak}d</span>
                    </div>
                  ))}
                </div>
                <p className="db-sub-note">Students do not see this view. Only you do.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab==='cells'&&(
          <div className="db-tab-content">
            <div className="sg-cards-grid">
              {CELLS.map(cell=>{
                const hc=cell.health>=80?'#4de8b0':cell.health>=60?'#d2ad44':'#ff6b9d'
                return(
                  <div key={cell.id} className="sg-card" style={{'--cell-color':hc}}>
                    <div className="sg-card-header">
                      <HealthRing score={cell.health}/>
                      <div>
                        <strong style={{display:'block',fontSize:'1rem'}}>{cell.id}</strong>
                        <span style={{fontSize:'0.8rem',color:'var(--text-soft)'}}>{cell.region}</span>
                        <p style={{margin:'0.2rem 0 0',fontSize:'0.78rem',color:hc,fontWeight:700}}>{cell.status==='active'?'● Active':cell.status==='flagged'?'⚠ Flagged':'◐ Completing'}</p>
                      </div>
                    </div>
                    <div className="sg-metrics">
                      <div><span>SG</span><strong>{cell.sg}</strong></div>
                      <div><span>Week</span><strong>{cell.week}/12</strong></div>
                      <div><span>Streak</span><strong>🔥{cell.streak}d</strong></div>
                    </div>
                    <div style={{marginTop:'0.6rem'}}>
                      <p style={{fontSize:'0.75rem',color:'var(--text-soft)',margin:'0 0 0.4rem'}}>Packs</p>
                      <div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>
                        {cell.packs.map(p=><span key={p} className="pack-tag">{p}</span>)}
                      </div>
                    </div>
                    <div className="sp-bar-track" style={{marginTop:'0.75rem'}}><div className="sp-bar-fill" style={{width:`${(cell.week/12)*100}%`,background:hc}}/></div>
                    <div className="sg-actions" style={{marginTop:'0.75rem'}}>
                      <button className="btn btn-secondary btn-sm">View Cell</button>
                      <button className="btn btn-secondary btn-sm">Message SG</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab==='guiders'&&(
          <div className="db-tab-content">
            <p className="lead" style={{marginBottom:'1.5rem'}}>Your Student Guiders and their development progress. Readiness score reflects consistency, rep submissions, and peer support.</p>
            <div className="sg-cards-grid">
              {SGS.map(sg=>{
                const rc=sg.readiness>=80?'#4de8b0':sg.readiness>=60?'#d2ad44':'#ff6b9d'
                return(
                  <div key={sg.name} className="sg-card">
                    <div className="sg-card-header">
                      <span style={{fontSize:'2rem'}}>{sg.flag}</span>
                      <div>
                        <strong style={{display:'block'}}>{sg.name}</strong>
                        <span className="sg-level-badge">{sg.level}</span>
                        <p style={{margin:'0.2rem 0 0',fontSize:'0.78rem',color:'var(--text-soft)'}}>Cell {sg.cell}</p>
                      </div>
                    </div>
                    <div className="sg-metrics">
                      <div><span>Streak</span><strong>🔥{sg.streak}d</strong></div>
                      <div><span>Reps</span><strong>{sg.reps}</strong></div>
                      <div><span>Readiness</span><strong style={{color:rc}}>{sg.readiness}%</strong></div>
                    </div>
                    <div style={{marginTop:'0.75rem'}}>
                      <p style={{fontSize:'0.75rem',color:'var(--text-soft)',margin:'0 0 0.3rem'}}>Progression readiness</p>
                      <div className="sp-bar-track"><div className="sp-bar-fill" style={{width:`${sg.readiness}%`,background:rc}}/></div>
                    </div>
                    <div className="sg-actions" style={{marginTop:'0.75rem'}}>
                      <button className="btn btn-secondary btn-sm">View Profile</button>
                      {sg.readiness>=80&&<button className="btn btn-primary btn-sm">Nominate ASG</button>}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="db-panel" style={{marginTop:'2rem'}}>
              <h3 className="db-panel-title">⬆️ Progression Rules</h3>
              <div className="guarantee-grid">
                {[
                  ['🎓','SG → ASG','Must complete one full 12-week cycle as SG with readiness score ≥ 80%.'],
                  ['⭐','ASG → Intern Facilitator','Must have supported at least 2 different SGs and have a facilitator recommendation.'],
                  ['🧭','Intern → Full Facilitator','Must have independently run at least 6 sessions observed by an existing facilitator.'],
                  ['🔒','No fast-tracking','Every level requires completion of the level below. No exceptions.'],
                ].map(([icon,title,desc])=>(
                  <div key={title} className="guarantee-item">
                    <span className="gi-icon">{icon}</span><strong>{title}</strong><p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab==='sessions'&&(
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">📋 Plan a Session</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div>
                    <label style={{fontSize:'0.82rem',color:'var(--text-soft)',display:'block',marginBottom:'0.3rem'}}>Select Cell</label>
                    <select className="db-select" value={sessionCell} onChange={e=>setSessionCell(e.target.value)}>
                      <option value="">Choose cell...</option>
                      {CELLS.map(c=><option key={c.id} value={c.id}>{c.id} — {c.region}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:'0.82rem',color:'var(--text-soft)',display:'block',marginBottom:'0.3rem'}}>Content Pack Focus</label>
                    <select className="db-select" value={sessionPack} onChange={e=>setSessionPack(e.target.value)}>
                      <option value="">Choose pack...</option>
                      {['✏️ Pencil Proof','💰 Kidinomics','🗣️ Voice & Presence','🧩 Systems Thinking','🎯 Confidence Engineering','🛠️ Life Skills','🧠 Self-Awareness','🤝 Social Systems'].map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:'0.82rem',color:'var(--text-soft)',display:'block',marginBottom:'0.3rem'}}>Session Theme</label>
                    <input className="db-input" placeholder="e.g. Voice & Confidence, Value Creation..." value={sessionTheme} onChange={e=>setSessionTheme(e.target.value)}/>
                  </div>
                  <div>
                    <label style={{fontSize:'0.82rem',color:'var(--text-soft)',display:'block',marginBottom:'0.3rem'}}>Micro-Challenge for Session</label>
                    <input className="db-input" placeholder="e.g. Explain a system you saw today..."/>
                  </div>
                  <button className="btn btn-primary" disabled={!sessionCell||!sessionTheme}>Create Session Plan</button>
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">📚 Session Structure Template</h3>
                {[
                  ['0–5 min','Warm-up','Energy check-in · Breathing or movement · One-word round'],
                  ['5–20 min','Video + Discussion','Watch pack video · Guided questions · No right answers'],
                  ['20–35 min','Group Exercise','Repeatable from pack · SG leads · Everyone participates'],
                  ['35–50 min','Micro-Challenge','Individual or pairs · Facilitator observes, doesn\'t grade'],
                  ['50–60 min','Reflection + Close','What did you notice? · Coin recognition · Next session preview'],
                ].map(([time,label,desc])=>(
                  <div key={label} style={{display:'flex',gap:'0.75rem',padding:'0.6rem 0',borderBottom:'1px solid var(--border-soft)'}}>
                    <span style={{fontSize:'0.72rem',color:'var(--gold-500)',fontWeight:700,minWidth:'60px',paddingTop:'0.1rem'}}>{time}</span>
                    <div><strong style={{fontSize:'0.85rem'}}>{label}</strong><p style={{margin:'0.1rem 0 0',fontSize:'0.78rem',color:'var(--text-soft)'}}>{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-panel" style={{marginTop:'1.5rem'}}>
              <h3 className="db-panel-title">🗓️ Recent Sessions</h3>
              <div className="cells-table">
                <div className="cells-table-head"><span>Cell</span><span>Theme</span><span>Pack</span><span>Date</span><span>Attendance</span><span>Status</span></div>
                {[
                  {cell:'VN-01',theme:'Voice & Confidence',pack:'🗣️ Voice',date:'Apr 1',att:'5/5',status:'complete'},
                  {cell:'VN-02',theme:'Value & Effort',pack:'💰 Kidinomics',date:'Mar 30',att:'4/5',status:'complete'},
                  {cell:'DE-01',theme:'Systems Map',pack:'🧩 Systems',date:'Mar 29',att:'5/5',status:'complete'},
                  {cell:'VN-03',theme:'Confidence Reset',pack:'🎯 Confidence',date:'Mar 27',att:'3/5',status:'flagged'},
                ].map(s=>(
                  <div key={s.cell+s.date} className="cell-row">
                    <span className="cell-id">{s.cell}</span>
                    <span style={{fontSize:'0.84rem'}}>{s.theme}</span>
                    <span style={{fontSize:'0.82rem'}}>{s.pack}</span>
                    <span style={{fontSize:'0.82rem',color:'var(--text-soft)'}}>{s.date}</span>
                    <span style={{fontSize:'0.82rem'}}>{s.att}</span>
                    <span style={{fontSize:'0.78rem',fontWeight:700,color:s.status==='flagged'?'#ff6b9d':'#4de8b0'}}>{s.status==='flagged'?'⚠ Flagged':'✓ Done'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab==='progress'&&(
          <div className="db-tab-content">
            <div className="impact-metrics-grid">
              {[
                ['🏫','4','Cells Running','Across 3 regions'],
                ['🎬','47','Video Reps','This cycle'],
                ['🔥','avg 8d','Avg Streak','Across all SGs'],
                ['⬆️','1','ASG Ready','Felix K. — DE-01'],
                ['🎓','3/5','Students on SG Track','VN-01 cell'],
                ['🌱','1','Cell Completing','DE-01 · Week 11'],
              ].map(([icon,val,label,note])=>(
                <div key={label} className="impact-metric-card">
                  <span className="impact-metric-icon">{icon}</span>
                  <p className="impact-metric-value">{val}</p>
                  <p className="impact-metric-label">{label}</p>
                  <p className="impact-metric-note">{note}</p>
                </div>
              ))}
            </div>

            <div className="two-col-grid" style={{marginTop:'2rem'}}>
              <div className="db-panel">
                <h3 className="db-panel-title">📊 Cell Progress by Week</h3>
                <div className="cycle-bars">
                  {CELLS.map(cell=>{
                    const hc=cell.health>=80?'#4de8b0':cell.health>=60?'#d2ad44':'#ff6b9d'
                    return(
                      <div key={cell.id} className="cycle-bar-row">
                        <span className="cycle-bar-label">{cell.id} · {cell.region}</span>
                        <div className="cycle-bar-track"><div className="cycle-bar-fill" style={{width:`${(cell.week/12)*100}%`,background:hc}}/></div>
                        <span className="cycle-bar-pct">Wk {cell.week}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="db-panel">
                <h3 className="db-panel-title">🛡️ Ethical Checks — This Cycle</h3>
                <div className="action-item-list">
                  {[
                    {ok:true,label:'No student participation pressure detected'},
                    {ok:true,label:'No sponsor interaction inside any classroom'},
                    {ok:true,label:'Coin rewards distributed fairly across all cells'},
                    {ok:false,label:'VN-03 attendance below threshold — monitor next session'},
                    {ok:true,label:'All SG sessions observed within guidelines'},
                  ].map((c,i)=>(
                    <div key={i} className="action-item" style={{padding:'0.6rem'}}>
                      <span>{c.ok?'✅':'⚠️'}</span>
                      <span style={{flex:1,fontSize:'0.84rem'}}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
        {activeTab==='tools'&&(
          <div className="db-tab-content">

            {/* ClassDojo */}
            <div className="two-col-grid" style={{marginBottom:'1.5rem'}}>
              <div className="db-panel integration-panel classdojo-panel">
                <div className="integration-header">
                  <div className="integration-logo classdojo-logo">CD</div>
                  <div>
                    <h3 className="db-panel-title" style={{margin:0}}>ClassDojo</h3>
                    <span className="integration-status active">● Connected — Front Porch</span>
                  </div>
                </div>
                <p style={{fontSize:'0.84rem',color:'var(--text-soft)',lineHeight:1.6,margin:'0.75rem 0 1rem'}}>
                  ClassDojo handles the daily classroom heartbeat — moods, parent messages, and simple session feedback. It never touches payments, rankings, or long-term data. That all lives here.
                </p>
                <div className="integration-flows">
                  <p style={{fontSize:'0.75rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--text-muted)',marginBottom:'0.5rem'}}>What ClassDojo does</p>
                  {['Daily emotional check-ins','Parent communication & trust','Simple session feedback','Moment-to-moment visibility'].map(item=>(
                    <div key={item} className="integration-flow-row"><span style={{color:'#4de8b0'}}>✓</span><span>{item}</span></div>
                  ))}
                  <p style={{fontSize:'0.75rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--text-muted)',margin:'0.75rem 0 0.5rem'}}>ClassDojo never handles</p>
                  {['Payments or coins','Sponsor rankings','Long-term data storage','Video reps or content'].map(item=>(
                    <div key={item} className="integration-flow-row"><span style={{color:'#ff9f5a'}}>✗</span><span style={{color:'var(--text-muted)'}}>{item}</span></div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'0.75rem',marginTop:'1.25rem',flexWrap:'wrap'}}>
                  {CELLS.map(c=>(
                    <a key={c.id} href="https://www.classdojo.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                      Open {c.id} →
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Meet */}
              <div className="db-panel integration-panel meet-panel">
                <div className="integration-header">
                  <div className="integration-logo meet-logo">M</div>
                  <div>
                    <h3 className="db-panel-title" style={{margin:0}}>Google Meet</h3>
                    <span className="integration-status active">● Connected — Live Room</span>
                  </div>
                </div>
                <p style={{fontSize:'0.84rem',color:'var(--text-soft)',lineHeight:1.6,margin:'0.75rem 0 1rem'}}>
                  Google Meet is the live learning room. It stays "dumb" — reliable, safe, and familiar. What matters is what comes out of it: recordings that feed the Content Engine.
                </p>
                <div className="integration-flows">
                  <p style={{fontSize:'0.75rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--text-muted)',marginBottom:'0.5rem'}}>Session lifecycle</p>
                  {[
                    {icon:'📅',step:'Session scheduled here in DOWNFLOW'},
                    {icon:'🔗',step:'Join button fires — opens Google Meet'},
                    {icon:'🎥',step:'Session runs — facilitator records'},
                    {icon:'📤',step:'Clip trimmed & uploaded to Content Engine'},
                    {icon:'🪙',step:'Post-session: coins awarded, attendance logged'},
                  ].map(s=>(
                    <div key={s.step} className="integration-flow-row"><span>{s.icon}</span><span>{s.step}</span></div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'0.75rem',marginTop:'1.25rem',flexWrap:'wrap'}}>
                  {CELLS.map(c=>(
                    <a key={c.id} href="https://meet.google.com" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      Start {c.id} →
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture note */}
            <div className="db-panel" style={{background:'linear-gradient(135deg,var(--navy),#1a2a3a)',border:'none'}}>
              <h3 className="db-panel-title" style={{color:'#fff'}}>🏙 The App is the City</h3>
              <p style={{color:'rgba(255,255,255,0.65)',fontSize:'0.85rem',lineHeight:1.7,marginBottom:'1rem'}}>
                ClassDojo = the classroom heartbeat. Google Meet = the live voice. DOWNFLOW = the city where value accumulates, identity is held, and everything else feeds in.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
                {[
                  {icon:'🚪',tool:'ClassDojo',role:'Front porch',owns:'Daily interaction · Parent trust · Emotional visibility'},
                  {icon:'📹',tool:'Google Meet',role:'Live room',owns:'Session delivery · Recording source · Reliable infrastructure'},
                  {icon:'🏙',tool:'DOWNFLOW App',role:'The city',owns:'Value · Identity · Coins · Rankings · Content · Payments'},
                ].map(item=>(
                  <div key={item.tool} style={{padding:'1rem',background:'rgba(255,255,255,0.05)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)'}}>
                    <span style={{fontSize:'1.5rem',display:'block',marginBottom:'0.4rem'}}>{item.icon}</span>
                    <strong style={{display:'block',color:'#fff',fontSize:'0.9rem'}}>{item.tool}</strong>
                    <span style={{display:'block',fontSize:'0.72rem',color:'var(--gold)',fontWeight:600,marginBottom:'0.35rem'}}>{item.role}</span>
                    <p style={{margin:0,fontSize:'0.75rem',color:'rgba(255,255,255,0.45)',lineHeight:1.55}}>{item.owns}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab==='ai'&&(
          <div className="db-tab-content">
            <p className="lead" style={{marginBottom:'1.5rem'}}>Generate tailored discussion prompts, feedback suggestions, and session activities for your cells using the Antigravity AI engine.</p>
            <AIAssistant defaultTopic="Voice & Confidence"/>
          </div>
        )}

    </div>
  )
}
