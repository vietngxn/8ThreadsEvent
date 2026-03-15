"use client";

import styles from "./ConcertCard.module.css";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

export default function ConcertCard() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                {/* Poster */}
                <div className={styles.poster}>
                    <img
                        src="/poster.jpg"
                        alt="Concert Poster"
                        className={styles.posterImg}
                    />
                </div>

                {/* Info */}
                <div className={styles.info}>

                    <EventTitle title="[CONCERT] ANH TRAI VƯỢT NGÀN CHÔNG GAI DAY3, DAY4" />

                    <p className={styles.price}>Từ 800.000đ</p>

                    <div className={styles.meta}>
                        <EventDate date="22, 23 Tháng 3, 2025" />

                        <EventLocation location="The Global City, TP Thủ Đức" />
                    </div>

                </div>
            </div>
        </div>
    );
}