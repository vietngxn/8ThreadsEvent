import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    eventId: { type: String },
    items: { type: Array, default: [] },
    subtotal: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
    voucherId: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
    versionKey: false,
    collection: "Orders",
  },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
