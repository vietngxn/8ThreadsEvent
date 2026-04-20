import Node from "./Node";

export default function Center({ active, setActive, onZoneClick }) {
  const gap = 100;
  const bridgeId = "center-bridge"; 

  return (
    <g>
      <g transform={`translate(0 ${-gap / 2})`}>
        <Node
          id="da-sac"
          label="Đa sắc"
          fill="#00aaff"
          shape="rect"
          w={40}
          h={55}
          active={active}
          setActive={setActive}
          onZoneClick={onZoneClick}
          price={3000000}
        />
      </g>

      <path 
        transform="translate(20 3)"
        className={`clickable-zone ${active === bridgeId ? "active" : ""}`}
        d={`
          M -35 10
          L 35 10
          L 35 30
          L 20 40
          L -20 40
          L -35 30
          Z
        `}
        fill="#808080"
        onMouseEnter={() => setActive(bridgeId)}
        onMouseLeave={() => setActive(null)}
        style={{ cursor: "default", transition: "all 0.3s" }}
      />

      <g transform={`translate(0 ${gap / 2})`}>
        <Node
          id="da-hinh"
          label="Đa hình"
          fill="#00aaff"
          shape="rect"
          w={40}
          h={70}
          active={active}
          setActive={setActive}
          onZoneClick={onZoneClick}
          price={2500000}
        />
      </g>
    </g>
  );
}