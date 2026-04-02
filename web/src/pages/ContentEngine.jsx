import { useState } from 'react'

const LESSONS = [
  { id: 'ce-01', pack: 'Voice & Expression', title: 'Tone, Pace & Volume', duration: '8 min', type: 'edited', region: '🇻🇳', cell: 'VN-01', week: 9, views: 34, reuses: 6, tags: ['voice', 'tone'], quality: 9.2 },
  { id: 'ce-02', pack: 'Kidinomics', title: 'Value Exchange — Real vs Money', duration: '11 min', type: 'edited', region: '🇻🇳', cell: 'VN-01', week: 6, views: 28, reuses: 4, tags: ['value', 'thinking'], quality: 8.8 },
  { id: 'ce-03', pack: 'Pencil Proof', title: 'Explain a Picture in 60 Seconds', duration: '6 min', type: 'best-moment', region: '🇩🇪', cell: 'DE-01', week: 2, views: 51, reuses: 11, tags: ['speaking', 'thinking'], quality: 9.5 },
  { id: 'ce-04', pack: 'Social Systems', title: 'Leadership Rotation Activity', duration: '9 min', type: 'mini-lesson', region: '🇻🇳', cell: 'VN-02', week: 4, views: 19, reuses: 3, tags: ['social', 'leadership'], quality: 8.4 },
  { id: 'ce-05', pack: 'Body Intelligence', title: 'Posture Check + Speaking Practice', duration: '7 min', type: 'edited', region: '🇩🇪', cell: 'DE-02', week: 3, views: 22, reuses: 5, tags: ['body', 'confidence'], quality: 8.9 },
  { id: 'ce-06', pack: 'Kidinomics', title: 'Effort & Reward — Who Decides?', duration: '10 min', type: 'best-moment', region: '🇻🇳', cell: 'VN-01', week: 7, views: 15, reuses: 2, tags: ['value', 'thinking'], quality: 8.6 },
  { id: 'ce-07', pack: 'Music & Rhythm', title: 'Rhythm & Timing for Speech Flow', duration: '8 min', type: 'mini-lesson', region: '🇷🇺', cell: 'RU-01', week: 1, views: 12, reuses: 2, tags: ['voice', 'music'], quality: 8.1 },
  { id: 'ce-08', pack: 'Swimming', title: 'Breathing Technique for Calm Speaking', duration: '5 min', type: 'prompt', region: '🇻🇳', cell: 'VN-02', week: 2, views: 44, reuses: 9, tags: ['body', 'confidence'], quality: 9.1 },
  { id: 'ce-09', pack: 'Personality', title: 'How Different Minds Solve Problems', duration: '12 min', type: 'edited', region: '🇩🇪', cell: 'DE-01', week: 8, views: 18, reuses: 3, tags: ['thinking', 'self'], quality: 8.7 },
]

const PROMPTS = [
  { id: 'p-01', text: '"Explain how you helped someone this week — without using the word help."', pack: 'Kidinomics', age: '9–15', lang: 'EN / VN' },
  { id: 'p-02', text: '"Describe what you are doing with your hands right now in 5 different ways."', pack: 'Voice & Presence', age: '6–15', lang: 'EN' },
  { id: 'p-03', text: '"Tell me why water is important — but you can only use 10 words."', pack: 'Swimming', age: '6–12', lang: 'EN / DE' },
  { id: 'p-04', text: '"What would happen if everyone in your school switched jobs for a day?"', pack: 'Social Systems', age: '9–15', lang: 'EN / RU' },
  { id: 'p-05', text: '"Teach me one thing you learned this week — as if I am 5 years old."', pack: 'Pencil Proof', age: '6–15', lang: 'EN' },
]

const TYPE_COLORS = {
  'edited': '#4de8b0',
  'best-moment': '#d2ad44',
  'mini-lesson': '#72d0ff',
  'prompt': '#b083ff',
}

