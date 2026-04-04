"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const menuItems = [
        {
            label: "Vé của tôi",
            icon: "/ticket.svg",
            path: "/tickets",
        },
        {
            label: "Giỏ hàng",
            icon: "/shopping-cart.svg",
            path: "/cart",
        },
        {
            label: "Tài khoản",
            icon: "/user.svg",
            path: "/profile",
        },
        {
            label: "Đăng xuất",
            icon: "/logout.svg",
            action: "logout",
        },
    ];

    const handleAction = (item) => {
        if (item.action === "logout") {
            localStorage.removeItem("token");
            router.push("/login");
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
                    <Link href="/buy-ticket" className={styles.link}>Mua vé</Link>
                    <Link href="/products" className={styles.link}>Sản phẩm</Link>
                </div>

                <div className={styles.userSection}>
                    <button onClick={() => setIsOpen(!isOpen)} className={styles.userButton}>
                        <div className={styles.avatar}>
                            <Image
                                src="/image 22.svg"
                                alt="User"
                                fill
                            />
                        </div>
                        <span className={styles.username}>Việt Nguyễn</span>
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
                                        <Image src={item.icon} alt={item.label} width={25} height={25} />
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
