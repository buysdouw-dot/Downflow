import { useParams, Link, useNavigate } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

const ARTICLES = {
  'cell-vn01-season-1': {
    id: 'cell-vn01-season-1',
    type: 'milestone',
    typeColor: '#4de8b0',
    icon: '🏆',
    title: 'Cell VN-01 Completes Season 1',
    subtitle: '5 students. 24 sessions. 100% succession rate.',
    date: '1 April 2026',
    region: '🇻🇳 Vietnam',
    readTime: '4 min read',
    body: [
      { type: 'lead', text: 'Hanoi Learning Cell VN-01 has completed all 24 sessions of Season 1 — the first DOWNFLOW cell to complete a full year cycle. All five students have advanced to the next cohort, achieving a 100% succession rate.' },
      { type: 'h2', text: 'What Happened' },
      { type: 'p', text: 'VN-01 launched in March 2025 with five students aged 9–13. The cell ran weekly sessions on Tuesdays at 5:00 PM in Hanoi\'s Ba Dinh district. The pack was Voice & Presence — chosen because the community identified spoken confidence as the most critical gap for children in the area.' },
      { type: 'p', text: 'Sessions ran without a single cancellation across 24 weeks. Facilitator Dr. Hoa Nguyen maintained a session health score of 8.7 out of 10 throughout the year. Parent engagement remained above 85% from Session 4 onwards.' },
      { type: 'h2', text: 'Student Outcomes' },
      { type: 'stats', items: [
        { val: '5/5', label: 'Students advanced' },
        { val: '8.7', label: 'Avg session score' },
        { val: '85%+', label: 'Parent engagement' },
        { val: '24', label: 'Sessions completed' },
      ]},
      { type: 'p', text: 'By Session 20, all five students were voluntarily presenting to the group without prompting — a key behavioural indicator of the model working. Two students have been nominated to join Season 2 as Junior Guiders, assisting Dr. Nguyen in facilitating segments of sessions.' },
      { type: 'h2', text: 'What Succession Means' },
      { type: 'p', text: 'Succession in DOWNFLOW means a student has demonstrated enough growth to qualify for the next cohort or guider path. It is not a test. It is assessed through consistent participation, peer contribution, and the facilitator\'s holistic observation across all 24 sessions.' },
      { type: 'p', text: 'A 100% succession rate in Season 1 sets a benchmark for the network. It validates the model in its first complete test at scale.' },
      { type: 'h2', text: 'What Happens Next' },
      { type: 'p', text: 'VN-01 will transition to Season 2 in May 2026 with a new cohort. The two nominated guiders will co-facilitate selected sessions. Their contributions will be tracked and rewarded through the platform\'s earnings system.' },
      { type: 'p', text: 'The sponsor — Vingroup Education Foundation — has confirmed renewal funding for Season 2. The cell is now a permanent part of the Hanoi DOWNFLOW network.' },
    ],
    relatedIds: ['50-students-milestone', 'content-engine-47', 'coin-system-update'],
  },
  'globalEd-germany-partner': {
    id: 'globalEd-germany-partner',
    type: 'sponsor',
    typeColor: '#d2ad44',
    icon: '🏦',
    title: 'GlobalEd Germany Joins as Growth Partner',
    subtitle: 'Two cells funded in Berlin and Hamburg for the full 2026 cycle.',
    date: '28 March 2026',
    region: '🇩🇪 Germany',
    readTime: '3 min read',
    body: [
      { type: 'lead', text: 'GlobalEd Germany has committed to fund two DOWNFLOW Learning Cells in Berlin and Hamburg for the full 2026 cycle, making them the first European Growth Partner at the regional tier.' },
      { type: 'h2', text: 'What This Means' },
      { type: 'p', text: 'At the Regional Sponsor tier, GlobalEd Germany\'s contribution funds 10 students across two cells, covers facilitator pay for the full year, and provides named co-branding across both cells in the network.' },
      { type: 'p', text: 'The two cells — DE-01 (Berlin) and DE-02 (Hamburg) — will run the Kidinomics pack, selected after a community needs assessment that identified financial literacy as the highest-priority skill gap in both cities.' },
      { type: 'h2', text: 'About GlobalEd Germany' },
      { type: 'p', text: 'GlobalEd Germany is a private educational foundation focused on alternative learning pathways for children in urban communities. After reviewing the DOWNFLOW model in Q4 2025, their board voted unanimously to become founding European partners.' },
      { type: 'h2', text: 'Sponsor Statement' },
      { type: 'quote', text: '"What convinced us was the transparency. We could see exactly where every euro goes and exactly what outcome it produces. That kind of accountability doesn\'t exist in most educational philanthropy."' },
      { type: 'p', text: 'Both cells begin formal activation in April 2026. First sessions are targeted for May.' },
    ],
    relatedIds: ['cell-vn01-season-1', 'russia-moscow-live'],
  },
  '50-students-milestone': {
    id: '50-students-milestone',
    type: 'milestone',
    typeColor: '#4de8b0',
    icon: '⭐',
    title: '50 Students Now Active Across All Cells',
    subtitle: 'The network reaches its first major scale milestone.',
    date: '15 March 2026',
    region: '🌍 Global',
    readTime: '2 min read',
    body: [
      { type: 'lead', text: 'As of March 2026, the DOWNFLOW network supports 50 active students across 7 cells in 3 countries. All 50 participate at zero cost to their families.' },
      { type: 'h2', text: 'The Numbers' },
      { type: 'stats', items: [
        { val: '50', label: 'Active students' },
        { val: '7', label: 'Active cells' },
        { val: '3', label: 'Countries' },
        { val: '$0', label: 'Cost to families' },
      ]},
      { type: 'p', text: 'Vietnam leads with 4 active cells. Germany is at 2 cells following the GlobalEd partnership. Russia\'s first cell launched this month in Moscow.' },
      { type: 'p', text: 'The 50-student milestone matters not because of the number, but because of what it represents: the model has been tested across multiple cultures, languages, and facilitators — and the core pattern holds.' },
    ],
    relatedIds: ['cell-vn01-season-1', 'russia-moscow-live', 'globalEd-germany-partner'],
  },
  'russia-moscow-live': {
    id: 'russia-moscow-live',
    type: 'expansion',
    typeColor: '#b083ff',
    icon: '🌍',
    title: 'Russia Phase 1 — Moscow Cell Live',
    subtitle: 'RU-01 completes its first session with strong early indicators.',
    date: '20 March 2026',
    region: '🇷🇺 Russia',
    readTime: '3 min read',
    body: [
      { type: 'lead', text: 'RU-01 Moscow has completed its inaugural session. Week 1 health score: 70. Student engagement rated as strong by the facilitator. Connector recruitment for Phase 2 is underway.' },
      { type: 'h2', text: 'How It Started' },
      { type: 'p', text: 'Russia Phase 1 was initiated through a connector in Moscow who identified a community hub in the Presnensky district willing to host weekly sessions. The facilitator, trained remotely through DOWNFLOW\'s 48-hour certification programme, delivered the first session of the Leadership Foundations pack.' },
      { type: 'p', text: 'A session health score of 70 in Week 1 is within the expected range for a first session. The platform benchmarks suggest new cells typically reach 80+ by Session 3 as the facilitator and students establish rhythm.' },
      { type: 'h2', text: 'What\'s Next' },
      { type: 'p', text: 'A second Moscow cell (RU-02) is in formation. A Saint Petersburg connector has submitted an activation application. Phase 2 is expected to launch Q3 2026 with 3 active cells across 2 Russian cities.' },
    ],
    relatedIds: ['50-students-milestone', 'globalEd-germany-partner'],
  },
  'content-engine-47': {
    id: 'content-engine-47',
    type: 'growth',
    typeColor: '#72d0ff',
    icon: '📈',
    title: 'Content Engine Reaches 47 Reusable Lessons',
    subtitle: 'Cell-produced content is now being reused at 4.6× per lesson.',
    date: '5 March 2026',
    region: '🌍 Global',
    readTime: '2 min read',
    body: [
      { type: 'lead', text: 'The DOWNFLOW Content Engine now holds 47 edited lesson clips and 24 reusable prompts sourced from live learning cells. Average reuse rate: 4.6 per lesson across the network.' },
      { type: 'h2', text: 'Why This Matters' },
      { type: 'p', text: 'Every session in every DOWNFLOW cell produces content: conversations, projects, exercises, and facilitated moments. The Content Engine captures and edits the most reusable of these into a shared library that all facilitators can draw from.' },
      { type: 'p', text: 'A reuse rate of 4.6× means that on average, each lesson clip has been used in more than 4 different cells. This creates compounding curriculum quality: the more cells run, the better the library becomes.' },
      { type: 'stats', items: [
        { val: '47', label: 'Edited lessons' },
        { val: '24', label: 'Reusable prompts' },
        { val: '4.6×', label: 'Avg reuse rate' },
        { val: '68', label: 'Total reuses' },
      ]},
    ],
    relatedIds: ['cell-vn01-season-1', '50-students-milestone'],
  },
  'coin-system-update': {
    id: 'coin-system-update',
    type: 'update',
    typeColor: '#ff9f5a',
    icon: '🔧',
    title: 'Coin System Update — Participation Bonus Added',
    subtitle: 'Students earn +5 coins for 3 consecutive sessions of consistent attendance.',
    date: '10 March 2026',
    region: '🌍 Global',
    readTime: '2 min read',
    body: [
      { type: 'lead', text: 'A new participation bonus has been added to the coin system. Students now earn +5 coins for consistent attendance across 3 consecutive sessions. The system calculates this automatically at the end of each week.' },
      { type: 'h2', text: 'Why This Change Was Made' },
      { type: 'p', text: 'Facilitator feedback from 4 cells indicated that the existing coin system rewarded output heavily but did not sufficiently acknowledge consistent presence. Attendance is the foundation of the model — without it, nothing else compounds.' },
      { type: 'p', text: 'The 3-session streak bonus is designed to reward the behaviour that matters most in the early weeks of a new cohort, when the habit of showing up is still being built.' },
      { type: 'h2', text: 'How It Works' },
      { type: 'p', text: 'The platform automatically detects when a student has attended 3 consecutive sessions without a missed or late session. On the third session\'s completion, 5 bonus coins are added to their wallet. The streak resets on any absence.' },
      { type: 'p', text: 'This update is live across all cells immediately. Retroactive bonuses will not be applied to past sessions.' },
    ],
    relatedIds: ['content-engine-47', '50-students-milestone'],
  },
}

