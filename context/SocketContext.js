import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [ipAddress, setIpAddress] = useState("http://192.168.1.13:8787");

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setIsConnected(false);
      }
    };
  }, [socket]);

  const connectSocket = (address) => {
    try {
      const newSocket = io(address);
      setSocket(newSocket);
      setIpAddress(address);
    } catch (e) {
      alert(`Socket bağlantısı yapılamıyor: `, e);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, ipAddress, connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
