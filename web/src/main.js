import './style.css'

const PACKS = [
  {
    id: 'pencil-proof',
    icon: '✏️',
    title: 'Pencil Proof Pack',
    tagline: 'Thinking & speaking without writing',
    videos: 6,
    exercises: ['Explain a picture in 60 seconds', 'Retell a story without notes', 'Describe how something works'],
    challenges: ['30-second explanation challenge', 'Teach an imaginary friend', 'Explain using only simple words'],
    coins: 40,
    vnd: '25,000',
    sponsorLabel: 'Thinking Skills Pack',
    color: '#72d0ff',
  },
  {
    id: 'kidinomics',
    icon: '💰',
    title: 'Kidinomics Pack',
    tagline: 'Understanding value, effort, and contribution',
    videos: 5,
    exercises: ['Explain how you helped someone', 'Describe why something is valuable', 'Role-play giving help'],
    challenges: ['Create value without money', 'Choose effort over reward', 'Help someone & explain the change'],
    coins: 35,
    vnd: '25,000',
    sponsorLabel: 'Young Producers Pack',
    color: '#d2ad44',
  },
  {
    id: 'self-awareness',
    icon: '🧠',
    title: 'Self-Awareness Pack',
    tagline: 'Myers-Briggs inspired — no labels, just insight',
    videos: 5,
    exercises: ['Choose how you would solve a problem', 'Reflect on what feels easy', 'Compare two learning styles'],
    challenges: ['Try the opposite style', 'Explain your preference', 'Listen before speaking'],
    coins: 30,
    vnd: '20,000',
    sponsorLabel: 'Understanding Minds Pack',
    color: '#b083ff',
  },
  {
    id: 'body-calm',
    icon: '🏊',
    title: 'Body & Calm Confidence Pack',
    tagline: 'Breathing, body regulation, and calm presence',
    videos: 5,
    exercises: ['Breathing rhythm practice', 'Calm posture speaking', 'Body scan & reset'],
    challenges: ['Speak slower than usual', 'Stay calm while speaking', '60-second calm reset'],
    coins: 30,
    vnd: '20,000',
    sponsorLabel: 'Calm & Courage Pack',
    color: '#4de8b0',
  },
  {
    id: 'voice-presence',
    icon: '🗣️',
    title: 'Voice & Presence Pack',
    tagline: 'How to be heard without force',
    videos: 6,
    exercises: ['Read with emotion', 'Pause before speaking', 'Change tone, same sentence'],
    challenges: ['Tell a story with pauses', 'Speak with calm confidence', 'Use voice, not volume'],
    coins: 40,
    vnd: '30,000',
    sponsorLabel: 'Confident Voice Pack',
    color: '#ff9f5a',
  },
  {
    id: 'social-systems',
    icon: '🤝',
    title: 'Social Systems Pack',
    tagline: 'Group intelligence & cooperation',
    videos: 5,
    exercises: ['Role rotation', 'Group decision explanation', 'Reflect on teamwork'],
    challenges: ['Support someone else first', 'Let someone else lead', 'Explain group success'],
    coins: 35,
    vnd: '25,000',
    sponsorLabel: 'Leadership Basics Pack',
    color: '#72d0ff',
  },
  {
    id: 'systems-thinking',
    icon: '🧩',
    title: 'Systems Thinking Pack',
    tagline: 'Cause, effect & growth',
    videos: 5,
    exercises: ['Explain a simple system', 'Predict outcomes', 'Fix a broken system'],
    challenges: ['Trace what happens next', 'Improve a process', 'Explain how change spreads'],
    coins: 35,
    vnd: '25,000',
    sponsorLabel: 'Future Thinkers Pack',
    color: '#d2ad44',
  },
  {
    id: 'confidence-engineering',
    icon: '🎯',
    title: 'Confidence Engineering Pack',
    tagline: 'Building courage step-by-step',
    videos: 5,
    exercises: ['Speak once more than yesterday', 'Repeat tasks calmly', 'Celebrate effort verbally'],
    challenges: ['Do one uncomfortable thing', 'Speak without fear of mistakes', 'Try again challenge'],
    coins: 40,
    vnd: '30,000',
    sponsorLabel: 'Brave Steps Pack',
    color: '#ff6b9d',
  },
  {
    id: 'life-skills',
    icon: '🛠️',
    title: 'Life Skills Pack',
    tagline: 'Real-world communication',
    videos: 5,
    exercises: ['Role-play daily situations', 'Explain a problem clearly', 'Practice polite disagreement'],
    challenges: ['Ask a clear question', 'Explain your plan', 'Solve a daily issue verbally'],
    coins: 35,
    vnd: '25,000',
    sponsorLabel: 'Ready for Life Pack',
    color: '#4de8b0',
  },
]

