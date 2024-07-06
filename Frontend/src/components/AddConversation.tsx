import React from "react";

type Props = {
  handlerConversation: (show: boolean) => void;
};

const AddConversation: React.FC<Props> = ({ handlerConversation }) => {
  function handleSprint() {
    // Handle sprint selection logic here if needed
  }

  return (
    <div className="flex flex-col justify-between items-center h-[35rem]">
      <form className="flex flex-col justify-between items-start gap-6 h-full w-full">
        <div className="flex flex-col justify-evenly items-start gap-6 py-4">
          <div>
            <label className="px-4 text-bgPrimary">Sprint Name</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value=""
              onChange={handleSprint}
            >
              <option key="mern1" value="mern1">
                mern1
              </option>
              <option key="intv1" value="intv1">
                Intv 1
              </option>
            </select>
          </div>

          <div>
            <label className="px-4 text-bgPrimary">Module Name</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value=""
              onChange={handleSprint}
            >
              <option key="auth" value="auth">
                Auth
              </option>
              <option key="qkart" value="qkart">
                qkart
              </option>
              <option key="react-hooks" value="react-hooks">
                react hooks
              </option>
              <option key="qkart-front-hooks" value="qkart-front-hooks">
                qkart front hooks
              </option>
            </select>
          </div>

          <div>
            <label className="px-4 text-bgPrimary">MileStone Name</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value="authentication"
              onChange={handleSprint}
            >
              <option key="getting-started" value="getting-started">
                getting started
              </option>
              <option key="authentication" value="authentication">
                authentication
              </option>
              <option key="product-page" value="product-page">
                product page
              </option>
              <option key="cart" value="cart">
                qkart front hooks
              </option>
              <option key="checkout" value="checkout">
                checkout
              </option>
              <option key="deployment" value="deployment">
                deployment
              </option>
            </select>
          </div>

          <div>
            <label className="px-4 text-bgPrimary">Query</label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 w-full"
              placeholder="Enter your Query"
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div
            onClick={() => handlerConversation(false)}
            className="hover:cursor-pointer bg-green-500 text-white w-full text-bgPrimary bg-secondary py-4  text-center"
          >
            Back
          </div>
          <div className="hover:cursor-pointer bg-green-300 text-white w-full py-4  text-bgPrimary text-center bg-primary">
            <button className="w-full">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddConversation;
