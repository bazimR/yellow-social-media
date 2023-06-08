import { Schema, model } from "mongoose";

const storySchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  Date: Date,
});

const Story = model("story", storySchema, "stories");

export default Story;
