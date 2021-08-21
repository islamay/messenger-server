const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const corsConfig = require("./config/cors");
const userRoute = require("./routes/user");
const roomRoute = require("./routes/room");
const messageRoute = require('./routes/message')
const authMiddleware = require("./middlewares/auth");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: corsConfig });

const { onConnectionLogic } = require("./socket.logic");

// Using Middleware
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// DB
require("./config/db");

// Using Routes
app.use("/user", userRoute);
app.use("/room", authMiddleware, roomRoute);
app.use("/message", authMiddleware, messageRoute(io));

// Socket.io Stuff
io.on("connection", onConnectionLogic);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
