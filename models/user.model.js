const { Schema, model, ObjectId } = require("mongoose");

const user = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: ObjectId, ref: "Post" }],
});

module.exports = model("User", user);
