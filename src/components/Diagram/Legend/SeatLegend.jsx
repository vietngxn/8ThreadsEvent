"use client";

import styles from "./SeatLegend.module.css";

const LEGEND_DATA = [
  {
    title: "Standing:",
    items: [
      { color: "#00aaff", label: "Đa sắc, Đa tình" },
      { color: "#5bc0de", label: "Rực lửa 1, 2" },
      { color: "#f0ad4e", label: "Bí ẩn 1, 2" },
      { color: "#f07000", label: "Nham thạch 1, 2" },
      { color: "#e8400a", label: "Thanh xuân 1, 2" },
    ],
  },
  {
    title: "Seated:",
    items: [
      { color: "#0018ac", label: "Xương rồng 1, 2" },
      { color: "#6f008a", label: "Sao sáng 1, 2" },
      { color: "#a600ac", label: "Tái sinh 1, 2" },
      { color: "#d80f8f", label: "Ngũ hành 1, 2" },
      { color: "#5e004c", label: "Nhà hát 1, 2" },
      { color: "#c477ff", label: "Xuân hạ thu đông 1, 2" },
      { color: "#e8274b", label: "Đam mê 1, 2" },
      { color: "#00bfa5", label: "Sục sôi 1, 2" },
      { color: "#007062", label: "Huyền thoại 1, 2" },
    ],
  },
  {
    title: "VIP Lounce:",
    items: [{ color: "#ff5dbb", label: "S-VIP 1, 2" }],
  },
];

export default function SeatLegend() {
  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.legendTitle}>GHI CHÚ</h3>
      {LEGEND_DATA.map((group, index) => (
        <div key={index} className={styles.legendGroup}>
          <div className={styles.legendLabel}>{group.title}</div>
          <div className={styles.legendItems}>
            {group.items.map((item, i) => (
              <div key={i} className={styles.legendItem}>
                <span className={styles.colorBox} style={{ background: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}