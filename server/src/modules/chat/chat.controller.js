import { ChatModel } from "./../../../database/models/chat.model";
export const sendMessage = async (req, res) => {
  const { message, sender, receiver } = req.body;
  //sender ==>from context
  //
  try {
    const newMessage = new ChatModel({ message, sender, receiver });
    await newMessage.save();
    res.status(201).json({ status: "Success", message: newMessage });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};
