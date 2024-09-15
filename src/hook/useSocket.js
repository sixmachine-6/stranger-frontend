import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("https://stranger-backend-hhwz.onrender.com/");
    socket.on("connect", () => {
      console.log("user connected");
      setSocket(socket);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}
