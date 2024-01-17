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
  console.log(`Example app listening on port ${port}!`)
);

export const io = new Server(server, { cors: "*" });

io.on("connection", () => {
  console.log("backend io connected");
  io.sockets.emit("11", "everyone");
});
