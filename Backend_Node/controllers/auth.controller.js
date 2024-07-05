const { userModel } = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const createdUser = await userModel.create(req.body);
    res.status(200).send(createdUser);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { registerController };
