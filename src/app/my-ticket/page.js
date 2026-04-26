"use client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import MyTickets from "@/components/MyTicket/MyTicket";
import styles from "../page/infomation/page.module.css";

export default function MyTicketPage() {
    return (
        <div className={styles.pageWrapper}>
            <aside className={styles.sidebar}>
                <ProfileSidebar />
            </aside>
            <main className={styles.content}>
                <MyTickets />
            </main>
        </div>
    );
}
