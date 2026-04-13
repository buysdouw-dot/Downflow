// ============================================================
// BackupSystem — Backup Facilitator Pool + No-show Management
// Admin only. Shows backup pool, assigns backup to cells,
// tracks no-shows and penalties.
// ============================================================
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { db, isConfigured, collection, getDocs, addDoc, updateDoc, doc, query, where, serverTimestamp } from '../services/firebase.js'
import { alertNoShow } from '../services/email.js'
import usePageMeta from '../hooks/usePageMeta.js'

const MOCK_BACKUPS = [
  { id: 'bf1', name: 'Linh Nguyen', region: 'VN', cells: ['VN-01', 'VN-02'], available: true, rating: 4.8, sessionsAsBkp: 3 },
  { id: 'bf2', name: 'Marco Schmidt', region: 'DE', cells: ['DE-01'], available: true, rating: 4.6, sessionsAsBkp: 1 },
  { id: 'bf3', name: 'Anh Pham', region: 'VN', cells: ['VN-01', 'VN-02', 'VN-03'], available: false, rating: 4.9, sessionsAsBkp: 7 },
]

const MOCK_INCIDENTS = [
  { id: 'i1', date: '2026-03-28', cellId: 'VN-02', facilitator: 'Truong Van A', type: 'late', resolved: true, backupAssigned: 'Linh Nguyen', penalty: 'Warning issued' },
  { id: 'i2', date: '2026-03-14', cellId: 'DE-01', facilitator: 'Klaus Weber', type: 'no-show', resolved: true, backupAssigned: 'Marco Schmidt', penalty: 'Session deducted from pay' },
]

const INCIDENT_TYPES = ['No-Show', 'Late (>10 min)', 'Left Early', 'Quality Issue']

