import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: String,
    bgPath: String,
    topic: {
        type: String,
        default: "All"
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Quote = mongoose.model("Quote", QuoteSchema);
export default Quote;