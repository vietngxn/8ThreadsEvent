import { connectDB } from "@/app/lib/mongodb";
import Event from "@/models/Event";
import TicketType from "@/models/TicketType";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        console.log("ID:", id);
        const event = await Event.findById(id).lean();

        if (!event) {
            return Response.json(
                { message: "Không tìm thấy event" },
                { status: 404 }
            );
        }

        const ticketTypes = await TicketType.find({
            eventId: event.eventId,
            isActive: true
        }).lean();

        const minPrice =
        ticketTypes.length > 0
            ? Math.min(...ticketTypes.map(t => t.price))
            : null;

        return Response.json({
            ...event,
            minPrice
        });

    } catch (error) {
            return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
 }
