"use client";

import styles from "./ConcertEventCard.module.css";
import GoldButton from "@/components/common/Button/GoldButton.jsx";

export default function ConcertEventCard() {
    return (
        <div className={styles.card}>

            {/* LEFT PANEL */}
            <div className={styles.leftPanel}>

                <h2 className={styles.title}>
                    [CONCERT] ANH TRAI VƯỢT NGÀN CHÔNG GAI DAY3, DAY4
                </h2>

                <div className={styles.infoRow}>
                    <CalendarIcon />
                    <span className={styles.gradientText}>
                        22, 23 Tháng 3, 2025
                    </span>
                </div>

                <div className={styles.locationRow}>
                    <PinIcon />
                    <div>
                        <p className={`${styles.locationName} ${styles.gradientText}`}>
                            The Global City, TP Thủ Đức
                        </p>

                        <p className={styles.locationAddress}>
                            Đ. Đỗ Xuân Hợp, Phường An Khánh, Thủ Đức, TP Hồ Chí Minh
                        </p>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div>
                        <span className={styles.priceLabel}>Giá từ: </span>
                        <span className={styles.price}>500.000đ</span>
                    </div>

                    <GoldButton>Mua ngay</GoldButton>
                </div>

            </div>

            {/* RIGHT PANEL (IMAGE) */}
            <div className={styles.rightPanel}>

                <img
                    src="/concert.jpg"
                    alt="Concert Poster"
                    className={styles.posterImg}
                />

            </div>

        </div>
    );
}
function CalendarIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#goldSilver1)" strokeWidth="2">
            <defs>
                <linearGradient
                    id="goldSilver1"
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

function PinIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="url(#goldSilver2)" strokeWidth="2">
            <defs>
                <linearGradient id="goldSilver2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#cbb37a" />
                    <stop offset="100%" stopColor="#e6e6e6" />
                </linearGradient>
            </defs>

            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}