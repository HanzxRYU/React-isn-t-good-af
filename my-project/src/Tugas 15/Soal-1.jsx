import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  // Fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Mengirim permintaan POST ke API login
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      // Menyimpan token yang diterima ke localStorage
      const receivedToken = response.data.token;
      localStorage.setItem("token", receivedToken);

      // Menampilkan pesan berhasil dan token
      setMessage("Login Berhasil!");
      setToken(receivedToken); // Menyimpan token di state
    } catch (err) {
      // Menangani error jika login gagal
      setMessage("Login gagal. Periksa kembali username dan password.");
      setToken(null);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {/* Menampilkan pesan login */}
      {message && <p>{message}</p>}
      {token && <p>Token berhasil disimpan di localStorage.</p>}
    </div>
  );
};

export default Login;
