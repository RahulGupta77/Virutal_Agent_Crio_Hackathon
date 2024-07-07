const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors')
const authRouter = require("./routes/auth.route");
const conversationRouter = require("./routes/conversation.route");
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.options('*',cors())

app.get("/", (req, res) =>
  res.status(200).send("Routes are working properly!")
);

app.use("/auth", authRouter);
app.use("/conversation", conversationRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to Local DB");
  app.listen(process.env.PORT);
});
