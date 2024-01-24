import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { AuthContext, User } from "./AuthContext";
import axios from "axios";
import { ChatMessagesProps } from "../components/UsersSideBar";

export interface OnlineUsersProps {
  socketId: string | null;
  userId: string | null;
  username: string | null;
}
interface ChatContextProps {
  userSocket: Socket | null;
  onlineUsers: OnlineUsersProps[] | null;
  setChatMessages: (messages: ChatMessagesProps[]) => void;
  chatMessages: ChatMessagesProps[] | [];
  getMessages?: (receiverId: User) => Promise<void>;
}
export const ChatContext = createContext<ChatContextProps>({
  userSocket: null,
  onlineUsers: null,
  chatMessages: [],
  setChatMessages: () => {},
});

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const { token, username, userId } = useContext(AuthContext);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [chatMessages, setChatMessages] = useState<ChatMessagesProps[] | []>(
    []
  );

  useEffect(() => {
    const socket = io("http://localhost:3000");
    userId &&
      socket.on("connect", () => {
        setUserSocket(socket);
      });
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (userSocket === null) return;
    userSocket.emit("addNewUser", userId, username);
    userSocket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      userSocket.off("getOnlineUsers");
    };
  }, [userSocket, userId, username]);

  // useEffect(() => {
  //   if (userSocket === null) return;
  //   userSocket.emit("sendMessage",{...newMessage ,destUser.userId});

  //   return () => {
  //     userSocket.off("getOnlineUsers");
  //   };
  // }, [newMessage]);

  // useEffect(() => {
  //   if (userSocket === null) return;
  //   userSocket.on("sendMessage",(message)=>{
  // push
  //   });

  //   return () => {
  //     userSocket.off("getOnlineUsers");
  //   };
  // }, [newMessage]);

  // useEffect(() => {
  //   if (userSocket === null) return;
  //   userSocket.on("sendMessage12", (messages) => {
  //     console.log("Message received:", messages);
  //     setChatMessages(messages);
  //   });

  //   return () => {
  //     userSocket.off("sendMessage12");
  //   };
  // }, [userSocket, setChatMessages]);
  useEffect(() => {
    console.log("Setting up event listener for chatMessageXD");

    userSocket?.on("chatMessageXD", (message) => {
      console.log("Received chat message:", message);
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      console.log("Cleaning up event listener for chatMessageXD");
      userSocket?.off("chatMessageXD");
    };
  }, [userSocket]);

  async function getMessages(receiverId: User) {
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
      return setChatMessages(data.chat);
    } catch (error: unknown) {
      axios.isAxiosError(error) && console.log(error.response?.data.message);
      if (
        axios.isAxiosError(error) &&
        error.response?.data.message === "Chat not found"
      ) {
        setChatMessages([]);
      }
    }
  }

  return (
    <ChatContext.Provider
      value={{
        userSocket,
        onlineUsers,
        chatMessages,
        getMessages,
        setChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
