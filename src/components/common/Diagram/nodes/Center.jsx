export default function Center({ active, setActive }) {
  return (
    <g
      className={`node ${active === "da-sac" ? "active" : ""}`}
      onClick={() => setActive("da-sac")}
    >
      <rect
        x="-25"
        y="-25"
        width="50"
        height="50"
        fill="#00aaff"
      />

      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontWeight="700"
      >
        Đa sắc
      </text>
    </g>
  );
}