import React from 'react'
import { useState, useEffect, useRef } from 'react'
import usePageMeta from '../hooks/usePageMeta.js'

/* ═══════════════════════════════════════════════════════════════
   DOWNFLOW — Social Ads Automation Engine
   7 days × 4 platforms × 3 audiences = 84 unique ads
   Audiences: Sponsors (Biz), Facilitators (Teachers), Connectors
   Platforms: Facebook · Instagram · TikTok · Telegram
═══════════════════════════════════════════════════════════════ */

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const DAY_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const PLATFORMS = ['Facebook','Instagram','TikTok','Telegram']
const AUDIENCES = [
  { id: 'sponsor',    label: 'Business / Sponsor', icon: '💼', color: '#f0c040', colorDark: '#a07010' },
  { id: 'teacher',   label: 'Teacher / Facilitator', icon: '🧭', color: '#a78bfa', colorDark: '#6d40c4' },
  { id: 'connector', label: 'Connector',            icon: '🔗', color: '#38d9a9', colorDark: '#0d8060' },
]

const PLATFORM_META = {
  Facebook:  { icon: '📘', format: 'Feed Post / Carousel', color: '#4267B2', bg: '#e8eef8', emoji: '📘' },
  Instagram: { icon: '📸', format: 'Story / Reel / Feed',  color: '#C13584', bg: '#fce8f5', emoji: '📸' },
  TikTok:    { icon: '🎵', format: 'Short Video Script',    color: '#010101', bg: '#f0f0f0', emoji: '🎵' },
  Telegram:  { icon: '✈️', format: 'Channel Post / Message',color: '#0088cc', bg: '#e2f3fc', emoji: '✈️' },
}

/* ═══════════════════════════════════════════════════════════════
   THE AD LIBRARY — 7 × 4 × 3 = 84 ads
═══════════════════════════════════════════════════════════════ */

