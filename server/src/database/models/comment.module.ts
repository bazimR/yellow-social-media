import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
  },
  isBlocked: {
    type: Boolean,
    default:false,
  }
});

const Comment = model("comment", commentSchema, "comments");

export default Comment;
