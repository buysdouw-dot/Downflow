import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HexSystemRow } from '../components/HexSymbols.jsx'
import MyVoiceStory from '../components/MyVoiceStory.jsx'

const PACKS = [
  { id: 'pencil-proof', icon: '✏️', title: 'Pencil Proof Pack', tagline: 'Thinking & speaking without writing', videos: 6, coinLabel: 'reflection participation', exercises: ['Explain a picture in 60 seconds', 'Retell a story without notes', 'Describe how something works'], challenges: ['30-second explanation challenge', 'Teach an imaginary friend', 'Explain using only simple words'], coins: 40, vnd: '25,000', sponsorLabel: 'Thinking Skills Pack', color: '#72d0ff', tags: ['thinking'] },
  { id: 'kidinomics', icon: '💰', title: 'Kidinomics Pack', tagline: 'Understanding value, effort, and contribution', videos: 5, coinLabel: 'value creation actions', exercises: ['Explain how you helped someone', 'Describe why something is valuable', 'Role-play giving help'], challenges: ['Create value without money', 'Choose effort over reward', 'Help someone & explain the change'], coins: 35, vnd: '25,000', sponsorLabel: 'Young Producers Pack', color: '#d2ad44', tags: ['thinking'] },
  { id: 'self-awareness', icon: '🧠', title: 'Self-Awareness Pack', tagline: 'No labels — just insight into how you think', videos: 5, coinLabel: 'reflection participation', exercises: ['Choose how you would solve a problem', 'Explain how a friend thinks differently', 'Reflect: what feels easy, what feels hard'], challenges: ['Try the opposite style for 5 minutes', 'Explain your preference without judging', 'Listen first, then speak challenge'], coins: 30, vnd: '20,000', sponsorLabel: 'Understanding Minds Pack', color: '#b083ff', tags: ['thinking'] },
  { id: 'water-confidence', icon: '🏊', title: 'Swimming & Water Confidence', tagline: 'Breathing, calm, and body confidence', videos: 5, coinLabel: 'calm participation', exercises: ['Breathing with rhythm', 'Body relaxation scan', 'Calm voice practice'], challenges: ['Hold calm breath while speaking', 'Speak slower than normal', 'Stay calm under mild pressure'], coins: 30, vnd: '20,000', sponsorLabel: 'Calm & Courage Pack', color: '#4de8b0', tags: ['confidence'] },
  { id: 'body-regulation', icon: '🧘', title: 'Body Intelligence & Regulation', tagline: 'Your body affects your voice and presence', videos: 5, coinLabel: 'consistency', exercises: ['Posture check + speaking', 'Movement + naming feelings', 'Slow movement storytelling'], challenges: ['Speak while standing strong', 'Notice tension and release it', 'Calm reset in 60 seconds'], coins: 30, vnd: '20,000', sponsorLabel: 'Calm Focus Pack', color: '#4de8b0', tags: ['confidence'] },
  { id: 'voice-presence', icon: '🗣️', title: 'Voice, Presence & Expression', tagline: 'Speaking so people listen — without volume', videos: 6, coinLabel: 'speaking participation', exercises: ['Read aloud with emotion', 'Change tone, same sentence', 'Pause before speaking'], challenges: ['Speak with calm confidence', 'Tell a story with pauses', 'Use voice, not volume'], coins: 40, vnd: '30,000', sponsorLabel: 'Confident Voice Pack', color: '#ff9f5a', tags: ['voice'] },
  { id: 'social-systems', icon: '🤝', title: 'Social Systems & Group Dynamics', tagline: 'Group intelligence & cooperation', videos: 5, coinLabel: 'cooperation', exercises: ['Role rotation activity', 'Group decision explanation', 'Reflect on teamwork moments'], challenges: ['Support someone else first', 'Let someone else lead', 'Explain group success'], coins: 35, vnd: '25,000', sponsorLabel: 'Leadership Basics Pack', color: '#72d0ff', tags: ['social'] },
  { id: 'systems-thinking', icon: '🧩', title: 'Systems Thinking', tagline: 'Cause, effect & growth — everything connects', videos: 5, coinLabel: 'problem solving', exercises: ['Explain a simple system', 'Trace what happens next', 'Identify feedback loops'], challenges: ['Predict an outcome', 'Fix a broken system', 'Explain how change spreads'], coins: 35, vnd: '25,000', sponsorLabel: 'Future Thinkers Pack', color: '#d2ad44', tags: ['thinking'] },
  { id: 'confidence-engineering', icon: '🎯', title: 'Confidence Engineering', tagline: 'Confidence is built — small wins matter', videos: 5, coinLabel: 'consistency streaks', exercises: ['Speak once more than yesterday', 'Repeat a task with ease', 'Celebrate effort verbally'], challenges: ['Do something slightly uncomfortable', 'Speak without fear of mistakes', 'Try again challenge'], coins: 40, vnd: '30,000', sponsorLabel: 'Brave Steps Pack', color: '#ff6b9d', tags: ['confidence'] },
  { id: 'life-skills', icon: '🛠️', title: 'Life Skills & Practical Intelligence', tagline: 'Real-world communication that matters', videos: 5, coinLabel: 'real-world application', exercises: ['Role-play daily situations', 'Explain a problem clearly', 'Practice polite disagreement'], challenges: ['Ask a clear question', 'Explain your plan', 'Solve a daily problem verbally'], coins: 35, vnd: '25,000', sponsorLabel: 'Ready for Life Pack', color: '#4de8b0', tags: ['social'] },
]

