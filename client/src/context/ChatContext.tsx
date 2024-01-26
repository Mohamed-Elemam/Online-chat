import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { ChatMessagesProps } from "../components/UsersSideBar";

export interface OnlineUsersProps {
  socketId: string;
  userId: string;
  username: string;
  email?: string;
}
interface ChatContextProps {
  userSocket: Socket | null;
  onlineUsers: OnlineUsersProps[] | null;
  setChatMessages: (messages: ChatMessagesProps[]) => void;
  chatMessages: ChatMessagesProps[] | [];
  getMessages?: (recipientUser: string) => Promise<void>;
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

  useEffect(() => {
    if (userSocket === null) return;
    userSocket.on("getChatMessages", (res) => {
      setChatMessages(res);
    });
    return () => {
      userSocket.off("getChatMessages");
    };
  }, [userSocket]);

  useEffect(() => {
    if (userSocket === null) return;
    userSocket.on("addLastMessage", (message: []) => {
      setChatMessages(message);
    });

    return () => {
      userSocket.off("addLastMessage");
    };
  }, [userSocket]);

  async function getMessages(recipientUserId: string) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/chat/${recipientUserId}`,

        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${token}`,
          },
        }
      );
      userSocket?.emit("getChatMessages", data.chat);
    } catch (error: unknown) {
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
