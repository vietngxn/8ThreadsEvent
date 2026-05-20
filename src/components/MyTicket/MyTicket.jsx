"use client";

import { useState, useEffect } from "react";
import styles from "./MyTickets.module.css";
import CalendarIcon from "@/components/common/icons/CalendarIcon";
import PinIcon from "@/components/common/icons/PinIcon";
import TicketIcon from "@/components/common/icons/TicketIcon";

const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "valid", label: "Hợp lệ" },
    { key: "pending", label: "Chờ xử lý" },
    { key: "used", label: "Đã dùng" },
    { key: "invalid", label: "Không hợp lệ" },
];

const subTabs = [
    { key: "upcoming", label: "Sắp diễn ra" },
    { key: "ended", label: "Đã kết thúc" },
];

const STATUS_LABEL = {
    valid: "Hợp lệ",
    pending: "Chờ xử lý",
    used: "Đã dùng",
    invalid: "Không hợp lệ",
};

const STATUS_CLASS = {
    valid: styles.badgeValid,
    pending: styles.badgePending,
    used: styles.badgeUsed,
    invalid: styles.badgeInvalid,
};

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatPrice(price) {
    if (price == null) return "—";
    return price === 0
        ? "Miễn phí"
        : price.toLocaleString("vi-VN") + " ₫";
}

export default function MyTickets() {
    const [activeTab, setActiveTab] = useState("all");
    const [activeSubTab, setActiveSubTab] = useState("upcoming");
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const STATUS_CLASS = {
        success: styles.badgeSuccess,
        pending: styles.badgePending,
        cancelled: styles.badgeCancelled,
    };
    useEffect(() => {
        async function fetchTickets() {
            try {
                setLoading(true);
                setError(null);
                const userRaw = localStorage.getItem("user");
                if (!userRaw) {
                    setError("Bạn chưa đăng nhập.");
                    return;
                }
                const user = JSON.parse(userRaw);
                const ownerId = user?.userId;
                if (!ownerId) {
                    setError("Không tìm thấy thông tin người dùng.");
                    return;
                }

                const res = await fetch("/api/tickets/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ownerId }),
                });

                if (!res.ok) throw new Error("Không thể tải vé.");
                const data = await res.json();
                setTickets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTickets();
    }, []);

    const now = new Date();

const filteredTickets = tickets.filter((ticket) => {

    const sameStatus =
        activeTab === "all" ||
        ticket.status === activeTab;

    const endTime = ticket.event?.time?.event?.end;
    const isUpcoming =
        endTime
            ? new Date(endTime) > now
            : true;

    const sameTimeType =
        activeSubTab === "upcoming"
            ? isUpcoming
            : !isUpcoming;

    return sameStatus && sameTimeType;
});

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Vé của tôi</h1>

                {/* Status tabs */}
                <div className={styles.statusTabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`${styles.statusTab} ${activeTab === tab.key ? styles.statusTabActive : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Sub tabs */}
                <div className={styles.subTabs}>
                    {subTabs.map((sub) => (
                        <button
                            key={sub.key}
                            className={`${styles.subTab} ${activeSubTab === sub.key ? styles.subTabActive : ""}`}
                            onClick={() => setActiveSubTab(sub.key)}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {loading ? (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner} />
                            <p>Đang tải vé...</p>
                        </div>
                    ) : error ? (
                        <div className={styles.emptyState}>
                            <p className={styles.emptyText}>{error}</p>
                        </div>
                    ) : filteredTickets.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.illustrationWrap}>
                                <img src="/doraemon.png" alt="" />
                            </div>
                            <p className={styles.emptyText}>Bạn chưa có vé nào</p>
                            <button onClick={() => { window.location.href = "/page/concerts" }} className={styles.buyBtn}>Mua vé ngay</button>
                        </div>
                    ) : (
                        <div className={styles.ticketGrid}>
                            {filteredTickets.map((ticket) => (
                                <div key={ticket.ticketId} className={styles.ticketCard}>
                                    {ticket.event?.img && (
                                        <div className={styles.cardImg}>
                                            <img
                                                src={ticket.event.img}
                                                alt={ticket.event.name}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.cardBody}>
                                        <span className={`${styles.badge} ${STATUS_CLASS[ticket.status] || ""}`}>
                                            {STATUS_LABEL[ticket.status] || ticket.status}
                                        </span>

                                        <h3 className={styles.cardTitle}>
                                            {ticket.event?.name || "Sự kiện không xác định"}
                                        </h3>

                                        <p className={styles.cardType}>
                                            <TicketIcon size={14} /> {ticket.ticketType?.name || ticket.ticketTypeId}
                                            {ticket.ticketType?.price != null && (
                                                <span className={styles.cardPrice}>
                                                    · {formatPrice(ticket.ticketType.price)}
                                                </span>
                                            )}
                                        </p>

                                        <div className={styles.cardMeta}>
                                            <span><CalendarIcon size={14} /> {formatDate(ticket.event?.time?.event?.start)}</span>
                                            {ticket.event?.venue?.name && (
                                                <span><PinIcon size={14} /> {ticket.event.venue.name}{ticket.event.venue.city ? `, ${ticket.event.venue.city}` : ""}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.qrWrap}>
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(ticket.qrCode)}`}
                                            alt="QR Code"
                                            className={styles.qrImg}
                                        />
                                        <span className={styles.ticketIdText}>#{ticket.ticketId}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
