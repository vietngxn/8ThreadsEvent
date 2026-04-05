"use client";
import { useEffect, useState } from "react";
import ViewTicketPage from "./viewticket";

export default function ViewTicketPageTest() {
    const [combinedData, setCombinedData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [resEvents, resTypes] = await Promise.all([
                    fetch("/assets/data/events.json"),
                    fetch("/assets/data/ticket_types.json")
                ]);

                const events = await resEvents.json();
                const ticketTypes = await resTypes.json();

                //VD: Tìm thông tin event e003
                const event = events.find(item => item.eventId === "e003");

                //Tìm giá thấp nhất từ bảng ticketTypes cho event e003
                const eventTypes = ticketTypes.filter(type => type.eventId === "e003");
                
                //Lấy giá nhỏ nhất (giá từ...)
                const minPrice = eventTypes.length > 0 
                    ? Math.min(...eventTypes.map(t => t.price)) 
                    : null;

                if (event) {
                    setCombinedData({
                        ...event,
                        price: minPrice
                    });
                }
            } catch (err) {
                console.error("Lỗi fetch dữ liệu:", err);
            }
        };

        loadData();
    }, []);

    if (!combinedData) return <div style={{color: 'white', padding: '50px'}}>Đang tải dữ liệu...</div>;

    return <ViewTicketPage event={combinedData} />;
}