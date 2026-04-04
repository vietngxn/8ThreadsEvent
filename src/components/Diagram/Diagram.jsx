"use client";

import { useState } from "react";
import "./Diagram.css";

import Center from "./nodes/Center";
import Wing from "./nodes/Wing";

export default function Diagram() {
  const [active, setActive] = useState(null);

  const viewWidth = window.innerWidth;
  const centerX = viewWidth / 2;

  const WING_REAL_WIDTH = 350;

  const leftX = centerX - WING_REAL_WIDTH;
  const rightX = centerX;

  return (
    <svg
      viewBox={`0 0 ${viewWidth} 1200`}
      preserveAspectRatio="xMidYMid meet"
      className="diagram-svg"
    >
      <g
        transform={`
          translate(${viewWidth / 2} 100)
          scale(1.1)
          translate(${-viewWidth / 2} 0)
        `}
      >
        {/* LEFT */}
        <g transform={`translate(${leftX} 150)`}>
          <Wing side="left" active={active} setActive={setActive} />
        </g>

        {/* RIGHT (mirror chuẩn) */}
        <g
          transform={`
            translate(${rightX} 150)
            scale(-1 1)
            translate(-${WING_REAL_WIDTH} 0)
          `}
        >
          <Wing side="right" active={active} setActive={setActive} />
        </g>

        {/* CENTER */}
        <g transform={`translate(${centerX - 20} ${350})`}>
          <Center active={active} setActive={setActive} />
        </g>
      </g>
    </svg>
  );
}