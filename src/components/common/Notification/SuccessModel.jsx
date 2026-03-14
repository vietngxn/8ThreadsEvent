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

                <div className={styles.plainIconContainer}>
                    <img
                        src="/check-circle.svg"
                        alt="bell"
                        width={80}
                        height={80}
                    />
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