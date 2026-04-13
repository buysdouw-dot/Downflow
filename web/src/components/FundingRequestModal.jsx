import React from 'react'
import { useState } from 'react'
import { FUNDING_TIERS, WISE_DETAILS, createFundingRequest } from '../services/funding.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from './Toast.jsx'
import { printFundingInvoice } from '../utils/printInvoice.js'

export default function FundingRequestModal({ onClose, onSuccess }) {
  const { uid, profile, displayName } = useAuth()
  const toast = useToast()

  const [step,         setStep]         = useState('select')   // select | details | payment | done
  const [selected,     setSelected]     = useState('growth')
  const [region,       setRegion]       = useState('VN')
  const [customAmount, setCustomAmount] = useState('')
  const [customNote,   setCustomNote]   = useState('')
  const [submitting,   setSubmitting]   = useState(false)
  const [request,      setRequest]      = useState(null)
  const [currency,     setCurrency]     = useState('USD')

  const tier = FUNDING_TIERS.find(t => t.id === selected)
  const amount = selected === 'custom' ? (customAmount || '—') : tier?.amount

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const rec = await createFundingRequest({
        sponsorId:    uid || 'guest',
        sponsorName:  displayName || profile?.name || 'Sponsor',
        sponsorEmail: profile?.email || '',
        tierId:       selected,
        customAmount: selected === 'custom' ? Number(customAmount) : null,
        customNote,
        region,
      })
      setRequest(rec)
      setStep('payment')
      toast('Funding request submitted! Payment details below.', 'success')
      if (onSuccess) onSuccess(rec)
    } catch (e) {
      toast('Failed to submit request: ' + e.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const wiseInfo = currency === 'EUR' ? WISE_DETAILS.eur
                 : currency === 'VND' ? WISE_DETAILS.vnd
                 : WISE_DETAILS.usd

  return (
    <div className="vupload-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="fund-modal">
        <button className="vupload-close" onClick={onClose}>✕</button>

        {/* ── Step 1: Select tier ── */}
        {step === 'select' && (
          <>
            <h2 className="fund-title">Request to Fund Learning Cells</h2>
            <p className="fund-sub">Choose a sponsorship tier. We'll send you payment instructions and activate your cells once payment is confirmed.</p>

            <div className="fund-tiers">
              {FUNDING_TIERS.map(t => (
                <div key={t.id}
                  className={`fund-tier ${selected === t.id ? 'selected' : ''}`}
                  style={{ '--tc': t.color }}
                  onClick={() => setSelected(t.id)}>
                  {t.popular && <span className="fund-popular">Most Popular</span>}
                  <div className="fund-tier-name">{t.name}</div>
                  {t.amount ? (
                    <div className="fund-tier-price">
                      ${t.amount.toLocaleString()} <span>USD / {t.period}</span>
                    </div>
                  ) : (
                    <div className="fund-tier-price">Custom <span>— negotiated</span></div>
                  )}
                  {t.cells && <div className="fund-tier-meta">{t.cells} cell{t.cells > 1 ? 's' : ''} · {t.students} students</div>}
                  <ul className="fund-tier-features">
                    {t.features.map((f, i) => <li key={i}><span style={{ color: t.color }}>✓</span> {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {selected === 'custom' && (
              <div className="fund-custom-row">
                <input className="login-input" type="number" placeholder="Amount in USD"
                  value={customAmount} onChange={e => setCustomAmount(e.target.value)} />
                <textarea className="fund-textarea" placeholder="Describe your requirements (regions, number of cells, cycle length, etc.)"
                  value={customNote} onChange={e => setCustomNote(e.target.value)} rows={3} />
              </div>
            )}

            <div className="fund-region-row">
              <label className="login-label">Target region</label>
              <select className="fund-select" value={region} onChange={e => setRegion(e.target.value)}>
                <option value="VN">Vietnam 🇻🇳</option>
                <option value="DE">Germany 🇩🇪</option>
                <option value="RU">Russia 🇷🇺</option>
                <option value="GLOBAL">Global / Multiple</option>
              </select>
            </div>

            <div className="vupload-actions">
              <button className="vupload-btn-secondary" onClick={onClose}>Cancel</button>
              <button className="vupload-btn-primary" onClick={() => setStep('details')}
                disabled={selected === 'custom' && !customAmount}>
                Continue →
              </button>
            </div>
          </>
        )}

        {/* ── Step 2: Confirm details ── */}
        {step === 'details' && (
          <>
            <h2 className="fund-title">Confirm Your Request</h2>
            <p className="fund-sub">Review the details before we generate your payment instructions.</p>

            <div className="fund-summary-box">
              <div className="fund-sum-row"><span>Tier</span><strong>{tier?.name}</strong></div>
              <div className="fund-sum-row"><span>Amount</span><strong style={{ color: tier?.color }}>${amount} USD</strong></div>
              {tier?.vnd && <div className="fund-sum-row"><span>VND equivalent</span><strong>~{tier.vnd.toLocaleString()} ₫</strong></div>}
              <div className="fund-sum-row"><span>Region</span><strong>{region}</strong></div>
              <div className="fund-sum-row"><span>Cells</span><strong>{tier?.cells || 'TBD'}</strong></div>
              <div className="fund-sum-row"><span>Students</span><strong>{tier?.students || 'TBD'}</strong></div>
              <div className="fund-sum-row"><span>Cycle</span><strong>{tier?.period || 'Negotiated'}</strong></div>
            </div>

            <div className="fund-region-row" style={{ marginTop: '1rem' }}>
              <label className="login-label">Pay in currency</label>
              <select className="fund-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                <option value="USD">USD — US Dollars</option>
                <option value="EUR">EUR — Euros (SEPA)</option>
                <option value="VND">VND — Vietnamese Dong</option>
              </select>
            </div>

            <div className="vupload-actions">
              <button className="vupload-btn-secondary" onClick={() => setStep('select')}>← Back</button>
              <button className="vupload-btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Request →'}
              </button>
            </div>
          </>
        )}

        {/* ── Step 3: Payment instructions ── */}
        {step === 'payment' && request && (
          <>
            <div className="fund-success-header">
              <div className="fund-success-icon">✓</div>
              <div>
                <h2 className="fund-title" style={{ marginBottom: '0.15rem' }}>Request Received</h2>
                <p className="fund-sub" style={{ margin: 0 }}>Reference: <strong style={{ color: '#4de8b0' }}>{request.invoiceRef}</strong></p>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', margin: '0.75rem 0 1.25rem', lineHeight: 1.6 }}>
              Your cells will be activated within <strong>24 hours</strong> of payment confirmation. Transfer the amount below via Wise and use your reference number.
            </p>

            {/* Wise payment block */}
            <div className="fund-wise-block">
              <div className="fund-wise-header">
                <span className="fund-wise-logo">💸 Wise</span>
                <span className="fund-wise-currency">{currency}</span>
              </div>

              <div className="fund-wise-details">
                <div className="fund-wise-row"><span>Account name</span><strong>{WISE_DETAILS.accountName}</strong></div>
                <div className="fund-wise-row"><span>Bank</span><strong>{wiseInfo.bankName}</strong></div>
                {wiseInfo.iban        && <div className="fund-wise-row"><span>IBAN</span><strong>{wiseInfo.iban}</strong></div>}
                {wiseInfo.bic         && <div className="fund-wise-row"><span>BIC / SWIFT</span><strong>{wiseInfo.bic}</strong></div>}
                {wiseInfo.routingNumber && <div className="fund-wise-row"><span>Routing number</span><strong>{wiseInfo.routingNumber}</strong></div>}
                {wiseInfo.accountNumber && <div className="fund-wise-row"><span>Account number</span><strong>{wiseInfo.accountNumber}</strong></div>}
                {wiseInfo.accountType   && <div className="fund-wise-row"><span>Account type</span><strong>{wiseInfo.accountType}</strong></div>}
                {wiseInfo.note          && <div className="fund-wise-row note"><span>Note</span><strong>{wiseInfo.note}</strong></div>}
                <div className="fund-wise-row highlight">
                  <span>Payment reference</span>
                  <strong>{request.invoiceRef}-{(displayName || 'SPONSOR').replace(/\s+/g, '-').toUpperCase()}</strong>
                </div>
                <div className="fund-wise-row highlight">
                  <span>Amount</span>
                  <strong>${amount} {currency}</strong>
                </div>
              </div>

              <p className="fund-wise-note">{WISE_DETAILS.note}</p>
            </div>

            <div className="fund-wise-actions">
              <button className="vupload-btn-secondary" onClick={() => printFundingInvoice({
                request, tier, currency, wiseInfo, displayName, WISE_DETAILS
              })}>🖨 Download Invoice PDF</button>
              <button className="vupload-btn-primary" onClick={onClose}>Done</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
