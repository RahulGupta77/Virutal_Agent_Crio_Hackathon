import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

type Props = {};

export default function Auth({}: Props) {
  let [flag, setFlag] = useState(false);

  function setView(view:boolean){
     setFlag(view)
  }

  return (
    <div className="h-[20rem] bg-stone-300 w-[20rem] rounded-md py-4">
      <div>{flag ? <Login setView={setView} /> : <Signup setView={setView} />}</div>
      <div onClick={() => setFlag((prev) => !prev)} className="hover:cursor-pointer">
        {!flag ? "Click to Login" : "Click to SignUp"}
      </div>
    </div>
  );
}
