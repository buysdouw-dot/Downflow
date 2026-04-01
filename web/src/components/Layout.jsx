import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NetworkBg from './NetworkBg.jsx'

const NAV = [
  { to: '/', label: 'Home', exact: true },
  { to: '/sponsor', label: 'Sponsors' },
  { to: '/student', label: 'Students' },
  { to: '/facilitator', label: 'Facilitators' },
  { to: '/connector', label: 'Connectors' },
  { to: '/platform', label: 'Platform' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false) }, [pathname])

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
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
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
