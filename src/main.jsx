import React from "react";
import { createRoot } from "react-dom/client";
import TarotApp from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TarotApp />
  </React.StrictMode>
);
