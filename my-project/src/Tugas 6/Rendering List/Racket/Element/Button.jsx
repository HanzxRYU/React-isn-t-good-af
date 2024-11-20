import React from "react";

const Button = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
  >
    {text}
  </button>
);

export default Button;
