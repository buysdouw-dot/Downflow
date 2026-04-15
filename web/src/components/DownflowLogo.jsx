// DOWNFLOW brand logo — blends into the blue topbar on all sides
// Wrapper uses a radial mask so edges dissolve into the surrounding navy/blue
export default function DownflowLogo({ height = 56, className = '' }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display:  'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Radial fade: fully visible centre, transparent at all edges
        WebkitMaskImage: [
          'radial-gradient(ellipse 46% 52% at 50% 50%, black 30%, transparent 100%)',
          'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)',
        ].join(', '),
        maskImage: [
          'radial-gradient(ellipse 46% 52% at 50% 50%, black 30%, transparent 100%)',
          'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)',
        ].join(', '),
        WebkitMaskComposite: 'destination-in',
        maskComposite:       'intersect',
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
          // screen blend: removes the dark background, keeps white+gold text
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
