// DOWNFLOW brand logo — crops square image to show only the text band
export default function DownflowLogo({ height = 56, className = '' }) {
  // The webp is square; text+wave occupies roughly the middle 42% of height.
  // We scale the image so that 42% equals the desired display height.
  const imgSize = Math.round(height / 0.42)

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display:  'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:    Math.round(imgSize * 0.72), // text is ~72% of width
        height:   height,
        overflow: 'hidden',
        // fade left/right edges only
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <img
        src="/downflow-logo-v5.webp"
        alt="DOWNFLOW"
        style={{
          position:   'absolute',
          width:       imgSize,
          height:      imgSize,
          top:         '50%',
          left:        '50%',
          transform:   'translate(-50%, -50%)',
          objectFit:   'cover',
          mixBlendMode:'screen',
          flexShrink:   0,
        }}
      />
    </div>
  )
}
