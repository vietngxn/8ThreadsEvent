"use client";

import { useState } from "react";
import styles from "./ConcertCard.module.css";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

export default function ConcertCard({ event }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.poster}>
        <img src={event.img || "/poster.jpg"} alt={event.name} />
      </div>

      <div className={styles.info}>
        <EventTitle title={event.name} />

        <p className={styles.price}>
          Giá từ: {event.minPrice ? event.minPrice.toLocaleString() : "Đang cập nhật"}đ
        </p>

        <div className={styles.meta}>
          <EventDate
            date={event.time?.event?.start}
            isHover={hover}
          />

          <EventLocation
            location={
              event.venue
                ? ${event.venue.name}, ${event.venue.city}
          : "Địa điểm chưa cập nhật"
            }
          isHover={hover}
          />
        </div>
      </div>
    </div>
  );
}