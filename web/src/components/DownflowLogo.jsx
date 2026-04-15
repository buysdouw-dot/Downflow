// DOWNFLOW brand logo — fiery tornado version, blends via screen mode
export default function DownflowLogo({ height = 56, className = '' }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display:  'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // soft fade on all edges so it dissolves into the dark topbar
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 35%, transparent 100%)',
        maskImage:        'radial-gradient(ellipse 80% 75% at 50% 50%, black 35%, transparent 100%)',
      }}
    >
      <img
        src="/downflow-logo-v4.jpeg"
        alt="DOWNFLOW"
        height={height}
        width="auto"
        style={{
          display: 'block',
          objectFit: 'contain',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
