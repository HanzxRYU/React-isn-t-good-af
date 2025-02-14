import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Custom Hook for fetching products
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProducts();
  }, []);

  return { products, loading, error };
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/products");
    } catch (err) {
      setError("Login gagal. Periksa kembali username dan password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useFetchProducts();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-64 mx-auto my-4"
      />
      <p className="text-lg">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/products")}
      >
        Back to Products
      </button>
    </div>
  );
};

const ProductCard = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useFetchProducts();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Logout
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">Daftar Produk</h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
              ID Produk
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
              Nama Produk
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
              Harga
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">{product.id}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {product.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                ${product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Nyocot = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductCard />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  </Router>
);

export default Nyocot;
