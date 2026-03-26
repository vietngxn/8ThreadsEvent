import { connectDB } from "@/app/lib/mongodb";
import TicketType from "@/models/TicketType";

export async function GET() {
  try {
    await connectDB();
    const tickets = await TicketType.find();
    console.log("Tickets from DB:", tickets);
    return new Response(JSON.stringify(tickets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /ticketTypes error:", err);
    return new Response(JSON.stringify({ error: "Cannot fetch ticket types" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newTicket = await TicketType.create(body);
    return new Response(JSON.stringify(newTicket), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /ticketTypes error:", err);
    return new Response(JSON.stringify({ error: "Cannot create ticket type" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}