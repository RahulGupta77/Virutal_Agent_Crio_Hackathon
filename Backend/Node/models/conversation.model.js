const mongoose = require("mongoose");
const { message } = require("./message.model");

const conversation = mongoose.Schema({
  title: {
    type: String,
  },
  sprint:{
    type:String,
    default:""
  },
  microExperience:{
    type:String,
    default:""
  },
  module:{
    type:String,
    default:""
  },
  milestone:{
    type:String
  },
  message: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
});

const conversationModel = mongoose.model("Conversation", conversation);
module.exports = { conversationModel, conversation };
