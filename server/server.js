import { config } from "dotenv";
config();
import express from "express";
import { Server } from "socket.io";
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors";
import userRouters from "./src/modules/user/user.routes.js";
import chatRouters from "./src/modules/chat/chat.routes.js";
const app = express();
app.use(cors());
const port = 3000;
dbConnection();
app.use(express.json());
app.get("/", (req, res) => res.send("server is running"));
app.use("/user", userRouters);
app.use("/chat", chatRouters);

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}!`)
);

export const io = new Server(server, { cors: "*" });
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection: ", socket.id);

  socket.on("addNewUser", (userId, username) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id, username });
    console.log("onlineUsers", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message, socketId) => {
    io.to(socketId).emit(message);
  });

  socket.on("chatMessageXD", (message) => {
    console.log(message);
  });
});
