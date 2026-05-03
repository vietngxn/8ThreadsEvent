import { connectDB } from "@/app/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { withStatus } from "@/app/lib/orderSanitize";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const paymentContext = body?.paymentContext;

    if (!paymentContext?.orderId) {
      return NextResponse.json(
        { error: "Thiếu mã đơn để hủy" },
        { status: 400 },
      );
    }

    const existingOrder = await Order.findOne({
      orderId: paymentContext.orderId,
    });

    if (existingOrder?.status === "paid") {
      return NextResponse.json(
        { error: "Đơn đã thanh toán, không thể hủy" },
        { status: 409 },
      );
    }

    const cancelledOrder = await Order.findOneAndUpdate(
      { orderId: paymentContext.orderId },
      withStatus(
        {
          orderId: paymentContext.orderId,
          userId: paymentContext.userId || "guest",
          eventId: paymentContext.eventId,
          items: paymentContext.items || [],
          subtotal:
            paymentContext.subtotal ||
            paymentContext.total ||
            paymentContext.totalAmount ||
            0,
          voucherId:
            paymentContext.selectedVoucher?.voucherId ||
            paymentContext.voucherId ||
            "",
          createdAt: paymentContext.createdAt || undefined,
        },
        "cancelled",
      ),
      { upsert: true, new: true },
    );

    return NextResponse.json({
      message: "Đơn hàng đã bị hủy do quá hạn thanh toán",
      order: cancelledOrder,
    });
  } catch (error) {
    console.error("PAYMENT EXPIRE ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Không thể hủy đơn" },
      { status: 500 },
    );
  }
}
