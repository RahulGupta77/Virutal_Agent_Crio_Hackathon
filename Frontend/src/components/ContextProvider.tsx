import React, { createContext, ReactElement, useState, Dispatch, SetStateAction } from "react";
import { Converse } from "../interface/Types";

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
};

const MyContext = createContext<AuthContextType>(initialContextValue);

function ContextProvider({ children }: Props) {
  const [conversation, setConversation] = useState<Converse[]>([]);
  const [auth, setAuth] = useState<{ auth: boolean; username: string }>({
    auth: false,
    username: "",
  });

  return (
    <MyContext.Provider value={{ auth, setAuth, conversation, setConversation }}>
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
export { MyContext };
