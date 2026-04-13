// ============================================================
// MarketingEngine — Full acquisition system for all 4 roles
// Strategies, scripts, content calendar, campaign tracker
// ============================================================
import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta.js'
import { useToast } from '../components/Toast.jsx'

// ── Data ─────────────────────────────────────────────────────

const ROLES = [
  { id: 'students',     label: 'Students',     icon: '🎓', color: '#5b9bd5', target: '500 students in 6 months' },
  { id: 'facilitators', label: 'Facilitators', icon: '🧭', color: '#4de8b0', target: '20 facilitators in 3 months' },
  { id: 'sponsors',     label: 'Sponsors',     icon: '💼', color: '#d4a840', target: '10 sponsors in 4 months' },
  { id: 'connectors',   label: 'Connectors',   icon: '🔗', color: '#b083ff', target: '15 connectors in 3 months' },
]

const STRATEGIES = {
  students: {
    headline: 'Acquire 500 students in 6 months',
    subhead: 'Target: parents of children aged 5–14 in Vietnam, Germany, Russia. The parent is the buyer. The child is the user.',
    channels: [
      {
        name: 'Facebook Parent Groups',
        effort: 'Low cost',
        speed: 'Fast',
        volume: 'High',
        score: 9,
        how: 'Join local parent Facebook groups in each target city. Post the Curriculum page link with a genuine message — not an ad. Be a parent talking to parents.',
        template: `Hey everyone 👋\n\nI wanted to share something I came across — it's called DOWNFLOW School of Life.\n\nIt's a small-group learning program for kids 5–14 that focuses on real-world skills (money, communication, health, creativity) — taught in tiny groups of 6 by a trained facilitator over 12 weeks.\n\nWhat's different: kids earn "coins" for real effort, not just attendance. My kid was engaged in a way school never managed.\n\nThey have cells starting in [CITY] — here's the link if you want to check it out: [URL]\n\nHappy to answer questions if you have them 🙂`,
      },
      {
        name: 'WhatsApp Parent Chains',
        effort: 'Zero cost',
        speed: 'Very fast',
        volume: 'Medium',
        score: 9,
        how: 'Every parent who joins gets a referral link. Ask them to forward it to 3 parents in their personal WhatsApp. One satisfied parent → 3 new leads. Compound effect.',
        template: `Hi [NAME],\n\nJust sharing something your kids might love — DOWNFLOW School of Life.\n\nSmall groups of 6 kids, 12 weeks, real-world skills. Very structured, very safe. My [son/daughter] just finished Week 3 and is obsessed.\n\nHere's a link: [REFERRAL_URL]\n\nNo pressure at all — just thought of you 😊`,
      },
      {
        name: 'School Entrance Marketing',
        effort: 'Low cost',
        speed: 'Medium',
        volume: 'Very high',
        score: 8,
        how: 'Post someone (a connector) outside school gates at pickup time with QR code cards. One A5 card per parent. Best time: Fridays 3–4pm. Focus on international schools first — parents already pay for extras.',
        template: null,
      },
      {
        name: 'YouTube / TikTok Short',
        effort: 'Medium',
        speed: 'Slow → Compounding',
        volume: 'Unlimited',
        score: 8,
        how: 'One 60-second video: show a real session moment. Excited child. Structured activity. Coin reward. No voiceover needed — just real footage. Post weekly. Algorithm does the rest.',
        template: null,
      },
      {
        name: 'Google Ads (Parent Search)',
        effort: 'Paid',
        speed: 'Immediate',
        volume: 'Controlled',
        score: 7,
        how: 'Target search terms: "after school program [city]", "kids activities [city]", "children\'s learning program [city]". Budget: $5–10/day per city. Send to /join page.',
        template: null,
      },
      {
        name: 'Community Events / Demos',
        effort: 'Medium',
        speed: 'Slow',
        volume: 'High quality',
        score: 7,
        how: 'Run a free 30-minute demo session in a community centre, park, or café. Invite 10 parents + their kids. Do the actual lesson structure. Let parents see it working in real time. Convert on the day.',
        template: null,
      },
    ],
    funnel: [
      { stage: 'Awareness', action: 'Parent sees post / ad / flyer', kpi: '1,000 impressions/week' },
      { stage: 'Interest', action: 'Clicks → /curriculum or /join page', kpi: '5% click-through rate' },
      { stage: 'Consideration', action: 'Signs up for more info or demo', kpi: '20% of visitors sign up' },
      { stage: 'Conversion', action: 'Child enrolled in a cell', kpi: '30% of sign-ups convert' },
      { stage: 'Retention', action: 'Attends 3+ sessions', kpi: '75% 3-week retention' },
      { stage: 'Referral', action: 'Parent shares with 3 friends', kpi: '1 referral per 5 students' },
    ],
    week1: [
      'Join 10 parent Facebook groups in target cities',
      'Post the parent template message in each group',
      'Set up WhatsApp Business profile with booking link',
      'Print 200 QR code cards for school gate outreach',
      'Film one 60-second real session clip (phone camera is fine)',
      'Post clip on TikTok, Instagram Reels, Facebook Reels',
    ],
  },
  facilitators: {
    headline: 'Recruit 20 trained facilitators in 3 months',
    subhead: 'Target: Recent graduates, teachers looking for side income, people aged 20–35 with energy and communication skills. A good communicator beats a qualified but boring teacher every time.',
    channels: [
      {
        name: 'University Notice Boards',
        effort: 'Zero cost',
        speed: 'Fast',
        volume: 'High',
        score: 9,
        how: 'Post flyers on university notice boards targeting Education, Psychology, Communications, and Business faculties. The offer: earn 35–45% of lesson revenue, flexible hours, build your own cell network. Frame it as a side business, not a job.',
        template: `EARN WHILE YOU TEACH\n\nDOWNFLOW School of Life is looking for facilitators.\n\nYou don't need a teaching degree.\nYou need: energy, structure, and genuine care for kids.\n\nWhat you get:\n→ 35–45% of lesson revenue per session\n→ Flexible schedule (evenings + weekends)\n→ Full training + materials provided\n→ Your own growing network of students\n\nApply: [URL/join?role=facilitator]\nQuestions: [EMAIL]`,
      },
      {
        name: 'LinkedIn Outreach',
        effort: 'Low',
        speed: 'Medium',
        volume: 'Medium',
        score: 8,
        how: 'Search LinkedIn for: "teacher", "tutor", "education", "childcare worker" in target cities. Send a personal connection request + short message. Not a job offer — frame it as a business opportunity.',
        template: `Hi [NAME],\n\nI came across your profile and thought you might be interested in something I'm building.\n\nDOWNFLOW is a structured learning network for kids — small groups of 6, 12-week cycles, real-world curriculum. We're looking for facilitators in [CITY].\n\nIt's not a teaching job — it's more like running your own small learning operation with full support. Earn 35–45% of revenue per session, your own schedule.\n\nWould you be open to a 15-minute call to hear more?\n\nBest,\n[YOUR NAME]`,
      },
      {
        name: 'Facebook Teacher Groups',
        effort: 'Zero cost',
        speed: 'Fast',
        volume: 'High',
        score: 8,
        how: 'Post in groups for teachers, tutors, educators in each target country. "We\'re looking for facilitators" + clear earning potential. Be specific about the numbers (432,000 VND per session in Vietnam = very attractive).',
        template: `Looking for facilitators in [CITY] 🧭\n\nDOWNFLOW School of Life is expanding and we need passionate, energetic people to run structured learning sessions for children aged 5–14.\n\nYou DON'T need a teaching certificate.\nYou DO need: good communication, reliability, and energy.\n\nEarnings: 432,000 VND per session (Phase 1) → up to 486,000 VND (Phase 3)\nSchedule: Flexible — evenings and weekends\nTraining: Full onboarding + all materials provided\n\nApply here: [URL]`,
      },
      {
        name: 'Referral from Existing Facilitators',
        effort: 'Zero cost',
        speed: 'Ongoing',
        volume: 'High quality',
        score: 10,
        how: 'Each existing facilitator who recruits a new facilitator unlocks Phase 3 (45% revenue share permanently). This is a strong incentive. Brief every facilitator on this in their Week 1. Make it feel like an honour, not a sales job.',
        template: null,
      },
      {
        name: 'Instagram Reels — "Day in the Life"',
        effort: 'Low',
        speed: 'Compounding',
        volume: 'High',
        score: 7,
        how: 'Post a "Day in the life of a DOWNFLOW facilitator" short video. Show: morning prep (5 min), the actual session (60 min), the earnings notification. Authentic, not polished. People relate to real.',
        template: null,
      },
    ],
    funnel: [
      { stage: 'Awareness', action: 'Sees flyer / post / referral', kpi: '50 leads per week' },
      { stage: 'Application', action: 'Submits application via /join', kpi: '20% of leads apply' },
      { stage: 'Demo Lesson', action: 'Runs a demo lesson with real students', kpi: '60% of applicants pass' },
      { stage: 'Training', action: 'Completes onboarding (6 steps)', kpi: '80% complete training' },
      { stage: 'First Cell', action: 'Assigned first live cell', kpi: 'Within 2 weeks of training' },
      { stage: 'Growth', action: 'Recruits another facilitator', kpi: '30% recruit within 90 days' },
    ],
    week1: [
      'Print 50 flyers and post on 5 university notice boards each',
      'Join 5 teacher/tutor Facebook groups in each target country',
      'Post the facilitator opportunity message in each group',
      'Search LinkedIn for 20 potential facilitators and send connection requests',
      'Brief all existing facilitators on the Phase 3 recruitment bonus',
      'Film a 60-second "what is a DOWNFLOW facilitator" explainer video',
    ],
  },
  sponsors: {
    headline: 'Secure 10 sponsors in 4 months',
    subhead: 'Target: Corporate CSR departments, education-focused NGOs, local business owners who care about community. The pitch: measurable impact, not charity.',
    channels: [
      {
        name: 'LinkedIn Corporate Outreach',
        effort: 'Low',
        speed: 'Medium',
        volume: 'Medium',
        score: 9,
        how: 'Target: CSR managers, HR directors, marketing directors at mid-size companies (50–500 employees) in target cities. Subject line is everything: "Real-time impact dashboard for your CSR budget". Not "please donate".',
        template: `Subject: Real-time impact dashboard for your CSR budget\n\nHi [NAME],\n\nMost CSR education programs are a black box — you donate, you get a report 12 months later, you hope it worked.\n\nDOWNFLOW is different.\n\nYou fund a learning cell (6 kids, 12 weeks, $250–$600). In return, you get:\n→ Live health scores for your funded cell\n→ Student progress data updated weekly\n→ Public recognition on our sponsor leaderboard\n→ 15% of your funding reinvested back into the network\n\nNo trust required. Full transparency from day one.\n\nWould you be open to a 20-minute demo?\n\nBest,\n[NAME]\n[DOWNFLOW]`,
      },
      {
        name: 'Cold Email — CSR Decision Makers',
        effort: 'Low',
        speed: 'Fast',
        volume: 'Scalable',
        score: 9,
        how: 'Build a list of companies with declared CSR/education budgets. Use LinkedIn Sales Navigator or Apollo.io. Send personalised cold emails. Follow up twice. The key insight: position this as a PRODUCT (real-time impact data) not a donation request.',
        template: `Subject: 6 kids in [CITY] need a sponsor — live data included\n\nHi [NAME],\n\nI run DOWNFLOW — an education network operating in Vietnam, Germany, and Russia.\n\nWe have a learning cell ready to launch in [CITY] with 6 enrolled children and a trained facilitator. We're looking for one sponsor to fund the 12-week cycle.\n\nCost: $250 (Starter) or $600 (Growth — 2 cells)\nWhat you get: branded cell, live impact dashboard, weekly progress updates, student video evidence, sponsor leaderboard position.\n\nThis isn't a donation. It's a partnership with measurable outcomes.\n\nCould we schedule 20 minutes this week?\n\n[NAME]\n[CALENDAR LINK]`,
      },
      {
        name: 'Education Conferences + Events',
        effort: 'Medium',
        speed: 'Slow',
        volume: 'High quality',
        score: 8,
        how: 'Attend EdTech and CSR conferences in target regions. Bring one printed impact report from an existing cell (real numbers: attendance, health scores, student progress). Talk to people — not with a pitch, but with a story. One good conversation at a conference > 100 cold emails.',
        template: null,
      },
      {
        name: 'Local Business Owner Sponsorship',
        effort: 'Low',
        speed: 'Fast',
        volume: 'High volume',
        score: 8,
        how: 'Every city has business owners who want to be seen as community builders. A local restaurant, gym, or clinic can fund one cell for $250 and get their logo on the student dashboard + mentioned in every session. Walk in, show the impact dashboard, close on the spot.',
        template: `Hi [OWNER NAME],\n\nI run DOWNFLOW in [CITY] — we run structured learning sessions for 6 children at a time, focused on real-world skills.\n\nWe have a cell ready to launch in [NEIGHBOURHOOD] and we're looking for one local business to sponsor it.\n\nSponsor cost: $250 for the full 12-week cycle\nWhat you get:\n→ Your business name on the student learning dashboard\n→ Mentioned at the start of every session ("Today's session is sponsored by [BUSINESS]")\n→ Featured in our quarterly community report\n→ Real impact data you can share\n\nWould you be open to a quick chat? Happy to come to you.`,
      },
      {
        name: 'Impact Report as Sales Tool',
        effort: 'Low',
        speed: 'Ongoing',
        volume: 'Multiplier',
        score: 10,
        how: 'After every completed cycle, generate a 1-page impact report (PDF) with real numbers: sessions attended, health score, video reps submitted, student progress. Send to the sponsor. Then send to 5 other prospects with "Here\'s what sponsoring a cell looks like in practice." Real data is the best sales tool.',
        template: null,
      },
    ],
    funnel: [
      { stage: 'Prospecting', action: 'Identify CSR budget holders + community businesses', kpi: '20 qualified prospects/month' },
      { stage: 'Outreach', action: 'Personalised email or LinkedIn message', kpi: '15% reply rate' },
      { stage: 'Demo', action: 'Show live impact dashboard + existing cell data', kpi: '50% of demos convert' },
      { stage: 'Commitment', action: 'Funding request submitted via platform', kpi: 'Within 1 week of demo' },
      { stage: 'Activation', action: 'Payment confirmed → cell launched', kpi: 'Within 48hrs of payment' },
      { stage: 'Renewal', action: 'Sponsor renews for next cycle', kpi: '70% renewal rate target' },
    ],
    week1: [
      'Build a list of 50 CSR/HR managers at mid-size companies in target cities using LinkedIn',
      'Send 10 personalised cold emails per day (not mass blast — personalised)',
      'Visit 5 local business owners in person with the pitch + demo',
      'Generate impact reports from any existing cells',
      'Set up a sponsor demo walk-through using the live platform dashboard',
      'Create one "What sponsoring a cell looks like" case study document',
    ],
  },
  connectors: {
    headline: 'Recruit 15 connectors in 3 months',
    subhead: 'Target: Community leaders, ambitious young professionals, parents who are already connected locally. A connector earns by building the network — it\'s a business, not a volunteer role.',
    channels: [
      {
        name: 'WhatsApp Community Leaders',
        effort: 'Zero cost',
        speed: 'Very fast',
        volume: 'High quality',
        score: 10,
        how: 'Every city has people who run WhatsApp groups of 200–1000 people (local community, parents, professionals). Find them. Offer them the connector role. They already have the network — you give them the structure and earning model. This is your fastest channel.',
        template: `Hi [NAME],\n\nI've been following your community group — it's clear you're genuinely connected in [CITY].\n\nI run DOWNFLOW — a structured learning network for children — and we're expanding in [CITY]. We need connectors: people who recruit students, find facilitators, and build local cells.\n\nIt's not volunteer work. Connectors earn from the cells they build — every session that runs in your network generates revenue for you.\n\nWould you be open to a 30-minute call to understand how it works?\n\n[NAME]`,
      },
      {
        name: 'LinkedIn — Community Builders',
        effort: 'Low',
        speed: 'Medium',
        volume: 'Medium',
        score: 8,
        how: 'Search for: "community manager", "youth worker", "program coordinator", "education coordinator" in target cities. These people already know how to organise people. The connector role is a natural fit.',
        template: `Hi [NAME],\n\nYour background in community work caught my attention.\n\nI'm building DOWNFLOW in [CITY] — a structured learning network for kids. We need connectors: people who build local student groups, recruit facilitators, and coordinate cells.\n\nConnectors earn from every session their cells run. It's a business model built into the platform.\n\nWould you be interested in learning more? Happy to send details or jump on a quick call.\n\n[NAME]`,
      },
      {
        name: 'Facebook — Local Networks',
        effort: 'Zero cost',
        speed: 'Fast',
        volume: 'High',
        score: 8,
        how: 'Post in local community Facebook groups: "Looking for community builders in [CITY]". Frame as an opportunity to build a social impact business, not a job listing. The earning model is the hook.',
        template: `📣 Looking for community builders in [CITY]\n\nDOWNFLOW School of Life is expanding into [CITY] and we're looking for 2–3 connectors.\n\nWhat is a connector?\nYou recruit students (ages 5–14), find facilitators, and build local learning cells. You earn from every session your cells run — it's a real income stream, not a volunteer role.\n\nYou're a good fit if:\n→ You know lots of people in [CITY]\n→ You care about children's education\n→ You want to build something meaningful AND earn from it\n\nInterested? Reply here or apply at: [URL]`,
      },
      {
        name: 'Convert Top Students → Connectors (Long Term)',
        effort: 'Zero cost',
        speed: 'Slow → High quality',
        volume: 'Self-sustaining',
        score: 10,
        how: 'The best connectors will eventually come from your own student pathway. Student → SG → ASG → Facilitator → Connector. Build this pipeline deliberately. Every student who reaches the Connector stage knows the system from the inside — they are your strongest advocates.',
        template: null,
      },
      {
        name: 'University Entrepreneurship Clubs',
        effort: 'Low',
        speed: 'Medium',
        volume: 'High quality',
        score: 7,
        how: 'Present at university entrepreneurship clubs, startup events, or social enterprise groups. Frame the connector role as: "Build your own education micro-business with our infrastructure." Young entrepreneurs respond to this framing much better than "volunteer to help kids".',
        template: null,
      },
    ],
    funnel: [
      { stage: 'Identification', action: 'Spot community leaders with existing networks', kpi: '10 qualified prospects/month' },
      { stage: 'Outreach', action: 'Personal message explaining the earning model', kpi: '30% reply rate' },
      { stage: 'Onboarding Call', action: 'Explain the model + show the platform', kpi: '60% convert after call' },
      { stage: 'First Cell', action: 'Connector registers their first cell', kpi: 'Within 2 weeks of joining' },
      { stage: 'Active', action: 'Running 2+ cells simultaneously', kpi: '60% reach 2 cells in 60 days' },
      { stage: 'Network Effect', action: 'Connector recruits another connector', kpi: '1 referral per 3 connectors' },
    ],
    week1: [
      'Identify 10 WhatsApp/Facebook group admins in target cities and message personally',
      'Post connector opportunity in 5 local Facebook community groups per city',
      'Search LinkedIn for 20 community managers / youth workers and connect',
      'Present at 1 university entrepreneurship club or startup event',
      'Brief existing facilitators — they often know people who would make good connectors',
      'Set up the Referrals page link for connectors to easily share',
    ],
  },
}

