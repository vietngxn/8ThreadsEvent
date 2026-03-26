export default function PinIcon({ size = 15, isHover }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={isHover ? "#000" : "url(#goldSilverPin)"}
      strokeWidth="2"
    >
      {!isHover && (
        <defs>
          <linearGradient id="goldSilverPin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbb37a" />
            <stop offset="100%" stopColor="#e6e6e6" />
          </linearGradient>
        </defs>
      )}

      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}