import { Schema, model, Document, Types } from "mongoose";

export type Category = "food" | "clothing" | "health" | "other";
export type RequestStatus = "open" | "fulfilled";

export interface IHelpRequest extends Document {
  title: string;
  description: string;
  category: Category;
  recipient: Types.ObjectId;
  status: RequestStatus;
  createdAt: Date;
}

const helpRequestSchema = new Schema<IHelpRequest>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["food", "clothing", "health", "other"],
      required: true,
    },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["open", "fulfilled"], default: "open" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const HelpRequest = model<IHelpRequest>(
  "HelpRequest",
  helpRequestSchema,
);
