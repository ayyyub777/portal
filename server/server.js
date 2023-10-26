require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const { notFound, errorHandler } = require("./middleware/catchError");
const dbConn = require("./config/dbconn");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

dbConn();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", require("./routes/userRoutes"));

app.use(notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
