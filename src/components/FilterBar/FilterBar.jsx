"use client";

import { useState } from "react";
import styles from "./FilterBar.module.css";
import { ChevronDown, ArrowUpDown, Funnel } from "lucide-react";

export default function FilterBar({ filters, setFilters }) {
  const [cityOpen, setCityOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const cities = ["TP HCM", "Hà Nội", "Đà Nẵng", "Nha Trang", "Cần Thơ"];

  const prices = ["0k - 500k", "500k - 1000k", "1000k - 2000k", "2000k+"];

  const genres = ["Rap", "Pop", "EDM", "Indie"];

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

  return (
    <div className={styles.wrapper}>
      {/* City Filter */}

      <div className={styles.filterItem}>
        <button
          className={styles.button}
          onClick={() => setCityOpen(!cityOpen)}
        >
          Thành phố Hồ Chí Minh
          <ChevronDown size={18} />
        </button>

        {cityOpen && (
          <div className={styles.dropdown}>
            {cities.map((city) => (
              <div
                key={city}
                className={styles.option}
                onClick={() => selectCity(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}

      <button className={styles.button}>
        <ArrowUpDown size={18} />
        Sắp xếp
      </button>

      {/* Advanced Filter */}

      <div className={styles.filterItem}>
        <button
          className={styles.button}
          onClick={() => setAdvancedOpen(!advancedOpen)}
        >
          <Funnel size={18} />
          Bộ lọc nâng cao
        </button>

        {advancedOpen && (
          <div className={styles.advanced}>
            <div className={styles.group}>
              <p>Giá</p>

              {prices.map((price) => (
                <div
                  key={price}
                  className={styles.option}
                  onClick={() => selectPrice(price)}
                >
                  {price}
                </div>
              ))}
            </div>

            <div className={styles.group}>
              <p>Thể loại</p>

              {genres.map((genre) => (
                <div
                  key={genre}
                  className={styles.option}
                  onClick={() => selectGenre(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
