const { userModel } = require("../models/user.model");
const { conversationModel } = require("../models/conversation.model");

const newConversation = async (req, res) => {
  const converse = await conversationModel.create({
    title: req.body.question.split(" ").slice(0, 5).join(" "),
  });
  converse.message.push({
    question: req.body.question,
    response: req.body.response,
  });
  const updatedUser = await userModel.findOne({ username: req.body.username });
  updatedUser.conversations.push(converse);
  res.status(201).send(converse);
};

module.exports = { newConversation };
