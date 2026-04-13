import pptxgen from 'pptxgenjs'

const prs = new pptxgen()

// ── Theme ─────────────────────────────────────────────────────
const C = {
  bg:       '0F1B2D',
  card:     '152336',
  gold:     'D4A840',
  goldDark: 'E8C060',
  navy:     'E8EEF6',
  blue:     '5B9BD5',
  soft:     '8FA8C4',
  muted:    '5A7A9A',
  white:    'FFFFFF',
  dark:     '07101E',
}

prs.layout  = 'LAYOUT_WIDE'
prs.author  = 'DOWNFLOW — School of Life'
prs.company = 'DOWNFLOW'
prs.subject = 'Business Presentation 2026'
prs.title   = 'DOWNFLOW — School of Life'

// ── Helper: background + header bar ──────────────────────────
function addBg(slide, subtitle) {
  slide.background = { color: C.bg }
  // gold top bar
  slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: C.gold } })
  // left accent bar
  slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: 0.06, h: '100%', fill: { color: C.gold } })
  if (subtitle) {
    slide.addText(subtitle.toUpperCase(), {
      x: 0.35, y: 0.12, w: 12, h: 0.28,
      fontSize: 7, bold: true, color: C.muted,
      charSpacing: 3, fontFace: 'Helvetica',
    })
  }
}

function kicker(slide, text, y) {
  slide.addText(text.toUpperCase(), {
    x: 0.35, y, w: 12, h: 0.25,
    fontSize: 7.5, bold: true, color: C.gold,
    charSpacing: 3, fontFace: 'Helvetica',
  })
}

function heading(slide, text, y, size = 28) {
  slide.addText(text, {
    x: 0.35, y, w: 12, h: 0.75,
    fontSize: size, bold: true, color: C.navy,
    fontFace: 'Helvetica',
  })
}

function body(slide, text, y, w = 11.8, size = 11, color = C.soft) {
  slide.addText(text, {
    x: 0.35, y, w, h: 1.5,
    fontSize: size, color,
    fontFace: 'Helvetica', lineSpacingMultiple: 1.4,
  })
}

function card(slide, x, y, w, h, title, lines, accent = C.blue) {
  // card bg
  slide.addShape(prs.ShapeType.rect, { x, y, w, h, fill: { color: C.card }, line: { color: accent, width: 1.2 } })
  slide.addText(title, { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: 0.3, fontSize: 9.5, bold: true, color: C.navy, fontFace: 'Helvetica' })
  const content = lines.map(l => ({ text: l + '\n', options: { fontSize: 8.5, color: C.soft, fontFace: 'Helvetica' } }))
  slide.addText(content, { x: x + 0.15, y: y + 0.45, w: w - 0.3, h: h - 0.6, fontFace: 'Helvetica' })
}

function statBox(slide, x, y, value, label, accent = C.gold) {
  slide.addShape(prs.ShapeType.rect, { x, y, w: 2.8, h: 1.1, fill: { color: C.card }, line: { color: accent, width: 1 } })
  slide.addText(value, { x: x + 0.12, y: y + 0.1, w: 2.56, h: 0.55, fontSize: 26, bold: true, color: accent, fontFace: 'Helvetica' })
  slide.addText(label, { x: x + 0.12, y: y + 0.65, w: 2.56, h: 0.3, fontSize: 8, color: C.muted, fontFace: 'Helvetica' })
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — Cover
// ═══════════════════════════════════════════════════════════════
let sl = prs.addSlide()
sl.background = { color: C.bg }
sl.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: C.gold } })
sl.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: '100%', fill: { color: C.gold } })
sl.addShape(prs.ShapeType.rect, { x: 0, y: 6.9, w: '100%', h: 0.1, fill: { color: C.gold } })

sl.addText('DOWNFLOW', {
  x: 0.5, y: 1.2, w: 12, h: 1.1,
  fontSize: 60, bold: true, color: C.white,
  charSpacing: 4, fontFace: 'Helvetica',
})
sl.addText('SCHOOL OF LIFE', {
  x: 0.5, y: 2.3, w: 12, h: 0.5,
  fontSize: 20, bold: true, color: C.gold,
  charSpacing: 6, fontFace: 'Helvetica',
})
sl.addText('Investor & Partner Presentation  ·  2026', {
  x: 0.5, y: 3.0, w: 12, h: 0.35,
  fontSize: 11, color: C.soft, fontFace: 'Helvetica',
})

