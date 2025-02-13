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

// custom
import { LanguageCode } from "@/lib/types";

const defaultState: AppContextState = {
  languageCode: "en",
  volume: 50,
};

const AppContext = createContext<AppContextState>(defaultState);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // refs
  const audioReference = useRef<HTMLAudioElement | null>(null);

  // states
  const [languageCode, setLanguageCode] = useState<LanguageCode>(
    defaultState.languageCode
  );
  const [volume, setVolume] = useState<number>(defaultState.volume);
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
      languageCode,
      setLanguageCode,
      volume,
      setVolume,
      handleVolumeChange,
    }),
    [languageCode, volume, handleVolumeChange]
  );

  // play audio after first user interaction anywhere on the page
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

  return (
    <>
      <audio
        ref={audioReference}
        src="/bg.mp3"
        loop
        autoPlay
      />
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
};

export default AppContextProvider;

interface AppContextState {
  languageCode: LanguageCode;
  setLanguageCode?: React.Dispatch<React.SetStateAction<LanguageCode>>;
  volume: number;
  setVolume?: React.Dispatch<React.SetStateAction<number>>;
  handleVolumeChange?: (value: number[]) => void;
}
