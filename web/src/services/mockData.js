// ============================================================
// DOWNFLOW Mock Data — mirrors the exact Antigravity/Firebase
// Firestore schema. Used when Firebase env vars are not set.
// ============================================================

// ---- USERS -------------------------------------------------
export const mockUsers = {
  'user-001': { id:'user-001', name:'Nguyen Van An', role:'student',    region:'VN', cellId:'VN-01', flag:'🇻🇳', avatar:'👦', coins:340 },
  'user-002': { id:'user-002', name:'Tran Thi Linh', role:'student',   region:'VN', cellId:'VN-01', flag:'🇻🇳', avatar:'👧', coins:290, isSG:true },
  'user-003': { id:'user-003', name:'Pham Quoc Minh', role:'student',  region:'VN', cellId:'VN-02', flag:'🇻🇳', avatar:'👦', coins:210 },
  'user-004': { id:'user-004', name:'Felix Kaufmann',  role:'student',  region:'DE', cellId:'DE-01', flag:'🇩🇪', avatar:'👦', coins:450, isSG:true, isASG:true },
  'user-f01': { id:'user-f01', name:'Dr. Hoa Nguyen',  role:'facilitator', region:'VN', flag:'🇻🇳', avatar:'👩‍🏫', cells:['VN-01','VN-03'] },
  'user-f02': { id:'user-f02', name:'Klaus Richter',   role:'facilitator', region:'DE', flag:'🇩🇪', avatar:'👨‍🏫', cells:['DE-01'] },
  'user-c01': { id:'user-c01', name:'Bach Nguyen',     role:'connector',   region:'VN', flag:'🇻🇳', avatar:'🤝', cells:['VN-01','VN-02'] },
  'user-c02': { id:'user-c02', name:'Hans Weber',      role:'connector',   region:'DE', flag:'🇩🇪', avatar:'🤝', cells:['DE-01'] },
  'user-s01': { id:'user-s01', name:'Vingroup Education', role:'sponsor', region:'VN', flag:'🇻🇳', avatar:'🏢', cells:['VN-01','VN-02','VN-03'], totalFunded:15000000 },
  'user-s02': { id:'user-s02', name:'Berlin Foundation',  role:'sponsor', region:'DE', flag:'🇩🇪', avatar:'🏛️', cells:['DE-01'], totalFunded:8000000 },
  'platform':  { id:'platform', name:'Platform Admin',  role:'platform', avatar:'⚡' },
}

// ---- CELLS -------------------------------------------------
// Mirrors: /cells/{cellId}
// Fields match Antigravity: id, name, level, region, cycleWeek,
// avgAttendance, avgSpeaking, cellGPA, videoCount, status,
// performanceTier, facilitatorId, connectorId, sponsorId,
// studentIds, activeSubmissions, progressionLogic
export const mockCells = [
  {
    id: 'VN-01',
    name: 'Cell Alpha',
    level: 'Foundation Level',
    region: 'Hanoi 🇻🇳',
    cycleWeek: 7,
    cycleTotal: 12,
    avgAttendance: 92,
    avgSpeaking: 78,
    cellGPA: 84,
    videoCount: 14,
    status: 'active',
    fundingStatus: 'funded',
    performanceTier: 'Level Gold',
    facilitatorId: 'user-f01',
    connectorId: 'user-c01',
    sponsorId: 'user-s01',
    studentIds: ['user-001','user-002','s003','s004','s005'],
    packs: ['🗣️ Voice & Presence','✏️ Pencil Proof'],
    activeSubmissions: 14,
    health: 92,
    streak: 7,
  },
  {
    id: 'VN-02',
    name: 'Cell Beta',
    level: 'Foundation Level',
    region: 'HCMC 🇻🇳',
    cycleWeek: 3,
    cycleTotal: 12,
    avgAttendance: 74,
    avgSpeaking: 51,
    cellGPA: 65,
    videoCount: 6,
    status: 'active',
    fundingStatus: 'funded',
    performanceTier: 'Level Silver',
    facilitatorId: 'user-f01',
    connectorId: 'user-c01',
    sponsorId: 'user-s01',
    studentIds: ['user-003','s006','s007','s008','s009'],
    packs: ['💰 Kidinomics','🧩 Systems Thinking'],
    activeSubmissions: 6,
    health: 74,
    streak: 4,
  },
  {
    id: 'VN-03',
    name: 'Cell Gamma',
    level: 'Foundation Level',
    region: 'Da Nang 🇻🇳',
    cycleWeek: 5,
    cycleTotal: 12,
    avgAttendance: 56,
    avgSpeaking: 32,
    cellGPA: 44,
    videoCount: 3,
    status: 'flagged',
    fundingStatus: 'pending',
    performanceTier: 'Level Bronze',
    facilitatorId: 'user-f01',
    connectorId: null,
    sponsorId: 'user-s01',
    studentIds: ['s010','s011','s012','s013','s014'],
    packs: ['🎯 Confidence Engineering'],
    activeSubmissions: 3,
    health: 58,
    streak: 2,
  },
  {
    id: 'DE-01',
    name: 'Cell Delta',
    level: 'Foundation Level',
    region: 'Berlin 🇩🇪',
    cycleWeek: 11,
    cycleTotal: 12,
    avgAttendance: 96,
    avgSpeaking: 89,
    cellGPA: 91,
    videoCount: 22,
    status: 'completing',
    fundingStatus: 'funded',
    performanceTier: 'Level Platinum',
    facilitatorId: 'user-f02',
    connectorId: 'user-c02',
    sponsorId: 'user-s02',
    studentIds: ['user-004','s015','s016','s017','s018'],
    packs: ['🗣️ Voice & Presence','🧠 Self-Awareness'],
    activeSubmissions: 22,
    health: 88,
    streak: 21,
  },
]