const AD_LIBRARY = {

  // ─── MONDAY: "New Week Energy" ───────────────────────────────
  Monday: {
    sponsor: {
      Facebook: {
        headline: '📣 Monday Motivation: Your CSR Budget Is Sitting Idle.',
        body: `Most company CSR money evaporates into branded mugs and forgotten Excel files.\n\nAt DOWNFLOW, every dollar you put in becomes:\n✅ A real learning cell\n✅ A real facilitator earning weekly\n✅ A real child building real skills\n\nSponsor 1 cell for 3 months.\nWatch the reports come in.\n\nThis isn't charity. It's infrastructure.`,
        cta: '→ Calculate your impact',
        hashtags: ['#CSR', '#ImpactInvesting', '#EducationROI', '#DOWNFLOW'],
        hook: 'Your CSR budget deserves better than branded mugs.',
        visual: '📊 Split: charity logo vs DOWNFLOW real impact dashboard',
      },
      Instagram: {
        headline: 'You fund a cell. 10 kids grow.',
        body: `Story format:\n\nSlide 1: "Most companies fund education. Zero see results." 🫠\nSlide 2: "DOWNFLOW shows you the receipts." 📱\nSlide 3: Attendance. Videos. Skills. Weekly.\nSlide 4: "One cell. ₫1,080,000/month. Real ROI." 💸\nSlide 5: "Start Monday. See results by Friday." ⚡`,
        cta: '💼 DM us "SPONSOR" to start',
        hashtags: ['#MondayMotivation', '#BizImpact', '#SponsorACell', '#DownflowSchool'],
        hook: 'Fund education. Actually see what happens.',
        visual: 'Clean grid: 5-slide carousel, dark navy + gold',
      },
      TikTok: {
        headline: 'POV: You\'re a CEO who just found out your CSR actually works',
        body: `[SCRIPT — 30 sec]\n🎬 Scene: Someone at a boardroom table staring at a boring CSR report.\n\nVO: "Last quarter's education fund... sponsored a logo on a wall."\n\n*DOWNFLOW logo pops*\n\nCut to: Student speaking confidently on camera.\nCut to: Facilitator getting paid.\nCut to: Cell growth chart going vertical.\n\n"We fund cells. You see everything. Weekly."\n\nText overlay: "From ₫1,080,000/mo"\nCTA: "Link in bio → Sponsor a cell"`,
        cta: '🔗 Link in bio',
        hashtags: ['#BusinessTikTok', '#CSRdoneright', '#DOWNFLOW', '#ImpactBiz'],
        hook: 'POV: Your CSR budget finally does something real.',
        visual: 'Boardroom → transformation → student win',
      },
      Telegram: {
        headline: '📢 Monday Drop: Sponsor a learning cell this week.',
        body: `Hey, it's Monday. You know what that means — new decisions.\n\nHere's a quick one:\n\n→ 1 DOWNFLOW Cell = 8 students + 1 facilitator + weekly reports\n→ Cost: ₫1,080,000/month per cell\n→ What you get: Full dashboard. Real attendance. Skill videos.\n\nNo fluff. No branding events. Just results.\n\n📊 Try 1 cell for 3 months. That's ₫3,240,000.\nWe'll send you the impact report every Friday.\n\nReply "SPONSOR" to get the onboarding doc.`,
        cta: 'Reply "SPONSOR"',
        hashtags: [],
        hook: 'It\'s Monday. Fund something real.',
        visual: 'Text post with stats block',
      },
    },
    teacher: {
      Facebook: {
        headline: '👩‍🏫 Monday Reminder: Your Teaching Skills Are Worth More Than Your Salary',
        body: `You went into teaching for impact.\nSomewhere along the way, someone put you in a room with 40 kids, no budget, and a 6am alarm.\n\nThere's a different model.\n\nDOWNFLOW Facilitators:\n✅ Work with 6–10 students per cell\n✅ Earn 35% of every lesson cycle (scales to 45%)\n✅ Get full curriculum. AI tools. Session scripts.\n✅ Run your own cell. Build your own schedule.\n\nMonday is a good day to stop surviving your job.`,
        cta: '→ Apply as a Facilitator',
        hashtags: ['#TeachersOfFacebook', '#FacilitatorLife', '#TeacherBurnout', '#DOWNFLOW'],
        hook: 'Your degree is worth more than your salary.',
        visual: 'Split: tired teacher at desk vs facilitator earning at home',
      },
      Instagram: {
        headline: 'You were born to guide. Not to grade 300 papers.',
        body: `Story series:\n\nSlide 1: "Every Sunday you dread Monday." 😔\nSlide 2: "What if Monday was yours?" 🌟\nSlide 3: Small group. Real conversations. Real growth.\nSlide 4: "Earn 35% of every lesson. Scale to 45%."\nSlide 5: "Applications open now." 🧭`,
        cta: '🧭 Swipe to apply',
        hashtags: ['#TeacherLife', '#FacilitatorApp', '#EarnAsYouTeach', '#DOWNFLOW'],
        hook: 'Teaching is great. Grinding is not.',
        visual: 'Warm, intimate — small group learning aesthetic',
      },
      TikTok: {
        headline: 'Teachers are not paid enough. DOWNFLOW thinks differently.',
        body: `[SCRIPT — 25 sec]\nText on screen: "Teacher salary in Vietnam: ₫5–8M/mo 😶"\n\n*Beat drop*\n\nText: "DOWNFLOW Facilitator: Up to ₫12M+ from 1 cell 💰"\n\nVO: "Smaller groups. Real curriculum. Full AI support."\n\nCut to facilitator running a session. Kids are ENGAGED.\n\n"You already have the skills. You just need the system."\n\nCTA text: "Apply → link in bio"`,
        cta: '🔗 Link in bio → Apply',
        hashtags: ['#TeacherTikTok', '#EduTok', '#FacilitatorLife', '#DOWNFLOW'],
        hook: 'Teacher salary vs. Facilitator income. It\'s not close.',
        visual: 'Bold text animation + real session footage',
      },
      Telegram: {
        headline: '🧭 For teachers: Monday means a new week of the same grind. Unless...',
        body: `You don't need a new job. You need a better system.\n\nDOWNFLOW Facilitators run small learning cells.\n6–10 students. Weekly sessions. Structured curriculum.\n\nYou earn 35% of every lesson cycle.\nThat's ₫2,160,000–₫3,600,000 per cell per month.\nRun 2 cells → double it.\n\nWe give you:\n📚 Full curriculum packs\n🤖 AI session assistant\n📹 Video submission tracking\n💳 Automatic weekly payout\n\nReply "GUIDE" and we'll send you the facilitator brief.`,
        cta: 'Reply "GUIDE"',
        hashtags: [],
        hook: 'Monday motivation for teachers: earn what you\'re worth.',
        visual: 'Clean text post, highlighted earnings',
      },
    },
    connector: {
      Facebook: {
        headline: '🔗 Monday Money Move: Build a Learning Cell. Earn From Every Lesson.',
        body: `You don't need to teach.\nYou just need to connect.\n\nDOWNFLOW Connectors:\n→ Form a learning cell (6–10 students)\n→ Find a facilitator\n→ Register the cell on the platform\n→ Earn 25% of every lesson that ever runs in it\n\nThat cell runs for 3–6 months.\nYou get paid every single week.\n\nOne good connection = months of passive income.\n\nHappens every Monday for cells you started last month.`,
        cta: '→ Become a Connector',
        hashtags: ['#PassiveIncome', '#EduBusiness', '#Connector', '#DOWNFLOW'],
        hook: 'You get paid every week. For work you did once.',
        visual: 'Network graph → income chart',
      },
      Instagram: {
        headline: 'Know people? Get paid.',
        body: `Slide 1: "You know parents. You know teachers. That's literally the job." 🤝\nSlide 2: "Connect them through DOWNFLOW."\nSlide 3: Earn 25% of every lesson. Forever.\nSlide 4: "One cell you formed = ₫270,000/lesson recurring."\nSlide 5: "Form 5 cells? Do the math." 🧮`,
        cta: '🔗 Apply as a Connector',
        hashtags: ['#NetworkingPays', '#ConnectorLife', '#PassiveIncome', '#DOWNFLOW'],
        hook: 'Know people? That\'s literally the job description.',
        visual: 'Minimalist infographic — connector at center of network',
      },
      TikTok: {
        headline: 'I get paid every Monday because of work I did 3 months ago 👀',
        body: `[SCRIPT — 20 sec]\n[Trending audio]\n\nText: "POV: It's Monday morning"\nText: "You wake up to ₫540,000 in your wallet"\nText: "From a group you connected in January 💀"\n\nVO: "DOWNFLOW Connectors earn 25% of every lesson — recurring."\n"I formed 3 cells. Now I earn while I sleep."\n\nCTA: "Connector applications open → link in bio"`,
        cta: '🔗 Link in bio',
        hashtags: ['#PassiveIncomeTikTok', '#ConnectorLife', '#DOWNFLOW', '#MondayMoney'],
        hook: 'Monday paycheck from work I did months ago. 👀',
        visual: 'Phone showing wallet notification',
      },
      Telegram: {
        headline: '📡 Connector Update — Monday Payout Week',
        body: `Every Monday is payout week for active Connectors.\n\nIf you formed a cell last month:\n→ Your 25% share from every lesson in that cell just processed.\n→ No action required. It's automatic.\n\nNot a Connector yet?\nHere's the deal:\n✅ Form a learning cell (help match families + a facilitator)\n✅ Register it on the platform\n✅ Earn 25% of every lesson that runs\n✅ Build 5 cells → build serious recurring income\n\nReply "CONNECT" to get the connector brief + payout schedule.`,
        cta: 'Reply "CONNECT"',
        hashtags: [],
        hook: 'Monday = payout day for Connectors.',
        visual: 'Wallet + payout confirmation screenshot style',
      },
    },
  },

  // ─── TUESDAY: "Proof & Results" ──────────────────────────────
  Tuesday: {
    sponsor: {
      Facebook: {
        headline: '📊 Tuesday Data Drop: What Happens After You Fund a Cell',
        body: `Week 1: Cell forms. Facilitator confirmed.\nWeek 2: First 3 lessons logged. Videos submitted.\nWeek 3: Students presenting. Attendance: 9/10.\nWeek 6: Cycle complete. Impact report sent to sponsor.\n\nThat's DOWNFLOW.\n\nYou don't just pay and hope.\nYou pay, watch, and see every step.\n\n"Accountability isn't a feature. It's the architecture."`,
        cta: '→ See sample impact report',
        hashtags: ['#ImpactReport', '#TransparentCSR', '#DOWNFLOW', '#EdTechBiz'],
        hook: 'What actually happens after you fund education.',
        visual: 'Timeline infographic — 6-week cell journey',
      },
      Instagram: {
        headline: 'The receipts are real.',
        body: `Carousel:\nSlide 1: "Most education investments have zero proof of impact." 🤷\nSlide 2: DOWNFLOW: Lesson logs. Attendance. Video submissions.\nSlide 3: "Week 6 report. Your name on the cell. Your data."\nSlide 4: Student video thumbnail (blurred for privacy)\nSlide 5: "This is what ROI looks like in education." ✅`,
        cta: '💼 DM "REPORT" for a sample',
        hashtags: ['#ProofOfImpact', '#CSRreport', '#DownflowSponsor', '#RealResults'],
        hook: 'The receipts. They\'re real.',
        visual: 'Report aesthetic — data visualization on dark bg',
      },
      TikTok: {
        headline: 'We show sponsors EVERYTHING that happens with their money',
        body: `[SCRIPT — 35 sec]\nVO: "Most companies fund education and get a thank-you email."\n\nScreenshare style: DOWNFLOW sponsor dashboard\n→ "This is your cell. Cell ID: VN-07"\n→ "8 students. 6 sessions this week. 3 videos submitted."\n→ "Your cost this week: ₫270,000."\n→ "One kid just gave their first public speech. On camera."\n\nVO: "You funded THAT."\n\n"Sponsor dashboard is live. Every cell. Every lesson."\n\nCTA: "Link in bio to see a demo"`,
        cta: '🔗 See live demo',
        hashtags: ['#TransparentBiz', '#ImpactBiz', '#DOWNFLOW', '#CorpEdu'],
        hook: 'We show you literally everything.',
        visual: 'Screen recording of sponsor dashboard',
      },
      Telegram: {
        headline: '📈 Tuesday Proof: Sample DOWNFLOW Sponsor Report',
        body: `Here's an example of what sponsors receive every Friday:\n\n────────────────────\n📋 Cell VN-07 — Week 4 Report\n────────────────────\nStudents enrolled: 8\nSessions completed: 3/3 ✅\nVideo submissions: 7/8 📹\nFacilitator performance: 4.8/5 ⭐\nTop skill: Voice projection (+23% vs Week 1)\n\nYour contribution this week: ₫270,000\nCumulative cell investment: ₫1,080,000\n────────────────────\n\nThis is your dashboard. Every week. Every cell you fund.\n\nReply "DEMO" to see a live sample.`,
        cta: 'Reply "DEMO"',
        hashtags: [],
        hook: 'Your weekly report, every Friday.',
        visual: 'Formatted report card — telegram style',
      },
    },
    teacher: {
      Facebook: {
        headline: '📚 Tuesday Truth: The Curriculum Is Already Done.',
        body: `You know what exhausts teachers?\n\nNot the teaching.\nThe prep.\n\nThe Sunday-night lesson plan spiral.\nThe printing. The adapting. The "is this even working?"\n\nDOWNFLOW Facilitators get:\n📦 Pre-built curriculum packs (Voice, Systems, Kidinomics, more)\n🤖 AI session assistant — prompts, corrections, scoring\n📹 Video framework — students submit, you review\n📋 Session scripts — so you're never winging it\n\nYou just show up. And guide.`,
        cta: '→ See the Facilitator curriculum',
        hashtags: ['#TeacherPrep', '#CurriculumReady', '#DOWNFLOW', '#FacilitatorLife'],
        hook: 'The hardest part of teaching isn\'t teaching.',
        visual: 'Messy desk → clean DOWNFLOW dashboard',
      },
      Instagram: {
        headline: 'No more Sunday prep spirals.',
        body: `Slide 1: "Sunday night. Lesson plans. Again. 😩"\nSlide 2: "DOWNFLOW: It's already done."\nSlide 3: Pack Library — Voice, Kidinomics, Systems Thinking\nSlide 4: AI assistant writes your session prompts\nSlide 5: "You guide. We handle the rest." 🧭`,
        cta: '📚 Explore curriculum packs',
        hashtags: ['#TeacherLife', '#SundayNight', '#DOWNFLOW', '#FacilitatorSystem'],
        hook: 'No prep. Just guide.',
        visual: 'Phone showing pack library — colorful, organized',
      },
      TikTok: {
        headline: 'Tell me you\'re a teacher without telling me you\'re a teacher',
        body: `[SCRIPT — 20 sec]\n[Trending format: "tell me without telling me"]\n\nClip 1: Stack of ungraded papers 📚\nClip 2: Empty coffee cup at 11pm ☕\nClip 3: Lesson plan open on Sunday at 9pm 😔\n\nVO: "DOWNFLOW Facilitators get the curriculum, the AI, the scripts."\n"You show up. You guide. You get paid."\n\nCTA: "Switch the game → link in bio"`,
        cta: '🔗 Link in bio',
        hashtags: ['#TeacherTikTok', '#DOWNFLOW', '#EduTok', '#TeachDifferently'],
        hook: 'Teacher struggles → DOWNFLOW solution.',
        visual: 'Relatable teacher content → contrast reveal',
      },
      Telegram: {
        headline: '📦 Tuesday Feature: What\'s Inside a DOWNFLOW Curriculum Pack?',
        body: `A lot of teachers ask: "Is the curriculum actually good?"\n\nHere's what's inside:\n\n📦 Pack: "Voice & Presence" (6 lessons)\n────────────────\n• Lesson 1: The 3-second rule (silence before you speak)\n• Lesson 2: Body language that commands attention\n• Lesson 3: How to tell a story in 60 seconds\n• Lesson 4: Handling interruptions with confidence\n• Lesson 5: Public performance — live group challenge\n• Lesson 6: Final video submission + peer review\n\nEvery lesson: script + activity + AI prompts + grading rubric.\n\nFacilitators don't build this. They deliver it.\n\nReply "PACK" to see a full pack preview.`,
        cta: 'Reply "PACK"',
        hashtags: [],
        hook: 'Real curriculum. Real structure.',
        visual: 'Curriculum breakdown — telegram list format',
      },
    },
    connector: {
      Facebook: {
        headline: '🔗 Tuesday: The Most Underrated Income Model in Education',
        body: `Nobody talks about this.\n\nMost "education business" models need you to teach, manage students, create content, do admin...\n\nDOWNFLOW Connectors?\n\n→ You connect families with a facilitator\n→ You help form the cell (6–10 students)\n→ You register it on the app\n→ Done.\n\nFrom that point, you earn 25% of every lesson that runs.\nEvery week. Automatically.\n\nThe cell might run for 6 months.\nYou did the work once.`,
        cta: '→ Learn the Connector model',
        hashtags: ['#PassiveIncome', '#NetworkBusiness', '#Connector', '#DOWNFLOW'],
        hook: 'The education income model nobody talks about.',
        visual: 'Once → ongoing earnings flowchart',
      },
      Instagram: {
        headline: 'Connect. Register. Earn. Repeat.',
        body: `Slide 1: "The work: connect families + facilitator. One time."\nSlide 2: "The result: 25% of every lesson. Ongoing."\nSlide 3: Math: 1 cell × 10 lessons × ₫270,000 = ₫2,700,000\nSlide 4: "Build 5 cells. ₫13,500,000/month recurring."\nSlide 5: "Scale is the model." 📈`,
        cta: '🔗 Apply as Connector',
        hashtags: ['#ConnectorLife', '#RecurringIncome', '#DOWNFLOW', '#EduBiz'],
        hook: 'Do the work once. Earn from it for months.',
        visual: 'Minimalist math — dark bg, gold numbers',
      },
      TikTok: {
        headline: 'I made ₫13M last month connecting families to learning groups',
        body: `[SCRIPT — 25 sec]\n[Casual talking head OR text video]\n\n"So I'm a Connector for DOWNFLOW. Let me explain."\n\n"I don't teach. I don't create content. I connect."\n"I find parents who want a small learning group for their kid."\n"I match them with a facilitator."\n"I register the cell on the app."\n"Then... I earn 25% of every lesson that runs."\n\nText: "Last month: 4 cells. ₫13,680,000 💸"\n\nCTA: "Connector applications → link in bio"`,
        cta: '🔗 Apply → link in bio',
        hashtags: ['#ConnectorLife', '#DOWNFLOW', '#PassiveIncomeTikTok', '#EduTok'],
        hook: 'This is how I earned ₫13M last month without teaching.',
        visual: 'Casual talking head, income reveal',
      },
      Telegram: {
        headline: '📡 Tuesday Connector Tip: How to Build Your First Cell This Week',
        body: `If you just joined as a Connector — here's your Tuesday action plan:\n\n✅ Day 1 (Today): Post in 1 parent group you're in.\n"Looking for 6–8 families interested in a small English + life skills group for kids. DM me."\n\n✅ Day 2: Collect interested parents. Share the DOWNFLOW overview.\n\n✅ Day 3: Find a facilitator from the platform. Intro call.\n\n✅ Day 4: Register the cell. Get your Connector ID assigned.\n\n✅ Day 5: Cell onboarded. First lesson scheduled.\n\nYou've now set up a recurring income source.\nEvery lesson = ₫270,000 to you.\n\nReply "WEEK1" for the full Connector quickstart guide.`,
        cta: 'Reply "WEEK1"',
        hashtags: [],
        hook: 'Your first cell. This week. Here\'s how.',
        visual: '5-day action plan — telegram checklist',
      },
    },
  },

  // ─── WEDNESDAY: "Midweek Hustle" ─────────────────────────────
  Wednesday: {
    sponsor: {
      Facebook: {
        headline: '💡 Midweek Check: Are You Funding Education or Just Paying for It?',
        body: `There's a difference.\n\n"Funding education" = you write a cheque, a school puts your logo on a wall, nobody knows if it worked.\n\n"Paying for education" = you fund a specific cell, you see specific students, you get specific outcomes, weekly.\n\nDOWNFLOW is the second one.\n\n1 cell = 8 students + 1 trained facilitator.\n₫1,080,000/month.\nFull dashboard. Full accountability.\n\nWhich model does your company deserve?`,
        cta: '→ Book a sponsor demo',
        hashtags: ['#WednesdayWisdom', '#CSRstrategy', '#DOWNFLOW', '#ImpactFirst'],
        hook: 'Funding education ≠ paying for education.',
        visual: 'Logo on wall vs DOWNFLOW dashboard — split comparison',
      },
      Instagram: {
        headline: 'Midweek reality check for business owners.',
        body: `Slide 1: "Your CSR: logo on a wall. 👀"\nSlide 2: "Their CSR: dashboard. Reports. Results."\nSlide 3: "DOWNFLOW: you see the student. You see the lesson. You see the growth."\nSlide 4: "That's the difference."\nSlide 5: "Sponsor a cell. See it all." 💼`,
        cta: '💼 Book a demo → link in bio',
        hashtags: ['#MidweekBiz', '#CSRdoneright', '#DOWNFLOW', '#ImpactBiz'],
        hook: 'Other CSR: logo on a wall. DOWNFLOW: actual results.',
        visual: 'Clean comparison carousel',
      },
      TikTok: {
        headline: 'Corporate education funding be like 👀 (and what we do instead)',
        body: `[SCRIPT — 30 sec]\n[Comedy/contrast format]\n\nVoice 1: "Our company donated to an education charity last year."\nVoice 2: "What happened?"\nVoice 1: "...we got a certificate."\nVoice 2: "And the students?"\nVoice 1: "We... don't know. 🤷"\n\n*DOWNFLOW logo*\n\nVO: "Or: fund a specific cell. Get weekly reports. See real students grow."\n"Same budget. Completely different outcome."\n\nCTA: "Book a sponsor demo → link in bio"`,
        cta: '🔗 Demo → link in bio',
        hashtags: ['#CorporateTikTok', '#DOWNFLOW', '#CSRfail', '#ImpactBiz'],
        hook: 'Other CSR vs. DOWNFLOW. No comparison.',
        visual: 'Comedy contrast — stiff corporate vs real impact',
      },
      Telegram: {
        headline: '🏢 Wednesday for Business Owners: The DOWNFLOW Sponsor Brief',
        body: `Quick overview for decision-makers:\n\n🏫 DOWNFLOW School of Life\nModel: Micro learning cells (6–10 students)\nFacilitator: Trained, weekly-paid, platform-rated\nCurriculum: Voice, Systems, Kidinomics, more\n\n💰 Sponsor Investment:\nBronze: ₫3,240,000/quarter (1 cell)\nSilver: ₫9,720,000/quarter (3 cells)\nGold: ₫32,400,000/quarter (10 cells)\n\n📊 What You Get:\n• Real-time cell dashboard\n• Weekly impact report (Fridays)\n• Named sponsorship + recognition\n• Student video highlights (with consent)\n\n📞 Wednesday is a good day to book a call.\nReply "BRIEF" to get the full sponsor deck.`,
        cta: 'Reply "BRIEF"',
        hashtags: [],
        hook: 'The sponsor brief. Fast and clear.',
        visual: 'Clean business brief format',
      },
    },
    teacher: {
      Facebook: {
        headline: '📅 Wednesday Reality: You\'re Halfway Through Another Week That Doesn\'t Respect Your Time',
        body: `Wednesday already.\nYou've taught 15 classes.\nGraded 40+ things.\nHandled one parent complaint.\nAnd your salary is exactly the same as last Wednesday.\n\nSome teachers are doing it differently.\n\nDOWNFLOW Facilitators:\n→ Choose their hours\n→ Run cells of 6–10 (not 40)\n→ Earn per lesson, not per month\n→ Get AI tools, curriculum, support\n\nYou're not underpaid because you're not good.\nYou're underpaid because of the system you're in.`,
        cta: '→ Apply to leave the system',
        hashtags: ['#WednesdayTeacher', '#TeacherBurnout', '#DOWNFLOW', '#FacilitatorLife'],
        hook: 'Wednesday. 15 classes in. Same salary as Monday.',
        visual: 'Calendar with highlighted Wednesday + emotional tone',
      },
      Instagram: {
        headline: 'Halfway through the week. How\'s your energy?',
        body: `Slide 1: "Wednesday. 🗓️"\nSlide 2: "You've given 80% this week already."\nSlide 3: "And you have 2 more days of the same."\nSlide 4: "DOWNFLOW Facilitators run 3–5 sessions per week. Max."\nSlide 5: "Less grind. More impact. Better pay." ✨`,
        cta: '✨ Apply now',
        hashtags: ['#MidweekTeacher', '#FacilitatorLife', '#DOWNFLOW', '#TeacherBurnout'],
        hook: 'Halfway through the week. Still going?',
        visual: 'Energy drain → recharge aesthetic',
      },
      TikTok: {
        headline: 'It\'s Wednesday and teachers are built different 💀',
        body: `[SCRIPT — 20 sec]\n[Relatable teacher humor]\n\n"Wednesday energy for teachers:"\nClip: exhausted but still smiling 😅\n\n"Wednesday energy for DOWNFLOW Facilitators:"\nClip: finishing 2 sessions, opening payout dashboard\n\nText: "Same skills. Different system."\n\nCTA: "Apply as a facilitator → link in bio"`,
        cta: '🔗 Link in bio',
        hashtags: ['#TeacherTikTok', '#WednesdayVibes', '#DOWNFLOW', '#EduTok'],
        hook: 'Same teacher energy. Different results.',
        visual: 'Teacher exhaustion vs facilitator win',
      },
      Telegram: {
        headline: '⚡ Wednesday Boost: Your Facilitator Earnings Calculator',
        body: `Want to know what you'd actually earn?\n\nHere's the math:\n\n📐 1 Learning Cell:\n• Students: 8\n• Lessons per cycle: 18\n• Revenue per lesson: ₫1,080,000\n• Your 35% cut: ₫378,000/lesson\n• Per cycle (18 lessons): ₫6,804,000\n\n📐 2 Cells:\n• ₫13,608,000 per cycle\n• That's ₫4,536,000/month\n\n📐 3 Cells (experienced facilitator):\n• ₫20,412,000 per cycle\n• ~₫6,804,000/month\n\nThis is on top of any other income.\nYou pick your cells. You set your schedule.\n\nReply "CALC" for the full earnings breakdown doc.`,
        cta: 'Reply "CALC"',
        hashtags: [],
        hook: 'What would you actually earn? Here\'s the math.',
        visual: 'Clean earnings calculator format',
      },
    },
    connector: {
      Facebook: {
        headline: '🌐 Wednesday Hustle: How Connectors Scale Past ₫10M/Month',
        body: `It's not complicated.\n\nCell 1: You get paid. 🙂\nCell 2: You get paid more. 😊\nCell 5: You get paid a lot. 😄\nCell 10: You've built a recurring income system. 🤯\n\nDOWNFLOW Connectors earn 25% of every lesson in every cell they form.\n\nThe platform handles payments.\nYou handle connections.\n\nMost active Connectors are in Facebook parent groups.\nSchool announcement pages.\nLocal community boards.\n\nYou're already in those groups.`,
        cta: '→ Start building',
        hashtags: ['#ConnectorHustle', '#ScaleUp', '#DOWNFLOW', '#PassiveIncome'],
        hook: 'You\'re already in the groups. You\'re just not getting paid yet.',
        visual: 'Network growth visualization',
      },
      Instagram: {
        headline: 'The scale play for Connectors.',
        body: `Slide 1: "1 cell = ₫270K/lesson 💰"\nSlide 2: "5 cells = ₫1,350,000/lesson 🔥"\nSlide 3: "10 cells = ₫2,700,000/lesson 🚀"\nSlide 4: "Each cell runs 18 lessons per cycle."\nSlide 5: "Build 10 cells. That's ₫48.6M per cycle. Recurring." 🤯`,
        cta: '🔗 Apply as Connector',
        hashtags: ['#ConnectorScale', '#RecurringIncome', '#DOWNFLOW', '#MathHits'],
        hook: 'The math when you scale as a Connector.',
        visual: 'Income scale visualization — gold numbers',
      },
      TikTok: {
        headline: 'How I run a ₫10M/month income from Facebook parent groups 💀',
        body: `[SCRIPT — 30 sec]\n[Story format, engaging]\n\n"I'm going to be honest with you."\n"I'm in every parent group in my city."\n"And I'm making ₫10M+ a month from it."\n\n"Not spam. Not MLM. Here's how:"\n\n"I find parents who want small group learning for their kid."\n"I connect them with a DOWNFLOW facilitator."\n"I register the cell."\n"I earn 25% of every lesson that runs."\n\n"The group does the learning. I do the connecting. We all win."\n\nCTA: "Connector link → bio"`,
        cta: '🔗 Connector link in bio',
        hashtags: ['#ConnectorTikTok', '#DOWNFLOW', '#ParentGroups', '#PassiveIncome'],
        hook: 'Facebook parent groups → ₫10M/month. Here\'s how.',
        visual: 'Phone showing group + income notification',
      },
      Telegram: {
        headline: '🔗 Wednesday Connector Brief: The Groups That Actually Work',
        body: `Where do the best Connectors find cells?\n\n📍 Top sources:\n\n1. Facebook parent groups (local, by city/district)\n2. School WhatsApp/Zalo parent chats\n3. English learning community groups\n4. Church / community center networks\n5. Private school parent networks\n6. Your own contacts (friends with kids)\n\n📌 Best message to post:\n"Looking for 6–8 families interested in a small group learning experience for kids (8–14). Structured curriculum. Native-quality facilitator. Affordable. DM me if interested."\n\nGet 6 responses? You have a cell.\nRegister it. Earn 25% recurring.\n\nReply "GROUPS" for the full Connector outreach playbook.`,
        cta: 'Reply "GROUPS"',
        hashtags: [],
        hook: 'The best places to find your first cell.',
        visual: 'Sourcing map — telegram list format',
      },
    },
  },

  // ─── THURSDAY: "Deep Dive / Education" ───────────────────────
  Thursday: {
    sponsor: {
      Facebook: {
        headline: '🎓 Thursday Deep Dive: What Is a DOWNFLOW Learning Cell?',
        body: `A Learning Cell is the core unit of DOWNFLOW.\n\n8 students. 1 facilitator. 1 cycle (18 lessons).\n\nWhat happens inside:\n• Lesson 1–3: Foundation skills (listening, response, basics)\n• Lesson 4–9: Core module (Voice, Systems, Kidinomics, etc.)\n• Lesson 10–15: Application — real projects, real presentations\n• Lesson 16–18: Final performance + video submission\n\nEvery lesson: attended, scored, video submitted.\nEvery cycle: full report to sponsor.\n\nThis is not a tutoring centre.\nThis is a structured growth system.`,
        cta: '→ Learn about cells',
        hashtags: ['#LearningCell', '#DOWNFLOW', '#EduSystem', '#ThursdayThoughts'],
        hook: 'What actually happens inside a DOWNFLOW learning cell.',
        visual: '18-lesson arc diagram',
      },
      Instagram: {
        headline: 'Inside a learning cell.',
        body: `Slide 1: "8 students. 1 facilitator. 18 lessons. 1 sponsor." 🏫\nSlide 2: "This is a DOWNFLOW learning cell."\nSlide 3: Lesson arc — Foundation → Core → Application → Performance\nSlide 4: "Each lesson: logged. Videos: submitted. Skills: tracked."\nSlide 5: "Your name on it. Your impact in it." 💼`,
        cta: '💼 Sponsor a cell',
        hashtags: ['#LearningCell', '#DOWNFLOW', '#EducationDesign', '#SponsorACell'],
        hook: 'This is what you\'re actually funding.',
        visual: 'Clean cell anatomy diagram — navy + gold',
      },
      TikTok: {
        headline: 'This is what a DOWNFLOW learning cell looks like from the inside',
        body: `[SCRIPT — 40 sec]\n[Screen tour / walkthrough style]\n\n"Let me show you exactly what happens when you sponsor a cell."\n\nOpen dashboard → Cell VN-07\n→ 8 students enrolled\n→ Week 4 of 18\n→ Today's session: "Story Structure — 60-second format"\n→ 7/8 students submitted videos\n→ Facilitator score: 4.9/5\n\n"This is live. This is real."\n"You funded this."\n"₫1,080,000 a month."\n"One cell. One dashboard. Real kids growing."\n\nCTA: "Sponsor link → bio"`,
        cta: '🔗 Sponsor link in bio',
        hashtags: ['#DOWNFLOW', '#SponsorACell', '#EdTech', '#ThursdayBiz'],
        hook: 'Live dashboard walkthrough of a sponsored cell.',
        visual: 'Screen tour of dashboard — high clarity',
      },
      Telegram: {
        headline: '📚 Thursday Education: The 6 Curriculum Packs You\'re Funding',
        body: `When you sponsor a cell, the facilitator chooses from 6 core packs:\n\n📦 Voice & Presence — Public speaking, storytelling, command\n📦 Kidinomics — Money, value, entrepreneurial thinking\n📦 Systems Thinking — Logic, cause-effect, problem architecture\n📦 Emotional Intelligence — Empathy, conflict, self-regulation\n📦 Creative Media — Video production, scripting, presenting\n📦 Community Leadership — Initiative, group dynamics, ethics\n\nEach pack: 6 lessons.\nStudents complete 3 packs per cycle.\nThat's 18 lessons. Fully structured. Fully tracked.\n\nYour sponsorship funds whichever pack the cell runs.\nYou see the pack, the progress, and the outputs.\n\nReply "PACKS" to get the full curriculum overview.`,
        cta: 'Reply "PACKS"',
        hashtags: [],
        hook: 'The 6 curriculum packs. What they are. What they build.',
        visual: 'Pack grid — 6 boxes with descriptions',
      },
    },
    teacher: {
      Facebook: {
        headline: '🧭 Thursday for Teachers: The Facilitator Model Explained',
        body: `Here's how it actually works:\n\n1. You apply. We review your profile.\n2. You get onboarded — 2 hours of system training.\n3. You get matched with a cell (or you form your own).\n4. You receive the pack. You read the scripts. You prep.\n5. You run 3 sessions per week. Each: 60–90 minutes.\n6. Students submit videos. You give feedback.\n7. Every Friday: your earnings hit your wallet.\n\nWeekly earnings from 1 cell: ₫378,000–₫630,000/week\n(scales as you earn trust levels)\n\nYou can hold 1–3 cells simultaneously.\n\nThis is a system. Not a side hustle.`,
        cta: '→ Apply as Facilitator',
        hashtags: ['#FacilitatorModel', '#DOWNFLOW', '#ThursdayTeacher', '#EduBiz'],
        hook: 'Step by step: how the Facilitator model actually works.',
        visual: '7-step facilitator journey flowchart',
      },
      Instagram: {
        headline: 'This is what being a DOWNFLOW Facilitator actually looks like.',
        body: `Slide 1: "Apply. Onboard. Match. Guide." 🧭\nSlide 2: "3 sessions/week. 60–90 min each."\nSlide 3: "AI assistant helps with every session."\nSlide 4: "Students submit videos. You give feedback."\nSlide 5: "Friday: your earnings hit your wallet. Every week." 💸`,
        cta: '🧭 Apply now',
        hashtags: ['#FacilitatorLife', '#DOWNFLOW', '#ThursdayMotivation', '#TeacherToFacilitator'],
        hook: 'The week in the life of a DOWNFLOW Facilitator.',
        visual: 'Week timeline — clean, professional',
      },
      TikTok: {
        headline: 'A week as a DOWNFLOW Facilitator (real breakdown)',
        body: `[SCRIPT — 35 sec]\n[Day-in-the-life format]\n\n"Monday: Check my session pack. AI helps me prep. 20 min."\n"Tuesday: Session 1. 8 students. 60 min. They present."\n"Wednesday: Review video submissions. Give feedback."\n"Thursday: Session 2. We go deeper. One kid nails it."\n"Friday: Session 3. I log it. Payout processes."\n"Saturday: ₫378,000 in my wallet. From this cell alone."\n"I have 2 cells."\n\nCTA: "Apply → link in bio"`,
        cta: '🔗 Apply → link in bio',
        hashtags: ['#FacilitatorWeek', '#DOWNFLOW', '#EduTok', '#DayInTheLife'],
        hook: 'A real week as a DOWNFLOW Facilitator.',
        visual: 'Day-by-day calendar style',
      },
      Telegram: {
        headline: '🧭 Thursday Facilitator FAQ: Your Top 5 Questions Answered',
        body: `Questions we get every week:\n\n❓ "Do I need a teaching degree?"\n✅ No. You need communication skills, reliability, and a love of guiding.\n\n❓ "How many hours per week?"\n✅ 1 cell = ~5–6 hours/week (3 sessions + admin)\n\n❓ "What if a student doesn't show up?"\n✅ Cell funds are protected. Makeup sessions handled by the system.\n\n❓ "Can I work abroad and facilitate online?"\n✅ Yes. All sessions can be run online via video call.\n\n❓ "How fast do I get paid?"\n✅ Every Friday. Auto-processed. No chasing anyone.\n\nMore questions? Reply "FAQ" for the full guide.`,
        cta: 'Reply "FAQ"',
        hashtags: [],
        hook: '5 real questions about being a DOWNFLOW Facilitator.',
        visual: 'Q&A format — telegram clean',
      },
    },
    connector: {
      Facebook: {
        headline: '🔗 Thursday: What Makes a Great Connector? (It\'s Not What You Think)',
        body: `It's not about having a big network.\nIt's not about being a salesperson.\nIt's not about being in education.\n\nThe best Connectors are:\n✅ Parents who understand what other parents want\n✅ Community leaders who are already trusted\n✅ Teachers who know families in their school\n✅ Freelancers looking for recurring income\n✅ Anyone who loves connecting people\n\nThe skill isn't sales.\nIt's listening.\n\n"What does your kid struggle with?"\n"Have you heard of DOWNFLOW?"\n"I can help you get them into a cell."\n\nThat's it. That's the job.`,
        cta: '→ Become a Connector',
        hashtags: ['#ConnectorLife', '#DOWNFLOW', '#ThursdayTruth', '#NetworkIncome'],
        hook: 'Great Connectors are listeners. Not salespeople.',
        visual: 'Community trust visual — warm + professional',
      },
      Instagram: {
        headline: 'You don\'t need a big network. You need 6 parents.',
        body: `Slide 1: "Building income through connections." 🔗\nSlide 2: "You don't need 1000 followers."\nSlide 3: "You need 6 parents who want something better for their kid."\nSlide 4: "Connect them. Register the cell. Earn 25% forever."\nSlide 5: "6 people. That's your first cell. That's your first income." ✅`,
        cta: '🔗 Apply as Connector',
        hashtags: ['#ConnectorSimple', '#DOWNFLOW', '#6Families', '#RecurringIncome'],
        hook: 'You don\'t need a big network. You need 6 families.',
        visual: 'Minimal — 6 dots forming a circle',
      },
      TikTok: {
        headline: 'What if your WhatsApp groups could make you money? 💀',
        body: `[SCRIPT — 25 sec]\n[Stitch / React format]\n\nText: "How many WhatsApp/Zalo group chats are you in?"\n\n[Comment replies: "40", "22", "I stopped counting"]\n\nVO: "Right. And how many of those are parent groups?"\n\nText: "Every parent group is a potential learning cell."\n\n"DOWNFLOW Connectors form cells from parent groups."\n"Earn 25% of every lesson that runs."\n"6 families. ₫270,000/lesson. Recurring."\n\nCTA: "Connector program → link in bio"`,
        cta: '🔗 Link in bio',
        hashtags: ['#ConnectorTikTok', '#WhatsAppGroups', '#DOWNFLOW', '#PassiveIncome'],
        hook: 'Your WhatsApp groups could literally pay you.',
        visual: 'Phone notification style',
      },
      Telegram: {
        headline: '📡 Thursday Connector Training: The Perfect Cell Pitch',
        body: `Here's the script that works:\n\n━━━━━━━━━━━━━━━━━━━━━━\n📩 Message to send parents:\n━━━━━━━━━━━━━━━━━━━━━━\n\n"Hi [Name], I know your kids are around [age]. I'm forming a small learning group (6–8 kids) focused on communication skills, creative thinking, and real-world confidence. It's run through DOWNFLOW — small group format, experienced facilitator, structured curriculum.\n\nInterested in learning more? I can send you a quick overview."\n\n━━━━━━━━━━━━━━━━━━━━━━\n\nThat's it. No pressure. No pitch. Just a question.\n\nMost Connectors get 60–70% response rates from parents they know.\n\nReply "SCRIPT" for 5 more message templates.`,
        cta: 'Reply "SCRIPT"',
        hashtags: [],
        hook: 'The exact message that forms cells.',
        visual: 'Message template format',
      },
    },
  },

  // ─── FRIDAY: "Win & Celebrate" ────────────────────────────────
  Friday: {
    sponsor: {
      Facebook: {
        headline: '🎉 Friday Report: Your Cell This Week',
        body: `It's Friday — and if you're a DOWNFLOW sponsor, this is the best email of your week.\n\nThis week across all active cells:\n📹 847 student videos submitted\n🏫 124 sessions completed\n⭐ Average facilitator score: 4.7/5\n👩‍🎓 63 students completed their first public performance\n\nBehind each number: a real kid who did something real.\n\nAnd behind each cell: a sponsor who made it possible.\n\n"The most important investment you'll make this quarter isn't in marketing. It's in the next generation."`,
        cta: '→ Sponsor a new cell before Monday',
        hashtags: ['#FridayFeeling', '#ImpactReport', '#DOWNFLOW', '#SponsorImpact'],
        hook: 'Friday report: what happened in your cell this week.',
        visual: 'Stats dashboard — warm gold tones for Friday',
      },
      Instagram: {
        headline: 'Friday wins.',
        body: `Slide 1: "Friday. 🎉"\nSlide 2: "847 student videos submitted this week."\nSlide 3: "63 first public performances. Real students. Real courage."\nSlide 4: "Each one: sponsored by a business that chose to invest."\nSlide 5: "Be that business." 💼`,
        cta: '💼 Sponsor now',
        hashtags: ['#FridayWins', '#DOWNFLOW', '#SponsorImpact', '#StudentWins'],
        hook: 'Friday wins. These are real.',
        visual: 'Gold celebration aesthetic — student achievement',
      },
      TikTok: {
        headline: 'It\'s Friday and 63 kids just gave their first public speech this week',
        body: `[SCRIPT — 25 sec]\n[Emotional + inspiring format]\n\nVO: "It's Friday. Know what that means at DOWNFLOW?"\n\nCut to: student recording a 60-second speech on phone\nCut to: facilitator giving thumbs up in session\nCut to: dashboard showing 7/8 submissions ✅\n\n"63 students. First public performance. This week."\n"Sponsored by businesses who chose impact over logos."\n\n"Be one of them."\n\nCTA: "Sponsor a cell → link in bio"`,
        cta: '🔗 Sponsor link in bio',
        hashtags: ['#FridayMotivation', '#DOWNFLOW', '#StudentWins', '#SponsorACell'],
        hook: 'It\'s Friday. 63 kids just gave their first speech.',
        visual: 'Student performance footage — emotional',
      },
      Telegram: {
        headline: '🎉 Friday Impact Drop — Platform-Wide Stats',
        body: `Every Friday we publish the platform-wide weekly summary:\n\n📊 This Week:\n✅ Sessions completed: 124\n📹 Videos submitted: 847\n👨‍🏫 Active facilitators: 38\n🏫 Active cells: 52\n⭐ Platform avg facilitator score: 4.7/5\n💰 Total payout processed: ₫47,300,000\n\nThis is what your sponsorship looks like at scale.\n1 sponsor funds 1 cell.\n52 sponsors = this.\n\nWant your company on next Friday's report?\nReply "FRIDAY" to get the sponsor brief.`,
        cta: 'Reply "FRIDAY"',
        hashtags: [],
        hook: 'Friday platform stats. The numbers are real.',
        visual: 'Weekly stats drop — telegram clean format',
      },
    },
    teacher: {
      Facebook: {
        headline: '💸 It\'s Friday. DOWNFLOW Facilitators Just Got Paid.',
        body: `Every Friday, automated payouts hit facilitator wallets.\n\nNo invoicing.\nNo chasing.\nNo "payment is processing" nonsense.\n\nYou ran your sessions.\nStudents submitted their videos.\nThe system calculates your percentage.\nFriday: it hits your account.\n\nThat's how it works.\n\n"I don't think about money anymore. I think about session quality. The money follows." — DOWNFLOW Facilitator, VN-03`,
        cta: '→ Apply to be a Facilitator',
        hashtags: ['#FridayPayday', '#FacilitatorLife', '#DOWNFLOW', '#TeacherIncome'],
        hook: 'Friday paydays. Automatic. Every week.',
        visual: 'Wallet notification + celebration',
      },
      Instagram: {
        headline: 'Friday is payday. Every week.',
        body: `Slide 1: "It's Friday. 💸"\nSlide 2: "DOWNFLOW Facilitators just got paid."\nSlide 3: "Automatic. No invoice. No waiting."\nSlide 4: "This week, this month, every cycle."\nSlide 5: "Apply now. Your first payday is closer than you think." ✅`,
        cta: '🧭 Apply as Facilitator',
        hashtags: ['#FridayPayday', '#DOWNFLOW', '#FacilitatorLife', '#AutoPayout'],
        hook: 'Friday. Payout. Automatic. Every week.',
        visual: 'Phone + wallet animation — payday aesthetic',
      },
      TikTok: {
        headline: 'DOWNFLOW Facilitators on Friday 💸 (no, this is real)',
        body: `[SCRIPT — 20 sec]\n[Relatable money moment]\n\n[Trending audio: something celebratory]\n\nPhone screen: wallet notification "₫756,000 received — DOWNFLOW Weekly Payout"\n\n"2 cells. 6 sessions this week. That's it."\n"₫756,000 for a Friday."\n"Next week: same."\n"The week after: same."\n\n"Want in? Apply → link in bio."`,
        cta: '🔗 Apply → link in bio',
        hashtags: ['#FridayPaycheck', '#FacilitatorLife', '#DOWNFLOW', '#EduTok'],
        hook: 'Friday notification: ₫756,000. DOWNFLOW payout.',
        visual: 'Phone wallet notification close-up',
      },
      Telegram: {
        headline: '💰 Friday Payout Processed — Facilitator System Update',
        body: `✅ Weekly payouts processed.\n\nAll active facilitators for cycles Week 1–4:\n• Base rate (Level 1): 35% of lessons completed\n• Elevated rate (Level 2): 40% — for 4+ weeks of 4.5+ scores\n• Senior rate (Level 3): 45% — for full cycle top performers\n\nEarnings this cycle range from ₫6,804,000 to ₫12,150,000 per cell.\n\nNot a facilitator yet?\nYou could be earning by the end of next week.\n\nReply "APPLY" to start your application.`,
        cta: 'Reply "APPLY"',
        hashtags: [],
        hook: 'Payout day. Here\'s how earnings scale.',
        visual: 'Earnings tier breakdown — clean',
      },
    },
    connector: {
      Facebook: {
        headline: '🔗 Friday: Connectors Get Paid Too.',
        body: `Every lesson that ran this week in a cell you formed?\nYou got 25% of it.\n\nYou didn't run the session.\nYou didn't create the curriculum.\nYou didn't manage the students.\n\nYou connected the pieces once.\nAnd the system paid you. Again.\n\nConnectors who formed 5+ cells this quarter:\nAverage weekly income from DOWNFLOW: ₫1,350,000–₫2,700,000\n\nThat's ₫5.4M–₫10.8M per month.\nFrom connections you made weeks or months ago.\n\n"I formed my first cell in January. I'm still earning from it." — DOWNFLOW Connector`,
        cta: '→ Form your first cell',
        hashtags: ['#ConnectorPay', '#PassiveIncome', '#DOWNFLOW', '#FridayMoney'],
        hook: 'Your cells ran this week. You just got paid.',
        visual: 'Past connections → current earnings timeline',
      },
      Instagram: {
        headline: 'Friday. 5 cells. 1 payout.',
        body: `Slide 1: "It's Friday. 🔗"\nSlide 2: "5 cells I formed. Running all week."\nSlide 3: "I didn't do anything this week for them."\nSlide 4: "But I still got paid."\nSlide 5: "₫1,350,000. Automatic. That's the Connector model." 💚`,
        cta: '🔗 Apply as Connector',
        hashtags: ['#ConnectorLife', '#PassiveIncome', '#DOWNFLOW', '#FridayWin'],
        hook: 'I did nothing this week. I still got paid.',
        visual: 'Passive income aesthetic — clean, minimal',
      },
      TikTok: {
        headline: 'Friday passive income check 💀 (Connector edition)',
        body: `[SCRIPT — 20 sec]\n[Money check format]\n\n"Let me show you my Friday DOWNFLOW payout."\n\nPhone: ₫1,350,000 — Connector share — 5 cells × 2 lessons each\n\n"I formed these cells in Q1."\n"It's now Q2."\n"I'm still earning from them."\n\n"Build it once. Earn from it for months."\n"Apply → link in bio."`,
        cta: '🔗 Link in bio',
        hashtags: ['#PassiveIncomeTikTok', '#ConnectorPay', '#DOWNFLOW', '#FridayMoney'],
        hook: 'Checking Friday payout from cells I built months ago.',
        visual: 'Phone wallet screenshot — real looking',
      },
      Telegram: {
        headline: '📡 Friday Connector Payout Summary',
        body: `✅ Connector payouts processed.\n\nActive cell summary this week:\n\n🔗 Connectors with 1 cell: avg ₫270,000/week\n🔗 Connectors with 3 cells: avg ₫810,000/week\n🔗 Connectors with 5 cells: avg ₫1,350,000/week\n🔗 Connectors with 10 cells: avg ₫2,700,000/week\n\nAll payouts are automatic.\nAll cells continue to earn for as long as they run.\n\nIf your cell didn't run a session this week, no payout — but the cell continues next week.\nYour 25% is permanent for every cell you form.\n\nReply "CELLS" to see how to form your next cell this weekend.`,
        cta: 'Reply "CELLS"',
        hashtags: [],
        hook: 'Friday payout breakdown for Connectors.',
        visual: 'Tiered payout summary',
      },
    },
  },

  // ─── SATURDAY: "Weekend Energy / Lifestyle" ───────────────────
  Saturday: {
    sponsor: {
      Facebook: {
        headline: '☀️ Saturday: The Best CSR Decision You\'ll Make This Weekend',
        body: `It's Saturday. You have 3 minutes.\n\nHere's what funding a learning cell looks like:\n\n☕ Morning: You see an email. A student in your cell just completed their first video submission.\n📊 Afternoon: You check the dashboard. Attendance: 8/8 this week.\n📋 Evening: Friday report hit your inbox. Score: 4.8/5.\n\nYou didn't have to do anything.\nBut a kid's life is measurably better.\n\nFrom ₫3,240,000 per quarter.\nLess than a team dinner.`,
        cta: '→ Fund a cell this weekend',
        hashtags: ['#SaturdayMorning', '#CSR', '#DOWNFLOW', '#WeekendDecision'],
        hook: 'Saturday morning. Read this. Fund a cell today.',
        visual: 'Weekend morning coffee + dashboard aesthetic',
      },
      Instagram: {
        headline: 'Your best decision this Saturday.',
        body: `Slide 1: "Saturday morning. ☀️"\nSlide 2: "Most CEOs are making this weekend's decisions right now."\nSlide 3: "One good one: fund a learning cell."\nSlide 4: "₫3,240,000/quarter. 8 students. Full reporting."\nSlide 5: "Better than a team dinner. More impact than a billboard." 💼`,
        cta: '💼 Fund a cell',
        hashtags: ['#SaturdayBoss', '#CSRweekend', '#DOWNFLOW', '#ImpactDecision'],
        hook: 'Saturday decision: fund something that lasts.',
        visual: 'Weekend CEO aesthetic — clean, aspirational',
      },
      TikTok: {
        headline: 'CEOs and business owners: watch this on a Saturday morning',
        body: `[SCRIPT — 30 sec]\n[Direct address, calm energy]\n\n"It's Saturday. You've got a few minutes."\n\n"I want to talk about your CSR budget."\n\n"What if ₫3,240,000 — less than a team dinner —"\n"could put 8 students through 18 structured lessons?"\n\n"Real facilitator. Real curriculum. Real dashboard."\n"You see everything. Every week."\n\n"Monday through Friday: the cell runs."\n"Friday: you get the report."\n"Saturday: you see the impact."\n\n"Ready?"\n\nCTA: "Sponsor brief → link in bio"`,
        cta: '🔗 Sponsor brief → link in bio',
        hashtags: ['#SaturdayCEO', '#DOWNFLOW', '#ImpactCSR', '#BusinessWeekend'],
        hook: 'Saturday morning message to business owners.',
        visual: 'Calm, direct to camera — premium feel',
      },
      Telegram: {
        headline: '☀️ Weekend Brief: Fund a Cell Before Monday',
        body: `If you've been thinking about it — now's the time.\n\nDOWNFLOW Sponsorship tiers:\n\n🥉 Bronze — ₫3,240,000/quarter\n1 learning cell. 8 students. Full dashboard. Weekly report.\n\n🥈 Silver — ₫9,720,000/quarter\n3 learning cells. Priority support. Named sponsor recognition.\n\n🥇 Gold — ₫32,400,000/quarter\n10 cells. Dedicated account manager. Custom impact report. Co-branding.\n\n⚡ Platinum — Custom\nRegion-wide cells. Content partnership. Executive reporting.\n\nAll tiers: full transparency. No fluff.\n\nStart before Monday. Reply "START" to get the onboarding doc.`,
        cta: 'Reply "START"',
        hashtags: [],
        hook: 'Weekend window: choose your tier.',
        visual: 'Sponsor tier breakdown — clean table format',
      },
    },
    teacher: {
      Facebook: {
        headline: '😌 Saturday: Imagine Not Dreading Monday.',
        body: `Saturday morning.\n\nFor most teachers, it's nice — until around 4pm when the Sunday dread starts warming up.\n\nDOWNFLOW Facilitators describe their Saturdays differently:\n\n"I planned next week's session in 20 minutes. AI helped."\n"I reviewed 3 student videos over coffee."\n"My Friday payout was ₫756,000. From 2 cells."\n"Monday is just... another good day."\n\nThat shift is possible.\nNot because the work disappeared.\nBecause the system changed.`,
        cta: '→ Apply as Facilitator',
        hashtags: ['#SaturdayTeacher', '#DOWNFLOW', '#NoMoreSundayDread', '#FacilitatorLife'],
        hook: 'Saturday without Sunday dread. It\'s real.',
        visual: 'Relaxed weekend morning — warm lighting',
      },
      Instagram: {
        headline: 'Facilitators: this is your Saturday.',
        body: `Slide 1: "Saturday morning. ☀️ No Sunday dread."\nSlide 2: "You planned next week in 20 min with AI."\nSlide 3: "You checked 3 student videos over coffee."\nSlide 4: "₫756,000 landed Friday. Automatic."\nSlide 5: "This is the facilitator life. Apply now." 🧭`,
        cta: '🧭 Apply as Facilitator',
        hashtags: ['#FacilitatorSaturday', '#DOWNFLOW', '#TeacherLife', '#WeekendWin'],
        hook: 'A Saturday without Sunday dread. This is the model.',
        visual: 'Cozy Saturday morning — warm + inviting',
      },
      TikTok: {
        headline: 'Teacher Saturday vs DOWNFLOW Facilitator Saturday 👀',
        body: `[SCRIPT — 20 sec]\n[Side-by-side format]\n\nLeft: "Teacher Saturday"\n→ Grading 30 essays 📚\n→ Lesson plans for Monday 😩\n→ WhatsApp from parent 💀\n\nRight: "DOWNFLOW Facilitator Saturday"\n→ Coffee ☕\n→ Review 3 videos (20 min)\n→ Payout: ₫756,000 💸\n→ Done by 10am ✅\n\n"Same skills. Different system."\n\nCTA: "Apply → link in bio"`,
        cta: '🔗 Apply → link in bio',
        hashtags: ['#TeacherSaturday', '#DOWNFLOW', '#FacilitatorLife', '#SameSkillsDifferentSystem'],
        hook: 'Teacher Saturday vs. Facilitator Saturday. The difference is real.',
        visual: 'Split-screen comparison — humor + truth',
      },
      Telegram: {
        headline: '📚 Saturday Reading: The Full Facilitator Onboarding Guide',
        body: `For teachers considering the move — here's the full onboarding timeline:\n\n📅 Week 1: Application + profile review (2–3 days)\n📅 Week 2: System onboarding — 2-hour online session\n• Platform walkthrough\n• Pack preview — read your first lesson scripts\n• AI assistant demo\n• Payment setup\n\n📅 Week 3: Cell match — we assign or you form\n📅 Week 4: First session. First lesson. First video reviewed.\n📅 End of Week 4: First payout. ✅\n\nTotal time from application to first earning: ~3 weeks.\n\nReply "ONBOARD" for the application form.`,
        cta: 'Reply "ONBOARD"',
        hashtags: [],
        hook: 'From application to first payout: 3 weeks.',
        visual: 'Timeline checklist format',
      },
    },
    connector: {
      Facebook: {
        headline: '🌤️ Saturday: Perfect Day to Form Your First Cell',
        body: `Why Saturday?\n\nBecause parents are relaxed.\nThey're not in work mode.\nThey're thinking about their kids' weekend.\n\nThis is the perfect moment to start a conversation:\n\n"Hey [Name], I've been looking at this learning program for kids. Small group, really structured, focused on communication and life skills. Thinking of forming a group. Is [kid's name] around that age?"\n\nSoft. Curious. No pitch.\n\nGet 6 yeses → you have a cell.\nRegister it Monday.\nEarn from it for months.`,
        cta: '→ Become a Connector',
        hashtags: ['#SaturdayConnector', '#DOWNFLOW', '#WeekendNetworking', '#PassiveIncome'],
        hook: 'Saturday is the best day to start your first cell.',
        visual: 'Weekend casual networking visual',
      },
      Instagram: {
        headline: 'Start a cell this weekend.',
        body: `Slide 1: "Saturday. ☀️ 6 conversations. 1 cell."\nSlide 2: "Message parents you already know."\nSlide 3: "Soft ask. No pitch. Just: 'is your kid interested?'"\nSlide 4: "Get 6 yeses → cell formed."\nSlide 5: "Register Monday. Earn from it for months." 🔗`,
        cta: '🔗 Apply as Connector',
        hashtags: ['#SaturdayHustle', '#ConnectorLife', '#DOWNFLOW', '#StartThisWeekend'],
        hook: '6 conversations. 1 cell. Start this Saturday.',
        visual: 'Weekend parent chat aesthetic',
      },
      TikTok: {
        headline: 'Spending Saturday building passive income from WhatsApp 💀',
        body: `[SCRIPT — 25 sec]\n[Casual Saturday vibe]\n\n"It's Saturday morning. I'm in my PJs."\n"I'm sending messages to 8 parents in my contact list."\n"Nothing spammy. Just:"\n\nText on screen: "Hey [Name], forming a small learning group for kids. 6–8 students. Interested?"\n\n"By noon: 6 yeses."\n"That's a cell."\n"Register it Monday."\n"By next Friday: first payout processing."\n\n"Weekend productivity, Connector edition."\n\nCTA: "Apply → link in bio"`,
        cta: '🔗 Apply → link in bio',
        hashtags: ['#SaturdayHustle', '#ConnectorTikTok', '#DOWNFLOW', '#WeekendMoney'],
        hook: 'Building a cell from my PJs on Saturday morning.',
        visual: 'Casual home environment — authentic',
      },
      Telegram: {
        headline: '📡 Saturday Connector Challenge: Form 1 Cell This Weekend',
        body: `Weekend mission for Connectors:\n\n🎯 Goal: Form 1 cell by Sunday night.\n\n📋 The checklist:\n\n☐ Message 10 parents you know. Use the soft script from Thursday's brief.\n☐ Follow up with anyone who responded positively last week.\n☐ Check the Facilitator board — pick a facilitator you like.\n☐ Set up an intro call between parents + facilitator (30 min)\n☐ Confirm 6+ students committed\n☐ Submit cell registration form (link below)\n\n✅ Cell registered = you're earning from Monday.\n\nEveryone who forms a cell this weekend gets a Priority Connector badge and double recognition on the platform for the first cycle.\n\nReply "WEEKEND" for the registration link.`,
        cta: 'Reply "WEEKEND"',
        hashtags: [],
        hook: 'Weekend challenge: form 1 cell by Sunday.',
        visual: 'Challenge checklist — motivating format',
      },
    },
  },

  // ─── SUNDAY: "Reflect & Inspire" ─────────────────────────────
  Sunday: {
    sponsor: {
      Facebook: {
        headline: '🌙 Sunday Reflection: What Are You Building That Outlasts Your Business?',
        body: `Sunday question.\n\nYour business creates value.\nYour products solve problems.\nYour team builds things.\n\nBut 20 years from now — what will you point to that matters beyond revenue?\n\nDOWNFLOW sponsors don't just fund lessons.\nThey fund the first time a kid speaks with confidence.\nThe first time a teenager understands how systems work.\nThe first time a child earns something because of a skill they built.\n\nThat's not charity.\nThat's legacy.\n\n"Your brand on a cell. Their story for a lifetime."`,
        cta: '→ Start your legacy',
        hashtags: ['#SundayThoughts', '#Legacy', '#DOWNFLOW', '#ImpactBusiness'],
        hook: 'What are you building that outlasts your business?',
        visual: 'Reflection aesthetic — deep blue, quiet, meaningful',
      },
      Instagram: {
        headline: 'Legacy over logo.',
        body: `Slide 1: "Sunday. 🌙 What are you building?"\nSlide 2: "A logo on a wall fades."\nSlide 3: "A child who learned to speak, think, and earn — doesn't."\nSlide 4: "DOWNFLOW sponsors build legacies, not just marketing."\nSlide 5: "Be a legacy sponsor." 💼`,
        cta: '💼 Legacy sponsorship',
        hashtags: ['#SundayInspiration', '#Legacy', '#DOWNFLOW', '#SponsorImpact'],
        hook: 'Legacy. Not logo. That\'s the difference.',
        visual: 'Inspirational — child achievement, golden tones',
      },
      TikTok: {
        headline: 'Why do businesses sponsor education? The real answer.',
        body: `[SCRIPT — 35 sec]\n[Thoughtful, cinematic tone]\n\nVO: "Most companies say they sponsor education for CSR."\n"A few do it for the marketing."\n"The best ones do it because..."\n\n*pause*\n\n"They remember someone who invested in them."\n"A teacher. A mentor. A program."\n"And they want to be that for someone else."\n\nCut to: Student giving their first speech.\nCut to: Facilitator watching with pride.\nCut to: Dashboard — sponsor name attached to the cell.\n\n"Be the reason a kid has a different story."\n\nCTA: "Sponsor a cell → link in bio"`,
        cta: '🔗 Sponsor link in bio',
        hashtags: ['#SundayStory', '#DOWNFLOW', '#WhyWeSponsor', '#ImpactFirst'],
        hook: 'Why the best businesses sponsor education.',
        visual: 'Cinematic — emotional, high quality',
      },
      Telegram: {
        headline: '🌙 Sunday Message to Business Leaders',
        body: `Something worth thinking about on a Sunday:\n\nThe companies that are remembered — not just profitable — are the ones that invested in people.\n\nNot abstractly. Specifically.\n\nThey funded a program.\nThey supported a teacher.\nThey gave a kid a real shot.\n\nDOWNFLOW is built for that.\n\nEvery cell you fund is specific:\n• This facilitator. This group. These students.\n• This report. This impact. Your name on it.\n\nIf there's a legacy decision to make this quarter — this is it.\n\nReply "LEGACY" to receive the sponsor commitment document.`,
        cta: 'Reply "LEGACY"',
        hashtags: [],
        hook: 'Sunday. Legacy decisions. This is one.',
        visual: 'Sunday reflection format — thoughtful prose',
      },
    },
    teacher: {
      Facebook: {
        headline: '🌙 Sunday for Teachers: You Deserve More Than Dread.',
        body: `If you're feeling it right now — that Sunday weight — I want you to know something.\n\nIt's not weakness.\nIt's the natural result of a system that takes more than it gives.\n\n40 students. Zero support. Minimal pay.\nYou give everything. The system gives back almost nothing.\n\nDOWNFLOW Facilitators work in a different system:\n→ Smaller groups. More impact.\n→ Better tools. Better pay.\n→ A Friday that feels like a win.\n\nYou already have what it takes.\nYou just need a system that deserves it.`,
        cta: '→ Apply as Facilitator',
        hashtags: ['#SundayTeacher', '#DOWNFLOW', '#TeacherBurnout', '#FacilitatorLife'],
        hook: 'Sunday dread for teachers. There\'s a different way.',
        visual: 'Sunday evening — quiet, honest, supportive tone',
      },
      Instagram: {
        headline: 'You deserve a Sunday without dread.',
        body: `Slide 1: "Sunday evening. 🌙"\nSlide 2: "You're not broken. The system is."\nSlide 3: "40 students. No support. Same salary."\nSlide 4: "DOWNFLOW: 6–10 students. Real tools. Weekly pay."\nSlide 5: "Apply today. Your first Sunday without dread is possible." ✨`,
        cta: '✨ Apply now',
        hashtags: ['#SundayTeacher', '#DOWNFLOW', '#YouDeserveMore', '#FacilitatorLife'],
        hook: 'Your Sunday dread isn\'t you. It\'s the system.',
        visual: 'Quiet Sunday evening — warm, supportive',
      },
      TikTok: {
        headline: 'To every teacher feeling it on Sunday evening 🌙',
        body: `[SCRIPT — 25 sec]\n[Direct, empathetic tone]\n\n"To every teacher feeling that Sunday weight right now —"\n\n"It's not because you're not good enough."\n"It's because the system wasn't built for you."\n\n"40 students. No AI support. Same pay as 2015."\n\n"There's a different model."\n"Smaller groups. Real curriculum. Friday payouts."\n\n"You already have everything it takes."\n"You just need a system that's worth it."\n\nCTA: "Apply as Facilitator → link in bio"`,
        cta: '🔗 Link in bio',
        hashtags: ['#TeacherSunday', '#DOWNFLOW', '#EduTok', '#TeacherBurnout'],
        hook: 'To every teacher with Sunday dread right now.',
        visual: 'Calm, direct to camera — Sunday night vibe',
      },
      Telegram: {
        headline: '🌙 Sunday for Facilitators: Prep in 20 Minutes with AI',
        body: `For current DOWNFLOW Facilitators — your Sunday just got lighter.\n\nAI Session Prep (new feature):\n\n1. Open the AI assistant in your dashboard\n2. Select your pack + lesson number\n3. Hit "Generate Session Plan"\n4. Review → adapt → done\n\nTypical prep time: 15–25 minutes.\n\nThe AI generates:\n• Opening hook (student attention grab)\n• 3-part lesson structure\n• Group discussion prompts\n• Video assignment brief\n• Facilitator notes for common pitfalls\n\nSunday prep done before 9pm.\nMonday confident.\n\nNot a facilitator yet? Reply "APPLY" to start.`,
        cta: 'Reply "APPLY"',
        hashtags: [],
        hook: 'AI session prep. Sunday done in 20 minutes.',
        visual: 'AI assistant walkthrough — calm Sunday tone',
      },
    },
    connector: {
      Facebook: {
        headline: '🌙 Sunday: Review Your Cells. Plan Your Next One.',
        body: `Sunday is a great day to look at the bigger picture.\n\nIf you're a DOWNFLOW Connector:\n→ How many cells are active right now?\n→ Which ones are in their last 3 lessons? (time to start recruiting the next group)\n→ Are there facilitators who want more cells?\n→ Which parent groups haven't you posted in yet?\n\nActive Connectors don't hustle every day.\nThey build systems.\nThey check on Sundays.\nThey plant seeds on weekdays.\n\nThe income runs by itself.\nBut a Sunday check-in keeps it growing.`,
        cta: '→ Become a Connector',
        hashtags: ['#SundayConnector', '#DOWNFLOW', '#PassiveIncome', '#SystemBuilding'],
        hook: 'Sunday Connector review. This is how you scale.',
        visual: 'Sunday strategy aesthetic — calm, purposeful',
      },
      Instagram: {
        headline: 'Sunday connector check-in.',
        body: `Slide 1: "Sunday. Time to check in. 🌙"\nSlide 2: "Active cells: how many?"\nSlide 3: "Cells ending soon: recruit the next batch."\nSlide 4: "Untouched groups: where's your next cell coming from?"\nSlide 5: "Build once. Review weekly. Earn forever." 🔗`,
        cta: '🔗 Start your first cell',
        hashtags: ['#SundayStrategy', '#ConnectorLife', '#DOWNFLOW', '#SystemThinking'],
        hook: 'Sunday check-in. This is how Connectors scale.',
        visual: 'Strategy board aesthetic — connector network',
      },
      TikTok: {
        headline: 'Sunday Connector check-in — how I manage 8 cells in 30 min 🔗',
        body: `[SCRIPT — 30 sec]\n[Productivity / systems format]\n\n"Sunday morning. Coffee. 30 minutes. Here's my Connector check-in."\n\nOpen dashboard →\n→ 8 active cells ✅\n→ Cell VN-04: ending in 2 weeks → start recruiting next batch\n→ Cell VN-11: 100% attendance this week 🔥\n→ New payout pending: ₫2,160,000\n\n"That's it. 30 minutes. I know exactly where everything stands."\n"The system does the rest."\n"My job: find the next 6 families."\n\nCTA: "Connector → link in bio"`,
        cta: '🔗 Link in bio',
        hashtags: ['#SundayProductivity', '#ConnectorLife', '#DOWNFLOW', '#PassiveIncome'],
        hook: 'Managing 8 cells in 30 minutes on a Sunday.',
        visual: 'Dashboard walkthrough — Sunday morning feel',
      },
      Telegram: {
        headline: '📡 Sunday Connector Summary — Weekly Wrap + Next Week Setup',
        body: `Every Sunday, top Connectors do this:\n\n🔍 Review:\n☐ Check all active cells — any issues this week?\n☐ Check any cells finishing soon → plan next batch\n☐ Review payout received Friday ✅\n\n📣 Plant:\n☐ Post in 1–2 parent groups (use the Saturday message script)\n☐ Follow up with any parents who showed interest last week\n☐ Message 1 facilitator about forming a new cell together\n\n📋 Log:\n☐ Update your Connector notes (what worked, what didn't)\n☐ Set 1 target for the week: cells to form, cells to grow\n\nDo this every Sunday.\nIn 3 months, you'll have a serious recurring income.\n\nReply "SUNDAY" for the Connector weekly planner template.`,
        cta: 'Reply "SUNDAY"',
        hashtags: [],
        hook: 'The Sunday routine that scales Connector income.',
        visual: 'Weekly review + planning checklist',
      },
    },
  },
}

