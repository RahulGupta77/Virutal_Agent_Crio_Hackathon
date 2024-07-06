const { userModel } = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const createdUser = await userModel.create(req.body);
    res.status(200).send(createdUser);
  } catch (err) {
    console.error(err);
  }
};

const loginController = async (req, res) => {
  const user = await userModel.findOne({ username: req.body.username });
  if (user && user.password === req.body.password) {
    return res
      .status(200)
      .send({ verified: true, username: req.body.username });
  }
  res.status(404).send({ verified: false });
};

module.exports = { registerController, loginController };
