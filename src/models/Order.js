import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  totalAmount: Number,
  status: String,
  paymentMethod: String
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Orders", orderSchema);