const TYPE_LABELS = {
  milestone: { label: 'Milestone', color: '#4de8b0' },
  sponsor:   { label: 'Sponsor',   color: '#d2ad44' },
  growth:    { label: 'Growth',    color: '#72d0ff' },
  expansion: { label: 'Expansion', color: '#b083ff' },
  update:    { label: 'Update',    color: '#ff9f5a' },
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'lead': return <p key={i} className="article-lead">{block.text}</p>
    case 'h2':   return <h2 key={i} className="article-h2">{block.text}</h2>
    case 'p':    return <p key={i} className="article-p">{block.text}</p>
    case 'quote': return <blockquote key={i} className="article-quote">{block.text}</blockquote>
    case 'stats': return (
      <div key={i} className="article-stats-row">
        {block.items.map(s => (
          <div key={s.label} className="article-stat">
            <span className="article-stat-val">{s.val}</span>
            <span className="article-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    )
    default: return null
  }
}

export default function NewsArticle() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = ARTICLES[slug]

  usePageMeta(
    article ? article.title : 'Article Not Found',
    article ? article.subtitle : ''
  )

  if (!article) {
    return (
      <div className="article-not-found">
        <h2>Article not found</h2>
        <p>This signal may have been removed or the URL is incorrect.</p>
        <Link to="/news" className="btn btn-primary">← Back to The Signal</Link>
      </div>
    )
  }

  const typeMeta = TYPE_LABELS[article.type]
  const related = (article.relatedIds || []).map(id => ARTICLES[id]).filter(Boolean)

  return (
    <div className="article-page">

      {/* ── BACK + META ── */}
      <div className="article-topbar">
        <button className="article-back-btn" onClick={() => navigate('/news')}>← The Signal</button>
        <div className="article-meta-row">
          <span className="news-type-badge" style={{ background: typeMeta.color + '22', color: typeMeta.color, borderColor: typeMeta.color + '44' }}>{typeMeta.label}</span>
          <span className="article-region">{article.region}</span>
          <span className="article-date">{article.date}</span>
          <span className="article-read-time">{article.readTime}</span>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="article-header">
        <div className="article-icon">{article.icon}</div>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-subtitle">{article.subtitle}</p>
      </header>

      {/* ── BODY ── */}
      <article className="article-body">
        {article.body.map((block, i) => renderBlock(block, i))}
      </article>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="article-related">
          <h3 className="article-related-title">Related Signals</h3>
          <div className="article-related-grid">
            {related.map(rel => (
              <Link key={rel.id} to={`/news/${rel.id}`} className="article-related-card">
                <span className="article-related-icon">{rel.icon}</span>
                <div>
                  <span className="article-related-type" style={{ color: TYPE_LABELS[rel.type].color }}>{TYPE_LABELS[rel.type].label}</span>
                  <h4>{rel.title}</h4>
                  <span className="article-related-date">{rel.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── NAV ── */}
      <div className="article-footer-nav">
        <Link to="/news" className="btn btn-secondary">← All Signals</Link>
        <Link to="/funding" className="btn btn-primary">Become a Sponsor →</Link>
      </div>

    </div>
  )
}
