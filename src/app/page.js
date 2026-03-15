"use client";

import { useState } from "react";
import FilterBar from "./concerts/components/FilterBar/FilterBar";
import FilterTags from "./concerts/components/FilterTags/FilterTags";

export default function Home() {
  const [filters, setFilters] = useState({
    city: null,
    price: null,
    genre: null,
  });

  return (
    <div className="min-h-screen bg-black px-6 py-10 font-sans text-white">
      <FilterBar filters={filters} setFilters={setFilters} />
      <FilterTags filters={filters} setFilters={setFilters} />
    </div>
  );
}
