import { MdSend } from "react-icons/md";

const MessagesArea = () => {
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
      <div className="bg-red-500 p-3">
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 border border-gray-300 rounded-l"
          />
          <button className="ui icon button">
            <MdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesArea;
