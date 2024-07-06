import React, { createContext, ReactElement, useState } from 'react';

// Define the context value type
type AuthContextType = {
  auth: {
    id: string;
    auth: boolean;
    username: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<{
    id: string;
    auth: boolean;
    username: string;
  }>>;
};

type Props = {
  children: ReactElement;
};

// Initial context value
const initialContextValue: AuthContextType = {
  auth: {
    id: '',
    auth: false,
    username: ''
  },
  setAuth: () => {}
};

const MyContext = createContext<AuthContextType>(initialContextValue);

function ContextProvider({ children }: Props) {
  const [auth, setAuth] = useState({
    id: '',
    auth: false,
    username: ''
  });

  return (
    <MyContext.Provider value={{ auth, setAuth }}>
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
export { MyContext };
