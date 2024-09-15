import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://10.10.93.210:3000");
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
