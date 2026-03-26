import styles from "./EventDate.module.css";
import CalendarIcon from "@/components/common/icons/CalendarIcon";

export default function EventDate({ date }) {
  const d = new Date(date);

  const formatted = new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  return (
    <div className={styles.infoRow}>
      <CalendarIcon />
      <span>{formatted}</span>
    </div>
  );
}
