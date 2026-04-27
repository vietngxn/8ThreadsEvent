import styles from "../page/infomation/page.module.css";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import PaymentHistory from "@/components/paymentHistory/PaymentHistory";

export default function PaymentHistoryPage() {
    return (
        <div className={styles.pageWrapper}>
            <aside className={styles.sidebar}>
                <ProfileSidebar />
            </aside>
            <main className={styles.content}>
                <PaymentHistory />
            </main>
        </div>
    );
}