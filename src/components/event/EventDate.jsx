import styles from "./EventDate.module.css";
import CalendarIcon from "@/components/common/icons/CalendarIcon";

export default function EventDate({ date }) {
  return (
    <div className={styles.infoRow}>
      <CalendarIcon />
      <span>{date}</span>
    </div>
  );
}