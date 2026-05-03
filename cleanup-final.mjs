import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

await mongoose.connect(uri);

// Remove all extra fields
const result = await mongoose.connection.db.collection("Payments").updateMany(
  {},
  {
    $unset: {
      createdAt: 1,
      updatedAt: 1,
      __v: 1,
      transactionNo: 1,
      rawResponse: 1,
    },
  },
);

console.log("Cleanup result:", result.modifiedCount, "documents updated");

// Verify
const sample = await mongoose.connection.db.collection("Payments").findOne({});
if (sample) {
  const fields = Object.keys(sample);
  console.log(
    `Sample document has ${fields.length} fields:`,
    fields.join(", "),
  );
}

await mongoose.disconnect();
