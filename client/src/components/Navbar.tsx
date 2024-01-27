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
    <div className="bg-white flex gap-5 px-5 py-1 pt-4 rounded-md">
      <Link to={"/"} className="flex flex-1 items-center  gap-3 text-[#333]">
        <img src={image} alt="" className="w-[30px]" />
        <p className="font-semibold text-xl ">Online Chat</p>
      </Link>

      <div className="mx-auto space-x-3">
        {!token && (
          <>
            <Link
              to={"/register"}
              className=" rounded-lg bg-[#0288d1] px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-[#3c98ca] focus-visible:ring active:bg-[#30779d] md:text-base"
            >
              Register
            </Link>
            <Link
              to={"/"}
              className=" cursor-pointer rounded-lg bg-[#fff] text-[#0288d1] px-8 py-3 text-center text-sm font-semibold  border border-[#0288d1] ring-[#3c98ca] transition duration-100 hover:bg-[#f6fafe] focus-visible:ring active:bg-[#f6fafe] md:text-base"
            >
              Login
            </Link>
          </>
        )}
        {token && (
          <div className="space-x-3 flex items-center">
            <p
              className={
                "inline-block h-[40px] w-[40px] rounded-full bg-[#3381ab] p-2 font-medium uppercase text-white shadow-md text-center"
              }
            >
              {username?.charAt(0)}
            </p>
            <button
              onClick={logout}
              className=" cursor-pointer rounded-lg bg-[#fff] text-[#0288d1] px-8 py-3 text-center text-sm font-semibold  border border-[#0288d1] ring-[#3c98ca] transition duration-100 hover:bg-[#f6fafe] focus-visible:ring active:bg-[#f6fafe] md:text-base"
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
