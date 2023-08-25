import { useEffect, useRef, useState } from "react"
import Message from "../components/Message"

export default function Chat({ socket }) {
    const [messages, setMessages] = useState([])
    const chatRef = useRef(null)

    useEffect(() => {
        const form = document.getElementById("message-form")
        const input = document.getElementById("input")

        form.onsubmit = (e) => {
            e.preventDefault()
            if (input.value) {
                socket.send(input.value)
                input.value = ""
            }
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(messages => [...messages, message])
        }
    }, [])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="h-full flex flex-col justify-between gap-5">
            <div id="chat" className="mt-20 overflow-y-auto" ref={chatRef}>
                {messages.map((message, ind) => (
                    <Message message={message} key={ind} />
                ))}
            </div>
            <form action="post" id="message-form" className="w-full">
                <input type="text" id="input" placeholder="Message..." className="w-full rounded-3xl" autoComplete="off" required />
            </form>
        </div>
    )
}
