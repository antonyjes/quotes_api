import moongoose from "mongoose";

const UserSchema = new moongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    picturePath: {type: String, default: ""},
    role: {type: String, enum: ["USER", "ADMIN"], default: "USER"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    favorites: [{
        type: moongoose.Schema.Types.ObjectId,
        ref: "Favorite"
    }],
    submittedQuotes: [{
        type: moongoose.Schema.Types.ObjectId,
        ref: "SubmittedQuote"
    }]
})

const User = moongoose.model("User", UserSchema);
export default User;