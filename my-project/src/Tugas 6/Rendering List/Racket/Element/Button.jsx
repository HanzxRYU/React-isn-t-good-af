import React from "react";

const Button = ({ text, onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    {text}
  </button>
);

export default Button;
