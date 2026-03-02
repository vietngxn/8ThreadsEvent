"use client"

import { useState } from "react"
import "./Diagram.css"

import Center from "./nodes/Center"
import Wing from "./nodes/Wing"

export default function Diagram() {
  const [active, setActive] = useState(null)

  const viewWidth = 1200   // sau này có thể đổi
  const centerX = viewWidth / 2

  return (
    <svg
      viewBox={`0 0 ${viewWidth} 1200`}
      preserveAspectRatio="xMidYMid meet"
      className="diagram-svg"
    >
      <g transform="translate(0 100) scale(1.1)">

        {/* Left */}
        <g transform={`translate(${viewWidth * 0.2} 150)`}>
          <Wing side="left" active={active} setActive={setActive} />
        </g>

        {/* Right */}
        <g transform={`translate(${viewWidth * 0.8} 150) scale(-1 1)`}>
          <Wing side="right" active={active} setActive={setActive} />
        </g>

        {/* Center */}
        <g transform={`translate(${centerX} 350)`}>
          <Center active={active} setActive={setActive} />
        </g>

      </g>
    </svg>
  )
}