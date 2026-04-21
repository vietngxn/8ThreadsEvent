import Image from "next/image";
import styles from "./profileSidebar.module.css"
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
        <div>
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
                <div className={styles.menuItem}>
                    <Image
                        src="/image 22.svg"
                        alt="User"
                        width={50}
                        height={50}
                    />
                    <span>Thông tin cá nhân</span>
                </div>
            </div>
        </div >
    );
}