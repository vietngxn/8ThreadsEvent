"use client";

import styles from "./ConcertCard.module.css";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

export default function ConcertCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <img src={event.img || "/poster.jpg"} alt={event.name} />
      </div>
      <div className={styles.info}>
        <EventTitle title={event.name} />
        <p className={styles.price}>
          Giá từ: {event.minPrice?.toLocaleString()}đ
        </p>
        <div className={styles.meta}>
          <EventDate date={event.startTime} />
          <EventLocation location={event.venue?.address || "Địa điểm chưa cập nhật"} />
        </div>
      </div>
    </div>
  );
}
