import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/users/";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: "https://i.pravatar.cc/150",
  });
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle input change for creating a user
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.post(API_URL, userData);
      setMessage("User created successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        avatar: "https://i.pravatar.cc/150",
      });
      fetchUsers();
    } catch (error) {
      setMessage("Error creating user.");
      console.error(error);
    }
  };

  // Handle delete user by ID
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}${userId}`);
      setMessage("User deleted successfully!");
      setUserId(""); // Reset input field
      fetchUsers();
    } catch (error) {
      setMessage("Error deleting user.");
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">User Management</h1>

      {/* Form Create User */}
      <div className="mb-5">
        <h2 className="text-lg font-bold">Create User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="border p-2 mr-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="border p-2 mr-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleChange}
            value={formData.role}
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
      </div>

      {/* Form Delete User */}
      <div className="mb-5">
        <h2 className="text-lg font-bold">Delete User</h2>
        <form onSubmit={handleDelete}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete User
          </button>
        </form>
      </div>

      {/* Message Display */}
      {message && <p className="text-green-600">{message}</p>}

      {/* Users List */}
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
