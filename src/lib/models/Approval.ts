import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const ApprovalSchema = new Schema(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    approverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, enum: ["approve", "reject"], required: true },
    remarks: { type: String, trim: true },
    actionAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: false },
);

export type ApprovalDocument = InferSchemaType<typeof ApprovalSchema>;

export const Approval: Model<ApprovalDocument> =
  (models.Approval as Model<ApprovalDocument>) ||
  model<ApprovalDocument>("Approval", ApprovalSchema);