const CONTENT_CALENDAR = [
  { week: 1, day: 'Mon', platform: 'Facebook', type: 'Parent story', content: '"My 8-year-old just finished Week 1 of DOWNFLOW. Here\'s what happened…" — Real parent voice, first-person, authentic. Include one photo of the session (no faces if privacy concern).', role: 'students' },
  { week: 1, day: 'Tue', platform: 'LinkedIn', type: 'Impact data post', content: '"We ran 4 cells last month. Here\'s the actual data: avg attendance 91%, avg health score 78, 12 video reps submitted…" — Data builds credibility with sponsors and corporate CSR.', role: 'sponsors' },
  { week: 1, day: 'Wed', platform: 'TikTok / Reels', type: '60-sec session clip', content: 'No script needed. Film 60 seconds of an actual session — the warm-up, a group activity, a student reaction. Real > polished. Caption: "This is what learning looks like."', role: 'students' },
  { week: 1, day: 'Thu', platform: 'LinkedIn', type: 'Facilitator spotlight', content: '"Meet [NAME] — she runs 2 learning cells in Hanoi and earns [X] per week. Here\'s how she describes it…" — Shows the earning model, attracts more facilitators.', role: 'facilitators' },
  { week: 1, day: 'Fri', platform: 'Facebook / WhatsApp', type: 'Weekend push', content: '"New cells starting next week in [CITY]. 6 spots available. Ages 5–14. Here\'s the link to register your child." — CTA-focused. Post Friday afternoon for weekend engagement.', role: 'students' },
  { week: 2, day: 'Mon', platform: 'Instagram', type: 'Coin system explainer', content: 'Carousel: "Why your child\'s DOWNFLOW coins can\'t be bought." Slide 1: What are coins. Slide 2: How they\'re earned. Slide 3: What they unlock. Slide 4: Why this matters. 4 slides max.', role: 'students' },
  { week: 2, day: 'Tue', platform: 'LinkedIn', type: 'Sponsor case study', content: '"TechCorp VN sponsored 2 cells. 3 months later: 10 students progressed, 1 promoted to SG, sponsor health score 84. Here\'s the full breakdown."', role: 'sponsors' },
  { week: 2, day: 'Wed', platform: 'Facebook Groups', type: 'Connector opportunity', content: '"We\'re looking for 2 connectors in [CITY]. You build the local network. We provide the system. You earn from every session." — Post in entrepreneur and community groups.', role: 'connectors' },
  { week: 2, day: 'Thu', platform: 'TikTok / Reels', type: 'Before/after student', content: '"Week 1 vs Week 8 — the same student." Show confidence development, willingness to speak, engagement level. No identifying info needed — just the energy shift.', role: 'students' },
  { week: 2, day: 'Fri', platform: 'Email blast', type: 'Weekly digest', content: 'To warm leads (people who clicked /join): "Here\'s what happened in DOWNFLOW this week: [stats]. New cells launching [date]. Register now or forward to a parent who should know."', role: 'students' },
  { week: 3, day: 'Mon', platform: 'LinkedIn', type: 'System map post', content: '"Here\'s how DOWNFLOW actually works." Post the system map visual. Explain each role. This is the post that makes sponsors and investors understand the model at a glance.', role: 'sponsors' },
  { week: 3, day: 'Tue', platform: 'Facebook', type: 'Facilitator earnings post', content: '"A DOWNFLOW facilitator in Vietnam earns 432,000 VND per session. Running 2 cells a week: 3.4M VND/month minimum. Here\'s how the earning structure works." — Real numbers. Attracts applicants.', role: 'facilitators' },
  { week: 3, day: 'Wed', platform: 'WhatsApp / Telegram', type: 'Parent referral push', content: 'Send to enrolled parents: "If you refer 2 friends whose children join, your next cycle is discounted. Here\'s your personal referral link: [LINK]"', role: 'students' },
  { week: 3, day: 'Thu', platform: 'TikTok', type: 'Curriculum walkthrough', content: '"10 packs. 12 weeks each. This is what children learn in DOWNFLOW." Fast-cut walkthrough of each pack name with 1-line description. 45 seconds. High energy music.', role: 'students' },
  { week: 3, day: 'Fri', platform: 'LinkedIn', type: 'Connector earnings post', content: '"Our top connector runs 4 cells and earns from every session they run. Here\'s how the connector model works and why it\'s not volunteering."', role: 'connectors' },
  { week: 4, day: 'Mon', platform: 'All platforms', type: 'Month-end results post', content: '"Month 1 results: [X] cells, [X] students, [X] sessions run, avg health score [X]. Here\'s what we\'re building." — Regular velocity posts build trust over time.', role: 'sponsors' },
]

