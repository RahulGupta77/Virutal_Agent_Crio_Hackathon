const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const conversationRouter = require("./routes/conversation.route");
require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).send("Routes are working properly!")
);

app.use("/auth", authRouter);
app.use("/conversation", conversationRouter);

async function connection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
  } catch (err) {
    console.log(err.message);
  }
}

connection()
app.listen(process.env.PORT, () =>
  console.log("server is running", process.env.PORT)
);
