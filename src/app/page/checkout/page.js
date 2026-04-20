"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Circle, CircleCheck, MapPin } from "lucide-react";
import Navbar from "@/components/common/Navbar/Navbar";
import BackButton from "@/components/common/Button/BackButton";
import GoldButton from "@/components/common/Button/GoldButton";
import VoucherModal from "@/components/common/VoucherModal/VoucherModal";
import VoucherDetail from "@/components/common/VoucherDetail/VoucherDetail";
import styles from "./checkout.module.css";

const HOLD_SECONDS = 10 * 60;
const VOUCHER_MODAL_EXIT_MS = 280;

function formatDateRange(isoStart) {
  if (!isoStart) return "Đang cập nhật";
  const date = new Date(isoStart);
  return date.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(value) {
  const normalized = Number(value || 0) * 1000;
  return `${new Intl.NumberFormat("vi-VN").format(normalized)}đ`;
}

function getVoucherDiscountAmount(voucher, subtotal) {
  if (!voucher) return 0;
  if (voucher.voucherType === "percent") {
    return Math.round(
      (Number(subtotal || 0) * Number(voucher.value || 0)) / 100,
    );
  }
  return Number(voucher.value || 0);
}

function extractMinOrder(condition) {
  if (!condition) return null;
  const matched = condition.match(/minOrder\s*>?=\s*(\d+)/i);
  return matched ? Number(matched[1]) : null;
}

export default function CheckoutRoutePage() {
  const [events, setEvents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(HOLD_SECONDS);
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [appliedVoucherId, setAppliedVoucherId] = useState(null);
  const [voucherDraftId, setVoucherDraftId] = useState(null);
  const [voucherSearch, setVoucherSearch] = useState("");
  const [voucherView, setVoucherView] = useState(null);
  const [voucherFxSeed, setVoucherFxSeed] = useState(0);
  const [voucherListClosing, setVoucherListClosing] = useState(false);
  const [voucherDetailClosing, setVoucherDetailClosing] = useState(false);
  const [isVoucherInitialized, setIsVoucherInitialized] = useState(false);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch("/assets/data/events.json").then((res) => res.json()),
      fetch("/assets/data/orders.json").then((res) => res.json()),
      fetch("/assets/data/ticket_types.json").then((res) => res.json()),
      fetch("/assets/data/vouchers.json").then((res) => res.json()),
    ])
      .then(([eventsData, ordersData, ticketTypesData, vouchersData]) => {
        if (!isMounted) return;
        setEvents(eventsData || []);
        setOrders(ordersData || []);
        setTicketTypes(ticketTypesData || []);
        setVouchers(vouchersData || []);
      })
      .catch(() => {
        if (!isMounted) return;
        setEvents([]);
        setOrders([]);
        setTicketTypes([]);
        setVouchers([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pendingOrder = useMemo(
    () => orders.find((item) => item.status === "pending") || orders[0] || null,
    [orders],
  );

  useEffect(() => {
    if (!pendingOrder || isVoucherInitialized) return;
    setAppliedVoucherId(null);
    setVoucherDraftId(null);
    setIsVoucherInitialized(true);
  }, [pendingOrder, isVoucherInitialized]);

  const checkoutData = useMemo(() => {
    const order = pendingOrder;

    if (!order) {
      return {
        eventId: null,
        eventName: "Đang cập nhật sự kiện",
        eventTime: "Đang cập nhật",
        eventVenue: "Đang cập nhật địa điểm",
        items: [],
        totalQuantity: 0,
        subtotal: 0,
        discount: 0,
        total: 0,
      };
    }

    const event = events.find((item) => item.eventId === order.eventId);

    let subtotal = 0;
    let totalQuantity = 0;
    const items = (order.items || []).map((item) => {
      const ticketType = ticketTypes.find(
        (tt) => tt.ticketTypeId === item.ticketTypeId,
      );
      const quantity = Number(item.quantity || 0);
      const unitPrice = ticketType?.price || 0;
      const itemTotal = quantity * unitPrice;

      subtotal += itemTotal;
      totalQuantity += quantity;

      return {
        ticketTypeId: item.ticketTypeId,
        ticketName: ticketType?.name || item.ticketTypeId,
        quantity,
        unitPrice,
        itemTotal,
      };
    });

    const chosenVoucher = vouchers.find(
      (item) => item.voucherId === appliedVoucherId,
    );
    const discount = getVoucherDiscountAmount(chosenVoucher, subtotal);

    const total = Math.max(subtotal - discount, 0);

    return {
      eventId: order.eventId,
      eventName: event?.name || `Sự kiện ${order.eventId}`,
      eventTime: formatDateRange(event?.time?.event?.start),
      eventVenue: `${event?.venue?.name || ""}${event?.venue?.city ? `, ${event.venue.city}` : ""}`,
      items,
      totalQuantity,
      subtotal,
      discount,
      total,
      selectedVoucher: chosenVoucher || null,
    };
  }, [events, pendingOrder, ticketTypes, vouchers, appliedVoucherId]);

  const filteredVouchers = useMemo(() => {
    const keyword = voucherSearch.trim().toLowerCase();
    const subtotal = checkoutData.subtotal;

    return vouchers.filter((voucher) => {
      const supportsEvent =
        voucher.appliedEvent?.includes("all") ||
        voucher.appliedEvent?.includes(checkoutData.eventId);

      const minOrder = extractMinOrder(voucher.condition);
      const passMinOrder = minOrder === null || subtotal >= minOrder;
      const passKeyword =
        keyword.length === 0 ||
        voucher.voucherName.toLowerCase().includes(keyword) ||
        voucher.voucherId.toLowerCase().includes(keyword);

      return supportsEvent && passMinOrder && passKeyword;
    });
  }, [vouchers, voucherSearch, checkoutData.eventId, checkoutData.subtotal]);

  const selectedDraftVoucher = useMemo(
    () =>
      vouchers.find((voucher) => voucher.voucherId === voucherDraftId) || null,
    [vouchers, voucherDraftId],
  );

  const minuteText = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secondText = String(timeLeft % 60).padStart(2, "0");

  const handlePayment = () => {
    let hasError = false;

    if (!fullName.trim()) {
      setNameError("Vui lòng nhập họ và tên");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!phone.trim()) {
      setPhoneError("Vui lòng nhập số điện thoại");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (!hasAgreedTerms) {
      setTermsError(
        "Bạn cần tích chọn đồng ý điều khoản trước khi thanh toán.",
      );
      hasError = true;
    } else {
      setTermsError("");
    }

    if (!isPaymentSelected) {
      setPaymentError("Vui lòng chọn phương thức thanh toán");
      hasError = true;
    } else {
      setPaymentError("");
    }

    if (!hasError) {
      window.alert("Thanh toán thành công");
    }
  };

  const openVoucherModal = () => {
    setVoucherDraftId(appliedVoucherId);
    setVoucherSearch("");
    setVoucherListClosing(false);
    setVoucherDetailClosing(false);
    setVoucherView("list");
  };

  const closeVoucherListWithTransition = (nextAction) => {
    setVoucherListClosing(true);
    setTimeout(() => {
      setVoucherListClosing(false);
      nextAction?.();
    }, VOUCHER_MODAL_EXIT_MS);
  };

  const closeVoucherDetailWithTransition = (nextAction) => {
    setVoucherDetailClosing(true);
    setTimeout(() => {
      setVoucherDetailClosing(false);
      nextAction?.();
    }, VOUCHER_MODAL_EXIT_MS);
  };

  const closeVoucherModal = () => {
    if (voucherView === "list") {
      closeVoucherListWithTransition(() => setVoucherView(null));
      return;
    }
    if (voucherView === "detail") {
      closeVoucherDetailWithTransition(() => setVoucherView(null));
      return;
    }
    setVoucherView(null);
  };

  const openVoucherDetail = (voucher) => {
    setVoucherDraftId(voucher.voucherId);
    closeVoucherListWithTransition(() => setVoucherView("detail"));
  };

  const confirmVoucher = () => {
    closeVoucherListWithTransition(() => {
      setAppliedVoucherId(voucherDraftId || null);
      if (voucherDraftId) {
        setVoucherFxSeed((prev) => prev + 1);
      }
      setVoucherView(null);
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "var(--background-image)" }}
    >
      <Navbar />

      <main className="mx-auto w-full max-w-[1380px] px-6 pb-16 pt-[calc(var(--navbar-height)+32px)] md:px-10">
        <div className="mb-6">
          <BackButton label="Trở về" />
        </div>

        <h1 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
          Xác nhận đặt vé
        </h1>

        <div className={styles.wrapper}>
          <div className={styles.checkoutContainer}>
            <div className={`${styles.panel} ${styles.mainPanel}`}>
              <div className={styles.holdBox}>
                <p className={styles.holdLabel}>Hoàn tất đặt vé trong</p>
                <p className={styles.holdTime}>
                  {minuteText}:{secondText}
                </p>
              </div>

              <h3 className={styles.title}>{checkoutData.eventName}</h3>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <CalendarDays size={15} className={styles.metaIcon} />
                  <p className={styles.metaText}>{checkoutData.eventTime}</p>
                </div>
                <div className={styles.metaItem}>
                  <MapPin size={15} className={styles.metaIcon} />
                  <p className={styles.metaText}>{checkoutData.eventVenue}</p>
                </div>
              </div>

              <div className={styles.termsSection}>
                <p className={styles.termsTitle}>
                  Bạn đã đọc và hoàn toàn đồng ý "Điều khoản và điều kiện" của
                  chương trình?
                </p>
                <p className={styles.termsSub}>
                  Have you read and fully agree with T&amp;C of the event?
                </p>
                <label className={styles.agreeRow}>
                  <input
                    type="checkbox"
                    checked={hasAgreedTerms}
                    onChange={(e) => {
                      setHasAgreedTerms(e.target.checked);
                      if (e.target.checked) {
                        setTermsError("");
                      }
                    }}
                    className={styles.agreeInput}
                  />
                  {hasAgreedTerms ? (
                    <CircleCheck size={16} className={styles.agreeIcon} />
                  ) : (
                    <Circle size={16} className={styles.agreeIconMuted} />
                  )}
                  <span>Tôi đã đọc và đồng ý / I have read and agree</span>
                </label>
                {termsError ? (
                  <p className={styles.termsError}>{termsError}</p>
                ) : null}
              </div>

              <div className={styles.formGrid}>
                <div>
                  <input
                    className={styles.input}
                    placeholder="Nhập họ và tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {nameError ? (
                    <p className={styles.termsError}>{nameError}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    className={styles.input}
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError ? (
                    <p className={styles.termsError}>{phoneError}</p>
                  ) : null}
                </div>
              </div>

              <div style={{ marginTop: "35px" }}>
                <p className={styles.subTitle}>Mã khuyến mãi</p>
                <div className={styles.promoRow}>
                  <button
                    className={styles.promoBtn}
                    onClick={openVoucherModal}
                  >
                    + Thêm khuyến mãi
                  </button>
                  {checkoutData.selectedVoucher ? (
                    <span
                      key={`${checkoutData.selectedVoucher.voucherId}-${voucherFxSeed}`}
                      className={`${styles.appliedVoucherChip} ${styles.appliedVoucherChipEnter}`}
                    >
                      {checkoutData.selectedVoucher.voucherName}
                      <button
                        type="button"
                        className={styles.removeVoucherBtn}
                        onClick={() => setAppliedVoucherId(null)}
                      >
                        x
                      </button>
                    </span>
                  ) : null}
                </div>
              </div>

              <div style={{ marginTop: "45px" }}>
                <h3 className={styles.title}>Phương thức thanh toán</h3>
                <div
                  className={styles.paymentBox}
                  onClick={() => setIsPaymentSelected(!isPaymentSelected)}
                  style={{ cursor: "pointer" }}
                >
                  {isPaymentSelected ? (
                    <CircleCheck size={18} className={styles.paymentIcon} />
                  ) : (
                    <Circle size={18} className={styles.paymentIconMuted} />
                  )}
                  <img
                    src="/assets/images/image 10.png"
                    alt="VNPAY"
                    className={styles.vnpayLogo}
                  />
                  <span
                    style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}
                  >
                    VNPAY/Ứng dụng ngân hàng
                  </span>
                </div>
                {paymentError ? (
                  <p className={styles.termsError}>{paymentError}</p>
                ) : null}
              </div>
            </div>

            <div className={`${styles.panel} ${styles.ticketPanel}`}>
              <h3 className={styles.ticketPanelTitle}>Thông tin đặt vé</h3>

              <div className={styles.ticketHeaderRow}>
                <span>Loại vé</span>
                <span>Số lượng</span>
              </div>

              {checkoutData.items.map((item) => (
                <div key={item.ticketTypeId} className={styles.ticketCard}>
                  <div>
                    <h4 className={styles.ticketTypeName}>{item.ticketName}</h4>
                    <p className={styles.ticketPriceSub}>
                      {formatCurrency(item.unitPrice)}
                    </p>
                  </div>

                  <div className={styles.ticketCardRight}>
                    <p className={styles.ticketQty}>
                      {String(item.quantity).padStart(2, "0")}
                    </p>
                    <p className={styles.ticketPrice}>
                      {formatCurrency(item.itemTotal)}
                    </p>
                  </div>
                </div>
              ))}

              <div className={styles.summarySection}>
                <div className={styles.summaryRow}>
                  <span>Tạm tính {checkoutData.totalQuantity} ghế</span>
                  <span className={styles.goldText}>
                    {formatCurrency(checkoutData.subtotal)}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Chiết khấu</span>
                  <span className={styles.goldText}>
                    {formatCurrency(checkoutData.discount)}
                  </span>
                </div>
                <div className={styles.totalRow}>
                  <span>Tổng tiền</span>
                  <span className={`${styles.goldText} ${styles.totalValue}`}>
                    {formatCurrency(checkoutData.total)}
                  </span>
                </div>

                <p className={styles.legalText}>
                  Bằng việc tiến hành thanh toán, bạn đã đồng ý với <br />
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                  >
                    điều khoản sử dụng
                  </span>{" "}
                  của chúng tôi.
                </p>
              </div>

              <GoldButton
                className={styles.btnThanhToan}
                onClick={handlePayment}
              >
                Thanh Toán
              </GoldButton>
            </div>
          </div>
        </div>
      </main>

      {voucherView === "list" ? (
        <VoucherModal
          vouchers={filteredVouchers}
          selectedVoucherId={voucherDraftId}
          voucherCode={voucherSearch}
          isClosing={voucherListClosing}
          onVoucherCodeChange={setVoucherSearch}
          onSelectVoucher={setVoucherDraftId}
          onViewCondition={openVoucherDetail}
          onClose={closeVoucherModal}
          onConfirm={confirmVoucher}
        />
      ) : null}

      {voucherView === "detail" ? (
        <VoucherDetail
          voucher={selectedDraftVoucher}
          eventName={checkoutData.eventName}
          isClosing={voucherDetailClosing}
          onBack={() =>
            closeVoucherDetailWithTransition(() => setVoucherView("list"))
          }
          onClose={closeVoucherModal}
        />
      ) : null}
    </div>
  );
}
