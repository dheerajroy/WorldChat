import { useEffect } from "react"

export default function Name({ setName }) {
    useEffect(() => {
        document.getElementById("name-form").onsubmit = (e) => {
            e.preventDefault()
            setName(document.getElementById("name-field").value)
        }
    }, [])

    return (
        <>
            <form action="post" id="name-form" className="flex flex-col justify-center items-center gap-3 h-full [&>*]:w-4/6">
                <input type="text" placeholder="Enter your name" id="name-field" autoComplete="off" required />
                <input type="submit" value="Chat" />
            </form>
        </>
    );
}
