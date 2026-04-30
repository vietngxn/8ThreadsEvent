"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userData } from "three/src/nodes/accessors/UserDataNode";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const router = useRouter();
    const { user, isLoggedIn, logout, loading } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    if (loading) return null;

    const menuItems = [
        {
            label: "Vé của tôi",
            icon: "/ticket.svg",
            path: "/my-ticket",
        },
        {
            label: "Lịch sử mua vé",
            icon: "history",
            path: "/payment-history",
        },
        {
            label: "Giỏ hàng",
            icon: "/shopping-cart.svg"
        },
        {
            label: "Tài khoản",
            icon: "/user.svg",
            path: "/infomation",
        },
        {
            label: "Đăng xuất",
            icon: "/logout.svg",
            action: "logout",
        },
    ];

    const handleAction = (item) => {
        if (item.action === "logout") {
            logout();
            router.push("/page/login");
            return;
        }

        if (item.path) {
            router.push(item.path);
        }

        setIsOpen(false);
    };

    return (
        <nav className={styles.navbar}>

            <div className={styles.logo}>
                <Image
                    src="/assets/images/logo.png"
                    alt="8Threads Logo"
                    width={120}
                    height={40}
                />
            </div>

            <div className={styles.rightSide}>
                <div className={styles.menu}>
                    <Link href="/" className={styles.link}>Trang chủ</Link>
                    <Link href="/page/concerts" className={styles.link}>
                        Mua vé
                    </Link>
                    <Link href="/products" className={styles.link}>Sản phẩm</Link>
                </div>

                <div className={styles.userSection}>
                    {!isLoggedIn ? (
                        <button
                            className={styles.loginButton}
                            onClick={() => router.push("/page/login")}
                        >
                            Đăng nhập
                        </button>
                    ) : (
                        <>
                            <button onClick={() => setIsOpen(!isOpen)} className={styles.userButton}>
                                <div className={styles.avatar}>
                                    <img
                                        src={user?.avatar || "/image 22.svg"}
                                        alt="User"
                                    />
                                </div>
                                <span className={styles.username}>
                                    {user?.name || "User"}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
                                />
                            </button>

                            {isOpen && (
                                <>
                                    <div className={styles.overlay} onClick={() => setIsOpen(false)} />

                                    <div className={styles.dropdown}>
                                        {menuItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className={styles.dropdownItem}
                                                onClick={() => handleAction(item)}
                                            >
                                                {item.icon === "history" ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M12 8v4l2 2" />
                                                        <path d="M3.05 11a9 9 0 1 1 .5 4M3 21v-5h5" />
                                                    </svg>
                                                ) : (
                                                    <Image src={item.icon} alt={item.label} width={25} height={25} />
                                                )}
                                                <span>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
