"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./FilterBar.module.css";
import { ChevronDown, ArrowUpDown, Funnel } from "lucide-react";
import FilterModal from "@/components/FilterModal/FilterModal";

export default function FilterBar({
  filters,
  setFilters,
  options,
  sortBy,
  setSortBy,
}) {
  const [cityOpen, setCityOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const cityRef = useRef(null);
  const sortRef = useRef(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cities = options?.cities || [];

  const sortOptions = [
    {
      label: "Giá cao đến thấp",
      value: "price-desc",
    },
    {
      label: "Giá thấp đến cao",
      value: "price-asc",
    },
    {
      label: "Ngày gần nhất",
      value: "date-nearest",
    },
  ];

  const selectCity = (city) => {
    setFilters((prev) => ({
      ...prev,
      city,
    }));
    setCityOpen(false);
  };

  // Check if any advanced filter is active
  const hasAdvancedFilters =
    filters.price ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className={styles.wrapper}>
      {/* City Dropdown */}
      <div className={styles.filterItem} ref={cityRef}>
        <button
          className={`${styles.button} ${cityOpen ? styles.buttonOpen : ""}`}
          onClick={() => setCityOpen(!cityOpen)}
          type="button"
        >
          {filters.city === "All" ? "Thành phố" : filters.city}
          <ChevronDown
            size={18}
            className={cityOpen ? styles.iconRotated : ""}
          />
        </button>

        {cityOpen && (
          <div className={styles.dropdown}>
            {cities.map((city) => (
              <button
                key={city}
                className={`${styles.option} ${filters.city === city ? styles.optionActive : ""}`}
                onClick={() => selectCity(city)}
                type="button"
              >
                {city === "All" ? "Tất cả" : city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className={styles.filterItem} ref={sortRef}>
        <button
          className={`${styles.button} ${sortOpen ? styles.buttonOpen : ""}`}
          onClick={() => setSortOpen(!sortOpen)}
          type="button"
        >
          <ArrowUpDown size={18} />
          Sắp xếp
          <ChevronDown
            size={18}
            className={sortOpen ? styles.iconRotated : ""}
          />
        </button>

        {sortOpen && (
          <div className={styles.dropdown}>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.option} ${sortBy === option.value ? styles.optionActive : ""
                  }`}
                onClick={() => {
                  setSortBy(option.value);
                  setSortOpen(false);
                }}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filter Button → Opens Modal */}
      <div className={styles.filterItem}>
        <button
          className={`${styles.button} ${hasAdvancedFilters ? styles.buttonActive : ""}`}
          onClick={() => setModalOpen(true)}
          type="button"
        >
          <Funnel size={15} />
          Bộ lọc nâng cao
          {hasAdvancedFilters && (
            <span className={styles.badge}>●</span>
          )}
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
