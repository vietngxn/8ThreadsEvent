"use client";

import { useState, useRef } from "react";
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
    const router = useRouter();
    const containerRef = useRef(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);

    const menuItems = [
        { label: "TICKETS", href: "/page/concerts" },
        { label: "HIGHLIGHT", href: "/highlight" },
        { label: "RETAIL", href: "#" },
        { label: "EXPERIENCE", href: "/" },
        { label: "ARTISTS", href: "/artists" },
        { label: "DROP", href: "#" },
        { label: "STORIES", href: "#" },
    ];

    const artists = artistData.anhTai;

    const half = Math.ceil(artists.length / 2);

    const row1 = artists.slice(0, half);
    const row2 = artists.slice(half);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--mx",
                `${e.clientX - rect.left}px`
            );

            containerRef.current.style.setProperty(
                "--my",
                `${e.clientY - rect.top}px`
            );
        }
    };

    const handleMouseLeave = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty("--mx", "-9999px");
            containerRef.current.style.setProperty("--my", "-9999px");
        }
    };

    const renderArtists = (list, direction) => {
        const loopArtists = [...list, ...list];

        return (
            <div
                style={{
                    overflow: "hidden",
                    width: "100vw",
                    marginTop: "40px",
                    transform: "rotate(-10deg)",
                }}
            >
                <div
                    className={direction}
                    style={{
                        display: "flex",
                        gap: "48px",
                        width: "max-content",
                        paddingLeft: "48px",
                        paddingRight: "48px",
                    }}
                >
                    {loopArtists.map((artist, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedArtist(artist)}
                            style={{
                                width: "230px",
                                height: "300px",
                                flexShrink: 0,
                                overflow: "hidden",
                                cursor: "pointer",
                                transition: "0.2s",
                                backgroundImage:
                                    "url('/assets/images/common-panel 1.png')",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "scale(1.04)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            <img
                                src={artist.img}
                                alt={artist.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative min-h-screen overflow-hidden ${fogtwono5.variable}`}
            style={{
                "--mx": "-9999px",
                "--my": "-9999px",
            }}
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/FirstPage.png')",
                    filter: "brightness(1.4)",
                }}
            />

            {/* Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle 200px at var(--mx) var(--my), transparent 0%, rgba(0,0,0,0.5) 100%)",
                }}
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle 180px at var(--mx) var(--my), rgba(255,255,255,0.2) 0%, transparent 100%)",
                    mixBlendMode: "screen",
                }}
            />

            {/* Menu */}
            {menuOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 50,
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            paddingLeft: "10vw",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setMenuOpen(false);
                                    router.push(item.href);
                                }}
                                style={{
                                    fontSize: "clamp(48px, 8vw, 100px)",
                                    color: "white",
                                    cursor: "pointer",
                                    lineHeight: 1.1,
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Artist Modal */}
            {selectedArtist && (
                <div
                    onClick={() => setSelectedArtist(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 100,
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "1100px",
                            height: "650px",
                            display: "flex",
                            gap: "40px",
                        }}
                    >
                        {/* Image */}
                        <div
                            style={{
                                width: "500px",
                                height: "650px",
                                overflow: "hidden",
                                backgroundImage:
                                    "url('/assets/images/common-panel 1.png')",
                                backgroundSize: "100% 100%",
                            }}
                        >
                            <img
                                src={selectedArtist.img}
                                alt={selectedArtist.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        {/* Info */}
                        <div
                            style={{
                                flex: 1,
                                padding: "40px",
                                backgroundImage:
                                    "url('/assets/images/common-panel 1.png')",
                                backgroundSize: "100% 100%",
                                color: "#111",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: "42px",
                                    marginBottom: "20px",
                                }}
                            >
                                {selectedArtist.name}
                            </h1>

                            <p
                                style={{
                                    fontSize: "15px",
                                    lineHeight: 1.7,
                                    marginBottom: "30px",
                                }}
                            >
                                {selectedArtist.description}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                }}
                            >
                                {selectedArtist.facebook && (
                                    <a
                                        href={selectedArtist.facebook}
                                        target="_blank"
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Facebook
                                    </a>
                                )}

                                {selectedArtist.instagram && (
                                    <a
                                        href={selectedArtist.instagram}
                                        target="_blank"
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Instagram
                                    </a>
                                )}

                                {selectedArtist.youtube && (
                                    <a
                                        href={selectedArtist.youtube}
                                        target="_blank"
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Youtube
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Menu Button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    position: "fixed",
                    top: "30px",
                    right: "30px",
                    width: "50px",
                    height: "50px",
                    zIndex: 200,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                <svg width="36" height="36" viewBox="0 0 36 36">
                    <line
                        x1="18"
                        y1="2"
                        x2="18"
                        y2="34"
                        stroke="white"
                        strokeWidth="2"
                    />

                    <line
                        x1="2"
                        y1="18"
                        x2="34"
                        y2="18"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>
            </button>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center min-h-screen text-white">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    style={{
                        width: "150px",
                    }}
                />

                <div
                    style={{
                        width: "1200px",
                        marginTop: "100px",
                        rotate: "-100deg",
                        translate: "-50% -440px",
                    }}
                >
                    <Clock
                        fontFamilyDigital={brunoace.style.fontFamily}
                        fontFamilyMessage={fogtwono5.style.fontFamily}
                    />
                </div>

                {renderArtists(row1, "marquee-left")}

                {renderArtists(row2, "marquee-right")}
            </div>
        </div>
    );
}