import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (error: number) => void) => void;
  playerJoined?: (messageObject: { userId: string }) => void;
  playerLeft?: (messageObject: { userId: string }) => void;
}

interface ClientToServerEvents {
  joinRoom?: (roomId: string) => void;
  leaveRoom?: (roomId: string) => void;
}

interface SocketContextInterface {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  setSocket?: Dispatch<
    SetStateAction<
      Socket<ServerToClientEvents, ClientToServerEvents> | undefined
    >
  >;
}

const defaultState: SocketContextInterface = {};

export const SocketContext =
  createContext<SocketContextInterface>(defaultState);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // states
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
