import { TOKEN_KEY, USER_ID_KEY } from "@/data/app";
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

const defaultState: AppContextState = {
  volume: 30,
  loadingText: undefined,
  token: localStorage.getItem(TOKEN_KEY) ?? "",
  userId: localStorage.getItem(USER_ID_KEY) ?? "",
};

const AppContext = createContext<AppContextState>(defaultState);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // refs
  const audioReference = useRef<HTMLAudioElement | null>(null);

  // context states
  const [volume, setVolume] = useState<number>(defaultState.volume);
  const [loadingText, setLoadingText] = useState<undefined | string>(
    defaultState.loadingText
  );
  const [token, setToken] = useState<string>(defaultState.token);
  const [userId, setUserId] = useState<string>(defaultState.userId);

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
    }),
    [volume, handleVolumeChange, loadingText, token, userId]
  );

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
  }, [token, userId]);

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
}
