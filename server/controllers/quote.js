import Quote from "../models/Quote.js";

export const getRamdomQuote = async (req, res) => {
    try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuote = async (req, res) => {
    try {
        const { quoteId } = req.params;
        const quote = await Quote.findById(quoteId);
        res.status(200).json(quote); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createQuote = async (req, res) => {
    try {
        const { content, author, bgPath } = req.body;
        const newQuote = new Quote({
            content,
            author,
            bgPath
        })
        const savedQuote = await newQuote.save();
        res.status(201).json(savedQuote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}