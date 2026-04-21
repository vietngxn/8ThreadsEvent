import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await req.json();

    // check email tồn tại
    const exist = await User.findOne({ email });

    if (exist) {
      return Response.json(
        { error: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // tạo user
    const newUser = await User.create({
      userId: "user_" + Date.now(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "customer",
      status: "active",
      cart: [],
      vouchers: [],
      authProvider: "local",
    });

    return Response.json({
      message: "Register success",
      user: {
        userId: newUser.userId,
        name: newUser.firstName + " " + newUser.lastName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}