const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: String,
    article:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

})

module.exports = mongoose.model("Comment", commentSchema)