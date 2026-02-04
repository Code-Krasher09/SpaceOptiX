import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const BookingSchema = new Schema(
  {
    requesterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["ACADEMIC", "INSTITUTIONAL", "CULTURAL", "SPORTS"],
      required: true,
    },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    expectedAttendees: { type: Number, min: 0 },
    status: {
      type: String,
      enum: [
        "DRAFT",
        "SUBMITTED",
        "PENDING_PRE_APPROVAL",
        "PENDING_APPROVAL",
        "APPROVED",
        "REJECTED",
        "CANCELLED",
      ],
      default: "DRAFT",
      required: true,
    },
  },
  { timestamps: true },
);

BookingSchema.index({ venueId: 1, startAt: 1, endAt: 1 });
BookingSchema.index({ requesterId: 1, status: 1 });

export type BookingDocument = InferSchemaType<typeof BookingSchema>;

export const Booking: Model<BookingDocument> =
  (models.Booking as Model<BookingDocument>) ||
  model<BookingDocument>("Booking", BookingSchema);
