"use client";
import { useRef, useState } from "react";
import GoldButton from "@/components/common/Button/GoldButton";
import styles from "./ProfileInfomation.module.css";
export default function ProfileInfomation() {
    const fileInputRef = useRef(null);
    const [avatarSrc, setAvatarSrc] = useState("/image 22.svg");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarSrc(url);
        }
    };
    return (
        <div>
            <span className={styles.title}>Thông tin tài khoản</span>
            <div className={styles.profileContainer}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarWrapper}>
                        <img className={styles.avatar} src={avatarSrc} alt="avatar" />
                        <button
                            className={styles.editAvatarBtn}
                            onClick={() => fileInputRef.current.click()}
                            title="Thay đổi ảnh đại diện"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <span className={styles.name}>Việt Nguyễn</span>
                </div>
                <div className={styles.formContainer}>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <input className={styles.input} type="text" placeholder="Họ tên đệm" />
                        <input className={styles.input} type="text" placeholder="Tên" />
                    </div>
                    <div>
                        <input className={styles.input} type="text" placeholder="Số điện thoại" />
                    </div>
                    <div>
                        <input className={styles.input} type="text" placeholder="Email" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <GoldButton>CẬP NHẬT</GoldButton>
                    </div>
                </div>

            </div>
            <span className={styles.title}>Đổi mật khẩu</span>
            <div className={styles.profileContainer}>
                <div className={styles.formContainer}>

                    <div>
                        <input className={styles.input} type="text" placeholder="Mật khẩu cũ" />
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <input className={styles.input} type="text" placeholder="Mật khẩu mới" />
                        <input className={styles.input} type="text" placeholder="Xác nhận mật khẩu mới" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <GoldButton>ĐỔI MẬT KHẨU</GoldButton>
                    </div>
                </div>

            </div>
        </div>
    )
}