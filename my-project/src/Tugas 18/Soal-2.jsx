import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
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
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

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
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{product.title}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => navigate(`/update/${index}`)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if (products[id]) {
      setFormData(products[id]);
    } else {
      navigate("/list");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products[id] = formData;
    localStorage.setItem("products", JSON.stringify(products));
    navigate("/list");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Update Product</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Update Product
        </button>
      </form>
      <Link to="/list" className="text-blue-500">
        Back to Product List
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
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
