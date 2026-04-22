import { connectDB } from "@/app/lib/mongodb";
import Event from "@/models/Event";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const event = await Event.findById(id);

    if (!event) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(event);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}