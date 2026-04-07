import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { UserContextProvider } from "./hook/useAuth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <App />
      <Toaster richColors position="top-right" />
    </UserContextProvider>
  </StrictMode>,
);
