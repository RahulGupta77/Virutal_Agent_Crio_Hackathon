import "./App.css";
import ChatBox from "./components/ChatBox";
import ContextProvider, { MyContext } from "./components/ContextProvider";
import { useContext } from "react";
import Auth from "./components/Auth";

function App() {
  let { auth } = useContext(MyContext);

  return (
    <ContextProvider>
      <main className={`flex h-5/6 flex-col items-center m-8 `}>
        <h1>Chat bot</h1>
        {!auth.auth ? <ChatBox /> : <Auth />}
      </main>
    </ContextProvider>
  );
}

export default App;
