import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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
      {/* HERO */}
      <section className="hero section">
        <div className="hero-copy">
          <p className="kicker">Global Sponsor-Funded Learning Infrastructure</p>
          <h1><span className="brand-down">DOWN</span><span className="brand-flow">FLOW</span><br/>School of Life</h1>
          <p className="subhead">A sponsor-funded learning network where students learn, produce real value, and grow into the next generation of mentors and facilitators.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/sponsor">Fund a Learning Cell</Link>
            <a className="btn btn-secondary" href="#model">Explore the Model</a>
          </div>
          <div className="hero-portal-row">
            <Link to="/sponsor" className="portal-chip sponsor-chip">🏦 Sponsor Portal</Link>
            <Link to="/student" className="portal-chip student-chip">🎓 Student Portal</Link>
            <Link to="/facilitator" className="portal-chip facilitator-chip">📊 Facilitator Dashboard</Link>
            <Link to="/connector" className="portal-chip connector-chip">🔗 Connector Dashboard</Link>
          </div>
          <div className="hero-regions">
            <span>🇻🇳 Vietnam</span><span>🇷🇺 Russia</span><span>🇩🇪 Germany</span><span>🌍 Global</span>
          </div>
        </div>
        <div className="pyramid-panel">
          <h2>The Downflow Ecosystem</h2>
          <ul className="flow-list">
            <li><span>🏦 Sponsors</span></li>
            <li><span>🔗 Connectors</span></li>
            <li><span>🧭 Facilitators</span></li>
            <li><span>⭐ Student Guiders (SG)</span></li>
            <li><span>📚 Advanced SGs (ASG)</span></li>
            <li><span>🏫 Learning Cells (5–6 students)</span></li>
          </ul>
          <p className="pyramid-note">Value flows <strong>downward</strong>. Pressure flows <strong>nowhere</strong>.</p>
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

      {/* LEARNING STRUCTURE */}
      <section className="section" id="structure">
        <div className="section-head"><p className="kicker">Role Architecture</p><h2>The Downflow Structure</h2></div>
        <div className="ladder">
          {['🏦 Sponsors (fund capacity, compete on impact)','🔗 Connectors (form cells, earn on quality)','🧭 Facilitators (run sessions, protect safety)','⭐ Student Guiders (lead cells, grow into facilitators)','🏫 Learning Cells (5 students · 12-week cycles)'].map(l=><div key={l}>{l}</div>)}
        </div>
        <p className="supporting">Each level teaches the level below. Pressure never flows upward. Value always flows downward.</p>
      </section>

      {/* SPONSOR MODEL */}
      <section className="section" id="sponsor-section">
        <div className="section-head"><p className="kicker">Sponsor Infrastructure</p><h2>Fund Cells. Compete on Impact.</h2></div>
        <p className="lead">Sponsors fund Learning Cells — not individuals. They compete publicly on growth, participation, output quality, and succession strength. Recognition is real. Exploitation is impossible.</p>
        <div className="funding-wrap">
          <div className="funding-node"><strong>15% Sponsor Rebate Loop</strong><p>Returned by system performance back into the ecosystem.</p></div>
          <div className="funding-node split">
            <div><strong>9%</strong><p>Reinvested to create new cells</p></div>
            <div><strong>6%</strong><p>Distributed to student accounts</p></div>
          </div>
        </div>
        <div className="sponsor-rules">
          {[['✅','Sponsors visible on public leaderboard'],['✅','Sponsors see cell-level impact data'],['🚫','Sponsors never enter classrooms'],['🚫','No student-level data ever exposed'],['🚫','No gratitude required from families']].map(([icon,text])=>(
            <div key={text} className="sponsor-rule"><span>{icon}</span><span>{text}</span></div>
          ))}
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
    </>
  )
}
