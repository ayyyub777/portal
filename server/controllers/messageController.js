const asyncHandler = require("express-async-handler");
const Message = require("../model/Message");
const jwt = require("jsonwebtoken");

async function getUserInfoFromRequest(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, {}, (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    } else {
      reject("no token");
    }
  });
}

const getMessagesById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const userInfo = await getUserInfoFromRequest(req);
  const ourUserId = userInfo.userId;
  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });
  res.json(messages);
});

module.exports = { getMessagesById };
