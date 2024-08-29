import mongoose from "mongoose";

const SubmittedQuoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: String,
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
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

const SubmittedQuote = mongoose.model("SubmittedQuote", SubmittedQuoteSchema);
export default SubmittedQuote;