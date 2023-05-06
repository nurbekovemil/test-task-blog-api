const { Schema, model, ObjectId } = require("mongoose");

const Post = new Schema({
  created: { type: Date, default: Date.now() },
  content: { type: String, required: true },
  author: { type: ObjectId, ref: "User" },
});

module.exports = model("Post", Post);
