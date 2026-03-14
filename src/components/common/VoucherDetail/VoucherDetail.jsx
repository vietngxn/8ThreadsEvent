"use client";

import styles from "./VoucherDetail.module.css";

export default function VoucherDetail({ onBack }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Trở về
        </button>

        <h2 className={styles.title}>Chi tiết voucher</h2>
      </div>

      {/* Voucher Card */}
      <div className={styles.voucherCard}>
        <div className={styles.logo}>
          <img src="/assets/images/image 10.png" alt="vnpay" />
        </div>

        <div className={styles.info}>
          <h3>Giảm 40.000đ</h3>
          <p>Đơn tối thiểu 500.000đ</p>

          <span className={styles.expire}>HSD: 28/02/2026</span>
        </div>
      </div>

      {/* Sections */}
      <div className={styles.section}>
        <h4>Thời gian áp dụng</h4>
        <p>11:00, 27 tháng 01 năm 2026 - 23:59, 04 tháng 02 năm 2026</p>
      </div>

      <div className={styles.section}>
        <h4>Ưu đãi</h4>
        <p>Giảm 40.000đ cho đơn tối thiểu 500.000đ</p>
      </div>

      <div className={styles.section}>
        <h4>Áp dụng cho</h4>
        <p>Sự kiện: ATVNCG Day 3, Day 4</p>
      </div>

      <div className={styles.section}>
        <h4>Phương thức thanh toán</h4>
        <p>VNPAY / Ứng dụng ngân hàng</p>
      </div>
    </div>
  );
}
