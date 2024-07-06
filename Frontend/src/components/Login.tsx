import React, { useContext, useRef, useState } from "react";
import { User } from "../interface/Types";
import useUserAuth from "../hooks/userAuth";
import { MyContext } from "./ContextProvider";

interface Props {
  setView: (view: boolean) => void;
}

export default function Login({ setView }: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { data, error, loading, login } = useUserAuth();
  const { setAuth } = useContext(MyContext);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (username && password) {
      let obj: User = {
        username,
        password
      };

      try {
        await login(obj);
      } catch (err) {
        setLoginError('Login failed. Please check your username and password.');
      }
    } else {
      setLoginError('Please enter both username and password.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col gap-8 p-4" onSubmit={handleSubmit}>
        <div>
          <label className="p-2">Username</label>
          <input
            className="p-2 rounded-md"
            ref={usernameRef}
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="p-2">Password</label>
          <input
            className="p-2 rounded-md"
            ref={passwordRef}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="bg-green-400 p-2 rounded-md cursor-pointer">
          {loading ? 'Loading...' : 'Login'}
        </button>
        {loginError && <div className="text-red-500">{loginError}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
