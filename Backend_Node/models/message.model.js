const { timeStamp } = require("console");
const mongoose = require("mongoose");

const message = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

const messageModel = mongoose.model("Message", message);
module.exports = { messageModel, message };
