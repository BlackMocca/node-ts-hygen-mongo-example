import mongoose, { Schema, Document } from "mongoose";
import MUUID from "uuid-mongodb";

export interface User extends Document {
  id: string;
  email: String;
  firstName: String;
  lastName: String;
}

const userSchema: Schema = new Schema(
  {
    id: {
      type: "object",
      value: { type: "Buffer" },
      required: true,
      default: MUUID.v4(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
    _id: false,
  }
);

export const MgoUser = mongoose.model<User>("User", userSchema);
