import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        { message: "Thiếu dữ liệu" },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return Response.json(
        { message: "Mật khẩu mới phải khác mật khẩu cũ" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return Response.json(
        { message: "User không tồn tại" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return Response.json(
        { message: "Mật khẩu cũ không đúng" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return Response.json({
      message: "Đổi mật khẩu thành công"
    });

  } catch (error) {
    return Response.json(
      {
        message: "Lỗi server",
        error: error.message
      },
      { status: 500 }
    );
  }
}