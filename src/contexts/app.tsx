import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { io } from "socket.io-client";

// custom
import { SOCKET_API, TOKEN_KEY, USER_ID_KEY } from "@/data/app";
import { useToast } from "@/hooks/use-toast";
import paraClient from "@/web3/para-client";
import { useSocketContext } from "./socket";

const defaultState: AppContextState = {
  volume: 30,
  loadingText: undefined,
  token: localStorage.getItem(TOKEN_KEY) ?? "",
  userId: localStorage.getItem(USER_ID_KEY) ?? "",
  authChecking: false,
  island: "",
};

const AppContext = createContext<AppContextState>(defaultState);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // hooks
  const { toast } = useToast();
  const { setSocket, socket } = useSocketContext();

  // refs
  const audioReference = useRef<HTMLAudioElement | null>(null);
  const authChecked = useRef<boolean>(false);

  // context states
  const [volume, setVolume] = useState<number>(defaultState.volume);
  const [loadingText, setLoadingText] = useState<undefined | string>(
    defaultState.loadingText
  );
  const [token, setToken] = useState<string>(defaultState.token);
  const [userId, setUserId] = useState<string>(defaultState.userId);
  const [authChecking, setAuthChecking] = useState<boolean>(
    defaultState.authChecking
  );
  const [island, setIsland] = useState<string>(defaultState.island);

  // states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // volume handler for volume controller
  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioReference.current) {
      audioReference.current.volume = newVolume / 100;
    }
  }, []);

  // local variables
  const value: AppContextState = useMemo(
    () => ({
      volume,
      setVolume,
      handleVolumeChange,
      loadingText,
      setLoadingText,
      token,
      setToken,
      userId,
      setUserId,
      authChecking,
      setAuthChecking,
      island,
      setIsland,
    }),
    [
      volume,
      handleVolumeChange,
      loadingText,
      token,
      userId,
      authChecking,
      island,
    ]
  );

  // when landing checking if the para
  // session didn't expire also check
  // if the user is in any game
  useEffect(() => {
    if (!token || authChecking || authChecked.current) return;

    const checkingExpiration = async () => {
      setAuthChecking(true);
      try {
        const isSessionActive = await paraClient.isSessionActive();

        // when session expired, perform log out operations
        if (!isSessionActive) {
          await paraClient.logout();
          await axios.delete("/auth/logout", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setToken("");
          setUserId("");
          setIsland("");
          setSocket!((previous) => {
            if (previous) {
              previous.disconnect();
              return undefined;
            } else {
              return undefined;
            }
          });
          setAuthChecking(false);

          toast({
            title: "⚠️ The Wind Has Shifted! ⏳",
            description:
              "Arrr! Ye've been adrift too long, and the session be gone! Log in again to continue yer journey!",
          });
          return;
        }

        // when session active see if user
        // is in any match
        const { data } = await axios.post<{ currentGame: string | null }>(
          "/users/current-game",
          undefined,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuthChecking(false);
        if (data.currentGame !== null) {
          setIsland(data.currentGame);
        }
      } catch {
        setAuthChecking(false);
      }
    };
    checkingExpiration();

    authChecked.current = true;
  }, [token, authChecking, toast, setSocket]);

  // play audio after first user interaction anywhere
  // on the page
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioReference.current && !isPlaying) {
        audioReference.current.volume = volume / 100;
        audioReference.current
          .play()
          .catch((error) => console.error("Playback failed:", error));
        setIsPlaying(true);
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [isPlaying, volume]);

  // storing token and userId to localstorage
  // when they change
  useEffect(() => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userId);
    if (userId) {
      setSocket!(
        (previous) => previous ?? io(SOCKET_API, { query: { userId } })
      );
    } else {
      setSocket!(undefined);
    }
  }, [setSocket, token, userId]);

  // socket events
  useEffect(() => {
    if (socket === undefined) return;

    // join island event
    if (island.length > 0) {
      socket.emit("joinRoom", island);
    }
  }, [socket, island]);

  return (
    <>
      <audio
        ref={audioReference}
        src="/audio/bg.mp3"
        loop
        autoPlay
      />
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
};

export default AppContextProvider;

interface AppContextState {
  volume: number;
  setVolume?: React.Dispatch<React.SetStateAction<number>>;
  handleVolumeChange?: (value: number[]) => void;
  loadingText: undefined | string;
  setLoadingText?: React.Dispatch<React.SetStateAction<undefined | string>>;
  token: string;
  setToken?: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId?: React.Dispatch<React.SetStateAction<string>>;
  authChecking: boolean;
  setAuthChecking?: React.Dispatch<React.SetStateAction<boolean>>;
  island: string;
  setIsland?: React.Dispatch<React.SetStateAction<string>>;
}
