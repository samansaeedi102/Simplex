import { model, Schema, Types } from "mongoose";

export type DurationType = 6 | 1 | 2 | 3;
export const durationEnum = [6, 1, 2, 3];
export const phaseEmun = ["processing", "failed", "finished"];
export type PhaseType = "processing" | "failed" | "finished";

export interface IPurchase {
  description: string;
  user: Types.ObjectId;
  duration: DurationType;
  amount: number;
  authority: string;
  from: Date;
  to: Date;
  verified: boolean;
  phase: PhaseType;
}

export const PurchaseSchema = new Schema<IPurchase>({
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  from: Date,
  to: Date,
  verified: Boolean,
  phase: {
    type: String,
    enum: phaseEmun,
    default: "processing",
  },
  amount: Number,
  authority: String,
  duration: {
    type: Number,
    enum: durationEnum,
  },
}, {
  timestamps: true,
});

export const PurchaseModel = model<IPurchase>("purchase", PurchaseSchema);