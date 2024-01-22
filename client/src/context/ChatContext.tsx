import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export interface OnlineUsersProps {
  socketId: string | null;
  userId: string | null;
  username: string | null;
}
interface ChatContextProps {
  userSocket: Socket | null;
  onlineUsers: OnlineUsersProps[] | null;
}
export const ChatContext = createContext<ChatContextProps>({
  userSocket: null,
  onlineUsers: null,
});

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const { token, username, userId } = useContext(AuthContext);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  // console.log("onlineUsers", onlineUsers);

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
      // console.log(res);
      setOnlineUsers(res);
    });
    return () => {
      userSocket.off("getOnlineUsers");
    };
  }, [userSocket, userId, username]);

  return (
    <ChatContext.Provider value={{ userSocket, onlineUsers }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
