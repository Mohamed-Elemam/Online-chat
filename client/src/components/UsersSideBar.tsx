import { useContext, useEffect, useState } from "react";
import MessagesArea from "./MessagesArea";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, OnlineUsersProps } from "../context/ChatContext";

export interface User {
  userId?: string | null;
  username?: string | null;
  socketId?: string | null;
}
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

  const [destUser, setDestUser] = useState<User>();

  const filteredOnlineUser: OnlineUsersProps[] = onlineUsers?.filter(
    (user) => user.userId !== userId
  );

  useEffect(() => {
    if (userSocket) {
      userSocket.on("receiveMessage", () => {
        getMessages!(destUser?.userId);
      });
    }

    // Clean up the listener when the component unmounts
    return () => {
      if (userSocket) {
        userSocket.off("receiveMessage");
      }
    };
  }, [userSocket]);

  return (
    <div className="grid grid-cols-2">
      <div>
        <h3 className="text-xl font-medium">
          Online Users ({onlineUsers?.length})
        </h3>
        <div className="w-50 overflow-y-scroll min-w-[250px] border border-purple-700 p-3 rounded-lg h-[60vh] sm:h-[80%]">
          <div>
            {filteredOnlineUser?.map((user) => (
              <div
                key={user.userId}
                className="flex py-4 hover:bg-red-50 hover:cursor-pointer border-b border-gray-200"
                onClick={() => {
                  if (user) {
                    setDestUser({
                      userId: user.userId,
                      username: user.username,
                      socketId: user.socketId,
                    });
                    getMessages!(user?.userId);
                  }
                }}
              >
                <span className="relative inline-block">
                  {/* <img
                    src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                    className="w-[40px] rounded-full"
                  /> */}
                  <div className="inline-block h-[40px] w-[40px] rounded-full bg-teal-500 p-2 font-medium uppercase text-white shadow-md text-center">
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
      <MessagesArea destUser={destUser} chatMessages={chatMessages} />
    </div>
  );
};

export default UsersSideBar;
