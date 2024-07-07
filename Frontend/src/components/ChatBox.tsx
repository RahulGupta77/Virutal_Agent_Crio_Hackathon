"use client";
import { useContext, useState } from "react";
import Conversation from "./Conversation";
import AllConversation from "./AllConversation";
import backSVG from "./../assets/back.svg";
import { MyContext } from "./ContextProvider";
import useConversation from "../hooks/userConversation";

type ConversationType = {
  id: string;
};

type Props = {};

function ChatBox({}: Props) {
  const { messages, setMessage } = useContext(MyContext);
  const { getAllMessages } = useConversation();

  const [currentConversation, setCurrentConversation] =
    useState<ConversationType>({
      id: "",
    });

  async function currentConversationHandler(id: string) {
    if (id) {
      await getAllMessages(id);
    }
    setCurrentConversation({
      id: id,
    });
  }
  return (
    <div className="w-full h-full bg-stone-100 rounded-xl flex flex-col justify-between max-w-[25rem] flex flex-end bg-primary">
      <div className="bg-bgPrimary h-[5%] rounded-t-xl text-center font-bold text-2xl py-4 px-6 flex justify-between items-end border-b-primary">
        {!currentConversation.id ? (
          <div></div>
        ) : (
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              setCurrentConversation({ id: "" });
              setMessage([]);
            }}
          >
            <img src={backSVG} />
          </div>
        )}
        <h1 className="text-primary">8282 Chatbot</h1>
        <div></div>
      </div>
      {!currentConversation.id ? (
        <AllConversation
          currentConversationHandler={currentConversationHandler}
        />
      ) : (
        <Conversation conversationId={currentConversation.id} allMessages={messages} />
      )}
    </div>
  );
}

export default ChatBox;
