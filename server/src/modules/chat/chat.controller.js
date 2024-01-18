import { ChatModel } from "./../../../database/models/chat.model.js";
import { UserModel } from "./../../../database/models/user.model.js";
import { io } from "./../../../server.js";

export const sendMessage = async (req, res) => {
  console.log(req.user);
  const { message, destId } = req.body;
  const destUser = await UserModel.findById(destId);
  if (!destUser) {
    res.status(404).json({ message: "In-valid user" });
  }

  const chat = await ChatModel.findOne({
    $or: [
      { sender: req.user._id, receiver: destId },
      { sender: destId, receiver: req.user._id },
    ],
  }).populate(["sender", "receiver"]);

  if (!chat) {
    const chat = await ChatModel.create({
      sender: req.user._id,
      receiver: destId,
      message: {
        from: req.user._id,
        to: destId,
        message: message,
      },
    });
    io.to(destUser.socketId).emit("receiveMessage", message);
    return res.status(201).json({ status: "Done", message: chat });
  }
  chat.messages.push({
    from: req.user._id,
    to: destId,
    message: message,
  });
  await chat.save();
  io.to(destUser.socketId).emit("receiveMessage", message);

  return res.status(200).json({ status: "Done", message: chat });
};

export const getMessages = async (req, res) => {
  const { receiverId } = req.params;

  const chat = await ChatModel.findOne({
    $or: [
      { sender: req.user._id, receiver: receiverId },
      { sender: receiverId, receiver: req.user._id },
    ],
  }).populate(["sender", "receiver"]);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  return res.status(200).json({ messages: "done", chat: chat.messages });
};
