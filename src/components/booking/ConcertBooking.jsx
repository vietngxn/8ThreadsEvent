"use client";

import { useState, useEffect } from "react";
import styles from "./ConcertBooking.module.css";
import EventTitle from "../event/EventTitle";
import EventDate from "../event/EventDate";
import EventLocation from "../event/EventLocation";

const VNPAY_LOGO = () => (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
        <rect width="60" height="24" rx="4" fill="#E31837" />
        <text
            x="30"
            y="16"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            fontFamily="Arial"
        >
            VNPAY
        </text>
    </svg>
);

function Countdown({ seconds: initialSeconds }) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const secs = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className={styles.countdown}>
            <p>Hoàn tất đặt vé trong</p>
            <div className={styles.time}>
                <span>{mins}</span>
                <span>:</span>
                <span>{secs}</span>
            </div>
        </div>
    );
}

function RadioCircle({ checked }) {
    return (
        <div
            className={`${styles.radio} ${checked ? styles.radioActive : ""}`}
        >
            {checked && <div className={styles.radioDot}></div>}
        </div>
    );
}

export default function ConcertBooking() {

    const [agreed, setAgreed] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [promoVisible, setPromoVisible] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [payment, setPayment] = useState("vnpay");

    const valid = agreed && name && phone;

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>

                {/* Header */}
                <div className={styles.header}>

                    <div>

                        <EventTitle title="[CONCERT] ANH TRAI VƯỢT NGÀN CHÔNG GAI DAY3, DAY4" />

                        <EventDate date="22, 23 Tháng 3, 2025" />

                        <EventLocation location="The Global City, TP Thủ Đức" />

                    </div>

                    <Countdown seconds={600} />

                </div>


                {/* Terms */}
                <div className={styles.termsSection}>

                    <p className={styles.termsTitle}>
                        Bạn đã đọc và hoàn toàn đồng ý "Điều khoản và điều kiện" của chương trình *
                    </p>

                    <p className={styles.termsSub}>
                        Have you read and fully agree with T&C of the event?
                    </p>

                    <button
                        className={styles.agreeBtn}
                        onClick={() => setAgreed(!agreed)}
                    >
                        <RadioCircle checked={agreed} />
                        <span>Tôi đã đọc và đồng ý / I have read and agree</span>
                    </button>

                </div>

                <div className={styles.divider}></div>


                {/* Form */}
                <div className={styles.formGrid}>

                    <input
                        className={styles.input}
                        placeholder="Nhập họ và tên"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        className={styles.input}
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />

                </div>


                {/* Promo */}
                <div className={styles.promoSection}>

                    <p className={styles.promoTitle}>
                        Mã khuyến mãi
                    </p>

                    {!promoVisible ? (

                        <button
                            className={styles.promoAddBtn}
                            onClick={() => setPromoVisible(true)}
                        >
                            + Thêm khuyến mãi
                        </button>

                    ) : (

                        <div className={styles.promoInputRow}>

                            <input
                                className={styles.input}
                                placeholder="Nhập mã khuyến mãi"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />

                            <button className={styles.applyBtn}>
                                Áp dụng
                            </button>

                        </div>

                    )}

                </div>

                <div className={styles.divider}></div>


                {/* Payment */}
                <div className={styles.paymentSection}>

                    <p className={styles.paymentTitle}>
                        Phương thức thanh toán
                    </p>

                    <button
                        onClick={() => setPayment("vnpay")}
                        className={`${styles.paymentBtn} ${payment === "vnpay" ? styles.paymentActive : ""
                            }`}
                    >
                        <RadioCircle checked={payment === "vnpay"} />
                        <VNPAY_LOGO />
                        <span>VNPAY / Ứng dụng ngân hàng</span>
                    </button>

                </div>


                {/* Submit */}
                <div className={styles.submitWrapper}>

                    <button
                        disabled={!valid}
                        className={`${styles.submitBtn} ${valid ? styles.submitActive : styles.submitDisabled
                            }`}
                    >
                        Tiếp tục thanh toán
                    </button>

                </div>

            </div>

        </div>
    );
}