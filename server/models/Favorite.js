import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Favorite = mongoose.model("Favorite", FavoriteSchema);
export default Favorite;