const PHASE_STATUS = [
  { phase: 'Phase 1', label: 'Basic Content Library', status: 'current', desc: 'Upload & tag edited recordings from facilitators. Manual upload flow. Lightweight library view.' },
  { phase: 'Phase 2', label: 'Reuse Tracking & Ratings', status: 'next', desc: 'Track which lessons are reused across cells. Quality scoring from facilitators and guiders.' },
  { phase: 'Phase 3', label: 'Content Intelligence', status: 'future', desc: 'AI-assisted editing. Best-moment extraction. Auto-tagging by pack and theme.' },
]

function LessonCard({ lesson }) {
  return (
    <div className="ce-lesson-card">
      <div className="ce-lesson-header">
        <div className="ce-lesson-type" style={{ background: TYPE_COLORS[lesson.type] + '22', color: TYPE_COLORS[lesson.type], borderColor: TYPE_COLORS[lesson.type] + '44' }}>
          {lesson.type === 'edited' ? '✂️ Edited' : lesson.type === 'best-moment' ? '⭐ Best Moment' : lesson.type === 'mini-lesson' ? '📚 Mini-Lesson' : '💬 Prompt'}
        </div>
        <span className="ce-lesson-quality" style={{ color: lesson.quality >= 9 ? '#4de8b0' : '#d2ad44' }}>★ {lesson.quality}</span>
      </div>
      <h3 className="ce-lesson-title">{lesson.title}</h3>
      <p className="ce-lesson-pack">{lesson.pack}</p>
      <div className="ce-lesson-meta">
        <span>⏱ {lesson.duration}</span>
        <span>{lesson.region} {lesson.cell}</span>
        <span>Wk {lesson.week}</span>
      </div>
      <div className="ce-lesson-stats">
        <span>👁 {lesson.views} views</span>
        <span>🔁 {lesson.reuses} reuses</span>
      </div>
      <div className="ce-lesson-tags">
        {lesson.tags.map(t => <span key={t} className="ce-tag">{t}</span>)}
      </div>
      <div className="ce-lesson-actions">
        <button className="btn btn-secondary btn-sm">▶ Preview</button>
        <button className="btn btn-secondary btn-sm">🔁 Reuse</button>
      </div>
    </div>
  )
}

