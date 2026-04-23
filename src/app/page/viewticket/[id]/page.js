"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ViewTicketPage from "../viewticket";

export default function Page() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`/api/events/${id}`)
        .then(res => res.json())
        .then(data => setEvent(data));
    }, [id]);

    if (!event)
        return <div style={{ color: "white", padding: 50 }}>Đang tải...</div>;

    return <ViewTicketPage event={event} />;
}