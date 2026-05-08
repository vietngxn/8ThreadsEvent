import { vnpay } from "@/app/lib/vnpay";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { withStatus } from "@/app/lib/orderSanitize";

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, orderId, bankCode, paymentContext } = body;

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: "Thiếu amount hoặc orderId" },
        { status: 400 },
      );
    }

    if (paymentContext?.orderId) {
      await connectDB();

      await Order.findOneAndUpdate(
        { orderId: paymentContext.orderId },
        withStatus(
          {
            orderId: paymentContext.orderId,
            userId: paymentContext.userId || "guest",
            eventId: paymentContext.eventId,
            items: paymentContext.items || [],
            subtotal:
              paymentContext.subtotal || paymentContext.total || amount || 0,
            voucherId:
              paymentContext.selectedVoucher?.voucherId ||
              paymentContext.voucherId ||
              "",
            createdAt: paymentContext.createdAt || undefined,
          },
          "pending",
        ),
        { upsert: true, new: true },
      );
    }

    const returnUrl =
      process.env.VNP_RETURN_URL ||
      process.env.VNPAY_RETURN_URL ||
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/page/payment/return`;

    const paymentData = {
      vnp_Amount: amount,
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan ve su kien 8Threads - ID: ${orderId}`,
      vnp_OrderType: "other",
      vnp_ReturnUrl: returnUrl,
      vnp_Locale: "vn",
      ...(bankCode ? { vnp_BankCode: bankCode } : {}),
      vnp_CreateDate: new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[-:T]/g, ""),
    };

    const paymentUrl = vnpay.buildPaymentUrl(paymentData);
    let qrContent = paymentUrl;

    try {
      const qrResult = await vnpay.generateQr(paymentData);
      if (qrResult?.qrcontent) {
        qrContent = qrResult.qrcontent;
      }
    } catch (qrError) {
      console.warn("VNPay QR fallback to payment URL:", qrError);
    }

    return NextResponse.json({ url: paymentUrl, qrContent, returnUrl });
  } catch (error) {
    console.error("VNPAY Error:", error);
    return NextResponse.json(
      { error: error?.message || "Không thể tạo link thanh toán" },
      { status: 500 },
    );
  }
}
