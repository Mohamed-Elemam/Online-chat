import express from "express";
import { Server } from "socket.io";
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors";
import userRouters from "./src/modules/user/user.routes.js";
const app = express();
app.use(cors());
const port = 3000;
dbConnection();
app.use(express.json());
app.get("/", (req, res) => res.send("server is running"));
app.use("/user", userRouters);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

export const io = new Server(server, { cors: "*" });
// const socket = io("http://localhost:3000");
io.on("connection", () => {
  console.log("backend io connected");
  io.sockets.emit("11", "everyone");
});
