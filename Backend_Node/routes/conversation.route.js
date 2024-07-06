const express = require("express");
const router = express.Router();
const {
  newConversation,
  updateConversation,
} = require("../controllers/conversation.controller");

router.post("/new", newConversation);
router.patch("/update/:id", updateConversation);

module.exports = router;
