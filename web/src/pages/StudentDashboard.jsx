import { useState } from 'react'
import OnboardingBanner from '../components/OnboardingBanner.jsx'
import { HexIcon } from '../components/HexSymbols.jsx'

const CELL_MEMBERS = [
  { av:'🧑‍🏫', name:'Minh P.',  role:'Student Guider', streak:14, isMe:false },
  { av:'👩',   name:'Linh T.',  role:'ASG',             streak:21, isMe:false },
  { av:'🙋',   name:'You',      role:'Student',         streak:7,  isMe:true  },
  { av:'👧',   name:'Hoa N.',   role:'Student',         streak:5,  isMe:false },
  { av:'👦',   name:'An B.',    role:'Student',         streak:3,  isMe:false },
]

const CELL_CONTENTS = [
  { pack:'✏️ Pencil Proof',  week:1,  topic:'Explain a picture in 60 seconds',   status:'done'    },
  { pack:'✏️ Pencil Proof',  week:2,  topic:'Retell a story without notes',        status:'done'    },
  { pack:'✏️ Pencil Proof',  week:3,  topic:'Describe how something works',       status:'done'    },
  { pack:'✏️ Pencil Proof',  week:4,  topic:'Teach an imaginary friend',          status:'done'    },
  { pack:'✏️ Pencil Proof',  week:5,  topic:'Explain using only simple words',    status:'done'    },
  { pack:'💰 Kidinomics',    week:6,  topic:'Value Exchange — real vs money',     status:'done'    },
  { pack:'💰 Kidinomics',    week:7,  topic:'Effort & Reward — who decides?',     status:'current' },
  { pack:'💰 Kidinomics',    week:8,  topic:'Save & Share',                        status:'locked'  },
  { pack:'🗣️ Voice',         week:9,  topic:'Tone, pace & volume',                status:'locked'  },
  { pack:'🗣️ Voice',         week:10, topic:'Storytelling & presence',            status:'locked'  },
  { pack:'🗣️ Voice',         week:11, topic:'Leadership in speaking',             status:'locked'  },
  { pack:'🗣️ Voice',         week:12, topic:'Final presentation',                 status:'locked'  },
]

const PARTICIPATION_DATA = [
  { name:'Minh P.',  att:100, reps:14, streak:14, score:'9.4' },
  { name:'Linh T.',  att:95,  reps:18, streak:21, score:'9.1' },
  { name:'You',      att:90,  reps:9,  streak:7,  score:'8.3' },
  { name:'Hoa N.',   att:85,  reps:7,  streak:5,  score:'7.9' },
  { name:'An B.',    att:75,  reps:5,  streak:3,  score:'7.2' },
]

const VIDEO_REPS = [
  { icon:'🎬', title:'Pencil Proof — Week 5 explanation', date:'3 days ago', status:'reviewed'  },
  { icon:'🎬', title:'Kidinomics — Value exchange demo',  date:'1 week ago', status:'reviewed'  },
  { icon:'🎬', title:'Pencil Proof — Teach a friend',     date:'2 weeks ago', status:'reviewed' },
  { icon:'🎬', title:'Pencil Proof — 60-second story',    date:'3 weeks ago', status:'reviewed' },
]

