import Image from "next/image";
import styles from "./profileSidebar.module.css"
import Link from "next/link";
export default function ProfileSidebar() {
    const menuItems = [
        {
            label: "Thông tin tài khoản",
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
    return (
        <div className={styles.profileSidebarContainer}>
            <div className={styles.userBox}>
                <div >
                    <Image
                        src="/image 22.svg"
                        alt="User"
                        width={50}
                        height={50}
                    />
                </div>

                <div className={styles.userNameBox}>
                    <span className={styles.title}>Tài khoản của</span>
                    <span className={styles.name}>Việt Nguyễn</span>
                </div>

            </div>

            <div className={styles.menuBox}>
                <Link className={styles.menuItem} href="/profile">
                    <Image
                        src="/user.svg"
                        alt="User"
                        width={30}
                        height={30}
                    />
                    <span className={styles.title}>Thông tin tài khoản</span>
                </Link>
                <Link className={styles.menuItem} href="/my-ticket">
                    <Image
                        src="/ticket.svg"
                        alt="Ticket"
                        width={30}
                        height={30}
                    />
                    <span className={styles.title}>Vé của tôi</span>
                </Link>
                <Link className={styles.menuItem} href="/cart">
                    <Image
                        src="/shopping-cart.svg"
                        alt="Cart"
                        width={30}
                        height={30}
                    />
                    <span className={styles.title}>Giỏ hàng</span>
                </Link>
                <Link className={styles.menuItem} href="/logout">
                    <Image
                        src="/logout.svg"
                        alt="Logout"
                        width={30}
                        height={30}
                    />
                    <span className={styles.title}>Đăng xuất</span>
                </Link>
            </div>
        </div >
    );
}