/* ═══════════════════════════════════════════════════════════════
   AUTOMATION SCHEDULER DATA
═══════════════════════════════════════════════════════════════ */

const AUTO_SCHEDULE = DAYS.map((day, di) => ({
  day,
  slots: PLATFORMS.map((platform, pi) => ({
    platform,
    time: ['09:00', '11:00', '13:00', '17:00'][pi],
    audiences: ['sponsor', 'teacher', 'connector'],
    status: di < 2 ? 'published' : di === 2 ? 'scheduled' : 'draft',
  }))
}))

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════════ */

function PlatformBadge({ platform, size = 'sm' }) {
  const m = PLATFORM_META[platform]
  return (
    <span className={`sa-platform-badge sa-plat-${platform.toLowerCase()} sa-badge-${size}`}>
      {m.emoji} {platform}
    </span>
  )
}

function AudienceBadge({ audience }) {
  const a = AUDIENCES.find(x => x.id === audience)
  return (
    <span className="sa-aud-badge" style={{ background: a.color + '22', color: a.color, border: `1px solid ${a.color}44` }}>
      {a.icon} {a.label}
    </span>
  )
}

function AdCard({ day, platform, audience, ad }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const a = AUDIENCES.find(x => x.id === audience)

  function copyAd() {
    const text = `${ad.headline}\n\n${ad.body}\n\n${ad.cta}\n\n${ad.hashtags.join(' ')}`
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={`sa-ad-card${expanded ? ' expanded' : ''}`} style={{ '--aud-color': a.color }}>
      <div className="sa-ad-header" onClick={() => setExpanded(e => !e)}>
        <div className="sa-ad-meta">
          <PlatformBadge platform={platform} />
          <AudienceBadge audience={audience} />
        </div>
        <div className="sa-ad-hook">{ad.hook}</div>
        <span className="sa-ad-chevron">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="sa-ad-body">
          <div className="sa-ad-headline">{ad.headline}</div>
          <div className="sa-ad-format">
            📐 {PLATFORM_META[platform].format}
          </div>
          {ad.visual && (
            <div className="sa-ad-visual">🎨 Visual: {ad.visual}</div>
          )}
          <pre className="sa-ad-copy">{ad.body}</pre>
          <div className="sa-ad-cta-block">
            <strong>CTA:</strong> {ad.cta}
          </div>
          {ad.hashtags.length > 0 && (
            <div className="sa-ad-hashtags">
              {ad.hashtags.map(h => <span key={h} className="sa-hashtag">{h}</span>)}
            </div>
          )}
          <div className="sa-ad-actions">
            <button className="sa-btn-copy" onClick={copyAd}>
              {copied ? '✅ Copied!' : '📋 Copy Ad'}
            </button>
            <button className="sa-btn-schedule">📅 Schedule</button>
            <button className="sa-btn-approve">✅ Approve</button>
          </div>
        </div>
      )}
    </div>
  )
}

