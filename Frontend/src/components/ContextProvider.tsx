import React, { createContext, ReactElement, useState, Dispatch, SetStateAction } from "react";
import { Converse, Message } from "../interface/Types";

// Define the context value type
type AuthContextType = {
  auth: {
    auth: boolean;
    username: string;
  };
  setAuth: Dispatch<SetStateAction<{
    auth: boolean;
    username: string;
  }>>;
  conversation: Converse[];
  setConversation: Dispatch<SetStateAction<Converse[]>>;
  messages: Message[]; // Added semicolon to end the type definition
  setMessage: Dispatch<SetStateAction<Message[]>>; // Added semicolon to end the type definition
};

type Props = {
  children: ReactElement;
};

// Initial context value
const initialContextValue: AuthContextType = {
  auth: {
    auth: false,
    username: "",
  },
  setAuth: () => {},
  conversation: [],
  setConversation: () => {},
  messages: [], // Initialized as an empty array
  setMessage: () => {} // Initialized with an empty function
};

const MyContext = createContext<AuthContextType>(initialContextValue);

function ContextProvider({ children }: Props) {
  const [conversation, setConversation] = useState<Converse[]>([]);
  const [auth, setAuth] = useState<{ auth: boolean; username: string }>({
    auth: false,
    username: "",
  });

  const [messages, setMessage] = useState<Message[]>([]); // Initialized as an empty array

  return (
    <MyContext.Provider value={{ auth, setAuth, conversation, setConversation, messages, setMessage }}>
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
export { MyContext };
