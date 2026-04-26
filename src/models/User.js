import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    phone: { type: String },
    avatar: { type: String },
    avatarPublicId: { type: String, default: null },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    authProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    providerId: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },

    cart: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);