// ---- PROGRESS LOGS -----------------------------------------
// Mirrors: /cells/{cellId}/progressLogs/{logId}
export const mockProgressLogs = [
  { cellId:'VN-01', week:7, attendance:5, speaking:82, gpa:88, videos:3, notes:'Strong session, Linh led discussion', createdAt:'2026-04-01' },
  { cellId:'VN-01', week:6, attendance:4, speaking:75, gpa:82, videos:2, notes:'Good energy, one absence', createdAt:'2026-03-25' },
  { cellId:'VN-02', week:3, attendance:4, speaking:50, gpa:63, videos:1, notes:'Building momentum', createdAt:'2026-04-01' },
  { cellId:'VN-03', week:5, attendance:3, speaking:30, gpa:42, videos:1, notes:'Attendance concern — flagged', createdAt:'2026-03-28' },
  { cellId:'DE-01', week:11,attendance:5, speaking:91, gpa:94, videos:4, notes:'Exceptional. Felix ASG-ready.', createdAt:'2026-04-02' },
]

// ---- SPONSORSHIPS ------------------------------------------
// Mirrors: /sponsorships/{id}
export const mockSponsorships = [
  { id:'sp-001', sponsorId:'user-s01', cellId:'VN-01', amount:5000000, currency:'VND', cycle:1, status:'active', rebateEarned:450000, rebateReinvested:270000, rebateToStudents:180000 },
  { id:'sp-002', sponsorId:'user-s01', cellId:'VN-02', amount:5000000, currency:'VND', cycle:1, status:'active', rebateEarned:250000, rebateReinvested:150000, rebateToStudents:100000 },
  { id:'sp-003', sponsorId:'user-s01', cellId:'VN-03', amount:5000000, currency:'VND', cycle:1, status:'flagged', rebateEarned:120000, rebateReinvested:72000, rebateToStudents:48000 },
  { id:'sp-004', sponsorId:'user-s02', cellId:'DE-01', amount:8000000, currency:'VND', cycle:1, status:'active', rebateEarned:820000, rebateReinvested:492000, rebateToStudents:328000 },
]

// ---- VIDEO REVIEWS -----------------------------------------
// Mirrors: /videoReviews/{id}
export const mockVideoReviews = [
  { id:'vr-001', cellId:'VN-01', studentId:'user-001', studentName:'Van An', week:7, pack:'🗣️ Voice', duration:62, status:'approved', submittedAt:'2026-04-01' },
  { id:'vr-002', cellId:'VN-01', studentId:'user-002', studentName:'Thi Linh', week:7, pack:'🗣️ Voice', duration:78, status:'approved', submittedAt:'2026-04-01', isSG:true },
  { id:'vr-003', cellId:'DE-01', studentId:'user-004', studentName:'Felix K.', week:11, pack:'🧠 Self-Awareness', duration:95, status:'approved', submittedAt:'2026-04-02', isSG:true },
]