// Divider
sl.addShape(prs.ShapeType.rect, { x: 0.5, y: 3.55, w: 3, h: 0.04, fill: { color: C.gold } })

sl.addText([
  { text: 'Real learning cells. ', options: { fontSize: 12, color: C.navy, bold: true } },
  { text: 'Real facilitators. ', options: { fontSize: 12, color: C.blue } },
  { text: 'Real outcomes.', options: { fontSize: 12, color: C.gold } },
], { x: 0.5, y: 3.75, w: 9, h: 0.4, fontFace: 'Helvetica' })

sl.addText('Confidential · downflow.school', {
  x: 0.5, y: 5.8, w: 6, h: 0.25,
  fontSize: 7.5, color: C.muted, fontFace: 'Helvetica',
})

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — The Problem
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'The Problem')
kicker(sl, 'Why Now', 0.45)
heading(sl, 'Education is broken.\nStudents are disengaged.', 0.72, 24)

const problems = [
  ['📉 Passive Learning', 'Students sit, listen, forget. No real engagement, no retention, no application to real life.'],
  ['💸 High Cost, Low Impact', 'Families spend thousands on tutoring with no measurable outcome or accountability.'],
  ['🚫 No Life Skills', 'Schools teach subjects — not communication, confidence, or systems thinking.'],
  ['🌍 Geographic Inequality', 'Quality education is locked behind expensive schools in major cities.'],
]
problems.forEach(([title, desc], i) => {
  const col = i % 2
  const row = Math.floor(i / 2)
  card(sl, 0.35 + col * 6.3, 1.75 + row * 1.55, 5.9, 1.38, title, [desc], C.blue)
})

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — Our Solution
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Our Solution')
kicker(sl, 'The DOWNFLOW Model', 0.45)
heading(sl, 'Learning Cells — Structured.\nSponsor-funded. Life-changing.', 0.72, 22)

body(sl, 'DOWNFLOW organises children into small learning cells of 6–8 students. Each cell runs a structured 24-session curriculum, led by a certified facilitator, funded by a local sponsor. Students earn FLOW coins for participation, which unlock premium content and track real progress.', 1.6, 11.5, 10.5)

const solutions = [
  { icon: '🔬', title: '24-Session Curriculum', desc: 'Deep, structured, life-skills focused' },
  { icon: '👥', title: 'Small Cell Groups', desc: '6–8 students per cell for real engagement' },
  { icon: '🧑‍🏫', title: 'Certified Facilitators', desc: 'Earn $800+ per cell they run' },
  { icon: '💰', title: 'Sponsor-Funded', desc: '$200/mo per cell — transparent & direct' },
  { icon: '🪙', title: 'FLOW Coin Economy', desc: 'Participation-based reward system' },
  { icon: '📊', title: 'Full Transparency', desc: 'Real-time dashboards for all stakeholders' },
]
solutions.forEach((s, i) => {
  const col = i % 3
  const row = Math.floor(i / 3)
  sl.addShape(prs.ShapeType.rect, { x: 0.35 + col * 4.2, y: 3.1 + row * 1.2, w: 3.95, h: 1.08, fill: { color: C.card }, line: { color: C.gold, width: 0.8 } })
  sl.addText(s.icon + '  ' + s.title, { x: 0.5 + col * 4.2, y: 3.2 + row * 1.2, w: 3.7, h: 0.32, fontSize: 9.5, bold: true, color: C.navy, fontFace: 'Helvetica' })
  sl.addText(s.desc, { x: 0.5 + col * 4.2, y: 3.55 + row * 1.2, w: 3.7, h: 0.5, fontSize: 8, color: C.soft, fontFace: 'Helvetica' })
})

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — Traction & Metrics
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Traction')
kicker(sl, 'By The Numbers', 0.45)
heading(sl, 'Proven momentum.\nGrowing fast.', 0.72, 26)

const stats = [
  { v: '24', l: 'Active Cells' },
  { v: '120+', l: 'Students Enrolled' },
  { v: '18', l: 'Certified Facilitators' },
  { v: '91%', l: 'Session Completion Rate' },
]
stats.forEach((s, i) => statBox(sl, 0.35 + i * 3.1, 1.85, s.v, s.l, i % 2 === 0 ? C.gold : C.blue))

