import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import apiEndpoints from "@config/constants";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || apiEndpoints.BASE_URL;
    const newSocket = io(socketUrl, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    // Global Event Listeners
    newSocket.on("connect", () => {
      console.log("🔌 Connected to Socket.IO:", newSocket.id);
    });

    newSocket.on("cart_updated", () => {
      console.log("📢 Cart updated via socket, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    });

    newSocket.on("wishlist_updated", () => {
      console.log("📢 Wishlist updated via socket, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    });

    newSocket.on("product_updated", () => {
      console.log("📢 Product updated via socket, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    });

    newSocket.on("order_created", () => {
      console.log("📢 Order created via socket, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    newSocket.on("profile_updated", () => {
      console.log("📢 Profile updated via socket, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    });

    newSocket.on("disconnect", () => {
      console.log("🔌 Disconnected from Socket.IO");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [queryClient]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
