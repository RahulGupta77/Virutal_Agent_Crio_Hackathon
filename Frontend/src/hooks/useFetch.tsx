import { useState } from "react";

const BASE_URL = "http://192.168.0.59:5000/qkart-faqs";

interface Response {
  answer: string;
}

export default function useFetch() {
  let [loading, setLoading] = useState(false);

  async function getResponse(query: string) {
    setLoading(true);
    try {
      let data = await fetch(BASE_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ question: query }),
      });
      let res: Response = await data.json();
      if(res.answer.toLocaleLowerCase().includes('response')){
        res.answer = res.answer.split('response')[1]
      }
      return res.answer;
    } catch (err) {
      console.log("not getting response from llm");
      if (err instanceof TypeError) console.log(err.message);
      else console.log(err);
    } finally {
      setLoading(false);
    }
    return "Error";
  }

  return { loading, getResponse };
}
