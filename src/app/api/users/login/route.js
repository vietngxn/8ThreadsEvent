import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { account, password } = await req.json();

    // tìm user theo email
    const user = await User.findOne({
      email: account,
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    // so sánh password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { error: "Sai mật khẩu" },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Login success",
      user: {
        userId: user.userId,
        name: user.firstName + " " + user.lastName,
        email: user.email,
      },
      token: "test-token-123",
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}