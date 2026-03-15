"use client";

import { useState } from "react";
import styles from "./VoucherModal.module.css";

export default function VoucherModal() {
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Chọn tối đa 2 voucher</h2>

        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>🎟</span>
          <input className={styles.input} placeholder="Nhập mã voucher" />
        </div>

        <p className={styles.partnerTitle}>Voucher từ đối tác</p>

        <div
          className={styles.voucherCard}
          onClick={() => setSelected((prev) => !prev)}
        >
          <div className={styles.logo}>
            <img src="/assets/images/image 10.png" alt="vnpay" />
          </div>

          <div className={styles.voucherInfo}>
            <h3>Giảm 40.000đ</h3>
            <p>Đơn tối thiểu 500.000đ</p>
            <span className={styles.condition}>Xem điều kiện</span>
            <p className={styles.expire}>HSD: 28/02/2026</p>
          </div>

          <span
            className={`${styles.radioDot} ${selected ? styles.radioDotOn : ""}`}
          />
        </div>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.cancel}`}>Huỷ</button>

          <button
            className={`${styles.button} ${styles.confirm} ${styles.goldSilver}`}
          >
            <span>Xác nhận</span>
          </button>
        </div>
      </div>
    </div>
  );
}
