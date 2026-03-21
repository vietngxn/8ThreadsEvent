import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  avatar: { type: String },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  password: { type: String, required: true },
  cart: { type: Array, default: [] }
}, {
  timestamps: true,
  collection: "Users"
});

export default mongoose.models.User || mongoose.model("User", userSchema);