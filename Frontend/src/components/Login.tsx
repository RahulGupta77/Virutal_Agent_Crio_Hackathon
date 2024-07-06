import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div>
          <label>password</label>
          <input type="text" placeholder="Enter your password" />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
