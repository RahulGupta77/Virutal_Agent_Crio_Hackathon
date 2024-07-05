const mongoose = require("mongoose");
const { conversation } = require("./conversation.model");

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
  conversations: {
    type: [conversation],
    default: [],
  },
});

const userModel = mongoose.model("User", User);
module.exports = { userModel };
