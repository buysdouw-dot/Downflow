// DOWNFLOW brand logo — transparent SVG, 3D gold treatment
// Matches the official logo: wing mark + THE / DOWNFLOW / MODEL

export default function DownflowLogo({ height = 80, className = '' }) {
  const id = 'dfl'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 90"
      height={height}
      width="auto"
      className={className}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        {/* 3D gold gradient for wing */}
        <linearGradient id={`${id}-wing`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fff8d6"/>
          <stop offset="20%"  stopColor="#f5d060"/>
          <stop offset="50%"  stopColor="#c8920a"/>
          <stop offset="75%"  stopColor="#e8b820"/>
          <stop offset="100%" stopColor="#7a4e00"/>
        </linearGradient>

        {/* Bevel highlight on wing */}
        <linearGradient id={`${id}-winghi`} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,220,0.7)"/>
          <stop offset="100%" stopColor="rgba(255,200,0,0)"/>
        </linearGradient>

        {/* 3D gold gradient for DOWNFLOW text */}
        <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#fff3a0"/>
          <stop offset="18%"  stopColor="#f0c840"/>
          <stop offset="45%"  stopColor="#b8860b"/>
          <stop offset="65%"  stopColor="#d4a017"/>
          <stop offset="85%"  stopColor="#8b5e00"/>
          <stop offset="100%" stopColor="#5a3a00"/>
        </linearGradient>

        {/* Lighter gold for THE / MODEL */}
        <linearGradient id={`${id}-silver`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#e8ddb0"/>
          <stop offset="50%"  stopColor="#c8a44a"/>
          <stop offset="100%" stopColor="#7a5a10"/>
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id={`${id}-shadow`} x="-10%" y="-10%" width="130%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.7"/>
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#c8920a" floodOpacity="0.4"/>
        </filter>

        {/* Glow filter for wing */}
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ── Wing / Flame mark ── */}
      <g filter={`url(#${id}-glow)`} transform="translate(96, 2)">
        {/* Shadow layer for 3D depth */}
        <g transform="translate(1.5, 2.5)" opacity="0.5">
          {/* Left wing */}
          <path d="M12 22 C8 16, 2 12, 0 4 C4 8, 9 10, 12 14 Z" fill="#3a2200"/>
          {/* Right wing */}
          <path d="M12 22 C16 16, 22 12, 24 4 C20 8, 15 10, 12 14 Z" fill="#3a2200"/>
          {/* Center flame */}
          <path d="M12 24 C10 18, 8 14, 9 8 C10 12, 12 14, 12 16 C12 14, 14 12, 15 8 C16 14, 14 18, 12 24 Z" fill="#3a2200"/>
        </g>

        {/* Main wing — left */}
        <path
          d="M12 22 C8 16, 1.5 11.5, 0 3.5 C4.5 7.5, 9.5 10, 12 14 Z"
          fill={`url(#${id}-wing)`}
        />
        {/* Main wing — right */}
        <path
          d="M12 22 C16 16, 22.5 11.5, 24 3.5 C19.5 7.5, 14.5 10, 12 14 Z"
          fill={`url(#${id}-wing)`}
        />
        {/* Center flame */}
        <path
          d="M12 24 C9.5 17.5, 7.5 13, 8.5 7 C9.5 11, 11.5 13.5, 12 15.5 C12.5 13.5, 14.5 11, 15.5 7 C16.5 13, 14.5 17.5, 12 24 Z"
          fill={`url(#${id}-wing)`}
        />
        {/* Highlight overlay */}
        <path
          d="M12 22 C8 16, 1.5 11.5, 0 3.5 C4.5 7.5, 9.5 10, 12 14 Z"
          fill={`url(#${id}-winghi)`}
          opacity="0.5"
        />
        <path
          d="M12 22 C16 16, 22.5 11.5, 24 3.5 C19.5 7.5, 14.5 10, 12 14 Z"
          fill={`url(#${id}-winghi)`}
          opacity="0.3"
        />
      </g>

      {/* ── "THE" ── */}
      <text
        x="110" y="42"
        textAnchor="middle"
        fontFamily="'Outfit', 'Georgia', serif"
        fontWeight="700"
        fontSize="10"
        letterSpacing="4"
        fill={`url(#${id}-silver)`}
        filter={`url(#${id}-shadow)`}
        style={{ textTransform: 'uppercase' }}
      >
        THE
      </text>

      {/* ── "DOWNFLOW" — 3D extruded look ── */}
      {/* Extrusion layers for depth */}
      {[4,3,2,1].map(d => (
        <text
          key={d}
          x={110 + d * 0.4}
          y={63 + d * 0.5}
          textAnchor="middle"
          fontFamily="'Outfit', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="28"
          letterSpacing="1"
          fill={d === 4 ? '#3a1e00' : d === 3 ? '#5a3000' : d === 2 ? '#7a4800' : '#9a6000'}
          opacity={1 - d * 0.08}
        >
          DOWNFLOW
        </text>
      ))}
      {/* Main text face */}
      <text
        x="110" y="63"
        textAnchor="middle"
        fontFamily="'Outfit', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="1"
        fill={`url(#${id}-gold)`}
      >
        DOWNFLOW
      </text>
      {/* Top edge highlight */}
      <text
        x="110" y="63"
        textAnchor="middle"
        fontFamily="'Outfit', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="1"
        fill="none"
        stroke="rgba(255,248,180,0.35)"
        strokeWidth="0.6"
      >
        DOWNFLOW
      </text>

      {/* ── "MODEL" ── */}
      <text
        x="110" y="78"
        textAnchor="middle"
        fontFamily="'Outfit', 'Georgia', serif"
        fontWeight="600"
        fontSize="9.5"
        letterSpacing="6"
        fill={`url(#${id}-silver)`}
        filter={`url(#${id}-shadow)`}
      >
        MODEL
      </text>

      {/* Subtle glow beneath the whole mark */}
      <ellipse cx="110" cy="82" rx="70" ry="4" fill="rgba(212,160,23,0.12)" />
    </svg>
  )
}
