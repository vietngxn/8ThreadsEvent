export default function CalendarIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#goldSilverCalendar)"
      strokeWidth="2"
    >
      <defs>
        <linearGradient
          id="goldSilverCalendar"
          x1="0"
          y1="0"
          x2="24"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#cbb37a" />
          <stop offset="100%" stopColor="#e6e6e6" />
        </linearGradient>
      </defs>

      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}