import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import conf from "../conf/conf"
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {  
  const [socket, setSocket] = useState(null); // Track socket initialization

  useEffect(() => {
    const newSocket = io(conf.socket_url); // Initialize the socket connection
    setSocket(newSocket); // Update the state to ensure socket is available

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
    newSocket.disconnect(); // Clean up the socket connection
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
