import styles from "./EventDate.module.css";
import CalendarIcon from "@/components/common/icons/CalendarIcon";

export default function EventDate({ date, isHover }) {
  const d = new Date(date);

  const formatted = new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  return (
    <div className={styles.infoRow}>
      <CalendarIcon isHover={isHover} />
      <span
        className={
          isHover ? styles.blackText : styles.gradientText
        }
      >
        {formatted}
      </span>
    </div>
  );
}