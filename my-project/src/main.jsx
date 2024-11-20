import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


import RegisterForm from "./Tugas 4/Component/Organism/RegisterForm.jsx";
import WelcomeMessage from "./Tugas 5/Soal-1.jsx";
import DeliveryStatus from "./Tugas 5/Soal-2.jsx";
import Notification from "./Tugas 5/Soal-3.jsx";
import Greeting from "./Tugas 5/Soal-4.jsx";
import Button from "./Tugas 4/Component/Atom/Button.jsx";
import Racket from "./Tugas 6/Rendering List/Racket.jsx";
import Card from "./Tugas 6/Rendering List/Fragments/Card.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Card/>
  </StrictMode>
);
