const { userModel } = require("../models/user.model");
const { conversationModel } = require("../models/conversation.model");

const newConversation = async (req, res) => {
  const converse = await conversationModel.create({
    title: req.body.question.split(" ").slice(0, 5).join(" "),
  });

  //   await converse.message.push({
  //     question: req.body.question,
  //     response: req.body.response,
  //   });
  await conversationModel.findOneAndUpdate(
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

  //   const updatedUser = await userModel.findOne({ username: req.body.username });
  //   updatedUser.conversations.push(converse._id);
  const updatedUser = await userModel.findOneAndUpdate(
    { username: req.body.username },
    { $push: { conversations: converse._id } },
    { new: true }
  );

  if (!updatedUser) {
    console.log("No user found with username:");
  } else {
    console.log("Updated user:", updatedUser);
  }
  res
    .status(201)
    .send({ conversationId: converse._id, userModel: updatedUser });
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

module.exports = { newConversation, updateConversation };
