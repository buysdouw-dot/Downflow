import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NetworkBg from './NetworkBg.jsx'
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext.jsx'

const NAV = [
  { to: '/', label: 'Home', exact: true },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/content', label: 'Content' },
  { to: '/news', label: 'News' },
  { to: '/model', label: '▶ Model Film' },
  { to: '/facilitator-film', label: '🎬 Facilitator Film' },
  { to: '/connector-film', label: '🔗 Connector Film' },
  { to: '/funding', label: '★ Invest' },
  { to: '/sponsor', label: 'Sponsors' },
  { to: '/student', label: 'Students' },
  { to: '/facilitator', label: 'Facilitators' },
  { to: '/facilitator-app', label: '📱 Facilitator App' },
  { to: '/facilitator-onboarding', label: '📄 Contract' },
  { to: '/social-ads', label: '📣 Social Ads' },
  { to: '/join', label: '🌐 Join' },
  { to: '/auto-funnel', label: '⚡ Funnel' },
  { to: '/connector', label: 'Connectors' },
  { to: '/payments', label: 'Payments' },
  { to: '/payment-engine', label: 'Pay Engine' },
  { to: '/assistants', label: 'Assistants' },
  { to: '/platform', label: 'Platform' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const { persona, switchPersona, isConfigured } = useAuth()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)

  useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false); setViewerOpen(false) }, [pathname])

  return (
    <div className="site-shell">
      <div className="bg-grid" aria-hidden="true"/>
      <NetworkBg/>

      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-down">DOWN</span><span className="brand-flow">FLOW</span>
          <span className="brand-sub"> — School of Life</span>
        </Link>

        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} className={({ isActive }) => isActive ? 'nav-active' : undefined}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-right">
          {/* "Viewing as:" role switcher — mirrors Antigravity's dropdown */}
          {!isConfigured && (
            <div className="viewer-wrap">
              <button className="viewer-btn" onClick={() => setViewerOpen(o => !o)}>
                <span className="viewer-icon">{persona.icon}</span>
                <span className="viewer-label">Viewing as: <strong>{persona.label}</strong></span>
                <span className="viewer-caret">▾</span>
              </button>
              {viewerOpen && (
                <div className="viewer-dropdown">
                  <p className="viewer-dropdown-head">Switch View</p>
                  {DEMO_PERSONAS.map(p => (
                    <button
                      key={p.id}
                      className={`viewer-option${persona.id===p.id?' active':''}`}
                      onClick={() => { switchPersona(p.id); setViewerOpen(false) }}
                    >
                      <span>{p.icon}</span>
                      <span className="vo-label">{p.label}</span>
                      <span className="vo-name">{p.name}</span>
                    </button>
                  ))}
                  <div className="viewer-dropdown-footer">
                    <p>🔥 Demo mode — <a href="#connect">Connect Firebase</a> for live data</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </header>

      <main><Outlet/></main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <p className="brand"><span className="brand-down">DOWN</span><span className="brand-flow">FLOW</span></p>
            <p className="footer-sub">School of Life — A sponsor-funded, globally distributed education infrastructure.<br/>Vietnam · Russia · Germany · Global</p>
          </div>
          <div className="footer-links">
            <div><p className="footer-col-head">Portals</p>
              {NAV.slice(1).map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}
            </div>
            <div><p className="footer-col-head">Regions</p>
              <span>🇻🇳 Vietnam</span><span>🇷🇺 Russia</span><span>🇩🇪 Germany</span><span>🌍 Global</span>
            </div>
          </div>
        </div>
        <p className="footer-legal">© 2026 Downflow — School of Life. All rights reserved.</p>
      </footer>
    </div>
  )
}
