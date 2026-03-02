"use client";

import { useState, useEffect, useRef } from "react";

export default function Clock({ fontFamilyDigital, fontFamilyMessage }) {
    const [time, setTime] = useState(null);
    const rafRef = useRef(null);

    useEffect(() => {
        setTime(new Date());

        let lastSecond = -1;
        const tick = () => {
            const now = new Date();
            if (now.getSeconds() !== lastSecond) {
                setTime(new Date());
                lastSecond = now.getSeconds();
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    if (!time) return null;

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;

    const digitalTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const cx = 150;
    const cy = 150;

    return (
        <div className="clock-container">
            {/* Red ambient light effects */}
            <div className="clock-red-glow clock-red-glow-1" />
            <div className="clock-red-glow clock-red-glow-2" />
            <div className="clock-red-glow clock-red-glow-3" />

            {/* Analog Clock */}
            <div className="analog-clock">
                <svg
                    viewBox="0 0 300 300"
                    width="280"
                    height="280"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Hour hand */}
                    <line
                        x1={cx}
                        y1={cy}
                        x2={cx}
                        y2={cy - 60}
                        stroke="white"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        transform={`rotate(${hourAngle}, ${cx}, ${cy})`}
                    />

                    {/* Minute hand */}
                    <line
                        x1={cx}
                        y1={cy}
                        x2={cx}
                        y2={cy - 85}
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        transform={`rotate(${minuteAngle}, ${cx}, ${cy})`}
                    />

                    {/* Second hand */}
                    <line
                        x1={cx}
                        y1={cy + 20}
                        x2={cx}
                        y2={cy - 95}
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        transform={`rotate(${secondAngle}, ${cx}, ${cy})`}
                    />

                    {/* Center dot */}
                    <circle cx={cx} cy={cy} r="4" fill="white" />
                    <circle cx={cx} cy={cy} r="2" fill="#1a1a1a" />
                </svg>
            </div>

            {/* Digital section */}
            <div className="digital-clock">
                <div
                    className="digital-time"
                    style={fontFamilyDigital ? { fontFamily: fontFamilyDigital } : {}}
                >
                    VNA - {digitalTime}
                </div>
                <div
                    className="digital-message"
                    style={fontFamilyMessage ? { fontFamily: fontFamilyMessage } : {}}
                >
                    FES - WE HOPE TO SEE YOU SOON
                </div>
            </div>
        </div>
    );
}
