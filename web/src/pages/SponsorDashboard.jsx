import { useEffect, useRef, useState } from 'react'
import { HexIcon, HexSystemRow } from '../components/HexSymbols.jsx'
import OnboardingBanner from '../components/OnboardingBanner.jsx'
import { getCells, getSponsorships } from '../services/api.js'

// ── Global Map ────────────────────────────────────────────────
const CITIES = [
  { id:'hanoi',  x:710,y:198,label:'Hanoi',   active:true  },
  { id:'hcm',    x:720,y:225,label:'HCMC',    active:true  },
  { id:'berlin', x:490,y:115,label:'Berlin',  active:true  },
  { id:'moscow', x:570,y:100,label:'Moscow',  active:false },
  { id:'danang', x:715,y:212,label:'Da Nang', active:true  },
]
const ARCS = [['berlin','hanoi'],['berlin','hcm'],['moscow','hanoi'],['hanoi','danang'],['hcm','danang']]

function GlobalMap() {
  const svgRef = useRef(null)
  const cm = Object.fromEntries(CITIES.map(c=>[c.id,c]))
  useEffect(()=>{
    let frame,t=0
    const animate=()=>{
      t+=0.005
      svgRef.current?.querySelectorAll('.tdot').forEach((d,i)=>{
        const p=((Math.sin(t+i*0.7)+1)/2)
        d.setAttribute('opacity',0.25+p*0.75)
      })
      frame=requestAnimationFrame(animate)
    }
    frame=requestAnimationFrame(animate); return ()=>cancelAnimationFrame(frame)
  },[])
  return (
    <div className="global-map-wrap">
      <svg ref={svgRef} className="global-map-svg" viewBox="350 85 430 185" preserveAspectRatio="xMidYMid meet">
        {/* Continents outline suggestion */}
        <rect x="350" y="85" width="430" height="185" fill="rgba(114,208,255,0.03)" rx="8"/>
        {/* Arc paths with travel dots */}
        {ARCS.map(([a,b],i)=>{
          const A=cm[a],B=cm[b]; if(!A||!B) return null
          const mx=(A.x+B.x)/2,my=Math.min(A.y,B.y)-30
          const path=`M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`
          return (
            <g key={i}>
              <path d={path} fill="none" stroke="rgba(210,173,68,0.25)" strokeWidth="1.2" strokeDasharray="4 3"/>
              <circle className="tdot" r="3" fill="#d2ad44">
                <animateMotion dur={`${3+i*0.8}s`} repeatCount="indefinite" path={path}/>
              </circle>
            </g>
          )
        })}
        {/* City nodes */}
        {CITIES.map(c=>(
          <g key={c.id} transform={`translate(${c.x},${c.y})`}>
            <circle r="7" fill={c.active?"rgba(77,232,176,0.2)":"rgba(255,255,255,0.05)"} stroke={c.active?"#4de8b0":"rgba(255,255,255,0.2)"} strokeWidth="1.2">
              {c.active && <animate attributeName="r" values="7;10;7" dur="2.5s" repeatCount="indefinite"/>}
            </circle>
            <circle r="3.5" fill={c.active?"#4de8b0":"rgba(255,255,255,0.3)"}/>
            <text y="-12" textAnchor="middle" fontSize="8" fill={c.active?"#fff":"rgba(255,255,255,0.4)"} fontFamily="Sora,sans-serif" fontWeight="600">{c.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ── Sponsor Stats (matches wireframe: 5 key numbers) ─────────
const SPONSOR_STATS = [
  { hex:'sponsor', value:'3',           label:'Funded Cells',   sub:'VN-01 · VN-02 · VN-03', color:'#d2ad44' },
  { hex:'cell',    value:'15',          label:'Students',        sub:'Across 3 cells',          color:'#4de8b0' },
  { hex:'growth',  value:'4.8',         label:'Avg Cell Score',  sub:'out of 5.0',              color:'#72d0ff' },
  { hex:'data',    value:'47',          label:'Video Reps',      sub:'This cycle',              color:'#b083ff' },
  { hex:'shield',  value:'5.38%',       label:'Rebate Earned',   sub:'vs 15% max',              color:'#ff9f5a' },
]

const CELLS_DATA = [
  { id:'VN-01', region:'Hanoi 🇻🇳',    week:7,  health:92, pack:'🗣️ Voice',      status:'active',    rebate:450000  },
  { id:'VN-02', region:'HCMC 🇻🇳',     week:3,  health:74, pack:'💰 Kidinomics', status:'active',    rebate:250000  },
  { id:'VN-03', region:'Da Nang 🇻🇳',  week:5,  health:58, pack:'🎯 Confidence', status:'flagged',   rebate:120000  },
]

const RANKINGS = [
  { name:'Corex',            logo:'⬡', cells:18, growth:9.2, participation:8.9, output:9.1, succession:8.8, overall:9.0 },
  { name:'Cresto',           logo:'✦', cells:12, growth:8.2, participation:8.8, output:9.4, succession:8.8, overall:8.8, isUser:false },
  { name:'Lytica',           logo:'◈', cells:9,  growth:8.9, participation:8.7, output:8.8, succession:8.7, overall:8.8 },
  { name:'Travos',           logo:'▲', cells:7,  growth:8.4, participation:9.3, output:8.7, succession:8.8, overall:8.8 },
  { name:'General Chemicals',logo:'⬤', cells:6,  growth:8.4, participation:8.6, output:8.8, succession:8.6, overall:8.6 },
  { name:'Yovigo',           logo:'◆', cells:5,  growth:8.5, participation:8.3, output:8.6, succession:8.3, overall:8.4 },
  { name:'BrightBase',       logo:'★', cells:5,  growth:8.5, participation:8.6, output:8.6, succession:8.4, overall:8.5 },
  { name:'Wayfair IT',       logo:'⬟', cells:4,  growth:8.0, participation:8.8, output:8.0, succession:8.5, overall:8.3 },
  { name:'Vingroup Education',logo:'🏢',cells:3, growth:7.8, participation:8.2, output:7.9, succession:7.5, overall:7.9, isUser:true },
]

const REBATE_FLOW = [
  { pct:'85%', label:'Goes to cell operations', sub:'Facilitator · Connector · Platform', color:'#4de8b0' },
  { pct:'9%',  label:'Reinvested in new cells', sub:'Compounding growth fund',            color:'#72d0ff' },
  { pct:'6%',  label:'Credited to students',    sub:'Coin wallet recognition',            color:'#d2ad44' },
]

const GIFT_PACKS = [
  { emoji:'✏️', name:'Pencil Proof',     ages:'8–12',  assigned:'VN-01', status:'active' },
  { emoji:'💰', name:'Kidinomics',       ages:'10–14', assigned:'VN-02', status:'active' },
  { emoji:'🎯', name:'Confidence Eng.',  ages:'10–15', assigned:'VN-03', status:'active' },
  { emoji:'🗣️', name:'Voice & Presence', ages:'12–16', assigned:null,    status:'available' },
  { emoji:'🧩', name:'Systems Thinking', ages:'13–17', assigned:null,    status:'available' },
  { emoji:'🧠', name:'Self-Awareness',   ages:'13–18', assigned:null,    status:'available' },
]

export default function SponsorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [cells, setCells] = useState(CELLS_DATA)

  useEffect(()=>{
    getSponsorships('user-s01').then(data=>{
      if(data?.length) { /* map to cells */ }
    })
  },[])

  return (
    <div className="dashboard-page">
      {/* Onboarding Banner */}
      {showOnboarding && (
        <div style={{padding:'2rem 2rem 0'}}>
          <OnboardingBanner role="sponsor" onDismiss={()=>setShowOnboarding(false)}/>
        </div>
      )}

      {/* Page Header */}
      <div className="db-page-header sponsor-header">
        <div className="db-header-inner">
          <div>
            <p className="kicker">Sponsor Portal — DOWNFLOW School of Life</p>
            <h1 className="db-title">💼 Sponsor Dashboard</h1>
            <p className="db-subtitle">Fund cells · Track impact · Grow the network · Empowering · Connected · Safe · Growing</p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-primary">+ Fund New Cell</button>
            <button className="btn btn-secondary">Download Report</button>
            {!showOnboarding && (
              <button className="btn btn-secondary" onClick={()=>setShowOnboarding(true)}>? Guide</button>
            )}
          </div>
        </div>

        {/* 5-stat row — mirrors wireframe exactly */}
        <div className="db-stats-row" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
          {SPONSOR_STATS.map(s=>(
            <div key={s.label} className="db-stat-card" style={{'--stat-color':s.color}}>
              <HexIcon type={s.hex} size={40}/>
              <div>
                <p className="db-stat-value">{s.value}</p>
                <p className="db-stat-label">{s.label}</p>
                <p className="db-stat-sub">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="db-tabs">
        {[['overview','🔭 Overview'],['cells','🏫 My Cells'],['packs','🎁 Gift Packs'],['impact','📊 Impact'],['flywheel','🔄 Flywheel'],['rankings','🏆 Rankings'],['model','📖 Sponsor Model']].map(([id,label])=>(
          <button key={id} className={`db-tab${activeTab===id?' active':''}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>

      <div className="db-content">

        {/* ── OVERVIEW ── */}
        {activeTab==='overview'&&(
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div>
                <div className="db-panel" style={{marginBottom:'1.5rem'}}>
                  <h3 className="db-panel-title">🌍 Global Cell Map</h3>
                  <GlobalMap/>
                  <div style={{display:'flex',gap:'1rem',marginTop:'0.75rem',flexWrap:'wrap'}}>
                    {[['🟢','Active Cell'],['🟡','Needs Attention'],['⭕','Pipeline']].map(([dot,lbl])=>(
                      <span key={lbl} style={{fontSize:'0.75rem',color:'var(--text-soft)',display:'flex',alignItems:'center',gap:'0.3rem'}}>{dot} {lbl}</span>
                    ))}
                  </div>
                </div>
                <div className="db-panel">
                  <h3 className="db-panel-title">⚡ Actions</h3>
                  {[
                    {urgent:true,  msg:'VN-03 participation flagged — review cell status'},
                    {urgent:false, msg:'3 gift packs available to assign to new cells'},
                    {urgent:false, msg:'Rebate cycle closes in 12 days — ₫820,000 pending'},
                  ].map((a,i)=>(
                    <div key={i} className="action-item" style={{marginBottom:'0.5rem'}}>
                      <span>{a.urgent?'🔴':'🟡'}</span>
                      <p style={{flex:1,margin:0,fontSize:'0.85rem'}}>{a.msg}</p>
                      <button className="btn btn-secondary btn-sm">Review</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="db-panel" style={{marginBottom:'1.5rem'}}>
                  <h3 className="db-panel-title">💸 15% Rebate Flow</h3>
                  <p style={{fontSize:'0.82rem',color:'var(--text-soft)',marginBottom:'1rem'}}>Every VND you invest, 15% returns and works for you.</p>
                  {REBATE_FLOW.map(r=>(
                    <div key={r.label} style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.75rem'}}>
                      <div style={{background:`${r.color}22`,border:`1px solid ${r.color}55`,borderRadius:'8px',padding:'0.4rem 0.75rem',minWidth:'52px',textAlign:'center'}}>
                        <span style={{fontSize:'0.95rem',fontWeight:800,color:r.color}}>{r.pct}</span>
                      </div>
                      <div>
                        <strong style={{fontSize:'0.88rem',display:'block'}}>{r.label}</strong>
                        <span style={{fontSize:'0.75rem',color:'var(--text-soft)'}}>{r.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="db-panel">
                  <h3 className="db-panel-title">📅 Upcoming Milestones</h3>
                  <div className="payout-timeline">
                    {[
                      {done:true,  label:'Cell formation complete',    amt:'',         note:'All 3 cells active'},
                      {done:true,  label:'Week 3 progress reviewed',   amt:'',         note:'VN-02 on track'},
                      {active:true,label:'Week 7 performance check',   amt:'₫250,000', note:'VN-01 exceeding'},
                      {done:false, label:'Rebate cycle close',         amt:'₫820,000', note:'Apr 15 · Automatic'},
                      {done:false, label:'Cycle 1 completion report',  amt:'',         note:'Full impact summary'},
                    ].map((m,i)=>(
                      <div key={i} className={`payout-milestone${m.done?' done':m.active?' active':''}`}>
                        <div className="pm-label"><strong>{m.label}</strong><span>{m.note}</span></div>
                        {m.amt&&<span className="pm-amount">{m.amt}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MY CELLS ── */}
        {activeTab==='cells'&&(
          <div className="db-tab-content">

            {/* Tier status */}
            <div className="smodel-tiers-row" style={{marginBottom:'1.5rem'}}>
              {[
                {tier:'Learning Cell Partner',cells:1,  students:5,  color:'#72d0ff',icon:'🌱',current:false},
                {tier:'Growth Partner',        cells:3,  students:15, color:'#d2ad44',icon:'🌿',current:true, note:'YOU ARE HERE'},
                {tier:'Impact Partner',        cells:10, students:50, color:'#4de8b0',icon:'🌳',current:false},
              ].map(t=>(
                <div key={t.tier} className="smodel-tier-card" style={{'--tier-color':t.color,outline:t.current?`2.5px solid ${t.color}`:'none',boxShadow:t.current?`0 0 0 4px ${t.color}20`:'none'}}>
                  <span className="smodel-tier-icon">{t.icon}</span>
                  <strong className="smodel-tier-name">{t.tier}</strong>
                  {t.current && <span style={{fontSize:'0.68rem',fontWeight:800,color:t.color,background:`${t.color}18`,borderRadius:'20px',padding:'0.1rem 0.6rem',marginTop:'0.1rem'}}>{t.note}</span>}
                  <div className="smodel-tier-numbers">
                    <span><strong>{t.cells}</strong> cell{t.cells>1?'s':''}</span>
                    <span><strong>{t.students}</strong> students</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="db-panel" style={{marginBottom:'1.5rem'}}>
              <div className="db-panel-header">
                <h3 className="db-panel-title">🏫 Funded Cells</h3>
                <button className="btn btn-primary btn-sm">+ Fund New Cell</button>
              </div>
              <div className="cells-table">
                <div className="cells-table-head" style={{gridTemplateColumns:'80px 1fr 90px 100px 120px 90px 100px'}}>
                  <span>Cell ID</span><span>Region</span><span>Week</span><span>Health</span><span>Pack</span><span>Status</span><span>Rebate</span>
                </div>
                {cells.map(cell=>{
                  const hc=cell.health>=80?'#4de8b0':cell.health>=60?'#d2ad44':'#ff6b9d'
                  return(
                    <div key={cell.id} className="cell-row" style={{gridTemplateColumns:'80px 1fr 90px 100px 120px 90px 100px'}}>
                      <span className="cell-id">{cell.id}</span>
                      <span style={{fontSize:'0.84rem'}}>{cell.region}</span>
                      <span style={{fontSize:'0.82rem'}}>{cell.week}/12</span>
                      <span>
                        <span style={{color:hc,fontWeight:700,fontSize:'0.85rem'}}>{cell.health}</span>
                        <div className="sp-bar-track" style={{marginTop:'0.2rem'}}><div className="sp-bar-fill" style={{width:`${cell.health}%`,background:hc,height:'4px'}}/></div>
                      </span>
                      <span style={{fontSize:'0.82rem'}}>{cell.pack}</span>
                      <span style={{fontSize:'0.75rem',fontWeight:700,color:cell.status==='flagged'?'#ff6b9d':cell.status==='active'?'#4de8b0':'#d2ad44'}}>
                        {cell.status==='active'?'● Active':cell.status==='flagged'?'⚠ Flagged':'◐ Completing'}
                      </span>
                      <span style={{fontSize:'0.82rem',color:'var(--gold-500)',fontWeight:700}}>₫{cell.rebate.toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Sponsor boundary rules */}
            <div className="db-panel">
              <h3 className="db-panel-title">🛡️ Your Ethical Boundaries</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                {[
                  {ok:true,  rule:'You fund cells — you never interact with students directly'},
                  {ok:true,  rule:'Your brand may appear on sponsor acknowledgement materials'},
                  {ok:true,  rule:'You receive weekly progress reports on your cells'},
                  {ok:false, rule:'You cannot select, contact, or influence individual students'},
                  {ok:false, rule:'You cannot direct facilitators on how to run sessions'},
                  {ok:false, rule:'You cannot withdraw mid-cycle once a cell is active'},
                ].map((r,i)=>(
                  <div key={i} style={{display:'flex',gap:'0.6rem',padding:'0.6rem',background:'rgba(255,255,255,0.02)',borderRadius:'8px',border:'1px solid var(--border-soft)'}}>
                    <span style={{fontSize:'1rem'}}>{r.ok?'✅':'🚫'}</span>
                    <span style={{fontSize:'0.82rem'}}>{r.rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── GIFT PACKS ── */}
        {activeTab==='packs'&&(
          <div className="db-tab-content">
            <p className="lead" style={{marginBottom:'1.5rem'}}>Gift a content pack to any of your cells. Each pack runs 12 weekly sessions.</p>
            <div className="gift-pack-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
              {GIFT_PACKS.map(p=>(
                <div key={p.name} className="gift-pack-card" style={{flexDirection:'column',alignItems:'flex-start',opacity:p.status==='active'?1:0.8}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                    <span style={{fontSize:'2rem'}}>{p.emoji}</span>
                    <div>
                      <strong style={{display:'block'}}>{p.name}</strong>
                      <span style={{fontSize:'0.75rem',color:'var(--text-soft)'}}>Ages {p.ages}</span>
                    </div>
                    <span style={{marginLeft:'auto',fontSize:'0.72rem',fontWeight:700,color:p.status==='active'?'#4de8b0':'#72d0ff',background:p.status==='active'?'rgba(77,232,176,0.1)':'rgba(114,208,255,0.1)',border:`1px solid ${p.status==='active'?'rgba(77,232,176,0.3)':'rgba(114,208,255,0.2)'}`,borderRadius:'20px',padding:'0.2rem 0.5rem'}}>
                      {p.status==='active'?'Active':'Available'}
                    </span>
                  </div>
                  {p.assigned
                    ? <p style={{fontSize:'0.78rem',color:'var(--text-soft)',margin:'0 0 0.75rem'}}>Assigned to cell <strong>{p.assigned}</strong></p>
                    : <p style={{fontSize:'0.78rem',color:'var(--text-soft)',margin:'0 0 0.75rem'}}>Not yet assigned to a cell</p>
                  }
                  <button className={`btn btn-sm ${p.status==='active'?'btn-secondary':'btn-primary'}`} style={{width:'100%'}}>
                    {p.status==='active'?'View Cell Progress':'Assign to Cell →'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── IMPACT ── */}
        {activeTab==='impact'&&(
          <div className="db-tab-content">
            <div className="impact-metrics-grid" style={{gridTemplateColumns:'repeat(4,1fr)',marginBottom:'2rem'}}>
              {[
                ['🧑‍🎓','15','Students Reached','Across 3 cells, 3 regions'],
                ['🎬','47','Video Reps Submitted','Real participation evidence'],
                ['🔥','avg 7d','Avg Student Streak','Across all active cells'],
                ['💰','₫820,000','Rebate Earned','This cycle so far'],
              ].map(([icon,val,label,note])=>(
                <div key={label} className="impact-metric-card">
                  <span className="impact-metric-icon">{icon}</span>
                  <p className="impact-metric-value">{val}</p>
                  <p className="impact-metric-label">{label}</p>
                  <p className="impact-metric-note">{note}</p>
                </div>
              ))}
            </div>
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">📈 Cycle Performance by Cell</h3>
                <div className="cycle-bars">
                  {cells.map(cell=>{
                    const hc=cell.health>=80?'#4de8b0':cell.health>=60?'#d2ad44':'#ff6b9d'
                    return(
                      <div key={cell.id} className="cycle-bar-row">
                        <span className="cycle-bar-label">{cell.id} {cell.region.split(' ')[1]}</span>
                        <div className="cycle-bar-track"><div className="cycle-bar-fill" style={{width:`${cell.health}%`,background:hc}}/></div>
                        <span className="cycle-bar-pct">{cell.health}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="db-panel">
                <h3 className="db-panel-title">🌱 Your Impact Statement</h3>
                <div style={{padding:'1.25rem',background:'linear-gradient(135deg,rgba(210,173,68,0.08),rgba(77,232,176,0.04))',borderRadius:'12px',border:'1px solid rgba(210,173,68,0.2)'}}>
                  <p style={{fontSize:'1rem',lineHeight:1.7,fontStyle:'italic',color:'var(--text-main)',margin:0}}>
                    "Through your sponsorship, <strong>15 young people</strong> in Vietnam have completed <strong>47 video reps</strong>, run <strong>21 structured sessions</strong>, and developed real-world communication skills — without a single classroom or textbook."
                  </p>
                  <p style={{fontSize:'0.78rem',color:'var(--text-soft)',marginTop:'0.75rem',marginBottom:0}}>Auto-generated from your cell performance data · Cycle 1, 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FLYWHEEL ── */}
        {activeTab==='flywheel'&&(
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🔄 The Self-Improving Flywheel</h3>
                <p style={{fontSize:'0.85rem',color:'var(--text-soft)',marginBottom:'1.5rem'}}>
                  Based on the investor deck model. Each cycle compounds the next.
                </p>
                <div className="flywheel-steps">
                  {[
                    {n:'1',icon:'💼',label:'Sponsor funds cell',   detail:'5,000,000 VND → 12-week cycle for 6 students'},
                    {n:'2',icon:'🧑‍🎓',label:'Students participate', detail:'Video reps, sessions, micro-challenges, streaks'},
                    {n:'3',icon:'📊',label:'Data proves value',    detail:'Attendance, speaking scores, GPA, rep counts'},
                    {n:'4',icon:'💰',label:'Rebate returns',       detail:'15% back: 9% reinvest · 6% student coins'},
                    {n:'5',icon:'🌱',label:'Network expands',      detail:'TAs become facilitators · Cells spawn new cells'},
                    {n:'6',icon:'🏆',label:'Sponsor renews',       detail:'Proven ROI → same sponsor funds 2nd cycle'},
                  ].map((s,i)=>(
                    <div key={i} className="flywheel-step">
                      <div className="flywheel-num" style={{background:`rgba(210,173,68,${0.15+i*0.05})`}}>{s.n}</div>
                      <div>
                        <strong style={{fontSize:'0.9rem'}}>{s.icon} {s.label}</strong>
                        <p style={{margin:'0.2rem 0 0',fontSize:'0.78rem',color:'var(--text-soft)'}}>{s.detail}</p>
                      </div>
                      {i<5&&<div className="flywheel-arrow">↓</div>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="db-panel" style={{marginBottom:'1.5rem'}}>
                  <h3 className="db-panel-title">📐 Symbol System</h3>
                  <p style={{fontSize:'0.8rem',color:'var(--text-soft)',marginBottom:'1.25rem'}}>The DOWNFLOW visual language — 7 core hex icons representing the full ecosystem.</p>
                  <HexSystemRow size={40}/>
                </div>
                <div className="db-panel">
                  <h3 className="db-panel-title">📋 Financial Summary</h3>
                  {[
                    ['Total invested',       '₫15,000,000','3 cells × 5,000,000'],
                    ['Platform fee (2%)',    '₫300,000',   'One-time registration'],
                    ['Rebate pool (15%)',    '₫2,250,000', 'Over full cycle'],
                    ['Reinvested (9%)',      '₫1,350,000', 'Back into growth fund'],
                    ['Student coins (6%)',   '₫900,000',   'Coin wallet credits'],
                    ['Net cost per student', '₫823,333',   'Over 12 weeks'],
                  ].map(([lbl,val,note])=>(
                    <div key={lbl} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'0.5rem 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <div><span style={{fontSize:'0.85rem'}}>{lbl}</span><p style={{margin:0,fontSize:'0.72rem',color:'var(--text-soft)'}}>{note}</p></div>
                      <strong style={{color:'var(--gold-500)',fontSize:'0.9rem'}}>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ── SPONSOR MODEL ── */}
        {activeTab==='model'&&(
          <div className="db-tab-content">

            {/* Definition hero */}
            <div className="smodel-definition">
              <p className="kicker">One-Sentence Definition</p>
              <blockquote className="smodel-quote">
                "Sponsors enable protected learning cells, compete publicly on impact, and help scale access — without ever entering the classroom."
              </blockquote>
            </div>

            {/* Three non-negotiable principles */}
            <div className="smodel-section">
              <h3 className="smodel-section-title">⚡ Three Non-Negotiable Principles</h3>
              <div className="smodel-principles-row">
                {[
                  { n:'1', color:'#4de8b0', label:'Students & families owe nothing', desc:'No gratitude. No appearances. No data. No expectations. They simply enter a learning space that already exists.' },
                  { n:'2', color:'#72d0ff', label:'Learning spaces are protected', desc:'Sponsor branding never appears inside a lesson, classroom, or student video. The boundary is absolute.' },
                  { n:'3', color:'#d2ad44', label:'Sponsors compete on impact, not access', desc:'Recognition is earned through cell performance — not bought. Sponsorship is responsibility, not ownership.' },
                ].map(p=>(
                  <div key={p.n} className="smodel-principle-card" style={{'--sm-color':p.color}}>
                    <span className="smodel-principle-num">{p.n}</span>
                    <strong>{p.label}</strong>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cell structure */}
            <div className="smodel-two-col">
              <div className="smodel-section">
                <h3 className="smodel-section-title">🏫 The Learning Cell (Foundational Unit)</h3>
                <div className="smodel-cell-visual">
                  <div className="smodel-cell-box">
                    <span className="smodel-cell-icon">🏫</span>
                    <strong>1 Learning Cell</strong>
                    {['6 students','1 facilitator','Fixed learning cycle (6–8 weeks)','Protected, non-commercial space'].map(i=>(
                      <span key={i} className="smodel-cell-item">→ {i}</span>
                    ))}
                  </div>
                  <div className="smodel-cell-note">
                    <p><strong>Sponsors do not sponsor individuals.</strong><br/>They sponsor Learning Cells.</p>
                    <p>This prevents: stigma · hierarchy · power imbalance · emotional debt</p>
                  </div>
                </div>
                <div className="smodel-zero-oblig">
                  <p className="smodel-zo-head">Zero Obligation — Locked Rule</p>
                  <p className="smodel-zo-message">
                    The only message families may receive:<br/>
                    <em>"This learning space is made possible by people who believe education should be accessible."</em><br/>
                    That is the end of their involvement.
                  </p>
                  <div className="smodel-zo-grid">
                    {['do NOT thank sponsors','do NOT appear in sponsor content','do NOT perform gratitude','do NOT give data','do NOT carry expectations'].map(r=>(
                      <span key={r} className="smodel-zo-item">🚫 Students {r}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="smodel-section">
                <h3 className="smodel-section-title">🏆 Recognition Boundary</h3>
                <p className="smodel-body-text">Recognition is allowed — extraction is not. This single rule protects everything.</p>
                <div className="smodel-boundary-grid">
                  <div className="smodel-boundary-col never">
                    <p className="smodel-boundary-head">🚫 Sponsors are NEVER visible</p>
                    {['inside lessons','in classrooms','in student content','in facilitator language','in learning videos'].map(r=>(
                      <span key={r} className="smodel-boundary-item">✗ {r}</span>
                    ))}
                  </div>
                  <div className="smodel-boundary-col allowed">
                    <p className="smodel-boundary-head">✅ Sponsors ARE visible</p>
                    {['on the website','on public reports','on live ranking pages','in sponsor decks','in public communications'].map(r=>(
                      <span key={r} className="smodel-boundary-item">✓ {r}</span>
                    ))}
                  </div>
                </div>
                <div className="smodel-recognition-loop">
                  <p className="smodel-section-title" style={{marginBottom:'0.75rem'}}>💡 Why Recognition Exists</p>
                  <div className="smodel-loop-row">
                    {['visibility','traffic','business growth','more learning cells'].map((step,i,arr)=>(
                      <div key={step} className="smodel-loop-item">
                        <span>{step}</span>
                        {i<arr.length-1 && <span className="smodel-loop-arrow">→</span>}
                      </div>
                    ))}
                  </div>
                  <p className="smodel-loop-note">This creates ethical circulation — not charity, not CSR theater.</p>
                </div>
              </div>
            </div>

            {/* Sponsor tiers */}
            <div className="smodel-section">
              <h3 className="smodel-section-title">📊 Sponsor Partner Tiers — Cell-Based, Not Money-Based</h3>
              <p className="smodel-body-text">Impact, not spend, defines status.</p>
              <div className="smodel-tiers-row">
                {[
                  { tier:'Learning Cell Partner', cells:1,  students:5,   color:'#72d0ff', icon:'🌱', desc:'Fund one complete learning environment. A full group of 6 students, 12 weeks, one facilitator.' },
                  { tier:'Growth Partner',         cells:3,  students:15,  color:'#d2ad44', icon:'🌿', desc:'Three active cells running simultaneously. Your impact spans three communities.' },
                  { tier:'Impact Partner',         cells:10, students:50,  color:'#4de8b0', icon:'🌳', desc:'Ten cells. Fifty students. Your name leads the public leaderboard.' },
                ].map(t=>(
                  <div key={t.tier} className="smodel-tier-card" style={{'--tier-color':t.color}}>
                    <span className="smodel-tier-icon">{t.icon}</span>
                    <strong className="smodel-tier-name">{t.tier}</strong>
                    <div className="smodel-tier-numbers">
                      <span><strong>{t.cells}</strong> cell{t.cells>1?'s':''}</span>
                      <span><strong>{t.students}</strong> students</span>
                    </div>
                    <p className="smodel-tier-desc">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 ranking dimensions */}
            <div className="smodel-section">
              <h3 className="smodel-section-title">📐 The Four Ranking Dimensions</h3>
              <p className="smodel-body-text">Cells compete. Humans are protected. Each cell is evaluated equally across four dimensions.</p>
              <div className="smodel-dimensions-grid">
                {[
                  { n:'01', label:'Growth',             color:'#4de8b0', measures:['Increased speaking confidence','Longer voluntary participation','Reduced fear signals'] },
                  { n:'02', label:'Participation Health',color:'#72d0ff', measures:['Balanced voices in session','Low withdrawal rate','Full group engagement'] },
                  { n:'03', label:'Output Quality',      color:'#d2ad44', measures:['Clarity of shared ideas','Reusability of content produced','Contribution to the system'] },
                  { n:'04', label:'Succession Strength', color:'#b083ff', measures:['Learners helping newcomers','Assistant facilitators emerging','Content reused by other cells'] },
                ].map(d=>(
                  <div key={d.label} className="smodel-dimension-card" style={{'--dim-color':d.color}}>
                    <span className="smodel-dim-num">{d.n}</span>
                    <strong className="smodel-dim-label">{d.label}</strong>
                    <ul className="smodel-dim-measures">
                      {d.measures.map(m=><li key={m}>{m}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="smodel-dimensions-note">
                <strong>The strongest cell is the one that creates more cells.</strong>
                <p>Rankings never show individual students, children's performance, names, faces, or personal data.</p>
              </div>
            </div>

            {/* Governance */}
            <div className="smodel-section">
              <h3 className="smodel-section-title">⚖️ Governance Rules</h3>
              <div className="smodel-governance-grid">
                {[
                  'Rankings update after learning cycles — not in real time',
                  'Facilitators never reference rankings in class',
                  'Students are never told they are ranked',
                  'Sponsors cannot influence scoring',
                  'Any pressure signal → rankings paused or adjusted',
                  'If advertising harms learning, advertising stops.',
                ].map((r,i)=>(
                  <div key={i} className="smodel-gov-rule">
                    <span className="smodel-gov-num">{i+1}</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── RANKINGS ── */}
        {activeTab==='rankings'&&(
          <div className="db-tab-content">
            <div className="rankings-header">
              <div>
                <h2 className="rankings-title">🏆 Sponsor Rankings</h2>
                <p className="rankings-sub">Ethical competition. Impact-driven recognition.</p>
              </div>
              <div className="rankings-meta">
                <span className="rankings-badge">🏫 350 <span>CELLS SUPPORTED</span></span>
                <span className="rankings-badge">👥 360 <span>STUDENT IMPACT</span></span>
                <span className="rankings-cycle">Cycle: April – May 2026</span>
              </div>
            </div>

            <div className="rankings-layout">
              {/* Main leaderboard */}
              <div className="rankings-main">
                <div className="rankings-table-head">
                  <span>Rank</span>
                  <span>Sponsor</span>
                  <span>Cells</span>
                  <span title="Student growth metrics">Growth</span>
                  <span title="Session attendance">Participation</span>
                  <span title="Video submissions">Output</span>
                  <span title="SG progression rate">Succession</span>
                  <span>Overall</span>
                </div>
                {RANKINGS.map((r,i)=>{
                  const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':null
                  const scoreColor = r.overall>=9?'#4de8b0':r.overall>=8.5?'#d2ad44':r.overall>=8?'#72d0ff':'#b4c8e6'
                  return(
                    <div key={r.name} className={`rankings-row${r.isUser?' is-user':''}`}>
                      <span className="rank-num">{medal||`#${i+1}`}</span>
                      <span className="rank-sponsor">
                        <span className="rank-sponsor-logo">{r.logo}</span>
                        <span>{r.name}</span>
                        {r.isUser&&<span className="rank-you-badge">YOU</span>}
                      </span>
                      <span className="rank-cells">{r.cells} <small>cells</small></span>
                      <span className="rank-score">{r.growth}</span>
                      <span className="rank-score">{r.participation}</span>
                      <span className="rank-score">{r.output}</span>
                      <span className="rank-score">{r.succession}</span>
                      <span className="rank-overall" style={{color:scoreColor,background:`${scoreColor}18`}}>{r.overall}</span>
                    </div>
                  )
                })}
                <div className="rankings-legend">
                  <span>📈 Growth</span>
                  <span>🤝 Participation</span>
                  <span>🎬 Output</span>
                  <span>⬆️ Succession</span>
                  <p>Scores are calculated weekly from verified cell performance data. No self-reporting.</p>
                </div>
              </div>

              {/* Live sidebar */}
              <div className="rankings-sidebar">
                <div className="db-panel" style={{marginBottom:'1rem'}}>
                  <h3 className="db-panel-title">📐 How Scores Are Calculated</h3>
                  <p style={{fontSize:'0.75rem',color:'var(--text-soft)',marginBottom:'0.75rem'}}>Four equal dimensions. No self-reporting.</p>
                  {[
                    {icon:'🌱',label:'Growth',     desc:'Speaking confidence, voluntary participation, fear reduction'},
                    {icon:'🤝',label:'Participation',desc:'Balanced voices, low withdrawal, full group engagement'},
                    {icon:'🎬',label:'Output',      desc:'Clarity of shared ideas, content reusability, system contribution'},
                    {icon:'⬆️',label:'Succession', desc:'Learners helping others, new SGs emerging, content reuse'},
                  ].map(d=>(
                    <div key={d.label} style={{display:'flex',gap:'0.6rem',padding:'0.5rem 0',borderBottom:'1px solid var(--bg-card-alt)'}}>
                      <span style={{fontSize:'1rem',flexShrink:0}}>{d.icon}</span>
                      <div>
                        <strong style={{fontSize:'0.82rem',display:'block',color:'var(--navy)'}}>{d.label}</strong>
                        <span style={{fontSize:'0.72rem',color:'var(--text-soft)',lineHeight:1.4}}>{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="db-panel" style={{marginBottom:'1rem'}}>
                  <h3 className="db-panel-title">🌐 Public Live Page</h3>
                  <p style={{fontSize:'0.75rem',color:'var(--text-soft)',marginBottom:'0.75rem'}}>This ranking is visible to anyone on the web — it functions as your ethical advertising engine.</p>
                  <div style={{background:'var(--blue-pale)',border:'1.5px solid var(--blue)',borderRadius:'10px',padding:'0.85rem',marginBottom:'0.75rem'}}>
                    <p style={{margin:'0 0 0.4rem',fontSize:'0.78rem',fontWeight:700,color:'var(--navy)'}}>The public page shows:</p>
                    {['Live Learning Cell rankings','Sponsor impact leaderboard','Growth, participation, output, succession','Which sponsors support which cells'].map(i=>(
                      <span key={i} style={{display:'block',fontSize:'0.75rem',color:'var(--text-soft)',padding:'0.15rem 0'}}>✓ {i}</span>
                    ))}
                  </div>
                  <div style={{background:'rgba(255,107,107,0.06)',border:'1px solid rgba(255,107,107,0.2)',borderRadius:'10px',padding:'0.85rem'}}>
                    <p style={{margin:'0 0 0.4rem',fontSize:'0.78rem',fontWeight:700,color:'var(--navy)'}}>The public page never shows:</p>
                    {['Student identities','Personal data','Classroom footage','Live lesson content'].map(i=>(
                      <span key={i} style={{display:'block',fontSize:'0.75rem',color:'var(--text-soft)',padding:'0.15rem 0'}}>🚫 {i}</span>
                    ))}
                  </div>
                </div>

                <div className="db-panel">
                  <div style={{textAlign:'center',padding:'0.5rem 0'}}>
                    <p style={{fontSize:'0.78rem',color:'var(--text-soft)',marginBottom:'1rem'}}>Want a higher ranking?</p>
                    <button className="btn btn-primary" style={{width:'100%'}}>+ Fund More Cells</button>
                    <p style={{fontSize:'0.7rem',color:'var(--text-soft)',marginTop:'0.5rem',marginBottom:0}}>Rankings update after every learning cycle, not in real time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
