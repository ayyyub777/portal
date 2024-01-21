const express = require("express");
const router = express.Router();
const { getMessagesById } = require("../controllers/messageController");
const auth = require("../middleware/auth");

router.route("/messages/:userId").get(auth, getMessagesById);

module.exports = router;
