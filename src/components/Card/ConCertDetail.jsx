import styles from "./ConcertDetail.module.css";

export default function ConcertDetail() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* Title */}
        <div className={styles.header}>
          <h2 className={styles.title}>GIỚI THIỆU</h2>
          <div className={styles.line}></div>
        </div>

        {/* Text */}
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet euismod mauris,
          id lobortis elit. Duis volutpat, mauris nec rhoncus finibus, turpis eros vulputate elit,
          non maximus nulla massa vel risus. Aenean scelerisque orci elit, eu auctor sem dapibus a.
          Nunc fringilla nunc ac vestibulum accumsan. Vivamus id scelerisque ligula, non ultrices erat.
          Quisque eu aliquam tortor. Suspendisse at tellus pellentesque, accumsan sem vestibulum,
          suscipit lectus. Cras posuere non lorem vitae sodales. Duis et lectus ut purus congue convallis.
        </p>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src="/concert.jpg"
            alt="Concert"
            className={styles.image}
          />
        </div>

      </div>
    </div>
  );
}