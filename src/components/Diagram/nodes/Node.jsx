import { useEffect, useRef, useState } from "react";

export default function Node({
  id,
  label,
  value,
  fullName,     
  price,        
  fill,
  transform,
  active,
  setActive,
  path,
  shape,
  w = 0,
  h = 0,
  mirrorText = false,
  onZoneClick   
}) {
  const isActive = active === id;

  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const measureRef = useRef(null);

  const [bbox, setBbox] = useState({ width: w, height: h });
  const [lines, setLines] = useState([label || ""]);

  const isDecorative = !label || label.trim() === "";

  useEffect(() => {
    if (shapeRef.current) {
      const box = shapeRef.current.getBBox();
      setBbox(box);
    } else if (shape === "rect") {
      setBbox({ width: w, height: h });
    }
  }, [path, w, h, shape]);

  useEffect(() => {
    if (!bbox.width || !measureRef.current || isDecorative) return;

    const words = label.split(" ");
    const maxWidth = bbox.width * 0.8;

    let currentLine = "";
    let result = [];

    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;
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

    setTimeout(() => {
      setLines((prevLines) => {
        if (JSON.stringify(prevLines) === JSON.stringify(result)) {
          return prevLines;
        }
        return result;
      });
    }, 0);
  }, [label, bbox.width, isDecorative]);

  const centerX = bbox.width / 2;
  const centerY = bbox.height / 2;

  const handleClick = () => {
    if (isDecorative) return;

    if (setActive) setActive(id);

    if (onZoneClick) {
      onZoneClick({
        id: id,
        name: fullName || `${label} ${value || ""}`.trim(),
        price: price || 1200000, 
        color: fill
      });
    }
  };

  return (
    <g
      className={`node ${isActive && !isDecorative ? "active" : ""}`}
      transform={transform}
      onClick={isDecorative ? undefined : handleClick}
      onMouseEnter={isDecorative ? undefined : () => setActive && setActive(id)}
      onMouseLeave={isDecorative ? undefined : () => setActive && setActive(null)}
      style={{ 
        cursor: isDecorative ? "default" : "pointer",
        pointerEvents: isDecorative ? "none" : "auto" 
      }}
    >

      {path && (
        <path 
          ref={shapeRef} 
          d={path} 
          fill={fill} 
          className={!isDecorative ? "clickable-zone" : ""} 
        />
      )}
      
      {shape === "rect" && (
        <rect 
          ref={shapeRef} 
          x={0} 
          y={0} 
          width={w} 
          height={h} 
          fill={fill} 
          className={!isDecorative ? "clickable-zone" : ""} 
        />
      )}

      {!isDecorative && (
        <>
          <text
            ref={measureRef}
            fontSize="14"
            fontWeight="700"
            style={{ visibility: "hidden" }}
          >
            {label}
          </text>

          <text
            ref={textRef}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`translate(${centerX} ${centerY}) ${mirrorText ? "scale(-1 1)" : ""}`}
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
        </>
      )}
    </g>
  );
}