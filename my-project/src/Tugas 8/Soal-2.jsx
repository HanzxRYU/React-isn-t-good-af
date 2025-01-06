import React, { useState } from "react";

function LoginStatus() {
  const [login, setLogin] = useState(false); 
  const [name, setName] = useState("Uddin");

  const handleLogin = () => setLogin(true);
  const handleLogout = () => setLogin(false);

  return (
    <div className="p-4">
      {login ? (
        <>
          <p className="text-2xl font-bold mt-4 ml-4">
            Selamat Datang, {name}!
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-lg mt-4 ml-4">Silahkan Login</p>
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default LoginStatus;
