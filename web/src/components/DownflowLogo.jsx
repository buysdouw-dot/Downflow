// DOWNFLOW brand logo — uses the official wordmark image
export default function DownflowLogo({ height = 80, className = '' }) {
  return (
    <img
      src="/downflow-logo-v2.webp"
      alt="DOWNFLOW"
      height={height}
      width="auto"
      className={className}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  )
}
