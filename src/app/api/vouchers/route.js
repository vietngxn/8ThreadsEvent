import { connectDB } from "@/app/lib/mongodb";
import Voucher from "@/models/Voucher";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    const query = eventId ? { appliedEvent: { $in: [eventId, "all"] } } : {};

    const vouchers = await Voucher.find(query);

    return new Response(JSON.stringify(vouchers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /vouchers error:", err);
    return new Response(JSON.stringify({ error: "Cannot fetch vouchers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const created = await Voucher.create(body);

    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /vouchers error:", err);
    return new Response(JSON.stringify({ error: "Cannot create voucher" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
