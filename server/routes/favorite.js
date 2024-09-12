import express from "express";
import { addFavorite } from "../controllers/favorite.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/save", addFavorite);

export default router;

