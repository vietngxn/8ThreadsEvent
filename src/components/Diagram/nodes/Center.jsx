import Node from "./Node";

export default function Center({ active, setActive }) {
  const gap = 100;

  return (
    <g>
      {/* Node trên */}
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
        />
      </g>

      {/* Shape nối */}
      <path transform="translate(20 3)"
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
      />

      {/* Node dưới */}
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
        />
      </g>
    </g>
  );
}