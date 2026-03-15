"use client";

import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

export default function BackButton({ label = "Trở về" }) {
  const router = useRouter();

  return (
    <button className={styles.backButton} onClick={() => router.back()}>
      <span className={styles.icon}>←</span>
      <span className={styles.text}>{label}</span>
    </button>
  );
}
