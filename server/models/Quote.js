import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: String,
    topic: String,
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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