import mongoose, { Schema, Document } from "mongoose";
import uuid, { v4 as uuidv4 } from "uuid";
import { UUID } from "./types";

export interface User extends Document {
  id: string;
  email: String;
  firstName: String;
  lastName: String;
}

const userSchema: Schema = new Schema({
  id: {
    type: UUID,
    required: true,
    default: uuidv4(),
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
});

userSchema.set("toObject", { getters: true });
userSchema.set("toJSON", { getters: true });

export const MgoUser = mongoose.model<User>("User", userSchema);
