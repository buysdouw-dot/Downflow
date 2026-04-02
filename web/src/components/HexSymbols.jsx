// ============================================================
// DOWNFLOW Hex Symbol System
// 7 Core Hex icons from the visual design universe
// Sponsor · Learning Cell · Growth · Evolving · Equitable · Shield · Data
// ============================================================

export function HexIcon({ type = 'cell', size = 48, glow = false }) {
  const configs = {
    sponsor: {
      bg: ['#d2ad44', '#f0d070'],
      symbol: (
        <g>
          <rect x="18" y="22" width="12" height="9" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.8"/>
          <rect x="21" y="19" width="6" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1.6"/>
          <line x1="24" y1="31" x2="24" y2="34" stroke="#fff" strokeWidth="1.8"/>
          <line x1="20" y1="34" x2="28" y2="34" stroke="#fff" strokeWidth="1.8"/>
        </g>
      ),
      label: 'Sponsor',
    },
    cell: {
      bg: ['#4de8b0', '#2ab87e'],
      symbol: (
        <g>
          <circle cx="24" cy="24" r="5" fill="none" stroke="#fff" strokeWidth="1.8"/>
          <circle cx="24" cy="16" r="2.5" fill="#fff" opacity="0.8"/>
          <circle cx="31" cy="20" r="2.5" fill="#fff" opacity="0.8"/>
          <circle cx="31" cy="28" r="2.5" fill="#fff" opacity="0.8"/>
          <circle cx="24" cy="32" r="2.5" fill="#fff" opacity="0.8"/>
          <circle cx="17" cy="28" r="2.5" fill="#fff" opacity="0.8"/>
          <circle cx="17" cy="20" r="2.5" fill="#fff" opacity="0.8"/>
        </g>
      ),
      label: 'Learning Cell',
    },
    growth: {
      bg: ['#72d0ff', '#3a9fd4'],
      symbol: (
        <g>
          <polyline points="14,32 20,24 25,27 33,16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="29,16 33,16 33,20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      ),
      label: 'Growth Hex',
    },
    evolving: {
      bg: ['#b083ff', '#7c4dde'],
      symbol: (
        <g>
          <path d="M24 14 C28 14 32 18 32 24 C32 30 28 34 24 34" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 14 C20 14 16 18 16 24 C16 30 20 34 24 34" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2"/>
          <circle cx="24" cy="24" r="2.5" fill="#fff"/>
          <polyline points="20,12 24,14 22,18" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      ),
      label: 'Evolving Hex',
    },
    equitable: {
      bg: ['#ff9f5a', '#e06520'],
      symbol: (
        <g>
          <line x1="24" y1="15" x2="24" y2="33" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="15" y1="24" x2="33" y2="24" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="18" r="2.5" fill="#fff" opacity="0.85"/>
          <circle cx="30" cy="24" r="2.5" fill="#fff" opacity="0.85"/>
          <circle cx="24" cy="30" r="2.5" fill="#fff" opacity="0.85"/>
          <circle cx="18" cy="24" r="2.5" fill="#fff" opacity="0.85"/>
        </g>
      ),
      label: 'Equitable Hex',
    },
    shield: {
      bg: ['#ff6b9d', '#cc2d6d'],
      symbol: (
        <g>
          <path d="M24 14 L32 18 L32 25 C32 30 28 33 24 35 C20 33 16 30 16 25 L16 18 Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
          <polyline points="20,24 23,27 28,21" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      ),
      label: 'Shield Hex',
    },
    data: {
      bg: ['#5ab4e8', '#2880c0'],
      symbol: (
        <g>
          <rect x="14" y="26" width="4" height="7" rx="1" fill="#fff" opacity="0.9"/>
          <rect x="20" y="21" width="4" height="12" rx="1" fill="#fff" opacity="0.9"/>
          <rect x="26" y="17" width="4" height="16" rx="1" fill="#fff" opacity="0.9"/>
          <line x1="14" y1="15" x2="31" y2="15" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 2"/>
        </g>
      ),
      label: 'Data Hex',
    },
  }

  const cfg = configs[type] || configs.cell
  const s = size
  const glowFilter = glow ? `drop-shadow(0 0 ${s/8}px ${cfg.bg[0]}80)` : 'none'

  // Hex path: pointy-top hexagon
  const hex = (cx, cy, r) => {
    const pts = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30)
      pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
    }
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z'
  }

  return (
    <svg width={s} height={s} viewBox="0 0 48 48" style={{ filter: glowFilter, flexShrink: 0 }}>
      <defs>
        <linearGradient id={`hg-${type}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cfg.bg[0]}/>
          <stop offset="100%" stopColor={cfg.bg[1]}/>
        </linearGradient>
      </defs>
      <path d={hex(24, 24, 22)} fill={`url(#hg-${type})`} opacity="0.95"/>
      <path d={hex(24, 24, 22)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      {cfg.symbol}
    </svg>
  )
}

// Row of all 7 hex icons with labels
export function HexSystemRow({ size = 44 }) {
  const types = ['sponsor','cell','growth','evolving','equitable','shield','data']
  const labels = ['Sponsor','Learning Cell','Growth','Evolving','Equitable','Shield','Data']
  return (
    <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', alignItems:'center', justifyContent:'center' }}>
      {types.map((t, i) => (
        <div key={t} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem' }}>
          <HexIcon type={t} size={size} glow/>
          <span style={{ fontSize:'0.68rem', color:'var(--text-soft)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700 }}>
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  )
}
