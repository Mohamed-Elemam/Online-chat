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
      <Link to={"/"} className="flex flex-1 items-center  gap-3 text-[#333]">
        <img src={image} alt="" className="w-[30px]" />
        <p className="font-semibold text-xl ">Online Chat</p>
      </Link>

      <div className="mx-auto">
        {!token && (
          <>
            <Link
              to={"/register"}
              className="text-white text-base font-semibold hover:text-white focus:text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full px-5 py-2 text-center me-2 mb-2"
            >
              Register
            </Link>
            <Link
              to={"/"}
              className="text-white text-base font-semibold bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200   rounded-full  px-5 py-2 text-center me-2 mb-2"
            >
              Login
            </Link>
          </>
        )}
        {token && (
          <div className="space-x-3 flex items-center">
            <p
              className={
                "inline-block h-[40px] w-[40px] rounded-full bg-[#91ddac] p-2 font-medium uppercase text-white shadow-md text-center"
              }
            >
              {username?.charAt(0)}
            </p>
            <button
              onClick={logout}
              className="
  text-white text-base font-semibold bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200   rounded-full  px-5 py-2 text-center me-2 mb-2
            "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
