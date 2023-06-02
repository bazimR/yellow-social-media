import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  friends: {
    type: Array,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  reports: {
    type: Array,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const User = model("user", userSchema, "users");

export default User;
