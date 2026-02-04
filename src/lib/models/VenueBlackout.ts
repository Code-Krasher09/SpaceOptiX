import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const VenueBlackoutSchema = new Schema(
  {
    venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    reason: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type VenueBlackoutDocument = InferSchemaType<typeof VenueBlackoutSchema>;

export const VenueBlackout: Model<VenueBlackoutDocument> =
  (models.VenueBlackout as Model<VenueBlackoutDocument>) ||
  model<VenueBlackoutDocument>("VenueBlackout", VenueBlackoutSchema);
