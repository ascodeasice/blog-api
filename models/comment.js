const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        authorName: { type: String, required: true, default: "anonymous" },
        text: { type: String, required: true, },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", CommentSchema);