function PackCard({ p }) {
  return (
    <article className="pack-card" data-pack={p.id} style={{ '--pack-color': p.color }}>
      <div className="pack-header">
        <span className="pack-icon">{p.icon}</span>
        <div><h3 className="pack-title">{p.title}</h3><p className="pack-tagline">{p.tagline}</p></div>
        <span className="pack-video-badge">{p.videos} videos</span>
      </div>
      <div className="pack-body">
        <div className="pack-col"><p className="pack-col-label">🔁 Repeatable Exercises</p><ul>{p.exercises.map((e,i)=><li key={i}>{e}</li>)}</ul></div>
        <div className="pack-col"><p className="pack-col-label">⚡ Micro-Challenges</p><ul>{p.challenges.map((c,i)=><li key={i}>{c}</li>)}</ul></div>
      </div>
      <div className="pack-unlock">
        <p className="pack-unlock-label">🔓 Unlock this pack</p>
        <div className="unlock-options">
          <div className="unlock-opt coin-opt"><span className="coin-icon">🪙</span><strong>{p.coins}</strong><span>coins</span><span className="coin-context">{p.coinLabel}</span></div>
          <div className="unlock-opt pay-opt"><span>💳</span><strong>{p.vnd} VND</strong></div>
          <div className="unlock-opt gift-opt"><span>🎁</span><strong>Sponsor gift</strong><span className="gift-label">{p.sponsorLabel}</span></div>
        </div>
        <button className="btn-unlock" onClick={e=>{const b=e.currentTarget;b.textContent='✓ Added';b.classList.add('unlocked');setTimeout(()=>{b.textContent='Preview Pack';b.classList.remove('unlocked')},2200)}}>Preview Pack</button>
      </div>
    </article>
  )
}

function handleFilter(e) {
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'))
  e.currentTarget.classList.add('active')
  const f = e.currentTarget.dataset.filter
  document.querySelectorAll('.pack-card').forEach(card=>{
    const tags = PACKS.find(p=>p.id===card.dataset.pack)?.tags||[]
    card.style.display = f==='all'||tags.includes(f) ? '' : 'none'
  })
}

