const express = require("express");
const router = express.Router();
const { registerController } = require("../controllers/auth.controller");

router.post("/register", registerController);

router.post("/login", () => {
  console.log("Login");
});

module.exports = router;
