import React, { useState, useEffect } from "react";

// Custom Hook: useTheme
function useTheme() {
  const [theme, setTheme] = useState("light"); // Default theme: light

  // Efek samping untuk mencatat perubahan tema ke konsol
  useEffect(() => {
    console.log(`Tema aktif: ${theme}`);
  }, [theme]);

  // Fungsi untuk beralih tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}

// Komponen: ThemeSwitcher
function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme(); // Menggunakan custom hook

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "20px",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <h1>Mode Tema: {theme === "light" ? "Terang" : "Gelap"}</h1>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Beralih ke {theme === "light" ? "Gelap" : "Terang"}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
