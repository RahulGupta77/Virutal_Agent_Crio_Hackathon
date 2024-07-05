const mongoose = require("mongoose");
const { message } = require("./user.model");

const conversation = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: [message],
  },
});

const conversationModel = mongoose.model("Conversation", conversation);
module.exports = { conversationModel, conversation };
