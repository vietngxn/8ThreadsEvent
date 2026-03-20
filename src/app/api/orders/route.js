import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  await connectDB();
  return Response.json(await Order.find());
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  return Response.json(await Order.create(body));
}