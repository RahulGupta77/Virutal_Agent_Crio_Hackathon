import React from "react";

type Props = {
    handlerConversation:(show:boolean)=>void
};

function AddConversation({handlerConversation}: Props) {
  function handleSprint() {}

  return (
    <div className="flex flex-col justify-between items-center h-[35rem] ">

    <form className="flex flex-col justify-between items-start gap-6 h-full w-full">
     <div className="flex flex-col justify-evenly items-start gap-6 py-4 ">
      <div >
        <label className="px-4">Sprint Name</label>
        <select value="" onChange={handleSprint}>
          <option key="mern1" value="mern1">mern1</option>
          <option key="mern1" value="mern1">Intv 1</option>
        </select>
      </div>

      <div>
        <label className="px-4" >Module Name</label>
          <select value="" onChange={handleSprint}>
          <option key="auth" value="auth">Auth </option>
          <option key="qkart" value="qkart"> qkart</option>
          <option key="react hooks" value="react hooks"> react hooks</option>
          <option key="qkart front hooks" value="qkart front hooks"> qkart front hooks</option>
        </select>
      </div>
      <div>
        <label className="px-4">MileStone Name</label>
          <select value="authentication" onChange={handleSprint}>
          <option key="getting started" value="getting started">getting started</option>
          <option key="authentication" value="authentication">authentication</option>
          <option key="product page" value="product page">product page</option>
          <option key="cart" value="qkart front hooks"> qkart front hooks</option>
          <option key="checkout" value="checkout"> checkout</option>
          <option key="deployment" value="deployment"> deployment</option>
        </select>
        
       
      </div>
      <div>
        <label className="px-4">Query</label>
        <input type="text" placeholder="Enter your Query" />
      </div>

     </div>

      <div className="flex items-center justify-between w-full ">
      <div className="py-4 bg-green-300 hover:cursor-pointer w-full">
        <button  >Create new Conversation</button>
      </div>
    <div onClick={()=>handlerConversation(false)} className="hover:cursor-pointer bg-green-500 w-full py-4">
        Back
    </div>
      </div>
    </form>
    </div>
  );
}

export default AddConversation;
