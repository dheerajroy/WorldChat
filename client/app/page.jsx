"use client"

import { useEffect, useState } from "react"
import Name from "./pages/Name"
import Chat from "./pages/Chat"
import NavBar from "./components/NavBar"

export default function Home() {
	const API_URL = "ws://127.0.0.1:8000/chat/" // Change this URL if the API is hosted separately
	const socket = new WebSocket(API_URL)
	const [name, setName] = useState()

	useEffect(() => {
			socket.onopen = () => {
				socket.send(name)
			}
	}, [name])

	return (
		<main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-700 h-5/6 w-5/6 sm:w-[600px] md:w-[600px] lg:w-[600px] xl:w-[600px] rounded-3xl border-2 border-red-500">
			<NavBar />
			{name ? <Chat socket={socket} /> : <Name setName={setName} />}
		</main>
	);
}