export default function ContentEngine() {
  const [activeTab, setActiveTab] = useState('library')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = typeFilter === 'all' ? LESSONS : LESSONS.filter(l => l.type === typeFilter)

  return (
    <div className="dashboard-page">

      <div className="db-page-header" style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, var(--navy) 100%)' }}>
        <div className="db-header-inner">
          <div>
            <p className="kicker">Module 3 — Content Engine</p>
            <h1 className="db-title">🎬 Content Engine</h1>
            <p className="db-subtitle">Live learning → reusable digital assets · Less facilitator fatigue · More value per lesson · Scalable quality</p>
          </div>
          <div className="db-header-actions">
            <button className="btn btn-primary">+ Upload Recording</button>
            <button className="btn btn-secondary">Export Library</button>
          </div>
        </div>
        <div className="db-stats-row">
          {[
            ['🎬', '47', 'Lessons in Library', 'Across all packs', '#72d0ff'],
            ['⭐', '12', 'Best Moments', 'Top-rated clips', '#d2ad44'],
            ['🔁', '68', 'Total Reuses', 'Lessons used in other cells', '#4de8b0'],
            ['💬', '24', 'Reusable Prompts', 'Language pattern library', '#b083ff'],
          ].map(([icon, val, label, sub, color]) => (
            <div key={label} className="db-stat-card" style={{ '--stat-color': color }}>
              <span className="db-stat-icon">{icon}</span>
              <div>
                <p className="db-stat-value">{val}</p>
                <p className="db-stat-label">{label}</p>
                <p className="db-stat-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="db-tabs">
        {[
          ['library', '📚 Lesson Library'],
          ['prompts', '💬 Prompt Bank'],
          ['pipeline', '📥 Upload Pipeline'],
          ['roadmap', '🗺 Build Roadmap'],
        ].map(([id, label]) => (
          <button key={id} className={`db-tab${activeTab === id ? ' active' : ''}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      <div className="db-content">

        {activeTab === 'library' && (
          <div className="db-tab-content">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginRight: '0.25rem' }}>Filter:</span>
              {[['all', 'All'], ['edited', '✂️ Edited'], ['best-moment', '⭐ Best Moments'], ['mini-lesson', '📚 Mini-Lessons'], ['prompt', '💬 Prompts']].map(([id, label]) => (
                <button key={id} className={`filter-btn${typeFilter === id ? ' active' : ''}`} onClick={() => setTypeFilter(id)}>{label}</button>
              ))}
            </div>
            <div className="ce-lessons-grid">
              {filtered.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="db-tab-content">
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Language prompts extracted from real sessions. Copy, adapt, and use in any cell. No facilitator needs to invent from scratch.
            </p>
            <div className="ce-prompts-list">
              {PROMPTS.map(p => (
                <div key={p.id} className="ce-prompt-card">
                  <div className="ce-prompt-quote">
                    <span className="ce-quote-mark">"</span>
                    <p>{p.text.replace(/^"|"$/g, '')}</p>
                  </div>
                  <div className="ce-prompt-meta">
                    <span className="ce-tag">{p.pack}</span>
                    <span className="ce-tag">Ages {p.age}</span>
                    <span className="ce-tag">🌐 {p.lang}</span>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }}>📋 Copy Prompt</button>
                </div>
              ))}
            </div>
            <div className="db-panel" style={{ marginTop: '2rem' }}>
              <h3 className="db-panel-title">➕ Submit a Prompt</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>
                Facilitators: if a prompt worked brilliantly in your session, submit it to the shared bank.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <input className="form-input" placeholder="The prompt text..." style={{ gridColumn: '1 / -1' }} />
                <input className="form-input" placeholder="Pack name" />
                <input className="form-input" placeholder="Age range (e.g. 9–15)" />
              </div>
              <button className="btn btn-primary">Submit Prompt</button>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="db-tab-content">
            <div className="two-col-grid">
              <div className="db-panel">
                <h3 className="db-panel-title">📥 How Content Enters the Engine</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { step: '01', icon: '🎥', title: 'Live Session via Google Meet', desc: 'Session runs. Facilitator records if consent is given. Recording stays in Google Drive initially.' },
                    { step: '02', icon: '✂️', title: 'Facilitator Tags & Uploads', desc: 'Facilitator trims to the key moment (5–12 min). Uploads via this panel. Tags pack, week, and region.' },
                    { step: '03', icon: '🔍', title: 'Cell Coordinator Reviews', desc: 'Coordinator checks quality and student safety. Approves for library or sends back for editing.' },
                    { step: '04', icon: '📚', title: 'Published to Lesson Library', desc: 'Lesson is now reusable by any facilitator globally. No names, no identifiers.' },
                    { step: '05', icon: '🔁', title: 'Reuse in Other Cells', desc: 'Any facilitator can embed the lesson in their session. Reuse count tracked. Quality rated post-use.' },
                  ].map(s => (
                    <div key={s.step} style={{ display: 'flex', gap: '1rem', padding: '0.85rem', background: 'var(--bg-card-alt)', borderRadius: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>{s.step}</div>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--navy)' }}>{s.icon} {s.title}</strong>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-soft)', lineHeight: 1.55 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="db-panel" style={{ marginBottom: '1.25rem' }}>
                  <h3 className="db-panel-title">📤 Upload a Recording</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <input className="form-input" placeholder="Lesson title" />
                    <select className="form-input">
                      <option value="">Select pack...</option>
                      {['Voice & Expression','Kidinomics','Pencil Proof','Social Systems','Body Intelligence','Music & Rhythm','Swimming','Personality','Natural Medicines','My Hobbies'].map(p=><option key={p}>{p}</option>)}
                    </select>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      <input className="form-input" placeholder="Cell ID (e.g. VN-01)" />
                      <input className="form-input" placeholder="Week number" />
                    </div>
                    <select className="form-input">
                      <option value="">Content type...</option>
                      <option>Edited recording</option>
                      <option>Best moment clip</option>
                      <option>Mini-lesson</option>
                      <option>Language prompt</option>
                    </select>
                    <div style={{ border: '2px dashed var(--border)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', background: 'var(--bg-page)' }}>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-soft)' }}>📎 Drop video file here or click to browse</p>
                      <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>MP4 · max 200MB · no student names visible</p>
                    </div>
                    <button className="btn btn-primary">Upload for Review</button>
                  </div>
                </div>

                <div className="db-panel">
                  <h3 className="db-panel-title">✅ Safety Checklist</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginBottom: '0.75rem' }}>Confirm before uploading:</p>
                  {[
                    'No student faces are identifiable',
                    'No student names are spoken or on screen',
                    'Consent was obtained from all families',
                    'Recording is trimmed (no full session data)',
                    'No sponsor branding visible in video',
                  ].map(item => (
                    <label key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.5rem', fontSize: '0.82rem', color: 'var(--text-soft)', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ marginTop: '2px', flexShrink: 0 }} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="db-tab-content">
            <div className="db-panel" style={{ marginBottom: '1.5rem' }}>
              <h3 className="db-panel-title">🗺 Content Engine Build Phases</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', marginBottom: '1.5rem' }}>
                The Content Engine is built in three phases. Phase 1 is live. Phases 2 and 3 follow as the network grows.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PHASE_STATUS.map((p, i) => (
                  <div key={p.phase} style={{ display: 'flex', gap: '1.25rem', padding: '1.1rem 1.25rem', background: p.status === 'current' ? 'var(--blue-pale)' : 'var(--bg-card-alt)', border: `1.5px solid ${p.status === 'current' ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: p.status === 'current' ? 'var(--blue)' : p.status === 'next' ? 'var(--gold)' : 'var(--border)', color: p.status === 'future' ? 'var(--text-muted)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <strong style={{ color: 'var(--navy)' }}>{p.phase} — {p.label}</strong>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.55rem', borderRadius: '20px', background: p.status === 'current' ? '#4de8b022' : p.status === 'next' ? '#d2ad4422' : 'var(--bg-card-alt)', color: p.status === 'current' ? '#4de8b0' : p.status === 'next' ? '#a8843e' : 'var(--text-muted)', border: '1px solid currentColor' }}>
                          {p.status === 'current' ? '● Live' : p.status === 'next' ? '→ Next' : '○ Future'}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-soft)', lineHeight: 1.55 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-panel">
              <h3 className="db-panel-title">💡 The Value Flywheel</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginTop: '0.75rem' }}>
                {[
                  { icon: '🎥', step: 'Live session', desc: 'Learning happens. Facilitator captures key moment.' },
                  { icon: '✂️', step: 'Edited asset', desc: 'Raw recording becomes a clean, reusable lesson clip.' },
                  { icon: '🔁', step: 'Reused globally', desc: 'Other cells use the asset. Less prep. More consistency.' },
                  { icon: '📈', step: 'Value multiplies', desc: 'One lesson serves 100 cells. Quality improves with each reuse.' },
                ].map((s, i) => (
                  <div key={s.step} style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--bg-card-alt)', borderRadius: '12px', position: 'relative' }}>
                    {i < 3 && <span style={{ position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: 'var(--blue)', zIndex: 1 }}>→</span>}
                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{s.icon}</span>
                    <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--navy)', marginBottom: '0.3rem' }}>{s.step}</strong>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-soft)', lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
