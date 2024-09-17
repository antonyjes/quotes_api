import express from "express";
import { createQuote, getAllQuotes, getAuthors, getQuote, getRamdomQuote, getTopics } from "../controllers/quote.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/all", getAllQuotes);
router.get("/random-quote", getRamdomQuote);
router.get("/authors", getAuthors);
router.get("/topics", getTopics);
router.get("/:quoteId", getQuote);

// CREATE
router.post("/save", verifyToken, createQuote);

export default router;