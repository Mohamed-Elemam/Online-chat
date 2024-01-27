import { useContext, useEffect, useState } from "react";
import MessagesArea from "./MessagesArea";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, OnlineUsersProps } from "../context/ChatContext";
import { BiMenuAltRight } from "react-icons/bi";
import { RiMenu2Line } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
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
  const [width, setWidth] = useState<number>(250);

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
      <div className="flex gap-5 mx-3 items-center">
        <span
          className="text-3xl  inline-block text-white border border-[#3381ab]  rounded-md bg-[#0288d1]  cursor-pointer"
          onClick={() => setWidth(width === 250 ? 0 : 250)}
        >
          {width !== 0 ? <RiCloseLine /> : <RiMenu2Line />}
        </span>
        <h3 className="text-2xl font-medium my-2 relative ">
          Online Users ({onlineUsers?.length})
        </h3>
      </div>
      <div className="flex mx-3 gap-2 relative">
        <div>
          {width}
          <div
            className={`w-[${width}px]  h-[85dvh]  overflow-hidden transition-all duration-300 ease-in-out z-10  border border-[#3381ab]`}
          >
            <div>
              {onlineUsers?.length === 1 ? (
                <p className=" p-3 text-xl font-semibold block w-[250px]">
                  You are the only user online right now
                </p>
              ) : (
                filteredOnlineUser?.map((user, index) => (
                  <div
                    key={user.userId}
                    className="flex py-4 px-2 hover:bg-blue-200 hover:cursor-pointer "
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
                ))
              )}
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
