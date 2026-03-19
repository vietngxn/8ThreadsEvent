"use client";

import { useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import Image from "next/image";
import Clock from "@/components/common/Clock";
import artistData from "../../../public/assets/data/AnhTai.json";

const fogtwono5 = localFont({
    src: "../../../public/assets/fonts/fogtwono5/FogtwoNo5.otf",
    variable: "--font-fogtwono5",
    display: "swap",
});
const brunoace = localFont({
    src: "../../../public/assets/fonts/Bruno_Ace_SC/BrunoAceSC-Regular.ttf",
    variable: "--font-brunoace",
    display: "swap",
});

export default function Artist() {
    const containerRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const router = useRouter();

    const menuItems = [
        { label: "TICKETS", href: "/", showArrow: true },
        { label: "HIGHLIGHT", href: "/highlight" },
        { label: "RETAIL", href: "#", showArrow: true },
        { label: "EXPERIENCE", href: "#" },
        { label: "ARTISTS", href: "/artists" },
        { label: "DROP", href: "#" },
        { label: "STORIES", href: "#" },
    ];

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
            className={`relative w-full min-h-screen overflow-hidden ${fogtwono5.variable}`}
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
            <div className="absolute inset-0 pointer-events-none spotlight-beam beam-1" />
            <div className="absolute inset-0 pointer-events-none spotlight-beam beam-2" />
            <div className="absolute inset-0 pointer-events-none spotlight-beam beam-3" />

            <div
                onClick={() => setSelectedArtist(null)}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 60,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: selectedArtist ? "auto" : "none",
                    opacity: selectedArtist ? 1 : 0,
                    transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        gap: "48px",
                        transform: selectedArtist ? "translateY(0)" : "translateY(30px)",
                        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                    }}
                >
                    <div
                        style={{
                            width: "520px",
                            height: "640px",
                            backgroundImage: selectedArtist ? `url('${selectedArtist.img}')` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundImage: `url('/assets/images/common-panel 1.png')`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {selectedArtist && selectedArtist.img && (
                            <img
                                src={selectedArtist.img}
                                alt={selectedArtist.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        )}
                    </div>

                    <div
                        style={{
                            width: "620px",
                            height: "640px",
                            backgroundImage: `url('/assets/images/common-panel 1.png')`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "40px 32px",
                            boxSizing: "border-box",
                        }}
                    >
                        {selectedArtist && (
                            <>
                                <div style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    fontSize: "clamp(24px, 3vw, 38px)",
                                    color: "#1a1a1a",
                                    letterSpacing: "0.05em",
                                    marginBottom: "16px",
                                    lineHeight: 1.1,
                                }}>
                                    {selectedArtist.name}
                                </div>
                                <div style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    lineHeight: 1.6,
                                    marginBottom: "28px",
                                }}>
                                    {selectedArtist.description}
                                </div>
                                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                    {selectedArtist.facebook && (
                                        <a href={selectedArtist.facebook} target="_blank" rel="noopener noreferrer"
                                            style={{ color: "#1a1a1a", fontSize: "13px", textDecoration: "underline" }}>
                                            FB
                                        </a>
                                    )}
                                    {selectedArtist.youtube && (
                                        <a href={selectedArtist.youtube} target="_blank" rel="noopener noreferrer"
                                            style={{ color: "#1a1a1a", fontSize: "13px", textDecoration: "underline" }}>
                                            YT
                                        </a>
                                    )}
                                    {selectedArtist.instagram && (
                                        <a href={selectedArtist.instagram} target="_blank" rel="noopener noreferrer"
                                            style={{ color: "#1a1a1a", fontSize: "13px", textDecoration: "underline" }}>
                                            IG
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={() => setSelectedArtist(null)}
                    style={{
                        position: "fixed",
                        top: "32px",
                        right: "96px",
                        width: "48px",
                        height: "48px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 300,
                        opacity: 0.8,
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                        <line x1="4" y1="4" x2="32" y2="32" stroke="white" strokeWidth="2" />
                        <line x1="32" y1="4" x2="4" y2="32" stroke="white" strokeWidth="2" />
                    </svg>
                </button>
            </div>

            {/* Menu overlay */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 50,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: menuOpen ? "auto" : "none",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(4%)",
                    transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                <nav
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "10vw",
                    }}
                >
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => router.push(item.href)}
                            style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                fontSize: "clamp(48px, 8vw, 110px)",
                                color: "rgba(255,255,255,0.8)",
                                lineHeight: 1.05,
                                letterSpacing: "0.04em",
                                textDecoration: "none",
                                display: "block",
                                cursor: "pointer",
                                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                                opacity: menuOpen ? 1 : 0,
                                transition: `transform 0.45s cubic-bezier(0.4,0,0.2,1) ${index * 60}ms, opacity 0.45s cubic-bezier(0.4,0,0.2,1) ${index * 60}ms, color 0.2s, letter-spacing 0.2s`,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.letterSpacing = "0.08em";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                                e.currentTarget.style.letterSpacing = "0.04em";
                            }}
                        >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "clamp(8px, 1vw, 20px)" }}>
                                <span
                                    style={{
                                        background: "linear-gradient(150deg, #C5C3BD, #816431)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                    }}
                                >
                                    {item.label[0]}
                                </span>
                                {item.label.slice(1)}
                                {item.showArrow && (
                                    <Image
                                        src="/arrow.png"
                                        alt="arrow"
                                        width={50}
                                        height={50}
                                        style={{ objectFit: "contain", display: "inline-block" }}
                                    />
                                )}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>
            <button
                onClick={() => setMenuOpen(v => !v)}
                style={{
                    position: "fixed",
                    top: "32px",
                    right: "32px",
                    width: "48px",
                    height: "48px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 200,
                    opacity: selectedArtist ? 0 : 0.75,
                    pointerEvents: selectedArtist ? "none" : "auto",
                    transition: "opacity 0.3s",
                }}
                onMouseEnter={e => { if (!selectedArtist) e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={e => { if (!selectedArtist) e.currentTarget.style.opacity = "0.75"; }}
            >
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    style={{
                        transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <line x1="18" y1="2" x2="18" y2="34" stroke="white" strokeWidth="2" />
                    <line x1="2" y1="18" x2="34" y2="18" stroke="white" strokeWidth="2" />
                </svg>
            </button>
            <div className="relative z-10 flex flex-col items-center min-h-screen text-white text-center px-6">
                <img
                    style={{ width: "150px" }}
                    src="/assets/images/logo.png"
                    alt="8Threads Logo"
                />
                <div style={{ width: "1200px", marginTop: "100px", rotate: "-100deg", translate: "-50% -440px" }}>
                    <Clock
                        fontFamilyDigital={brunoace.style.fontFamily}
                        fontFamilyMessage={fogtwono5.style.fontFamily}
                    />
                </div>
                {(() => {
                    const artists = artistData.anhTai;
                    const half = Math.ceil(artists.length / 2);
                    const row1 = artists.slice(0, half);
                    const row2 = artists.slice(half);

                    const cardStyle = (i) => ({
                        flexShrink: 0,
                        width: "230px",
                        height: "300px",
                        backgroundImage: "url('/assets/images/common-panel 1.png')",
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        overflow: "hidden",
                        cursor: "pointer",
                        position: "relative",
                        transition: "transform 0.2s",
                    });

                    const renderRow = (row, rowIndex) => {

                        const loopArtists = [...row, ...row];

                        return (
                            <div
                                key={rowIndex}
                                style={{
                                    overflow: "hidden",
                                    width: "100vw",
                                    marginTop: "40px",
                                    transform: "rotate(-10deg)",

                                }}
                            >
                                <div
                                    className={rowIndex === 0 ? "marquee-left" : "marquee-right"}
                                    style={{
                                        display: "flex",
                                        gap: "48px",
                                        width: "max-content",
                                        paddingLeft: "48px",
                                        paddingRight: "48px"
                                    }}
                                >
                                    {loopArtists.map((artist, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedArtist(artist)}
                                            style={{
                                                flexShrink: 0,
                                                width: "230px",
                                                height: "300px",
                                                backgroundImage: "url('/assets/images/common-panel 1.png')",
                                                backgroundSize: "100% 100%",
                                                backgroundRepeat: "no-repeat",
                                                overflow: "hidden",
                                                cursor: "pointer",
                                                position: "relative",
                                                transition: "transform 0.2s"
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                        >
                                            {artist.img && (
                                                <img
                                                    src={artist.img}
                                                    alt={artist.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    };

                    return (
                        <>
                            {renderRow(row1, 0)}
                            {renderRow(row2, 1)}
                        </>
                    );
                })()}

            </div>
        </div>
    );
}
