import { useState, useEffect } from "react";

export default function Countdown({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0"); 
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="countdown">
      <p>Hoàn tất đặt vé trong</p>
      <div>
        <span>{mins}</span> : <span>{secs}</span>
      </div>
    </div>
  );
}