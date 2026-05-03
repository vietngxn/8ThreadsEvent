import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true, index: true },
    method: { type: String, required: true, default: "vnpay" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "VND" },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled"],
      default: "pending",
    },
    paidAt: { type: Date, default: null },
  },
  {
    timestamps: false,
    versionKey: false,
    collection: "Payments",
  },
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
