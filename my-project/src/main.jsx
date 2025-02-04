import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Nyocot from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Nyocot/>
  </StrictMode>
);
