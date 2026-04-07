"use client";

import { Ticket } from "lucide-react";
import styles from "./VoucherModal.module.css";

function formatMoneyVN(value) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(value || 0) * 1000)}đ`;
}

function getDiscountText(voucher) {
  if (!voucher) return "";
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

function getExpiryText(voucher) {
  if (!voucher?.timeEnd) return "HSD: Đang cập nhật";
  const end = new Date(voucher.timeEnd);
  return `HSD: ${end.toLocaleDateString("vi-VN")}`;
}

export default function VoucherModal({
  vouchers = [],
  selectedVoucherId,
  voucherCode,
  isClosing = false,
  onVoucherCodeChange,
  onSelectVoucher,
  onViewCondition,
  onClose,
  onConfirm,
}) {
  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.title}>Chọn tối đa 1 voucher</h2>

        <div className={styles.inputWrapper}>
          <Ticket size={14} className={styles.inputIcon} />
          <input
            className={styles.input}
            placeholder="Nhập mã voucher"
            value={voucherCode}
            onChange={(e) => onVoucherCodeChange?.(e.target.value)}
          />
        </div>

        <p className={styles.partnerTitle}>Voucher từ đối tác</p>

        <div className={styles.listWrap}>
          {vouchers.map((voucher, index) => {
            const selected = selectedVoucherId === voucher.voucherId;
            return (
              <div
                key={voucher.voucherId}
                className={styles.voucherCard}
                style={{ "--voucher-delay": `${index * 70}ms` }}
                onClick={() => onSelectVoucher?.(voucher.voucherId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectVoucher?.(voucher.voucherId);
                  }
                }}
              >
                <div className={styles.logo}>
                  <img src="/assets/images/image 10.png" alt="vnpay" />
                </div>

                <div className={styles.voucherInfo}>
                  <h3>{getDiscountText(voucher)}</h3>
                  <p>{getConditionText(voucher)}</p>
                  <button
                    type="button"
                    className={styles.condition}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewCondition?.(voucher);
                    }}
                  >
                    Xem điều kiện
                  </button>
                  <p className={styles.expire}>{getExpiryText(voucher)}</p>
                </div>

                <span
                  className={`${styles.radioDot} ${selected ? styles.radioDotOn : ""}`}
                />
              </div>
            );
          })}

          {vouchers.length === 0 ? (
            <p className={styles.emptyText}>Hiện chưa có voucher khả dụng</p>
          ) : null}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
          >
            Huỷ
          </button>

          <button
            type="button"
            className={`${styles.button} ${styles.confirm} ${styles.goldSilver}`}
            onClick={onConfirm}
          >
            <span>Xác nhận</span>
          </button>
        </div>
      </div>
    </div>
  );
}
