import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">User Management App</h1>
      <nav className="mt-4">
        <Link
          to="/create-user"
          className="mr-4 p-2 bg-blue-500 text-white rounded"
        >
          Create User
        </Link>
        <Link to="/users" className="p-2 bg-green-500 text-white rounded">
          View Users
        </Link>
      </nav>
    </div>
  );
}

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: avatar || "https://api.lorem.space/image/face?w=150&h=150",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("User created successfully!");
        setIsSuccess(true);
        setTimeout(() => navigate("/users"), 2000);
      } else {
        setMessage(
          "Failed to create user: " + (data.message || "Unknown error")
        );
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded mr-10"
        >
          Create User
        </button>
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Back
        </button>
      </form>
      {message && (
        <p className={`mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/" className="mt-4 block p-2 bg-gray-500 text-white rounded">
        Back to Home
      </Link>
    </div>
  );
}

function Applikasi() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default Applikasi;
