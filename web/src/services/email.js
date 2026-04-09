// ============================================================
// DOWNFLOW — Email Notification Service (EmailJS)
//
// To activate: create a free account at emailjs.com, then add
// these to .env.local:
//
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_NOTIFY=template_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_WELCOME=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
//
// Without these vars, emails are logged to console only (dev mode).
// ============================================================

import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const T_NOTIFY    = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY
const T_WELCOME   = import.meta.env.VITE_EMAILJS_TEMPLATE_WELCOME
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const isEmailConfigured = !!(SERVICE_ID && PUBLIC_KEY)

async function send(templateId, params) {
  if (!isEmailConfigured || !templateId) {
    console.log('[Email — dev mode]', params)
    return { status: 200, text: 'dev-mode' }
  }
  return emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY)
}

// ── Notify facilitator when a video is submitted ────────────
export async function notifyFacilitatorVideoSubmitted({ facilitatorEmail, facilitatorName, studentName, packName, weekNum, cellId }) {
  return send(T_NOTIFY, {
    to_email:    facilitatorEmail,
    to_name:     facilitatorName,
    subject:     `New video submission — ${studentName}`,
    message:     `${studentName} has submitted a video rep for ${packName} (Week ${weekNum}) in cell ${cellId}. Please log in to review.`,
    action_url:  `${window.location.origin}/facilitator`,
  })
}

// ── Welcome email for new users ─────────────────────────────
export async function sendWelcomeEmail({ toEmail, toName, role }) {
  const roleMessages = {
    student:     'Your learning cell is ready. Sign in to view your first session.',
    facilitator: 'Your facilitator account is ready. Review your cells and upcoming sessions.',
    sponsor:     'Your sponsor account is live. View your funded cells and impact metrics.',
    connector:   'Your connector account is ready. Start building your network.',
  }
  return send(T_WELCOME, {
    to_email: toEmail,
    to_name:  toName,
    subject:  'Welcome to DOWNFLOW — School of Life',
    message:  roleMessages[role] || 'Your account is ready.',
    action_url: `${window.location.origin}/login`,
  })
}

// ── Alert sponsor on cell flag ──────────────────────────────
export async function alertSponsorCellFlagged({ sponsorEmail, sponsorName, cellId, reason }) {
  return send(T_NOTIFY, {
    to_email:  sponsorEmail,
    to_name:   sponsorName,
    subject:   `Action needed — Cell ${cellId} flagged`,
    message:   `Cell ${cellId} has been flagged: ${reason}. No funds will be released until resolved. Please log in for details.`,
    action_url: `${window.location.origin}/sponsor`,
  })
}

// ── Notify student of promotion ─────────────────────────────
export async function notifyStudentPromotion({ studentEmail, studentName, fromRole, toRole }) {
  return send(T_NOTIFY, {
    to_email:  studentEmail,
    to_name:   studentName,
    subject:   `Congratulations — You've been promoted to ${toRole}!`,
    message:   `Your facilitator has recognised your progress and promoted you from ${fromRole} to ${toRole}. Log in to see your new responsibilities.`,
    action_url: `${window.location.origin}/student`,
  })
}

// ── Notify platform admin of new funding request ────────────
export async function notifyAdminFundingRequest({ sponsorName, sponsorEmail, tierName, amount, region, invoiceRef }) {
  return send(T_NOTIFY, {
    to_email:   'admin@downflow.app',
    to_name:    'Platform Admin',
    subject:    `New funding request — ${sponsorName} · ${tierName}`,
    message:    `${sponsorName} (${sponsorEmail}) has submitted a funding request.\n\nTier: ${tierName}\nAmount: $${amount} USD\nRegion: ${region}\nReference: ${invoiceRef}\n\nLog in to confirm payment and activate their cells.`,
    action_url: `${window.location.origin}/platform`,
  })
}

