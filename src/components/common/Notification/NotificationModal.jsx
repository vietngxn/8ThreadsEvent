"use client";
import styles from "./SuccessModel.module.css"; 
import { X } from "lucide-react"; // 🚀 Import Icon dấu X

export default function NotificationModal({ isOpen, type, message, subMessage, onConfirm, buttonText, onClose }) {
    if (!isOpen) return null;

    // Tự động chọn icon dựa trên type
    const iconSrc = type === "success" ? "/check-circle.svg" : "/bell.svg";

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            {/* Thêm e.stopPropagation() để không bị đóng khi click vào bên trong Modal */}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                
                {/* 🚀 NÚT THOÁT ĐẶT Ở GÓC PHẢI */}
                {onClose && (
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                )}

                <div className={styles.modalBody}>
                    <h2 className={styles.modalTitle}>Thông báo</h2>

                    <div className={styles.plainIconContainer}>
                        <img
                            src={iconSrc}
                            alt="icon"
                            width={80}
                            height={80}
                        />
                    </div>

                    <div className={styles.modalMessage}>
                        <p>{message}</p>
                        {subMessage && <p>{subMessage}</p>}
                    </div>

                    <button onClick={onConfirm} className={styles.confirmButton}>
                        <span className={styles.gradientText}>{buttonText || "Xác nhận"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}