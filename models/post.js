const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, requried: true },
        text: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment", requried: true }],
        isPublic: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", PostSchema);