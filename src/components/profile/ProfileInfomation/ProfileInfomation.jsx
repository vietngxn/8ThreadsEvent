"use client";
import { useRef, useState, useEffect } from "react";
import GoldButton from "@/components/common/Button/GoldButton";
import styles from "./ProfileInfomation.module.css";
export default function ProfileInfomation() {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const [avatarSrc, setAvatarSrc] = useState("/image 22.svg");

    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (raw) {
            const user = JSON.parse(raw);
            if (user?.avatar) setAvatarSrc(user.avatar);
        }
    }, []);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview tạm thời ngay lập tức
        setAvatarSrc(URL.createObjectURL(file));

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            if (userId) formData.append("userId", userId);

            const res = await fetch("/api/upload/avatar", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload thất bại");

            const data = await res.json();
            setAvatarSrc(data.url);
            const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...existingUser,
                    avatar: data.url
                })
            );
        } catch (err) {
            console.error("Upload avatar lỗi:", err);
            alert("Không thể upload ảnh. Vui lòng thử lại.");
        } finally {
            setUploading(false);
        }
    };

    const [userName, setUserName] = useState("...");
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (raw) {
            const user = JSON.parse(raw);
            setUserName(user?.name || "Người dùng");
            setUserId(user?.userId || null);
            if (user?.avatar) setAvatarSrc(user.avatar);
        } else {
            window.location.href = "/page/login";
        }

    }, []);
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
                            disabled={uploading}
                        >
                            {uploading ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                                    <circle cx="12" cy="12" r="10" opacity="0.25" />
                                    <path d="M12 2a10 10 0 0 1 10 10" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            )}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <span className={styles.name}>{userName}</span>
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