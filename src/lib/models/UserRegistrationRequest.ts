import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const UserRegistrationRequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    affiliation: {
      type: String,
      enum: ["STUDENT"],
      required: true,
      default: "STUDENT",
    },
    token: { type: String, required: true, unique: true },
    validUntil: { type: Date, required: true },
  },
  { timestamps: true },
);

export type UserRegistrationRequestDocument = InferSchemaType<
  typeof UserRegistrationRequestSchema
>;

export const UserRegistrationRequest: Model<UserRegistrationRequestDocument> =
  (models.UserRegistrationRequest as Model<UserRegistrationRequestDocument>) ||
  model<UserRegistrationRequestDocument>(
    "UserRegistrationRequest",
    UserRegistrationRequestSchema,
  );
