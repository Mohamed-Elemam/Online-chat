import { Divider, FeedLabel, Image, Label } from "semantic-ui-react";

const OnlineUsers = () => {
  interface User {
    name: string;
    status: "Online" | "Offline";
  }
  const online: User[] = [
    { name: "Elijah", status: "Online" },
    { name: "Mason", status: "Online" },
    { name: "Ava", status: "Offline" },
    { name: "Sophia", status: "Offline" },
    { name: "Isaac", status: "Online" },
    { name: "Liam", status: "Online" },
    { name: "Olivia", status: "Offline" },
    { name: "Emma", status: "Offline" },
    { name: "Noah", status: "Online" },
    { name: "Chloe", status: "Offline" },
    { name: "Caleb", status: "Online" },
    { name: "Aria", status: "Offline" },
    { name: "Lucas", status: "Online" },
    { name: "Zoe", status: "Offline" },
    { name: "Ethan", status: "Online" },
    { name: "Mia", status: "Offline" },
    { name: "Jackson", status: "Online" },
    { name: "Lily", status: "Offline" },
    { name: "Aiden", status: "Online" },
    { name: "Grace", status: "Offline" },
  ];

  return (
    <>
      <div className="overflow-y-scroll min-w-[250px] border border-green-400 p-3 rounded-lg h-[60vh] sm:h-[80%]">
        <h3>Online Users</h3>
        <div className=" ">
          {online.map((ele, index) => (
            <div
              key={index}
              className="flex py-4 hover:bg-red-50 hover:cursor-pointer "
            >
              <Label
                circular
                color={`${ele.status === "Online" ? "green" : "red"}`}
                empty
              />
              <Image
                src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                avatar
              />
              <div className="ml-3">{ele.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OnlineUsers;
