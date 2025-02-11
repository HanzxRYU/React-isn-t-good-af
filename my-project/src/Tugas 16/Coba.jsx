import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError(""); // Reset error dulu

      // 🔥 Call API buat dapetin token (anggap ini API dari aku!)
      const response = await axios.post("https://dummyapi.com/auth/login", {
        email,
        password,
      });

      const token = response.data.token; // Ambil token dari response API
      localStorage.setItem("token", token); // Simpan token ke localStorage

      // 🔑 Decode JWT buat dapetin data user
      const decoded = jwtDecode(token);
      setUserProfile(decoded);
    } catch (err) {
      setError("Login gagal! Periksa email & password.");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={handleLogin}>LOGIN</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {userProfile && (
        <div>
          <h3>User Profile</h3>
          <ul>
            <li>ID: {userProfile.id}</li>
            <li>Name: {userProfile.name}</li>
            <li>Email: {userProfile.email}</li>
            <li>Role: {userProfile.role}</li>
            <li>
              <img src={userProfile.avatar} alt="avatar" width="100" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
