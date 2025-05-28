import { Schema, model, Document, Types } from "mongoose";

export interface IDonation extends Document {
  title: string;
  category: string;
  message?: string;
  createdAt: Date;
  donor: Types.ObjectId;
  helpRequest: Types.ObjectId;
}

const donationSchema = new Schema<IDonation>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String },
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    helpRequest: {
      type: Schema.Types.ObjectId,
      ref: "HelpRequest",
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: true } },
);

export const Donation = model<IDonation>("Donation", donationSchema);
