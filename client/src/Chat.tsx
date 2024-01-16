import MessagesArea from "./MessagesArea";
import OnlineUsers from "./OnlineUsers";

export const Chat = () => {
  return (
    <section className="flex gap-3">
      <OnlineUsers />
      <MessagesArea />
    </section>
  );
};
