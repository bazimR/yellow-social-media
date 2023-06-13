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
      type:Date
  }
});
