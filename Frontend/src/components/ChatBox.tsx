"use client"
import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Chat from './Chat'

interface Message {
    id: number,
    message: string,
    senderId: string,
}

let obj: Message[] = [
    {id: 1, message: "omkar", senderId: "bot"},
    {id: 2, message: "there is something", senderId: "omkar"},
    {id: 3, message: "there nothing", senderId: "bot"},
    {id: 4, message: "no one is there", senderId: "bot"},
]

type Props = {}

function ChatBox({}: Props) {
    let [messages, setMessages] = useState(obj)
    let inputRef = useRef<HTMLInputElement>(null)
    let {getResponse,loading} = useFetch()
    let chatContainerRef = useRef<HTMLDivElement | null>(null)

   async function sendMessageHandler() {
        if (inputRef.current?.value != undefined && inputRef.current?.value.trim().length) {
            let message: Message = {
                id: Math.random() * 1000,
                message: inputRef.current?.value,
                senderId: "me"
            }
            let query = inputRef.current?.value.trim()
            inputRef.current.value = ''; // Clear the input after sending the message
            setMessages(prev => [...prev, message])
            let res = await getResponse(query)
            let response:Message = {
              id : Math.random() *1000,
              message:res,
              senderId:"bot",
             }
            setMessages(prev => [...prev, response])
            


        } else {
            console.log("Enter your Question")
        }

    }

    function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            sendMessageHandler();
        }
    }

    useEffect(()=>{
       if(chatContainerRef.current){
        chatContainerRef.current.scrollTop =chatContainerRef.current.scrollHeight;
       }
    },[messages])

    return (
        <div className='w-full h-full bg-stone-100 rounded-md flex flex-col justify-between max-w-[40rem]'>
            <header className='bg-green-400 h-[5%] rounded-t-md text-center font-bold text-2xl p-1 py-4'>
                <h1>8282 Agent</h1>
            </header>
            <div className='h-[35rem] overflow-y-scroll flex flex-col items-baseline' ref={chatContainerRef}>
                {messages.map(ele =>
                    <Chat key={ele.id} position={ele.senderId === 'bot' ? 'left' : "right"} text={ele.message}/>
                )}
            </div>
            <div className='p-4'>

                <input
                    ref={inputRef}
                    placeholder='Enter your query'
                    type='text'
                    disabled={loading}
                    className='py-1 px-2 w-10/12 mx-2 outline-none'
                    onKeyDown={sendMessage}
                />
                <button onClick={sendMessageHandler} disabled={loading}  className='bg-stone-300 px-3 py-2 rounded-lg'>Send</button>
            </div>
        </div>
    )
}

export default ChatBox
