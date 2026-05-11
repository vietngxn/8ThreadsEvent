"use client";

import styles from "./FilterTags.module.css";
import { X } from "lucide-react";

export default function FilterTags({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
}) {
  const removeFilter = (key) => {
    const defaults = {
      city: "All",
      price: "",
      dateFrom: "",
      dateTo: "",
    };

    setFilters((prev) => ({
      ...prev,
      [key]: defaults[key] ?? "",
    }));
  };

  const removeDateRange = () => {
    setFilters((prev) => ({
      ...prev,
      dateFrom: "",
      dateTo: "",
    }));
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const hasDateFilter = filters.dateFrom || filters.dateTo;

  const hasActiveTags =
    (filters.city && filters.city !== "All") ||
    filters.price ||
    hasDateFilter ||
    searchQuery;

  if (!hasActiveTags) return null;

  return (
    <div className={styles.wrapper}>
      {/* Search tag */}
      {searchQuery && (
        <div className={styles.tag}>
          <span className={styles.text}>Tìm: &quot;{searchQuery}&quot;</span>

          <X
            size={16}
            className={styles.icon}
            onClick={() => setSearchQuery("")}
          />
        </div>
      )}

      {/* City tag */}
      {filters.city && filters.city !== "All" && (
        <div className={styles.tag}>
          <span className={styles.text}>Địa điểm: {filters.city}</span>

          <X
            size={16}
            className={styles.icon}
            onClick={() => removeFilter("city")}
          />
        </div>
      )}

      {/* Price tag */}
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

      {/* Date range tag */}
      {hasDateFilter && (
        <div className={styles.tag}>
          <span className={styles.text}>
            Ngày:{" "}
            {filters.dateFrom && filters.dateTo
              ? `${formatDate(filters.dateFrom)} → ${formatDate(filters.dateTo)}`
              : filters.dateFrom
                ? `Từ ${formatDate(filters.dateFrom)}`
                : `Đến ${formatDate(filters.dateTo)}`}
          </span>

          <X
            size={16}
            className={styles.icon}
            onClick={removeDateRange}
          />
        </div>
      )}
    </div>
  );
}
