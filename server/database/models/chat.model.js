import { Schema, Types, model } from "mongoose";

const chatSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "UserChat",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "UserChat",
      required: true,
    },
    messages: [
      {
        from: {
          type: Types.ObjectId,
          ref: "UserChat",
          required: true,
        },
        to: {
          type: Types.ObjectId,
          ref: "UserChat",
          required: true,
        },
        message: { type: String, required: true },
        time: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const ChatModel = model("Chat", chatSchema);
