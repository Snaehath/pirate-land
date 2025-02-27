import { Message } from "@/lib/types";
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
  playerJoined?: (data: { userId: string }) => void;
  playerLeft?: (data: { userId: string }) => void;
  readyGame?: (data: { roomId: string }) => void;
  newMessage?: (data: Message) => void;
  placement?: () => void;
  startedGame?: (data: { roomId: string }) => void;
  endedGame?: (data: { roomId: string }) => void;
  captured?: (data: { position: number }) => void;
  chanceUpdate?: (data: {playerId: string}) => void;
}

interface ClientToServerEvents {
  joinRoom?: (roomId: string) => void;
  leaveRoom?: (roomId: string) => void;
  readyGame?: (roomId: string) => void;
  newMessage?: (data: { roomId: string; msgObj: Message }) => void;
  placement?: (roomId: string) => void;
  startedGame?: (roomId: string) => void;
  captured?: (data: { roomId: string; position: number }) => void;
  chanceUpdate?: (data: {roomId: string, playerId: string}) => void;
  endedGame?: (data: { roomId: string }) => void;
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
