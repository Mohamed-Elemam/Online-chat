import { useContext } from "react";
import image from "../../public/chat.svg";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { token, username, setUserState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUserState &&
      setUserState({ token: null, userId: null, username: null, email: null });
  };
  return (
    <div className="bg-white flex gap-5 px-5 py-1 rounded-md">
      <Link to={"/"} className="flex flex-1 items-center gap-3 text-[#333]">
        <img src={image} alt="" className="w-[50px]" />
        <p className="font-bold text-xl">MERN Chat</p>
      </Link>
      {!token && (
        <>
          <Link
            to={"/register"}
            className="text-white text-base font-semibold hover:text-white focus:text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300   rounded-full px-5 py-2.5 text-center me-2 mb-2"
          >
            Register
          </Link>
          <Link
            to={"login"}
            className="
  text-white text-base font-semibold bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200   rounded-full  px-5 py-2.5 text-center me-2 mb-2
            "
          >
            Login
          </Link>
        </>
      )}
      {token && (
        <div className="space-x-3 flex items-center">
          <p className="m-0 font-semibold  md:text-base  ">{username}</p>
          <button
            onClick={logout}
            className="
  text-white text-base font-semibold bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200   rounded-full  px-5 py-2.5 text-center me-2 mb-2
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
