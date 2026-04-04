import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  ticketTypeId: { type: String, required: true },
  orderId: { type: String, required: true },
  ownerId: { type: String, required: true },
  qrCode: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["valid", "invalid", "pending", "used"],
    default: "pending"
  }
}, {
  timestamps: true
});

export default mongoose.models.Ticket ||
  mongoose.model("Ticket", ticketSchema, "Tickets");