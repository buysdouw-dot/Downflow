import React from 'react'
// ============================================================
// Referrals — Referral system for connectors + sponsors
// Generates unique referral links, tracks clicks + conversions.
// ============================================================
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { db, isConfigured, collection, query, where, getDocs, addDoc, serverTimestamp } from '../services/firebase.js'
import usePageMeta from '../hooks/usePageMeta.js'

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://downflow.app'

const MOCK_REFERRALS = [
  { id: 'r1', name: 'Minh Tran',    type: 'student',    date: '2026-03-28', status: 'converted', reward: '500 coins' },
  { id: 'r2', name: 'TechStart VN', type: 'sponsor',    date: '2026-03-15', status: 'converted', reward: '$50 credit' },
  { id: 'r3', name: 'Lan Nguyen',   type: 'facilitator',date: '2026-04-01', status: 'pending',   reward: '+5% phase bonus' },
  { id: 'r4', name: 'Anna Mueller', type: 'student',    date: '2026-04-05', status: 'clicked',   reward: 'Pending sign-up' },
]

const REWARD_MAP = {
  student:    { reward: '500 coins',          desc: 'Credited to your wallet when referred student completes their first session.' },
  facilitator:{ reward: '+5% phase bonus',    desc: 'Permanently unlocks Phase 3 (45% revenue share) when they complete onboarding.' },
  sponsor:    { reward: '$50 account credit', desc: 'Applied to your next sponsorship invoice when the referred sponsor funds their first cell.' },
  connector:  { reward: '1 priority listing', desc: 'Your connector profile is featured in the next regional rollout.' },
}

export default function Referrals() {
  usePageMeta('Referrals', 'Share DOWNFLOW and earn rewards for every person you bring in.')

  const { uid, role, displayName } = useAuth()
  const toast = useToast()

  const [referrals, setReferrals] = useState(MOCK_REFERRALS)
  const [copied,    setCopied]    = useState({})
  const [activeTab, setActiveTab] = useState('links')

  const refCode  = `ref_${(uid || 'demo').slice(0, 8)}`
  const links = {
    student:    `${BASE_URL}/join?role=student&ref=${refCode}`,
    facilitator:`${BASE_URL}/join?role=facilitator&ref=${refCode}`,
    sponsor:    `${BASE_URL}/join?role=sponsor&ref=${refCode}`,
    connector:  `${BASE_URL}/join?role=connector&ref=${refCode}`,
  }

  useEffect(() => {
    if (!isConfigured || !uid) return
    const q = query(collection(db, 'referrals'), where('referrerId', '==', uid))
    getDocs(q).then(snap => {
      if (!snap.empty) setReferrals(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }).catch(() => {})
  }, [uid])

  async function copyLink(type) {
    await navigator.clipboard.writeText(links[type])
    setCopied(prev => ({ ...prev, [type]: true }))
    toast(`${type} link copied!`, 'success')
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000)
  }

  const converted  = referrals.filter(r => r.status === 'converted').length
  const pending    = referrals.filter(r => r.status === 'pending').length
  const clicked    = referrals.filter(r => r.status === 'clicked').length

  return (
    <div className="ref-page">
      <div className="ref-hero">
        <div>
          <span className="kicker">Growth System</span>
          <h1>Referral Programme</h1>
          <p className="ref-sub">Share DOWNFLOW. Earn rewards for every person who joins through your link. You are building this network — you should benefit from it.</p>
        </div>
        <div className="ref-stats-row">
          <div className="ref-stat"><span>{referrals.length}</span>Total Referred</div>
          <div className="ref-stat green"><span>{converted}</span>Converted</div>
          <div className="ref-stat amber"><span>{pending}</span>Pending</div>
          <div className="ref-stat blue"><span>{clicked}</span>Clicked</div>
        </div>
      </div>

      <div className="ref-tabs">
        {['links', 'history', 'rewards'].map(t => (
          <button key={t} className={`ref-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {{ links: '🔗 Your Links', history: '📋 History', rewards: '🎁 Rewards' }[t]}
          </button>
        ))}
      </div>

      {/* Links */}
      {activeTab === 'links' && (
        <div className="ref-panel">
          <h3 className="ref-panel-title">Your Referral Links</h3>
          <p style={{ color: 'var(--text-soft)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
            Share these links on social media, WhatsApp, email, or anywhere. When someone signs up through your link, you both benefit.
          </p>
          <div className="ref-links-grid">
            {Object.entries(links).map(([type, url]) => (
              <div key={type} className="ref-link-card">
                <div className="ref-link-header">
                  <div className="ref-link-type">
                    <span className={`ref-role-dot ${type}`} />
                    {type.charAt(0).toUpperCase() + type.slice(1)} Link
                  </div>
                  <div className="ref-reward-badge">{REWARD_MAP[type].reward}</div>
                </div>
                <div className="ref-link-url">{url}</div>
                <p className="ref-reward-desc">{REWARD_MAP[type].desc}</p>
                <div className="ref-link-actions">
                  <button className="ref-copy-btn" onClick={() => copyLink(type)}>
                    {copied[type] ? '✓ Copied!' : '📋 Copy Link'}
                  </button>
                  <button className="ref-share-btn" onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'Join DOWNFLOW', url })
                    } else copyLink(type)
                  }}>
                    ↗ Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="ref-code-box">
            <div>
              <div className="ref-code-label">Your referral code</div>
              <div className="ref-code">{refCode}</div>
            </div>
            <button className="ref-copy-btn" onClick={() => { navigator.clipboard.writeText(refCode); toast('Code copied!', 'success') }}>
              Copy Code
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="ref-panel">
          <h3 className="ref-panel-title">Referral History</h3>
          {referrals.length === 0 ? (
            <p style={{ color: 'var(--text-soft)' }}>No referrals yet. Copy your link above and share it!</p>
          ) : (
            <table className="ref-table">
              <thead>
                <tr><th>Name</th><th>Type</th><th>Date</th><th>Status</th><th>Reward</th></tr>
              </thead>
              <tbody>
                {referrals.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td><span className={`ref-role-badge ${r.type}`}>{r.type}</span></td>
                    <td>{r.date}</td>
                    <td><span className={`ref-status ${r.status}`}>{r.status}</span></td>
                    <td style={{ color: '#4de8b0', fontSize: '0.82rem' }}>{r.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Rewards */}
      {activeTab === 'rewards' && (
        <div className="ref-panel">
          <h3 className="ref-panel-title">Reward Structure</h3>
          <div className="ref-rewards-grid">
            {Object.entries(REWARD_MAP).map(([type, r]) => (
              <div key={type} className="ref-reward-card">
                <div className="ref-reward-type">Refer a {type}</div>
                <div className="ref-reward-amount">{r.reward}</div>
                <p className="ref-reward-how">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="ref-rules-box">
            <h4>How Rewards Work</h4>
            <ul>
              <li>Rewards are triggered when the referred person <strong>completes their first qualifying action</strong> (first session, first cell funded, onboarding complete).</li>
              <li>Coin rewards are credited to your wallet automatically.</li>
              <li>Financial credits are applied to your next invoice.</li>
              <li>Phase bonus is permanent — it does not reset.</li>
              <li>There is no limit on the number of referrals.</li>
              <li>Self-referral, fake accounts, or abuse will result in account suspension.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
