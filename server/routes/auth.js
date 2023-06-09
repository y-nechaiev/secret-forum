import { Router } from "express";
import { register, getme, login } from "../controllers/auth.js";
import { chackAuth } from "../utils/checkAuth.js";

const router = new Router();

// Registration
// http://localhost:5000/api/auth/register
router.post("/register", register);

// Login
// http://localhost:5000/api/auth/login
router.post("/login", login);

// Get Me
// http://localhost:5000/api/auth/me
router.get("/me", chackAuth, getme);

export default router;
