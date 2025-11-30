import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Themeprovider from "./Context/theme/Themeprovider.jsx";
import { SessionProvider } from "./Context/session/sessionprovide";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <Themeprovider>
        <App />
      </Themeprovider>
    </SessionProvider>
  </StrictMode>
);
