const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  ],
});

const userModel = mongoose.model("User", User);
module.exports = { userModel };