const CAMPAIGNS = [
  { id: 1, name: 'Vietnam Parent Launch', target: 'students', status: 'active', leads: 142, converted: 23, goal: 50, startDate: '2026-04-01', endDate: '2026-04-30', channels: ['Facebook Groups', 'WhatsApp', 'School Gates'], budget: '$0 (organic)' },
  { id: 2, name: 'Germany Facilitator Drive', target: 'facilitators', status: 'active', leads: 31, converted: 4, goal: 10, startDate: '2026-04-01', endDate: '2026-04-30', channels: ['LinkedIn', 'University Notice Boards'], budget: '$50 (print flyers)' },
  { id: 3, name: 'Corporate CSR Outreach', target: 'sponsors', status: 'planning', leads: 8, converted: 1, goal: 5, startDate: '2026-04-15', endDate: '2026-05-15', channels: ['LinkedIn Cold Outreach', 'Email'], budget: '$0 (organic)' },
  { id: 4, name: 'Community Connector Hanoi', target: 'connectors', status: 'planning', leads: 15, converted: 2, goal: 5, startDate: '2026-04-10', endDate: '2026-04-30', channels: ['WhatsApp Leaders', 'Facebook Community Groups'], budget: '$0 (organic)' },
]

const ROLE_COLORS = { students: '#5b9bd5', facilitators: '#4de8b0', sponsors: '#d4a840', connectors: '#b083ff' }

