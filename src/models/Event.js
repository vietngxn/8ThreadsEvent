import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },

    name: { type: String, required: true },

    categoryId: { type: String, required: true },

    description: { type: String },

    img: { type: String },

    time: {
      event: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
      },
      sale: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
      }
    },

    venue: {
      name: { type: String },
      city: { type: String },
      country: { type: String }
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },

    createdBy: { type: String }
  },
  {
    timestamps: true,
    collection: "Events"
  }
);

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema);