import styles from "./EventLocation.module.css";
import PinIcon from "@/components/common/icons/PinIcon";

export default function EventLocation({ location }) {
  return (
    <div className={styles.locationRow}>
      <PinIcon />
      <p className={`${styles.locationName} ${styles.gradientText}`}>
        {location}
      </p>
    </div>
  );
}