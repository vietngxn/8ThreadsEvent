"use client";

import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const fogtwono5 = localFont({
    src: "../../../../public/assets/fonts/fogtwono5/FogtwoNo5.otf",
    variable: "--font-fogtwono5",
    display: "swap",
});

const menuItems = [
    { label: "HOME", href: "/highlight" },
    { label: "SCHEDULE", href: "#" },
    { label: "ARTISTS", href: "#" },
    { label: "GALLERY", href: "#" },
    { label: "TICKETS", href: "#", showArrow: true, requireAuth: true, authTarget: "/concerts" },
    { label: "RETAIL", href: "#", showArrow: true },
    { label: "CONTACT", href: "#" },
];

export default function Menu() {
    const router = useRouter();

    const handleMenuClick = (item, e) => {
        if (!item.requireAuth) return; // let Link handle it normally
        e.preventDefault();
        const isLoggedIn = localStorage.getItem("user_active") === "true";
        if (isLoggedIn) {
            router.push(item.authTarget);
        } else {
            router.push(`/login?redirect=${encodeURIComponent(item.authTarget)}`);
        }
    };

    return (
        <div
            className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "#0a0a0a" }}
        >
            {/* Background image with dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/FirstPage.png')",
                    filter: "brightness(0.3)",
                }}
            />

            {/* Close button - top right */}
            <Link href="/highlight">
                <button
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
                        zIndex: 100,
                        opacity: 0.7,
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
                >
                    {/* X icon */}
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <line x1="4" y1="4" x2="32" y2="32" stroke="white" strokeWidth="2" />
                        <line x1="32" y1="4" x2="4" y2="32" stroke="white" strokeWidth="2" />
                    </svg>
                </button>
            </Link>

            {/* Menu content */}
            <nav className="relative z-10 flex flex-col items-start" style={{ paddingLeft: "10vw" }}>
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.requireAuth ? "#" : item.href}
                        onClick={(e) => handleMenuClick(item, e)}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className="menu-item"
                            style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                fontSize: "clamp(48px, 8vw, 110px)",
                                color: "rgba(255,255,255,0.85)",
                                lineHeight: "1.05",
                                letterSpacing: "0.05em",
                                cursor: "pointer",
                                transition: "color 0.2s, letter-spacing 0.2s",
                                userSelect: "none",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.letterSpacing = "0.1em";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                                e.currentTarget.style.letterSpacing = "0.05em";
                            }}
                        >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "clamp(8px, 1vw, 20px)" }}>
                                {item.label}
                                {item.showArrow && (
                                    <Image
                                        src="/arrow.png"
                                        alt="arrow"
                                        width={60}
                                        height={60}
                                        style={{ objectFit: "contain", display: "inline-block" }}
                                    />
                                )}
                            </span>
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
