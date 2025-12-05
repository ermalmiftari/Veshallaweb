import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// IMPORTANT: load i18next before App
import "./i18n";

import App from "./pages/App";

// Create root with strict typing
const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
