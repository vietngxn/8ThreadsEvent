import mongoose from "mongoose";

const orderTicketSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  orderId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: "OrderTickets"
});

export default mongoose.models.OrderTicket || mongoose.model("OrderTicket", orderTicketSchema);