import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { account, password } = await req.json();


    const user = await User.findOne({
      $or: [{ email: account }, { userId: account }],
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    if (user.password !== password) {
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
      token: "test-token-123", // fake token để frontend dùng
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}