"use client";

import { useState } from "react";
import styles from "./SuccessModel.module.css"; 

export default function TicketHoldExpired() {
    const [isOpen, setIsOpen] = useState(true);
    
    const closeModal = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalBody}>
                    <h2 className={styles.modalTitle}>Thông báo</h2>

                    <div className={styles.plainIconContainer}>
                        <img
                            src="/bell.svg"
                            alt="bell"
                            width={80}
                            height={80}
                        />
                    </div>

                    <div className={styles.modalMessage}>
                        <p style={{ margin: 0 }}>Đã hết thời gian giữ vé.</p>
                        <p style={{ margin: 0 }}>Vui lòng đặt lại vé mới</p>
                    </div>

                    <button onClick={closeModal} className={styles.confirmButton}>
                        <span className={styles.gradientText}>Đặt vé khác</span>
                    </button>
                </div>
            </div>
        </div>
    );
}