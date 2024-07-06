import { RiRobot2Line } from "react-icons/ri";

type Props = {
  position: string;
  text: string;
};

function Chat({ position, text }: Props) {
  let float = position == "left" ? "self-start" : "self-end";
  let chatContainer = `text-${position} ${float} rounded-lg flex items-end  justify-center px-4 h-auto max-w-[60%]`;
  let chat = `bg-green-500 m-2 px-5 py-3  rounded-lg w-full`
  let bot =``
  return (
    <div className={chatContainer}>
      {
        position=="left" &&
        <div className={bot}>
        <RiRobot2Line />
      </div>
      }
      <div className={chat}>
      {text}
      </div>
    </div>
  );
}

export default Chat;
