"use client";

import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";
import clsx from "clsx";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Tìm kiếm",
  className,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
      />

      <button className={styles.searchButton} onClick={onSearch} type="button">
        <Search size={18} />
      </button>
    </div>
  );
}
