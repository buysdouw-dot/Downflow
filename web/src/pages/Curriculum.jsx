import { useState } from 'react'
import { Link } from 'react-router-dom'
import MyVoiceStory from '../components/MyVoiceStory.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

/* ─────────────────────────────────────────────────────────
   INVERTED EDUCATION MODEL DATA
───────────────────────────────────────────────────────── */
const INVERTED_FLOW = [
  {
    num: '01',
    label: 'Awareness & Curiosity',
    q: 'How do I think? What interests me?',
    desc: 'Learning begins with the learner — not the subject. Students discover how their own mind works before anything is introduced from the outside.',
    color: '#b083ff',
    icon: '🌱',
  },
  {
    num: '02',
    label: 'Confidence & Expression',
    q: 'Can I express myself safely?',
    desc: 'Before skills are built, the student must feel safe to speak, try, fail, and try again. Expression is never graded — only encouraged.',
    color: '#72d0ff',
    icon: '🗣️',
  },
  {
    num: '03',
    label: 'Skill Development',
    q: 'What can I do with my body, mind, and tools?',
    desc: 'Skills attach naturally to confident learners. Physical, cognitive, and communicative skills are introduced as tools — never as performance requirements.',
    color: '#4de8b0',
    icon: '🛠️',
  },
  {
    num: '04',
    label: 'Value Creation',
    q: 'How does my learning help others?',
    desc: 'Students begin to see their growth as useful — to their cell, their family, their community. Learning becomes an act of contribution, not accumulation.',
    color: '#d2ad44',
    icon: '🤝',
  },
  {
    num: '05',
    label: 'Contribution & Growth',
    q: 'How do I participate in the world?',
    desc: 'The student exits education as a contributor — someone who creates, mentors, leads, and gives back. Competence grows naturally from confidence.',
    color: '#ff9f5a',
    icon: '🌍',
  },
]

const AGE_STAGES = [
  {
    emoji: '🟡',
    badge: 'Foundation Stage',
    ages: 'Ages 5–7',
    focus: 'Curiosity · Safety · Play',
    color: '#d2ad44',
    teacherRole: 'Guide · Encourager · Observer',
    how: [
      'Learning through movement, stories, sound, and play',
      'No grades, no ranking — ever',
      'Mistakes are normal and welcomed',
      'Short, joyful activities with zero pressure',
    ],
    outcomes: [
      'Confidence speaking and trying new things',
      'Body awareness and physical coordination',
      'Early understanding of choice and consequence',
    ],
    packs: ['swimming', 'health', 'music', 'hobbies'],
  },
  {
    emoji: '🟢',
    badge: 'Development Stage',
    ages: 'Ages 8–10',
    focus: 'Expression · Understanding · Structure',
    color: '#4de8b0',
    teacherRole: 'Coach · Question-Asker · Connector',
    how: [
      'Short projects and collaborative group activities',
      'Gentle structure introduced — never enforced',
      'Learners explain ideas in their own words',
      'Peer reflection and simple self-assessment',
    ],
    outcomes: [
      'Clear, confident communication',
      'Early responsibility and independence',
      'Understanding of effort, value, and teamwork',
    ],
    packs: ['kidinomics', 'personality', 'pencil-proof', 'social-systems'],
  },
  {
    emoji: '🔵',
    badge: 'Expression Stage',
    ages: 'Ages 11–14',
    focus: 'Identity · Skill · Contribution',
    color: '#72d0ff',
    teacherRole: 'Mentor · Facilitator · Collaborator',
    how: [
      'Project-based, real-world learning cycles',
      'Simulations, role play, and genuine challenges',
      'Learners reflect, revise, and present',
      'Leadership rotation — every student leads',
    ],
    outcomes: [
      'Strong, authentic self-expression',
      'Practical life skills ready for the real world',
      'Confidence working with others and leading ideas',
    ],
    packs: ['voice-expression', 'social-systems', 'natural-medicines', 'kidinomics'],
  },
]

const ASSESSMENT_PILLARS = [
  { icon: '⚡', label: 'Engagement', desc: 'Are they showing up — mentally and physically? Curiosity and presence matter more than performance.' },
  { icon: '💪', label: 'Effort', desc: 'Are they trying, even when it\'s hard? Effort without outcome is always recognised and valued.' },
  { icon: '📈', label: 'Growth', desc: 'Are they better than last week? Progress is measured against the individual — never against peers.' },
  { icon: '🗣️', label: 'Communication', desc: 'Can they express what they understand, even imperfectly? The voice is always developing.' },
  { icon: '🤝', label: 'Contribution', desc: 'Are they helping others grow? The highest measure is giving back to the group.' },
]

