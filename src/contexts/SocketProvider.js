import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children, currUser }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_BACKEND_API_HEROKU}`, {
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
