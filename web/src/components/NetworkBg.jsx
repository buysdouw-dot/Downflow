import React from 'react'
import { useEffect, useRef } from 'react'

const NODES = [
  { id: 'platform', x: 540, y: 60,  label: 'Downflow', r: 24, color: '#c8a96e' },
  { id: 'sp1',  x: 180, y: 155, label: 'Sponsor', r: 16, color: '#a8843e' },
  { id: 'sp2',  x: 900, y: 145, label: 'Sponsor', r: 16, color: '#a8843e' },
  { id: 'cn1',  x: 300, y: 245, label: 'Connector', r: 14, color: '#d4845a' },
  { id: 'cn2',  x: 760, y: 240, label: 'Connector', r: 14, color: '#d4845a' },
  { id: 'f1',   x: 180, y: 340, label: 'Facilitator', r: 13, color: '#4a6fa5' },
  { id: 'f2',   x: 420, y: 340, label: 'Facilitator', r: 13, color: '#4a6fa5' },
  { id: 'f3',   x: 660, y: 340, label: 'Facilitator', r: 13, color: '#4a6fa5' },
  { id: 'f4',   x: 900, y: 340, label: 'Facilitator', r: 13, color: '#4a6fa5' },
  { id: 'c1', x: 80,  y: 450, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c2', x: 180, y: 460, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c3', x: 300, y: 450, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c4', x: 420, y: 460, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c5', x: 540, y: 450, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c6', x: 660, y: 460, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c7', x: 780, y: 450, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c8', x: 900, y: 460, label: 'Cell', r: 9, color: '#4a9e7f' },
  { id: 'c9', x: 1000,y: 450, label: 'Cell', r: 9, color: '#4a9e7f' },
]

const EDGES = [
  ['platform','sp1'],['platform','sp2'],
  ['sp1','cn1'],['sp2','cn2'],
  ['cn1','f1'],['cn1','f2'],['cn2','f3'],['cn2','f4'],
  ['f1','c1'],['f1','c2'],['f2','c3'],['f2','c4'],['f2','c5'],
  ['f3','c6'],['f3','c7'],['f4','c8'],['f4','c9'],
]

export default function NetworkBg() {
  const svgRef = useRef(null)
  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

  useEffect(() => {
    let frame, t = 0
    const animate = () => {
      t += 0.003
      svgRef.current?.querySelectorAll('.pnode').forEach((el, i) => {
        const p = ((Math.sin(t + i * 0.7) + 1) / 2)
        el.setAttribute('opacity', 0.15 + p * 0.5)
        const base = parseFloat(el.dataset.r)
        el.setAttribute('r', base + p * 3.5)
      })
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <svg ref={svgRef} className="network-bg-svg" viewBox="0 0 1080 520" aria-hidden="true">
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {EDGES.map(([a,b],i) => {
        const na=nodeMap[a], nb=nodeMap[b]
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(74,111,165,0.08)" strokeWidth="1"/>
      })}
      {EDGES.map(([a,b],i) => {
        const na=nodeMap[a], nb=nodeMap[b]
        const dur = 2.5+(i%5)*0.5
        return (
          <g key={`t${i}`}>
            <path id={`ep${i}`} d={`M${na.x},${na.y} L${nb.x},${nb.y}`} fill="none"/>
            <circle r="2.5" fill="#c8a96e" opacity="0.5">
              <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${(i*0.3)%dur}s`}>
                <mpath href={`#ep${i}`}/>
              </animateMotion>
            </circle>
          </g>
        )
      })}
      {NODES.map(n => (
        <g key={n.id} filter="url(#glow2)">
          <circle cx={n.x} cy={n.y} r={n.r+7} fill={n.color} opacity="0.05"/>
          <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}18`} stroke={n.color} strokeWidth="1.2" opacity="0.6" className="pnode" data-r={n.r}/>
          {n.r>=13 && <text x={n.x} y={n.y+4} textAnchor="middle" fontSize="8" fill={n.color} opacity="0.65" fontFamily="Sora,sans-serif" fontWeight="600">{n.label}</text>}
        </g>
      ))}
    </svg>
  )
}
