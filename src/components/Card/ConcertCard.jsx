"use client";

import { useState } from "react";
import styles from "./ConcertCard.module.css";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

import { useRouter } from "next/navigation";

export default function ConcertCard({ event }) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/page/concerts/${event._id}`)}
    >
      <div className={styles.poster}>
        <img src={event.img || "/poster.jpg"} alt={event.name} />
      </div>
      <div className={styles.info}>
        <EventTitle title={event.name} />
        <p className={styles.price}>
          Giá từ: {event.minPrice?.toLocaleString()}đ
        </p>
        <div className={styles.meta}>
          <EventDate
            date={event.time?.event?.start}
            isHover={hover}
          />          <EventLocation
            location={event.venue?.name + ", " + event.venue?.city || "Địa điểm chưa cập nhật"}
            isHover={hover}
          />
        </div>
      </div>
    </div>
  );
}