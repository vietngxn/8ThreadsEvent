import { useEffect, useRef, useState } from "react";

export default function Node({
  id,
  label,
  value,
  fill,
  transform,
  active,
  setActive,
  path,
  shape,
  w = 0,
  h = 0,
  mirrorText = false
}) {
  const isActive = active === id;

  const shapeRef = useRef(null);
  const textRef = useRef(null);

  const [bbox, setBbox] = useState({ width: w, height: h });
  const [lines, setLines] = useState([label]);

  /* ===============================
     1️⃣ Lấy kích thước thật của shape
  =============================== */
  useEffect(() => {
    if (shapeRef.current) {
      const box = shapeRef.current.getBBox();
      setBbox(box);
    } else if (shape === "rect") {
      setBbox({ width: w, height: h });
    }
  }, [path, w, h, shape]);

  /* ===============================
     2️⃣ Tự chia dòng thông minh
  =============================== */
  useEffect(() => {
    if (!bbox.width) return;

    const limit = bbox.width * 0.8;
    const words = label.split(" ");

    // Nếu chỉ 1 từ → cắt đôi
    if (words.length === 1) {
      const mid = Math.ceil(label.length / 2);
      setLines([label.slice(0, mid), label.slice(mid)]);
      return;
    }

    // Tìm cách chia cân nhất
    let best = [label];
    let minDiff = Infinity;

    for (let i = 1; i < words.length; i++) {
      const l1 = words.slice(0, i).join(" ");
      const l2 = words.slice(i).join(" ");

      const diff = Math.abs(l1.length - l2.length);

      if (diff < minDiff) {
        minDiff = diff;
        best = [l1, l2];
      }
    }

    setLines(best);
  }, [label, bbox.width]);

  const centerX = bbox.width / 2;
  const centerY = bbox.height / 2;

  return (
    <g
      className={`node ${isActive ? "active" : ""}`}
      transform={transform}
      onClick={() => setActive(id)}
      style={{ cursor: "pointer" }}
    >
      {/* Shape */}
      {path && <path ref={shapeRef} d={path} fill={fill} />}
      {shape === "rect" && (
        <rect ref={shapeRef} x={0} y={0} width={w} height={h} fill={fill} />
      )}

      {/* Text */}
      <text
        ref={textRef}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`translate(${centerX} ${centerY}) ${
          mirrorText ? "scale(-1 1)" : ""
        }`}
        fill="white"
        fontWeight="700"
        fontSize="14"
        pointerEvents="none"
      >
        {lines.map((line, i) => (
          <tspan key={i} x="0" dy={i === 0 ? "0" : "18"}>
            {line}
          </tspan>
        ))}

        {value && <tspan> {value}</tspan>}
      </text>
    </g>
  );
}