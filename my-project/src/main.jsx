import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import LoginStatus from "./Tugas 8/Soal-2";
import SimpleCalculator from "./Tugas 8/Soal-3";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SimpleCalculator/>
  </StrictMode>
);
