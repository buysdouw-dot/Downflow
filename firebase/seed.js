#!/usr/bin/env node
// ============================================================
// DOWNFLOW — Firebase Seed Script
// Usage:  node firebase/seed.js
// Prereq: set GOOGLE_APPLICATION_CREDENTIALS or run from
//         a machine with `firebase login` already done.
//
//  npm install firebase-admin --save-dev   (in /web)
//  export GOOGLE_APPLICATION_CREDENTIALS=./firebase/serviceAccount.json
//  node firebase/seed.js
// ============================================================

const admin = require('firebase-admin')

// ── init ────────────────────────────────────────────────────
// Uses GOOGLE_APPLICATION_CREDENTIALS env var pointing to the
// downloaded service-account JSON from Firebase console.
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db   = admin.firestore()
const auth = admin.auth()

// ── helpers ─────────────────────────────────────────────────
async function set(col, id, data) {
  await db.collection(col).doc(id).set(data, { merge: true })
  console.log(`  ✓ ${col}/${id}`)
}
async function add(col, data) {
  const ref = await db.collection(col).add(data)
  console.log(`  ✓ ${col}/${ref.id}`)
  return ref.id
}
async function createUser({ email, password, displayName, uid }) {
  try {
    await auth.createUser({ uid, email, password, displayName })
    console.log(`  ✓ auth user: ${email}`)
  } catch (e) {
    if (e.code === 'auth/uid-already-exists' || e.code === 'auth/email-already-exists') {
      console.log(`  ~ already exists: ${email}`)
    } else throw e
  }
}

