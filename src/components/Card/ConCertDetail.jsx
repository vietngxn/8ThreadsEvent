import styles from "./ConcertDetail.module.css";

export default function ConcertDetail({ data }) {
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>GIỚI THIỆU</h2>
          <div className={styles.line}></div>
        </div>

        <p className={styles.text}>
          {data.description || "Chưa có mô tả cho sự kiện này."}
        </p>

        <div className={styles.imageWrapper}>
          <img
            src={`/${data.img}`}
            alt="Detail"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}