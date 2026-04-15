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
        // wide ellipse keeps text sharp at centre, fades only the outer edges
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 55%, transparent 100%)',
        maskImage:        'radial-gradient(ellipse 90% 80% at 50% 50%, black 55%, transparent 100%)',
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
