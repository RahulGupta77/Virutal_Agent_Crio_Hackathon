import React, { useContext, useState } from "react";
import axios from "axios";
import {
  AllConversationRes,
  ConversationRes,
  Converse,
  Message,
  NewConversation,
} from "../interface/Types";
import { MyContext } from "../components/ContextProvider";
// import { BASE_URL } from "../constants/constatns";

const BASE_URL = "http://localhost:8000";
function useConversation() {
  const { auth, setConversation, setMessage } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  async function addNewConversation(data: NewConversation) {
    setLoading(true);
    try {
      let response: any = (
        await axios.post("http://localhost:8000/conversation/new", data)
      ).data;
      console.log(response, "from user conversation");
      setConversation((prev) => [
        ...prev,
        { id: response.id, title: response.title },
      ]);
    } catch (err) {
      if (err instanceof TypeError)
        console.error("Error adding conversation:", err.message);
    } finally {
      setLoading(false);
    }
  }

  async function getAllUserConversation() {
    setLoading(true);
    try {
      let response: any = (
        await axios.get(
          `http://localhost:8000/conversation/allConversation/${auth.username}`
        )
      ).data;
      setLoading(false);
      let convers: Converse[] = [];
      for (let res of response.conversations) {
        convers.push({ id: res._id, title: res.title });
      }
      setConversation(convers);
    } catch (err) {
      if (err instanceof TypeError) console.log(err.message);
      else console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getAllMessages(id: string) {
    setLoading(true);
    try {
      let response: any = (
        await axios.get(`http://localhost:8000/conversation/all/${id}`)
      ).data;

      let resMsg: Message[] = [];

      for (let msg of response.message) {
        resMsg.push({
          id: msg._id,
          question: msg.question,
          response: msg.response,
        });
      }

      setMessage((prev) => [...prev, ...resMsg]);
    } catch (err) {
      if (err instanceof TypeError) console.log(err.message);
      else console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function addMessage(id:string,body:{question:string,response:string}){
    setLoading(true);
    try {
      let response: any = (
        await axios.patch(`http://localhost:8000/conversation/update/${id}`,body)
      ).data;

    } catch (err) {
      if (err instanceof TypeError) console.log(err.message);
      else console.log(err);
    } finally {
      setLoading(false);
    }

  }

  // Assuming you might return something related to the component
  return {
    addNewConversation,
    loading,
    getAllUserConversation,
    getAllMessages,
    addMessage
  };
}

export default useConversation;
