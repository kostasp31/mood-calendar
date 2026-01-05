import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { CalendarContextProvider } from "./contexts/CalendarContext.jsx";

// TODO: Make tiles 3D when flipping

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CalendarContextProvider>
      <App />
    </CalendarContextProvider>
  </StrictMode>
);
