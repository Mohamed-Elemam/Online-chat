import { ChatMessagesProps } from "./UsersSideBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatInput from "./ChatInput";
import { OnlineUsersProps } from "../context/ChatContext";

const MessagesArea = ({
  destUser,
  chatMessages,
}: {
  destUser: OnlineUsersProps;
  chatMessages: ChatMessagesProps[];
}) => {
  const { userId } = useContext(AuthContext);

  if (destUser === undefined) {
    return;
  }

  return (
    <div className="flex flex-col w-[100%]  bg-[#74EBD5] bg-[linear-gradient(90deg,#74EBD5_0%,#9FACE6_100%)]">
      <div className="p-3 font-medium text-white text-md bg-[#00000039]">
        {destUser.username}
      </div>

      <div className="  flex flex-col overflow-y-scroll h-[75dvh]">
        {chatMessages?.length > 0 ? (
          chatMessages?.map((ele) => (
            <div
              key={ele._id}
              className={` p-3 border border-solid border-gray-300 mx-4 my-4  bg-white max-w-[300px] rounded-lg relative w-[100%] ${
                ele.from == userId ? "ml-auto " : ""
              }`}
            >
              <div className="font-bold mb-1 text-sm text-green-600">
                {ele.from === userId ? "You" : destUser.username}
              </div>
              <div className="text-black mb-2">{ele.message} </div>
              <div className="absolute bottom-1 right-1 text-xs text-gray-500">
                {ele.time}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center my-5 font-medium text-white text-xl p-3 bg-[#00000039] rounded-md w-[60%] mx-auto">
            <p>No messages here yet...</p>
            <p>Send a message below</p>
          </div>
        )}
      </div>
      <div className="bg-[#00000012]">
        <ChatInput destUser={destUser} />
      </div>
    </div>
  );
};

export default MessagesArea;
