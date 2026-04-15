import { useState, useEffect } from 'react'

const SLIDES = [
  { src: '/bg-hourglass.png',  pos: 'center center' },
  { src: '/bg-ecosystem.png',  pos: 'center 40%' },
  { src: '/bg-stability.png',  pos: 'center 20%' },
]

const INTERVAL = 8000   // ms per slide
const FADE_MS  = 1800   // crossfade duration

export default function NetworkBg() {
  const [cur,  setCur]  = useState(0)
  const [next, setNext] = useState(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => {
      const n = (cur + 1) % SLIDES.length
      setNext(n)
      setFading(true)
      setTimeout(() => {
        setCur(n)
        setNext(null)
        setFading(false)
      }, FADE_MS)
    }, INTERVAL)
    return () => clearInterval(tick)
  }, [cur])

  const overlay = 'linear-gradient(to bottom, rgba(10,16,30,0.78) 0%, rgba(10,16,30,0.62) 50%, rgba(10,16,30,0.90) 100%)'

  const baseStyle = (slide, opacity = 1) => ({
    position: 'fixed',
    inset: 0,
    zIndex: -2,
    backgroundImage: `${overlay}, url('${slide.src}')`,
    backgroundSize: 'cover',
    backgroundPosition: slide.pos,
    backgroundRepeat: 'no-repeat',
    opacity,
    transition: `opacity ${FADE_MS}ms ease-in-out`,
    pointerEvents: 'none',
  })

  return (
    <>
      {/* Current slide */}
      <div style={baseStyle(SLIDES[cur], 1)} aria-hidden="true" />

      {/* Next slide — fades in on top */}
      {next !== null && (
        <div
          style={baseStyle(SLIDES[next], fading ? 1 : 0)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
