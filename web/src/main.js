import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="site-shell">
    <div class="bg-grid" aria-hidden="true"></div>
    <header class="topbar">
      <div class="brand">Producing Model Network</div>
      <nav class="nav-links">
        <a href="#model">Model</a>
        <a href="#sponsor">Sponsor Infrastructure</a>
        <a href="#impact">Impact</a>
        <a href="#cta">Join</a>
      </nav>
    </header>

    <main>
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
            <li><span>Learning Cells (2-6 students)</span></li>
          </ul>
        </div>
      </section>

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
            fluency, low confidence, and weak transition to leadership.
          </div>
        </div>
      </section>

      <section class="section" id="model">
        <div class="section-head">
          <p class="kicker">Section 2</p>
          <h2>The Producing Model</h2>
        </div>
        <p class="lead">
          The platform uses small collaborative learning cells of 5-6 students.
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

      <section class="section feature-section" id="features">
        <div class="section-head">
          <p class="kicker">Extra Features</p>
          <h2>Platform Modules</h2>
        </div>
        <div class="feature-grid">
          <article>Sponsor Portal</article>
          <article>Student Portal</article>
          <article>Facilitator Dashboard</article>
          <article>Learning Cell Tracker</article>
          <article>Video Practice System</article>
        </div>
      </section>

      <section class="section cta" id="cta">
        <div class="section-head">
          <p class="kicker">Section 8</p>
          <h2>Activate the Network</h2>
        </div>
        <div class="cta-grid">
          <a href="#" class="cta-card">Fund Learning Infrastructure</a>
          <a href="#" class="cta-card">Join a Learning Cell</a>
          <a href="#" class="cta-card">Become a Facilitator</a>
        </div>
      </section>
    </main>
  </div>
`

const metrics = document.querySelectorAll('.metric')
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return

    const el = entry.target
    const target = Number(el.dataset.target)
    const duration = 1200
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

metrics.forEach((metric) => io.observe(metric))
