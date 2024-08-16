// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseURL } from '../constants';

const useSocket = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(baseURL);

    socketIo.emit('join', userId);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
