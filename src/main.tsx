import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import axios from "axios";

// custom
import "./index.css";
import "@getpara/react-sdk/styles.css";
import App from "./App.tsx";
import AppContextProvider from "./contexts/app.tsx";
import { REST_API } from "./data/app.ts";
import "./i18n/config.ts";
import { Toaster } from "./components/ui/toaster.tsx";

axios.defaults.baseURL = REST_API;

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <HashRouter>
      <AppContextProvider>
        <App />
        <Toaster />
      </AppContextProvider>
    </HashRouter>
  </StrictMode>,
);
