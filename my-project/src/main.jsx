import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Card from "./Tugas 6/Rendering List/Racket/Fragments/Card";
import Racket from "./Tugas 6/Rendering List/Racket/Fragments/Racket";
import UserPage from "./Tugas 6/Soal 2/Component/Pages/UserPage";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserPage/>
  </StrictMode>
);
