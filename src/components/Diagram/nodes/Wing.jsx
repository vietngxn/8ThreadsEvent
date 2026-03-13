"use client";

import Node from "./Node";
import { WING_BASE } from "../data";
import {
  DIAGONAL_TRANSFORMS,
} from "./diagonalConfig";

export default function Wing({
  side = "left",
  active,
  setActive
}) {
  const isRight = side === "right";

  return (
    <g>
      {WING_BASE.map((n) => {
        const transform =
          DIAGONAL_TRANSFORMS[n.key] ??
          `translate(${n.x} ${n.y})`;

        return (
          <Node
            key={n.key}
            id={`${n.key}-${isRight ? 2 : 1}`}
            label={n.label}
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
          />
        );
      })}
    </g>
  );
}