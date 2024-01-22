import { Helmet } from "react-helmet";
import UsersSideBar from "../components/UsersSideBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Chat = () => {
  const { token, userId, username, email } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <UsersSideBar />
    </>
  );
};
