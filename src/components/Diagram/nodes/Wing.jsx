"use client";

import Node from "./Node";
import { WING_BASE } from "../data";

export default function Wing({
  side = "left",
  active,
  setActive,
  onZoneClick 
}) {
  const isRight = side === "right";

  return (
    <g>
      {WING_BASE.map((n) => {
        const transform = n.transform ?? `translate(${n.x} ${n.y})`;

        const fullName = `${n.label} ${isRight ? "2" : "1"}`;

        return (
          <Node
            key={n.key}
            id={`${n.key}-${isRight ? 2 : 1}`}
            label={n.label}
            fullName={fullName} 
            value={isRight ? "2" : "1"}
            fill={n.fill}
            path={n.path}
            shape={n.shape}
            w={n.w}
            h={n.h}
            transform={transform}
            mirrorText={isRight}
            active={active}
            setActive={setActive}
            onZoneClick={onZoneClick} 
            price={n.price || 1200000} 
          />
        );
      })}
    </g>
  );
}