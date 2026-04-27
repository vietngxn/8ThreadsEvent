"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./profileSidebar.module.css"
import Link from "next/link";

export default function ProfileSidebar() {
    const [userName, setUserName] = useState("...");

    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (raw) {
            const user = JSON.parse(raw);
            setUserName(user?.name || "Người dùng");
            console.log("User:", user)
        } else {
            window.location.href = "/page/login";
        }

    }, []);
    const [avatarSrc, setAvatarSrc] = useState("/image 22.svg");

    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (raw) {
            const user = JSON.parse(raw);
            if (user?.avatar) setAvatarSrc(user.avatar);
        }
    }, []);
    return (
        <div className={styles.profileSidebarContainer}>
            <div className={styles.userBox}>
                <div>
                    <img
                        src={avatarSrc}
                        alt="User"
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                </div>

                <div className={styles.userNameBox}>
                    <span className={styles.title}>Tài khoản của</span>
                    <span className={styles.name}>{userName}</span>
                </div>
            </div>

            <div className={styles.menuBox}>
                <Link className={styles.menuItem} href="/infomation">
                    <Image src="/user.svg" alt="User" width={30} height={30} />
                    <span className={styles.title}>Thông tin tài khoản</span>
                </Link>
                <Link className={styles.menuItem} href="/my-ticket">
                    <Image src="/ticket.svg" alt="Ticket" width={30} height={30} />
                    <span className={styles.title}>Vé của tôi</span>
                </Link>
                <Link className={styles.menuItem} href="/payment-history">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-history">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 8l0 4l2 2" />
                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <span className={styles.title}>Lịch sử mua vé</span>
                </Link>
                <Link className={styles.menuItem} href="#">
                    <Image src="/shopping-cart.svg" alt="Cart" width={30} height={30} />
                    <span className={styles.title}>Giỏ hàng</span>
                </Link>
                <Link className={styles.menuItem} href="#" onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/page/login";
                }}>
                    <Image src="/logout.svg" alt="Logout" width={30} height={30} />
                    <span className={styles.title}>Đăng xuất</span>
                </Link>
            </div>
        </div>
    );
}