function CoinRing({coins,goal,color}){const r=44,circ=2*Math.PI*r,fill=Math.min(coins/goal,1);return(<svg width="110" height="110" viewBox="0 0 110 110"><circle cx="55" cy="55" r={r} fill="none" stroke="rgba(114,208,255,0.12)" strokeWidth="8"/><circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${fill*circ} ${circ}`} strokeDashoffset={circ*0.25} strokeLinecap="round"/><text x="55" y="52" textAnchor="middle" fontSize="18" fontWeight="700" fill={color} fontFamily="Sora,sans-serif">{coins}</text><text x="55" y="66" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="Sora,sans-serif">coins</text></svg>)}

const PACKS=[
  {id:'pp',icon:'✏️',name:'Pencil Proof',videos:6,done:5,color:'#72d0ff',unlocked:true},
  {id:'kp',icon:'💰',name:'Kidinomics',videos:5,done:3,color:'#d2ad44',unlocked:true},
  {id:'vp',icon:'🗣️',name:'Voice & Presence',videos:6,done:1,color:'#ff9f5a',unlocked:true},
  {id:'sys',icon:'🧩',name:'Systems Thinking',videos:5,done:0,color:'#b083ff',unlocked:false,cost:35},
  {id:'ce',icon:'🎯',name:'Confidence Engineering',videos:5,done:0,color:'#ff6b9d',unlocked:false,cost:40},
]

function CellGroupView() {
  const [cellTab, setCellTab] = useState('overview')

  return (
    <div className="db-tab-content">
      {/* Cell header */}
      <div className="db-panel" style={{marginBottom:'1.5rem',background:'linear-gradient(135deg,var(--blue-pale),var(--bg-card))'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <p className="kicker" style={{marginBottom:'0.25rem'}}>🏫 Group A · Cell VN-01</p>
            <h2 style={{margin:0,fontSize:'1.3rem',fontWeight:800,color:'var(--navy)'}}>Hanoi Learning Cell 🇻🇳</h2>
            <p style={{margin:'0.3rem 0 0',fontSize:'0.84rem',color:'var(--text-soft)'}}>Facilitator: Phuong V. · Sponsor: Anonymous · Season 1</p>
          </div>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            {[['Week','7 / 12'],['Health','92'],['Sessions','14 / 24']].map(([k,v])=>(
              <div key={k} style={{textAlign:'center',background:'var(--bg-card)',borderRadius:'10px',padding:'0.5rem 0.9rem',border:'1px solid var(--border)',boxShadow:'var(--shadow-sm)'}}>
                <strong style={{display:'block',fontSize:'1.1rem',color:'var(--navy)',fontWeight:800}}>{v}</strong>
                <span style={{fontSize:'0.72rem',color:'var(--text-soft)',textTransform:'uppercase',letterSpacing:'0.06em'}}>{k}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sp-bar-track" style={{marginTop:'1rem',height:'6px'}}>
          <div className="sp-bar-fill" style={{width:'58%',background:'#4de8b0'}}/>
        </div>
        <p style={{fontSize:'0.78rem',color:'var(--text-soft)',marginTop:'0.3rem'}}>Cycle progress: 58% · Week 7 of 12</p>
      </div>

      {/* Sub-tabs */}
      <div className="cell-group-tabs">
        {[['overview','📋 Overview'],['contents','📦 Contents'],['participation','📊 Participation'],['reps','🎬 My Reps']].map(([id,label])=>(
          <button key={id} className={`cell-group-tab${cellTab===id?' active':''}`} onClick={()=>setCellTab(id)}>{label}</button>
        ))}
      </div>

      {/* Overview */}
      {cellTab==='overview' && (
        <div className="two-col-grid">
          <div className="db-panel">
            <h3 className="db-panel-title">👥 Group Members</h3>
            <div className="cell-members-list">
              {CELL_MEMBERS.map(m=>(
                <div key={m.name} className={`cell-member-row${m.isMe?' is-me':''}`}>
                  <span className="cm-avatar">{m.av}</span>
                  <div className="cm-info">
                    <strong>{m.name}{m.isMe?' (You)':''}</strong>
                    <span>{m.role}</span>
                  </div>
                  <div className="cm-streak"><span>🔥</span><span>{m.streak}d</span></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="db-panel" style={{marginBottom:'1.25rem'}}>
              <h3 className="db-panel-title">📅 Next Session</h3>
              <div className="next-session">
                <div className="ns-date"><span className="ns-day">WED</span><span className="ns-num">9</span></div>
                <div className="ns-info">
                  <strong>Live Learning Cell · VN-01</strong>
                  <p>Theme: <em>Effort & Reward</em> — Kidinomics Wk 7</p>
                  <p style={{color:'var(--text-soft)',fontSize:'0.85rem'}}>4:00 PM · 60 min · Google Meet</p>
                </div>
                <button className="btn btn-primary btn-sm">Join →</button>
              </div>
            </div>
            <div className="db-panel">
              <h3 className="db-panel-title">📈 Cell Stats</h3>
              {[
                ['Faculty Growth','8.9 / 10','This cycle'],
                ['Participation','90%','Avg attendance'],
                ['Output Score','8.3','Video reps avg'],
                ['Cell Health','92','Active & strong'],
              ].map(([k,v,note])=>(
                <div key={k} className="cell-info-row">
                  <div><span style={{fontSize:'0.84rem',color:'var(--text-soft)'}}>{k}</span><p style={{margin:0,fontSize:'0.72rem',color:'var(--text-muted)'}}>{note}</p></div>
                  <strong style={{color:'var(--navy)'}}>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contents */}
      {cellTab==='contents' && (
        <div className="db-panel">
          <h3 className="db-panel-title">📦 Curriculum Contents — VN-01</h3>
          <p style={{fontSize:'0.84rem',color:'var(--text-soft)',marginBottom:'1.25rem'}}>12-week content schedule. Click a session to see details.</p>
          <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
            {CELL_CONTENTS.map((c,i)=>{
              const sc = c.status==='done'?'var(--green)':c.status==='current'?'var(--blue)':'var(--text-muted)'
              const bg = c.status==='done'?'var(--green-pale)':c.status==='current'?'var(--blue-pale)':'var(--bg-page)'
              const bd = c.status==='done'?'var(--green)':c.status==='current'?'var(--blue)':'var(--border)'
              return (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.65rem 0.9rem',background:bg,border:`1.5px solid ${bd}`,borderRadius:'var(--radius-sm)',opacity:c.status==='locked'?0.6:1}}>
                  <span style={{fontSize:'0.75rem',fontWeight:700,color:'var(--text-muted)',minWidth:'28px'}}>W{c.week}</span>
                  <span style={{fontSize:'0.88rem',flex:1,color:'var(--navy)'}}>{c.pack} — <span style={{fontWeight:600}}>{c.topic}</span></span>
                  <span style={{fontSize:'0.72rem',fontWeight:700,color:sc,textTransform:'uppercase',letterSpacing:'0.05em'}}>
                    {c.status==='done'?'✓ Done':c.status==='current'?'▶ Now':'🔒'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Participation */}
      {cellTab==='participation' && (
        <div className="two-col-grid">
          <div className="db-panel">
            <h3 className="db-panel-title">📊 Attendance & Participation</h3>
            <p style={{fontSize:'0.82rem',color:'var(--text-soft)',marginBottom:'1.25rem'}}>Private scores — only your facilitator can see full details.</p>
            {PARTICIPATION_DATA.map(p=>(
              <div key={p.name} style={{marginBottom:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'0.84rem'}}>
                  <strong style={{color:p.name==='You'?'var(--blue)':'var(--navy)'}}>{p.name}{p.name==='You'?' (You)':''}</strong>
                  <span style={{color:'var(--text-soft)'}}>{p.att}% attendance · {p.reps} reps</span>
                </div>
                <div className="participation-track">
                  <div className="participation-fill" style={{width:`${p.att}%`,background:p.att>=90?'var(--green)':p.att>=80?'var(--gold)':'var(--blue-light)'}}/>
                </div>
              </div>
            ))}
          </div>
          <div className="db-panel">
            <h3 className="db-panel-title">🏆 Group Streaks</h3>
            <p style={{fontSize:'0.82rem',color:'var(--text-soft)',marginBottom:'1.25rem'}}>Longest current streaks in your cell.</p>
            {[...PARTICIPATION_DATA].sort((a,b)=>b.streak-a.streak).map((p,i)=>(
              <div key={p.name} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.55rem 0',borderBottom:'1px solid var(--bg-card-alt)'}}>
                <span style={{fontWeight:800,color:'var(--navy)',minWidth:'20px',fontSize:'0.88rem'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`}</span>
                <span style={{flex:1,fontSize:'0.85rem',fontWeight:600,color:p.name==='You'?'var(--blue)':'var(--navy)'}}>{p.name}{p.name==='You'?' (You)':''}</span>
                <span style={{fontSize:'0.88rem',fontWeight:700,color:'#d4845a'}}>🔥 {p.streak}d</span>
              </div>
            ))}
            <div style={{marginTop:'1.25rem',padding:'1rem',background:'var(--gold-pale)',border:'1px solid var(--gold)',borderRadius:'10px'}}>
              <strong style={{display:'block',fontSize:'0.84rem',color:'var(--navy)',marginBottom:'0.3rem'}}>Your Score This Week</strong>
              <div style={{fontSize:'2rem',fontWeight:900,color:'var(--gold-dark)'}}>8.3</div>
              <p style={{margin:0,fontSize:'0.75rem',color:'var(--text-soft)'}}>Attendance + output + consistency. Up from 7.8 last week.</p>
            </div>
          </div>
        </div>
      )}

      {/* My Reps */}
      {cellTab==='reps' && (
        <div className="db-panel">
          <div className="db-panel-header">
            <h3 className="db-panel-title">🎬 My Video Reps</h3>
            <button className="btn btn-primary btn-sm">+ Submit New Rep</button>
          </div>
          <p style={{fontSize:'0.84rem',color:'var(--text-soft)',marginBottom:'1.25rem'}}>Every video rep earns coins and contributes to your participation score. Aim for 2+ per week.</p>
          {VIDEO_REPS.map((v,i)=>(
            <div key={i} className="video-rep-row">
              <div className="vr-thumb">{v.icon}</div>
              <div className="vr-info">
                <strong>{v.title}</strong>
                <span>Submitted {v.date}</span>
              </div>
              <span className={`vr-status ${v.status}`}>{v.status==='reviewed'?'✓ Reviewed':'⏳ Pending'}</span>
            </div>
          ))}
          <div style={{marginTop:'1.5rem',padding:'1rem',background:'var(--blue-pale)',border:'1.5px solid var(--blue)',borderRadius:'var(--radius-sm)'}}>
            <strong style={{display:'block',marginBottom:'0.4rem',color:'var(--navy)'}}>📹 How Video Reps Work</strong>
            <p style={{margin:0,fontSize:'0.82rem',color:'var(--text-soft)',lineHeight:1.6}}>Record a 60-second video completing the week's challenge. Your Student Guider reviews it and awards coins. No grades — only completion and effort count.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function StudentDashboard(){
  const [activeTab,setActiveTab]=useState('home')
  const [done,setDone]=useState(false)
  const [showOnboarding,setShowOnboarding]=useState(true)
  return(
    <div className="dashboard-page">
      {showOnboarding&&(
        <div style={{padding:'2rem 2rem 0'}}>
          <OnboardingBanner role="student" onDismiss={()=>setShowOnboarding(false)}/>
        </div>
      )}
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
        {[['home','🏠 Home'],['packs','📦 My Packs'],['cell','🏫 My Cell'],['tools','🔗 My Tools'],['pathway','⬆️ Pathway']].map(([id,label])=>(
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
          <CellGroupView />
        )}
        {activeTab==='tools'&&(
          <div className="db-tab-content">
            <div className="two-col-grid" style={{marginBottom:'1.5rem'}}>

              {/* ClassDojo */}
              <div className="db-panel integration-panel classdojo-panel">
                <div className="integration-header">
                  <div className="integration-logo classdojo-logo">CD</div>
                  <div>
                    <h3 className="db-panel-title" style={{margin:0}}>ClassDojo</h3>
                    <span className="integration-status active">● Your classroom front porch</span>
                  </div>
                </div>
                <p style={{fontSize:'0.84rem',color:'var(--text-soft)',lineHeight:1.6,margin:'0.75rem 0 1rem'}}>
                  ClassDojo is where your facilitator shares daily check-ins, your parent can see updates, and the mood of your group is tracked. It is the warm, friendly part of your learning experience.
                </p>
                <div className="integration-flows">
                  {['Daily mood check-ins','See parent messages','Simple session feedback','Emotional check-ins with your guider'].map(item=>(
                    <div key={item} className="integration-flow-row"><span style={{color:'#4de8b0'}}>✓</span><span>{item}</span></div>
                  ))}
                </div>
                <a href="https://www.classdojo.com" target="_blank" rel="noreferrer" className="btn btn-primary" style={{marginTop:'1.25rem',display:'inline-block'}}>
                  Open ClassDojo →
                </a>
              </div>

              {/* Google Meet */}
              <div className="db-panel integration-panel meet-panel">
                <div className="integration-header">
                  <div className="integration-logo meet-logo">M</div>
                  <div>
                    <h3 className="db-panel-title" style={{margin:0}}>Google Meet</h3>
                    <span className="integration-status active">● Your live learning room</span>
                  </div>
                </div>
                <p style={{fontSize:'0.84rem',color:'var(--text-soft)',lineHeight:1.6,margin:'0.75rem 0 1rem'}}>
                  Google Meet is where your live Learning Cell sessions happen. Your facilitator will share the link before each session. After the session, your reps and coins are recorded back here in DOWNFLOW.
                </p>
                <div className="integration-flows">
                  {[
                    {icon:'📅',step:'Session scheduled — see your Home tab'},
                    {icon:'🔗',step:'Join button opens Google Meet'},
                    {icon:'🎓',step:'Session runs — speak, try, participate'},
                    {icon:'🪙',step:'Back here — coins and attendance logged'},
                  ].map(s=>(
                    <div key={s.step} className="integration-flow-row"><span>{s.icon}</span><span>{s.step}</span></div>
                  ))}
                </div>
                <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="btn btn-primary" style={{marginTop:'1.25rem',display:'inline-block'}}>
                  Join Session →
                </a>
              </div>
            </div>

            <div className="db-panel" style={{background:'var(--blue-pale)',border:'1.5px solid var(--blue)'}}>
              <h3 className="db-panel-title">💡 How Your Tools Work Together</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginTop:'0.75rem'}}>
                {[
                  {icon:'🚪',label:'ClassDojo',desc:'How your teacher and parent see your daily mood and participation.'},
                  {icon:'📹',label:'Google Meet',desc:'Where your live cell sessions happen — video, voice, activities.'},
                  {icon:'🏙',label:'DOWNFLOW',desc:'Where your coins, reps, packs, and growth story live forever.'},
                ].map(item=>(
                  <div key={item.label} style={{textAlign:'center',padding:'1rem',background:'var(--bg-card)',borderRadius:'12px'}}>
                    <span style={{fontSize:'1.75rem',display:'block',marginBottom:'0.4rem'}}>{item.icon}</span>
                    <strong style={{display:'block',fontSize:'0.9rem',color:'var(--navy)',marginBottom:'0.3rem'}}>{item.label}</strong>
                    <p style={{margin:0,fontSize:'0.78rem',color:'var(--text-soft)',lineHeight:1.55}}>{item.desc}</p>
                  </div>
                ))}
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
