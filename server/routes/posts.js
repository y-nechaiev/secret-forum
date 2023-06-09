import { Router } from "express";
import { chackAuth } from "../utils/checkAuth.js";
import { createPost, getAllPosts, getById } from "../controllers/posts.js";

const router = new Router();

// Create Post
// http://localhost:5000/api/posts
router.post("/", chackAuth, createPost);

// Get Posts
// http://localhost:5000/api/posts
router.get('/', getAllPosts)

// Get Post By Id
// http://localhost:5000/api/posts/:id
router.get('/:id', getById)

export default router;
