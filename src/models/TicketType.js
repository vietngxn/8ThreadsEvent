import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  price: Number,
  totalQuantity: Number,
  soldQuantity: Number,
  isActive: Boolean
}, { collection: "Ticket_types" });

export default mongoose.models.TicketType || mongoose.model("TicketType", ticketTypeSchema);
