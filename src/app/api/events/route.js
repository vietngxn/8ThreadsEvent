import { connectDB } from "@/app/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
    console.log("API CALLED");

    await connectDB();

    console.log("Collection:", Event.collection.name); // 👈 thêm ở đây

    const events = await Event.find();

    console.log("Data:", events); // 👈 debug luôn

    return Response.json(events);
}

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return Response.json(event);
}