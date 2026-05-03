import { connectDB } from "@/app/lib/mongodb";
import { vnpay } from "@/app/lib/vnpay";
import Order from "@/models/Order";
import OrderTicket from "@/models/OrderTicket";
import Payment from "@/models/Payment";
import Ticket from "@/models/Ticket";
import TicketType from "@/models/TicketType";
import User from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { pickOrderFields, withStatus } from "@/app/lib/orderSanitize";
import { pickPaymentFields } from "@/app/lib/paymentSanitize";
import { pickTicketFields } from "@/app/lib/ticketSanitize";

const HOLD_WINDOW_MS = 10 * 60 * 1000;

function makeTicketId(orderId, ticketTypeId, index) {
  return `T-${orderId}-${ticketTypeId}-${index + 1}`;
}

function makeQrCode(orderId, ticketTypeId, index) {
  return `QR-${orderId}-${ticketTypeId}-${index + 1}-${crypto.randomUUID()}`;
}

function makePaymentId(orderId, transactionNo) {
  if (transactionNo) return `PAY-${transactionNo}`;
  return `PAY-${orderId}`;
}

function normalizeGatewayAmount(vnpAmount, expectedAmount) {
  const raw = Number(vnpAmount || 0);
  const expected = Number(expectedAmount || 0);

  if (!Number.isFinite(raw) || raw <= 0) return 0;

  // VNPay integrations may return amount as VND or VND*100 depending on library/config.
  if (expected > 0) {
    if (raw === expected) return raw;
    if (raw / 100 === expected) return raw / 100;
    if (raw * 100 === expected) return raw * 100;
  }

  // Fallback heuristic for common VNPay sandbox format (x100).
  return raw % 100 === 0 ? raw / 100 : raw;
}

