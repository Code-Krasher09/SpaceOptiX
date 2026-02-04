import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    affiliation: {
      type: String,
      enum: ["STUDENT", "FACULTY", "STAFF"],
      required: true,
    },
    role: {
      type: String,
      enum: ["Root", "SystemAdmin", "User", "Guest"],
      required: true,
      default: "User",
    },
    department: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

export const User: Model<UserDocument> =
  (models.User as Model<UserDocument>) ||
  model<UserDocument>("User", UserSchema);
