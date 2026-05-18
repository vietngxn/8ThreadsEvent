import { useEffect, useRef, useState } from "react";

function normalizeSeatLabel(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

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
  onZoneClick,
  ticketTypes,
}) {
  const isActive = active === id;

  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const measureRef = useRef(null);

  const [bbox, setBbox] = useState({ width: w, height: h });
  const [lines, setLines] = useState([label || ""]);

  const isDecorative = !label || label.trim() === "";

  const ID_MAPPING = {
    "thanh-xuan-1": "TX1",
    "thanh-xuan-2": "TX2",
    "nham-thach-1": "NT1",
    "nham-thach-2": "NT2",
    "bi-an-1": "B1",
    "bi-an-2": "B2",
    "xuong-rong-1": "XR1",
    "xuong-rong-2": "XR2",
    "sao-sang-1": "SS1",
    "sao-sang-2": "SS2",
    "tai-sinh-1": "TS1",
    "tai-sinh-2": "TS2",
    "ngu-hanh-1": "NH1",
    "ngu-hanh-2": "NH2",
    "dam-me-1": "DM1",
    "dam-me-2": "DM2",
    "xuan-ha-thu-dong-1": "XHTD1",
    "xuan-ha-thu-dong-2": "XHTD2",
    "suc-soi-1": "SSO1",
    "suc-soi-2": "SSO2",
    "huyen-thoai-1": "HT1",
    "huyen-thoai-2": "HT2",
    "s-vip-1": "SVIP1",
    "s-vip-2": "SVIP2",
    "da-sac": "DS",
    "da-tinh": "DT",
    "da-hinh": "DT",
    "nha-hat-1": "NHAT1",
    "nha-hat-2": "NHAT2",
    "ruc-lua-1": "RL1",
    "ruc-lua-2": "RL2",
  };

  const dbCode = ID_MAPPING[id] || id;

  const zoneData = ticketTypes?.find((t) => {
    const candidates = [t.ticketTypeId, t.name, t.type, t._id].map(
      normalizeSeatLabel,
    );

    const normalizedDbCode = normalizeSeatLabel(dbCode);
    const normalizedLabel = normalizeSeatLabel(label);

    return (
      candidates.includes(normalizedDbCode) ||
      candidates.includes(normalizedLabel)
    );
  });

  const stock = zoneData ? zoneData.totalQuantity - zoneData.soldQuantity : 0;

  const isSoldOut = zoneData ? stock <= 0 : true;

  const realPrice = zoneData ? zoneData.price : price;

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
    if (isDecorative || isSoldOut) return;

    if (setActive) setActive(id);

    if (onZoneClick) {
      onZoneClick({
        id: id,
        ticketTypeId: zoneData?.ticketTypeId || dbCode || id,
        name: fullName || `${label} ${value || ""}`.trim(),
        price: realPrice || 1200000,
        color: fill,
        maxQty: zoneData ? stock : Number.MAX_SAFE_INTEGER,
      });
    }
  };

  return (
    <g
      className={`node ${isActive && !isDecorative && !isSoldOut ? "active" : ""} ${isSoldOut ? "sold-out" : ""}`}
      transform={transform}
      onClick={isDecorative || isSoldOut ? undefined : handleClick}
      onMouseEnter={
        isDecorative || isSoldOut ? undefined : () => setActive && setActive(id)
      }
      onMouseLeave={
        isDecorative || isSoldOut
          ? undefined
          : () => setActive && setActive(null)
      }
      style={{
        cursor: isDecorative
          ? "default"
          : isSoldOut
            ? "not-allowed"
            : "pointer",
        pointerEvents: isDecorative ? "none" : "auto",
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
