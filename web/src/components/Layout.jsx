import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NetworkBg from './NetworkBg.jsx'
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext.jsx'

// ── Top-level nav groups (keeps topbar clean) ────────────────
const NAV_GROUPS = [
  {
    label: 'Explore',
    links: [
      { to: '/',          label: 'Home',           exact: true },
      { to: '/curriculum', label: 'Curriculum' },
      { to: '/content',   label: 'Content Engine' },
      { to: '/news',      label: 'News' },
    ]
  },
  {
    label: 'Films',
    links: [
      { to: '/model',            label: '▶ Model Film' },
      { to: '/facilitator-film', label: 'Facilitator Film' },
      { to: '/connector-film',   label: 'Connector Film' },
    ]
  },
  {
    label: 'Dashboards',
    links: [
      { to: '/sponsor',    label: '💼 Sponsor' },
      { to: '/student',    label: '🎓 Student' },
      { to: '/facilitator',label: '🧭 Facilitator' },
      { to: '/connector',  label: '🔗 Connector' },
      { to: '/platform',   label: '⚡ Platform' },
    ]
  },
  {
    label: 'Financials',
    links: [
      { to: '/funding',        label: '★ Invest' },
      { to: '/payments',       label: 'Payments' },
      { to: '/payment-engine', label: 'Pay Engine' },
    ]
  },
  {
    label: 'Growth',
    links: [
      { to: '/join',                  label: '🌐 Join' },
      { to: '/auto-funnel',           label: '⚡ Funnel' },
      { to: '/social-ads',            label: '📣 Ads' },
      { to: '/referrals',             label: '🔗 Referrals' },
      { to: '/facilitator-app',       label: '📱 Facilitator App' },
      { to: '/facilitator-onboarding',label: '📄 Contract' },
      { to: '/assistants',            label: 'Assistants' },
      { to: '/integrations',          label: '🔗 Integrations' },
      { to: '/recordings',            label: '📹 Recordings' },
    ]
  },
  {
    label: 'Help',
    links: [
      { to: '/support',  label: '❓ Support & FAQ' },
      { to: '/legal',    label: '📄 Legal' },
      { to: '/metrics',  label: '📊 Business Metrics' },
    ]
  },
]

// Flat list for footer
const ALL_NAV = NAV_GROUPS.flatMap(g => g.links)

function NavGroup({ group, currentPath }) {
  const isActive = group.links.some(l => l.exact ? currentPath === l.to : currentPath.startsWith(l.to))
  const [open, setOpen] = useState(false)

  return (
    <div className={`nav-group${open ? ' open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button className={`nav-group-btn${isActive ? ' active' : ''}`}>
        {group.label} <span className="nav-group-caret">▾</span>
      </button>
      {open && (
        <div className="nav-dropdown">
          {group.links.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact}
              className={({ isActive }) => `nav-dd-item${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, persona, switchPersona, isConfigured, logout, role, displayName, avatar } = useAuth()
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
          <span className="brand-sub">School of Life — The New Heavenly Order</span>
        </Link>

        {/* Desktop grouped nav */}
        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_GROUPS.map(g => (
            <NavGroup key={g.label} group={g} currentPath={pathname} />
          ))}
        </nav>

        {/* Integration quick-join buttons */}
        <div className="topbar-integrations">
          <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="topbar-meet-btn" title="Join Google Meet session">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M15 10.5L19.5 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
              <rect x="4" y="7.5" width="11" height="9" rx="2" fill="#00BCD4"/>
            </svg>
            <span>Join Session</span>
          </a>
          <a href="https://www.classdojo.com" target="_blank" rel="noreferrer" className="topbar-dojo-btn" title="Open ClassDojo">
            <span>🎯</span>
            <span>ClassDojo</span>
          </a>
        </div>

        {/* Pay / Sponsor CTA */}
        <Link to="/funding" className="topbar-pay-btn">Sponsor Now</Link>

        <div className="topbar-right">
          {/* Live Firebase user badge */}
          {isConfigured && user && (
            <div className="viewer-wrap">
              <button className="viewer-btn" onClick={() => setViewerOpen(o => !o)}>
                <span className="viewer-icon">{avatar || '👤'}</span>
                <span className="viewer-label"><strong>{displayName}</strong></span>
                <span className="viewer-caret">▾</span>
              </button>
              {viewerOpen && (
                <div className="viewer-dropdown">
                  <p className="viewer-dropdown-head">{role?.toUpperCase()}</p>
                  <button className="viewer-option" onClick={() => { logout(); navigate('/login'); setViewerOpen(false) }}>
                    <span>🚪</span><span className="vo-label">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
          {isConfigured && !user && (
            <Link to="/login" className="topbar-login-btn">Sign In</Link>
          )}

          {/* Demo mode persona switcher */}
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
                    <button key={p.id}
                      className={`viewer-option${persona.id===p.id?' active':''}`}
                      onClick={() => { switchPersona(p.id); setViewerOpen(false) }}>
                      <span>{p.icon}</span>
                      <span className="vo-label">{p.label}</span>
                      <span className="vo-name">{p.name}</span>
                    </button>
                  ))}
                  <div className="viewer-dropdown-footer">
                    <p>🔥 Demo mode — <Link to="/login">Connect Firebase</Link> for live data</p>
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

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="mobile-nav">
          {NAV_GROUPS.map(g => (
            <div key={g.label} className="mobile-nav-group">
              <p className="mobile-nav-group-label">{g.label}</p>
              {g.links.map(({ to, label, exact }) => (
                <NavLink key={to} to={to} end={exact}
                  className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}>
                  {label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      )}

      <main><Outlet/></main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <p className="brand"><span className="brand-down">DOWN</span><span className="brand-flow">FLOW</span></p>
            <p className="footer-sub">School of Life — A sponsor-funded, globally distributed education infrastructure.<br/>Vietnam · Russia · Germany · Global</p>
          </div>
          <div className="footer-links">
            {NAV_GROUPS.map(g => (
              <div key={g.label}>
                <p className="footer-col-head">{g.label}</p>
                {g.links.map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}
              </div>
            ))}
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
