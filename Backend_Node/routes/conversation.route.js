const express = require("express");
const router = express.Router();
const { newConversation } = require("../controllers/conversation.controller");

router.post("/new", newConversation);

module.exports = router;
