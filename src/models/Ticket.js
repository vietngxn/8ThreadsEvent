import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  order_ticketId: String,
  ticketTypeId: String,
  ownerId: String,
  qrCode: String,
  status: String
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model("Tickets", ticketSchema);