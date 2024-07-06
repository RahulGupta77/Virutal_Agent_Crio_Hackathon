const { userModel } = require("../models/user.model");
const { conversationModel } = require("../models/conversation.model");
const { messageModel } = require("../models/message.model");

const getConversation = async (req, res) => {
  const user = await userModel
    .findOne({ username: req.body.username })
    .populate("conversations");
  return res.status(200).send(user);
};

const getMessage = async (req, res) => {
  const conversation = await conversationModel
    .findOne({ _id: req.params.id })
    .populate("message");
  return res.status(200).send(conversation);
};

const newConversation = async (req, res) => {
  try {
    const message = await messageModel.create({
      question: req.body.question,
      response: req.body.response,
    });

    const converse = await conversationModel.create({
      title: req.body.question.split(" ").slice(0, 5).join(" "),
    });

    converse.message.push(message._id);
    await converse.save();
    const savedUser = await userModel.findOne({ username: req.body.username });
    savedUser.conversations.push(converse._id);
    await savedUser.save();

    res.status(200).send(converse);
  } catch (err) {
    res.status(500).send(err);
  }
  //   await converse.message.push({
  //     question: req.body.question,
  //     response: req.body.response,
  //   });
  // await conversationModel.findOneAndUpdate(
  //   { _id: converse._id },
  //   {
  //     $push: {
  //       message: {
  //         question: req.body.question,
  //         response: req.body.response,
  //       },
  //     },
  //   },
  //   { new: true }
  // );

  //   const updatedUser = await userModel.findOne({ username: req.body.username });
  //   updatedUser.conversations.push(converse._id);
  // const updatedUser = await userModel.findOneAndUpdate(
  //   { username: req.body.username },
  //   { $push: { conversations: converse._id } },
  //   { new: true }
  // );

  // if (!updatedUser) {
  //   await conversationModel.findByIdAndDelete(converse._id);
  // } else {
  //   console.log("Updated user:", updatedUser);
  // }
  // res
  //   .status(201)
  //   .send({ conversationId: converse._id, userModel: updatedUser });
};

const updateConversation = async (req, res) => {
  const id = req.params.id;
  console.log("params", id);
  const converse = await conversationModel.findOne({ _id: id });
  console.log(converse);
  //   await converse.message.push({
  //     question: req.body.question,
  //     response: req.body.response,
  //   });
  const newConverse = await conversationModel.findOneAndUpdate(
    { _id: converse._id },
    {
      $push: {
        message: {
          question: req.body.question,
          response: req.body.response,
        },
      },
    },
    { new: true }
  );
  console.log(newConverse);

  res.status(200).send(newConverse);
};

module.exports = {
  newConversation,
  updateConversation,
  getConversation,
  getMessage,
};
