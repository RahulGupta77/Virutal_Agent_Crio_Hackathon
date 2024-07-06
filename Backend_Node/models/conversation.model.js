const mongoose = require("mongoose");
const { message } = require("./user.model");

const conversation = mongoose.Schema({
  title: {
    type: String,
  },
  message: {
    type: [message],
    default: [],
  },
});

const conversationModel = mongoose.model("Conversation", conversation);
module.exports = { conversationModel, conversation };
