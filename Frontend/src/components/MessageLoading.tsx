import { useState, useEffect } from "react";
import { RiRobot2Line } from "react-icons/ri";

interface Props {
  delay?: number; // Optional delay before typing starts
}

const MessageLoading: React.FC<Props> = ({ delay = 500 }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        switch (prevDots) {
          case "":
            return ".";
          case ".":
            return "..";
          case "..":
            return "...";
          default:
            return ".";
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-start space-x-2">
      <div className="mr-2 mb-2">
        <RiRobot2Line />
      </div>
      <div className="bg-bgPrimary text m-2 px-5 py-3 text-start  rounded-t-3xl rounded-e-3xl w-full">
        Typing{dots}
      </div>
    </div>
  );
};

export default MessageLoading;