const packCard = (p) => `
  <article class="pack-card" data-pack="${p.id}" style="--pack-color:${p.color}">
    <div class="pack-header">
      <span class="pack-icon">${p.icon}</span>
      <div>
        <h3 class="pack-title">${p.title}</h3>
        <p class="pack-tagline">${p.tagline}</p>
      </div>
      <span class="pack-video-badge">${p.videos} videos</span>
    </div>

    <div class="pack-body">
      <div class="pack-col">
        <p class="pack-col-label">🔁 Repeatable Exercises</p>
        <ul>${p.exercises.map((e) => `<li>${e}</li>`).join('')}</ul>
      </div>
      <div class="pack-col">
        <p class="pack-col-label">⚡ Micro-Challenges</p>
        <ul>${p.challenges.map((c) => `<li>${c}</li>`).join('')}</ul>
      </div>
    </div>

    <div class="pack-unlock">
      <p class="pack-unlock-label">🔓 Unlock this pack</p>
      <div class="unlock-options">
        <div class="unlock-opt coin-opt">
          <span class="coin-icon">🪙</span>
          <strong>${p.coins}</strong>
          <span>coins</span>
        </div>
        <div class="unlock-opt pay-opt">
          <span>💳</span>
          <strong>${p.vnd} VND</strong>
        </div>
        <div class="unlock-opt gift-opt">
          <span>🎁</span>
          <strong>Sponsor gift</strong>
          <span class="gift-label">${p.sponsorLabel}</span>
        </div>
      </div>
      <button class="btn-unlock">Preview Pack</button>
    </div>
  </article>
`

const coinEarnRow = (icon, label, coins) => `
  <div class="earn-row">
    <span class="earn-icon">${icon}</span>
    <span class="earn-label">${label}</span>
    <span class="earn-coins">+${coins} <span class="coin-sym">🪙</span></span>
  </div>
`

