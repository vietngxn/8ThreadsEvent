"use client";
import { useRouter } from "next/navigation";
import styles from "./ConcertEventCard.module.css";
import GoldButton from "@/components/common/Button/GoldButton.jsx";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

export default function ConcertEventCard({ data }) {
  const router = useRouter();

  if (!data) return null;

  const formattedPrice =
    data.minPrice != null
      ? Number(data.minPrice).toLocaleString("vi-VN") + "đ"
      : "Đang cập nhật";

  return (
    <div className={styles.card}>
      <div className={styles.leftPanel}>
        <EventTitle title={data.name} />
        <EventDate date={data.time?.event?.start || "2025-01-01"} />
        <EventLocation location={`${data.venue?.name}, ${data.venue?.city}`} />

        <div className={styles.bottomBar}>
          <div>
            <span className={styles.price}>Giá từ: </span>
            <span className={styles.price}>{formattedPrice}</span>
          </div>

          <GoldButton
            onClick={() => router.push(`/page/selectSeat/${data._id}`)}
          >
            Mua ngay
          </GoldButton>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <img src={data.img} alt="Poster" style={{ height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
}
