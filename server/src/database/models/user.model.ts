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
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
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
  coverImageUrl: {
    type: String,
  },
});

const User = model("user", userSchema, "users");

export default User;
