import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, ShadingType, PageBreak, NumberFormat,
  convertInchesToTwip, SectionType, UnderlineType,
} from 'docx'
import { writeFileSync } from 'fs'

// ── Helpers ───────────────────────────────────────────────────
const GOLD  = 'D4A840'
const NAVY  = '0F1B2D'
const BLUE  = '1E3A5F'
const GRAY  = '444444'
const LGRAY = '888888'
const WHITE = 'FFFFFF'

const h1 = (text) => new Paragraph({
  text,
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 400, after: 200 },
  run: { bold: true, size: 44, color: NAVY, font: 'Calibri' },
  border: { bottom: { style: BorderStyle.THICK, size: 6, color: GOLD, space: 4 } },
})

const h2 = (text) => new Paragraph({
  text,
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 360, after: 160 },
  run: { bold: true, size: 32, color: NAVY, font: 'Calibri' },
})

const h3 = (text) => new Paragraph({
  text,
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 240, after: 120 },
  run: { bold: true, size: 26, color: BLUE, font: 'Calibri' },
})

const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({
    text,
    size: 22,
    color: GRAY,
    font: 'Calibri',
    ...opts,
  })],
  spacing: { after: 160 },
  alignment: AlignmentType.JUSTIFIED,
})

const bold = (text, color = NAVY) => new TextRun({ text, bold: true, size: 22, color, font: 'Calibri' })
const run  = (text, color = GRAY) => new TextRun({ text, size: 22, color, font: 'Calibri' })

const bullet = (text) => new Paragraph({
  children: [new TextRun({ text, size: 22, color: GRAY, font: 'Calibri' })],
  bullet: { level: 0 },
  spacing: { after: 100 },
})

const subbullet = (text) => new Paragraph({
  children: [new TextRun({ text, size: 20, color: LGRAY, font: 'Calibri' })],
  bullet: { level: 1 },
  spacing: { after: 80 },
})

const divider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD', space: 4 } },
  spacing: { before: 200, after: 200 },
  text: '',
})

const pageBreak = () => new Paragraph({ children: [new PageBreak()] })

const highlight = (label, value) => new Paragraph({
  children: [
    bold(label + ':  ', GOLD),
    run(value),
  ],
  spacing: { after: 140 },
})

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map((text, i) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({
          text: String(text),
          bold: isHeader,
          size: isHeader ? 20 : 19,
          color: isHeader ? WHITE : GRAY,
          font: 'Calibri',
        })],
        alignment: i > 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
      })],
      shading: isHeader ? { type: ShadingType.SOLID, color: NAVY } : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
    }))
  })
}

function makeTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tableRow(headers, true),
      ...rows.map(r => tableRow(r)),
    ],
    borders: {
      top:           { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD' },
      bottom:        { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD' },
      left:          { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD' },
      right:         { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD' },
      insideH:       { style: BorderStyle.SINGLE, size: 1, color: 'EEEEEE' },
      insideV:       { style: BorderStyle.SINGLE, size: 1, color: 'EEEEEE' },
    },
  })
}

const sp = (n = 160) => new Paragraph({ text: '', spacing: { after: n } })

// ═══════════════════════════════════════════════════════════════
// DOCUMENT
// ═══════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [
        { level: 0, format: NumberFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) } } } },
        { level: 1, format: NumberFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.15) } } } },
      ],
    }],
  },
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22, color: GRAY },
        paragraph: { spacing: { after: 160 } },
      },
    },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', run: { font: 'Calibri', size: 44, bold: true, color: NAVY }, paragraph: { spacing: { before: 400, after: 200 } } },
      { id: 'Heading2', name: 'Heading 2', run: { font: 'Calibri', size: 32, bold: true, color: NAVY }, paragraph: { spacing: { before: 360, after: 160 } } },
      { id: 'Heading3', name: 'Heading 3', run: { font: 'Calibri', size: 26, bold: true, color: BLUE }, paragraph: { spacing: { before: 240, after: 120 } } },
    ],
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
      },
    },
    children: [

      // ══ COVER PAGE ══════════════════════════════════════════
      new Paragraph({
        children: [new TextRun({ text: 'DOWNFLOW', bold: true, size: 80, color: NAVY, font: 'Calibri' })],
        alignment: AlignmentType.LEFT,
        spacing: { before: 600, after: 120 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'SCHOOL OF LIFE', bold: true, size: 36, color: GOLD, font: 'Calibri', characterSpacing: 80 })],
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'BUSINESS PLAN  2026', bold: true, size: 26, color: LGRAY, font: 'Calibri', characterSpacing: 40 })],
        spacing: { after: 400 },
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.THICK, size: 8, color: GOLD } },
        spacing: { after: 400 },
        text: '',
      }),
      p('DOWNFLOW — School of Life is a sponsor-funded micro-learning platform that organises children into structured cells of 6–8 students, led by certified facilitators, delivering a 24-session life-skills curriculum. This business plan covers the company overview, market opportunity, operational model, financial projections, and growth strategy through 2028.'),
      sp(80),
      new Paragraph({ children: [bold('Prepared by:  '), run('DOWNFLOW Leadership Team')], spacing: { after: 80 } }),
      new Paragraph({ children: [bold('Date:  '), run('April 2026')], spacing: { after: 80 } }),
      new Paragraph({ children: [bold('Classification:  '), run('Confidential — Not for Distribution')], spacing: { after: 80 } }),
      new Paragraph({ children: [bold('Contact:  '), run('hello@downflow.school  ·  downflow.school')], spacing: { after: 80 } }),

      pageBreak(),

      // ══ TABLE OF CONTENTS ═══════════════════════════════════
      h1('Table of Contents'),
      ...[ '1.  Executive Summary', '2.  Company Overview', '3.  Problem Statement', '4.  Our Solution — The DOWNFLOW Model', '5.  Products & Services', '6.  Market Opportunity', '7.  Competitive Landscape', '8.  Business Model & Revenue Streams', '9.  Go-To-Market Strategy', '10. Operational Plan', '11. Financial Projections', '12. Team', '13. Funding Ask & Use of Funds', '14. Risks & Mitigation', '15. Appendix — Curriculum Overview',
      ].map(line => new Paragraph({ children: [new TextRun({ text: line, size: 22, color: GRAY, font: 'Calibri' })], spacing: { after: 100 } })),

      pageBreak(),

      // ══ 1. EXECUTIVE SUMMARY ════════════════════════════════
      h1('1.  Executive Summary'),
      p('DOWNFLOW is an education technology platform built around one powerful idea: learning happens best in small, structured, sponsor-funded cells. We organise children (ages 8–18) into cohorts of 6–8 students, pair them with certified facilitators, and deliver a 24-session curriculum that builds the life skills schools forget — communication, confidence, systems thinking, and self-awareness.'),
      p('Unlike traditional tutoring or EdTech platforms that sell passive content, DOWNFLOW creates active learning environments with a transparent, participatory economy. Students earn FLOW coins for genuine engagement. Facilitators earn real income — $800+ per cell. Sponsors receive verified impact data, brand placement, and social return.'),
      sp(80),
      h3('Key Highlights'),
      highlight('Active Cells',       '24 cells currently running across Vietnam'),
      highlight('Students Enrolled',  '120+ active learners'),
      highlight('Facilitators',       '18 certified, 12 in training'),
      highlight('Completion Rate',    '91% session completion — industry-leading'),
      highlight('Revenue per Cell',   '$2,400/year — fully sponsor-funded'),
      highlight('Seed Ask',           '$500,000 to scale to 100 cells by Q4 2026'),
      sp(80),
      p('DOWNFLOW is raising a $500,000 seed round to accelerate facilitator training, expand the technology platform, and enter two new markets (Philippines and Indonesia) by Q3 2027.'),

      pageBreak(),

      // ══ 2. COMPANY OVERVIEW ═════════════════════════════════
      h1('2.  Company Overview'),
      makeTable(
        ['Field', 'Detail'],
        [
          ['Company Name', 'DOWNFLOW — School of Life'],
          ['Legal Structure', 'Private Limited Company'],
          ['Founded', '2024'],
          ['Headquarters', 'Ho Chi Minh City, Vietnam'],
          ['Operating Markets', 'Vietnam (primary), Philippines (Q3 2027), Indonesia (Q4 2027)'],
          ['Website', 'downflow.school'],
          ['Stage', 'Seed — Post-Revenue'],
          ['Team Size', '8 full-time, 18 facilitators (contractors)'],
        ]
      ),
      sp(),
      h3('Mission'),
      p('To give every child access to a structured, community-supported learning cell that builds the life skills they need to thrive — regardless of where they live or what they can afford.'),
      h3('Vision'),
      p('A world where every neighbourhood has an active DOWNFLOW cell. Where local facilitators earn a living teaching what matters. Where sponsors see real impact from every dollar they invest.'),
      h3('Core Values'),
      bullet('Radical Transparency — every coin, every session, every metric is visible'),
      bullet('Earned Progression — nothing is given; everything is earned through participation'),
      bullet('Community First — cells exist because communities care about their children'),
      bullet('Sustainable Impact — every stakeholder (students, facilitators, sponsors) benefits'),

      pageBreak(),

      // ══ 3. PROBLEM STATEMENT ════════════════════════════════
      h1('3.  Problem Statement'),
      p('Despite billions spent on education technology, the fundamental problems of engagement, relevance, and access remain unsolved:'),
      sp(80),
      h3('Problem 1 — Passive Learning Dominates'),
      p('The dominant model of schooling — lecture, test, repeat — produces students who can recall facts but cannot communicate, think independently, or navigate real-world complexity. Research consistently shows that passive learning retains less than 10% after 48 hours. Yet schools continue to scale exactly this model.'),
      h3('Problem 2 — Life Skills Are Absent'),
      p('Employers, parents, and students themselves consistently identify the same gap: children lack communication ability, emotional regulation, confidence, and practical problem-solving skills. These are not taught in mainstream curricula. The result: technically literate but practically unprepared graduates.'),
      h3('Problem 3 — Existing Solutions Are Expensive and Inaccessible'),
      p('Quality after-school enrichment — tutoring centres, international schools, private programmes — costs $200–$800+ per month and is concentrated in major cities. Families in secondary cities and rural areas are locked out entirely. EdTech apps offer cheaper alternatives but deliver passive content with no accountability or community.'),
      h3('Problem 4 — Sponsors Want Accountability, Not Charity'),
      p('CSR budgets are growing, but corporate sponsors are increasingly demanding evidence of impact. Traditional charitable education donations provide no feedback loop, no performance data, and no way to measure social return on investment. Sponsors disengage.'),

      pageBreak(),

      // ══ 4. THE DOWNFLOW MODEL ═══════════════════════════════
      h1('4.  Our Solution — The DOWNFLOW Model'),
      p('DOWNFLOW solves all four problems simultaneously through the learning cell architecture:'),
      sp(80),
      h3('The Cell'),
      p('A learning cell is a cohort of 6–8 children who progress together through a structured 24-session curriculum. Sessions are live, facilitated, and interactive. No passive video watching. No automated grading. Real humans, real feedback, real progress.'),
      h3('The Facilitator'),
      p('Each cell is led by a DOWNFLOW-certified facilitator — a trained educator, coach, or community leader who delivers sessions, tracks progress, and mentors students. Facilitators earn $800+ per cell cycle (24 sessions × $33/session), making DOWNFLOW one of the highest-paying part-time education roles in the region.'),
      h3('The Sponsor'),
      p('Each cell is funded by a sponsor — a local business, corporate CSR programme, international NGO, or individual patron. At $200/month ($2,400/year), the sponsor funds the entire cell. In return, they receive weekly impact reports, performance dashboards, brand placement within the cell environment, and a spot on the DOWNFLOW sponsor leaderboard.'),
      h3('The FLOW Coin Economy'),
      p('Students earn FLOW coins by attending sessions, completing challenges, submitting exercises, and demonstrating progress. Coins unlock premium content packs, milestone badges, and leaderboard status. The economy creates genuine intrinsic motivation — not through gamification tricks, but through verified participation.'),
      h3('The Platform'),
      p('DOWNFLOW\'s technology platform connects all stakeholders. Students access their dashboard, progress tracking, and content. Facilitators manage sessions, attendance, and earnings. Sponsors see real-time cell performance and impact metrics. Administrators run the entire network from a single operations console.'),

      pageBreak(),

      // ══ 5. PRODUCTS & SERVICES ══════════════════════════════
      h1('5.  Products & Services'),
      h3('5.1  Core Curriculum Packs'),
      p('DOWNFLOW offers 10 structured learning packs, each comprising 5–6 video lessons, repeatable exercises, and micro-challenges:'),
      makeTable(
        ['Pack', 'Focus Area', 'Sessions', 'Coin Value'],
        [
          ['Pencil Proof',           'Thinking & Communication',    '6', '40 coins'],
          ['Kidinomics',             'Value & Contribution',        '5', '35 coins'],
          ['Self-Awareness',         'Insight & Reflection',        '5', '30 coins'],
          ['Water Confidence',       'Calm & Body Awareness',       '5', '30 coins'],
          ['Body Intelligence',      'Regulation & Presence',       '5', '30 coins'],
          ['Voice & Presence',       'Speaking & Expression',       '6', '40 coins'],
          ['Social Systems',         'Group Dynamics & Leadership', '5', '35 coins'],
          ['Systems Thinking',       'Cause, Effect & Growth',      '5', '35 coins'],
          ['Confidence Engineering', 'Building Brave Habits',       '5', '40 coins'],
          ['Life Skills',            'Practical Intelligence',      '5', '35 coins'],
        ]
      ),
      sp(),
      h3('5.2  Facilitator Platform'),
      bullet('Session management and scheduling tools'),
      bullet('Student progress tracking and facilitator notes'),
      bullet('Earnings wallet with withdrawal integration'),
      bullet('Certification pathway and professional development modules'),
      h3('5.3  Sponsor Dashboard'),
      bullet('Real-time cell performance metrics'),
      bullet('Weekly automated impact reports'),
      bullet('Brand placement and leaderboard visibility'),
      bullet('CSR reporting export for corporate governance'),
      h3('5.4  Parent Portal'),
      bullet('Live session progress and attendance'),
      bullet('Child milestone achievements and coin balance'),
      bullet('Facilitator notes and upcoming session schedule'),
      bullet('Direct communication with cell facilitator'),

      pageBreak(),

      // ══ 6. MARKET OPPORTUNITY ═══════════════════════════════
      h1('6.  Market Opportunity'),
      h3('Total Addressable Market (TAM)'),
      p('The global K-12 education market is valued at $6.3 trillion and growing at 4.2% CAGR. The afterschool and enrichment segment alone accounts for $180 billion annually, with Southeast Asia representing $28 billion of that total.'),
      h3('Serviceable Addressable Market (SAM)'),
      p('DOWNFLOW targets the sponsored micro-learning segment in emerging markets. In Vietnam, Philippines, and Indonesia combined, there are 320 million+ school-age children, 28% of families earning middle-class income, and $4.2B in active CSR education spend. Our SAM is estimated at $2.4B.'),
      h3('Serviceable Obtainable Market (SOM)'),
      p('With 100 cells at $2,400/year by end-2026, DOWNFLOW will generate $240K ARR. Our 3-year target of 1,000 cells represents $2.4M ARR and 0.1% SAM penetration — a conservative and achievable milestone.'),
      sp(80),
      makeTable(
        ['Market', 'Size', 'CAGR', 'DOWNFLOW Relevance'],
        [
          ['Global K-12',              '$6.3T',  '4.2%', 'Macro tailwind'],
          ['SEA After-School',         '$28B',   '8.1%', 'Direct market'],
          ['Corporate CSR Education',  '$4.2B',  '11.3%','Sponsor funding base'],
          ['SEA EdTech Platform',      '$11.6B', '16.8%','Platform opportunity'],
        ]
      ),

      pageBreak(),

      // ══ 7. COMPETITIVE LANDSCAPE ════════════════════════════
      h1('7.  Competitive Landscape'),
      makeTable(
        ['Competitor', 'Model', 'Weakness', 'DOWNFLOW Advantage'],
        [
          ['Tutoring Centres',      'In-person 1:1',        'High cost, no scale',             'Cell model: 8× more cost-efficient'],
          ['Coursera / Udemy',      'Online video courses', 'Passive, no accountability',       'Live facilitation + real metrics'],
          ['Byju\'s / SnapLearn',   'App-based learning',   'No community, high churn',         'Cell cohesion + coin economy'],
          ['IRL Programmes',        'Camp/enrichment',      'One-off, expensive, limited reach','Ongoing 24-session structure'],
          ['NGO Education',         'Grant-funded delivery','No accountability to sponsors',     '100% transparent impact dashboard'],
        ]
      ),
      sp(),
      h3('Our Moat'),
      bullet('Network effects — each cell recruits the next through community word-of-mouth'),
      bullet('Facilitator loyalty — real income creates retention; retraining cost prevents switching'),
      bullet('Sponsor lock-in — impact dashboards and brand placement create multi-year commitments'),
      bullet('Curriculum IP — proprietary 24-session structure and FLOW coin economy'),
      bullet('Community trust — cells embedded in neighbourhoods, not delivered from outside'),

      pageBreak(),

      // ══ 8. BUSINESS MODEL ═══════════════════════════════════
      h1('8.  Business Model & Revenue Streams'),
      h3('Revenue Stream 1 — Cell Sponsorship'),
      p('Primary revenue. Sponsors pay $200/month ($2,400/year) to fund a single cell of 6–8 students. DOWNFLOW retains 10% as a platform fee ($240/year). The remaining 90% covers facilitator earnings ($960/year) and curriculum delivery costs.'),
      h3('Revenue Stream 2 — Facilitator Platform Fee'),
      p('Facilitators pay a 10% platform fee on their earnings. A facilitator running 3 cells earns $2,400 per cycle; DOWNFLOW receives $240. As the network scales to 100+ facilitators, this stream becomes significant.'),
      h3('Revenue Stream 3 — Premium Content & Licensing'),
      p('Schools, community organisations, and corporate training departments can license DOWNFLOW curriculum packs. Starting at $5,000/year for institutional licences, this stream scales without additional operational overhead.'),
      sp(80),
      makeTable(
        ['Metric', 'Per Cell (Year 1)', 'At 100 Cells', 'At 500 Cells'],
        [
          ['Gross Revenue',            '$2,400',   '$240,000',   '$1,200,000'],
          ['Platform Fee (10%)',        '$240',     '$24,000',    '$120,000'],
          ['Facilitator Earnings',      '$960',     '$96,000',    '$480,000'],
          ['Content & Delivery',        '$400',     '$40,000',    '$200,000'],
          ['Net to Platform',           '$1,040',   '$104,000',   '$520,000'],
          ['Platform Net Margin',       '~43%',     '~43%',       '~55%+'],
        ]
      ),

      pageBreak(),

      // ══ 9. GO-TO-MARKET ═════════════════════════════════════
      h1('9.  Go-To-Market Strategy'),
      h3('Phase 1 — Cell Seeding (Q1–Q2 2026)'),
      bullet('Launch 10 flagship cells in Ho Chi Minh City and Hanoi'),
      bullet('Recruit and certify 15 facilitators through direct outreach and education networks'),
      bullet('Sign 10 anchor sponsors (SMEs and CSR budgets from 3 corporates)'),
      bullet('Document and publish impact data to build credibility'),
      subbullet('Target: 80 students, $24K ARR'),
      h3('Phase 2 — Platform Flywheel (Q3–Q4 2026)'),
      bullet('Launch public facilitator marketplace — open applications'),
      bullet('Activate auto-funnel for sponsor acquisition (content marketing + referral)'),
      bullet('Launch referral programme: existing sponsors earn credits for new introductions'),
      bullet('Cell-to-cell network effects: each graduating cohort seeds 2 new cells'),
      subbullet('Target: 100 cells, 800 students, $240K ARR'),
      h3('Phase 3 — Regional Scale (2027)'),
      bullet('Philippines market entry: 20 seed cells in Metro Manila'),
      bullet('Indonesia market entry: 15 seed cells in Jakarta and Surabaya'),
      bullet('B2B school licensing product launch'),
      bullet('Corporate CSR package standardisation and marketing'),
      subbullet('Target: 500 cells, 4,000 students, $1.2M ARR'),

      pageBreak(),

      // ══ 10. OPERATIONAL PLAN ════════════════════════════════
      h1('10.  Operational Plan'),
      h3('Facilitator Recruitment & Certification'),
      p('DOWNFLOW maintains a rigorous facilitator pipeline: recruitment → 2-week certification training → trial cell → full certification. Facilitators are independent contractors, responsible for session delivery, student engagement, and progress reporting. DOWNFLOW provides the platform, curriculum, sponsor relationships, and payment processing.'),
      h3('Cell Management'),
      p('Each cell follows a standardised lifecycle: sponsor matching → facilitator assignment → student enrolment → 24-session delivery → graduation → renewal/succession. Cells operate on a rolling basis; there is no seasonal dependency.'),
      h3('Quality Assurance'),
      bullet('Session completion rate monitored in real-time (target: >85%)'),
      bullet('Student progress tracked through FLOW coin earnings and milestone completion'),
      bullet('Facilitator performance rated by students and measured against KPIs'),
      bullet('Sponsor impact reports auto-generated weekly'),
      h3('Technology Infrastructure'),
      bullet('React/Vite web platform with Firebase backend'),
      bullet('Mobile-first design for facilitator and student access'),
      bullet('EmailJS for automated communication workflows'),
      bullet('Real-time dashboard updates via Firebase Realtime Database'),

      pageBreak(),

      // ══ 11. FINANCIAL PROJECTIONS ════════════════════════════
      h1('11.  Financial Projections'),
      h3('Revenue Forecast'),
      makeTable(
        ['Metric', '2026 (Year 1)', '2027 (Year 2)', '2028 (Year 3)'],
        [
          ['Active Cells',        '100',      '350',        '1,000'],
          ['Students',            '800',      '2,800',      '8,000'],
          ['Facilitators',        '65',       '200',        '550'],
          ['Gross Revenue',       '$240K',    '$840K',      '$2.4M'],
          ['Platform Net Revenue','$104K',    '$400K',      '$1.3M'],
          ['Operating Costs',     '$280K',    '$520K',      '$900K'],
          ['EBITDA',              '-$176K',   '-$120K',     '+$400K'],
          ['EBITDA Margin',       '-73%',     '-14%',       '+17%'],
        ]
      ),
      sp(),
      h3('Cost Structure (Year 1 — Post-Raise)'),
      makeTable(
        ['Category', 'Annual Cost', '% of Budget'],
        [
          ['Technology & Platform Development', '$112,000',  '40%'],
          ['Facilitator Training & Onboarding',  '$84,000',  '30%'],
          ['Marketing & Sponsor Acquisition',    '$42,000',  '15%'],
          ['Operations & Legal',                 '$28,000',  '10%'],
          ['Contingency',                        '$14,000',   '5%'],
          ['Total',                              '$280,000', '100%'],
        ]
      ),
      sp(),
      h3('Path to Profitability'),
      p('DOWNFLOW reaches contribution-margin positive at 60 cells. With 100 cells by Q4 2026, the platform generates sufficient platform fee revenue to cover operating costs. Full EBITDA profitability is projected at Q2 2028 with 650+ active cells.'),

      pageBreak(),

      // ══ 12. TEAM ════════════════════════════════════════════
      h1('12.  Team'),
      h3('Alex D. — CEO & Co-founder'),
      p('Education innovator with 12+ years designing and scaling learning programmes across Southeast Asia. Previously built and exited two EdTech products. Holds an MEd in Curriculum Design from University of Melbourne.'),
      h3('Sam L. — CTO & Co-founder'),
      p('Full-stack product engineer with 10 years building consumer platforms. Former CTO of a FinTech startup serving 500K+ users. Expert in React, Firebase, and mobile-first architecture.'),
      h3('Maya C. — Head of Facilitators'),
      p('Former secondary school principal with 15 years in education leadership. Designed the DOWNFLOW certification pathway and built the facilitator community from zero to 18 certified educators.'),
      h3('James R. — Head of Partnerships'),
      p('10 years in corporate CSR and social investment. Closed $2M+ in sponsor agreements across Vietnam and the Philippines. Specialist in impact reporting and ESG frameworks.'),
      sp(80),
      h3('Advisory Board'),
      bullet('Dr. Nguyen T.H. — Former Deputy Minister of Education, Vietnam'),
      bullet('Sarah K. — Partner, Southeast Asia Education Fund'),
      bullet('Marcus B. — Chief People Officer, Fortune 500 (CSR advisory)'),

      pageBreak(),

      // ══ 13. FUNDING ASK ═════════════════════════════════════
      h1('13.  Funding Ask & Use of Funds'),
      h3('Raising $500,000 Seed Round'),
      p('DOWNFLOW is raising a $500,000 seed round to execute Phase 1 and Phase 2 of the go-to-market strategy. The round will be structured as a SAFE note with a $3M valuation cap and 20% discount.'),
      sp(80),
      makeTable(
        ['Use of Funds', 'Amount', 'Percentage', 'Purpose'],
        [
          ['Technology & Platform', '$200,000', '40%', 'Mobile app, AI tools, payment integration, FLOW coin economy'],
          ['Facilitator Growth',    '$150,000', '30%', 'Training, certification, onboarding, community management'],
          ['Market Expansion',      '$100,000', '20%', 'Philippines and Indonesia entry, local partnerships'],
          ['Operations & Legal',    '$50,000',  '10%', 'Entity setup, compliance, team additions'],
        ]
      ),
      sp(),
      h3('Milestones Unlocked by This Round'),
      bullet('100 active cells by Q4 2026'),
      bullet('800 students enrolled and progressing'),
      bullet('60+ certified facilitators earning real income'),
      bullet('$240K ARR with 3-year contracts in place'),
      bullet('Series A raise at $8M+ valuation by Q4 2027'),

      pageBreak(),

      // ══ 14. RISKS & MITIGATION ══════════════════════════════
      h1('14.  Risks & Mitigation'),
      makeTable(
        ['Risk', 'Likelihood', 'Impact', 'Mitigation'],
        [
          ['Facilitator churn',          'Medium', 'High',   'Competitive earnings + community + professional development'],
          ['Sponsor acquisition slow',   'Medium', 'High',   'Auto-funnel + referral programme + anchor sponsor strategy'],
          ['Tech platform failure',      'Low',    'High',   'Firebase infrastructure + hot backup + ErrorBoundary system'],
          ['Curriculum quality decline', 'Low',    'Medium', 'QA metrics + real-time session monitoring + feedback loops'],
          ['Regulatory changes (EdTech)','Low',    'Medium', 'Local legal counsel + community-based model avoids most regs'],
          ['Economic downturn',          'Medium', 'Medium', 'Sponsor diversification + CSR mandates are counter-cyclical'],
        ]
      ),

      pageBreak(),

      // ══ 15. APPENDIX ════════════════════════════════════════
      h1('15.  Appendix — Curriculum Overview'),
      p('The DOWNFLOW 24-session curriculum is structured across four thematic modules, each spanning 6 sessions. The curriculum is designed for children aged 8–18 and is delivered by certified facilitators in live group sessions.'),
      sp(80),
      h3('Module 1 — Self & Awareness (Sessions 1–6)'),
      bullet('Session 1: Who Am I? — Identity without labels'),
      bullet('Session 2: How I Think — Cognitive styles and preferences'),
      bullet('Session 3: My Body Speaks — Body language and regulation'),
      bullet('Session 4: Emotions Are Data — Reading and naming emotional states'),
      bullet('Session 5: My Voice — Speaking with calm and intention'),
      bullet('Session 6: My Story — Narrative identity and reflection'),
      h3('Module 2 — Thinking & Problem-Solving (Sessions 7–12)'),
      bullet('Session 7: Systems Are Everywhere — Cause and effect'),
      bullet('Session 8: The Problem with Problems — Reframing challenges'),
      bullet('Session 9: Decisions Under Uncertainty — Good enough choices'),
      bullet('Session 10: Creative Thinking — Divergent and convergent modes'),
      bullet('Session 11: Pencil Proof Thinking — Reasoning without writing'),
      bullet('Session 12: Applied Intelligence — Real-world systems challenge'),
      h3('Module 3 — Communication & Presence (Sessions 13–18)'),
      bullet('Session 13: Listening First — Active listening mastery'),
      bullet('Session 14: Saying It Clearly — Structure and simplicity'),
      bullet('Session 15: Disagreeing Well — Conflict and constructive challenge'),
      bullet('Session 16: Group Dynamics — Reading a room and contributing'),
      bullet('Session 17: The Confidence Code — Performance without perfection'),
      bullet('Session 18: Public Presence — Speaking to groups with ease'),
      h3('Module 4 — Value & Contribution (Sessions 19–24)'),
      bullet('Session 19: What Is Value? — Contribution vs. consumption'),
      bullet('Session 20: Effort and Reward — The Kidinomics framework'),
      bullet('Session 21: Making a Difference — Local impact thinking'),
      bullet('Session 22: Working Together — Collaboration and generosity'),
      bullet('Session 23: My Contribution Plan — Personal action design'),
      bullet('Session 24: Graduation — Reflection, recognition, and next steps'),

      sp(200),
      divider(),
      new Paragraph({
        children: [
          new TextRun({ text: 'DOWNFLOW — School of Life  ·  Confidential Business Plan 2026  ·  ', size: 16, color: LGRAY, font: 'Calibri' }),
          new TextRun({ text: 'hello@downflow.school', size: 16, color: BLUE, font: 'Calibri' }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 160 },
      }),
    ],
  }],
})

const buffer = await Packer.toBuffer(doc)
writeFileSync('public/DOWNFLOW-Business-Plan-2026.docx', buffer)
console.log('✅  DOCX created: public/DOWNFLOW-Business-Plan-2026.docx')
