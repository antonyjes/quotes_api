import express from "express";
import { addFavorite, updateDownloadCount, getFavoritesByUser } from "../controllers/favorite.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:userId", verifyToken, getFavoritesByUser);

// CREATE
router.post("/save", verifyToken, addFavorite);
router.post("/update-download", verifyToken, updateDownloadCount);

export default router;

