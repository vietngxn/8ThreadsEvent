import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const user = await User.findById(id);

        if (!user) {
            return Response.json({ message: "User không tồn tại" }, { status: 404 });
        }

        return Response.json(user);
    } catch (error) {
        return Response.json({ message: "Lỗi server", error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const { firstName, lastName, phone, email } = await req.json();
        const user = await User.findByIdAndUpdate(id, { firstName, lastName, phone, email }, { new: true });

        if (!user) {
            return Response.json({ message: "User không tồn tại" }, { status: 404 });
        }

        return Response.json(user);
    } catch (error) {
        return Response.json({ message: "Lỗi server", error: error.message }, { status: 500 });
    }
}