export default function BackupSystem() {
  usePageMeta('Backup System', 'Manage backup facilitators and no-show incidents.')

  const { uid } = useAuth()
  const toast = useToast()

  const [backups,    setBackups]    = useState(MOCK_BACKUPS)
  const [incidents,  setIncidents]  = useState(MOCK_INCIDENTS)
  const [activeTab,  setActiveTab]  = useState('pool')
  const [showReport, setShowReport] = useState(false)
  const [reportForm, setReportForm] = useState({ cellId: '', facilitatorName: '', type: '', notes: '' })
  const [reporting,  setReporting]  = useState(false)

  async function reportIncident() {
    if (!reportForm.cellId || !reportForm.facilitatorName || !reportForm.type) {
      toast('Fill in all required fields', 'error'); return
    }
    setReporting(true)
    try {
      const incident = {
        ...reportForm,
        date:      new Date().toISOString().split('T')[0],
        resolved:  false,
        reportedBy: uid,
        createdAt:  isConfigured ? serverTimestamp() : new Date().toISOString(),
      }
      if (isConfigured) await addDoc(collection(db, 'noShowIncidents'), incident)
      await alertNoShow({
        facilitatorName: reportForm.facilitatorName,
        cellId:          reportForm.cellId,
        sessionDate:     incident.date,
      })
      setIncidents(prev => [{ id: 'new-' + Date.now(), ...incident, backupAssigned: 'Pending', penalty: 'Under review' }, ...prev])
      toast('Incident reported. Admin notified. Backup assignment in progress.', 'success')
      setShowReport(false)
      setReportForm({ cellId: '', facilitatorName: '', type: '', notes: '' })
    } catch (e) {
      toast('Failed: ' + e.message, 'error')
    } finally {
      setReporting(false)
    }
  }

  function toggleAvailability(id) {
    setBackups(prev => prev.map(b => b.id === id ? { ...b, available: !b.available } : b))
    toast('Availability updated', 'success')
  }

  return (
    <div className="bk-page">
      <div className="bk-hero">
        <div>
          <span className="kicker">Reliability System</span>
          <h1>Backup Facilitator System</h1>
          <p className="bk-sub">Manage your backup pool. When a facilitator can't make it, a backup is assigned within 2 hours — students never lose a session.</p>
        </div>
        <div className="bk-stat-row">
          <div className="bk-stat"><span>{backups.filter(b => b.available).length}</span> Available Backups</div>
          <div className="bk-stat"><span>{incidents.filter(i => !i.resolved).length}</span> Open Incidents</div>
          <div className="bk-stat"><span>{incidents.length}</span> Total Incidents</div>
        </div>
      </div>

      <div className="bk-tabs">
        {['pool', 'incidents', 'policy'].map(t => (
          <button key={t} className={`bk-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t === 'pool' ? '👥 Backup Pool' : t === 'incidents' ? '⚠️ Incidents' : '📋 Policy'}
          </button>
        ))}
        <button className="bk-report-btn" onClick={() => setShowReport(true)}>
          + Report Incident
        </button>
      </div>

      {/* Backup pool */}
      {activeTab === 'pool' && (
        <div className="bk-panel">
          <div className="bk-grid">
            {backups.map(b => (
              <div key={b.id} className={`bk-card ${b.available ? 'available' : 'unavailable'}`}>
                <div className="bk-card-header">
                  <div className="bk-avatar">{b.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="bk-name">{b.name}</div>
                    <div className="bk-region">{b.region === 'VN' ? '🇻🇳 Vietnam' : b.region === 'DE' ? '🇩🇪 Germany' : b.region}</div>
                  </div>
                  <div className={`bk-avail-badge ${b.available ? 'yes' : 'no'}`}>
                    {b.available ? '✓ Available' : '✕ Busy'}
                  </div>
                </div>
                <div className="bk-card-stats">
                  <span>⭐ {b.rating}</span>
                  <span>🔄 {b.sessionsAsBkp} backup sessions</span>
                </div>
                <div className="bk-cells">
                  <span className="bk-cells-label">Trained for:</span>
                  {b.cells.map(c => <span key={c} className="bk-cell-tag">{c}</span>)}
                </div>
                <button className="bk-toggle-btn" onClick={() => toggleAvailability(b.id)}>
                  Mark as {b.available ? 'Unavailable' : 'Available'}
                </button>
              </div>
            ))}
            <div className="bk-card add-card">
              <div className="bk-add-icon">+</div>
              <p>Add a new backup facilitator</p>
              <p className="bk-add-sub">Backups must complete full facilitator onboarding before joining the pool.</p>
            </div>
          </div>
        </div>
      )}

      {/* Incidents */}
      {activeTab === 'incidents' && (
        <div className="bk-panel">
          <h3 className="bk-panel-title">Reliability Incidents</h3>
          {incidents.length === 0 ? (
            <p style={{ color: 'var(--text-soft)' }}>No incidents recorded. Great reliability!</p>
          ) : (
            <table className="bk-table">
              <thead>
                <tr><th>Date</th><th>Cell</th><th>Facilitator</th><th>Type</th><th>Backup</th><th>Penalty</th><th>Status</th></tr>
              </thead>
              <tbody>
                {incidents.map(i => (
                  <tr key={i.id}>
                    <td>{i.date}</td>
                    <td><strong>{i.cellId}</strong></td>
                    <td>{i.facilitator || i.facilitatorName}</td>
                    <td><span className={`bk-type ${i.type === 'no-show' ? 'critical' : 'warning'}`}>{i.type}</span></td>
                    <td>{i.backupAssigned || '—'}</td>
                    <td style={{ color: 'var(--text-soft)', fontSize: '0.82rem' }}>{i.penalty}</td>
                    <td><span className={`bk-resolved ${i.resolved ? 'yes' : 'no'}`}>{i.resolved ? '✓ Resolved' : '⏳ Open'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Policy */}
      {activeTab === 'policy' && (
        <div className="bk-panel">
          <h3 className="bk-panel-title">Cancellation & Reliability Policy</h3>
          <div className="bk-policy-grid">
            {[
              { title: '24h+ notice', color: '#4de8b0', icon: '✓', desc: 'Facilitator notifies admin >24 hours before session. Backup assigned. No penalty.' },
              { title: '2–24h notice', color: '#d4a840', icon: '⚠', desc: 'Short notice. Backup assigned if available. Verbal warning issued. Deduction from that session\'s pay.' },
              { title: 'No-Show (0 notice)', color: '#ff6b9d', icon: '✕', desc: 'Emergency backup activated. Full session pay deducted. Second no-show = immediate removal from platform.' },
              { title: 'Quality Issue', color: '#b083ff', icon: '★', desc: 'Student rating below 3/5 for 2 consecutive sessions. Mandatory supervised session review. Third strike = removal.' },
            ].map(p => (
              <div key={p.title} className="bk-policy-card" style={{ '--pc': p.color }}>
                <div className="bk-policy-icon" style={{ color: p.color }}>{p.icon}</div>
                <h4 className="bk-policy-title">{p.title}</h4>
                <p className="bk-policy-desc">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="bk-policy-note">
            <strong>The rule is simple:</strong> Students never lose a paid session. If a facilitator can't make it, it is our responsibility — not the student's problem. That is what separates a professional operation from an informal tutoring business.
          </div>
        </div>
      )}

      {/* Report modal */}
      {showReport && (
        <div className="bk-overlay" onClick={e => e.target === e.currentTarget && setShowReport(false)}>
          <div className="bk-modal">
            <h3>Report Reliability Incident</h3>
            <div className="bk-form-row">
              <div className="bk-form-field">
                <label>Cell ID</label>
                <input className="bk-input" placeholder="e.g. VN-01"
                  value={reportForm.cellId} onChange={e => setReportForm(p => ({ ...p, cellId: e.target.value }))} />
              </div>
              <div className="bk-form-field">
                <label>Facilitator Name</label>
                <input className="bk-input" placeholder="Facilitator's name"
                  value={reportForm.facilitatorName} onChange={e => setReportForm(p => ({ ...p, facilitatorName: e.target.value }))} />
              </div>
            </div>
            <div className="bk-form-field">
              <label>Incident Type</label>
              <select className="bk-select" value={reportForm.type} onChange={e => setReportForm(p => ({ ...p, type: e.target.value }))}>
                <option value="">Select type…</option>
                {INCIDENT_TYPES.map(t => <option key={t} value={t.toLowerCase().replace(/ /g, '-')}>{t}</option>)}
              </select>
            </div>
            <div className="bk-form-field">
              <label>Notes <span style={{ color: 'var(--text-soft)' }}>(optional)</span></label>
              <textarea className="bk-textarea" rows={3} placeholder="Any additional context…"
                value={reportForm.notes} onChange={e => setReportForm(p => ({ ...p, notes: e.target.value }))} />
            </div>
            <div className="bk-modal-actions">
              <button className="bk-btn-secondary" onClick={() => setShowReport(false)}>Cancel</button>
              <button className="bk-btn-primary" onClick={reportIncident} disabled={reporting}>
                {reporting ? 'Reporting…' : 'Report & Notify Admin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
