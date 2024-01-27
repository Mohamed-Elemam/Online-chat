import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, OnlineUsersProps } from "../context/ChatContext";
import axios from "axios";
import { toast } from "react-toastify";

export const useSendMessage = ({
  destUser,
}: {
  destUser: OnlineUsersProps;
}) => {
  const { token } = useContext(AuthContext);
  const { userSocket } = useContext(ChatContext);
  const [text, setText] = useState("");

  async function sendMessage(destUser: OnlineUsersProps, message: string) {
    console.log(destUser.userId, destUser.socketId, message);
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
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      axios.isAxiosError(error) && toast.error(error.response?.data.message);
    }
  }

  function handleOnEnter(text: string) {
    if (text.length === 0) return;
    sendMessage(destUser, text);
    setText("");
  }

  return { sendMessage, handleOnEnter, text, setText };
};
