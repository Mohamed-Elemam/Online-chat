import { useContext, useState } from "react";
import InputEmoji from "react-input-emoji";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import { User } from "./UsersSideBar";

export default function ChatInput({ destUser }: { destUser: User }) {
  const [text, setText] = useState("");

  const { token, userId } = useContext(AuthContext);
  const { userSocket } = useContext(ChatContext);

  async function sendMessage(destUser: User, message: string) {
    try {
      console.log(message, "\n", destUser.userId);
      const { data } = await axios.post(
        "http://localhost:3000/chat",
        {
          destId: destUser.userId,
          message,
        },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${token}`,
          },
        }
      );
      console.log(message, "\n", data, "\n", destUser.userId);

      userSocket?.emit("chatMessage", {
        to: destUser.userId,
        message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function handleOnEnter(text: string) {
    sendMessage(destUser, text);
    setText("");
  }

  return (
    <div className="flex gap-3 p-2">
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />
      <button
        className="bg-[#4CAF50] text-[white] rounded cursor-pointer px-4 py-2 border-[none]"
        onClick={() => {
          handleOnEnter(text);
        }}
      >
        Send
      </button>
    </div>
  );
}
