// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseURL } from '../constants';

const useSocket = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      // Change this line to check if userId is available
      const socketIo = io(baseURL, {
        withCredentials: true // If you need to send cookies with the connection
      });

      socketIo.emit('join', userId);

      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
      };
    }
  }, [userId]);

  return socket;
};

export default useSocket;
