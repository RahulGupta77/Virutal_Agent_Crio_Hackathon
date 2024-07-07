import { useContext, useEffect, useState } from "react";
import Context from "./Context";
import { sprintManager } from "../assets/data";
import AddConversation from "./AddConversation";
import useConversation from "../hooks/userConversation";
import { MyContext } from "./ContextProvider";

type Props = {
  currentConversationHandler: (id: string) => void;
};

function AllConversation({ currentConversationHandler }: Props) {
  let [newConversation, setNewConversation] = useState(false);
  let {conversation} =  useContext(MyContext)
  let {getAllUserConversation} = useConversation()

  function handlerConversation(show:boolean){
       setNewConversation(show)
  }



  useEffect(()=>{
     getAllUserConversation()

  },[])

  return (
    <div className="h-[35rem] bg-bgPrimary flex flex-col justify-between rounded-es-xl">
      {!newConversation ? (
        <>
          <div className="overflow-y-scroll">
            <h1 className="py-2 font-medium text-xl">Previous Conversations</h1>
            {conversation.map((ele) => (
              <div onClick={() => currentConversationHandler(ele.id)} key={ele.id}>
                <Context title={ele.title} messageId={ele.id} />
              </div>
            ))}
          </div>
          <div className="p-4 bg-primary text-bgPrimary hover:cursor-pointer rounded-es-xl">
            <button onClick={()=>handlerConversation(true)}>Add new Conversation</button>
          </div>
        </>
      ) : (
        <div>
          <AddConversation handlerConversation={handlerConversation} sprintManager={sprintManager} />
        </div>
      )}
    </div>
  );
}

export default AllConversation;