export default function Home() {
  useEffect(()=>{
    const metrics = document.querySelectorAll('.metric')
    const io = new IntersectionObserver((entries,observer)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return
        const el=entry.target, target=Number(el.dataset.target), dur=1400, start=performance.now()
        const tick=t=>{const p=Math.min((t-start)/dur,1);el.textContent=Math.floor(p*target).toLocaleString();if(p<1)requestAnimationFrame(tick)}
        requestAnimationFrame(tick); observer.unobserve(el)
      })
    })
    metrics.forEach(m=>io.observe(m))
    return ()=>io.disconnect()
  },[])

  return (
    <>
      {/* HERO — "Unlock Learning. Fund Futures." */}
      <section className="hero hero-new section">
        <div className="hero-copy">
          <p className="kicker">Safe, inclusive learning spaces funded by impactful organisations</p>
          <h1 className="hero-headline">Unlock Learning.<br/><span className="hero-headline-gold">Fund Futures.</span></h1>
          <p className="subhead">A sponsor-funded learning network where students learn, produce real value, and grow into the next generation of mentors and facilitators.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary hero-cta" to="/sponsor">SEE HOW IT WORKS</Link>
            <a className="btn btn-secondary" href="#ecosystem">Explore the Model</a>
          </div>
          <div className="hero-portal-row" style={{marginTop:'1.25rem'}}>
            <Link to="/sponsor" className="portal-chip sponsor-chip">🏦 Sponsor Portal</Link>
            <Link to="/student" className="portal-chip student-chip">🎓 Student Portal</Link>
            <Link to="/facilitator" className="portal-chip facilitator-chip">🧭 Facilitators</Link>
            <Link to="/connector" className="portal-chip connector-chip">🔗 Connectors</Link>
          </div>
          {/* Trusted by logos */}
          <div className="hero-trusted">
            <span className="trusted-label">Trusted by leading organisations</span>
            <div className="trusted-logos">
              {['⬡ COREX','◈ LYTICA','✦ CRESTO','▲ TRAVOS'].map(s=>(
                <span key={s} className="trusted-logo">{s}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Right side: stacked cell visual */}
        <div className="hero-visual">
          <div className="hero-cell-stack">
            {[
              {label:'CRESTO', color:'#4de8b0', score:'9.4', delay:'0s'},
              {label:'LYTICA', color:'#d2ad44', score:'8.8', delay:'0.15s'},
              {label:'TRAVOS', color:'#72d0ff', score:'8.5', delay:'0.3s'},
            ].map((c,i)=>(
              <div key={c.label} className="hero-cell-coin" style={{
                '--coin-color': c.color,
                animationDelay: c.delay,
                zIndex: 3 - i,
                transform: `translateY(${i * 32}px) scale(${1 - i * 0.05})`,
              }}>
                <span className="coin-flag" style={{color: c.color}}>{c.label}</span>
                <div className="coin-score">{c.score}</div>
              </div>
            ))}
          </div>
          <div className="hero-cell-cards">
            {[
              {group:'Group A', fac:'Emily Trang', score:'9.2', active:true},
              {group:'Group B', fac:'Ali Nguyen',  score:'9.0', active:false},
              {group:'Group C', fac:'David Pham',  score:'8.8', active:false},
            ].map(c=>(
              <div key={c.group} className={`hero-cell-card${c.active?' active':''}`}>
                <span className="hcc-icon">🏫</span>
                <div className="hcc-info">
                  <strong>{c.group}</strong>
                  <span>{c.fac}</span>
                </div>
                <span className="hcc-score" style={{color: c.active?'#4de8b0':'#d2ad44'}}>{c.score}</span>
              </div>
            ))}
          </div>
          <div className="hero-regions" style={{marginTop:'0.75rem'}}>
            <span>🇻🇳 Vietnam</span><span>🇩🇪 Germany</span><span>🇷🇺 Russia</span><span>🌍 Global</span>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM DIAGRAM */}
      <section className="section ecosystem-section" id="ecosystem">
        <div className="section-head">
          <p className="kicker">Learning Cells · Ethical Competition · Public Impact</p>
          <h2>The Sponsor Model Ecosystem</h2>
        </div>
        <div className="ecosystem-diagram">
          {/* Top row */}
          <div className="eco-top">
            <div className="eco-box eco-sponsors">
              <strong>SPONSORS</strong>
              <p>Fund &amp; Compete<br/>Rankings &amp; Reports</p>
            </div>
            <div className="eco-arrows-h">
              <span className="eco-arrow-label">← Funding &amp; Visibility →</span>
            </div>
            <div className="eco-box eco-connectors">
              <strong>CONNECTORS</strong>
              <p>Recruit &amp; Form<br/>Guide &amp; Support</p>
            </div>
          </div>
          {/* Platform center */}
          <div className="eco-mid">
            <div className="eco-arrow-v">↑ Performance Data</div>
            <div className="eco-box eco-platform">
              <strong>PLATFORM</strong>
              <p>System Hub &amp; Governance</p>
            </div>
            <div className="eco-arrow-v">Onboarding &amp; Incentives ↑</div>
          </div>
          {/* Cells row */}
          <div className="eco-cells-row">
            <div className="eco-box eco-cells">
              <strong>LEARNING CELLS</strong>
              <div className="eco-groups">
                {['Group A','Group B','Group C'].map(g=>(
                  <div key={g} className="eco-group">
                    <span className="eco-group-icon">👥</span>
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom row */}
          <div className="eco-bottom">
            <div className="eco-bottom-item">
              <span className="eco-bottom-icon">👨‍👩‍👧</span>
              <strong>STUDENTS &amp; FAMILIES</strong>
              <p>Free Participation</p>
              <small>Awareness · Curiosity · Skills &amp; Output · Value &amp; Growth · No Cost · No Debt</small>
            </div>
            <div className="eco-bottom-item eco-facilitator-box">
              <span className="eco-bottom-icon">🧭</span>
              <strong>FACILITATORS</strong>
              <p>Teach &amp; Guide</p>
            </div>
            <div className="eco-bottom-item">
              <span className="eco-bottom-icon">🌍</span>
              <strong>PUBLIC IMPACT</strong>
              <p>Ethical Reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section" id="problem">
        <div className="section-head"><p className="kicker">Why This Exists</p><h2>The Problem with Traditional Education</h2></div>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Traditional Education Extracts</h3>
            <ul><li>Passive, consumer-mode learning</li><li>Large classrooms, low engagement</li><li>Grades over confidence</li><li>No economic participation for learners</li><li>Fear of speaking, fear of mistakes</li></ul>
          </div>
          <div className="problem-callout">
            Students consume information but rarely <strong>produce value</strong>. The result is low fluency, low confidence, and a weak transition to real-world contribution.<br/><br/>
            <em>Downflow inverts this. Learning creates output. Output creates value. Value funds more learning.</em>
          </div>
        </div>
      </section>

      {/* PRODUCING MODEL */}
      <section className="section" id="model">
        <div className="section-head"><p className="kicker">The Core System</p><h2>The Producing Model</h2></div>
        <p className="lead">Every part of Downflow follows one loop: <strong>Input → Play → Output → Reuse → Circulation.</strong> If a feature can't produce value, it doesn't belong.</p>
        <div className="inverted-pyramid">
          {[
            { label: 'Awareness & Mind', sub: 'Curiosity · Thinking · Identity', color: '#d2ad44' },
            { label: 'Confidence & Expression', sub: 'Voice · Safety · Presence', color: '#ff9f5a' },
            { label: 'Skill Development', sub: 'Academic · Creative · Physical', color: '#72d0ff' },
            { label: 'Value Creation', sub: 'Projects · Output · Practice', color: '#4de8b0' },
            { label: 'Community & Contribution', sub: 'Teaching · Support · Continuity', color: '#b083ff' },
          ].map((l,i)=>(
            <div key={i} className="inv-level" style={{ '--lvl-color': l.color, width: `${60+i*8}%` }}>
              <strong>{l.label}</strong><span>{l.sub}</span>
            </div>
          ))}
        </div>
        <p className="inv-caption">We don't build people to fit the system. We build the system to support the person.</p>
      </section>

      {/* MY VOICE — PRODUCING LEVELS STORY */}
      <section style={{ background: 'var(--bg-card-alt)', padding: '0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '4rem 2rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <p className="kicker">Awaken · Align · Apply · Amplify · Ascend</p>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900, color: 'var(--navy)', margin: '0.25rem 0' }}>
              <span style={{ color: 'var(--gold)' }}>"My Voice"</span>
              <span style={{ fontWeight: 300, color: 'var(--text-soft)', marginLeft: '0.5rem' }}>— The Story We Tell</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-soft)', margin: '0.5rem auto 0', maxWidth: 480, lineHeight: 1.65 }}>
              Five children. Five levels. One shared language.
              English is not about being perfect —{' '}
              <strong style={{ color: 'var(--navy)' }}>it is about being heard.</strong>
            </p>
          </div>
          <MyVoiceStory compact />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <Link to="/curriculum" className="btn btn-primary">
              See the full curriculum →
            </Link>
          </div>
        </div>
      </section>

      {/* LEARNING STRUCTURE */}
      <section className="section" id="structure">
        <div className="section-head"><p className="kicker">Role Architecture</p><h2>The Downflow Structure</h2></div>
        <div className="ladder">
          {['🏦 Sponsors (fund capacity, compete on impact)','🔗 Connectors (form cells, earn on quality)','🧭 Facilitators (run sessions, protect safety)','⭐ Student Guiders (lead cells, grow into facilitators)','🏫 Learning Cells (6 students · 12-week cycles)'].map(l=><div key={l}>{l}</div>)}
        </div>
        <p className="supporting">Each level teaches the level below. Pressure never flows upward. Value always flows downward.</p>
      </section>

      {/* SPONSOR MODEL */}
      <section className="section" id="sponsor-section">
        <div className="section-head">
          <p className="kicker">Sponsor Infrastructure</p>
          <h2>Fund Cells. Compete on Impact.</h2>
          <p className="lead" style={{maxWidth:640,margin:'0.75rem auto 0'}}>
            "Sponsors enable protected learning cells, compete publicly on impact, and help scale access — without ever entering the classroom."
          </p>
        </div>

        {/* Three principles */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'2rem'}}>
          {[
            {color:'#4de8b0',icon:'🛡️',title:'Students owe nothing',   desc:'No gratitude. No appearances. No data. They simply enter a space that already exists.'},
            {color:'#72d0ff',icon:'🏫',title:'Cells are protected',     desc:'Sponsor branding never appears inside a lesson, classroom, or student video. Absolute boundary.'},
            {color:'#d2ad44',icon:'🏆',title:'Compete on impact',       desc:'Recognition is earned through cell performance — not bought. Responsibility, not ownership.'},
          ].map(p=>(
            <div key={p.title} style={{background:'var(--bg-card)',border:`2px solid ${p.color}40`,borderRadius:'var(--radius-sm)',padding:'1.25rem',textAlign:'center'}}>
              <span style={{fontSize:'1.75rem',display:'block',marginBottom:'0.5rem'}}>{p.icon}</span>
              <strong style={{display:'block',fontSize:'0.9rem',color:'var(--navy)',marginBottom:'0.4rem'}}>{p.title}</strong>
              <p style={{fontSize:'0.8rem',color:'var(--text-soft)',margin:0,lineHeight:1.55}}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Boundary: what sponsors see vs don't */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',maxWidth:720,margin:'0 auto 2rem'}}>
          <div style={{background:'var(--bg-card)',border:'1.5px solid var(--green)',borderRadius:'var(--radius-sm)',padding:'1.1rem'}}>
            <p style={{fontWeight:800,fontSize:'0.78rem',color:'var(--green)',textTransform:'uppercase',letterSpacing:'0.07em',margin:'0 0 0.6rem'}}>✅ Sponsors are visible</p>
            {['On the website','On public reports','On live ranking pages','In sponsor decks'].map(i=>(
              <span key={i} style={{display:'block',fontSize:'0.8rem',color:'var(--text-soft)',padding:'0.15rem 0'}}>→ {i}</span>
            ))}
          </div>
          <div style={{background:'var(--bg-card)',border:'1.5px solid rgba(255,107,107,0.4)',borderRadius:'var(--radius-sm)',padding:'1.1rem'}}>
            <p style={{fontWeight:800,fontSize:'0.78rem',color:'#e05c5c',textTransform:'uppercase',letterSpacing:'0.07em',margin:'0 0 0.6rem'}}>🚫 Never inside education</p>
            {['Inside lessons','In classrooms','In student content','In learning videos'].map(i=>(
              <span key={i} style={{display:'block',fontSize:'0.8rem',color:'var(--text-soft)',padding:'0.15rem 0'}}>✗ {i}</span>
            ))}
          </div>
        </div>

        {/* Rebate + tiers */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'1rem',marginBottom:'2rem'}}>
          <div style={{background:'var(--bg-card)',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'1.25rem'}}>
            <strong style={{display:'block',fontSize:'0.88rem',color:'var(--navy)',marginBottom:'1rem'}}>💸 15% Rebate Loop</strong>
            {[['85%','Cell operations','#4de8b0'],['9%','New cells','#72d0ff'],['6%','Student coins','#d2ad44']].map(([p,l,c])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:'0.6rem',marginBottom:'0.5rem'}}>
                <span style={{fontWeight:800,fontSize:'0.9rem',color:c,minWidth:'36px'}}>{p}</span>
                <span style={{fontSize:'0.8rem',color:'var(--text-soft)'}}>{l}</span>
              </div>
            ))}
          </div>
          <div style={{background:'var(--bg-card)',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'1.25rem'}}>
            <strong style={{display:'block',fontSize:'0.88rem',color:'var(--navy)',marginBottom:'0.75rem'}}>🌿 Partner Tiers — Based on Cells, Not Spend</strong>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.5rem'}}>
              {[['🌱','Learning Cell Partner','1 cell · 6 students','#72d0ff'],['🌿','Growth Partner','3 cells · 16 students','#d2ad44'],['🌳','Impact Partner','10 cells · 60 students','#4de8b0']].map(([icon,name,nums,color])=>(
                <div key={name} style={{textAlign:'center',padding:'0.75rem',background:color+'0f',border:`1px solid ${color}40`,borderRadius:'8px'}}>
                  <span style={{fontSize:'1.4rem',display:'block'}}>{icon}</span>
                  <strong style={{fontSize:'0.75rem',display:'block',color:'var(--navy)',marginTop:'0.25rem'}}>{name}</strong>
                  <span style={{fontSize:'0.7rem',color:'var(--text-soft)'}}>{nums}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:'2rem'}}>
          <Link to="/sponsor" className="btn btn-primary">Open Sponsor Portal →</Link>
        </div>
      </section>

      {/* REGIONS */}
      <section className="section" id="regions">
        <div className="section-head"><p className="kicker">Global Infrastructure</p><h2>Active & Expanding Regions</h2></div>
        <div className="regions-grid">
          {[
            { flag:'🇻🇳', name:'Vietnam', status:'active', detail:'Phase 1 launch · Hanoi & Ho Chi Minh City · 4 cells active' },
            { flag:'🇷🇺', name:'Russia', status:'pipeline', detail:'Connector recruitment open · Phase 1 starting Q2 2026' },
            { flag:'🇩🇪', name:'Germany', status:'pipeline', detail:'Sponsor conversations active · Berlin pilot planning' },
            { flag:'🌍', name:'Global', status:'open', detail:'Open to connectors worldwide · Localised cell support' },
          ].map(r=>(
            <div key={r.name} className={`region-card ${r.status}`}>
              <span className="region-card-flag">{r.flag}</span>
              <strong>{r.name}</strong>
              <span className={`region-status-badge ${r.status}`}>{r.status==='active'?'● Active':r.status==='pipeline'?'→ Pipeline':'○ Open'}</span>
              <p>{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT PACKS */}
      <section className="section" id="packs">
        <div className="section-head"><p className="kicker">App-Ready Content</p><h2>Content Packages</h2>
          <p className="lead">10 self-contained, repeatable learning packs. Each builds a specific life skill alongside English fluency — usable across all ages and all regions.</p>
        </div>
        <div className="packs-filter">
          {[['all','All Packs'],['thinking','Thinking'],['voice','Voice'],['social','Social'],['confidence','Confidence']].map(([f,l])=>(
            <button key={f} className={`filter-btn${f==='all'?' active':''}`} data-filter={f} onClick={handleFilter}>{l}</button>
          ))}
        </div>
        <div className="packs-grid">{PACKS.map(p=><PackCard key={p.id} p={p}/>)}</div>
      </section>

      {/* SYSTEM GUARANTEE */}
      <section className="section guarantee-section" id="guarantee">
        <div className="guarantee-inner">
          <div className="section-head"><p className="kicker">Non-Negotiable</p><h2>The Downflow Guarantee</h2></div>
          <div className="guarantee-grid">
            {[['📚','No child is blocked from learning','Every student gets full access to the core programme regardless of coins or payment. Core learning is never locked.'],
              ['🌱','Coins reward contribution','The coin system recognises participation and consistency. It never creates pressure, rankings, or exclusion.'],
              ['⚖️','Payments unlock extras only','Payments unlock extra depth and repetition only. They never grant higher standing in a learning cell.'],
              ['🤲','Sponsors unlock access','Sponsor gifts open packs for students. They do not affect programme design, delivery, or cell dynamics.']
            ].map(([icon,title,desc])=>(
              <div className="guarantee-item" key={title}>
                <span className="gi-icon">{icon}</span><strong>{title}</strong><p>{desc}</p>
              </div>
            ))}
          </div>
          <p className="guarantee-footer">Only extra depth and repetition are gated. This keeps Downflow fundamentally human.</p>
        </div>
      </section>

      {/* AGE-RANGE MAPPING */}
      <section className="section" id="ages">
        <div className="section-head"><p className="kicker">Age-Range Mapping</p><h2>How the Streams Scale with Children</h2>
          <p className="lead">The same system adapts naturally across three developmental stages — no tracking, no separation, no labels.</p>
        </div>
        <div className="age-grid">
          {[
            { badge:'🧒 Ages 6–8', label:'Foundation / Safety', focus:'confidence, body regulation, expression', streams:['✏️ Pencil Proof','🧘 Body Intelligence','🗣️ Voice & Presence','🤝 Social Systems','🛠️ Life Skills'], looks:['Speaking in short phrases','Drawing + describing','Movement + naming actions','Zero labels, zero testing'], cls:'age-foundation' },
            { badge:'🧑 Ages 9–11', label:'Awareness / Exploration', focus:'self-awareness, value, cooperation', streams:['💰 Kidinomics','🧠 Personality Awareness','🧩 Systems Thinking','🎯 Confidence Engineering','✏️ Pencil Proof'], looks:['Explaining choices','Role-switching in groups','Helping peers','Understanding "why we do this"'], cls:'age-awareness' },
            { badge:'🧑‍🎓 Ages 12–15', label:'Expression / Leadership', focus:'identity, communication, contribution', streams:['🗣️ Voice & Presence','🤝 Social Systems','🧩 Systems Thinking','💰 Kidinomics','🛠️ Life Skills'], looks:['Leading discussions','Mentoring younger students','Explaining systems','Speaking confidently in English'], cls:'age-leadership' },
          ].map(a=>(
            <div key={a.cls} className={`age-card ${a.cls}`}>
              <div className="age-badge">{a.badge}</div>
              <div className="age-label">{a.label}</div>
              <p className="age-focus">Focus: {a.focus}</p>
              <div className="age-streams">{a.streams.map(s=><span key={s}>{s}</span>)}</div>
              <div className="age-looks"><p className="age-looks-label">How it looks</p><ul>{a.looks.map(l=><li key={l}>{l}</li>)}</ul></div>
            </div>
          ))}
        </div>
      </section>

      {/* MASTER SENTENCE */}
      <section className="master-sentence-section" id="mission">
        <div className="master-sentence-inner">
          <p className="master-kicker">The Downflow Mission</p>
          <blockquote className="master-sentence">
            We don't teach subjects — we develop confident humans who understand value, themselves, and how to move through systems with clarity.
          </blockquote>
        </div>
      </section>

      {/* IMPACT */}
      <section className="section" id="impact">
        <div className="section-head"><p className="kicker">Live Network</p><h2>Impact Dashboard</h2></div>
        <div className="metrics-grid">
          {[['420','Learning Cells'],['2480','Students'],['360','Student Guiders'],['19','Countries Active'],['580','Sponsor Impact Index']].map(([t,l])=>(
            <article key={l}><p className="metric" data-target={t}>0</p><p>{l}</p></article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta" id="cta">
        <div className="section-head"><p className="kicker">Join Downflow</p><h2>Activate the Network</h2></div>
        <div className="cta-grid">
          <Link to="/sponsor" className="cta-card sponsor-cta">
            <span className="cta-icon">🏦</span><strong>Fund Learning Infrastructure</strong>
            <p>For sponsors who want measurable, transparent, ethical educational impact.</p>
          </Link>
          <Link to="/student" className="cta-card student-cta">
            <span className="cta-icon">🎓</span><strong>Join a Learning Cell</strong>
            <p>For students ready to learn, produce, and grow into mentors.</p>
          </Link>
          <Link to="/connector" className="cta-card connector-cta">
            <span className="cta-icon">🔗</span><strong>Become a Connector</strong>
            <p>Form learning cells, support families, earn on quality — not volume.</p>
          </Link>
          <Link to="/facilitator" className="cta-card educator-cta">
            <span className="cta-icon">🧭</span><strong>Become a Facilitator</strong>
            <p>For educators who want to guide the next generation of guiders.</p>
          </Link>
        </div>
      </section>

      {/* ── Brand Values Strip ── */}
      <div className="brand-values-strip">
        {[
          ['⚡','Empowering'],
          ['🔗','Connected'],
          ['🛡️','Safe'],
          ['🌱','Growing'],
          ['🎯','Trust'],
          ['💡','Impact'],
          ['✨','Inspire'],
        ].map(([icon,label])=>(
          <div key={label} className="bv-item">
            <span className="bv-icon">{icon}</span>
            <span className="bv-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Symbol System ── */}
      <section style={{padding:'4rem 2rem',textAlign:'center'}}>
        <p className="kicker">Visual Design System</p>
        <h2 className="section-title">The DOWNFLOW Symbol System</h2>
        <p className="lead" style={{marginBottom:'2.5rem',maxWidth:'560px',margin:'0 auto 2.5rem'}}>
          Seven core hex icons represent every role and concept in the DOWNFLOW ecosystem.
        </p>
        <HexSystemRow size={52}/>
      </section>

      {/* ── Investor / Sponsor Deck Section ── */}
      <section className="investor-section">
        <p className="kicker">For Investors & Sponsors</p>
        <h2 className="section-title">Why DOWNFLOW Works</h2>
        <p className="lead" style={{marginBottom:'0',maxWidth:'640px'}}>
          A sponsor-funded, self-improving education model. Every cycle generates data, every student becomes a mentor, every sponsor earns a measurable return.
        </p>
        <div className="investor-grid">
          {[
            { icon:'🏫', big:'5', label:'Students per cell', desc:'Small enough for real connection. Large enough to build group dynamics.' },
            { icon:'🔄', big:'12', label:'Sessions per cycle', desc:'One full learning cycle. Consistent, structured, measurable.' },
            { icon:'💰', big:'15%', label:'Sponsor rebate', desc:'9% reinvested in new cells. 6% directly credited to student coin wallets.' },
            { icon:'📈', big:'3.6M', label:'VND earned per connector', desc:'Per cell formed — registration share plus lesson share over the full cycle.' },
            { icon:'🌍', big:'3', label:'Launch regions', desc:'Vietnam first. Germany and Russia via SEO. Global open infrastructure.' },
            { icon:'⚡', big:'∞', label:'Self-improving flywheel', desc:'Students become facilitators. Cells spawn cells. The system grows itself.' },
          ].map(card=>(
            <div key={card.label} className="investor-card">
              <span className="investor-card-icon">{card.icon}</span>
              <span className="big-num">{card.big}</span>
              <h3>{card.label}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'2.5rem',display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/sponsor" className="btn btn-primary" style={{fontSize:'0.95rem',padding:'0.75rem 2rem'}}>Fund a Cell →</Link>
          <Link to="/platform" className="btn btn-secondary" style={{fontSize:'0.95rem',padding:'0.75rem 2rem'}}>View Full System</Link>
        </div>
      </section>

      {/* ── Tagline ── */}
      <div className="tagline-strip">
        <p className="tagline-text">"We rise by creating value — not just by consuming it."</p>
      </div>

      {/* ── Ethics / Protected Learning ── */}
      <section className="section" style={{background:'var(--green-pale)',padding:'5rem 2rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <p className="kicker">Ethics &amp; Protection</p>
          <h2>Protected Learning. Ethical Impact.</h2>
          <p className="lead" style={{marginTop:'0.75rem',marginBottom:'2rem',maxWidth:'560px'}}>
            Trust is the foundation of every learning cell. Every rule exists to protect students and maintain the integrity of the network.
          </p>
          <div className="ethics-grid">
            {[
              {shield:true,  icon:'🤝', title:'Side-by-Side Parent Presence', desc:'Parents or guardians are always informed and involved. No hidden sessions. No private contact between adults and students outside the structured cell format.'},
              {shield:true,  icon:'🛡️', title:'No Public Comparison',         desc:'Students are never ranked or compared publicly. Progress is private. Cell health scores are visible to facilitators only — never to families or sponsors.'},
              {shield:false, icon:'🚫', title:'No Debt-Based Pressure',       desc:'Students participate for free. No family pays anything. Sponsors fund the cells entirely. There is no obligation, no repayment, and no commercial pressure inside sessions.'},
              {shield:false, icon:'🔒', title:'Influences Focus Cells',       desc:'The platform automatically enforces sponsor boundaries. No sponsor can contact, direct, or influence the learning that happens inside a cell. Ever.'},
            ].map(e=>(
              <div key={e.title} className={`ethics-item${e.shield?' shield':''}`}>
                <span className="ethics-icon">{e.icon}</span>
                <div><strong>{e.title}</strong><p>{e.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsor Public Page Section ── */}
      <section className="section">
        <p className="kicker">For Sponsors</p>
        <h2>Support Ethical Learning. Create Lifelong Value.</h2>
        <p className="lead" style={{marginTop:'0.75rem',marginBottom:'0',maxWidth:'560px'}}>
          Fund active learning spaces with direct impact. Earn recognition, performance data, and a measurable return on your social investment.
        </p>
        <div className="sponsor-values-row">
          {[
            {icon:'💛', title:'Meaningful', desc:'Your funding directly enables a cell of 6 students for a full 12-week cycle. You see every rep, every session, every milestone.'},
            {icon:'📊', title:'Clear Impact', desc:'Weekly progress reports. Cell GPA, attendance, video submissions, and succession data. No abstractions — only verified performance.'},
            {icon:'🏆', title:'Trusted Oversight', desc:'The platform enforces all ethical boundaries automatically. Your brand is never at risk. Your involvement is recognised on the public leaderboard.'},
          ].map(v=>(
            <div key={v.title} className="sponsor-value-card">
              <span className="sv-icon">{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'2rem',display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/sponsor" className="btn btn-primary" style={{fontSize:'0.95rem',padding:'0.75rem 2rem'}}>Become a Sponsor →</Link>
          <Link to="/platform" className="btn btn-secondary" style={{padding:'0.75rem 2rem'}}>See How It Works</Link>
        </div>
      </section>
    </>
  )
}
