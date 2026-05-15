"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Hash,
  MapPin,
  QrCode,
  Ticket,
  User,
} from "lucide-react";
import Navbar from "@/components/common/Navbar/Navbar";
import BackButton from "@/components/common/Button/BackButton";
import GoldButton from "@/components/common/Button/GoldButton";
import styles from "./payment.module.css";

const HOLD_WINDOW_MS = 10 * 60 * 1000;

function formatCurrency(value) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(value || 0))}đ`;
}

function formatDateTime(value) {
  if (!value) return "Đang cập nhật";
  const date = new Date(value);
  return date.toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRemainingMs(createdAt) {
  const createdAtMs = new Date(createdAt || Date.now()).getTime();
  if (!Number.isFinite(createdAtMs)) return 0;
  const deadline = createdAtMs + HOLD_WINDOW_MS;
  return Math.max(deadline - Date.now(), 0);
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");

  const [paymentContext, setPaymentContext] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [qrContent, setQrContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState(HOLD_WINDOW_MS);
  const [isExpired, setIsExpired] = useState(false);
  const [isCancelSyncing, setIsCancelSyncing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("temp_payment_context");
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") {
        setPaymentContext(null);
        return;
      }

      if (
        orderIdFromUrl &&
        parsed.orderId &&
        parsed.orderId !== orderIdFromUrl
      ) {
        setPaymentContext(null);
        return;
      }

      setPaymentContext(parsed);
    } catch {
      setPaymentContext(null);
    }
  }, [orderIdFromUrl]);

  useEffect(() => {
    if (!paymentContext) {
      setLoading(false);
      return;
    }

    const remainingNow = getRemainingMs(paymentContext.createdAt);
    setTimeLeftMs(remainingNow);
    setIsExpired(remainingNow <= 0);

    const timer = window.setInterval(() => {
      const remaining = getRemainingMs(paymentContext.createdAt);
      setTimeLeftMs(remaining);
      setIsExpired(remaining <= 0);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [paymentContext]);

  useEffect(() => {
    if (!paymentContext || !isExpired || isCancelled || isCancelSyncing) {
      return;
    }

    let isMounted = true;

    async function expireOrder() {
      try {
        setIsCancelSyncing(true);
        const response = await fetch("/api/payment/expire", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentContext }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Không thể hủy đơn hết hạn");
        }

        if (!isMounted) return;
        setIsCancelled(true);
        setPaymentUrl("");
        setQrContent("");
        setError("Đơn hàng đã hết hạn thanh toán. Vui lòng đặt lại.");
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || "Không thể hủy đơn hết hạn");
      } finally {
        if (isMounted) {
          setIsCancelSyncing(false);
          setLoading(false);
        }
      }
    }

    expireOrder();

    return () => {
      isMounted = false;
    };
  }, [paymentContext, isExpired, isCancelled, isCancelSyncing]);

  useEffect(() => {
    if (!paymentContext) {
      setLoading(false);
      return;
    }

    const remainingNow = getRemainingMs(paymentContext.createdAt);
    if (remainingNow <= 0) {
      setLoading(false);
      setError("Đơn hàng đã hết hạn thanh toán. Vui lòng đặt lại.");
      return;
    }

    let isMounted = true;

    async function createPaymentLink() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: paymentContext.total,
            orderId: paymentContext.orderId,
            bankCode: "NCB",
            paymentContext,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Không thể tạo đường dẫn thanh toán");
        }

        if (!isMounted) return;
        setPaymentUrl(data.url || "");
        setQrContent(data.qrContent || data.url || "");
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || "Không thể tạo đường dẫn thanh toán");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    createPaymentLink();

    return () => {
      isMounted = false;
    };
  }, [paymentContext]);

  const orderItems = useMemo(
    () => paymentContext?.items || [],
    [paymentContext],
  );

  const handleCopyOrderId = async () => {
    try {
      if (!paymentContext?.orderId) return;
      await navigator.clipboard.writeText(paymentContext.orderId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  if (!paymentContext) {
    return (
      <div className={styles.pageShell}>
        <Navbar />
        <main className={styles.emptyStateWrap}>
          <div className={styles.emptyCard}>
            <h1>Không tìm thấy thông tin thanh toán</h1>
            <p>Vui lòng quay lại trang xác nhận để tạo lại đơn hàng.</p>
            <GoldButton onClick={() => router.push("/page/checkout")}>
              Quay lại checkout
            </GoldButton>
          </div>
        </main>
      </div>
    );
  }

  const qrSource = paymentUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(qrContent || paymentUrl)}`
    : "";

  const countdownText = formatCountdown(timeLeftMs);
  const canRedirectToGateway = !isExpired && !loading && !error && !!paymentUrl;

  return (
    <div className={styles.pageShell}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.topbar}>
          <BackButton label="Trở về" />
          <div className={styles.topbarRight}>
            <div className={styles.countdownPill}>
              <Clock3 size={16} />
              {isExpired
                ? "Hết thời gian thanh toán"
                : `Thanh toán trong ${countdownText}`}
            </div>
            <div className={styles.statusPill}>
              <CircleCheck size={16} />
              {isExpired ? "Đơn hàng không thành công" : "Xác nhận thanh toán"}
            </div>
          </div>
        </div>

        <div className={styles.hero}>
          <div>
            <p className={styles.kicker}>Thanh toán VNPAY</p>
            <h1>Thông tin đơn hàng</h1>
            <p className={styles.subtitle}>
              Kiểm tra lại thông tin đặt vé trước khi quét QR hoặc chuyển sang
              ứng dụng ngân hàng.
            </p>
          </div>
          <div className={styles.orderBadge}>
            <Hash size={16} />
            <span>{paymentContext.orderId}</span>
          </div>
        </div>

        <div className={styles.layout}>
          <section className={`${styles.card} ${styles.summaryCard}`}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.sectionLabel}>Sự kiện</p>
                <h2>{paymentContext.eventName}</h2>
              </div>
              <div className={styles.paymentMethodTag}>VNPAY / Ngân hàng</div>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaRow}>
                <CalendarDays size={16} />
                <span>{formatDateTime(paymentContext.eventTime)}</span>
              </div>
              <div className={styles.metaRow}>
                <MapPin size={16} />
                <span>{paymentContext.eventVenue}</span>
              </div>
              <div className={styles.metaRow}>
                <User size={16} />
                <span>
                  {paymentContext.customer?.fullName || "Chưa có tên"}
                </span>
              </div>
              <div className={styles.metaRow}>
                <Clock3 size={16} />
                <span>{formatDateTime(paymentContext.createdAt)}</span>
              </div>
            </div>

            <div className={styles.invoiceBox}>
              <div className={styles.invoiceHeader}>
                <Ticket size={16} />
                <span>Chi tiết đơn hàng</span>
              </div>

              <div className={styles.ticketList}>
                {orderItems.map((item) => (
                  <div key={item.ticketTypeId} className={styles.ticketItem}>
                    <div>
                      <strong>{item.ticketName}</strong>
                      <p>
                        {String(item.quantity).padStart(2, "0")} vé x{" "}
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <span>{formatCurrency(item.itemTotal)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.totals}>
                <div>
                  <span>Tạm tính</span>
                  <strong>{formatCurrency(paymentContext.subtotal)}</strong>
                </div>
                <div>
                  <span>Chiết khấu</span>
                  <strong>{formatCurrency(paymentContext.discount)}</strong>
                </div>
                <div className={styles.totalLine}>
                  <span>Tổng thanh toán</span>
                  <strong>{formatCurrency(paymentContext.total)}</strong>
                </div>
              </div>

              <div className={styles.customerBox}>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {paymentContext.customer?.phone || "Chưa có"}
                </p>
                <p>
                  <strong>Mã voucher:</strong>{" "}
                  {paymentContext.selectedVoucher?.voucherName ||
                    "Không áp dụng"}
                </p>
              </div>
            </div>
          </section>

          <aside className={`${styles.card} ${styles.qrCard}`}>
            <div className={styles.qrHeader}>
              <QrCode size={18} />
              <h2>Quét QR để thanh toán</h2>
            </div>

            <div className={styles.qrFrame}>
              {isExpired ? (
                <div className={styles.qrExpired}>
                  Đơn hàng đã quá 10 phút và đã bị hủy.
                </div>
              ) : loading ? (
                <div className={styles.qrLoading}>Đang tạo mã QR...</div>
              ) : error ? (
                <div className={styles.qrError}>
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                  >
                    Thử lại
                  </button>
                </div>
              ) : qrSource ? (
                <img
                  src={qrSource}
                  alt="QR thanh toán VNPAY"
                  className={styles.qrImage}
                />
              ) : (
                <div className={styles.qrLoading}>Đang tạo mã QR...</div>
              )}
            </div>

            <div className={styles.qrInfo}>
              <p>
                Mở ứng dụng VNPAY hoặc app ngân hàng và quét mã để hoàn tất
                thanh toán.
              </p>
              <p className={styles.amount}>
                {formatCurrency(paymentContext.total)}
              </p>
            </div>

            <div className={styles.testGuideCard}>
              <h3>Flow test VNPAY sandbox</h3>
              <p>
                Bấm nút bên dưới để redirect sang cổng VNPAY sandbox, sau đó
                chọn thanh toán bằng thẻ ATM nội địa / Internet Banking.
              </p>
              <p>Ngân hàng test khuyến nghị: NCB</p>
              <p>
                Bộ thẻ demo: 9704198526191432198 - NGUYEN VAN A - 07/15 - OTP:
                123456
              </p>
            </div>

            <div className={styles.qrActions}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleCopyOrderId}
              >
                {copied ? "Đã sao chép" : "Sao chép mã đơn"}
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => {
                  if (canRedirectToGateway) {
                    window.location.href = paymentUrl;
                  }
                }}
                disabled={!canRedirectToGateway}
              >
                Đến cổng VNPAY sandbox
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
