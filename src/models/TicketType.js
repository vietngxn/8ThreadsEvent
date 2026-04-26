import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    ticketTypeId: {
      type: String,
      required: true
    },
    eventId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    type: {
      type: String, // "pass", "vip", "normal"
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    totalQuantity: {
      type: Number,
      required: true
    },

    soldQuantity: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: "Ticket_types",
    timestamps: true
  }
);

export default mongoose.models.TicketType ||
  mongoose.model("TicketType", ticketTypeSchema);