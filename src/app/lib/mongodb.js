import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://caotrung862005_db_user:caotrung2005@cluster0.hxvoey4.mongodb.net/8ThreadsEvent?retryWrites=true&w=majority";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};