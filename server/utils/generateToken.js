const jwt = require("jsonwebtoken");

const generateToken = (res, userId, name) => {
  const token = jwt.sign({ userId, name }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
