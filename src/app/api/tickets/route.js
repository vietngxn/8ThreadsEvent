import { connectDB } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";

export async function GET() {
  await connectDB();
  return Response.json(await Ticket.find());
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  return Response.json(await Ticket.create(body));
}