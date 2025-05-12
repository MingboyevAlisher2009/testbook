import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GeneralBackgroud from "./components/general-backgroud.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralBackgroud>
        <App />
      </GeneralBackgroud>
    </BrowserRouter>
  </StrictMode>
);
