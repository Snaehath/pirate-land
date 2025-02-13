import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

// custom
import { LanguageCode } from "@/lib/types";

const defaultState: AppContextState = {
  languageCode: "en",
  volume: 0,
};

const AppContext = createContext<AppContextState>(defaultState);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // states
  const [languageCode, setLanguageCode] = useState<LanguageCode>("en");
  const [volume, setVolume] = useState<number>(0);

  // local variables
  const value: AppContextState = useMemo(
    () => ({ languageCode, setLanguageCode, volume, setVolume }),
    [languageCode, volume]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

interface AppContextState {
  languageCode: LanguageCode;
  setLanguageCode?: React.Dispatch<React.SetStateAction<LanguageCode>>;
  volume: number;
  setVolume?: React.Dispatch<React.SetStateAction<number>>;
}
