const express = require("express");
const router = express.Router();
const {
  newConversation,
  updateConversation,
  getConversation,
  getMessage,
} = require("../controllers/conversation.controller");

router.get("/allConversation/:username", getConversation);
router.get("/all/:id", getMessage);
router.post("/new", newConversation);
// To work!
router.patch("/update/:id", updateConversation);

module.exports = router;