document.querySelector('#app').innerHTML = `
  <div class="site-shell">
    <div class="bg-grid" aria-hidden="true"></div>
    <header class="topbar">
      <div class="brand">Producing Model Network</div>
      <nav class="nav-links">
        <a href="#model">Model</a>
        <a href="#sponsor">Sponsors</a>
        <a href="#coins">Coin System</a>
        <a href="#packs">Content Packs</a>
        <a href="#impact">Impact</a>
        <a href="#cta">Join</a>
      </nav>
    </header>

    <main>
      <!-- HERO -->
      <section class="hero section">
        <div class="hero-copy">
          <p class="kicker">Global Sponsor-Funded Learning Infrastructure</p>
          <h1>A New Education Infrastructure</h1>
          <p class="subhead">
            A sponsor-funded learning network where students learn, produce value,
            and grow into mentors.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#cta">Fund Learning Infrastructure</a>
            <a class="btn btn-secondary" href="#model">Explore Producing Model</a>
          </div>
        </div>

        <div class="pyramid-panel">
          <h2>Inverted Pyramid Ecosystem</h2>
          <ul class="flow-list">
            <li><span>Sponsors</span></li>
            <li><span>Connectors</span></li>
            <li><span>Facilitators</span></li>
            <li><span>Student Guiders (SG)</span></li>
            <li><span>Advanced Student Guiders (ASG)</span></li>
            <li><span>Learning Cells (2–6 students)</span></li>
          </ul>
        </div>
      </section>

      <!-- THE PROBLEM -->
      <section class="section" id="problem">
        <div class="section-head">
          <p class="kicker">Section 1</p>
          <h2>The Problem</h2>
        </div>
        <div class="problem-grid">
          <div class="problem-card">
            <h3>Traditional Education Limits</h3>
            <ul>
              <li>Passive learning</li>
              <li>Large classrooms</li>
              <li>Little engagement</li>
              <li>No economic participation</li>
            </ul>
          </div>
          <div class="problem-callout">
            Students consume information but rarely produce value. The result is low
            fluency, low confidence, and a weak transition to leadership.
          </div>
        </div>
      </section>

      <!-- PRODUCING MODEL -->
      <section class="section" id="model">
        <div class="section-head">
          <p class="kicker">Section 2</p>
          <h2>The Producing Model</h2>
        </div>
        <p class="lead">
          The platform uses small collaborative learning cells of 5–6 students.
          Learning happens through doing, performing, and teaching others.
        </p>
        <div class="hex-grid" role="list" aria-label="Producing model practices">
          <article class="hex" role="listitem"><span>Repetition</span></article>
          <article class="hex" role="listitem"><span>Speaking</span></article>
          <article class="hex" role="listitem"><span>Rhythm</span></article>
          <article class="hex" role="listitem"><span>Mimicry</span></article>
          <article class="hex" role="listitem"><span>Creative Interaction</span></article>
        </div>
      </section>

      <!-- LEARNING STRUCTURE -->
      <section class="section" id="structure">
        <div class="section-head">
          <p class="kicker">Section 3</p>
          <h2>The Learning Structure</h2>
        </div>
        <div class="ladder" aria-label="Learning hierarchy">
          <div>Learning Cells (Students)</div>
          <div>Student Guiders (SG)</div>
          <div>Advanced Student Guiders (ASG)</div>
          <div>Intern Facilitators</div>
          <div>Facilitators</div>
        </div>
        <p class="supporting">Each level teaches the level below, creating transparent capability transfer and measurable advancement.</p>
      </section>

      <!-- SPONSOR INFRASTRUCTURE -->
      <section class="section" id="sponsor">
        <div class="section-head">
          <p class="kicker">Section 4</p>
          <h2>Sponsor Infrastructure</h2>
        </div>
        <p class="lead">Sponsors fund learning cycles. Each sponsorship creates new learning cells in a self-expanding network.</p>
        <div class="funding-wrap">
          <div class="funding-node">
            <strong>15% Sponsor Rebate</strong>
            <p>Total value loop returned by system performance.</p>
          </div>
          <div class="funding-node split">
            <div>
              <strong>9%</strong>
              <p>Reinvested to create new cells</p>
            </div>
            <div>
              <strong>6%</strong>
              <p>Distributed to students</p>
            </div>
          </div>
        </div>
      </section>

      <!-- LEARNING CYCLE -->
      <section class="section" id="cycle">
        <div class="section-head">
          <p class="kicker">Section 5</p>
          <h2>Learning Cycle</h2>
        </div>
        <div class="cycle-grid">
          <article><h3>12 Weeks</h3><p>Structured learning cycle</p></article>
          <article><h3>2 Sessions / Week</h3><p>Collaborative live learning</p></article>
          <article><h3>60 Min / Session</h3><p>Focused coaching windows</p></article>
          <article><h3>5-Min Daily Videos</h3><p>Short practice reps for fluency</p></article>
        </div>
        <p class="supporting">Students submit short video reps to build confidence, voice control, and speaking consistency.</p>
      </section>

      <!-- COIN SYSTEM -->
      <section class="section" id="coins">
        <div class="section-head">
          <p class="kicker">Reward System</p>
          <h2>How Coins Work</h2>
        </div>

        <div class="coin-intro">
          <div class="coin-principle-grid">
            <div class="coin-principle">
              <span class="cp-icon">🪙</span>
              <p>Coins are <strong>earned</strong>, not bought</p>
            </div>
            <div class="coin-principle">
              <span class="cp-icon">🔓</span>
              <p>Coins unlock <strong>extra depth</strong>, not core learning</p>
            </div>
            <div class="coin-principle">
              <span class="cp-icon">🚫</span>
              <p>No gambling, no rankings, no public coin counts</p>
            </div>
            <div class="coin-principle">
              <span class="cp-icon">🌱</span>
              <p>Coins = <strong>contribution</strong> + consistency</p>
            </div>
          </div>
        </div>

        <div class="coin-tables">
          <div class="coin-table-panel">
            <h3 class="coin-table-title">🔑 How to Earn Coins</h3>
            <div class="earn-list">
              ${coinEarnRow('👋', 'Small participation action', 5)}
              ${coinEarnRow('💡', 'Helpful contribution', 10)}
              ${coinEarnRow('🏆', 'Completing a challenge', 15)}
              ${coinEarnRow('🔥', 'Consistency streak (weekly)', 20)}
              ${coinEarnRow('🎬', 'Producing reusable content', 30)}
            </div>
          </div>

          <div class="coin-table-panel">
            <h3 class="coin-table-title">🎁 Three Ways to Unlock Content</h3>
            <div class="unlock-paths">
              <div class="unlock-path">
                <span class="up-icon">🪙</span>
                <div>
                  <strong>Earn with Coins</strong>
                  <p>Students accumulate coins through participation and contribution inside their learning cell.</p>
                </div>
              </div>
              <div class="unlock-path">
                <span class="up-icon">💳</span>
                <div>
                  <strong>Small Payment</strong>
                  <p>Parents can unlock packs directly with a small one-time payment in local currency.</p>
                </div>
              </div>
              <div class="unlock-path">
                <span class="up-icon">🎁</span>
                <div>
                  <strong>Sponsor Gift</strong>
                  <p>Sponsors assign packs directly to a learning cell or regional group as a gift contribution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTENT PACKS -->
      <section class="section" id="packs">
        <div class="section-head">
          <p class="kicker">App-Ready Content</p>
          <h2>Content Packages</h2>
          <p class="lead">9 self-contained, repeatable learning packs. Each is designed to build a specific life skill alongside English fluency.</p>
        </div>
        <div class="packs-filter">
          <button class="filter-btn active" data-filter="all">All Packs</button>
          <button class="filter-btn" data-filter="thinking">Thinking</button>
          <button class="filter-btn" data-filter="voice">Voice</button>
          <button class="filter-btn" data-filter="social">Social</button>
          <button class="filter-btn" data-filter="confidence">Confidence</button>
        </div>
        <div class="packs-grid">
          ${PACKS.map(packCard).join('')}
        </div>
      </section>

      <!-- SYSTEM GUARANTEE -->
      <section class="section guarantee-section" id="guarantee">
        <div class="guarantee-inner">
          <div class="section-head">
            <p class="kicker">System Design</p>
            <h2>The System Guarantee</h2>
          </div>
          <div class="guarantee-grid">
            <div class="guarantee-item">
              <span class="gi-icon">📚</span>
              <strong>Core learning is never locked</strong>
              <p>Every student gets full access to the core program regardless of coins or payment.</p>
            </div>
            <div class="guarantee-item">
              <span class="gi-icon">🌿</span>
              <strong>Coins encourage contribution, not pressure</strong>
              <p>The coin system rewards participation. It never creates stress or exclusion.</p>
            </div>
            <div class="guarantee-item">
              <span class="gi-icon">⚖️</span>
              <strong>Payments unlock convenience, not status</strong>
              <p>Paying unlocks extra depth. It never grants higher standing in the learning cell.</p>
            </div>
            <div class="guarantee-item">
              <span class="gi-icon">🤲</span>
              <strong>Sponsors unlock access, not influence</strong>
              <p>Sponsor gifts open packs for students. They don't affect program design or delivery.</p>
            </div>
          </div>
          <p class="guarantee-footer">This keeps the Producing Model fundamentally human.</p>
        </div>
      </section>

      <!-- IMPACT -->
      <section class="section" id="impact">
        <div class="section-head">
          <p class="kicker">Section 6</p>
          <h2>Impact Dashboard</h2>
        </div>
        <div class="metrics-grid">
          <article><p class="metric" data-target="420">0</p><p>Learning Cells</p></article>
          <article><p class="metric" data-target="2480">0</p><p>Students</p></article>
          <article><p class="metric" data-target="360">0</p><p>Student Guiders</p></article>
          <article><p class="metric" data-target="19">0</p><p>Countries Active</p></article>
          <article><p class="metric" data-target="580">0</p><p>Sponsor Impact Index</p></article>
        </div>
      </section>

      <!-- GLOBAL EXPANSION -->
      <section class="section" id="expansion">
        <div class="section-head">
          <p class="kicker">Section 7</p>
          <h2>Global Expansion</h2>
        </div>
        <p class="lead">Target regions for near-term expansion with distributed facilitator pipelines.</p>
        <div class="map-panel">
          <div class="map-node">Vietnam</div>
          <div class="map-node">Eastern Europe</div>
          <div class="map-node">MENA Region</div>
          <div class="map-node">Germany</div>
        </div>
        <p class="supporting">Goal: Build a global distributed learning network with local language support and shared producing standards.</p>
      </section>

      <!-- PLATFORM MODULES -->
      <section class="section feature-section" id="features">
        <div class="section-head">
          <p class="kicker">Platform</p>
          <h2>Platform Modules</h2>
        </div>
        <div class="feature-grid">
          <article>
            <span class="feat-icon">🏦</span>
            <strong>Sponsor Portal</strong>
            <p>Fund cells, track impact, assign gift packs</p>
          </article>
          <article>
            <span class="feat-icon">🎓</span>
            <strong>Student Portal</strong>
            <p>Track coins, unlock packs, submit video reps</p>
          </article>
          <article>
            <span class="feat-icon">📊</span>
            <strong>Facilitator Dashboard</strong>
            <p>Manage cells, monitor progress, guide guiders</p>
          </article>
          <article>
            <span class="feat-icon">🔬</span>
            <strong>Learning Cell Tracker</strong>
            <p>Real-time cell health, attendance, and output</p>
          </article>
          <article>
            <span class="feat-icon">🎬</span>
            <strong>Video Practice System</strong>
            <p>Daily 5-min reps, peer review, coach feedback</p>
          </article>
        </div>
      </section>

      <!-- CTA -->
      <section class="section cta" id="cta">
        <div class="section-head">
          <p class="kicker">Section 8</p>
          <h2>Activate the Network</h2>
        </div>
        <div class="cta-grid">
          <a href="#" class="cta-card sponsor-cta">
            <span class="cta-icon">🏦</span>
            <strong>Fund Learning Infrastructure</strong>
            <p>For sponsors who want measurable, transparent educational impact.</p>
          </a>
          <a href="#" class="cta-card student-cta">
            <span class="cta-icon">🎓</span>
            <strong>Join a Learning Cell</strong>
            <p>For students ready to learn, produce, and grow into mentors.</p>
          </a>
          <a href="#" class="cta-card educator-cta">
            <span class="cta-icon">🧭</span>
            <strong>Become a Facilitator</strong>
            <p>For educators who want to guide the next generation of guiders.</p>
          </a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p class="brand">Producing Model Network</p>
      <p class="footer-sub">A sponsor-funded, globally distributed education infrastructure.</p>
    </footer>
  </div>
`

