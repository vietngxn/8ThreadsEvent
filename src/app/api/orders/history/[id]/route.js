import { connectDB } from "@/app/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const db = mongoose.connection.db;

    const orders = await db
      .collection("Orders")
      .find({ userId: id })
      .sort({ createdAt: -1 })
      .toArray();

    const result = [];

    for (const order of orders) {
      const event = await db
        .collection("Events")
        .findOne({
          eventId: order.eventId,
        });

      const payment = await db
        .collection("Payments")
        .findOne({
          orderId: order.orderId,
        });

      const voucher = order.voucherId
        ? await db
            .collection("Vouchers")
            .findOne({
              voucherId: order.voucherId,
            })
        : null;

      const items = [];

      let originalTotal = 0;
      let totalQty = 0;

      for (const item of order.items || []) {
        const ticketType = await db
          .collection("Ticket_types")
          .findOne({
            ticketTypeId: item.ticketTypeId,
          });

        const rowTotal =
          item.unitPrice * item.quantity;

        originalTotal += rowTotal;
        totalQty += item.quantity;

        items.push({
          ticketTypeId: item.ticketTypeId,
          name:
            ticketType?.name ||
            "Unknown Ticket",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          rowTotal,
        });
      }

      let discount = 0;

      if (voucher) {
        if (voucher.voucherType === "percent") {
          discount = (originalTotal * voucher.value) / 100;
        } else if (voucher.voucherType === "minus") {
          discount = voucher.value; 
        }
      } else {
        discount = originalTotal - order.subtotal;
      }

      if (discount < 0) discount = 0;

      result.push({
        orderId: order.orderId,
        userId: order.userId,
        status: order.status,
        subtotal: order.subtotal,
        createdAt: order.createdAt,

        totalQty,
        originalTotal,
        discount,

        paymentMethod:
          payment?.method || "",
        paymentStatus:
          payment?.status || "",

        voucherName:
          voucher?.voucherName || "",

        event: {
          name:
            event?.name ||
            "Sự kiện không xác định",
          img:
            event?.img ||
            "/poster.jpg",
          venue:
            event?.venue || {},
          time:
            event?.time || {},
        },

        items,
      });
    }

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          error.message ||
          "Lỗi server",
      },
      { status: 500 }
    );
  }
}