import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CITIES = [
  { id:'hanoi',  x:710,y:198,label:'Hanoi',    active:true  },
  { id:'hcm',    x:720,y:225,label:'HCMC',     active:true  },
  { id:'berlin', x:490,y:115,label:'Berlin',   active:true  },
  { id:'hamburg',x:488,y:108,label:'Hamburg',  active:true  },
  { id:'moscow', x:570,y:100,label:'Moscow',   active:true  },
  { id:'cairo',  x:530,y:178,label:'Cairo',    active:false },
  { id:'dubai',  x:610,y:185,label:'Dubai',    active:false },
  { id:'warsaw', x:510,y:108,label:'Warsaw',   active:false },
  { id:'danang', x:715,y:212,label:'Da Nang',  active:false },
]

const ARCS = [
  ['berlin','hanoi'],['berlin','moscow'],['hamburg','hcm'],
  ['moscow','hanoi'],['berlin','warsaw'],['hanoi','danang'],
  ['dubai','cairo'],['hcm','danang'],['moscow','warsaw'],
]

function GlobalMap() {
  const svgRef = useRef(null)
  const cityMap = Object.fromEntries(CITIES.map(c=>[c.id,c]))
  useEffect(()=>{
    let frame,t=0
    const animate=()=>{ t+=0.005; svgRef.current?.querySelectorAll('.tdot').forEach((d,i)=>{const p=((Math.sin(t+i*0.6)+1)/2); d.setAttribute('opacity',0.3+p*0.7)}); frame=requestAnimationFrame(animate) }
    frame=requestAnimationFrame(animate); return ()=>cancelAnimationFrame(frame)
  },[])
  return (
    <div className="global-map-wrap">
      <svg ref={svgRef} viewBox="0 0 900 320" className="global-map-svg">
        <defs>
          <radialGradient id="mg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1f84ff" stopOpacity="0.1"/><stop offset="100%" stopColor="#040c1f" stopOpacity="0"/></radialGradient>
          <filter id="ng2"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="900" height="320" fill="url(#mg)" rx="16"/>
        <g fill="rgba(114,208,255,0.05)" stroke="rgba(114,208,255,0.12)" strokeWidth="0.8">
          <ellipse cx="490" cy="120" rx="65" ry="40"/>
          <ellipse cx="510" cy="210" rx="52" ry="68"/>
          <ellipse cx="680" cy="160" rx="110" ry="70"/>
          <ellipse cx="580" cy="100" rx="50" ry="25"/>
        </g>
        {ARCS.map(([a,b],i)=>{
          const ca=cityMap[a],cb=cityMap[b]
          const mx=(ca.x+cb.x)/2, my=Math.min(ca.y,cb.y)-35
          const dur=2.8+(i%4)*0.6
          return (
            <g key={i}>
              <path d={`M${ca.x},${ca.y} Q${mx},${my} ${cb.x},${cb.y}`} fill="none" stroke="rgba(114,208,255,0.15)" strokeWidth="0.9" id={`apath${i}`}/>
              <circle r="2.5" fill="#d2ad44" className="tdot">
                <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${(i*0.4)%dur}s`}><mpath href={`#apath${i}`}/></animateMotion>
              </circle>
            </g>
          )
        })}
        {CITIES.map(city=>(
          <g key={city.id} filter="url(#ng2)">
            <circle cx={city.x} cy={city.y} r={city.active?9:5} fill={city.active?'rgba(210,173,68,0.2)':'rgba(114,208,255,0.1)'} stroke={city.active?'#d2ad44':'#72d0ff'} strokeWidth="1.2" opacity={city.active?0.9:0.45}/>
            {city.active&&<text x={city.x+11} y={city.y+4} fontSize="8" fill="#eed998" opacity="0.85" fontFamily="Sora,sans-serif">{city.label}</text>}
          </g>
        ))}
        <text x="20" y="308" fontSize="9" fill="var(--text-soft)" fontFamily="Sora,sans-serif">🇻🇳 Vietnam  🇩🇪 Germany  🇷🇺 Russia — DOWNFLOW Active Regions</text>
      </svg>
    </div>
  )
}

