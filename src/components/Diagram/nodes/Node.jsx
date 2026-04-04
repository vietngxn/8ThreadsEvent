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
  const measureRef = useRef(null);

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
    if (!bbox.width || !measureRef.current) return;

    const words = label.split(" ");
    const maxWidth = bbox.width * 0.8;

    let currentLine = "";
    let result = [];

    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;

      // 👉 đo bằng text ẩn
      measureRef.current.textContent = testLine;
      const textWidth = measureRef.current.getComputedTextLength();

      if (textWidth > maxWidth) {
        if (currentLine) result.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) result.push(currentLine);

    setLines(result);
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

      <text
        ref={measureRef}
        fontSize="14"
        fontWeight="700"
        style={{ visibility: "hidden" }}
      >
        {label}
      </text>

      {/* Text */}
      <text
        ref={textRef}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`translate(${centerX} ${centerY}) ${mirrorText ? "scale(-1 1)" : ""
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

        {label && value && <tspan> {value}</tspan>}
      </text>
    </g>
  );
}