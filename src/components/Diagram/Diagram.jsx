"use client";

import { useState, useEffect } from "react";
import "./Diagram.css";

import Center from "./nodes/Center";
import Wing from "./nodes/Wing";

export default function Diagram({ onZoneClick, ticketTypes }) {
  const [active, setActive] = useState(null);
  const [viewWidth, setViewWidth] = useState(1200); 

  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        <g transform={`translate(${leftX} 150)`}>
          <Wing 
            side="left" 
            active={active} 
            setActive={setActive} 
            onZoneClick={onZoneClick}
            ticketTypes={ticketTypes}
          />
        </g>

        <g
          transform={`
            translate(${rightX} 150)
            scale(-1 1)
            translate(-${WING_REAL_WIDTH} 0)
          `}
        >
          <Wing 
            side="right" 
            active={active} 
            setActive={setActive} 
            onZoneClick={onZoneClick} 
            ticketTypes={ticketTypes}
          />
        </g>

        <g transform={`translate(${centerX - 20} ${350})`}>
          <Center 
            active={active} 
            setActive={setActive} 
            onZoneClick={onZoneClick} 
            ticketTypes={ticketTypes} 
          />
        </g>
      </g>
    </svg>
  );
}