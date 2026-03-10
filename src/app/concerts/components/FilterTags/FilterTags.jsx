"use client";

import styles from "./FilterTags.module.css";
import { X } from "lucide-react";

export default function FilterTags({ filters, setFilters }) {
  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  return (
    <div className={styles.wrapper}>
      {filters.price && (
        <div className={styles.tag}>
          <span className={styles.text}>Giá: {filters.price}</span>

          <X
            size={16}
            className={styles.icon}
            onClick={() => removeFilter("price")}
          />
        </div>
      )}

      {filters.city && (
        <div className={styles.tag}>
          <span className={styles.text}>Địa điểm: {filters.city}</span>

          <X
            size={16}
            className={styles.icon}
            onClick={() => removeFilter("city")}
          />
        </div>
      )}

      {filters.genre && (
        <div className={styles.tag}>
          <span className={styles.text}>Thể loại: {filters.genre}</span>

          <X
            size={16}
            className={styles.icon}
            onClick={() => removeFilter("genre")}
          />
        </div>
      )}
    </div>
  );
}
