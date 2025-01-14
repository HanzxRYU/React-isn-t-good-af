import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeSwitcher from "./Tugas 11/Soal-1";
import StatusSwitcher from "./Tugas 11/Soal-2";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StatusSwitcher/>
  </StrictMode>
);
