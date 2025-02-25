import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import axios from "axios";

// custom
import "./index.css";
import "@getpara/react-sdk/styles.css";
import "./i18n/config.ts";
import App from "./App.tsx";
import AppContextProvider from "./contexts/app.tsx";
import { REST_API } from "./data/app.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { SocketContextProvider } from "./contexts/socket.tsx";

axios.defaults.baseURL = REST_API;

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <HashRouter>
      <SocketContextProvider>
        <AppContextProvider>
          <App />
          <Toaster />
        </AppContextProvider>
      </SocketContextProvider>
    </HashRouter>
  </StrictMode>,
);
