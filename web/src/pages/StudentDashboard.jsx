import { useState } from 'react'

function CoinRing({coins,goal,color}){const r=44,circ=2*Math.PI*r,fill=Math.min(coins/goal,1);return(<svg width="110" height="110" viewBox="0 0 110 110"><circle cx="55" cy="55" r={r} fill="none" stroke="rgba(114,208,255,0.12)" strokeWidth="8"/><circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${fill*circ} ${circ}`} strokeDashoffset={circ*0.25} strokeLinecap="round"/><text x="55" y="52" textAnchor="middle" fontSize="18" fontWeight="700" fill={color} fontFamily="Sora,sans-serif">{coins}</text><text x="55" y="66" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="Sora,sans-serif">coins</text></svg>)}

const PACKS=[
  {id:'pp',icon:'✏️',name:'Pencil Proof',videos:6,done:5,color:'#72d0ff',unlocked:true},
  {id:'kp',icon:'💰',name:'Kidinomics',videos:5,done:3,color:'#d2ad44',unlocked:true},
  {id:'vp',icon:'🗣️',name:'Voice & Presence',videos:6,done:1,color:'#ff9f5a',unlocked:true},
  {id:'sys',icon:'🧩',name:'Systems Thinking',videos:5,done:0,color:'#b083ff',unlocked:false,cost:35},
  {id:'ce',icon:'🎯',name:'Confidence Engineering',videos:5,done:0,color:'#ff6b9d',unlocked:false,cost:40},
]

export default function StudentDashboard(){
  const [activeTab,setActiveTab]=useState('home')
  const [done,setDone]=useState(false)
  return(
    <div className="dashboard-page">
      <div className="db-page-header student-header">
        <div className="db-header-inner">
          <div><p className="kicker">Student Portal — DOWNFLOW School of Life</p><h1 className="db-title">🎓 My Learning Dashboard</h1><p className="db-subtitle">Cell VN-01 · Week 7 of 12 · Student Guider: Minh P. · 🇻🇳 Hanoi</p></div>
          <div className="db-header-actions"><button className="btn btn-primary">📹 Submit Video Rep</button></div>
        </div>
        <div className="db-stats-row">
          <div className="db-stat-card" style={{'--stat-color':'#d2ad44'}}><CoinRing coins={145} goal={200} color="#d2ad44"/><div><p className="db-stat-label">My Coin Balance</p><p className="db-stat-sub">200 = next pack unlock</p></div></div>
          {[['🔥','7','Day Streak','Keep it up!','#4de8b0'],['🎬','23','Videos Done','Across 3 packs','#72d0ff'],['⬆️','SG Track','Pathway','On track','#ff9f5a']].map(([icon,val,label,sub,color])=>(
            <div key={label} className="db-stat-card" style={{'--stat-color':color}}><span className="db-stat-icon">{icon}</span><div><p className="db-stat-value">{val}</p><p className="db-stat-label">{label}</p><p className="db-stat-sub">{sub}</p></div></div>
          ))}
        </div>
      </div>
      <div className="db-tabs">
        {[['home','🏠 Home'],['packs','📦 My Packs'],['cell','🏫 My Cell'],['pathway','⬆️ Pathway']].map(([id,label])=>(
          <button key={id} className={`db-tab${activeTab===id?' active':''}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>
      <div className="db-content">
        {activeTab==='home'&&(
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div>
                <div className="today-challenge">
                  <div className="tc-kicker">⚡ Today's Micro-Challenge</div>
                  <h3 className="tc-title">"Explain a system you saw today"</h3>
                  <p className="tc-desc">From the <strong>Systems Thinking</strong> pack. Pick any system and explain how its parts connect in 60 seconds.</p>
                  <div className="tc-reward">🪙 +15 coins on completion</div>
                  <button className={`btn ${done?'btn-done':'btn-primary'}`} onClick={()=>setDone(true)} disabled={done}>{done?'✓ Challenge Submitted!':'Mark as Complete'}</button>
                </div>
                <div className="db-panel" style={{marginTop:'1.5rem'}}>
                  <h3 className="db-panel-title">📅 Next Session</h3>
                  <div className="next-session">
                    <div className="ns-date"><span className="ns-day">WED</span><span className="ns-num">9</span></div>
                    <div className="ns-info"><strong>Live Learning Cell · VN-01</strong><p>Theme: <em>Voice & Confidence</em></p><p style={{color:'var(--text-soft)',fontSize:'0.85rem'}}>4:00 PM · 60 min · Google Meet</p></div>
                    <button className="btn btn-primary btn-sm">Join Session</button>
                  </div>
                </div>
              </div>
              <div className="db-panel">
                <h3 className="db-panel-title">🕐 Recent Activity</h3>
                <div className="activity-list">
                  {[['🎬','Submitted video rep — Pencil Proof Day 5','+5','2h ago'],['🏆','Completed challenge: "Teach an imaginary friend"','+15','Yesterday'],['🔥','Weekly consistency streak earned','+20','3 days ago'],['💡','Helpful contribution in group session','+10','5 days ago'],['👋','Participated in session warm-up','+5','1 week ago']].map(([icon,label,coins,time])=>(
                    <div key={label} className="activity-row"><span className="activity-icon">{icon}</span><span className="activity-label">{label}</span><span className="activity-coins">{coins} 🪙</span><span className="activity-time">{time}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab==='packs'&&(
          <div className="db-tab-content">
            <p className="lead" style={{marginBottom:'1.5rem'}}>Your unlocked packs and progress. Complete video reps to earn coins and unlock deeper content.</p>
            <div className="student-packs-grid">
              {PACKS.map(pack=>(
                <div key={pack.id} className={`student-pack-card${pack.unlocked?'':' locked'}`} style={{'--pack-color':pack.color}}>
                  <div className="sp-header"><span className="sp-icon">{pack.icon}</span><div><strong className="sp-name">{pack.name}</strong>{pack.unlocked?<p className="sp-status">{pack.done}/{pack.videos} videos</p>:<p className="sp-status locked-status">🔒 {pack.cost} coins to unlock</p>}</div>{pack.unlocked&&<span className="sp-pct">{Math.round(pack.done/pack.videos*100)}%</span>}</div>
                  {pack.unlocked&&<div className="sp-bar-track"><div className="sp-bar-fill" style={{width:`${(pack.done/pack.videos)*100}%`}}/></div>}
                  {!pack.unlocked&&<button className="btn btn-secondary btn-sm" style={{marginTop:'0.75rem'}}>Unlock with Coins</button>}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab==='cell'&&(
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">🏫 Cell VN-01 — Hanoi 🇻🇳</h3>
                <div className="cell-info-block">
                  {[['Region','Hanoi, Vietnam'],['Cycle Week','Week 7 / 12'],['Sessions','14 of 24 complete'],['Facilitator','Phuong V.'],['Sponsor','TechCorp VN (anonymous)']].map(([k,v])=><div key={k} className="cell-info-row"><span>{k}</span><strong>{v}</strong></div>)}
                </div>
                <div className="sp-bar-track" style={{marginTop:'1rem'}}><div className="sp-bar-fill" style={{width:'58%',background:'#4de8b0'}}/></div>
                <p style={{color:'var(--text-soft)',fontSize:'0.82rem',marginTop:'0.4rem'}}>Cycle progress: 58%</p>
              </div>
              <div className="db-panel">
                <h3 className="db-panel-title">👥 Cell Members</h3>
                <div className="cell-members-list">
                  {[['🧑‍🏫','Minh P.','Student Guider',14,false],['👩','Linh T.','ASG',21,false],['🙋','You','Student',7,true],['👧','Hoa N.','Student',5,false],['👦','An B.','Student',3,false]].map(([av,name,role,streak,isMe])=>(
                    <div key={name} className={`cell-member-row${isMe?' is-me':''}`}>
                      <span className="cm-avatar">{av}</span>
                      <div className="cm-info"><strong>{name}{isMe?' (You)':''}</strong><span>{role}</span></div>
                      <div className="cm-streak"><span>🔥</span><span>{streak}d</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab==='pathway'&&(
          <div className="db-tab-content">
            <div className="pathway-hero"><p className="kicker">Your Growth Path</p><h2>Student → Guider → Facilitator</h2><p className="lead">Every level teaches the level below. Progress is earned through consistency, not tests.</p></div>
            <div className="pathway-ladder">
              {[
                {level:'Learning Cell Student',icon:'🎓',desc:'Learn, submit video reps, earn coins, participate in sessions.',status:'current',progress:68},
                {level:'Student Guider (SG)',icon:'🧑‍🏫',desc:'Guide a cell of 5 students. Lead sessions with facilitator support.',status:'next',progress:0},
                {level:'Advanced Student Guider',icon:'⭐',desc:'Train new SGs and manage multiple cells.',status:'future',progress:0},
                {level:'Intern Facilitator',icon:'🔬',desc:'Shadow experienced facilitators. Build your own delivery style.',status:'future',progress:0},
                {level:'Facilitator',icon:'🧭',desc:'Full programme delivery. Manage ASGs, drive regional impact.',status:'future',progress:0},
              ].map((step,i)=>(
                <div key={step.level} className={`pathway-step ${step.status}`}>
                  <div className="pathway-step-num">{i+1}</div>
                  <div className="pathway-step-body">
                    <div className="pathway-step-header"><span className="pathway-step-icon">{step.icon}</span><strong>{step.level}</strong>{step.status==='current'&&<span className="current-badge">● You are here</span>}{step.status==='next'&&<span className="next-badge">→ Next</span>}</div>
                    <p>{step.desc}</p>
                    {step.status==='current'&&<><div className="sp-bar-track"><div className="sp-bar-fill" style={{width:`${step.progress}%`,background:'#4de8b0'}}/></div><p style={{fontSize:'0.82rem',color:'var(--text-soft)',marginTop:'0.4rem'}}>SG readiness: {step.progress}%</p></>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
