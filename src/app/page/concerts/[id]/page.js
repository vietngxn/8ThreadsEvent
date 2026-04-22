"use client";

import { useEffect, useState, use } from "react";
import ConcertDetail from "@/components/Card/ConCertDetail";

export default function ConcertDetailPage({ params }) {
  const { id } = use(params);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <ConcertDetail data={data} />
    </div>
  );
}