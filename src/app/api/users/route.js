import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  return Response.json(await User.find());
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const exist = await User.findOne({
    $or: [{ email: body.email }, { userId: body.userId }],
  });

  if (exist) {
    return Response.json({ message: "User đã tồn tại" }, { status: 400 });
  }

  const newUser = await User.create(body);

  return Response.json(newUser);
}