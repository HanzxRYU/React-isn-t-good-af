import React, { useState, useEffect } from "react";

export default function TextLogger() {
  const [text, setText] = useState("");
  const [updatedText, setUpdatedText] = useState("");

  // Fungsi untuk mengupdate updatedText
  const updateText = () => {
    setUpdatedText(text);
  };

  useEffect(() => {
    console.log(`Text berubah menjadi: ${text}`);
  }, [text]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Text Logger
      </h1>
      <p className="text-lg text-gray-800 mb-4">Text Saat ini: {updatedText}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Masukkan teks..."
        className="w-full p-2 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={updateText}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Update
      </button>
    </div>
  );
}
