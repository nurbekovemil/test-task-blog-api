const Post = require("../models/post.model");
const User = require("../models/user.model");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ content, author: req.user.id });
    await post.save();
    return res.json({ post });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Post.findOne({ _id });
    return res.json({ post });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "username");
    return res.json({ posts });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { content } = req.body;
    const post = await Post.findOneAndUpdate(
      { author: req.user.id, _id },
      { content },
      { new: true }
    );
    return res.json({ post });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Post.findOneAndDelete({ author: req.user.id, _id });
    return res.json({ post });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    const posts = await Post.find({ author: user.id }).populate(
      "author",
      "username"
    );
    return res.json({ posts });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
  getUserPosts,
};
