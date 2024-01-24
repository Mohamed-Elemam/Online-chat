import { Helmet } from "react-helmet";
import UsersSideBar from "../components/UsersSideBar";
import { ToastContainer } from "react-toastify";

export const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <ToastContainer />
      <UsersSideBar />
    </>
  );
};