// ── Confirm payment received to sponsor ─────────────────────
export async function notifySponsorPaymentConfirmed({ sponsorEmail, sponsorName, tierName, invoiceRef }) {
  return send(T_NOTIFY, {
    to_email:   sponsorEmail,
    to_name:    sponsorName,
    subject:    `Payment confirmed — Your cells are now active`,
    message:    `We've confirmed your payment for ${tierName} (${invoiceRef}). Your learning cells are now active. Log in to your sponsor dashboard to track impact.`,
    action_url: `${window.location.origin}/sponsor`,
  })
}

export { isEmailConfigured }

// ── Session reminder (24h or 1h before class) ───────────────
export async function sendSessionReminder({ toEmail, toName, cellId, packName, weekNum, sessionDate, sessionTime, meetLink, hoursUntil }) {
  return send(T_NOTIFY, {
    to_email:   toEmail,
    to_name:    toName,
    subject:    hoursUntil <= 1 ? `Class starts in 1 hour — ${packName}` : `Reminder: Class tomorrow — ${packName}`,
    message:    `Hi ${toName},\n\nYour DOWNFLOW session is ${hoursUntil <= 1 ? 'starting in 1 hour' : 'tomorrow'}.\n\n📚 Pack: ${packName}\n📅 Week: ${weekNum}\n🏫 Cell: ${cellId}\n🕐 Time: ${sessionDate} at ${sessionTime}\n\nJoin here: ${meetLink}\n\nSee you there!`,
    action_url: meetLink || `${window.location.origin}/student`,
  })
}

// ── Re-engagement (inactive student) ───────────────────────
export async function sendReEngagementEmail({ toEmail, toName, cellId, daysSinceLastSession, packName }) {
  return send(T_NOTIFY, {
    to_email:   toEmail,
    to_name:    toName,
    subject:    `We miss you, ${toName} — your cell is waiting`,
    message:    `Hi ${toName},\n\nIt's been ${daysSinceLastSession} days since your last session in ${cellId}.\n\nYour group is continuing with ${packName} — don't fall behind!\n\nLog in to see what you missed and book your next session.`,
    action_url: `${window.location.origin}/student`,
  })
}

// ── Teacher no-show alert ───────────────────────────────────
export async function alertNoShow({ adminEmail, facilitatorName, cellId, sessionDate }) {
  return send(T_NOTIFY, {
    to_email:   adminEmail || 'admin@downflow.app',
    to_name:    'Platform Admin',
    subject:    `⚠️ No-show alert — ${facilitatorName} · Cell ${cellId}`,
    message:    `Facilitator ${facilitatorName} did not appear for the scheduled session in Cell ${cellId} on ${sessionDate}.\n\nPlease assign a backup facilitator immediately and investigate.`,
    action_url: `${window.location.origin}/platform`,
  })
}

// ── New teacher application received ───────────────────────
export async function notifyNewTeacherApplication({ applicantName, applicantEmail, region }) {
  return send(T_NOTIFY, {
    to_email:   'admin@downflow.app',
    to_name:    'Platform Admin',
    subject:    `New facilitator application — ${applicantName}`,
    message:    `${applicantName} (${applicantEmail}) has applied to become a facilitator in region: ${region}.\n\nLog in to review their application and schedule a demo lesson.`,
    action_url: `${window.location.origin}/platform`,
  })
}

// ── Weekly performance digest to admin ─────────────────────
export async function sendWeeklyDigest({ activeCells, avgHealth, newStudents, retentionRate, flaggedCells }) {
  return send(T_NOTIFY, {
    to_email:   'admin@downflow.app',
    to_name:    'Platform Admin',
    subject:    `Weekly Digest — DOWNFLOW Platform`,
    message:    `Weekly Summary:\n\n📊 Active Cells: ${activeCells}\n💚 Average Health: ${avgHealth}%\n👥 New Students: ${newStudents}\n🔁 Retention Rate: ${retentionRate}%\n⚠️ Flagged Cells: ${flaggedCells}\n\nLog in for full details.`,
    action_url: `${window.location.origin}/platform`,
  })
}