const metrics = [
  ['$2,400', 'Revenue per cell (annual)'],
  ['$800+', 'Facilitator earnings per cell'],
  ['6 weeks', 'Avg. time to first sponsor'],
  ['100%', 'Fund transparency rating'],
]
metrics.forEach((m, i) => {
  const x = 0.35 + i * 3.1
  sl.addShape(prs.ShapeType.rect, { x, y: 3.2, w: 2.8, h: 0.95, fill: { color: C.card }, line: { color: C.muted, width: 0.8 } })
  sl.addText(m[0], { x: x + 0.12, y: 3.28, w: 2.56, h: 0.42, fontSize: 20, bold: true, color: C.navy, fontFace: 'Helvetica' })
  sl.addText(m[1], { x: x + 0.12, y: 3.72, w: 2.56, h: 0.35, fontSize: 7.5, color: C.muted, fontFace: 'Helvetica' })
})

body(sl, '🚀  Pipeline: 40 cells in qualification  ·  12 new facilitators in training  ·  3 corporate sponsors in final negotiation', 4.35, 11.5, 9.5, C.soft)

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — Business Model
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Business Model')
kicker(sl, 'Revenue Model', 0.45)
heading(sl, 'Three revenue streams.\nAll aligned with impact.', 0.72, 24)

const streams = [
  { title: '💰 Cell Sponsorship', color: C.gold, lines: ['$200/month per cell', '$2,400 per annual cell', 'Corporate & individual sponsors', 'Full brand placement + reports'] },
  { title: '🧑‍🏫 Facilitator Platform Fee', color: C.blue, lines: ['10% platform fee on earnings', 'Facilitators earn $800+ per cell', 'Scale: 3 cells = $2,400+/cycle', 'Low churn — skill-based income'] },
  { title: '📚 Content & Premium Packs', color: C.soft, lines: ['FLOW coin content unlocks', 'Premium curriculum modules', 'Organisation licensing', 'B2B school partnerships'] },
]
streams.forEach((s, i) => {
  card(sl, 0.35 + i * 4.2, 1.7, 3.95, 2.8, s.title, s.lines, s.color)
})

sl.addShape(prs.ShapeType.rect, { x: 0.35, y: 4.75, w: 12.2, h: 0.9, fill: { color: C.card }, line: { color: C.gold, width: 1 } })
sl.addText('Unit Economics  ·  Per Cell', { x: 0.55, y: 4.82, w: 4, h: 0.25, fontSize: 8, bold: true, color: C.gold, fontFace: 'Helvetica' })
sl.addText('Revenue: $2,400  ·  Facilitator: $960  ·  Platform: $240  ·  Net Margin: ~60%  ·  Payback: Immediate', { x: 0.55, y: 5.1, w: 11.8, h: 0.3, fontSize: 9, color: C.navy, fontFace: 'Helvetica' })

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — Market Opportunity
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Market Opportunity')
kicker(sl, 'TAM · SAM · SOM', 0.45)
heading(sl, 'A $6T global education\nmarket. We own the cell.', 0.72, 24)

const markets = [
  { label: 'TAM', value: '$6.3T', desc: 'Global education market', color: C.muted, w: 3.8 },
  { label: 'SAM', value: '$180B', desc: 'Alternative & enrichment learning', color: C.blue, w: 3.4 },
  { label: 'SOM', value: '$2.4B', desc: 'SEA sponsored micro-cell model', color: C.gold, w: 3.0 },
]
markets.forEach((m, i) => {
  sl.addShape(prs.ShapeType.rect, { x: 0.35 + i * 4.1, y: 1.7, w: m.w, h: 3.2, fill: { color: C.card }, line: { color: m.color, width: 1.5 } })
  sl.addText(m.label, { x: 0.55 + i * 4.1, y: 1.85, w: m.w - 0.3, h: 0.35, fontSize: 10, bold: true, color: m.color, charSpacing: 2, fontFace: 'Helvetica' })
  sl.addText(m.value, { x: 0.55 + i * 4.1, y: 2.25, w: m.w - 0.3, h: 0.8, fontSize: 30, bold: true, color: C.white, fontFace: 'Helvetica' })
  sl.addText(m.desc, { x: 0.55 + i * 4.1, y: 3.1, w: m.w - 0.3, h: 0.5, fontSize: 8.5, color: C.soft, fontFace: 'Helvetica', lineSpacingMultiple: 1.4 })
})