// ---- ATTENDANCE --------------------------------------------
// Mirrors: /attendance/{id}
export const mockAttendance = [
  { cellId:'VN-01', sessionNum:7, date:'2026-04-01', present:['user-001','user-002','s003','s004','s005'], absent:[] },
  { cellId:'VN-02', sessionNum:3, date:'2026-04-01', present:['user-003','s007','s008','s009'], absent:['s006'] },
  { cellId:'VN-03', sessionNum:5, date:'2026-03-28', present:['s010','s012','s013'], absent:['s011','s014'] },
  { cellId:'DE-01', sessionNum:11,date:'2026-04-02', present:['user-004','s015','s016','s017','s018'], absent:[] },
]

// ---- PROMOTIONS / PROGRESSIONS ----------------------------
// Mirrors: /promotions/{id}
export const mockPromotions = [
  { id:'pr-001', studentId:'user-002', studentName:'Tran Thi Linh', from:'Student', to:'SG', cellId:'VN-01', approvedBy:'user-f01', date:'2026-01-10', status:'active' },
  { id:'pr-002', studentId:'user-004', studentName:'Felix Kaufmann', from:'SG', to:'ASG', cellId:'DE-01', approvedBy:'user-f02', date:'2026-03-01', status:'active' },
]

// ---- CONTENT PACKS ----------------------------------------
export const mockPacks = [
  { id:'pack-01', emoji:'✏️', name:'Pencil Proof',          ageGroup:'8–12', themes:['creation','craft','persistence'], sessions:12 },
  { id:'pack-02', emoji:'💰', name:'Kidinomics',            ageGroup:'10–14', themes:['value','money','effort'],       sessions:12 },
  { id:'pack-03', emoji:'🗣️', name:'Voice & Presence',      ageGroup:'12–16', themes:['speaking','confidence','body'], sessions:12 },
  { id:'pack-04', emoji:'🧩', name:'Systems Thinking',      ageGroup:'13–17', themes:['patterns','cause-effect'],      sessions:12 },
  { id:'pack-05', emoji:'🎯', name:'Confidence Engineering',ageGroup:'10–15', themes:['mindset','identity'],           sessions:12 },
  { id:'pack-06', emoji:'🛠️', name:'Life Skills Lab',       ageGroup:'14–18', themes:['planning','execution'],         sessions:12 },
  { id:'pack-07', emoji:'🧠', name:'Self-Awareness OS',     ageGroup:'13–18', themes:['reflection','emotions'],        sessions:12 },
  { id:'pack-08', emoji:'🤝', name:'Social Systems',        ageGroup:'12–16', themes:['teams','empathy','trust'],      sessions:12 },
  { id:'pack-09', emoji:'🌱', name:'Growth Lab',            ageGroup:'8–13',  themes:['habits','goals'],               sessions:12 },
  { id:'pack-10', emoji:'🔭', name:'Future Builders',       ageGroup:'15–18', themes:['vision','entrepreneurship'],    sessions:12 },
]

// ---- REGIONS -----------------------------------------------
export const mockRegions = [
  { code:'VN', name:'Vietnam',  flag:'🇻🇳', status:'active',   cells:3, students:15, sponsors:1, connectors:1 },
  { code:'DE', name:'Germany',  flag:'🇩🇪', status:'active',   cells:1, students:5,  sponsors:1, connectors:1 },
  { code:'RU', name:'Russia',   flag:'🇷🇺', status:'pipeline', cells:0, students:0,  sponsors:0, connectors:0 },
  { code:'GL', name:'Global',   flag:'🌍', status:'open',     cells:0, students:0,  sponsors:0, connectors:0 },
]

// ---- SYSTEM STATS ------------------------------------------
export const mockSystemStats = {
  totalCells: 4,
  activeCells: 3,
  totalStudents: 20,
  totalFacilitators: 2,
  totalConnectors: 2,
  totalSponsors: 2,
  alertsOpen: 1,
  totalVNDCirculating: 33600000,
  ethicsFlags: ['VN-03 attendance below threshold'],
}
