import express from "express";
import { addFavorite, updateDownloadCount } from "../controllers/favorite.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/save", verifyToken, addFavorite);
router.post("/update-download", verifyToken, updateDownloadCount);

export default router;

