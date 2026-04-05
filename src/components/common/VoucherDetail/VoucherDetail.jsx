"use client";

import styles from "./VoucherDetail.module.css";
import { ArrowLeft } from "lucide-react";

function formatMoneyVN(value) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(value || 0) * 1000)}đ`;
}

function getDiscountText(voucher) {
  if (!voucher) return "Đang cập nhật";
  if (voucher.voucherType === "percent") return `Giảm ${voucher.value}%`;
  return `Giảm ${formatMoneyVN(voucher.value)}`;
}

function getConditionText(voucher) {
  if (!voucher?.condition) return "Điều kiện áp dụng theo chương trình";
  const minOrderMatch = voucher.condition.match(/minOrder\s*>?=\s*(\d+)/i);
  if (minOrderMatch) {
    return `Đơn tối thiểu ${formatMoneyVN(Number(minOrderMatch[1]))}`;
  }
  return voucher.condition;
}

function getTimeRange(voucher) {
  if (!voucher?.timeStart || !voucher?.timeEnd) return "Đang cập nhật";
  const start = new Date(voucher.timeStart);
  const end = new Date(voucher.timeEnd);
  return `${start.toLocaleString("vi-VN")} - ${end.toLocaleString("vi-VN")}`;
}

function getExpiryText(voucher) {
  if (!voucher?.timeEnd) return "HSD: Đang cập nhật";
  const end = new Date(voucher.timeEnd);
  return `HSD: ${end.toLocaleDateString("vi-VN")}`;
}

export default function VoucherDetail({
  voucher,
  eventName,
  isClosing = false,
  onBack,
  onClose,
}) {
  if (!voucher) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <button type="button" className={styles.backButton} onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Trở về</span>
          </button>
          <h2 className={styles.title}>Chi tiết voucher</h2>
        </div>

        <div
          className={styles.voucherCard}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.logo}>
            <img src="/assets/images/image 10.png" alt="vnpay" />
          </div>

          <div className={styles.voucherInfo}>
            <h3>{getDiscountText(voucher)}</h3>
            <p>{getConditionText(voucher)}</p>
            <p className={styles.expire}>{getExpiryText(voucher)}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h4>Thời gian áp dụng</h4>
          <p>{getTimeRange(voucher)}</p>
        </div>

        <div className={styles.section}>
          <h4>Ưu đãi</h4>
          <p>{`${getDiscountText(voucher)} - ${getConditionText(voucher)}`}</p>
        </div>

        <div className={styles.section}>
          <h4>Áp dụng cho</h4>
          <p>Sự kiện: {eventName || "Đang cập nhật"}</p>
        </div>

        <div className={styles.section}>
          <h4>Phương thức thanh toán</h4>
          <p>VNPAY / Ứng dụng ngân hàng</p>
        </div>
      </div>
    </div>
  );
}
