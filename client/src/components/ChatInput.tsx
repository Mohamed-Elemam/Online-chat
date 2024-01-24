import { useContext, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import { User } from "./UsersSideBar";

export default function ChatInput({ destUser }: { destUser: User }) {
  const [text, setText] = useState("");

  const { token } = useContext(AuthContext);
  const { userSocket, getMessages, chatMessages, setChatMessages } =
    useContext(ChatContext);

  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   userSocket?.on("sendMessage", (messageData) => {
  // setMessages((prevMessages) => [...prevMessages, messageData]);
  //     setChatMessages([...chatMessages, messageData]);
  //     console.log(11111111);
  //   });
  // return () => {
  //   userSocket?.off("sendMessage");
  // };
  // }, []);
  useEffect(() => {
    console.log("chatMessages updated:", chatMessages);
  }, [chatMessages]);

  async function sendMessage(destUser: User, message: string) {
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
      // console.log("sended message: ", data.message.messages?.at(-1));

      console.log("chat message before update: ", chatMessages);

      userSocket?.emit("chatMessageXD", {
        message: data.message.messages?.at(-1),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function handleOnEnter(text: string) {
    if (text.length === 0) return;
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
        className="bg-[#4CAF50] rounded-full text-[white] cursor-pointer px-4 py-2 border-[none]"
        onClick={() => {
          handleOnEnter(text);
        }}
      >
        Send
      </button>
    </div>
  );
}
