import { connectDB } from "@/app/lib/mongodb";
import TicketType from "@/models/TicketType";

export async function GET() {
  await connectDB();
  return Response.json(await TicketType.find());
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  return Response.json(await TicketType.create(body));
}