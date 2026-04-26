"use client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileInfomation from "@/components/profile/ProfileInfomation/ProfileInfomation";
import styles from "../page/infomation/page.module.css";

export default function InformationPage() {
    return (
        <div className={styles.pageWrapper}>
            <aside className={styles.sidebar}>
                <ProfileSidebar />
            </aside>
            <main className={styles.content}>
                <ProfileInfomation />
            </main>
        </div>
    );
}
