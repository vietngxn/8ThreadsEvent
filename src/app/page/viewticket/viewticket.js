"use client";

import { useRef, useCallback } from "react";
import ConcertEventCard from "@/components/Card/ConcertEventCard";
import ConcertDetail from "@/components/Card/ConCertDetail";
import BackButton from "@/components/common/Button/BackButton";
import styles from "./ViewTicket.module.css";

export default function ViewTicketPage({ event }) {
    const containerRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        containerRef.current?.style.setProperty(
            "--mx",
            `${e.clientX - rect.left}px`
        );

        containerRef.current?.style.setProperty(
            "--my",
            `${e.clientY - rect.top}px`
        );
    }, []);

    const handleMouseLeave = useCallback(() => {
        containerRef.current?.style.setProperty("--mx", "-9999px");
        containerRef.current?.style.setProperty("--my", "-9999px");
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.pageContainer}
            style={{ "--mx": "-9999px", "--my": "-9999px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.navigation}>
                <BackButton label="Trở về" />
            </div>

            <section className={styles.section}>
                <ConcertEventCard data={event} />
            </section>

            <div className={styles.detailSection}>
                <ConcertDetail data={event} />
            </div>
        </div>
    );
}