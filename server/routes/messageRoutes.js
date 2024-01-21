const express = require("express");
const router = express.Router();
const { getMessagesById } = require("../controllers/messageController");

router.get("/messages/:userId", getMessagesById);

module.exports = router;