const WHY_IT_WORKS = [
  { icon: '🧠', text: 'Children learn how to think — not what to repeat' },
  { icon: '🔗', text: 'Skills become meaningful because they connect to self' },
  { icon: '🌱', text: 'Motivation comes from ownership, not fear' },
  { icon: '🌍', text: 'Learners grow into creators, not consumers' },
]

/* ─────────────────────────────────────────────────────────
   CONTENT PACKS
───────────────────────────────────────────────────────── */
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
    stage: 'development',
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
    stage: 'foundation',
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
    stage: 'expression',
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
    stage: 'foundation',
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
    stage: 'foundation',
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
    stage: 'foundation',
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
    stage: 'development',
    keyTopics: ['Introversion vs Extroversion', 'Thinking vs Feeling vs Structure', 'Communication Styles', 'Structure vs Flexibility', 'Confidence Building', 'Adapting Learning Methods'],
    skills: ['Self-awareness', 'Empathy', 'Communication adaptability'],
    desc: 'No labels, no boxes — just insight. Students explore how different minds think, communicate, and learn. They discover their own strengths without being categorised, and learn to appreciate how others think.',
  },
  {
    id: 'natural-medicines',
    title: 'Natural Medicines',
    tagline: "Understanding Nature's Gifts — Knowledge Before Use",
    img: '/packs/natural-medicines.png',
    category: 'thinking',
    catLabel: 'Nature & Responsibility',
    color: '#4a9e7f',
    age: '9–15',
    videos: 5,
    coins: 30,
    stage: 'expression',
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
    stage: 'expression',
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
    stage: 'development',
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

/* ─────────────────────────────────────────────────────────
   PACK CARD
───────────────────────────────────────────────────────── */
function PackCard({ pack }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <article
      className="curric-pack-card"
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
          <span className="curric-age-badge-img">Ages {pack.age}</span>
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

/* ─────────────────────────────────────────────────────────
   INVERTED PYRAMID SVG VISUAL
───────────────────────────────────────────────────────── */
function InvertedPyramid() {
  const traditional = ['Content', 'Tests', 'Pressure', 'Identity']
  const downflow    = ['Mind & Self', 'Skills', 'Community', 'Output', 'Value']

  return (
    <div className="inverted-pyramid-compare">
      {/* Traditional */}
      <div className="pyramid-side">
        <p className="pyramid-label trad">Traditional School</p>
        <div className="pyramid-stack">
          {traditional.map((item, i) => (
            <div
              key={item}
              className="pyramid-block trad-block"
              style={{
                width: `${100 - i * 16}%`,
                background: `rgba(44,62,80,${0.12 + i * 0.12})`,
                borderColor: `rgba(44,62,80,${0.2 + i * 0.1})`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <p className="pyramid-caption">Widens from content down.<br />Identity formed last — under pressure.</p>
      </div>

      {/* Divider */}
      <div className="pyramid-divider">
        <div className="pyramid-vs">VS</div>
      </div>

      {/* DOWNFLOW — inverted */}
      <div className="pyramid-side">
        <p className="pyramid-label down">DOWNFLOW Model</p>
        <div className="pyramid-stack inverted">
          {downflow.map((item, i) => (
            <div
              key={item}
              className="pyramid-block down-block"
              style={{
                width: `${100 - (downflow.length - 1 - i) * 16}%`,
                background: `rgba(74,111,165,${0.08 + i * 0.08})`,
                borderColor: INVERTED_FLOW[i]?.color || '#4a6fa5',
                color: i === 0 ? 'var(--navy)' : i >= 3 ? 'var(--navy)' : 'var(--navy)',
              }}
            >
              <span className="pyr-icon">{INVERTED_FLOW[i]?.icon}</span>
              {item}
            </div>
          ))}
        </div>
        <p className="pyramid-caption">Starts wide with the learner.<br />Narrows into focused contribution.</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   AGE STAGE CARD
───────────────────────────────────────────────────────── */
function StageCard({ stage }) {
  const stagePacks = PACKS.filter(p => stage.packs.includes(p.id))
  return (
    <div className="stage-card" style={{ '--stage-color': stage.color }}>
      <div className="stage-card-header">
        <span className="stage-emoji">{stage.emoji}</span>
        <div>
          <h3 className="stage-title">{stage.badge}</h3>
          <span className="stage-ages">{stage.ages}</span>
        </div>
        <div className="stage-focus-pill">{stage.focus}</div>
      </div>

      <div className="stage-card-body">
        <div className="stage-col">
          <p className="stage-section-head">How Learning Looks</p>
          <ul className="stage-list">
            {stage.how.map(h => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className="stage-col">
          <p className="stage-section-head">Key Outcomes</p>
          <ul className="stage-list outcomes">
            {stage.outcomes.map(o => <li key={o}>{o}</li>)}
          </ul>
        </div>
      </div>

      <div className="stage-card-footer">
        <div className="stage-teacher-role">
          <span className="stage-role-label">Teacher Role</span>
          <span className="stage-role-value">{stage.teacherRole}</span>
        </div>
        <div className="stage-pack-chips">
          {stagePacks.map(p => (
            <span key={p.id} className="stage-pack-chip" style={{ borderColor: p.color }}>
              {p.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */

export default function Curriculum() {
  usePageMeta("Curriculum", "Explore DOWNFLOW learning packs - Voice & Presence, Kidinomics, Systems Thinking and more.")

  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? PACKS
    : PACKS.filter(p => p.category === activeFilter)

  return (
    <div className="curric-page">

      {/* ── HERO ── */}
      <section className="curric-hero">
        <div className="curric-hero-inner">
          <p className="kicker">The Inverted Education Model · 10 Life-Skill Packs · Ages 5–14</p>
          <h1 className="curric-hero-title">
            We educate<br />
            <span style={{ color: 'var(--gold)' }}>from the inside out.</span>
          </h1>
          <p className="curric-hero-sub">
            Traditional school starts with content and ends with identity.
            DOWNFLOW starts with the learner — their mind, curiosity, and confidence —
            and builds outward into skills, community, and real-world contribution.
          </p>
          <div className="curric-hero-stats">
            {[
              ['10',   'Content Packs'],
              ['3',    'Age Stages'],
              ['5',    'Learning Pillars'],
              ['0',    'Traditional Grades'],
            ].map(([n, l]) => (
              <div key={l} className="curric-hero-stat">
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS STRIP ── */}
      <section className="curric-how-strip">
        {[
          { icon: '🧠', title: 'Mind First',  desc: 'Every session starts with the learner — their thinking, curiosity, and sense of self. Not with a topic or a grade.' },
          { icon: '🗣️', title: 'Expression',  desc: 'Students learn to express themselves safely before any skill is introduced. Voice is built before vocabulary.' },
          { icon: '🛠️', title: 'Skills',      desc: 'Content packs attach to confident learners. Skills grow naturally from self-belief — never from pressure.' },
          { icon: '🌍', title: 'Contribution', desc: 'The end goal is a learner who gives back — to their cell, their family, and the wider world.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="curric-how-item">
            <span className="curric-how-icon">{icon}</span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      {/* ── MY VOICE STORY ── */}
      <section style={{ background: 'var(--bg-card-alt)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <p className="kicker">Short Video Story · ~20 seconds · Cinematic</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--navy)', margin: '0.25rem 0' }}>
              <span style={{ color: 'var(--gold)' }}>"My Voice"</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-soft)', margin: '0.75rem auto 0', maxWidth: 520, lineHeight: 1.65 }}>
              English is not about being perfect.<br />
              <strong style={{ color: 'var(--navy)' }}>English is about being heard.</strong>
            </p>
          </div>
          <MyVoiceStory compact />
          <div style={{ textAlign: 'center', padding: '0 2rem 3rem' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', lineHeight: 1.75, margin: 0 }}>
              <strong style={{ color: 'var(--navy)' }}>Learning → Trying → Using → Sharing → Belonging.</strong><br />
              Parents immediately understand the value. Children can see themselves in the story.
            </p>
          </div>
        </div>
      </section>

      {/* ── INVERTED MODEL COMPARISON ── */}
      <section className="section curric-model-section">
        <div className="section-head">
          <p className="kicker">Core Philosophy</p>
          <h2>The Inverted Education Model</h2>
          <p className="lead">
            Traditional school moves from content to tests to pressure to identity.<br />
            We reverse the flow — and everything changes.
          </p>
        </div>
        <InvertedPyramid />
      </section>

      {/* ── LEARNING FLOW — 5 STEPS ── */}
      <section className="section curric-flow-section">
        <div className="section-head">
          <p className="kicker">The Learning Sequence</p>
          <h2>Learning Flows in This Order</h2>
          <p className="lead">Each stage builds on the last. No step is skipped. No step is rushed.</p>
        </div>
        <div className="curric-flow-steps">
          {INVERTED_FLOW.map((step, i) => (
            <div key={step.num} className="curric-flow-step" style={{ '--flow-color': step.color }}>
              <div className="flow-step-num">{step.num}</div>
              <div className="flow-step-icon">{step.icon}</div>
              <div className="flow-step-body">
                <h3 className="flow-step-title">{step.label}</h3>
                <p className="flow-step-q">"{step.q}"</p>
                <p className="flow-step-desc">{step.desc}</p>
              </div>
              {i < INVERTED_FLOW.length - 1 && (
                <div className="flow-step-arrow">↓</div>
              )}
            </div>
          ))}
        </div>
        <div className="curric-flow-footer">
          <p>There is no rush to performance. <strong>Competence grows naturally from confidence.</strong></p>
        </div>
      </section>

      {/* ── AGE STAGES ── */}
      <section className="section curric-stages-section">
        <div className="section-head">
          <p className="kicker">Structured by Developmental Stage</p>
          <h2>The Same Philosophy — Three Ages</h2>
          <p className="lead">
            Every stage uses the same Inverted Model. The depth, framing, and challenge adapt
            to where the learner actually is — not where we expect them to be.
          </p>
        </div>
        <div className="curric-stages-grid">
          {AGE_STAGES.map(s => <StageCard key={s.badge} stage={s} />)}
        </div>
      </section>

      {/* ── INVERTED ASSESSMENT ── */}
      <section className="section curric-assessment-section">
        <div className="section-head">
          <p className="kicker">Assessment — Inverted</p>
          <h2>No Grades First.</h2>
          <p className="lead">
            Academic benchmarks come after confidence is built — not before.
            Students are assessed on five pillars that actually predict lifelong success.
          </p>
        </div>
        <div className="curric-assessment-grid">
          {ASSESSMENT_PILLARS.map(p => (
            <div key={p.label} className="curric-assess-card">
              <span className="curric-assess-icon">{p.icon}</span>
              <strong>{p.label}</strong>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="curric-assess-note">
          <span className="curric-assess-note-icon">📌</span>
          <p>
            Academic benchmarks are introduced gradually — as <em>tools</em> for self-measurement,
            never as instruments of comparison or pressure. Students set their own targets after
            their confidence is already established.
          </p>
        </div>
      </section>

      {/* ── ALL PACKS ── */}
      <section className="section" id="all-packs">
        <div className="section-head">
          <p className="kicker">App-Ready Content</p>
          <h2>All 10 Content Packs</h2>
          <p className="lead">
            Each pack is self-contained, repeatable, and immediately usable in any Learning Cell.
            Click any card to expand topics and skills.
          </p>
        </div>
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
          {filtered.map(pack => <PackCard key={pack.id} pack={pack} />)}
        </div>
      </section>

      {/* ── WHY THIS WORKS ── */}
      <section className="section curric-why-section">
        <div className="section-head">
          <p className="kicker">The Evidence</p>
          <h2>Why This Works</h2>
        </div>
        <div className="curric-why-grid">
          {WHY_IT_WORKS.map(w => (
            <div key={w.text} className="curric-why-item">
              <span className="curric-why-icon">{w.icon}</span>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
        <blockquote className="curric-why-quote">
          "We don't produce graduates. We produce contributors."
        </blockquote>
      </section>

      {/* ── CURRICULUM PRINCIPLES ── */}
      <section className="section curric-principles-section">
        <div className="section-head">
          <p className="kicker">Pack Design Philosophy</p>
          <h2>How Every Pack Is Built</h2>
        </div>
        <div className="curric-principles-grid">
          {[
            { icon: '🔁', title: 'Repeatable by Design', desc: 'No pack is consumed once. Every exercise is built to be repeated until the skill is automatic, not just performed.' },
            { icon: '🗣️', title: 'Output Over Input',    desc: 'Students produce something in every session — a verbal rep, a challenge completion, a peer explanation. Passive watching is never enough.' },
            { icon: '🌍', title: 'Language-Neutral Core', desc: 'Every pack builds life skills first, language second. English fluency emerges from confident expression — not the other way around.' },
            { icon: '🧒', title: 'Age-Adaptable',         desc: 'No pack requires rewriting for different ages. Facilitators adjust framing and depth. The core activities work from age 5 to 14.' },
            { icon: '🪙', title: 'Coin-Integrated',       desc: 'All packs are woven into the coin system. Engagement, consistency, and contribution are recognised — never grades, never competition.' },
            { icon: '🛡️', title: 'Ethics-First',          desc: 'No pack creates comparison, ranking, or pressure. Every topic is selected for developmental safety and cross-cultural relevance.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="curric-principle-item">
              <span className="curric-principle-icon">{icon}</span>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section curric-cta-section">
        <div className="curric-cta-inner">
          <p className="kicker">Ready to Begin?</p>
          <h2>Activate a Learning Cell</h2>
          <p className="lead">
            Sponsor a cell, join as a student, or train as a facilitator.
            Every path starts with one pack.
          </p>
          <div className="curric-cta-buttons">
            <Link to="/sponsor"     className="btn btn-primary">Fund a Cell →</Link>
            <Link to="/student"     className="btn btn-secondary">Student Portal</Link>
            <Link to="/facilitator" className="btn btn-secondary">Facilitator Portal</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
