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

// Custom Hook for fetching a single product
const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return { product, loading, error };
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("Login Berhasil!");
      navigate("/ProductCard");
    } catch (err) {
      setMessage("Login gagal. Periksa kembali username dan password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const ProductCard = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useFetchProducts();
  const [quantities, setQuantities] = useState({});
  // 

  const increaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  if (loading) return <div>Loading products...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-lg font-semibold text-red-500">
              ${product.price}
            </p>

            <div className="flex items-center space-x-4 mb-4">
              <button onClick={() => decreaseQuantity(product.id)}>-</button>
              <span>Quantity: {quantities[product.id] || 0}</span>
              <button onClick={() => increaseQuantity(product.id)}>+</button>
            </div>

            <p>
              Total Price: $
              {(quantities[product.id] || 0 * product.price).toFixed(2)}
            </p>

            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const DetailProduct = () => {
  const { id } = useParams();
  const { product, loading, error } = useFetchProduct(id);

  if (loading) return <div>Loading product details...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="flex max-w-screen-xl mx-auto p-6">
      <button onClick={() => navigate("/")} className="mb-4">
        Back to Products
      </button>

      <img src={product.image} alt={product.title} className="w-48 h-auto" />

      <div className="flex-auto p-6">
        <h1>{product.title}</h1>
        <p>${product.price}</p>
        <p>{product.description}</p>

        <button type="button" className="bg-black text-white">
          Buy now
        </button>
        <button type="button" className="border">
          Add to bag
        </button>
      </div>
    </div>
  );
};

const Nyocot = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ProductCard" element={<ProductCard />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Nyocot;
