import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

// ── Per-role sidebar config ─────────────────────────────────
const SIDEBAR_CONFIG = {
  sponsor: {
    color: '#a8843e',
    bg:    '#fdf9f3',
    icon:  '💼',
    label: 'Sponsor',
    sections: [
      { heading: 'Overview',  items: [
        { icon: '🏠', label: 'Dashboard',    tab: 'overview' },
        { icon: '📊', label: 'Cell Reports', tab: 'cells' },
        { icon: '🏆', label: 'Rankings',     tab: 'rankings' },
      ]},
      { heading: 'Financials', items: [
        { icon: '💸', label: 'Rebates',      tab: 'rebates' },
        { icon: '📈', label: 'Impact',       tab: 'impact' },
      ]},
      { heading: 'Platform',  items: [
        { icon: '🌐', label: 'Model',        tab: 'model' },
        { icon: '⭐', label: 'Recognition',  tab: 'recognition' },
      ]},
    ],
    quick: [
      { icon: '➕', label: 'Fund a Cell', tab: 'cells' },
    ],
  },
  facilitator: {
    color: '#4a9e7f',
    bg:    '#f3faf7',
    icon:  '🧭',
    label: 'Facilitator',
    sections: [
      { heading: 'My Work', items: [
        { icon: '🏠', label: 'Dashboard',    tab: 'overview' },
        { icon: '👥', label: 'My Cells',     tab: 'cells' },
        { icon: '🎬', label: 'Content',      tab: 'content' },
      ]},
      { heading: 'Students', items: [
        { icon: '📋', label: 'Attendance',   tab: 'attendance' },
        { icon: '📹', label: 'Video Reviews',tab: 'reviews' },
        { icon: '🎖️', label: 'Promotions',   tab: 'promotions' },
      ]},
      { heading: 'Growth', items: [
        { icon: '💰', label: 'Earnings',     tab: 'payments' },
        { icon: '📈', label: 'Performance',  tab: 'performance' },
      ]},
    ],
    quick: [
      { icon: '✅', label: 'Log Session',  tab: 'attendance' },
      { icon: '📹', label: 'Review Video', tab: 'reviews' },
    ],
  },
  student: {
    color: '#4a6fa5',
    bg:    '#f3f6fb',
    icon:  '🎓',
    label: 'Student',
    sections: [
      { heading: 'My Learning', items: [
        { icon: '🏠', label: 'Dashboard',    tab: 'overview' },
        { icon: '🎯', label: 'My Cell',      tab: 'cell' },
        { icon: '📚', label: 'Curriculum',   tab: 'curriculum' },
      ]},
      { heading: 'Progress', items: [
        { icon: '🎬', label: 'My Videos',    tab: 'videos' },
        { icon: '🪙', label: 'Coins',        tab: 'coins' },
        { icon: '🌱', label: 'Growth',       tab: 'growth' },
      ]},
    ],
    quick: [
      { icon: '📤', label: 'Submit Video', tab: 'videos' },
    ],
  },
  connector: {
    color: '#38bdf8',
    bg:    '#f3fafd',
    icon:  '🔗',
    label: 'Connector',
    sections: [
      { heading: 'My Network', items: [
        { icon: '🏠', label: 'Dashboard',    tab: 'overview' },
        { icon: '🏫', label: 'My Cells',     tab: 'cells' },
        { icon: '👥', label: 'Contacts',     tab: 'contacts' },
      ]},
      { heading: 'Earnings', items: [
        { icon: '💰', label: 'Payments',     tab: 'payments' },
        { icon: '📊', label: 'Rankings',     tab: 'rankings' },
      ]},
    ],
    quick: [
      { icon: '➕', label: 'Register Cell', tab: 'cells' },
    ],
  },
  platform: {
    color: '#6c63ff',
    bg:    '#f5f4ff',
    icon:  '⚡',
    label: 'Admin',
    sections: [
      { heading: 'Operations', items: [
        { icon: '🏠', label: 'Dashboard',    tab: 'overview' },
        { icon: '🏫', label: 'All Cells',    tab: 'cells' },
        { icon: '👤', label: 'All Users',    tab: 'users' },
      ]},
      { heading: 'Finance', items: [
        { icon: '💸', label: 'Payments',     tab: 'payments' },
        { icon: '📊', label: 'Reports',      tab: 'reports' },
      ]},
      { heading: 'System', items: [
        { icon: '🌍', label: 'Regions',      tab: 'regions' },
        { icon: '🤖', label: 'AI Assistants',tab: 'assistants' },
      ]},
    ],
    quick: [],
  },
}

export default function DashboardShell({ role, activeTab, onTabChange, title, subtitle, actions, children }) {
  const { displayName, avatar, isConfigured, logout, persona } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const cfg = SIDEBAR_CONFIG[role] || SIDEBAR_CONFIG.platform
  const name = displayName || persona?.name || 'User'

  return (
    <div className="dsh-root" style={{ '--dsh-accent': cfg.color, '--dsh-bg': cfg.bg }}>

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className={`dsh-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="dsh-sb-brand">
          <Link to="/" className="dsh-sb-logo">
            <span className="brand-down">DOWN</span><span className="brand-flow">FLOW</span>
          </Link>
          <button className="dsh-sb-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* Role badge */}
        <div className="dsh-sb-role">
          <span className="dsh-sb-role-icon">{cfg.icon}</span>
          <div>
            <p className="dsh-sb-role-label">{cfg.label}</p>
            <p className="dsh-sb-role-name">{name}</p>
          </div>
        </div>

        {/* Quick actions */}
        {cfg.quick.length > 0 && (
          <div className="dsh-sb-quick">
            {cfg.quick.map(q => (
              <button key={q.tab} className="dsh-sb-quick-btn"
                onClick={() => { onTabChange(q.tab); setSidebarOpen(false) }}>
                <span>{q.icon}</span> {q.label}
              </button>
            ))}
          </div>
        )}

        {/* Nav sections */}
        {cfg.sections.map(sec => (
          <div key={sec.heading} className="dsh-sb-section">
            <p className="dsh-sb-section-head">{sec.heading}</p>
            {sec.items.map(item => (
              <button key={item.tab}
                className={`dsh-sb-item${activeTab === item.tab ? ' active' : ''}`}
                onClick={() => { onTabChange(item.tab); setSidebarOpen(false) }}>
                <span className="dsh-sb-item-icon">{item.icon}</span>
                <span className="dsh-sb-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        ))}

        {/* Bottom: nav to other dashboards + sign out */}
        <div className="dsh-sb-footer">
          <NavLink to="/" className="dsh-sb-footer-link">← Back to site</NavLink>
          {isConfigured && (
            <button className="dsh-sb-footer-link dsh-sb-signout"
              onClick={() => { logout(); navigate('/login') }}>
              🚪 Sign out
            </button>
          )}
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────────── */}
      <div className="dsh-main">

        {/* Inner topbar */}
        <header className="dsh-topbar">
          <button className="dsh-menu-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>

          <div className="dsh-topbar-title">
            <h1 className="dsh-page-title">{title}</h1>
            {subtitle && <p className="dsh-page-sub">{subtitle}</p>}
          </div>

          {/* Top-right actions slot */}
          <div className="dsh-topbar-actions">
            {actions}
            <div className="dsh-topbar-avatar">
              <span className="dsh-avatar-icon">{avatar || cfg.icon}</span>
              <span className="dsh-avatar-name">{name}</span>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="dsh-content">
          {children}
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="dsh-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

// Named import for convenience
export { SIDEBAR_CONFIG }
