const mongoose = require("mongoose");
const { message } = require("./message.model");

const conversation = mongoose.Schema({
  title: {
    type: String,
  },
  message: {
    type: [message],
  },
});

const conversationModel = mongoose.model("Conversation", conversation);
module.exports = { conversationModel, conversation };
