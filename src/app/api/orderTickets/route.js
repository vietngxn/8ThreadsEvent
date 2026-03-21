import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/OrderTicket";

export async function GET() {
  try {
    await connectDB();

    const orderTickets = await OrderTicket.find();


    return new Response(JSON.stringify(orderTickets), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newOrderTicket = await OrderTicket.create(body);

    return new Response(JSON.stringify(newOrderTicket), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}