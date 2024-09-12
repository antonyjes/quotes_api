import Favorite from "../models/Favorite.js";
import User from "../models/User.js";

export const addFavorite = async (req, res) => {
    try {
        const { quoteId, userId } = req.body;
        
        const favorite = await Favorite.findOne({ user: userId, quote: quoteId });

        if (favorite) {
            return res.status(400).json({ message: "Quote already added to favorites" });
        }

        const newFavorite = new Favorite({
            user: userId,
            quote: quoteId
        });

        const savedFavorite = await newFavorite.save();

        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { favorites: savedFavorite._id } },
            { new: true }
        );

        res.status(201).json(savedFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}