import React, { useEffect, useRef, useState, useCallback } from "react";
import { Message } from "../interface/Types";
import Chat from "./Chat";
import useFetch from "../hooks/useFetch";
import sendSVG from "./../assets/send.svg";
import MessageLoading from "./MessageLoading";
import useConversation from "../hooks/userConversation";

type Props = {
  allMessages: Message[];
  conversationId: string;
};

export default function Conversation({ allMessages, conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>(allMessages);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { getResponse, loading } = useFetch();
  const { addMessage } = useConversation();

  const sendMessageHandler = useCallback(async () => {
    const query = inputRef.current?.value.trim();

    if (query) {
      const message: Message = {
        id: String(Math.random() * 1000),
        question: query,
        response: false,
      };
      if (inputRef.current) inputRef.current.value = ""; // Clear the input after sending the message
      setMessages((prev) => [...prev, message]);

      const res = await getResponse(query);

      const response: Message = {
        id: String(Math.random() * 1000),
        question: query,
        response: res,
      };
      await addMessage(conversationId, { question: query, response: res });
      setMessages((prev) => {
        let msgs = [...prev];
        msgs.pop();
        msgs.push(response);
        return msgs;
      });
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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className="h-[30rem] overflow-y-scroll flex flex-col items-baseline bg-bgSecondary"
        ref={chatContainerRef}
      >
        {messages.map((ele) => (
          <>
            <Chat key={ele.id} position={"right"} text={ele.question} />
            {ele.response ? (
              <Chat key={ele.id} position={"left"} text={ele.response} />
            ) : (
              loading && <MessageLoading />
            )}
          </>
        ))}
      </div>
      <div className="p-4 bg-bgSecondary rounded-es-xl">
        <div className="bg-bgPrimary text-center py-2 rounded-3xl flex justify-center">
          <input
            ref={inputRef}
            placeholder="Enter your query"
            type="text"
            disabled={loading}
            className="py-1 px-2 w-9/12 outline-none rounded-full "
            onKeyDown={sendMessage}
          />
          <button onClick={sendMessageHandler} disabled={loading}>
            <img src={sendSVG} />
          </button>
        </div>
      </div>
    </>
  );
}
