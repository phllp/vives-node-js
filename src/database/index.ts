import mongoose from "mongoose";

export async function mongoConnect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("[MongoDB] Connected successfully");
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    process.exit(1);
  }
}
