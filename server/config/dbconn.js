const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const dbConn = asyncHandler(async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

module.exports = dbConn;
