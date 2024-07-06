const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route");
const conversationRouter = require("./routes/conversation.route");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).send("Routes are working properly!")
);

app.use("/auth", authRouter);
app.use("/conversation", conversationRouter);
mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("Connected to Local DB");
  app.listen(process.env.PORT);
});
