import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProductCard = ({ userName }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      setError("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );
      setProducts([...products, response.data]);
      setNewProduct({ title: "", price: "", image: "" });
    } catch (err) {
      setError("Failed to add product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Welcome, {userName}!</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          className="border p-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 ml-2"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-lg font-bold mt-2">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
              View
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Nyocot = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/products" element={<ProductCard userName={userName} />} />
      </Routes>
    </Router>
  );
};

export default Nyocot;
