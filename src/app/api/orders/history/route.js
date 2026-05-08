import { connectDB } from "@/app/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 },
      );
    }

    const query = { userId };
    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ["paid", "pending", "cancelled"] };
    }

    const orders = await Order.find(query)
      .sort({ paymentAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: orders || [],
      count: (orders || []).length,
    });
  } catch (error) {
    console.error("ORDER HISTORY ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch order history" },
      { status: 500 },
    );
  }
}
