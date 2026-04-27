"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ConcertCard.module.css";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

import { useRouter } from "next/navigation";

export default function ConcertCard({ event }) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  return (
    <Link href={`/page/viewticket/${event._id}`}>
      <div
        className={styles.card}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.poster}>
          <img src={event.img || "/poster.jpg"} alt={event.name} />
        </div>

        <div className={styles.info}>
          <EventTitle title={event.name} />

          <p className={styles.price}>
            Giá từ: {
              event.minPrice
                ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(event.minPrice)
                : "Đang cập nhật"
            }
          </p>

          <div className={styles.meta}>
            <EventDate
              date={event.time?.event?.start}
              isHover={hover}
            />

            <EventLocation
              location={event.venue?.name + ", " + event.venue?.city || "Địa điểm chưa cập nhật"}
              isHover={hover}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}