"use client";
import styles from "./ErrorPopup.module.css";

/**
 * ErrorPopup - Hiển thị popup lỗi đẹp, hợp với giao diện tối/vàng.
 *
 * Props:
 *   message  {string}   - Nội dung lỗi cần hiển thị
 *   title    {string}   - Tiêu đề popup (mặc định: "Đã xảy ra lỗi")
 *   onClose  {function} - Callback khi đóng popup
 */
export default function ErrorPopup({ message, title = "Đã xảy ra lỗi", onClose }) {
    if (!message) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* Ngăn click bên trong đóng popup */}
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>

                {/* Icon cảnh báo */}
                <div className={styles.iconWrapper}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>

                <p className={styles.title}>{title}</p>

                <div className={styles.divider} />

                <p className={styles.message}>{message}</p>

                <button className={styles.closeBtn} onClick={onClose}>
                    ĐÓNG
                </button>
            </div>
        </div>
    );
}
