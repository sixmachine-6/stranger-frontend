import { useState } from "react";
import Tagline from "../ui/Tagline";
import Chats from "./Chats";

function ChatBox({ socket, setChats, chats }) {
  const [message, setMessage] = useState("");

  function handleMessage() {
    const data = { own: true, message, socket: socket.id };
    socket.emit("sendMessage", data);

    setChats((chats) => [...chats, data]);
    console.log("message sent");

    setMessage("");
  }

  return (
    <div>
      <Tagline />

      <Chats chats={chats} socket={socket} />

      <div className="fixed bottom-0 right-0 left-0 flex justify-center items-center mx-3">
        <input
          className="bg-slate-200 p-2 m-2 w-full rounded-xl focus:outline-slate-400"
          placeholder="Enter text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleMessage}
          className="bg-green-300 p-2 text-lg rounded-lg"
        >
          send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
