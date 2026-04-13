import { Link, useLocation } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

export default function NotFound() {
  usePageMeta('404 — Page Not Found', 'This page does not exist in the DOWNFLOW system.')
  const { pathname } = useLocation()

  return (
    <div className="notfound-page">
      <div className="notfound-inner">
        <div className="notfound-code">404</div>
        <div className="notfound-mark">⬡</div>
        <h1 className="notfound-title">This cell doesn't exist.</h1>
        <p className="notfound-sub">
          <code className="notfound-path">{pathname}</code> is not part of the network.
          Maybe the URL changed, or this page was never activated.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">Back to Home →</Link>
          <Link to="/onboarding" className="btn btn-secondary">Get Started</Link>
        </div>

        <div className="notfound-links">
          <p className="notfound-links-label">Or go directly to:</p>
          <div className="notfound-links-grid">
            {[
              { to: '/booking',    icon: '📅', label: 'Book a Session' },
              { to: '/curriculum', icon: '📦', label: 'Curriculum' },
              { to: '/about',      icon: '📖', label: 'About' },
              { to: '/pricing',    icon: '💰', label: 'Pricing' },
              { to: '/funding',    icon: '💛', label: 'Sponsor' },
              { to: '/support',    icon: '❓', label: 'Support' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="notfound-link">
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
