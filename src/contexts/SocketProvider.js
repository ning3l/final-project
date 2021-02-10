import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children, currUser }) {
  const [socket, setSocket] = useState();

  console.log("currUser from socket", currUser);

  useEffect(() => {
    console.log("currUser from sooock", currUser);

    const newSocket = io("http://localhost:3000", {
      query: { id: currUser._id },
    });
    setSocket(newSocket);
    // cleanup old sockets
    return () => newSocket.close();
  }, [currUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
