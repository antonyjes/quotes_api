import express from "express";
import { login, registerUser } from "../controllers/auth.js";

const router = express.Router();

// CREATE
router.post("/login", login);
router.post("/register", registerUser);

export default router;