import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  avatar: String,
  role: String,
  status: String,
  password: String,
  cart: [
    {
      itemId: String,
      quantity: Number
    }
  ]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("Users", userSchema);