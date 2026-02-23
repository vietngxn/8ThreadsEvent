"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/three/ModelViewer"), { ssr: false });

export default function StartingPage() {
    const containerRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const el = containerRef.current;
        if (el) {
            el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const el = containerRef.current;
        if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen overflow-hidden "
            style={{ "--mx": "-9999px", "--my": "-9999px" }}
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
                    background: "radial-gradient(circle 200px at var(--mx) var(--my), transparent 0%, rgba(0,0,0,0.5) 100%)",
                    transition: "background 0.05s ease",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle 180px at var(--mx) var(--my), rgba(255,255,255,0.2) 0%, transparent 100%)",
                    mixBlendMode: "screen",
                    transition: "background 0.05s ease",
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-6">
                <div style={{ width: 800, height: 800, marginLeft: -100 }}>
                    <ModelViewer url="/Model8Threadfinal.glb" />
                </div>
                <div
                    style={{
                        background: "url('/assets/images/button-bg 1.png')",
                        backgroundRepeat: "no-repeat",
                        width: 200,
                        height: 50,
                        color: "black",
                        cursor: "pointer",
                    }}
                >
                    <span
                        style={{
                            fontSize: 19,
                            marginLeft: "-40px",
                            lineHeight: "40px"
                        }}>
                        Bắt đầu
                    </span>
                </div>
            </div>
        </div>
    );
}
