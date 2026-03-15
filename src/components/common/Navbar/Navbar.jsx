"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

const menuItems = [
    {
        label: "Vé của tôi",
        icon: <Image src="/ticket.svg" alt="ticket" width={25} height={25} />,
        href: "#",
    },
    {
        label: "Giỏ hàng",
        icon: <Image src="/shopping-cart.svg" alt="cart" width={25} height={25} />,
        href: "#",
    },
    {
        label: "Tài khoản",
        icon: <Image src="/user.svg" alt="user" width={25} height={25} />,
        href: "#",
    },
    {
        label: "Đăng xuất",
        icon: <Image src="/logout.svg" alt="logout" width={25} height={25} />,
        href: "#",
    },
];


    return (
        <nav className={styles.navbar}>
        
            <div className={styles.logo}>
                <Image
                    src="/assets/images/logo.png"
                    alt="8Threads Logo"
                    width={150}
                    height={80}
                />
            </div>

            <div className={styles.rightSide}>
                <div className={styles.menu}>
                    <Link href="#" className={styles.link}>Trang chủ</Link>
                    <Link href="#" className={styles.link}>Mua vé</Link>
                    <Link href="#" className={styles.link}>Sản phẩm</Link>
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
                                <Link key={index} href={item.href} className={`${styles.dropdownItem}`} onClick={() => setIsOpen(false)} >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
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
