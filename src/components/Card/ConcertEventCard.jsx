"use client";

import styles from "./ConcertEventCard.module.css";
import GoldButton from "@/components/common/Button/GoldButton.jsx";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

export default function ConcertEventCard() {
    return (
        <div className={styles.card}>

            {/* LEFT PANEL */}
            <div className={styles.leftPanel}>

                <EventTitle title="[CONCERT] ANH TRAI VƯỢT NGÀN CHÔNG GAI DAY3, DAY4" />

                <EventDate date="22, 23 Tháng 3, 2025" />

                <EventLocation location="The Global City, TP Thủ Đức" />

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