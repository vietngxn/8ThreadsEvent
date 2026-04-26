"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectSeatUI from "./SelectSeatUI";

export default function SelectSeatSmartPage() {
  const { id } = useParams();
  const [ticketTypes, setTicketTypes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const eventRes = await fetch(`/api/events/${id}`); 
        const eventData = await eventRes.json();

        if (!eventData || !eventData.eventId) {
          console.error("Không tìm thấy mã eventId tương ứng cho _id này!");
          setLoading(false);
          return;
        }

        const realEventId = eventData.eventId;
        console.log("Tìm thấy mã thực tế:", realEventId);

        const ticketRes = await fetch(`/api/ticketTypes?eventId=${realEventId}`);
        const ticketData = await ticketRes.json();

        setTicketTypes(ticketData);
      } catch (err) {
        console.error("Lỗi thông mạch dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "30vh", fontSize: "18px" }}>
        <p>Đang tải sơ đồ rạp...</p>
      </div>
    );
  }

  return <SelectSeatUI ticketTypes={ticketTypes} eventId={id} />;
}