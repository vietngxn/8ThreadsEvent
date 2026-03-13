"use client";

import { useState } from "react";
// Đảm bảo file CSS của bạn được cập nhật class .plainIconContainer
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

                    {/* Class mới không có viền tròn, chỉ căn giữa */}
                    <div className={styles.plainIconContainer}>
                        {/* SVG cái chuông mới: Nét đậm hơn, giống mẫu hơn */}
                        <svg
                            className={styles.plainBellIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2} // Tăng strokeWidth để nét đậm hơn
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" 
                            />
                        </svg>
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