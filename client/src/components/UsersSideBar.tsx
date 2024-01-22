import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import MessagesArea from "./MessagesArea";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, OnlineUsersProps } from "../context/ChatContext";

export interface User {
  userId: string | null;
  username: string | null;
  // online: boolean;
}
export interface Chat {
  from: string;
  message: string;
  to: string;
  _id: string;
}
const UsersSideBar = () => {
  const { token, username, userId } = useContext(AuthContext);
  const { userSocket, onlineUsers } = useContext(ChatContext);

  const [destUser, setDestUser] = useState<User>();
  const [chatMessages, setChatMessages] = useState<Chat[]>([]);

  const filteredOnlineUser: OnlineUsersProps[] | null = onlineUsers?.filter(
    (user) => user.userId !== userId
  );
  async function getMessages(receiverId) {
    console.log(receiverId);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/chat/${receiverId}`,

        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${token}`,
          },
        }
      );
      console.log(data);
      setChatMessages(data.chat);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Chat not found") {
        setChatMessages([]);
      }
    }
  }
  // useEffect(() => {
  //   userSocket?.on("receiveMessage", getMessages());
  // }, [userSocket]);

  return (
    <>
      <h3 className="text-xl font-medium">
        Online Users ({onlineUsers?.length})
      </h3>
      <div className="overflow-y-scroll min-w-[250px] border border-purple-700 p-3 rounded-lg h-[60vh] sm:h-[80%]">
        <div>
          {filteredOnlineUser?.map((user) => (
            <div
              key={user.userId}
              className="flex py-4 hover:bg-red-50 hover:cursor-pointer border-b border-gray-200"
              onClick={() => {
                if (user) {
                  setDestUser({ userId: user.userId, username: user.username });
                  getMessages(user?.userId);
                }
              }}
            >
              <span className="relative inline-block">
                <img
                  src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  className="w-[40px] rounded-full"
                />
                {user.socketId && (
                  <span className="absolute right-[-15%] top-[-15%] h-[20px] w-[20px] rounded-full border-[3px] border-solid border-white bg-green-500"></span>
                )}
              </span>

              <div className="ml-3">{user.username}</div>
            </div>
          ))}
        </div>
      </div>
      <MessagesArea destUser={destUser} chatMessages={chatMessages} />
    </>
  );
};

export default UsersSideBar;
