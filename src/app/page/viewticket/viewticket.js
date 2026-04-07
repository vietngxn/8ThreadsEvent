"use client";
import ConcertEventCard from "@/components/Card/ConcertEventCard";
import ConcertDetail from "@/components/Card/ConCertDetail";
import BackButton from "@/components/common/Button/BackButton";
import styles from "./ViewTicket.module.css";

export default function ViewTicketPage({ event }) {
    return (
        <div className={styles.pageContainer}>

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