import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem("products", JSON.stringify([...products, formData]));
    setMessage("Product added successfully!");
    setTimeout(() => navigate("/list"), 1000);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Create Product</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Product
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
      <Link to="/list" className="text-blue-500">
        View Product List
      </Link>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Product List</h1>
      {products.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-3">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{product.title}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
      <Link to="/" className="text-blue-500">
        Back to Create Product
      </Link>
    </div>
  );
};

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      localStorage.setItem("user", credentials.username);
      navigate("/");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          name="username"
          placeholder="Username"
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
          Login
        </button>
      </form>
      {message && <p className="text-red-600">{message}</p>}
      <Link to="/" className="text-blue-500">
        Back to Create Product
      </Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProduct />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
