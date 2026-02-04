import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const AuditLogSchema = new Schema(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "User" },
    actorType: { type: String, enum: ["USER", "SYSTEM"], required: true },
    action: { type: String, required: true },
    entityType: {
      type: String,
      enum: ["BOOKING", "VENUE", "USER"],
      required: true,
    },
    entityId: { type: Schema.Types.ObjectId, required: true },
    previousState: { type: Schema.Types.Mixed },
    newState: { type: Schema.Types.Mixed },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  { timestamps: false },
);

export type AuditLogDocument = InferSchemaType<typeof AuditLogSchema>;

export const AuditLog: Model<AuditLogDocument> =
  (models.AuditLog as Model<AuditLogDocument>) ||
  model<AuditLogDocument>("AuditLog", AuditLogSchema);
