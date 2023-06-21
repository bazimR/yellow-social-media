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
  following: {
    type: Array,
  },
  follower: {
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
  profileUrl: {
    type: String,
  },
  biography: {
    type: String,
  },
  loggedBy: {
    type: String,
  },
  coverImage: {
    type: String,
  },
});

const User = model("user", userSchema, "users");

export default User;
