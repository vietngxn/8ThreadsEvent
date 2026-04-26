"use client";
import styles from "./SuccessModel.module.css"; 

export default function NotificationModal({ isOpen, type, message, subMessage, onConfirm, buttonText }) {
    if (!isOpen) return null;

    const iconSrc = type === "success" ? "/check-circle.svg" : "/bell.svg";

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
                        <p style={{ margin: 0 }}>{message}</p>
                        {subMessage && <p style={{ margin: 0 }}>{subMessage}</p>}
                    </div>

                    <button onClick={onConfirm} className={styles.confirmButton}>
                        <span className={styles.gradientText}>{buttonText || "Xác nhận"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}