"use client";

import { useState, useEffect } from "react";
import styles from "./FilterModal.module.css";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ──────────────── Calendar Component ────────────────

function Calendar({ selected, onSelect, label }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    selected ? selected.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selected ? selected.getMonth() : today.getMonth()
  );

  const MONTH_NAMES = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const DAY_NAMES = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isToday = (day) => {
    return isSameDay(new Date(viewYear, viewMonth, day), today);
  };

  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`blank-${i}`} className={styles.calendarBlank} />
  ));

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(viewYear, viewMonth, day);
    const isSelected = isSameDay(date, selected);
    const todayClass = isToday(day);

    return (
      <button
        key={day}
        type="button"
        className={`${styles.calendarDay} ${isSelected ? styles.calendarDaySelected : ""} ${todayClass ? styles.calendarDayToday : ""}`}
        onClick={() => onSelect(date)}
      >
        {day}
      </button>
    );
  });

  return (
    <div className={styles.calendar}>
      <p className={styles.calendarLabel}>{label}</p>

      <div className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.calendarNav}
          onClick={prevMonth}
        >
          <ChevronLeft size={18} />
        </button>

        <span className={styles.calendarTitle}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          className={styles.calendarNav}
          onClick={nextMonth}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className={styles.calendarWeekdays}>
        {DAY_NAMES.map((d) => (
          <span key={d} className={styles.calendarWeekday}>
            {d}
          </span>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {blanks}
        {days}
      </div>

      {selected && (
        <p className={styles.calendarSelected}>
          {selected.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}

// ──────────────── FilterModal Component ────────────────

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  setFilters,
}) {
  const [localPrice, setLocalPrice] = useState(filters.price || "");
  const [localDateFrom, setLocalDateFrom] = useState(
    filters.dateFrom ? new Date(filters.dateFrom) : null
  );
  const [localDateTo, setLocalDateTo] = useState(
    filters.dateTo ? new Date(filters.dateTo) : null
  );

  // Sync local state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalPrice(filters.price || "");
      setLocalDateFrom(filters.dateFrom ? new Date(filters.dateFrom) : null);
      setLocalDateTo(filters.dateTo ? new Date(filters.dateTo) : null);
    }
  }, [isOpen, filters]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const prices = ["0k - 500k", "500k - 1000k", "1000k - 2000k", "2000k+"];

  const togglePrice = (price) => {
    setLocalPrice((prev) => (prev === price ? "" : price));
  };

  const handleReset = () => {
    setLocalPrice("");
    setLocalDateFrom(null);
    setLocalDateTo(null);
  };

  const handleApply = () => {
    setFilters((prev) => ({
      ...prev,
      price: localPrice,
      dateFrom: localDateFrom ? localDateFrom.toISOString() : "",
      dateTo: localDateTo ? localDateTo.toISOString() : "",
    }));
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.subTitle}>Tinh chỉnh kết quả</p>
            <h2 className={styles.title}>Bộ lọc nâng cao</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <div className={styles.divider} />

        {/* Body */}
        <div className={styles.body}>
          {/* Price Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Khoảng giá</h3>
            <div className={styles.priceGrid}>
              {prices.map((price) => (
                <button
                  key={price}
                  type="button"
                  className={`${styles.priceOption} ${localPrice === price ? styles.priceOptionActive : ""}`}
                  onClick={() => togglePrice(price)}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Date Range Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Khoảng thời gian</h3>
            <div className={styles.dateRange}>
              <Calendar
                selected={localDateFrom}
                onSelect={setLocalDateFrom}
                label="Từ ngày"
              />
              <Calendar
                selected={localDateTo}
                onSelect={setLocalDateTo}
                label="Đến ngày"
              />
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={handleReset}
          >
            Xóa tất cả
          </button>

          <button
            type="button"
            className={styles.applyButton}
            onClick={handleApply}
          >
            Áp dụng bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