function DayColumn({ day, activeAudience, activePlatform }) {
  const dayAds = AD_LIBRARY[day]
  if (!dayAds) return null

  const audiencesToShow = activeAudience === 'all'
    ? ['sponsor', 'teacher', 'connector']
    : [activeAudience]
  const platformsToShow = activePlatform === 'all'
    ? PLATFORMS
    : [activePlatform]

  const cards = []
  for (const aud of audiencesToShow) {
    for (const plat of platformsToShow) {
      const ad = dayAds[aud]?.[plat]
      if (ad) cards.push({ aud, plat, ad })
    }
  }

  return (
    <div className="sa-day-col">
      <div className="sa-day-header">
        <span className="sa-day-name">{day}</span>
        <span className="sa-day-count">{cards.length} ads</span>
      </div>
      <div className="sa-day-cards">
        {cards.map(({ aud, plat, ad }) => (
          <AdCard key={`${aud}-${plat}`} day={day} platform={plat} audience={aud} ad={ad} />
        ))}
      </div>
    </div>
  )
}

function SchedulerRow({ entry }) {
  const statusColor = { published: '#38d9a9', scheduled: '#f0c040', draft: '#5a7a9a' }
  return (
    <div className="sa-sched-row">
      <div className="sa-sched-day">{entry.day.slice(0,3)}</div>
      <div className="sa-sched-slots">
        {entry.slots.map(s => (
          <div key={s.platform} className="sa-sched-slot" style={{ borderColor: PLATFORM_META[s.platform].color + '66' }}>
            <div className="sa-sched-plat">{PLATFORM_META[s.platform].emoji} {s.platform}</div>
            <div className="sa-sched-time">⏰ {s.time}</div>
            <div className="sa-sched-auds">
              {s.audiences.map(a => {
                const aud = AUDIENCES.find(x => x.id === a)
                return <span key={a} style={{ color: aud.color }}>{aud.icon}</span>
              })}
            </div>
            <div className="sa-sched-status" style={{ color: statusColor[s.status] }}>
              {s.status === 'published' ? '✅ Live' : s.status === 'scheduled' ? '⏳ Queued' : '📝 Draft'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */

export default function SocialAds() {
  usePageMeta("Social Ads Engine", "84 ready-to-post ads for every day of the week across Facebook, Instagram, TikTok and Telegram.")

  const [activeDay, setActiveDay] = useState('Monday')
  const [activeAudience, setActiveAudience] = useState('all')
  const [activePlatform, setActivePlatform] = useState('all')
  const [activeView, setActiveView] = useState('ads') // 'ads' | 'schedule' | 'stats'
  const [expandAll, setExpandAll] = useState(false)

  // Counts
  const totalAds = 7 * 4 * 3 // 84

  return (
    <div className="sa-page">
      {/* ── Hero ── */}
      <div className="sa-hero">
        <div className="sa-hero-kicker">📣 Marketing Automation Engine</div>
        <h1 className="sa-hero-title">
          <span className="sa-hero-down">Social Ads</span>{' '}
          <span className="sa-hero-flow">7 × 4 × 3</span>
        </h1>
        <p className="sa-hero-sub">
          {totalAds} unique ads. Every day of the week. Every platform. Every audience.
          <br/>Businesses · Teachers · Connectors — fully scripted, ready to post.
        </p>
        <div className="sa-hero-stats">
          <div className="sa-hstat"><span className="sa-hstat-n">84</span><span className="sa-hstat-l">Total Ads</span></div>
          <div className="sa-hstat"><span className="sa-hstat-n">7</span><span className="sa-hstat-l">Days</span></div>
          <div className="sa-hstat"><span className="sa-hstat-n">4</span><span className="sa-hstat-l">Platforms</span></div>
          <div className="sa-hstat"><span className="sa-hstat-n">3</span><span className="sa-hstat-l">Audiences</span></div>
        </div>
      </div>

      {/* ── View Tabs ── */}
      <div className="sa-view-tabs">
        {[
          { id: 'ads',      label: '📋 Ad Library' },
          { id: 'schedule', label: '📅 Auto-Schedule' },
          { id: 'stats',    label: '📊 Campaign Stats' },
        ].map(v => (
          <button key={v.id} className={`sa-view-tab${activeView === v.id ? ' active' : ''}`} onClick={() => setActiveView(v.id)}>
            {v.label}
          </button>
        ))}
      </div>

      {/* ══════════ AD LIBRARY VIEW ══════════ */}
      {activeView === 'ads' && (
        <div className="sa-library">
          {/* Filters */}
          <div className="sa-filters">
            <div className="sa-filter-group">
              <span className="sa-filter-label">Audience</span>
              <div className="sa-filter-btns">
                <button className={`sa-filter-btn${activeAudience === 'all' ? ' active' : ''}`} onClick={() => setActiveAudience('all')}>All</button>
                {AUDIENCES.map(a => (
                  <button key={a.id}
                    className={`sa-filter-btn${activeAudience === a.id ? ' active' : ''}`}
                    style={activeAudience === a.id ? { background: a.color + '22', borderColor: a.color, color: a.color } : {}}
                    onClick={() => setActiveAudience(a.id)}>
                    {a.icon} {a.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sa-filter-group">
              <span className="sa-filter-label">Platform</span>
              <div className="sa-filter-btns">
                <button className={`sa-filter-btn${activePlatform === 'all' ? ' active' : ''}`} onClick={() => setActivePlatform('all')}>All</button>
                {PLATFORMS.map(p => (
                  <button key={p}
                    className={`sa-filter-btn${activePlatform === p ? ' active' : ''}`}
                    onClick={() => setActivePlatform(p)}>
                    {PLATFORM_META[p].emoji} {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Day selector */}
          <div className="sa-day-nav">
            {DAYS.map((d, i) => (
              <button key={d}
                className={`sa-day-btn${activeDay === d ? ' active' : ''}`}
                onClick={() => setActiveDay(d)}>
                <span className="sa-day-btn-short">{DAY_SHORT[i]}</span>
                <span className="sa-day-btn-full">{d}</span>
              </button>
            ))}
          </div>

          {/* Ad grid for selected day */}
          <div className="sa-day-grid">
            <DayColumn
              day={activeDay}
              activeAudience={activeAudience}
              activePlatform={activePlatform}
            />
          </div>

          {/* All 7 days preview strip */}
          <div className="sa-all-days-header">
            <h2 className="sa-section-title">Full Week Overview</h2>
            <button className="sa-btn-expand" onClick={() => setExpandAll(e => !e)}>
              {expandAll ? 'Collapse All' : 'Expand All Days'}
            </button>
          </div>
          {expandAll && (
            <div className="sa-week-grid">
              {DAYS.map(d => (
                <DayColumn key={d} day={d} activeAudience={activeAudience} activePlatform={activePlatform} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════ SCHEDULE VIEW ══════════ */}
      {activeView === 'schedule' && (
        <div className="sa-schedule">
          <div className="sa-sched-header">
            <div>
              <h2 className="sa-section-title">Automated Posting Schedule</h2>
              <p className="sa-section-sub">4 platforms × 3 audiences × 7 days — set and forget.</p>
            </div>
            <div className="sa-sched-actions">
              <button className="sa-btn-primary">⚡ Activate Automation</button>
              <button className="sa-btn-secondary">🔗 Connect Accounts</button>
            </div>
          </div>

          {/* Platform connection cards */}
          <div className="sa-connect-grid">
            {PLATFORMS.map(p => {
              const m = PLATFORM_META[p]
              return (
                <div key={p} className="sa-connect-card" style={{ '--plat-color': m.color }}>
                  <div className="sa-cc-icon">{m.emoji}</div>
                  <div className="sa-cc-name">{p}</div>
                  <div className="sa-cc-format">{m.format}</div>
                  <div className="sa-cc-adscount">28 ads/week</div>
                  <button className="sa-cc-btn">Connect {p}</button>
                </div>
              )
            })}
          </div>

          {/* Weekly schedule grid */}
          <div className="sa-sched-grid">
            <div className="sa-sched-legend">
              <span className="sa-sleg published">✅ Published</span>
              <span className="sa-sleg scheduled">⏳ Scheduled</span>
              <span className="sa-sleg draft">📝 Draft</span>
            </div>
            {AUTO_SCHEDULE.map(entry => (
              <SchedulerRow key={entry.day} entry={entry} />
            ))}
          </div>

          {/* Automation settings */}
          <div className="sa-auto-settings">
            <h3 className="sa-settings-title">⚙️ Automation Settings</h3>
            <div className="sa-settings-grid">
              {[
                { label: 'Auto-rotate audiences', desc: 'Cycles Sponsor → Teacher → Connector each day', active: true },
                { label: 'Peak-time posting', desc: 'Posts at highest-engagement windows per platform', active: true },
                { label: 'A/B hook testing', desc: 'Tests 2 headline variants per ad, auto-picks winner', active: false },
                { label: 'Hashtag optimization', desc: 'Auto-updates hashtag sets based on trending data', active: false },
                { label: 'Cross-post repurposing', desc: 'Adapts FB posts to IG, TikTok scripts to Telegram', active: true },
                { label: 'Performance auto-pause', desc: 'Pauses underperforming ads after 48h < 1% engagement', active: false },
              ].map(s => (
                <div key={s.label} className="sa-setting-item">
                  <div className="sa-setting-info">
                    <div className="sa-setting-name">{s.label}</div>
                    <div className="sa-setting-desc">{s.desc}</div>
                  </div>
                  <div className={`sa-toggle${s.active ? ' on' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ STATS VIEW ══════════ */}
      {activeView === 'stats' && (
        <div className="sa-stats">
          <h2 className="sa-section-title">Campaign Performance</h2>
          <p className="sa-section-sub">Simulated benchmarks based on DOWNFLOW audience profiles and platform averages.</p>

          {/* Platform performance */}
          <div className="sa-stats-grid">
            {[
              { platform: 'Facebook',  reach: '12,400', engagement: '4.2%', leads: 38, cpl: '₫85,000',  color: '#4267B2' },
              { platform: 'Instagram', reach: '18,700', engagement: '6.8%', leads: 52, cpl: '₫62,000',  color: '#C13584' },
              { platform: 'TikTok',    reach: '34,200', engagement: '9.1%', leads: 71, cpl: '₫41,000',  color: '#ff2d55' },
              { platform: 'Telegram',  reach: '6,800',  engagement: '11.4%', leads: 44, cpl: '₫55,000', color: '#0088cc' },
            ].map(s => (
              <div key={s.platform} className="sa-stat-card" style={{ '--pc': s.color }}>
                <div className="sa-sc-head">
                  <span className="sa-sc-icon">{PLATFORM_META[s.platform].emoji}</span>
                  <span className="sa-sc-name">{s.platform}</span>
                </div>
                <div className="sa-sc-metrics">
                  <div className="sa-sc-m"><span className="sa-sc-val">{s.reach}</span><span className="sa-sc-lbl">Weekly Reach</span></div>
                  <div className="sa-sc-m"><span className="sa-sc-val" style={{ color: s.color }}>{s.engagement}</span><span className="sa-sc-lbl">Engagement</span></div>
                  <div className="sa-sc-m"><span className="sa-sc-val">{s.leads}</span><span className="sa-sc-lbl">Leads/Week</span></div>
                  <div className="sa-sc-m"><span className="sa-sc-val">{s.cpl}</span><span className="sa-sc-lbl">Cost/Lead</span></div>
                </div>
                <div className="sa-sc-bar-wrap">
                  <div className="sa-sc-bar" style={{ width: s.engagement, background: s.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Audience performance */}
          <h3 className="sa-section-subtitle">Audience Conversion Rates</h3>
          <div className="sa-aud-stats">
            {[
              { aud: 'sponsor',    label: 'Business / Sponsor', icon: '💼', color: '#f0c040', conv: '3.2%', avgDeal: '₫9,720,000', pipeline: '₫291,600,000' },
              { aud: 'teacher',    label: 'Teacher / Facilitator', icon: '🧭', color: '#a78bfa', conv: '5.8%', avgDeal: '₫6,804,000', pipeline: '₫197,316,000' },
              { aud: 'connector',  label: 'Connector', icon: '🔗', color: '#38d9a9', conv: '7.4%', avgDeal: '₫2,700,000/mo', pipeline: '₫78,300,000' },
            ].map(a => (
              <div key={a.aud} className="sa-aud-stat-row" style={{ '--ac': a.color }}>
                <div className="sa-as-icon">{a.icon}</div>
                <div className="sa-as-label">{a.label}</div>
                <div className="sa-as-conv"><span style={{ color: a.color }}>{a.conv}</span><br/><small>Conv. rate</small></div>
                <div className="sa-as-deal">{a.avgDeal}<br/><small>Avg. value</small></div>
                <div className="sa-as-pipeline">{a.pipeline}<br/><small>Est. pipeline</small></div>
                <div className="sa-as-bar-wrap">
                  <div className="sa-as-bar" style={{ width: a.conv, background: a.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Best performing ads */}
          <h3 className="sa-section-subtitle">Top Performing Ad Hooks This Week</h3>
          <div className="sa-top-hooks">
            {[
              { rank: 1, hook: 'POV: You\'re a CEO who just found out your CSR actually works', platform: 'TikTok', aud: 'sponsor',    ctr: '9.4%', color: '#f0c040' },
              { rank: 2, hook: 'I made ₫13M last month connecting families to learning groups', platform: 'TikTok', aud: 'connector', ctr: '8.7%', color: '#38d9a9' },
              { rank: 3, hook: 'Teachers are not paid enough. DOWNFLOW thinks differently.',   platform: 'TikTok', aud: 'teacher',   ctr: '8.1%', color: '#a78bfa' },
              { rank: 4, hook: 'Your WhatsApp groups could make you money? 💀',                platform: 'TikTok', aud: 'connector', ctr: '7.9%', color: '#38d9a9' },
              { rank: 5, hook: 'Friday is payday. Every week.',                                platform: 'Instagram', aud: 'teacher', ctr: '7.2%', color: '#a78bfa' },
            ].map(h => {
              const a = AUDIENCES.find(x => x.id === h.aud)
              return (
                <div key={h.rank} className="sa-hook-row">
                  <div className="sa-hook-rank" style={{ color: h.rank <= 3 ? '#f0c040' : 'var(--text-muted)' }}>#{h.rank}</div>
                  <div className="sa-hook-text">"{h.hook}"</div>
                  <div className="sa-hook-meta">
                    <PlatformBadge platform={h.platform} size="xs" />
                    <AudienceBadge audience={h.aud} />
                  </div>
                  <div className="sa-hook-ctr" style={{ color: h.color }}>{h.ctr} CTR</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
