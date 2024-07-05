const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("Connected to Local DB");
  app.listen(process.env.PORT);
});
