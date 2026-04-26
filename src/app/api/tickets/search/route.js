import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/models/Ticket";

// POST /api/tickets/search
// Body: { "ownerId": "..." }
export async function POST(req) {
  try {
    await connectDB();

    const { ownerId } = await req.json();

    if (!ownerId) {
      return Response.json(
        { error: "ownerId là bắt buộc" },
        { status: 400 }
      );
    }


    const tickets = await Ticket.aggregate([
      { $match: { ownerId } },
      {
        $lookup: {
          from: "Events",
          localField: "eventId",
          foreignField: "eventId",
          as: "event",
        },
      },
      { $addFields: { event: { $arrayElemAt: ["$event", 0] } } },
      {
        $lookup: {
          from: "Ticket_types",
          localField: "ticketTypeId",
          foreignField: "ticketTypeId",
          as: "ticketType",
        },
      },
      { $addFields: { ticketType: { $arrayElemAt: ["$ticketType", 0] } } },
    ]);

    return Response.json(tickets);

  } catch (error) {
    console.error("SEARCH TICKETS ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
