"use client";

import { useState } from "react";
import styles from "./MyTickets.module.css";

const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "success", label: "Thành công" },
    { key: "processing", label: "Đang xử lý" },
    { key: "cancelled", label: "Đã hủy" },
];

const subTabs = [
    { key: "upcoming", label: "Sắp diễn ra" },
    { key: "ended", label: "Đã kết thúc" },
];

// Demo ticket data — replace with real data from your API
const demoTickets = [];

export default function MyTickets() {
    const [activeTab, setActiveTab] = useState("all");
    const [activeSubTab, setActiveSubTab] = useState("upcoming");

    const filteredTickets = demoTickets.filter((t) => {
        const statusMatch = activeTab === "all" || t.status === activeTab;
        const timeMatch = activeSubTab === "upcoming" ? t.upcoming : !t.upcoming;
        return statusMatch && timeMatch;
    });

    return (
        <div className={styles.wrapper}>
            {/* Noise texture overlay */}
            <div className={styles.noise} />

            {/* Background text watermark */}
            <div className={styles.bgWatermark} aria-hidden="true">
                <span>Ho Chi Minh City</span>
                <span className={styles.bgLarge}>STAY READY</span>
                <span>31 MAR 2026</span>
                <span>Ho Chi Minh City</span>
                <span className={styles.bgLarge}>STAY READY</span>
                <span>31 MAR 2026</span>
            </div>

            <div className={styles.container}>
                <h1 className={styles.heading}>Vé của tôi</h1>

                {/* Status tabs */}
                <div className={styles.statusTabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`${styles.statusTab} ${activeTab === tab.key ? styles.statusTabActive : ""
                                }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Sub tabs */}
                <div className={styles.subTabs}>
                    {subTabs.map((sub) => (
                        <button
                            key={sub.key}
                            className={`${styles.subTab} ${activeSubTab === sub.key ? styles.subTabActive : ""
                                }`}
                            onClick={() => setActiveSubTab(sub.key)}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {filteredTickets.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.illustrationWrap}>
                                <svg
                                    className={styles.illustration}
                                    viewBox="0 0 200 200"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Sky gradient */}
                                    <defs>
                                        <radialGradient id="skyGrad" cx="50%" cy="40%" r="55%">
                                            <stop offset="0%" stopColor="#F5C842" />
                                            <stop offset="40%" stopColor="#E8773A" />
                                            <stop offset="100%" stopColor="#B84020" />
                                        </radialGradient>
                                        <clipPath id="circleClip">
                                            <circle cx="100" cy="100" r="98" />
                                        </clipPath>
                                    </defs>

                                    {/* Background sky */}
                                    <circle cx="100" cy="100" r="98" fill="url(#skyGrad)" />

                                    {/* Horizon bands */}
                                    <rect
                                        x="2"
                                        y="115"
                                        width="196"
                                        height="15"
                                        fill="#D05A2A"
                                        clipPath="url(#circleClip)"
                                    />
                                    <rect
                                        x="2"
                                        y="130"
                                        width="196"
                                        height="18"
                                        fill="#C8A882"
                                        clipPath="url(#circleClip)"
                                    />
                                    <rect
                                        x="2"
                                        y="148"
                                        width="196"
                                        height="52"
                                        fill="#DEB98A"
                                        clipPath="url(#circleClip)"
                                    />

                                    {/* Road */}
                                    <polygon
                                        points="85,200 115,200 108,148 92,148"
                                        fill="#A07850"
                                        clipPath="url(#circleClip)"
                                    />
                                    <polygon
                                        points="97,200 103,200 101,148 99,148"
                                        fill="#C8A882"
                                        clipPath="url(#circleClip)"
                                    />

                                    {/* Sun */}
                                    <circle cx="100" cy="72" r="18" fill="#F5C842" />

                                    {/* Character body */}
                                    <ellipse cx="100" cy="152" rx="11" ry="13" fill="#D4A832" />
                                    {/* Helmet */}
                                    <circle cx="100" cy="136" r="10" fill="#D4A832" />
                                    <circle cx="100" cy="136" r="7" fill="#E8C060" opacity="0.6" />
                                    {/* Backpack hint */}
                                    <rect
                                        x="109"
                                        y="141"
                                        width="6"
                                        height="10"
                                        rx="2"
                                        fill="#B8921E"
                                    />
                                    {/* Legs */}
                                    <rect x="94" y="163" width="5" height="10" rx="2" fill="#B8921E" />
                                    <rect x="101" y="163" width="5" height="10" rx="2" fill="#B8921E" />

                                    {/* Circle border */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="97"
                                        stroke="#2A1A0A"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                </svg>
                            </div>

                            <p className={styles.emptyText}>Bạn chưa có vé nào</p>

                            <button className={styles.buyBtn}>Mua vé ngay</button>
                        </div>
                    ) : (
                        <div className={styles.ticketGrid}>
                            {filteredTickets.map((ticket) => (
                                <div key={ticket.id} className={styles.ticketCard}>
                                    <h3>{ticket.name}</h3>
                                    <p>{ticket.date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}