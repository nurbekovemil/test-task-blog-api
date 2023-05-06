const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../services/post.service");

// Create post
router.post("/", authMiddleware, createPost);
// Get all posts
router.get("/", getAllPosts);
// Update post by id
router.get("/:id", getPostById);
// Update post by id
router.put("/:id", authMiddleware, updatePost);
// Delete post by id
router.delete("/:id", authMiddleware, deletePost);
// Get user posts by username
router.get("/user/:username", getUserPosts);

module.exports = router;
