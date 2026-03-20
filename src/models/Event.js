import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  description: { type: String },
  img: { type: String },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  saleStart: { type: Date },
  saleEnd: { type: Date },

  venue: {
    name: { type: String },
    address: { type: String }
  },

  status: { 
    type: String, 
    enum: ["active", "inactive"], 
    default: "active" 
  },

  createdBy: { type: String }

}, { 
  timestamps: true,
  collection: "Events"
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);