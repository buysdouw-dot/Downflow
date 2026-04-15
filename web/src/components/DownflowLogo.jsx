// DOWNFLOW brand logo — blends into the blue topbar on all sides
export default function DownflowLogo({ height = 56, className = '' }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display:  'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // At large sizes the radial vignette must be wide enough to fully dissolve edges
        WebkitMaskImage: [
          'radial-gradient(ellipse 48% 44% at 50% 50%, black 20%, transparent 100%)',
          'linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)',
          'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        ].join(', '),
        maskImage: [
          'radial-gradient(ellipse 48% 44% at 50% 50%, black 20%, transparent 100%)',
          'linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)',
          'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        ].join(', '),
        WebkitMaskComposite: 'destination-in, destination-in',
        maskComposite:       'intersect, intersect',
      }}
    >
      <img
        src="/downflow-logo-v3.webp"
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
