function ChatItem({ chat }) {
  console.log(chat.own);
  return (
    <li className={`flex  ${chat.own ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`${
          chat.own ? "bg-slate-200" : "bg-lime-200"
        } p-2 rounded-md`}
      >
        <p className="text-xs text-stone-700">{chat.socket}</p>
        <p className="font-semibold text-stone-800">{chat.message}</p>
      </div>
    </li>
  );
}

export default ChatItem;
