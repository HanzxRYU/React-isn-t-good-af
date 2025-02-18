import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/users/";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://i.pravatar.cc/150",
  });
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      setMessage("User created successfully!");
      fetchUsers();
      setLoggedInUser(response.data);
    } catch (error) {
      setMessage("Error creating user.");
      console.error(error);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">User Management</h1>
      {loggedInUser && (
        <div className="flex justify-between items-center my-4">
          <span>Welcome, {loggedInUser.name}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Create User
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}

      <h2 className="text-lg font-bold">Users List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mt-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role || "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
