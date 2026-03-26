import styles from "./EventLocation.module.css";
import PinIcon from "@/components/common/icons/PinIcon";

export default function EventLocation({ location, isHover }) {
  return (
    <div className={styles.locationRow}>
      <PinIcon isHover={isHover} />
      <p
        className={`${styles.locationName} ${isHover ? styles.blackText : styles.gradientText
          }`}
      >
        {location}
      </p>
    </div>
  );
}