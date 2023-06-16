import { Router } from "express";
import { chackAuth } from "../utils/checkAuth.js";
import { createPost, getAllPosts, getById, getMyPosts, deletePost } from "../controllers/posts.js";

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

// Get User Posts
// http://localhost:5000/api/posts/user/me
router.get('/user/me', chackAuth, getMyPosts)

// Get Post and Delete
// http://localhost:5000/api/posts/:id
router.delete('/:id', chackAuth, deletePost)

export default router;
