import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";
import Message from "../components/Message";
import Welcome from "../components/Welcome";
import ChatBox from "../components/ChatBox";
import toast from "react-hot-toast";

function Home() {
  const [status, setStatus] = useState("welcome");
  const [message, setMessage] = useState(null);
  const [chats, setChats] = useState([]);

  const socket = useSocket();

  // useEffect(function () {
  //   async function accessVideoAndAudio() {}
  // }, []);

  useEffect(
    function () {
      async function webRTCAndSocket() {
        if (!socket) return;

        socket.on("pairing", (data) => {
          setMessage(data);
        });

        socket.on("paired", (data) => {
          toast.success(data);
          setStatus("found");
        });

        socket.on("recieveMessage", (data) => {
          console.log(data);
          setChats((chats) => [...chats, data]);
        });

        socket.on("disconnected", (data) => {
          console.log(data);
          setMessage(data);
          setStatus("pairing");
        });
      }
      webRTCAndSocket();
    },

    [socket]
  );
  return (
    <div className="bg-slate-50 h-screen overflow-scroll">
      {status === "welcome" && (
        <Welcome socket={socket} setStatus={setStatus} />
      )}
      {status === "pairing" && <Message message={message} />}
      {status === "found" && (
        <ChatBox socket={socket} chats={chats} setChats={setChats} />
      )}
    </div>
  );
}

export default Home;
