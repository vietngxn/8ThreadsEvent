import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  price: Number,
  totalQuantity: Number,
  soldQuantity: Number,
  isActive: Boolean
});

export default mongoose.models.TicketType || mongoose.model("Ticket_types", ticketTypeSchema);