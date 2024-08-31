import express from "express";
import { getRamdomQuote } from "../controllers/quote.js";

const router = express.Router();

router.get("/random-quote", getRamdomQuote);

export default router;