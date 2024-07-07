const { userModel } = require("../models/user.model");
const { conversationModel } = require("../models/conversation.model");
const { messageModel } = require("../models/message.model");

const getConversation = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ username: req.params.username })
      .populate("conversations").select("conversations");
    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getMessage = async (req, res) => {
  try {
    const conversation = await conversationModel
      .findOne({ _id: req.params.id })
      .populate("message");
    return res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const newConversation = async (req, res) => {
  try {
    const message = await messageModel.create({
      question: req.body.query,
      response: req.body.response,
    });

    const converse = await conversationModel.create({
      title: req.body.query.split(" ").slice(0, 5).join(" "),
      sprint:req.body.sprint,
      microExperience:req.body.microExperience,
      module:req.body.module,
      milestone:req.body.milestone,
      
    });

    converse.message.push(message._id);
    await converse.save();
    const savedUser = await userModel.findOne({ username: req.body.username });
    savedUser.conversations.push(converse._id);
    await savedUser.save();

    res.status(200).send({title:converse.title,id:converse._id});
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateConversation = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await messageModel.create({
      question: req.body.question,
      response: req.body.response,
    });
    const converse = await conversationModel.findOne({ _id: id });
    converse.message.push(message._id);
    await converse.save();

    res.status(200).send(converse);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  newConversation,
  updateConversation,
  getConversation,
  getMessage,
};
