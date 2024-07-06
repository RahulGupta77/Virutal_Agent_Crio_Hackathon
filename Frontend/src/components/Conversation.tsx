import React, { useEffect, useRef, useState, useCallback } from "react";
import { Message } from "../interface/Types";
import Chat from "./Chat";
import useFetch from "../hooks/useFetch";
import sendSVG from './../assets/send.svg'
import MessageLoading from "./MessageLoading";

type Props = {
  allMessages: Message[];
};

export default function Conversation({ allMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { getResponse, loading } = useFetch();

  const sendMessageHandler = useCallback(async () => {
    const query = inputRef.current?.value.trim();

    if (query) {
      const message: Message = {
        id: String(Math.random() * 1000),
        message: query,
        senderId: "me",
      };
      if(inputRef.current)
      inputRef.current.value = ""; // Clear the input after sending the message
      setMessages((prev) => [...prev, message]);

      const res = await getResponse(query);

      const response: Message = {
        id: String(Math.random() * 1000),
        message: res,
        senderId: "bot",
      };

      setMessages((prev) => [...prev, response]);
    } else {
      console.log("Enter your Question");
    }
  }, [getResponse]);

  const sendMessage = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        sendMessageHandler();
      }
    },
    [sendMessageHandler]
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className="h-[35rem] overflow-y-scroll flex flex-col items-baseline bg-bgSecondary"
        ref={chatContainerRef}
      >
        {messages.map((ele) => (
          <Chat
            key={ele.id}
            position={ele.senderId === "bot" ? "left" : "right"}
            text={ele.message}
          />
        ))}
        {loading && 
        <MessageLoading/>
        }
      </div>
      <div className="p-4 bg-bgSecondary">
        <div className="bg-bgPrimary text-center py-2 rounded-3xl flex justify-center">
        <input
          ref={inputRef}
          placeholder="Enter your query"
          type="text"
          disabled={loading}
          className="py-1 px-2 w-9/12 outline-none rounded-full"
          onKeyDown={sendMessage}
          />
        <button
          onClick={sendMessageHandler}
          disabled={loading}
          >
        <img src={sendSVG}/>
        </button>
          </div>
      </div>
    </>
  );
}
