"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/three/ModelViewer"), { ssr: false });

export default function StartingPage() {
    const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setMouse({ x: -9999, y: -9999 });
    }, []);

    return (
        <div
            className="relative w-full min-h-screen overflow-hidden "
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/FirstPage.png')",
                    filter: "brightness(1.4)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, transparent 0%, rgba(0,0,0,0.5) 100%)`,
                    transition: "background 0.05s ease",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle 180px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.2) 0%, transparent 100%)`,
                    mixBlendMode: "screen",
                    transition: "background 0.05s ease",
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-6">
                <div style={{ width: 800, height: 800, marginLeft: -140 }}>
                    <ModelViewer url="/Model8Threadfinal.glb" />
                </div>
            </div>
        </div>
    );
}