// DOWNFLOW brand logo — official wordmark: DOWN (white) + FLOW (gold) + gold wave
// mix-blend-mode:lighten strips the dark bg; CSS mask fades the sides to transparent
export default function DownflowLogo({ height = 56, className = '' }) {
  return (
    <img
      src="/downflow-logo-v3.webp"
      alt="DOWNFLOW"
      height={height}
      width="auto"
      className={className}
      style={{
        display: 'block',
        objectFit: 'contain',
        mixBlendMode: 'lighten',
        // Fade left + right edges into the surrounding background
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
      }}
    />
  )
}
