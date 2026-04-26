import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload/avatar
// Body: FormData với field "file" và "userId"
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file) {
      return Response.json({ error: "Không có file được gửi lên" }, { status: 400 });
    }
    if (!userId) {
      return Response.json({ error: "Thiếu userId" }, { status: 400 });
    }

    // 1. Tìm user để lấy avatarPublicId cũ
    const user = await User.findOne({ userId }).lean();
    if (!user) {
      return Response.json({ error: "Không tìm thấy user" }, { status: 404 });
    }

    // 2. Xóa ảnh cũ trên Cloudinary nếu có
    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId);
    }

    // 3. Upload ảnh mới lên Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "8threads/avatars",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto", fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // 4. Cập nhật avatar và avatarPublicId trên MongoDB
    await User.updateOne(
      { userId },
      {
        $set: {
          avatar: result.secure_url,
          avatarPublicId: result.public_id,
        },
      }
    );

    return Response.json({
      url: result.secure_url,
      publicId: result.public_id,
    });

  } catch (error) {
    console.error("UPLOAD AVATAR ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

