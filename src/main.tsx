import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

// custom
import "./index.css";
import App from "./App.tsx";
import AppContextProvider from "./contexts/app.tsx";
import "./i18n/config.ts";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
