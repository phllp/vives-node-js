import { Schema, model, Document } from "mongoose";

export type UserRole = "donor" | "recipient";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["donor", "recipient"], required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const User = model<IUser>("User", userSchema);
