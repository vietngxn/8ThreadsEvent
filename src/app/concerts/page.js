"use client";

import { useState } from "react";

import FilterBar from "./components/FilterBar/FilterBar";
import FilterTags from "./components/FilterTags/FilterTags";

export default function ConcertsPage() {
  const [filters, setFilters] = useState({
    city: null,
    price: null,
    genre: null,
  });

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#000" }}>
      <FilterBar filters={filters} setFilters={setFilters} />
      <FilterTags filters={filters} setFilters={setFilters} />
    </div>
  );
}
