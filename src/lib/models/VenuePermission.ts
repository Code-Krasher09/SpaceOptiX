import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const VenuePermissionSchema = new Schema(
  {
    venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    code: {
      type: String,
      enum: ["VENUE_BLACKOUT", "BOOKING_PREAPPROVAL", "BOOKING_APPROVAL"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      required: true,
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

VenuePermissionSchema.index(
  { venueId: 1, userId: 1, code: 1 },
  { unique: true },
);

export type VenuePermissionDocument = InferSchemaType<
  typeof VenuePermissionSchema
>;

export const VenuePermission: Model<VenuePermissionDocument> =
  (models.VenuePermission as Model<VenuePermissionDocument>) ||
  model<VenuePermissionDocument>("VenuePermission", VenuePermissionSchema);
