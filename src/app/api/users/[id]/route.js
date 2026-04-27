import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                { message: "ID không hợp lệ" },
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

        return Response.json(user);
    } catch (error) {
        console.log("GET USER ERROR:", error);
        return Response.json(
            {
                message: "Lỗi server",
                error: error.message
            },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const body = await req.json();

        const user = await User.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (!user) {
            return Response.json(
                { message: "User không tồn tại" },
                { status: 404 }
            );
        }

        return Response.json(user);
    } catch (error) {
        console.log("UPDATE USER ERROR:", error);
        return Response.json(
            {
                message: "Lỗi server",
                error: error.message
            },
            { status: 500 }
        );
    }
}