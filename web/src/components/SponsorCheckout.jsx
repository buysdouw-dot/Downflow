import { useState } from 'react'
import { SPONSORSHIP_TIERS, initiateCheckout, formatCurrency, isStripeConfigured } from '../services/stripe.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from './Toast.jsx'

export default function SponsorCheckout({ onClose }) {
  const { profile, displayName } = useAuth()
  const toast = useToast()
  const [selected, setSelected]   = useState('growth')
  const [loading,  setLoading]    = useState(false)
  const [step,     setStep]       = useState('select') // select | confirm | success

  const tier = SPONSORSHIP_TIERS.find(t => t.id === selected)

  async function handleCheckout() {
    setLoading(true)
    try {
      const result = await initiateCheckout({
        tierId:       selected,
        sponsorEmail: profile?.email || '',
        sponsorName:  displayName,
        cellId:       null,
      })
      if (result?.demo) {
        toast('Demo mode: Stripe not configured yet. Add VITE_STRIPE_PUBLIC_KEY to .env.local', 'info', 6000)
        setStep('success')
      }
    } catch (e) {
      toast(e.message || 'Checkout failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="vupload-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="checkout-modal">
        <button className="vupload-close" onClick={onClose}>✕</button>

        {step === 'success' ? (
          <div className="vupload-success">
            <div className="vupload-success-icon">✓</div>
            <p>Sponsorship initiated!</p>
            <p className="vupload-success-sub">You'll receive a confirmation email shortly. Your cells will be activated within 24 hours.</p>
            <button className="vupload-btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h2 className="vupload-title">Fund Learning Cells</h2>
            <p className="vupload-sub">Choose a sponsorship tier to activate cells and start tracking impact.</p>

            {!isStripeConfigured && (
              <div className="checkout-demo-banner">
                Demo mode — add <code>VITE_STRIPE_PUBLIC_KEY</code> to enable live payments
              </div>
            )}

            <div className="checkout-tiers">
              {SPONSORSHIP_TIERS.map(t => (
                <div
                  key={t.id}
                  className={`checkout-tier ${selected === t.id ? 'selected' : ''} ${t.popular ? 'popular' : ''}`}
                  onClick={() => setSelected(t.id)}
                  style={{ '--tier-color': t.color }}
                >
                  {t.popular && <span className="checkout-popular-badge">Most Popular</span>}
                  <div className="checkout-tier-name">{t.name}</div>
                  <div className="checkout-tier-price">
                    {formatCurrency(t.price)}
                    <span className="checkout-tier-period">{t.period}</span>
                  </div>
                  <p className="checkout-tier-desc">{t.description}</p>
                  <ul className="checkout-tier-features">
                    {t.features.map((f, i) => <li key={i}><span>✓</span> {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <div className="checkout-summary-row">
                <span>Selected:</span>
                <strong>{tier?.name}</strong>
              </div>
              <div className="checkout-summary-row">
                <span>Total:</span>
                <strong style={{ color: tier?.color }}>{formatCurrency(tier?.price || 0)}</strong>
              </div>
            </div>

            <div className="vupload-actions">
              <button className="vupload-btn-secondary" onClick={onClose}>Cancel</button>
              <button
                className="vupload-btn-primary"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing…' : `Fund Now — ${formatCurrency(tier?.price || 0)} →`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
