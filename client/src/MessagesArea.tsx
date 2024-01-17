import axios from "axios";
import { MdSend } from "react-icons/md";

const MessagesArea = ({ destUser }) => {
  const userToken = localStorage.getItem("userToken");

  async function sendMessage(destuser, message) {
    const { data } = await axios.post(
      "http://localhost:3000/chat",
      {
        destId: destUser._id,
        message,
      },
      {
        headers: {
          Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
        },
      }
    );
  }
  return (
    <div className="flex flex-col w-[100%]">
      <div className="p-3 font-bold bg-[#98EECC] border-b border-gray-500 rounded-md">
        User
      </div>
      <div className="h-[70%] bg-[#FBFFDC] flex flex-col-reverse overflow-y-scroll">
        <div className="p-3  border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">hola</div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>
        {/* ****** */}
        <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">welcome </div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>

        {/* *****  */}
        {/* ****** */}
        <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">welcome </div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>

        {/* *****  */}
        {/* ****** */}
        <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">welcome </div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>

        {/* *****  */}
        {/* ****** */}
        <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">welcome </div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>

        {/* *****  */}
        {/* ****** */}
        <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">welcome </div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>

        {/* *****  */}
        {/* ****** */}
        <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
          <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
          <div className="text-black mb-2">welcome </div>
          <div className="absolute bottom-1 right-1 text-xs text-gray-500">
            10:30 AM
          </div>
        </div>

        {/* *****  */}
      </div>
      <form className="bg-[#FBFFDC] p-2">
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            // {...register("chatInput", { required: true })}
          />
          <button className="ui icon button">
            <MdSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessagesArea;