// ── Animated counters ────────────────────────────────────────────
const metrics = document.querySelectorAll('.metric')
const counterIO = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    const el = entry.target
    const target = Number(el.dataset.target)
    const duration = 1400
    const start = performance.now()
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      el.textContent = Math.floor(progress * target).toLocaleString('en-US')
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    observer.unobserve(el)
  })
})
metrics.forEach((m) => counterIO.observe(m))

// ── Pack filter ──────────────────────────────────────────────────
const PACK_TAGS = {
  'pencil-proof': ['thinking'],
  kidinomics: ['thinking'],
  'self-awareness': ['thinking'],
  'body-calm': ['confidence'],
  'voice-presence': ['voice'],
  'social-systems': ['social'],
  'systems-thinking': ['thinking'],
  'confidence-engineering': ['confidence'],
  'life-skills': ['social'],
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')

    const filter = btn.dataset.filter
    document.querySelectorAll('.pack-card').forEach((card) => {
      const id = card.dataset.pack
      const tags = PACK_TAGS[id] || []
      const visible = filter === 'all' || tags.includes(filter)
      card.style.display = visible ? '' : 'none'
    })
  })
})

// ── Preview button (placeholder interaction) ─────────────────────
document.querySelectorAll('.btn-unlock').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.textContent = '✓ Added to Queue'
    btn.classList.add('unlocked')
    setTimeout(() => {
      btn.textContent = 'Preview Pack'
      btn.classList.remove('unlocked')
    }, 2200)
  })
})
