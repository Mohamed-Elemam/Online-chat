import InputEmoji from "react-input-emoji";
import { useSendMessage } from "../hooks/UseSendMessage";
import { OnlineUsersProps } from "../context/ChatContext";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({
  destUser,
}: {
  destUser: OnlineUsersProps;
}) {
  const { text, setText, handleOnEnter } = useSendMessage({ destUser });
  console.log(destUser);
  return (
    <div className="flex gap-3 p-2  items-center">
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />
      <button
        className="bg-[#0288d1] rounded-full text-2xl w-10 h-10 text-white cursor-pointer flex justify-center items-center border-[none] "
        onClick={() => {
          handleOnEnter(text);
        }}
      >
        <IoMdSend />
      </button>
    </div>
  );
}
