import styles from "./EventTitle.module.css";

export default function EventTitle({ title }) {
  return (
    <h2 className={styles.title}>
      {title}
    </h2>
  );
}