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
const Message = require("./model/Message");
const ws = require("ws");
const jwt = require("jsonwebtoken");

dbConn();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/messageRoutes"));

app.use(notFound);
app.use(errorHandler);

const server = app.listen(5500);

const wss = new ws.WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("jwt="));
    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, (err, userData) => {
          if (err) throw err;
          const { userId, name } = userData;
          connection.userId = userId;
          connection.name = name;
        });
      }
    }
  }

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, text } = messageData;
    if (recipient && text) {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
      });
      [...wss.clients]
        .filter((client) => client.userId === recipient)
        .forEach((client) =>
          client.send(
            JSON.stringify({
              text,
              sender: connection.userId,
              recipient,
              _id: messageDoc._id,
            })
          )
        );
    }
  });

  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((client) => ({
          userId: client.userId,
          name: client.name,
        })),
      })
    );
  });
});
