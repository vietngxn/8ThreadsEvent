import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    voucherId: { type: String, required: true, unique: true },
    voucherName: { type: String, required: true },
    condition: { type: String },
    timeStart: { type: Date },
    timeEnd: { type: Date },
    promotion: { type: String },
    voucherType: { type: String, enum: ["percent", "minus"], required: true },
    value: { type: Number, required: true },
    appliedEvent: { type: [String], default: [] },
  },
  {
    timestamps: false,
    versionKey: false,
    collection: "Vouchers",
  },
);

export default mongoose.models.Voucher ||
  mongoose.model("Voucher", voucherSchema);