body(sl, '🎯  Initial focus: Vietnam, Philippines, Indonesia — 320M+ school-age children, high smartphone penetration, growing middle-class sponsor base.', 5.1, 11.5, 9.5, C.soft)

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — Go-To-Market
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Go-To-Market')
kicker(sl, 'Growth Strategy', 0.45)
heading(sl, 'Community-first growth.\nEvery cell recruits the next.', 0.72, 24)

const gtm = [
  { phase: 'Phase 1\nQ1–Q2 2026', title: 'Cell Seeding', items: ['10 flagship cells in VN', 'Direct facilitator recruitment', 'Local sponsor onboarding', 'Video proof-of-concept'] },
  { phase: 'Phase 2\nQ3–Q4 2026', title: 'Platform Flywheel', items: ['Open facilitator marketplace', 'Auto-funnel for sponsors', 'Referral programme launch', 'Cell-to-cell network effects'] },
  { phase: 'Phase 3\n2027', title: 'Regional Scale', items: ['PH + ID market entry', 'B2B school licensing', 'Corporate CSR packages', 'FLOW coin exchange launch'] },
]
gtm.forEach((g, i) => {
  sl.addShape(prs.ShapeType.rect, { x: 0.35 + i * 4.2, y: 1.6, w: 3.95, h: 4.2, fill: { color: C.card }, line: { color: i === 0 ? C.gold : i === 1 ? C.blue : C.soft, width: 1.2 } })
  sl.addText(g.phase, { x: 0.5 + i * 4.2, y: 1.7, w: 3.6, h: 0.5, fontSize: 7.5, bold: true, color: i === 0 ? C.gold : i === 1 ? C.blue : C.soft, fontFace: 'Helvetica', lineSpacingMultiple: 1.3 })
  sl.addText(g.title, { x: 0.5 + i * 4.2, y: 2.22, w: 3.6, h: 0.35, fontSize: 11, bold: true, color: C.navy, fontFace: 'Helvetica' })
  g.items.forEach((item, j) => {
    sl.addText('→  ' + item, { x: 0.5 + i * 4.2, y: 2.7 + j * 0.52, w: 3.6, h: 0.42, fontSize: 8.5, color: C.soft, fontFace: 'Helvetica' })
  })
})

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — Team
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Team')
kicker(sl, 'The People Behind DOWNFLOW', 0.45)
heading(sl, 'Operators. Educators.\nBuilders.', 0.72, 26)

const team = [
  { init: 'AD', name: 'Alex D.', role: 'CEO & Co-founder', bio: 'Education innovator with 12+ years in curriculum design. Built and scaled 3 learning programmes across SEA.' },
  { init: 'SL', name: 'Sam L.', role: 'CTO & Co-founder', bio: 'Full-stack product engineer. Former edtech CTO. Built platforms serving 500k+ users.' },
  { init: 'MC', name: 'Maya C.', role: 'Head of Facilitators', bio: 'Former school principal. Designed the DOWNFLOW certification pathway and facilitator earning model.' },
  { init: 'JR', name: 'James R.', role: 'Head of Partnerships', bio: '10 years in corporate CSR. Closed $2M+ in sponsor agreements across Vietnam and Philippines.' },
]
team.forEach((t, i) => {
  const col = i % 2
  const row = Math.floor(i / 2)
  const x = 0.35 + col * 6.3
  const y = 1.65 + row * 2.0
  sl.addShape(prs.ShapeType.rect, { x, y, w: 5.9, h: 1.75, fill: { color: C.card }, line: { color: C.border || C.muted, width: 0.8 } })
  // avatar circle
  sl.addShape(prs.ShapeType.ellipse, { x: x + 0.15, y: y + 0.3, w: 0.85, h: 0.85, fill: { color: C.gold } })
  sl.addText(t.init, { x: x + 0.15, y: y + 0.44, w: 0.85, h: 0.42, fontSize: 11, bold: true, color: C.bg, align: 'center', fontFace: 'Helvetica' })
  sl.addText(t.name, { x: x + 1.1, y: y + 0.2, w: 4.6, h: 0.3, fontSize: 11, bold: true, color: C.navy, fontFace: 'Helvetica' })
  sl.addText(t.role, { x: x + 1.1, y: y + 0.52, w: 4.6, h: 0.25, fontSize: 8.5, color: C.gold, fontFace: 'Helvetica' })
  sl.addText(t.bio, { x: x + 1.1, y: y + 0.82, w: 4.55, h: 0.7, fontSize: 7.8, color: C.soft, fontFace: 'Helvetica', lineSpacingMultiple: 1.35 })
})

// ═══════════════════════════════════════════════════════════════
// SLIDE 9 — The Ask
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
addBg(sl, 'Investment Ask')
kicker(sl, 'The Opportunity', 0.45)
heading(sl, 'Raising $500K Seed Round\nto scale the cell network.', 0.72, 24)

const uses = [
  { pct: '40%', label: 'Technology & Platform', desc: 'Mobile app, AI assistant, payments, coin economy' },
  { pct: '30%', label: 'Facilitator Growth', desc: 'Training, certification, onboarding pipeline' },
  { pct: '20%', label: 'Market Expansion', desc: 'Philippines and Indonesia entry' },
  { pct: '10%', label: 'Operations & Legal', desc: 'Entity setup, compliance, team' },
]
uses.forEach((u, i) => {
  sl.addShape(prs.ShapeType.rect, { x: 0.35 + i * 3.1, y: 1.8, w: 2.85, h: 2.6, fill: { color: C.card }, line: { color: C.gold, width: 0.8 } })
  sl.addText(u.pct, { x: 0.45 + i * 3.1, y: 1.92, w: 2.6, h: 0.7, fontSize: 28, bold: true, color: C.gold, fontFace: 'Helvetica' })
  sl.addText(u.label, { x: 0.45 + i * 3.1, y: 2.65, w: 2.6, h: 0.4, fontSize: 9, bold: true, color: C.navy, fontFace: 'Helvetica', lineSpacingMultiple: 1.3 })
  sl.addText(u.desc, { x: 0.45 + i * 3.1, y: 3.08, w: 2.6, h: 0.85, fontSize: 7.8, color: C.soft, fontFace: 'Helvetica', lineSpacingMultiple: 1.35 })
})

sl.addShape(prs.ShapeType.rect, { x: 0.35, y: 4.6, w: 12.2, h: 1.0, fill: { color: C.card }, line: { color: C.gold, width: 1.2 } })
sl.addText('What we achieve with $500K:', { x: 0.55, y: 4.68, w: 5, h: 0.28, fontSize: 8.5, bold: true, color: C.gold, fontFace: 'Helvetica' })
sl.addText('100 active cells  ·  800 students  ·  60+ facilitators  ·  $240K ARR  ·  Series A ready by Q4 2027', { x: 0.55, y: 4.95, w: 11.5, h: 0.3, fontSize: 9.5, color: C.navy, fontFace: 'Helvetica' })

// ═══════════════════════════════════════════════════════════════
// SLIDE 10 — Closing
// ═══════════════════════════════════════════════════════════════
sl = prs.addSlide()
sl.background = { color: C.bg }
sl.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: C.gold } })
sl.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: '100%', fill: { color: C.gold } })
sl.addShape(prs.ShapeType.rect, { x: 0, y: 6.9, w: '100%', h: 0.1, fill: { color: C.gold } })

sl.addText('Join the movement.', {
  x: 0.5, y: 1.3, w: 12, h: 0.9,
  fontSize: 36, bold: true, color: C.white, fontFace: 'Helvetica',
})
sl.addText('Every child deserves a cell.', {
  x: 0.5, y: 2.2, w: 12, h: 0.6,
  fontSize: 22, bold: true, color: C.gold, fontFace: 'Helvetica',
})

sl.addShape(prs.ShapeType.rect, { x: 0.5, y: 3.0, w: 3, h: 0.04, fill: { color: C.gold } })

sl.addText([
  { text: 'hello@downflow.school', options: { fontSize: 12, color: C.blue } },
  { text: '  ·  ', options: { fontSize: 12, color: C.muted } },
  { text: 'downflow.school', options: { fontSize: 12, color: C.navy } },
], { x: 0.5, y: 3.2, w: 9, h: 0.4, fontFace: 'Helvetica' })

sl.addText('DOWNFLOW — School of Life  ·  Confidential 2026', {
  x: 0.5, y: 5.9, w: 8, h: 0.25,
  fontSize: 7.5, color: C.muted, fontFace: 'Helvetica',
})

// ── Write file ────────────────────────────────────────────────
await prs.writeFile({ fileName: 'public/DOWNFLOW-Presentation-2026.pptx' })
console.log('✅  PPTX created: public/DOWNFLOW-Presentation-2026.pptx')
