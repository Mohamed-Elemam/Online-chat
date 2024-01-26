import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, OnlineUsersProps } from "../context/ChatContext";
import axios from "axios";

export const useSendMessage = ({
  destUser,
}: {
  destUser: OnlineUsersProps;
}) => {
  const { token } = useContext(AuthContext);
  const { userSocket } = useContext(ChatContext);
  const [text, setText] = useState("");

  async function sendMessage(destUser: OnlineUsersProps, message: string) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/chat",
        {
          message,
          destId: destUser.userId,
          socketId: destUser.socketId,
        },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${token}`,
          },
        }
      );
      userSocket?.emit("addLastMessage", data.message.messages?.at(-1));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function handleOnEnter(text: string) {
    if (text.length === 0) return;
    sendMessage(destUser, text);
    setText("");
  }

  return { sendMessage, handleOnEnter, text, setText };
};
