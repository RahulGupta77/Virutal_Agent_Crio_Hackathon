"use client";
import { useState } from "react";
import Conversation from "./Conversation";
import AllConversation from "./AllConversation";
import { conversation, message } from "../assets/data";
import { Message } from "../interface/Types";
import backSVG from "./../assets/back.svg";

type ConversationType = {
  id: string | null;
  title: string;
  messages: Message[];
};

type Props = {};

function ChatBox({}: Props) {
  const [currentConversation, setCurrentConversation] =
    useState<ConversationType>({
      id: null,
      title: "",
      messages: [],
    });

  function currentConversationHandler(id: string) {
    const cons = conversation.find((ele) => ele.id === id);

    const msgs: Message[] = [];
    if (cons?.messagesId) {
      for (const messageId of cons.messagesId) {
        const foundMessage: Message | undefined = message.find(
          (ele) => ele.id === messageId
        );
        if (foundMessage) {
          msgs.push(foundMessage);
        }
      }
    }
    setCurrentConversation({
      id: cons?.id || null,
      title: cons?.title || "",
      messages: msgs,
    });
  }
  console.log(currentConversation);
  return (
    <div className="w-full h-full bg-stone-100 rounded-xl flex flex-col justify-between max-w-[25rem]">
      <div className="bg-bgPrimary h-[5%] rounded-t-xl text-center font-bold text-2xl py-4 px-6 flex justify-between items-center border-b-primary">
        {!currentConversation.id ? (
          <div></div>
        ) : (
          <div
            className="hover:cursor-pointer"
            onClick={() =>
              setCurrentConversation({
                id: null,
                title: "",
                messages: [],
              })
            }
          >
            <img src={backSVG}/>
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
        <Conversation allMessages={currentConversation.messages} />
      )}
    </div>
  );
}

export default ChatBox;
