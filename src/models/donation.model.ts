import { Schema, model, Document, Types } from "mongoose";

export interface IDonation extends Document {
  title: string;
  description?: string;
  category: string;
  status: "available" | "claimed" | "completed";
  message?: string;
  createdAt: Date;
  donor: Types.ObjectId;
  recipient?: Types.ObjectId;
}

const donationSchema = new Schema<IDonation>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["available", "claimed", "completed"],
      default: "available",
    },
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true } },
);

export const Donation = model<IDonation>("Donation", donationSchema);
