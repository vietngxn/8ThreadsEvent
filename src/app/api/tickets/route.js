import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/models/Ticket";

// GET /api/tickets — lấy tất cả vé (dùng nội bộ / admin)
export async function GET() {
  await connectDB();
  return Response.json(await Ticket.find());
}

// POST /api/tickets — tạo vé mới
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  return Response.json(await Ticket.create(body));
}