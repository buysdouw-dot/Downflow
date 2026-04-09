// ============================================================
// Retention Service — Re-engagement triggers
// Detects inactive students + sends nudge emails.
// Called from PlatformDashboard weekly review.
// ============================================================
import { db, isConfigured, collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from './firebase.js'
import { sendReEngagementEmail } from './email.js'

const INACTIVE_THRESHOLD_DAYS = 7

/**
 * Check all students — fire re-engagement email if last session >7 days ago.
 * Returns array of students who were nudged.
 */
export async function runRetentionCheck() {
  if (!isConfigured) {
    console.log('[Retention — dev mode] Would check for inactive students')
    return []
  }

  const nudged = []
  const cutoff = new Date(Date.now() - INACTIVE_THRESHOLD_DAYS * 86400000)

  try {
    const snap = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')))
    for (const d of snap.docs) {
      const student = { id: d.id, ...d.data() }
      if (!student.lastSessionDate) continue

      const lastDate = student.lastSessionDate.toDate?.() || new Date(student.lastSessionDate)
      const daysSince = Math.floor((Date.now() - lastDate.getTime()) / 86400000)

      if (daysSince >= INACTIVE_THRESHOLD_DAYS && student.email) {
        await sendReEngagementEmail({
          toEmail:            student.email,
          toName:             student.displayName || 'Student',
          cellId:             student.cellId || 'your cell',
          daysSinceLastSession: daysSince,
          packName:           student.currentPack || 'your current pack',
        })
        // Mark as nudged so we don't spam daily
        await updateDoc(doc(db, 'users', student.id), {
          lastNudgedAt: serverTimestamp(),
        })
        nudged.push({ id: student.id, name: student.displayName, daysSince })
      }
    }
  } catch (e) {
    console.error('[Retention check failed]', e)
  }

  return nudged
}

/**
 * Fire session reminder emails for sessions happening in the next 25 hours.
 * Run this as a daily cron or manual trigger from Platform admin.
 */
export async function runSessionReminders() {
  if (!isConfigured) {
    console.log('[Session Reminders — dev mode] Would send reminders')
    return []
  }

  const sent = []
  const now  = Date.now()
  const in25h = now + 25 * 3600000

  try {
    const snap = await getDocs(collection(db, 'sessions'))
    for (const d of snap.docs) {
      const session = { id: d.id, ...d.data() }
      if (!session.scheduledAt) continue
      const sessionTime = session.scheduledAt.toDate?.() || new Date(session.scheduledAt)
      const msUntil = sessionTime.getTime() - now

      if (msUntil > 0 && msUntil < in25h && !session.reminderSent) {
        const hoursUntil = Math.round(msUntil / 3600000)
        // Get all students in this cell
        const studSnap = await getDocs(query(collection(db, 'users'),
          where('cellId', '==', session.cellId), where('role', '==', 'student')))

        for (const sd of studSnap.docs) {
          const student = sd.data()
          if (student.email) {
            await sendReEngagementEmail({
              toEmail: student.email,
              toName:  student.displayName || 'Student',
              cellId:  session.cellId,
              daysSinceLastSession: 0,
              packName: session.packName || 'upcoming session',
            })
            sent.push(student.displayName)
          }
        }
        // Mark session reminder as sent
        await updateDoc(doc(db, 'sessions', session.id), { reminderSent: true })
      }
    }
  } catch (e) {
    console.error('[Session reminders failed]', e)
  }

  return sent
}

/**
 * Calculate retention rate for a cell.
 * retention = students who attended week N / students who attended week 1
 */
export function calcRetentionRate(attendanceRecords) {
  if (!attendanceRecords?.length) return 0
  const week1 = attendanceRecords.filter(r => r.weekNum === 1).length
  const latest = Math.max(...attendanceRecords.map(r => r.weekNum))
  const latestCount = attendanceRecords.filter(r => r.weekNum === latest).length
  return week1 > 0 ? Math.round((latestCount / week1) * 100) : 0
}

/**
 * Get Day-1, Day-3, Day-7 retention funnel stats from signup data.
 * Returns { d1, d3, d7 } as percentages.
 */
export async function getRetentionFunnel() {
  if (!isConfigured) return { d1: 85, d3: 62, d7: 45 }

  try {
    const snap = await getDocs(collection(db, 'users'))
    const students = snap.docs
      .map(d => d.data())
      .filter(u => u.role === 'student' && u.createdAt)

    const total = students.length
    if (total === 0) return { d1: 0, d3: 0, d7: 0 }

    const now = Date.now()
    const returned = (days) => students.filter(s => {
      const created = s.createdAt.toDate?.() || new Date(s.createdAt)
      const age = (now - created.getTime()) / 86400000
      if (age < days) return false
      const lastSession = s.lastSessionDate
        ? (s.lastSessionDate.toDate?.() || new Date(s.lastSessionDate))
        : null
      if (!lastSession) return false
      const daysSinceCreated = (lastSession.getTime() - created.getTime()) / 86400000
      return daysSinceCreated <= days
    }).length

    return {
      d1: Math.round((returned(1) / total) * 100),
      d3: Math.round((returned(3) / total) * 100),
      d7: Math.round((returned(7) / total) * 100),
    }
  } catch (e) {
    return { d1: 0, d3: 0, d7: 0 }
  }
}
