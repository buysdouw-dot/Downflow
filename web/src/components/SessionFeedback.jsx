import React from 'react'
// ============================================================
// SessionFeedback — Post-class rating modal
// Shown to students after each session.
// Writes to Firestore: sessionFeedback/{cellId}_{weekNum}_{studentId}
// ============================================================
import { useState } from 'react'
import { db, isConfigured, addDoc, collection, serverTimestamp } from '../services/firebase.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from './Toast.jsx'

const EMOJI_RATINGS = [
  { value: 1, emoji: '😞', label: 'Poor' },
  { value: 2, emoji: '😕', label: 'Fair' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '🤩', label: 'Amazing' },
]

export default function SessionFeedback({ session, onClose, onSubmit }) {
  const { uid, displayName } = useAuth()
  const toast = useToast()

  const [teacherRating,  setTeacherRating]  = useState(0)
  const [sessionRating,  setSessionRating]  = useState(0)
  const [highlight,      setHighlight]      = useState('')
  const [improvement,    setImprovement]    = useState('')
  const [wouldReturn,    setWouldReturn]    = useState(null)
  const [submitting,     setSubmitting]     = useState(false)

  const canSubmit = teacherRating > 0 && sessionRating > 0

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const data = {
        studentId:      uid || 'guest',
        studentName:    displayName || 'Student',
        cellId:         session?.cellId || 'unknown',
        weekNum:        session?.weekNum || 0,
        facilitatorId:  session?.facilitatorId || '',
        facilitatorName:session?.facilitatorName || '',
        teacherRating,
        sessionRating,
        highlight:      highlight.trim(),
        improvement:    improvement.trim(),
        wouldReturn,
        createdAt:      isConfigured ? serverTimestamp() : new Date().toISOString(),
      }
      if (isConfigured) {
        await addDoc(collection(db, 'sessionFeedback'), data)
      }
      toast('Feedback submitted — thank you!', 'success')
      onSubmit?.(data)
      onClose?.()
    } catch (e) {
      toast('Failed to submit feedback: ' + e.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="sfb-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="sfb-modal">
        <div className="sfb-header">
          <div className="sfb-icon">📋</div>
          <div>
            <h2 className="sfb-title">Session Feedback</h2>
            <p className="sfb-sub">
              {session?.packName || 'Today\'s session'} · Week {session?.weekNum || '—'} · Cell {session?.cellId || '—'}
            </p>
          </div>
          <button className="sfb-close" onClick={onClose}>✕</button>
        </div>

        {/* Teacher rating */}
        <div className="sfb-section">
          <label className="sfb-label">How was your facilitator today?</label>
          <div className="sfb-emojis">
            {EMOJI_RATINGS.map(r => (
              <button key={r.value}
                className={`sfb-emoji-btn ${teacherRating === r.value ? 'selected' : ''}`}
                onClick={() => setTeacherRating(r.value)}>
                <span className="sfb-emoji">{r.emoji}</span>
                <span className="sfb-emoji-label">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Session rating */}
        <div className="sfb-section">
          <label className="sfb-label">How was the session overall?</label>
          <div className="sfb-emojis">
            {EMOJI_RATINGS.map(r => (
              <button key={r.value}
                className={`sfb-emoji-btn ${sessionRating === r.value ? 'selected' : ''}`}
                onClick={() => setSessionRating(r.value)}>
                <span className="sfb-emoji">{r.emoji}</span>
                <span className="sfb-emoji-label">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Would you return */}
        <div className="sfb-section">
          <label className="sfb-label">Would you come back next week?</label>
          <div className="sfb-yn-row">
            <button className={`sfb-yn ${wouldReturn === true ? 'yes' : ''}`}
              onClick={() => setWouldReturn(true)}>👍 Yes, definitely</button>
            <button className={`sfb-yn ${wouldReturn === false ? 'no' : ''}`}
              onClick={() => setWouldReturn(false)}>🤔 Not sure</button>
          </div>
        </div>

        {/* Open text */}
        <div className="sfb-section">
          <label className="sfb-label">Best moment this session <span className="sfb-opt">(optional)</span></label>
          <input className="sfb-input" placeholder="What stood out for you?"
            value={highlight} onChange={e => setHighlight(e.target.value)} maxLength={200} />
        </div>

        <div className="sfb-section">
          <label className="sfb-label">What could be better? <span className="sfb-opt">(optional)</span></label>
          <input className="sfb-input" placeholder="Any suggestions..."
            value={improvement} onChange={e => setImprovement(e.target.value)} maxLength={200} />
        </div>

        <div className="sfb-actions">
          <button className="sfb-btn-secondary" onClick={onClose}>Skip</button>
          <button className="sfb-btn-primary" onClick={handleSubmit}
            disabled={!canSubmit || submitting}>
            {submitting ? 'Submitting…' : 'Submit Feedback'}
          </button>
        </div>

        <p className="sfb-privacy">Your feedback is private and used only to improve session quality.</p>
      </div>
    </div>
  )
}
