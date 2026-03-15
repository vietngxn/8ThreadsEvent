"use client";

import { useState } from "react";

import FilterBar from "../../components/FilterBar/FilterBar";
import FilterTags from "../../components/FilterTags/FilterTags";

export default function ConcertsPage() {
  const [filters, setFilters] = useState({
    city: null,
    price: null,
  });

  return (
    <div style={{ padding: "40px" }}>
      {/* Filter Buttons */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Selected Filters */}
      <FilterTags filters={filters} setFilters={setFilters} />

      {/* Concert List */}
    </div>
  );
}
