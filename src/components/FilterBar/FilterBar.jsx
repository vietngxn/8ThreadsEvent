"use client";

import { useState } from "react";
import styles from "./FilterBar.module.css";
import { ChevronDown, ArrowUpDown, Funnel } from "lucide-react";

export default function FilterBar({
  filters,
  setFilters,
  options,
  sortBy,
  setSortBy,
}) {
  const [cityOpen, setCityOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const cities = options?.cities || [];

  const prices = ["0k - 500k", "500k - 1000k", "1000k - 2000k", "2000k+"];

  const genres = options?.genres || [];

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

  const selectPrice = (price) => {
    setFilters((prev) => ({
      ...prev,
      price,
    }));
  };

  const selectGenre = (genre) => {
    setFilters((prev) => ({
      ...prev,
      genre,
    }));
  };

  const resetAdvanced = () => {
    setFilters((prev) => ({
      ...prev,
      price: "",
      genre: "",
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterItem}>
        <button
          className={`${styles.button} ${cityOpen ? styles.buttonOpen : ""}`}
          onClick={() => setCityOpen(!cityOpen)}
          type="button"
        >
          {filters.city}
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
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterItem}>
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

      {/* Advanced Filter */}

      <div className={styles.filterItem}>
        <button
          className={`${styles.button} ${advancedOpen ? styles.buttonOpen : ""}`}
          onClick={() => setAdvancedOpen(!advancedOpen)}
          type="button"
        >
          <Funnel size={18} />
          Bộ lọc nâng cao
        </button>

        {advancedOpen && (
          <div className={styles.advanced}>
            <div className={styles.advancedHeader}>
              <div>
                <p className={styles.subTitle}>Tinh chỉnh kết quả</p>
                <h3 className={styles.title}>Bộ lọc nâng cao</h3>
              </div>

              <button
                className={styles.clearButton}
                onClick={resetAdvanced}
                type="button"
              >
                Xóa lọc
              </button>
            </div>

            <div className={styles.group}>
              <p>Giá</p>

              <div className={styles.optionGrid}>
                {prices.map((price) => (
                  <button
                    key={price}
                    className={`${styles.option} ${filters.price === price ? styles.optionActive : ""}`}
                    onClick={() => selectPrice(price)}
                    type="button"
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.group}>
              <p>Thể loại</p>

              <div className={styles.optionGrid}>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`${styles.option} ${filters.genre === genre ? styles.optionActive : ""}`}
                    onClick={() => selectGenre(genre)}
                    type="button"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={styles.applyButton}
              onClick={() => setAdvancedOpen(false)}
              type="button"
            >
              Áp dụng bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
