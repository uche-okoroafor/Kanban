"use strict";

var colors = require("colors");

var path = require("path");

var http = require("http");

var express = require("express");

var socketio = require("socket.io");

var _require = require("./middleware/error"),
  notFound = _require.notFound,
  errorHandler = _require.errorHandler;

var connectDB = require("./db");

var _require2 = require("path"),
  join = _require2.join;

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var authRouter = require("./routes/auth");

var userRouter = require("./routes/user");

var checkRouter = require("./routes/plugins");

var pluginRouter = require("./routes/plugins");

var json = express.json,
  urlencoded = express.urlencoded;
connectDB();
var app = express();
var server = http.createServer(app);
var io = socketio(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", function (socket) {
  console.log("connected");
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express["static"](join(__dirname, "public")));
app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/check", checkRouter);
app.use("/plugins", pluginRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express["static"](path.join(__dirname, "/client/build")));
  app.get("*", function (req, res) {
    return res.sendFile(
      path.resolve(__dirname),
      "client",
      "build",
      "index.html"
    );
  });
} else {
  app.get("/", function (req, res) {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler); // Handle unhandled promise rejections

process.on("unhandledRejection", function (err, promise) {
  console.log("Error: ".concat(err.message).red); // Close server & exit process

  server.close(function () {
    return process.exit(1);
  });
});
module.exports = {
  app: app,
  server: server,
};