// ── Component ─────────────────────────────────────────────────

export default function MarketingEngine() {
  usePageMeta('Marketing Engine', 'Acquire students, facilitators, sponsors and connectors at scale.')

  const toast = useToast()
  const [activeRole,   setActiveRole]   = useState('students')
  const [activeTab,    setActiveTab]    = useState('strategy')
  const [expandedCh,   setExpandedCh]   = useState(null)
  const [copiedScript, setCopiedScript] = useState(null)
  const [calFilter,    setCalFilter]    = useState('all')

  const strat = STRATEGIES[activeRole]
  const color = ROLE_COLORS[activeRole]

  function copyScript(text, id) {
    navigator.clipboard.writeText(text)
    setCopiedScript(id)
    toast('Script copied to clipboard!', 'success')
    setTimeout(() => setCopiedScript(null), 2000)
  }

  const filteredCal = calFilter === 'all' ? CONTENT_CALENDAR : CONTENT_CALENDAR.filter(c => c.role === calFilter)

  return (
    <div className="mkt-page">

      {/* Hero */}
      <div className="mkt-hero">
        <div>
          <span className="kicker">Growth Engine</span>
          <h1>Marketing & Acquisition</h1>
          <p className="mkt-sub">Strategies, scripts, and execution plans to build mass across all 4 roles. Everything is free or near-free to start.</p>
        </div>
        <div className="mkt-hero-stats">
          {ROLES.map(r => (
            <div key={r.id} className="mkt-hero-stat" style={{ '--rc': r.color }}>
              <span>{r.icon}</span>
              <div>
                <div className="mkt-hs-label">{r.label}</div>
                <div className="mkt-hs-target">{r.target}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role selector */}
      <div className="mkt-role-tabs">
        {ROLES.map(r => (
          <button key={r.id}
            className={`mkt-role-tab ${activeRole === r.id ? 'active' : ''}`}
            style={{ '--rc': r.color }}
            onClick={() => setActiveRole(r.id)}>
            <span className="mkt-rt-icon">{r.icon}</span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      {/* Section tabs */}
      <div className="mkt-section-tabs">
        {['strategy', 'funnel', 'week1', 'calendar', 'campaigns'].map(t => (
          <button key={t} className={`mkt-stab ${activeTab === t ? 'active' : ''}`}
            style={activeTab === t ? { color, borderBottomColor: color } : {}}
            onClick={() => setActiveTab(t)}>
            {{ strategy: '🗺 Channels', funnel: '🔄 Funnel', week1: '⚡ Week 1 Actions', calendar: '📅 Content Calendar', campaigns: '📊 Campaigns' }[t]}
          </button>
        ))}
      </div>

      {/* ── Strategy / Channels ── */}
      {activeTab === 'strategy' && (
        <div className="mkt-panel">
          <div className="mkt-strategy-header">
            <div>
              <h2 className="mkt-strategy-title">{strat.headline}</h2>
              <p className="mkt-strategy-sub">{strat.subhead}</p>
            </div>
          </div>

          <div className="mkt-channels">
            {strat.channels.map((ch, i) => (
              <div key={i} className={`mkt-channel ${expandedCh === i ? 'open' : ''}`}>
                <div className="mkt-channel-header" onClick={() => setExpandedCh(expandedCh === i ? null : i)}>
                  <div className="mkt-channel-left">
                    <div className="mkt-channel-score" style={{ background: color, color: '#0a0e1a' }}>
                      {ch.score}/10
                    </div>
                    <div>
                      <div className="mkt-channel-name">{ch.name}</div>
                      <div className="mkt-channel-meta">
                        <span className="mkt-tag">{ch.effort}</span>
                        <span className="mkt-tag">{ch.speed}</span>
                        <span className="mkt-tag">{ch.volume} volume</span>
                      </div>
                    </div>
                  </div>
                  <span className="mkt-chevron">{expandedCh === i ? '▲' : '▼'}</span>
                </div>

                {expandedCh === i && (
                  <div className="mkt-channel-body">
                    <div className="mkt-channel-how">
                      <strong>How to execute:</strong>
                      <p>{ch.how}</p>
                    </div>
                    {ch.template && (
                      <div className="mkt-script-block">
                        <div className="mkt-script-header">
                          <span>📋 Ready-to-use script</span>
                          <button className="mkt-copy-btn"
                            onClick={() => copyScript(ch.template, i)}>
                            {copiedScript === i ? '✓ Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="mkt-script">{ch.template}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Funnel ── */}
      {activeTab === 'funnel' && (
        <div className="mkt-panel">
          <h2 className="mkt-panel-title">Acquisition Funnel — {activeRole}</h2>
          <p className="mkt-panel-sub">Know your numbers at every stage. If a stage is underperforming, fix that stage — not the whole funnel.</p>
          <div className="mkt-funnel">
            {strat.funnel.map((stage, i) => (
              <div key={i} className="mkt-funnel-stage" style={{ '--fc': color, '--fw': `${100 - i * 12}%` }}>
                <div className="mkt-funnel-bar" style={{ width: `${100 - i * 12}%`, background: `${color}${Math.round((0.9 - i * 0.1) * 255).toString(16).padStart(2, '0')}` }} />
                <div className="mkt-funnel-content">
                  <div className="mkt-funnel-num">{i + 1}</div>
                  <div className="mkt-funnel-info">
                    <strong>{stage.stage}</strong>
                    <span>{stage.action}</span>
                  </div>
                  <div className="mkt-funnel-kpi">KPI: {stage.kpi}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mkt-conversion-math">
            <h3>Conversion Math</h3>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.86rem', lineHeight: 1.7 }}>
              {activeRole === 'students' && '1,000 impressions → 50 clicks (5%) → 10 sign-ups (20%) → 3 enrolled (30%) → 2 retained at 3 weeks (75%). You need ~1,700 impressions per retained student. Focus on retention — it\'s 10x cheaper than new acquisition.'}
              {activeRole === 'facilitators' && '50 leads/week → 10 applications (20%) → 6 pass demo (60%) → 5 complete training (80%) → 5 active facilitators per week. At this rate: 20 facilitators in 4 weeks once the pipeline is running.'}
              {activeRole === 'sponsors' && '20 prospects → 3 replies (15%) → 1.5 demos → 0.75 conversions (50%). You need ~27 prospects to get 1 sponsor. 10 sponsors = 270 qualified prospects contacted. Build the list first.'}
              {activeRole === 'connectors' && '10 prospects → 3 replies (30%) → 2 onboarding calls → 1.2 active connectors (60%). 15 connectors = 125 qualified prospects. Easier than sponsors — focus on WhatsApp group admins first.'}
            </p>
          </div>
        </div>
      )}

      {/* ── Week 1 ── */}
      {activeTab === 'week1' && (
        <div className="mkt-panel">
          <h2 className="mkt-panel-title">⚡ Week 1 Execution — {activeRole}</h2>
          <p className="mkt-panel-sub">Stop planning. Do these 6 things in the next 7 days. Nothing else matters until these are done.</p>
          <div className="mkt-week1-list">
            {strat.week1.map((action, i) => (
              <div key={i} className="mkt-week1-item">
                <div className="mkt-w1-num" style={{ background: color, color: '#0a0e1a' }}>{i + 1}</div>
                <div className="mkt-w1-action">{action}</div>
                <button className="mkt-w1-done" title="Mark done" onClick={() => toast('Marked as done ✓', 'success')}>
                  ✓
                </button>
              </div>
            ))}
          </div>
          <div className="mkt-week1-rule">
            <strong>The rule:</strong> Do not start Week 2 actions until all 6 Week 1 actions are completed. Doing 6 things fully beats doing 12 things partially every time.
          </div>
        </div>
      )}

      {/* ── Content Calendar ── */}
      {activeTab === 'calendar' && (
        <div className="mkt-panel">
          <div className="mkt-cal-header">
            <h2 className="mkt-panel-title">4-Week Content Calendar</h2>
            <div className="mkt-cal-filters">
              {['all', 'students', 'facilitators', 'sponsors', 'connectors'].map(f => (
                <button key={f}
                  className={`mkt-cal-filter ${calFilter === f ? 'active' : ''}`}
                  style={calFilter === f && f !== 'all' ? { background: ROLE_COLORS[f] + '20', color: ROLE_COLORS[f], borderColor: ROLE_COLORS[f] } : {}}
                  onClick={() => setCalFilter(f)}>
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mkt-cal-grid">
            {filteredCal.map((item, i) => (
              <div key={i} className="mkt-cal-card" style={{ '--rc': ROLE_COLORS[item.role] }}>
                <div className="mkt-cal-top">
                  <span className="mkt-cal-week">W{item.week} {item.day}</span>
                  <span className="mkt-cal-platform">{item.platform}</span>
                  <span className="mkt-cal-role" style={{ color: ROLE_COLORS[item.role] }}>{item.role}</span>
                </div>
                <div className="mkt-cal-type">{item.type}</div>
                <p className="mkt-cal-content">{item.content}</p>
                <button className="mkt-cal-copy" onClick={() => copyScript(item.content, `cal-${i}`)}>
                  {copiedScript === `cal-${i}` ? '✓ Copied' : '📋 Copy brief'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Campaigns ── */}
      {activeTab === 'campaigns' && (
        <div className="mkt-panel">
          <h2 className="mkt-panel-title">Live Campaigns</h2>
          <div className="mkt-campaigns">
            {CAMPAIGNS.map(c => {
              const pct = Math.round((c.converted / c.goal) * 100)
              const rc = ROLE_COLORS[c.target]
              return (
                <div key={c.id} className="mkt-campaign-card">
                  <div className="mkt-camp-header">
                    <div>
                      <div className="mkt-camp-name">{c.name}</div>
                      <div className="mkt-camp-dates">{c.startDate} → {c.endDate}</div>
                    </div>
                    <span className={`mkt-camp-status ${c.status}`}>{c.status}</span>
                  </div>

                  <div className="mkt-camp-stats">
                    <div className="mkt-camp-stat">
                      <div className="mkt-cs-val">{c.leads}</div>
                      <div className="mkt-cs-label">Leads</div>
                    </div>
                    <div className="mkt-camp-stat">
                      <div className="mkt-cs-val" style={{ color: rc }}>{c.converted}</div>
                      <div className="mkt-cs-label">Converted</div>
                    </div>
                    <div className="mkt-camp-stat">
                      <div className="mkt-cs-val">{c.goal}</div>
                      <div className="mkt-cs-label">Goal</div>
                    </div>
                    <div className="mkt-camp-stat">
                      <div className="mkt-cs-val">{c.budget}</div>
                      <div className="mkt-cs-label">Budget</div>
                    </div>
                  </div>

                  <div className="mkt-camp-progress-wrap">
                    <div className="mkt-camp-progress-bar">
                      <div className="mkt-camp-progress-fill"
                        style={{ width: `${Math.min(pct, 100)}%`, background: rc }} />
                    </div>
                    <span className="mkt-camp-pct">{pct}% of goal</span>
                  </div>

                  <div className="mkt-camp-channels">
                    {c.channels.map(ch => <span key={ch} className="mkt-camp-ch">{ch}</span>)}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mkt-add-campaign">
            <button className="mkt-add-btn" onClick={() => toast('Campaign builder coming soon — for now add directly in Firestore', 'success')}>
              + New Campaign
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
