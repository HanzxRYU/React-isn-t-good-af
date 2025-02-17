import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Halaman Login
const Login = ({ setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.access_token) {
        const token = response.data.access_token;
        localStorage.setItem("token", token);

        // Decode token untuk dapat userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub; // 'sub' adalah ID user dari token

        // Ambil data user berdasarkan ID dari API
        const userResponse = await axios.get(
          `https://api.escuelajs.co/api/v1/users/${userId}`
        );
        const userName = userResponse.data.name; // Ambil nama user dari API
        setUserName(userName);

        navigate("/products");
      } else {
        setError("Login gagal. Token tidak diterima.");
      }
    } catch (err) {
      setError("Login gagal. Periksa kembali email dan password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

// Halaman Produk
const ProductCard = ({ userName }) => {
  const navigate = useNavigate();
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
      <div className="p-4 bg-gray-200 text-center text-lg font-semibold">
        <p>Welcome, {userName}!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold truncate">
                {product.title}
              </h2>
              <p className="text-gray-500">${product.price}</p>
              <button
                className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Halaman Detail Produk
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate("/products")}
        className="bg-gray-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-cover"
        />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="text-gray-500">${product.price}</p>
        <p className="text-gray-700 text-center">{product.description}</p>
      </div>
    </div>
  );
};

// Routing Utama
const Nyocot = () => {
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/products" element={<ProductCard userName={userName} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default Nyocot;
