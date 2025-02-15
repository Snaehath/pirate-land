import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// custom
import { LANGUAGES } from "@/data/app";

i18n.use(HttpApi).use(initReactI18next).init({
  lng: "en", 
  fallbackLng: "en", 
  supportedLngs: LANGUAGES.map((language) => language.code),
  interpolation: {
    escapeValue: false,
  },
});

// eslint-disable-next-line unicorn/prefer-export-from
export default i18n;