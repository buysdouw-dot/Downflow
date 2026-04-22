// DOWNFLOW brand logo — fills available width, crops to row height
// The webp is a square image; text+wave sits at ~38-68% vertically
export default function DownflowLogo({ height = 72, className = '' }) {
  return (
    <div
      className={className}
      style={{
        width:    'clamp(300px, 44vw, 640px)',
        height:   height,
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        // fade left & right edges only
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}
    >
      <img
        src="/downflow-logo-v5.webp"
        alt="DOWNFLOW"
        style={{
          position:    'absolute',
          width:       '100%',   // fills container width; square so height = same px
          height:      'auto',
          left:        0,
          top:         '50%',
          // shift up so the text centre (~53% down the image) aligns with container centre
          transform:   'translateY(-53%)',
          mixBlendMode:'screen',
        }}
      />
    </div>
  )
}
