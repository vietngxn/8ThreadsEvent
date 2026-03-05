"use client";

import { useState } from "react";
import styles from "./SuccessModel.module.css";

export default function SuccessModel() {
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modalContent} onClick={ (e) => e.stopPropagation() }>

            <div className={styles.modalBody}>
                <h2 className={styles.modalTitle}>Thông báo</h2>

                <div className={styles.checkIconContainer}>
                    <svg
                    className={styles.checkIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                    </svg>
                </div>

                <p className={styles.modalMessage}>Đặt vé thành công</p>
                
                <button onClick={closeModal} className={styles.confirmButton}>
                    <span className={styles.gradientText}>Xác nhận</span>
                </button>

                </div>
            </div>
        </div>
    );
}