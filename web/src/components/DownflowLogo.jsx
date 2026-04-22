// DOWNFLOW brand logo — white/gold on dark navy, blends via screen mode
export default function DownflowLogo({ height = 56, className = '' }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display:  'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Tight fade — only the very corners dissolve, logo text stays fully visible
        WebkitMaskImage: [
          'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        ].join(', '),
        maskImage: [
          'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        ].join(', '),
        WebkitMaskComposite: 'destination-in',
        maskComposite: 'intersect',
      }}
    >
      <img
        src="/downflow-logo-v5.webp"
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