// ── SEED ────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱 Seeding Downflow Firebase...\n')

  // ── 1. AUTH USERS ──────────────────────────────────────────
  console.log('── Auth Users')
  await createUser({ uid:'user-s01',  email:'sponsor@downflow.app',   password:'Demo1234!', displayName:'Vingroup Education' })
  await createUser({ uid:'user-001',  email:'student@downflow.app',   password:'Demo1234!', displayName:'Nguyen Van An' })
  await createUser({ uid:'user-f01',  email:'facilitator@downflow.app', password:'Demo1234!', displayName:'Dr. Hoa Nguyen' })
  await createUser({ uid:'user-c01',  email:'connector@downflow.app', password:'Demo1234!', displayName:'Bach Nguyen' })
  await createUser({ uid:'platform',  email:'admin@downflow.app',     password:'Demo1234!', displayName:'Platform Admin' })

  // ── 2. USERS COLLECTION ────────────────────────────────────
  console.log('\n── /users')
  await set('users','user-001', { name:'Nguyen Van An',    role:'student',     region:'VN', cellId:'VN-01', flag:'🇻🇳', avatar:'👦', coins:340, email:'student@downflow.app' })
  await set('users','user-002', { name:'Tran Thi Linh',    role:'student',     region:'VN', cellId:'VN-01', flag:'🇻🇳', avatar:'👧', coins:290, isSG:true, email:'linh@downflow.app' })
  await set('users','user-003', { name:'Pham Quoc Minh',   role:'student',     region:'VN', cellId:'VN-02', flag:'🇻🇳', avatar:'👦', coins:210, email:'minh@downflow.app' })
  await set('users','user-004', { name:'Felix Kaufmann',   role:'student',     region:'DE', cellId:'DE-01', flag:'🇩🇪', avatar:'👦', coins:450, isSG:true, isASG:true, email:'felix@downflow.app' })
  await set('users','user-f01', { name:'Dr. Hoa Nguyen',   role:'facilitator', region:'VN', flag:'🇻🇳', avatar:'👩‍🏫', cells:['VN-01','VN-03'], phase:2, email:'facilitator@downflow.app' })
  await set('users','user-f02', { name:'Klaus Richter',    role:'facilitator', region:'DE', flag:'🇩🇪', avatar:'👨‍🏫', cells:['DE-01'], phase:3, email:'klaus@downflow.app' })
  await set('users','user-c01', { name:'Bach Nguyen',      role:'connector',   region:'VN', flag:'🇻🇳', avatar:'🤝', cells:['VN-01','VN-02'], email:'connector@downflow.app' })
  await set('users','user-c02', { name:'Hans Weber',       role:'connector',   region:'DE', flag:'🇩🇪', avatar:'🤝', cells:['DE-01'], email:'hans@downflow.app' })
  await set('users','user-s01', { name:'Vingroup Education', role:'sponsor',   region:'VN', flag:'🇻🇳', avatar:'🏢', cells:['VN-01','VN-02','VN-03'], totalFunded:15000000, email:'sponsor@downflow.app' })
  await set('users','user-s02', { name:'Berlin Foundation',  role:'sponsor',   region:'DE', flag:'🇩🇪', avatar:'🏛️', cells:['DE-01'], totalFunded:8000000, email:'berlin@downflow.app' })
  await set('users','platform',  { name:'Platform Admin',    role:'platform',  avatar:'⚡', email:'admin@downflow.app' })

  // ── 3. CELLS ───────────────────────────────────────────────
  console.log('\n── /cells')
  await set('cells','VN-01', {
    name:'Cell Alpha', level:'Foundation Level', region:'Hanoi 🇻🇳',
    cycleWeek:7, cycleTotal:12, avgAttendance:92, avgSpeaking:78, cellGPA:84, videoCount:14,
    status:'active', fundingStatus:'funded', performanceTier:'Level Gold',
    facilitatorId:'user-f01', connectorId:'user-c01', sponsorId:'user-s01',
    studentIds:['user-001','user-002'], packs:['🗣️ Voice & Presence','✏️ Pencil Proof'],
    activeSubmissions:14, health:92, streak:7, createdAt:admin.firestore.FieldValue.serverTimestamp()
  })
  await set('cells','VN-02', {
    name:'Cell Beta', level:'Foundation Level', region:'HCMC 🇻🇳',
    cycleWeek:3, cycleTotal:12, avgAttendance:74, avgSpeaking:51, cellGPA:65, videoCount:6,
    status:'active', fundingStatus:'funded', performanceTier:'Level Silver',
    facilitatorId:'user-f01', connectorId:'user-c01', sponsorId:'user-s01',
    studentIds:['user-003'], packs:['💰 Kidinomics','🧩 Systems Thinking'],
    activeSubmissions:6, health:74, streak:4, createdAt:admin.firestore.FieldValue.serverTimestamp()
  })
  await set('cells','VN-03', {
    name:'Cell Gamma', level:'Foundation Level', region:'Da Nang 🇻🇳',
    cycleWeek:5, cycleTotal:12, avgAttendance:56, avgSpeaking:32, cellGPA:44, videoCount:3,
    status:'flagged', fundingStatus:'pending', performanceTier:'Level Bronze',
    facilitatorId:'user-f01', connectorId:null, sponsorId:'user-s01',
    studentIds:[], packs:['🎯 Confidence Engineering'],
    activeSubmissions:3, health:58, streak:2, createdAt:admin.firestore.FieldValue.serverTimestamp()
  })
  await set('cells','DE-01', {
    name:'Cell Delta', level:'Foundation Level', region:'Berlin 🇩🇪',
    cycleWeek:11, cycleTotal:12, avgAttendance:96, avgSpeaking:89, cellGPA:91, videoCount:22,
    status:'completing', fundingStatus:'funded', performanceTier:'Level Platinum',
    facilitatorId:'user-f02', connectorId:'user-c02', sponsorId:'user-s02',
    studentIds:['user-004'], packs:['🗣️ Voice & Presence','🧠 Self-Awareness OS'],
    activeSubmissions:22, health:88, streak:21, createdAt:admin.firestore.FieldValue.serverTimestamp()
  })

  // ── 4. PROGRESS LOGS (subcollections) ─────────────────────
  console.log('\n── /cells/*/progressLogs')
  await db.collection('cells/VN-01/progressLogs').add({ week:7, attendance:5, speaking:82, gpa:88, videos:3, notes:'Strong session, Linh led discussion', createdAt:admin.firestore.FieldValue.serverTimestamp() })
  await db.collection('cells/VN-01/progressLogs').add({ week:6, attendance:4, speaking:75, gpa:82, videos:2, notes:'Good energy, one absence', createdAt:admin.firestore.FieldValue.serverTimestamp() })
  await db.collection('cells/VN-02/progressLogs').add({ week:3, attendance:4, speaking:50, gpa:63, videos:1, notes:'Building momentum', createdAt:admin.firestore.FieldValue.serverTimestamp() })
  await db.collection('cells/VN-03/progressLogs').add({ week:5, attendance:3, speaking:30, gpa:42, videos:1, notes:'Attendance concern — flagged', createdAt:admin.firestore.FieldValue.serverTimestamp() })
  await db.collection('cells/DE-01/progressLogs').add({ week:11, attendance:5, speaking:91, gpa:94, videos:4, notes:'Exceptional. Felix ASG-ready.', createdAt:admin.firestore.FieldValue.serverTimestamp() })
  console.log('  ✓ progress logs (5)')

  // ── 5. SPONSORSHIPS ────────────────────────────────────────
  console.log('\n── /sponsorships')
  await set('sponsorships','sp-001', { sponsorId:'user-s01', cellId:'VN-01', amount:5000000, currency:'VND', cycle:1, status:'active',  rebateEarned:450000, rebateReinvested:270000, rebateToStudents:180000 })
  await set('sponsorships','sp-002', { sponsorId:'user-s01', cellId:'VN-02', amount:5000000, currency:'VND', cycle:1, status:'active',  rebateEarned:250000, rebateReinvested:150000, rebateToStudents:100000 })
  await set('sponsorships','sp-003', { sponsorId:'user-s01', cellId:'VN-03', amount:5000000, currency:'VND', cycle:1, status:'flagged', rebateEarned:120000, rebateReinvested:72000,  rebateToStudents:48000 })
  await set('sponsorships','sp-004', { sponsorId:'user-s02', cellId:'DE-01', amount:8000000, currency:'VND', cycle:1, status:'active',  rebateEarned:820000, rebateReinvested:492000, rebateToStudents:328000 })

  // ── 6. VIDEO REVIEWS ───────────────────────────────────────
  console.log('\n── /videoReviews')
  await set('videoReviews','vr-001', { cellId:'VN-01', studentId:'user-001', studentName:'Van An',    week:7,  pack:'🗣️ Voice', duration:62, status:'approved', submittedAt:'2026-04-01' })
  await set('videoReviews','vr-002', { cellId:'VN-01', studentId:'user-002', studentName:'Thi Linh', week:7,  pack:'🗣️ Voice', duration:78, status:'approved', submittedAt:'2026-04-01', isSG:true })
  await set('videoReviews','vr-003', { cellId:'DE-01', studentId:'user-004', studentName:'Felix K.', week:11, pack:'🧠 Self-Awareness', duration:95, status:'approved', submittedAt:'2026-04-02', isSG:true })

  // ── 7. ATTENDANCE ──────────────────────────────────────────
  console.log('\n── /cells/*/attendance')
  await db.collection('cells/VN-01/attendance').add({ sessionNum:7,  date:'2026-04-01', present:['user-001','user-002'], absent:[] })
  await db.collection('cells/VN-02/attendance').add({ sessionNum:3,  date:'2026-04-01', present:['user-003'], absent:[] })
  await db.collection('cells/VN-03/attendance').add({ sessionNum:5,  date:'2026-03-28', present:[], absent:[] })
  await db.collection('cells/DE-01/attendance').add({ sessionNum:11, date:'2026-04-02', present:['user-004'], absent:[] })
  console.log('  ✓ attendance (4)')

  // ── 8. PROMOTIONS ──────────────────────────────────────────
  console.log('\n── /promotions')
  await set('promotions','pr-001', { studentId:'user-002', studentName:'Tran Thi Linh', from:'Student', to:'SG',  cellId:'VN-01', approvedBy:'user-f01', date:'2026-01-10', status:'active' })
  await set('promotions','pr-002', { studentId:'user-004', studentName:'Felix Kaufmann', from:'SG',     to:'ASG', cellId:'DE-01', approvedBy:'user-f02', date:'2026-03-01', status:'active' })

  // ── 9. CONTENT PACKS ───────────────────────────────────────
  console.log('\n── /packs')
  const packs = [
    { id:'pack-01', emoji:'✏️', name:'Pencil Proof',           ageGroup:'8–12',  themes:['creation','craft','persistence'],  sessions:12 },
    { id:'pack-02', emoji:'💰', name:'Kidinomics',             ageGroup:'10–14', themes:['value','money','effort'],          sessions:12 },
    { id:'pack-03', emoji:'🗣️', name:'Voice & Presence',       ageGroup:'12–16', themes:['speaking','confidence','body'],    sessions:12 },
    { id:'pack-04', emoji:'🧩', name:'Systems Thinking',       ageGroup:'13–17', themes:['patterns','cause-effect'],         sessions:12 },
    { id:'pack-05', emoji:'🎯', name:'Confidence Engineering', ageGroup:'10–15', themes:['mindset','identity'],              sessions:12 },
    { id:'pack-06', emoji:'🛠️', name:'Life Skills Lab',        ageGroup:'14–18', themes:['planning','execution'],            sessions:12 },
    { id:'pack-07', emoji:'🧠', name:'Self-Awareness OS',      ageGroup:'13–18', themes:['reflection','emotions'],           sessions:12 },
    { id:'pack-08', emoji:'🤝', name:'Social Systems',         ageGroup:'12–16', themes:['teams','empathy','trust'],         sessions:12 },
    { id:'pack-09', emoji:'🌱', name:'Growth Lab',             ageGroup:'8–13',  themes:['habits','goals'],                  sessions:12 },
    { id:'pack-10', emoji:'🔭', name:'Future Builders',        ageGroup:'15–18', themes:['vision','entrepreneurship'],       sessions:12 },
  ]
  for (const p of packs) await set('packs', p.id, p)

  // ── 10. REGIONS ────────────────────────────────────────────
  console.log('\n── /regions')
  await set('regions','VN', { name:'Vietnam', flag:'🇻🇳', status:'active',   cells:3, students:15, sponsors:1, connectors:1 })
  await set('regions','DE', { name:'Germany', flag:'🇩🇪', status:'active',   cells:1, students:5,  sponsors:1, connectors:1 })
  await set('regions','RU', { name:'Russia',  flag:'🇷🇺', status:'pipeline', cells:0, students:0,  sponsors:0, connectors:0 })

  // ── 11. SYSTEM STATS ───────────────────────────────────────
  console.log('\n── /system/stats')
  await set('system','stats', {
    totalCells:4, activeCells:3, totalStudents:20, totalFacilitators:2,
    totalConnectors:2, totalSponsors:2, alertsOpen:1,
    totalVNDCirculating:33600000,
    ethicsFlags:['VN-03 attendance below threshold'],
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })

  console.log('\n✅ Seed complete!\n')
  console.log('Demo login credentials:')
  console.log('  sponsor@downflow.app      / Demo1234!')
  console.log('  student@downflow.app      / Demo1234!')
  console.log('  facilitator@downflow.app  / Demo1234!')
  console.log('  connector@downflow.app    / Demo1234!')
  console.log('  admin@downflow.app        / Demo1234!')

  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
