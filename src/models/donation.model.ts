import { Schema, model, Document, Types } from "mongoose";

export interface IDonation extends Document {
  donor: Types.ObjectId;
  request: Types.ObjectId;
  message?: string;
  createdAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    request: {
      type: Schema.Types.ObjectId,
      ref: "HelpRequest",
      required: true,
    },
    message: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const Donation = model<IDonation>("Donation", donationSchema);
