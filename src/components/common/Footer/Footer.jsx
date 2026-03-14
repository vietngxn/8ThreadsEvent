import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
    const members = [
        { name: "Nguyễn Bá Việt", id: "23687551" },
        { name: "Cao Quốc Trung", id: "23666911" },
        { name: "Nguyễn Văn Trọng", id: "23728381" },
        { name: "Nguyễn Phương Toàn", id: "23696881" },
        { name: "Ừng Thị Thanh Trúc", id: "23696821" },
    ];

    const sources = [
        { label: "Figma", href: "https://www.figma.com/design/u4TyPvk7SxJOGuAVWhLjhD/8ThreadsEvent?node-id=56-1217&t=UT2qAzOMvC7XzlgN-0" },
        { label: "Github", href: "https://github.com/vietngxn/8ThreadsEvent" },
        { label: "Google Drive", href: "https://drive.google.com/drive/folders/1oI2gADvAV66FCnm4KqX7MKgr0niUPMr0" },
    ];

    const socials = [
        { label: "Facebook", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Zalo", href: "#" },
    ];

    return (
        <footer className={styles.footer}>
        <div className={styles.topSection}>
            
            {/* 1 */}
            <div>
            <h3 className={styles.title}>Nhóm 9 - PTGDUD</h3>
            <ul className={styles.list}>
                {members.map((member, index) => (
                <li key={index}>
                    {member.name} – {member.id}
                </li>
                ))}
            </ul>
            </div>

            {/* 2 */}
            <div className={styles.centerColumn}>
            <h3 className={styles.title}>Source</h3>
            <ul className={styles.list}>
                {sources.map((item, index) => (
                <li key={index}>
                    <Link href={item.href} className={styles.link}>
                    {item.label}
                    </Link>
                </li>
                ))}
            </ul>
            </div>

            {/* 3 */}
            <div className={styles.rightColumn}>
            <h3 className={styles.title}>Follow Us</h3>
            <ul className={styles.list}>
                {socials.map((social, index) => (
                <li key={index}>
                    <Link href={social.href} className={styles.link}>
                    {social.label}
                    </Link>
                </li>
                ))}
            </ul>
            </div>

        </div>

        <div className={styles.bottomSection}>
            <div className={styles.logoWrapper}>
            <Image
                src="/assets/images/logo.png"
                alt="8Threads Logo"
                fill
                className={styles.logo}
            />
            </div>
        </div>
        </footer>
    );
};

export default Footer;