import { RiRobot2Line } from "react-icons/ri";

type Props = {
  position: string;
  text: string;
};

function Chat({ position, text }: Props) {
  let float = position == "left" ? "self-start" : "self-end";
  let bgColor = position != "left" ? "bg-primary" : "bg-bgPrimary";
  let textColor = position != "left" ? "text-bgPrimary" : "text";
  let chatContainer = `text-${position} ${float} flex items-end justify-center px-4 h-auto max-w-[70%]`;
  let radius = position == "left" ? "rounded-t-3xl rounded-e-3xl" : "rounded-b-3xl rounded-s-3xl";
  let chat = `${bgColor} ${textColor} ${radius} m-2 px-5 py-3 text-start w-full break-words whitespace-normal`;
  let bot = "mr-2 mb-2"; // Adjusted bot style for proper alignment

  return (
    <div className={chatContainer}>
      {position == "left" && (
        <div className={bot}>
          <RiRobot2Line />
        </div>
      )}
      <div className={chat}>{text}</div>
    </div>
  );
}

export default Chat;
