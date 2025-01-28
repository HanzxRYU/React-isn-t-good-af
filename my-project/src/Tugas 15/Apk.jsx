import React, { useState } from "react";
import axios from "axios";

const LoginPages = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset pesan sebelumnya

    try {
      // Kirim data username dan password ke API
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      // Jika berhasil
      const { token } = response.data;
      console.log(response.data);

      // Menyimpan token di localStorage
      localStorage.setItem("authToken", token);

      setMessage(`Login Berhasil! Token disimpan.`);
    } catch (error) {
      // Jika gagal
      setMessage("Login Gagal: Username atau Password salah.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center ${
              message.includes("Berhasil") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPages;
