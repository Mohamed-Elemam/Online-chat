import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import MessagesArea from "./MessagesArea";

export interface User {
  _id: string;
  username: string;
  online: boolean;
}
export interface Chat {
  from: string;
  message: string;
  to: string;
  _id: string;
}
const OnlineUsers = () => {
  const [apiData, setApiData] = useState<User[]>([]);
  const [destUser, setDestUser] = useState<User>();

  const [chatMessages, setChatMessages] = useState<Chat[]>([]);
  const userToken = localStorage.getItem("userToken");

  async function getOnlineUsers() {
    const { data } = await axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
      },
    });
    setApiData(data.users);
  }

  async function getMessages(reciverId: { reciverId: User }) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/chat/${reciverId}`,

        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
          },
        }
      );
      console.log(data.chat);
      setChatMessages(data.chat);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Chat not found") {
        setChatMessages([]);
      }
    }
  }

  useEffect(() => {
    getOnlineUsers();
  }, []);

  return (
    <>
      <div className="overflow-y-scroll min-w-[250px] border border-green-400 p-3 rounded-lg h-[60vh] sm:h-[80%]">
        <h3>Online Users</h3>
        <div>
          {apiData?.map((ele) => (
            <div
              key={ele._id}
              className="flex py-4 hover:bg-red-50 hover:cursor-pointer border-b border-gray-200"
              onClick={() => {
                setDestUser(ele);
                getMessages(ele._id);
              }}
            >
              <span className="relative inline-block">
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  className="w-[40px] rounded-full"
                />
                <span className="absolute right-[-15%] top-[-15%] h-[20px] w-[20px] rounded-full border-[3px] border-solid border-white bg-green-500"></span>
              </span>

              <div className="ml-3">{ele.username}</div>
            </div>
          ))}
        </div>
      </div>
      <MessagesArea destUser={destUser} chatMessages={chatMessages} />
    </>
  );
};

export default OnlineUsers;
