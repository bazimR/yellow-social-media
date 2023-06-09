import { Schema, model } from "mongoose";

const postSchema = new Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  reports: {
    type: Array,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  imageUrl:{
    type:String
  },
  Date: {
    type: Date,
  },
});

const Post = model("post", postSchema, "posts");

export default Post;
