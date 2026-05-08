"use client";

import { useEffect, useState } from "react";
import ConcertCard from "@/components/Card/ConcertCard";
import Navbar from "@/components/common/Navbar/Navbar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import FilterBar from "@/components/FilterBar/FilterBar";
import FilterTags from "@/components/FilterTags/FilterTags";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConcertsPage() {
  const [events, setEvents] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    Promise.all([
      fetch("/api/events").then(res => res.json()),
      fetch("/api/ticketTypes").then(res => res.json())
    ]).then(([eventsData, ticketsData]) => {

      const ticketMap = {};

      ticketsData.forEach(t => {
        if (!t.isActive) return;
        if (!ticketMap[t.eventId]) ticketMap[t.eventId] = [];
        ticketMap[t.eventId].push(Number(t.price));
      });

      const eventsWithPrice = eventsData.map(event => ({
        ...event,
        minPrice: ticketMap[event.eventId]
          ? Math.min(...ticketMap[event.eventId])
          : 0
      }));

      setEvents(eventsWithPrice);

      const cities = [
        "All",
        ...new Set(
          eventsData
            .map((event) => event.venue?.city)
            .filter(Boolean)
        ),
      ];

      const genres = [
        "All",
        ...new Set(
          eventsData
            .map((event) => event.categoryId)
            .filter(Boolean)
        ),
      ];

      setFilterOptions({
        cities,
        genres,
      });
    });
  }, []);

  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    genres: [],
  });

  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "All",
    price: searchParams.get("price") || "",
    genre: searchParams.get("genre") || "All",
  });

  const [sortBy, setSortBy] = useState("date-nearest");

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.city && filters.city !== "All") {
      params.set("city", filters.city);
    }

    if (filters.genre && filters.genre !== "All") {
      params.set("genre", filters.genre);
    }

    if (filters.price) {
      params.set("price", filters.price);
    }

    if (sortBy) {
      params.set("sort", sortBy);
    }

    router.push(`/page/concerts?${params.toString()}`);
  }, [filters, sortBy, router]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredEvents = events.filter((event) => {
    const matchCity =
      filters.city === "All" ||
      event.venue?.city === filters.city;

    const matchGenre =
      filters.genre === "All" ||
      event.categoryId === filters.genre;

    const matchPrice =
      filters.price === "" ||
      (filters.price === "0k - 500k" &&
        event.minPrice <= 500000) ||
      (filters.price === "500k - 1000k" &&
        event.minPrice > 500000 &&
        event.minPrice <= 1000000) ||
      (filters.price === "1000k - 2000k" &&
        event.minPrice > 1000000 &&
        event.minPrice <= 2000000) ||
      (filters.price === "2000k+" &&
        event.minPrice > 2000000);

    return matchCity && matchGenre && matchPrice;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "price-desc") {
      return b.minPrice - a.minPrice;
    }

    if (sortBy === "price-asc") {
      return a.minPrice - b.minPrice;
    }

    if (sortBy === "date-nearest") {
      return (
        new Date(a.time?.event?.start).getTime() -
        new Date(b.time?.event?.start).getTime()
      );
    }

    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentEvents = sortedEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(
    sortedEvents.length / itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "var(--background-image)" }}
    >
      <div className="relative z-10">

        <div className="max-w-[2000px] mx-auto pt-[calc(var(--navbar-height)*1.5)]">
          <div className="w-full px-30">

            <div className="flex items-center gap-8">
              <div className="flex-1">
                <SearchBar />
              </div>
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                options={filterOptions}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            <div className="mt-3">
              <FilterTags filters={filters} setFilters={setFilters} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
              {currentEvents.map((event) => (
                <ConcertCard key={event._id} event={event} />
              ))}

              {filteredEvents.length === 0 && (
                <p className="text-white text-center col-span-full drop-shadow-lg">
                  Không có concert nào
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded transition ${currentPage === i + 1
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20"
                >
                  →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}