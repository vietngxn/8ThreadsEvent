"use client";

import { useEffect, useState } from "react";
import ConcertCard from "@/components/Card/ConcertCard";
import Navbar from "@/components/common/Navbar/Navbar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import FilterBar from "@/components/FilterBar/FilterBar";
import FilterTags from "@/components/FilterTags/FilterTags";

export default function ConcertsPage() {
  const [events, setEvents] = useState([]);

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
    });
  }, []);

  const [filters, setFilters] = useState({
    city: "Thành phố Hồ Chí Minh",
    price: "0k - 500k",
    genre: "Rap",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(events.length / itemsPerPage);

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
              <FilterBar filters={filters} setFilters={setFilters} />
            </div>

            <div className="mt-3">
              <FilterTags filters={filters} setFilters={setFilters} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
              {currentEvents.map((event) => (
                <ConcertCard key={event._id} event={event} />
              ))}

              {events.length === 0 && (
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