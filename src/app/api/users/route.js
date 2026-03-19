import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  return Response.json(await User.find());
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  return Response.json(await User.create(body));
}