import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const VenueSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    type: {
      type: String,
      enum: ["CLASSROOM", "LAB", "AUDITORIUM", "GROUND"],
      required: true,
    },
    capacity: { type: Number, required: true, min: 1 },
    location: { type: Schema.Types.Mixed },
    facilities: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      required: true,
    },
  },
  { timestamps: true },
);

export type VenueDocument = InferSchemaType<typeof VenueSchema>;

export const Venue: Model<VenueDocument> =
  (models.Venue as Model<VenueDocument>) ||
  model<VenueDocument>("Venue", VenueSchema);
