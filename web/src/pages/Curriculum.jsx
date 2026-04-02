import { useState } from 'react'
import { Link } from 'react-router-dom'

const PACKS = [
  {
    id: 'kidinomics',
    title: 'Kidinomics',
    tagline: 'Teach Value, Not Money',
    img: '/packs/kidinomics.png',
    category: 'thinking',
    catLabel: 'Thinking & Value',
    color: '#d2ad44',
    age: '9–15',
    videos: 5,
    coins: 35,
    keyTopics: ['Value Exchange', 'Effort & Reward', 'Save & Share', 'Understanding Sponsorship', 'Learning About Coins'],
    skills: ['Critical thinking', 'Economic literacy', 'Contribution mindset'],
    desc: 'Students explore what value really means — not money, but effort, contribution, and impact. They role-play giving, earning, and explaining value through activities grounded in everyday life.',
  },
  {
    id: 'swimming',
    title: 'Swimming & Water Confidence',
    tagline: 'The body learns courage before the mind does',
    img: '/packs/swimming.png',
    category: 'confidence',
    catLabel: 'Body & Courage',
    color: '#4de8b0',
    age: '6–12',
    videos: 5,
    coins: 30,
    keyTopics: ['Water Safety', 'Breath Control', 'Calm Under Pressure', 'Trust & Confidence', 'Confidence Transfer'],
    skills: ['Physical courage', 'Emotional regulation', 'Calm under pressure'],
    desc: 'Water is a metaphor for life. This pack uses swimming skills to build real courage — students learn to breathe, trust, and transfer that calm into every speaking and learning moment.',
  },
  {
    id: 'social-systems',
    title: 'Social Systems & Critical Thinking',
    tagline: 'Groups behave like organisms — understand them',
    img: '/packs/social-systems.png',
    category: 'social',
    catLabel: 'Social & Systems',
    color: '#72d0ff',
    age: '9–15',
    videos: 6,
    coins: 40,
    keyTopics: ['Social Systems & Group Dynamics', 'Systems Thinking', 'Confidence Engineering', 'Cause & Effect', 'Leadership Rotation'],
    skills: ['Analytical thinking', 'Leadership', 'Group cooperation'],
    desc: 'Three interlinked modules: how groups work, how systems think, and how confidence is engineered — not born. Students learn to see patterns, lead rotations, and build on small wins.',
  },
  {
    id: 'health',
    title: 'Body Intelligence & Regulation',
    tagline: 'A regulated body creates a learning mind',
    img: '/packs/health.png',
    category: 'confidence',
    catLabel: 'Body & Mind',
    color: '#4de8b0',
    age: '6–15',
    videos: 5,
    coins: 30,
    keyTopics: ['Posture', 'Breathing', 'Movement Awareness', 'Speaking Confidence', 'Anxiety Reduction', 'Focus', 'Presence'],
    skills: ['Body awareness', 'Emotional self-regulation', 'Confident presence'],
    desc: 'When the body is calm, the mind can learn. This pack teaches students to use posture, breath, and movement as tools for speaking confidence, focus, and reducing anxiety in real time.',
  },
  {
    id: 'music',
    title: 'Music & Rhythm',
    tagline: 'Used to unlock expression and memory',
    img: '/packs/music.png',
    category: 'voice',
    catLabel: 'Voice & Expression',
    color: '#ff9f5a',
    age: '6–12',
    videos: 5,
    coins: 30,
    keyTopics: ['Rhythm & Timing', 'Singing / Vocal Play', 'Sound Imitation', 'Emotion Through Sound', 'Flow of Speech'],
    skills: ['Pronunciation', 'Emotional intelligence', 'Memory retention'],
    desc: 'Rhythm unlocks what text alone cannot. Students use music, vocal play, and sound imitation to improve pronunciation, fluency, and the emotional intelligence behind how they express themselves.',
  },
  {
    id: 'hobbies',
    title: 'My Hobbies & Interests',
    tagline: 'My imagination in action',
    img: '/packs/hobbies.png',
    category: 'voice',
    catLabel: 'Identity & Voice',
    color: '#b083ff',
    age: '6–12',
    videos: 5,
    coins: 25,
    keyTopics: ['Creative Storytelling', 'Exploring New Worlds', 'Tabletop Adventures', 'Learning', 'Imagination', 'Exploration'],
    skills: ['Self-expression', 'Storytelling', 'Creative confidence'],
    desc: 'Students use their real interests — games, stories, imaginary worlds — as the launchpad for English expression. This pack makes speaking personal, imaginative, and genuinely motivated.',
  },
  {
    id: 'personality',
    title: 'Personality & Self-Awareness',
    tagline: 'Different minds learn differently',
    img: '/packs/personality.png',
    category: 'thinking',
    catLabel: 'Self & Awareness',
    color: '#b083ff',
    age: '9–15',
    videos: 5,
    coins: 30,
    keyTopics: ['Introversion vs Extroversion', 'Thinking vs Feeling vs Structure', 'Communication Styles', 'Structure vs Flexibility', 'Confidence Building', 'Adapting Learning Methods'],
    skills: ['Self-awareness', 'Empathy', 'Communication adaptability'],
    desc: 'No labels, no boxes — just insight. Students explore how different minds think, communicate, and learn. They discover their own strengths without being categorised, and learn to appreciate how others think.',
  },
  {
    id: 'natural-medicines',
    title: 'Natural Medicines',
    tagline: "Understanding Nature's Gifts \u2014 Knowledge Before Use",
    img: '/packs/natural-medicines.png',
    category: 'thinking',
    catLabel: 'Nature & Responsibility',
    color: '#4a9e7f',
    age: '9–15',
    videos: 5,
    coins: 30,
    keyTopics: ['Recognition & History', 'Cultural Wisdom', 'Safe Practices', 'No Medical Advice', 'Learning About Nature'],
    skills: ['Cultural literacy', 'Scientific curiosity', 'Responsible thinking'],
    desc: 'Learning about nature, not prescribing it. Students explore plants, cultural remedies, and natural wisdom from around the world — building respect for nature, cultural knowledge, and responsible thinking.',
  },
  {
    id: 'voice-expression',
    title: 'Voice, Presence & Expression',
    tagline: 'Being heard starts with being felt',
    img: '/packs/voice-expression.png',
    category: 'voice',
    catLabel: 'Voice & Leadership',
    color: '#ff9f5a',
    age: '9–15',
    videos: 6,
    coins: 40,
    keyTopics: ['Tone', 'Pacing', 'Volume', 'Storytelling', 'Presence', 'English Speaking', 'Leadership', 'Presentations'],
    skills: ['Public speaking', 'Emotional presence', 'Storytelling'],
    desc: 'Students learn that being heard is not about volume — it is about tone, timing, and presence. This pack builds the full toolkit: how to pace, pause, lead with story, and own any room.',
  },
  {
    id: 'pencil-proof',
    title: 'Pencil Proof Pack',
    tagline: 'Thinking and speaking without writing',
    img: null,
    category: 'thinking',
    catLabel: 'Thinking & Speaking',
    color: '#72d0ff',
    age: '6–12',
    videos: 6,
    coins: 40,
    keyTopics: ['Explain a picture in 60 seconds', 'Retell a story without notes', 'Describe how something works', 'Teach an imaginary friend', 'Explain using only simple words'],
    skills: ['Oral fluency', 'Independent thinking', 'Confidence without notes'],
    desc: 'Students build the ability to think on their feet — no writing, no crutches. Through explanation challenges and verbal exercises, they develop confident, structured spoken thought.',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Packs' },
  { id: 'thinking', label: '🧠 Thinking' },
  { id: 'voice', label: '🗣️ Voice' },
  { id: 'social', label: '🤝 Social' },
  { id: 'confidence', label: '🎯 Confidence' },
]

const AGE_STREAMS = [
  {
    badge: '🧒 Ages 6–8',
    label: 'Foundation & Safety',
    color: '#4de8b0',
    packs: ['swimming', 'health', 'music', 'hobbies', 'pencil-proof'],
    desc: 'Safety, body, and expression. Short activities, movement-based, zero pressure.',
  },
  {
    badge: '🧑 Ages 9–11',
    label: 'Awareness & Exploration',
    color: '#d2ad44',
    packs: ['kidinomics', 'personality', 'social-systems', 'natural-medicines', 'pencil-proof'],
    desc: 'Identity, value, and cooperation. Students start to explain, reflect, and choose.',
  },
  {
    badge: '🧑‍🎓 Ages 12–15',
    label: 'Expression & Leadership',
    color: '#b083ff',
    packs: ['voice-expression', 'social-systems', 'kidinomics', 'natural-medicines', 'personality'],
    desc: 'Communication, leadership, and systems. Students lead sessions and mentor peers.',
  },
]

function PackCard({ pack, featured }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <article
      className={`curric-pack-card${featured ? ' featured' : ''}`}
      style={{ '--pack-color': pack.color }}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="curric-pack-img-wrap">
        {pack.img
          ? <img src={pack.img} alt={pack.title} className="curric-pack-img" loading="lazy" />
          : <div className="curric-pack-img-placeholder"><span style={{ fontSize: '3rem' }}>✏️</span></div>
        }
        <div className="curric-pack-img-overlay">
          <span className="curric-cat-badge">{pack.catLabel}</span>
          <span className="curric-age-badge">Ages {pack.age}</span>
        </div>
      </div>
      <div className="curric-pack-body">
        <h3 className="curric-pack-title">{pack.title}</h3>
        <p className="curric-pack-tagline">"{pack.tagline}"</p>
        <div className="curric-pack-meta">
          <span>🎬 {pack.videos} videos</span>
          <span>🪙 {pack.coins} coins</span>
        </div>
        <p className="curric-pack-desc">{pack.desc}</p>
        {expanded && (
          <div className="curric-pack-expanded">
            <div className="curric-pack-topics">
              <p className="curric-mini-head">Key Topics</p>
              <ul>{pack.keyTopics.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="curric-pack-skills">
              <p className="curric-mini-head">Skills Built</p>
              {pack.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
            </div>
          </div>
        )}
        <button className="curric-expand-btn">
          {expanded ? '▲ Less' : '▼ Details'}
        </button>
      </div>
    </article>
  )
}

export default function Curriculum() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? PACKS
    : PACKS.filter(p => p.category === activeFilter)

  return (
    <div className="curric-page">

      {/* HERO */}
      <section className="curric-hero">
        <div className="curric-hero-inner">
          <p className="kicker">10 Life-Skill Packs · Every Region · Every Age</p>
          <h1 className="curric-hero-title">
            The DOWNFLOW<br />
            <span style={{ color: 'var(--gold)' }}>Curriculum</span>
          </h1>
          <p className="curric-hero-sub">
            Self-contained, repeatable learning packs that build real life skills alongside English fluency.
            Designed for cells of 5 students aged 6–15 across Vietnam, Germany, Russia, and beyond.
          </p>
          <div className="curric-hero-stats">
            {[
              ['10', 'Content Packs'],
              ['50+', 'Video Lessons'],
              ['3', 'Age Streams'],
              ['6–15', 'Age Range'],
            ].map(([n, l]) => (
              <div key={l} className="curric-hero-stat">
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS STRIP */}
      <section className="curric-how-strip">
        {[
          { icon: '📦', title: 'Pack', desc: 'Each pack is a self-contained unit with video lessons, exercises, and micro-challenges.' },
          { icon: '🔁', title: 'Repeat', desc: 'All exercises are repeatable. Students revisit until the skill is natural, not just performed.' },
          { icon: '🪙', title: 'Earn', desc: 'Completing video reps and challenges earns coins. Coins unlock deeper pack content.' },
          { icon: '🏫', title: 'Cell', desc: 'Every pack is delivered inside a Learning Cell — a group of 5 guided by a Student Guider.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="curric-how-item">
            <span className="curric-how-icon">{icon}</span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      {/* AGE STREAMS */}
      <section className="section curric-ages-section">
        <div className="section-head">
          <p className="kicker">Structured by Developmental Stage</p>
          <h2>Three Age Streams</h2>
          <p className="lead">The same packs adapt naturally across ages — no tracking, no separation, no labels.</p>
        </div>
        <div className="curric-age-grid">
          {AGE_STREAMS.map(s => (
            <div key={s.label} className="curric-age-card" style={{ '--stream-color': s.color }}>
              <div className="curric-age-badge">{s.badge}</div>
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
              <div className="curric-age-packs">
                {s.packs.map(pid => {
                  const p = PACKS.find(x => x.id === pid)
                  return p ? (
                    <span key={pid} className="curric-age-pack-chip" style={{ borderColor: p.color }}>
                      {p.title}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL PACKS */}
      <section className="section" id="all-packs">
        <div className="section-head">
          <p className="kicker">App-Ready Content</p>
          <h2>All Content Packs</h2>
          <p className="lead">Click any card to expand topics and skills built. Each pack is immediately usable in any Learning Cell.</p>
        </div>

        {/* Filter */}
        <div className="curric-filter-row">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`filter-btn${activeFilter === c.id ? ' active' : ''}`}
              onClick={() => setActiveFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="curric-packs-grid">
          {filtered.map(pack => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      {/* CURRICULUM PRINCIPLES */}
      <section className="section curric-principles-section">
        <div className="section-head">
          <p className="kicker">Design Philosophy</p>
          <h2>How Every Pack Is Built</h2>
        </div>
        <div className="curric-principles-grid">
          {[
            { icon: '🔁', title: 'Repeatable by Design', desc: 'No pack is consumed once. Every exercise is built to be repeated until the skill is automatic, not just performed.' },
            { icon: '🗣️', title: 'Output Over Input', desc: 'Students produce something in every session — a verbal rep, a challenge completion, a peer explanation. Passive watching is never enough.' },
            { icon: '🌍', title: 'Language-Neutral Core', desc: 'Every pack builds life skills first, language second. English fluency emerges from confident expression — not the other way around.' },
            { icon: '🧒', title: 'Age-Adaptable', desc: 'No pack requires rewriting for different ages. Facilitators adjust framing and depth. The core activities work from age 6 to 15.' },
            { icon: '🪙', title: 'Coin-Integrated', desc: 'All packs are woven into the coin system. Engagement, consistency, and contribution are recognised — never grades, never competition.' },
            { icon: '🛡️', title: 'Ethics-First', desc: 'No pack creates comparison, ranking, or pressure. Every topic is selected for developmental safety and cross-cultural relevance.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="curric-principle-item">
              <span className="curric-principle-icon">{icon}</span>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section curric-cta-section">
        <div className="curric-cta-inner">
          <p className="kicker">Ready to Begin?</p>
          <h2>Activate a Learning Cell</h2>
          <p className="lead">Sponsor a cell, join as a student, or train as a facilitator. Every path starts with one pack.</p>
          <div className="curric-cta-buttons">
            <Link to="/sponsor" className="btn btn-primary">Fund a Cell →</Link>
            <Link to="/student" className="btn btn-secondary">Student Portal</Link>
            <Link to="/facilitator" className="btn btn-secondary">Facilitator Portal</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
