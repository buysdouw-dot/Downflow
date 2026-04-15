// DOWNFLOW brand logo — official wordmark: DOWN (white) + FLOW (gold) + gold wave
// Background matches app's --bg-page (#0f1b2d) so it blends seamlessly
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
        // Blend: the logo has a near-black navy bg; mix-blend-mode lighten
        // removes the dark bg and leaves only the white/gold text
        mixBlendMode: 'lighten',
      }}
    />
  )
}
