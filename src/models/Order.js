import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "vnpay", "credit_card"],
    required: true
  },
  address: { type: String }
}, {
  timestamps: true,
  collection: "Orders"
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);