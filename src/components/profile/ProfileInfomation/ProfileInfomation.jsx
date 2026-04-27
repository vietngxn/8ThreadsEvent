"use client";
import { useRef, useState, useEffect } from "react";
import GoldButton from "@/components/common/Button/GoldButton";
import ErrorPopup from "@/components/common/ErrorPopup/ErrorPopup";
import styles from "./ProfileInfomation.module.css";
export default function ProfileInfomation() {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [errorPopup, setErrorPopup] = useState({ show: false, title: "", message: "" });

    const showError = (message, title = "Đã xảy ra lỗi") => {
        setErrorPopup({ show: true, title, message });
    };
    const closeError = () => setErrorPopup({ show: false, title: "", message: "" });

    const [avatarSrc, setAvatarSrc] = useState("/image 22.svg");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });
    const [defaultData, setDefaultData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const [emailError, setEmailError] = useState(
        { email: true, message: "", styles: styles.input }
    );
    const [phoneError, setPhoneError] = useState(
        { phone: true, message: "", styles: styles.input }
    );
    const [firstNameError, setFirstNameError] = useState(
        { firstName: true, message: "", styles: styles.input }
    );
    const [lastNameError, setLastNameError] = useState(
        { lastName: true, message: "", styles: styles.input }
    );

    const [userLocal, setUserLocal] = useState(null);
    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (raw) {
            const user = JSON.parse(raw);
            setUserLocal(user);
            if (user?.avatar) setAvatarSrc(user.avatar);
        }
    }, []);

    useEffect(() => {
        const userInfo = fetch("/api/users/" + userLocal?._id).then((res) => res.json());
        userInfo.then((data) => {
            setDefaultData({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email
            });
            setFormData({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email
            });
        });
    }, [userLocal]);
    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
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
            showError("Không thể upload ảnh. Vui lòng thử lại.", "Upload thất bại");
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
    function checkEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function checkPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }
    function checkFullName(fullName) {
        const fullNameRegex = /^[A-Za-zÀ-ÖØ-ößığĞñÑáéíóúÁÉÍÓÚüÜçÇĐđ ]{2,}$/;
        return fullNameRegex.test(fullName);
    }
    function handleUpdate() {
        if (formData.firstName === null) {
            formData.firstName = defaultData.firstName;
        }
        if (formData.lastName === null) {
            formData.lastName = defaultData.lastName;
        }
        if (formData.phone === null) {
            formData.phone = defaultData.phone;
        }
        if (formData.email === null) {
            formData.email = defaultData.email;
        }
        if (firstNameRef.current.value === "" && lastNameRef.current.value === "" && phoneRef.current.value === "" && emailRef.current.value === "") {
            showError("Vui lòng nhập thông tin cần sửa đổi", "Thông tin không hợp lệ");
            return;
        }
        fetch("/api/users/" + userLocal?._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.ok) {
                const raw = localStorage.getItem("user");
                if (raw) {
                    const user = JSON.parse(raw);
                    user.name = formData.firstName + " " + formData.lastName;
                    user.phone = formData.phone;
                    user.email = formData.email;
                    user.avatar = avatarSrc;
                    localStorage.setItem("user", JSON.stringify(user));
                }
                window.location.reload();
            } else {
                showError("Cập nhật thông tin thất bại. Vui lòng thử lại sau.", "Cập nhật thất bại");
            }
        });






    }

    return (
        <div>
            <ErrorPopup
                message={errorPopup.show ? errorPopup.message : null}
                title={errorPopup.title}
                onClose={closeError}
            />
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
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <input ref={firstNameRef} className={firstNameError.styles} type="text" placeholder={defaultData.firstName || "Họ tên đệm"} onChange={(e) => {
                                if (checkFullName(e.target.value) || e.target.value === "") {
                                    setFirstNameError({ firstName: true, message: "", styles: styles.input });
                                } else {
                                    setFirstNameError({ firstName: false, message: "Họ tên không hợp lệ", styles: styles.inputError });
                                }
                                setFormData({ ...formData, firstName: e.target.value });
                            }} />
                            <span className={`${styles.errorText} ${!firstNameError.firstName ? styles.errorTextVisible : ""}`}>
                                {firstNameError.message}
                            </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <input ref={lastNameRef} className={lastNameError.styles} type="text" placeholder={defaultData.lastName || "Tên"} onChange={(e) => {
                                if (checkFullName(e.target.value) || e.target.value === "") {
                                    setLastNameError({ lastName: true, message: "", styles: styles.input });
                                } else {
                                    setLastNameError({ lastName: false, message: "Họ tên không hợp lệ", styles: styles.inputError });
                                }
                                setFormData({ ...formData, lastName: e.target.value });
                            }} />
                            <span className={`${styles.errorText} ${!lastNameError.lastName ? styles.errorTextVisible : ""}`}>
                                {lastNameError.message}
                            </span>
                        </div>
                    </div>
                    <div>
                        <input ref={phoneRef} className={phoneError.styles} type="text" placeholder={defaultData.phone || "Số điện thoại"} onChange={(e) => {
                            if (checkPhone(e.target.value) || e.target.value === "") {
                                setPhoneError({ phone: true, message: "", styles: styles.input });
                            } else {
                                setPhoneError({ phone: false, message: "Số điện thoại không hợp lệ", styles: styles.inputError });
                            }
                            setFormData({ ...formData, phone: e.target.value });
                        }} />
                        <span className={`${styles.errorText} ${!phoneError.phone ? styles.errorTextVisible : ""}`}>
                            {phoneError.message}
                        </span>
                    </div>
                    <div>
                        <input ref={emailRef} className={emailError.styles} type="text" placeholder={defaultData.email || "Email"} onChange={(e) => {

                            if (checkEmail(e.target.value) || e.target.value === "") {
                                setEmailError({ email: true, message: "", styles: styles.input });
                            } else {
                                setEmailError({ email: false, message: "Email không hợp lệ", styles: styles.inputError });
                            }
                            setFormData({ ...formData, email: e.target.value });
                        }} />
                        <span className={`${styles.errorText} ${!emailError.email ? styles.errorTextVisible : ""}`}>
                            {emailError.message}
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <GoldButton onClick={handleUpdate} >CẬP NHẬT</GoldButton>
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