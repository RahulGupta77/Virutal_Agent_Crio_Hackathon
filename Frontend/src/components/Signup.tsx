import React, { useRef } from "react";
import useUserAuth from "../hooks/userAuth";
import { User } from "../interface/Types";

type Props = {
  setView: (view: boolean) => void;
};

function Signup({ setView }: Props) {
  let usernameRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let { data, signUp, error } = useUserAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username && password) {
      let obj: User = {
        username,
        password,
      };
      await signUp(obj);
      if (data) {
        setView(true);
      }
    }
    // Handle the signup logic here
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">SignUp</h1>
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
        <button
          type="submit"
          className="bg-green-400 p-2 rounded-md cursor-pointer"
        >
          SignUp
        </button>
      </form>
      <span className="bg-red-600">{error != null ? error : ""}</span>
    </div>
  );
}

export default Signup;
