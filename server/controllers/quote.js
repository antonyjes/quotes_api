import Quote from "../models/Quote.js";
import User from "../models/User.js";

export const getRamdomQuote = async (req, res) => {
    try {
        const quotes = await Quote.find();        
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        res.status(200).json(quote);
    } catch (error) {
        console.log(error);
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
        const { content, topic, author, bgPath, submittedBy } = req.body;

        const searchContent = await Quote.findOne({ content });
        const searchBgPath = await Quote.findOne({ bgPath });

        if (searchContent && searchBgPath) {
            return res.status(400).json({ message: "Quote already exists" });
        }
        
        const newQuote = new Quote({
            content,
            author,
            bgPath,
            topic: topic || "All",
            submittedBy: submittedBy || null
        })
        
        const savedQuote = await newQuote.save();

        if (submittedBy) {
            const user = await User.findByIdAndUpdate(submittedBy, {
                $push: {
                    submittedQuotes: savedQuote._id
                }
            })
        }

        res.status(201).json(savedQuote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAuthors = async (req, res) => {
    try {
        const authors = await Quote.distinct("author");
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTopics = async (req, res) => {
    try {
        const topics = await Quote.distinct("topic");
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}