function buildExpectedAmounts(sourceContext = {}) {
  const values = [
    sourceContext.total,
    sourceContext.totalAmount,
    sourceContext.subtotal,
  ]
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  return [...new Set(values)];
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const paymentContext = body?.paymentContext;
    const vnpayResult = body?.vnpayResult || {};
    const orderId = paymentContext?.orderId || vnpayResult?.vnp_TxnRef;

    if (!orderId) {
      return NextResponse.json(
        { error: "Thiếu mã đơn hàng thanh toán" },
        { status: 400 },
      );
    }

    const existingOrder = await Order.findOne({ orderId });
    const sourceContext = paymentContext || existingOrder;

    if (!sourceContext) {
      return NextResponse.json(
        { error: "Không tìm thấy dữ liệu đơn hàng" },
        { status: 404 },
      );
    }

    const createdAtMs = new Date(
      paymentContext?.createdAt || existingOrder?.createdAt || 0,
    ).getTime();
    const isExpired =
      !Number.isFinite(createdAtMs) ||
      Date.now() - createdAtMs > HOLD_WINDOW_MS;

    if (isExpired) {
      const cancelPayload = withStatus(
        {
          orderId,
          userId: sourceContext.userId || "guest",
          eventId: sourceContext.eventId,
          items: sourceContext.items || [],
          subtotal:
            sourceContext.subtotal ||
            sourceContext.total ||
            sourceContext.totalAmount ||
            0,
          voucherId:
            sourceContext.selectedVoucher?.voucherId ||
            sourceContext.voucherId ||
            "",
          createdAt: sourceContext.createdAt || undefined,
        },
        "cancelled",
      );

      await Order.findOneAndUpdate({ orderId }, cancelPayload, {
        upsert: true,
        new: true,
      });

      return NextResponse.json(
        { error: "Đơn hàng đã quá hạn 10 phút và bị hủy" },
        { status: 400 },
      );
    }

    const verification = vnpay.verifyReturnUrl(vnpayResult);
    if (!verification.isSuccess || !verification.isVerified) {
      return NextResponse.json(
        { error: verification.message || "Thanh toán chưa được xác thực" },
        { status: 400 },
      );
    }

    const gatewayRawAmount = Number(verification.vnp_Amount || 0);
    const expectedAmounts = buildExpectedAmounts(sourceContext);
    const primaryExpectedAmount = expectedAmounts[0] || 0;
    const amountFromGateway = normalizeGatewayAmount(
      gatewayRawAmount,
      primaryExpectedAmount,
    );

    if (!expectedAmounts.includes(amountFromGateway)) {
      return NextResponse.json(
        {
          error: "Số tiền thanh toán không khớp",
          detail: {
            expectedAmounts,
            primaryExpectedAmount,
            gatewayRawAmount,
            gatewayNormalizedAmount: amountFromGateway,
          },
        },
        { status: 400 },
      );
    }

    if (existingOrder?.status === "cancelled") {
      return NextResponse.json(
        { error: "Đơn hàng đã bị hủy do quá hạn thanh toán" },
        { status: 400 },
      );
    }

    if (existingOrder?.status === "paid") {
      return NextResponse.json({
        message: "Đơn hàng đã được ghi nhận",
        order: existingOrder,
      });
    }

    const orderPayload = pickOrderFields({
      orderId,
      userId: sourceContext.userId || "guest",
      eventId: sourceContext.eventId,
      items: sourceContext.items || [],
      subtotal:
        sourceContext.subtotal ||
        sourceContext.total ||
        sourceContext.totalAmount ||
        0,
      voucherId:
        sourceContext.selectedVoucher?.voucherId ||
        sourceContext.voucherId ||
        "",
      createdAt: sourceContext.createdAt || undefined,
      status: "paid",
    });

    const order = existingOrder
      ? await Order.findOneAndUpdate({ orderId }, orderPayload, {
          new: true,
        })
      : await Order.create(orderPayload);

    const paymentId = makePaymentId(
      order.orderId,
      verification.vnp_TransactionNo,
    );
    const paymentPayload = pickPaymentFields({
      paymentId,
      orderId: order.orderId,
      method: "vnpay",
      amount: amountFromGateway,
      currency: verification.vnp_CurrCode || "VND",
      status: "success",
      paidAt: new Date(),
    });

    // Use raw MongoDB collection to avoid Mongoose adding timestamps
    const db = await Payment.db;
    await db.collection("Payments").updateOne(
      { orderId: order.orderId },
      {
        $set: paymentPayload,
      },
      {
        upsert: true,
      },
    );

    await OrderTicket.findOneAndUpdate(
      { orderId: order.orderId },
      { orderId: order.orderId, eventId: sourceContext.eventId },
      { upsert: true, new: true },
    );

    console.log(
      "Payment Confirmation - sourceContext items:",
      JSON.stringify(sourceContext.items, null, 2),
    );

    for (const item of sourceContext.items || []) {
      const ticketTypeId = item.ticketTypeId || item.id;
      const quantity = Number(item.quantity || item.qty || 0);

      if (!ticketTypeId || quantity < 1) {
        console.log(
          `Skipping item - ticketTypeId: ${ticketTypeId}, quantity: ${quantity}`,
        );
        continue;
      }

      console.log(
        `Updating TicketType: ${ticketTypeId}, increment soldQuantity by ${quantity}`,
      );

      const updateResult = await TicketType.updateOne(
        { ticketTypeId },
        { $inc: { soldQuantity: quantity } },
      );

      console.log(`TicketType update result for ${ticketTypeId}:`, {
        matched: updateResult.matchedCount,
        modified: updateResult.modifiedCount,
      });

      for (let index = 0; index < quantity; index += 1) {
        const ticketId = makeTicketId(order.orderId, ticketTypeId, index);
        const qrCode = makeQrCode(order.orderId, ticketTypeId, index);

        const ticketPayload = pickTicketFields({
          ticketId,
          eventId: sourceContext.eventId,
          ticketTypeId,
          orderId: order.orderId,
          ownerId: order.userId,
          qrCode,
          status: "valid",
        });

        await Ticket.db.collection("Tickets").insertOne(ticketPayload);
      }
    }

    const selectedVoucherId =
      sourceContext.selectedVoucher?.voucherId ||
      sourceContext.voucherId ||
      null;

    if (selectedVoucherId && order.userId !== "guest") {
      await User.updateOne(
        {
          userId: order.userId,
          "vouchers.voucherId": selectedVoucherId,
        },
        {
          $set: {
            "vouchers.$.status": "used",
            "vouchers.$.usedAt": new Date(),
          },
        },
      );
    }

    return NextResponse.json({
      message: "Thanh toán thành công",
      order,
    });
  } catch (error) {
    console.error("PAYMENT CONFIRM ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Không thể xác nhận thanh toán" },
      { status: 500 },
    );
  }
}
