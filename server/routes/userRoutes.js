const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected Routes
router.route("/profile").get(auth, getProfile).put(auth, updateProfile);

module.exports = router;
