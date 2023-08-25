export default function Message({ message }) {
    return (
        <div className="p-3 text-white">
            <div className="flex items-center gap-3 font-bold bg-neutral-900/70 text-white px-2 py-1 rounded-lg w-fit">
                <span className="text-xs">{message.sender.name }</span>
                <span className="text-[10px] text-neutral-500">{message.sender.id}</span>
            </div>
            <span className="px-2 py-1">{message.message}</span>
        </div>
    )
}
