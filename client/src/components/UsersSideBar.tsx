import { useContext, useEffect, useState } from "react";
import MessagesArea from "./MessagesArea";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, OnlineUsersProps } from "../context/ChatContext";
import { BiMenuAltRight } from "react-icons/bi";

export interface ChatMessagesProps {
  from: string;
  message: string;
  to: string;
  _id: string;
  time: string;
}

const UsersSideBar = () => {
  const { userId } = useContext(AuthContext);
  const { onlineUsers, userSocket, chatMessages, getMessages } =
    useContext(ChatContext);

  const [destUser, setDestUser] = useState<OnlineUsersProps>();
  const [width, setWidth] = useState<string>("w-[250px]");

  const filteredOnlineUser: OnlineUsersProps[] =
    onlineUsers?.filter((user) => user.userId !== userId) || [];

  useEffect(() => {
    if (userSocket) {
      userSocket.on("receiveMessage", () => {
        destUser && getMessages!(destUser!.userId);
      });
    }

    return () => {
      if (userSocket) {
        userSocket.off("receiveMessage");
      }
    };
  }, [userSocket, getMessages, destUser]);

  const randomColor = (index: number) => {
    const colors: string[] = [
      "bg-orange-500",
      "bg-teal-500",
      "bg-pink-500",
      "bg-purple-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <div>
        <div className="bg-blue-300 text-right">
          <button
            className="text-3xl border border-[#eee] text-white  cursor-pointer"
            onClick={() => setWidth(width === "w-0" ? "w-[250px]" : "w-0")}
          >
            <BiMenuAltRight />
          </button>
        </div>
        <h3 className="text-2xl font-medium my-2 relative">
          Online Users ({onlineUsers?.length})
        </h3>
      </div>
      <div className="flex  gap-2 ">
        <div>
          <div
            className={`${width} h-100  transition duration-[1.5s] z-10 overflow-hidden  border border-red-700`}
          >
            <div>
              {filteredOnlineUser?.map((user, index) => (
                <div
                  key={user.userId}
                  className="flex py-4 px-2 hover:bg-green-50 hover:cursor-pointer border-b border-gray-200"
                  onClick={() => {
                    if (user) {
                      setDestUser({
                        userId: user.userId,
                        username: user.username,
                        socketId: user.socketId,
                      });
                      getMessages!(user.userId);
                    }
                  }}
                >
                  <span className="relative inline-block">
                    <div
                      className={`inline-block h-[40px] w-[40px] rounded-full ${randomColor(
                        index
                      )} p-2 font-medium uppercase text-white shadow-md text-center`}
                    >
                      {user.username?.charAt(0)}
                    </div>

                    {user.socketId && (
                      <span className="absolute right-[-15%] top-[-15%] h-[20px] w-[20px] rounded-full border-[3px] border-solid border-white bg-green-500"></span>
                    )}
                  </span>

                  <div className="ml-3">{user.username}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <MessagesArea
          destUser={destUser as OnlineUsersProps}
          chatMessages={chatMessages}
        />
      </div>
    </>
  );
};

export default UsersSideBar;
