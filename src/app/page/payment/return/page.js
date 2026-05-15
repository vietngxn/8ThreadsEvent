"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Navbar from "@/components/common/Navbar/Navbar";
import GoldButton from "@/components/common/Button/GoldButton";
import styles from "./paymentReturn.module.css";

function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Đang xác thực thanh toán...");

  const queryObject = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams],
  );

  useEffect(() => {
    let isMounted = true;

    async function confirmPayment() {
      try {
        const raw = window.localStorage.getItem("temp_payment_context");
        const paymentContext = raw ? JSON.parse(raw) : null;

        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentContext,
            vnpayResult: queryObject,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Thanh toán chưa được xác nhận");
        }

        if (!isMounted) return;
        window.localStorage.removeItem("temp_payment_context");
        window.localStorage.removeItem("temp_cart");
        setStatus("success");
        setMessage(data?.message || "Thanh toán thành công");
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setMessage(error?.message || "Không thể xác nhận thanh toán");
      }
    }

    confirmPayment();

    return () => {
      isMounted = false;
    };
  }, [queryObject]);

  return (
    <div className={styles.pageShell}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.card}>
          {status === "loading" ? (
            <Loader2 className={styles.iconSpin} size={36} />
          ) : status === "success" ? (
            <CheckCircle2 className={styles.successIcon} size={40} />
          ) : (
            <XCircle className={styles.errorIcon} size={40} />
          )}

          <h1>
            {status === "success"
              ? "Thanh toán thành công"
              : status === "error"
                ? "Thanh toán chưa hoàn tất"
                : "Xác thực giao dịch"}
          </h1>
          <p>{message}</p>

          <div className={styles.actions}>
            <GoldButton onClick={() => router.push("/payment-history")}>
              Xem lịch sử thanh toán
            </GoldButton>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => router.push("/")}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentReturnContent />
    </Suspense>
  );
}