const CELLS = [
  { id:'VN-01',region:'Hanoi, 🇻🇳',students:5,sg:'Linh T.',packs:['✏️ Pencil Proof','🗣️ Voice'],week:7,status:'active',health:92 },
  { id:'VN-02',region:'HCMC, 🇻🇳',students:5,sg:'Minh P.',packs:['💰 Kidinomics','🧩 Systems'],week:3,status:'active',health:74 },
  { id:'DE-01',region:'Berlin, 🇩🇪',students:5,sg:'Felix K.',packs:['🎯 Confidence','🛠️ Life Skills'],week:11,status:'completing',health:88 },
  { id:'RU-01',region:'Moscow, 🇷🇺',students:5,sg:'Anna V.',packs:['🧠 Self-Awareness','🤝 Social'],week:1,status:'active',health:70 },
]

export default function SponsorDashboard() {
  const [activeTab,setActiveTab]=useState('overview')
  return (
    <div className="dashboard-page">
      <div className="db-page-header sponsor-header">
        <div className="db-header-inner">
          <div><p className="kicker">Sponsor Portal — DOWNFLOW</p><h1 className="db-title">🏦 Infrastructure Dashboard</h1><p className="db-subtitle">Fund learning cells · Track global impact · Assign gift packs · Compete on outcomes</p></div>
          <div className="db-header-actions"><button className="btn btn-primary">+ Fund New Cell</button><button className="btn btn-secondary">Download Report</button></div>
        </div>
        <div className="db-stats-row">
          {[['🏫','4','Active Cells Funded','VN · DE · RU','#d2ad44'],['👩‍🎓','20','Students Reached','This funding cycle','#72d0ff'],['🎁','6','Gift Packs Assigned','284 students unlocked','#4de8b0'],['📈','15%','Sponsor Rebate','9% reinvested · 6% to students','#ff9f5a']].map(([icon,val,label,sub,color])=>(
            <div key={label} className="db-stat-card" style={{'--stat-color':color}}>
              <span className="db-stat-icon">{icon}</span>
              <div><p className="db-stat-value">{val}</p><p className="db-stat-label">{label}</p><p className="db-stat-sub">{sub}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="db-tabs">
        {[['overview','🌍 Overview'],['cells','🏫 My Cells'],['gifts','🎁 Gift Packs'],['impact','📊 Impact']].map(([id,label])=>(
          <button key={id} className={`db-tab${activeTab===id?' active':''}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>
      <div className="db-content">
        {activeTab==='overview'&&(
          <div className="db-tab-content">
            <div className="section-head" style={{marginBottom:'1.5rem'}}><p className="kicker">Global Reach</p><h2>Your Network Footprint</h2><p className="lead">Live cells across Vietnam, Germany, and Russia — funded by your sponsorship.</p></div>
            <GlobalMap/>
            <div className="two-col-grid" style={{marginTop:'2.5rem'}}>
              <div className="db-panel">
                <h3 className="db-panel-title">💰 How Your Funding Works</h3>
                <div className="funding-flow">
                  {[['🏦','You fund a learning cycle','12 weeks · 2 sessions/week · 5 students'],['🏫','A new Learning Cell activates','Facilitator + Student Guider assigned. Week 1 begins.'],['🎓','Students learn, produce, grow','Video reps submitted. Coins earned. Packs unlocked.'],['📈','15% rebate returns to network','9% creates new cells · 6% distributed to students']].map(([icon,title,desc],i)=>(
                    <div key={i}><div className="ff-step" style={i===3?{borderColor:'var(--gold-500)'}:{}}><span className="ff-icon">{icon}</span><div><strong>{title}</strong><p>{desc}</p></div></div>{i<3&&<div className="ff-arrow">↓</div>}</div>
                  ))}
                </div>
              </div>
              <div className="db-panel">
                <h3 className="db-panel-title">📍 Your Active Regions</h3>
                <div className="region-list">
                  {[['🇻🇳','Vietnam','2 cells · 10 students','active'],['🇩🇪','Germany','1 cell · 5 students','completing'],['🇷🇺','Russia','1 cell · 5 students','active'],['🌍','Global expansion','Open for next cycle','pipeline']].map(([flag,name,detail,status])=>(
                    <div key={name} className="region-row">
                      <span className="region-flag">{flag}</span>
                      <div className="region-info"><strong>{name}</strong><span>{detail}</span></div>
                      <span className={`region-badge ${status}`}>{status==='active'?'● Active':status==='completing'?'◐ Completing':'→ Pipeline'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab==='cells'&&(
          <div className="db-tab-content">
            <div className="db-panel">
              <div className="db-panel-header"><h3 className="db-panel-title">🏫 Funded Learning Cells</h3><button className="btn btn-primary btn-sm">+ Fund New Cell</button></div>
              <div className="cells-table">
                <div className="cells-table-head"><span>Cell</span><span>Region</span><span>Students</span><span>SG</span><span>Packs</span><span>Progress</span><span>Status</span></div>
                {CELLS.map(cell=>{
                  const hc=cell.health>=80?'#4de8b0':cell.health>=60?'#d2ad44':'#ff6b9d'
                  return (
                    <div key={cell.id} className="cell-row">
                      <span className="cell-id">{cell.id}</span>
                      <span className="cell-region">{cell.region}</span>
                      <span>{cell.students}</span>
                      <span className="cell-sg">{cell.sg}</span>
                      <div className="cell-packs">{cell.packs.map(p=><span key={p} className="pack-tag">{p}</span>)}</div>
                      <div className="cell-progress">
                        <div className="progress-track"><div className="progress-fill" style={{width:`${(cell.week/12)*100}%`,background:hc}}/></div>
                        <span className="progress-label">Wk {cell.week}/12</span>
                      </div>
                      <span className="cell-status" style={{color:hc}}>{cell.status==='active'?'● Active':cell.status==='completing'?'◐ Completing':'○ New'}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        {activeTab==='gifts'&&(
          <div className="db-tab-content">
            <p className="lead" style={{marginBottom:'1.5rem'}}>Assign content packs directly to learning cells. Students get instant access — no coins or payment needed.</p>
            <div className="gift-pack-grid">
              {[['✏️','Pencil Proof Pack',84,14],['💰','Kidinomics Pack',72,12],['🗣️','Voice & Presence Pack',60,10],['🎯','Confidence Pack',48,8]].map(([icon,name,students,cells])=>(
                <div key={name} className="gift-pack-card"><span className="gift-pack-icon">{icon}</span><div className="gift-pack-info"><strong>{name}</strong><p>{students} students · {cells} cells</p></div><button className="btn btn-secondary btn-sm">Assign to Cell</button></div>
              ))}
            </div>
          </div>
        )}
        {activeTab==='impact'&&(
          <div className="db-tab-content">
            <div className="impact-metrics-grid">
              {[['🎓','21','Total Students Reached','All cycles combined'],['🎬','847','Video Reps Submitted','Across all cells'],['🎁','6','Packs Gifted','284 students benefited'],['⬆️','3','Students → SG Track','From your funded cells'],['🌱','2','New Cells Spawned','Via 9% reinvestment'],['🌍','3','Countries Impacted','VN · DE · RU']].map(([icon,val,label,note])=>(
                <div key={label} className="impact-metric-card"><span className="impact-metric-icon">{icon}</span><p className="impact-metric-value">{val}</p><p className="impact-metric-label">{label}</p><p className="impact-metric-note">{note}</p></div>
              ))}
            </div>
            <div className="db-panel" style={{marginTop:'2rem'}}>
              <h3 className="db-panel-title">📊 Cycle Performance</h3>
              <div className="cycle-bars">
                {[['Cycle 1 · Nov 2025',95,2],['Cycle 2 · Jan 2026',78,3],['Cycle 3 · Mar 2026',42,4]].map(([c,pct,cells])=>(
                  <div key={c} className="cycle-bar-row"><span className="cycle-bar-label">{c} · {cells} cells</span><div className="cycle-bar-track"><div className="cycle-bar-fill" style={{width:`${pct}%`}}/></div><span className="cycle-bar-pct">{pct}%</span></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
