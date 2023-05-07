const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
