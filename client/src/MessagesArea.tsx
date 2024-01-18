import axios from "axios";
import { useForm } from "react-hook-form";

import { MdSend } from "react-icons/md";
import { User } from "./OnlineUsers";
import { useEffect, useState } from "react";

const MessagesArea = ({ destUser, chatMessages }: { destUser: User }) => {
  const userToken = localStorage.getItem("userToken");
  type Message = {
    message: string;
  };

  async function sendMessage(destuser: User, message: Message) {
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

  const { handleSubmit, register } = useForm<Message>();

  if (destUser === undefined) {
    return;
  }
  return (
    <div className="flex flex-col w-[100%]">
      <div
        className="p-3 font-bold bg-[#98EECC] border-b border-gray-500 rounded-md"
        onClick={() => {
          getMessages(destUser._id);
        }}
      >
        {destUser.username}
      </div>
      <div className="min-h-[70%] bg-[#FBFFDC] flex flex-col-reverse overflow-y-scroll">
        {chatMessages?.length > 0 ? (
          chatMessages?.map((ele) => (
            <div
              key={ele._id}
              className={` p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative  w-[100%] ${
                ele._id !== userToken ? "" : "ml-auto"
              }`}
            >
              <div className="font-bold mb-1 text-sm text-green-600">
                {ele.from}
              </div>
              <div className="text-black mb-2">{ele.message} </div>
              <div className="absolute bottom-1 right-1 text-xs text-gray-500">
                10:30 AM
              </div>
            </div>
          ))
        ) : (
          <div>no messages found</div>
        )}
      </div>

      {/* ///////////////////////////////////////////////////////// */}
      <form
        className="bg-[#FBFFDC] p-2"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            {...register("message", { required: true })}
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

{
  /* <div className="p-3  border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative">
  <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
  <div className="text-black mb-2">hola</div>
  <div className="absolute bottom-1 right-1 text-xs text-gray-500">
    10:30 AM
  </div>
</div>; */
}

{
  /* ****** */
}
{
  /* <div className=" p-3 border border-solid border-gray-300 mx-4 my-4 bg-white max-w-[300px] rounded-lg relative ml-auto w-[100%]">
  <div className="font-bold mb-1 text-sm text-green-600">Joh Doe</div>
  <div className="text-black mb-2">welcome </div>
  <div className="absolute bottom-1 right-1 text-xs text-gray-500">
    10:30 AM
  </div>
</div>; */
}

{
  /* *****  */
}
