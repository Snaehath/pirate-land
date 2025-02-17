import { OAuthMethod, ParaModalProps } from "@getpara/react-sdk";

// custom
import { Language } from "@/lib/types";

export const REST_API = "http://localhost:5000/api";

export const CELESTIA_BRAND_LINK = "https://celestia.org/";
export const PARA_BRAND_LINK = "https://www.getpara.com/";

export const TOKEN_KEY = "pirate-land:token";
export const USER_ID_KEY = "pirate-land:userId";

export const APP_NAME = "Pirate Land";

export const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ru", name: "Русский" },
  { code: "ar", name: "العربية" },
  { code: "ta", name: "தமிழ்" },
  { code: "hi", name: "हिंदी" }
];

export const PARA_MODAL_PROPS: ParaModalProps = {
  appName: APP_NAME,
  logo: "https://pirateland.vercel.app/favicon.svg",
  oAuthMethods: [
    OAuthMethod.GOOGLE,
    OAuthMethod.APPLE,
    OAuthMethod.FACEBOOK,
  ],
  disablePhoneLogin: true,
  authLayout: ["AUTH:FULL"],
  externalWallets: [],
  recoverySecretStepEnabled: true,
  onRampTestMode: true,
};