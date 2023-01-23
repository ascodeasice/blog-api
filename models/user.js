const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Basically, I'm the only user(ascodeasice)
const UserSchema = new Schema({
    username: { type: String, requried: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);