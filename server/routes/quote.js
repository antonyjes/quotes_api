import express from "express";
import { createQuote, getAllQuotes, getRamdomQuote } from "../controllers/quote.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/all", getAllQuotes);
router.get("/random-quote", getRamdomQuote);

// CREATE
router.post("/save", verifyToken, createQuote);

export default router;