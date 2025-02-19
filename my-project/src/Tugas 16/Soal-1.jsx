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

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const userResponse = await axios.get(
          `https://api.escuelajs.co/api/v1/users/${userId}`
        );
        const userName = userResponse.data.name || "User";
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

// Halaman Produk (ProductCard)
function ProductCard({ userName }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

  const calculateTotalPrice = (id, price) => {
    return (quantities[id] || 0) * price;
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <div>
          <span>Selamat datang, {userName}!</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-lg font-semibold text-red-500">
                ${product.price}
              </p>

              <div className="flex items-center space-x-4 mb-4 text-sm font-medium">
                <button
                  type="button"
                  className="h-10 w-10 rounded-md bg-gray-200 text-gray-700"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <div className="text-lg font-semibold text-gray-900">
                  Quantity: {quantities[product.id] || 0}
                </div>
                <button
                  type="button"
                  className="h-10 w-10 rounded-md bg-gray-200 text-gray-700"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>

              <div className="text-lg font-semibold text-gray-900 mb-6">
                Total Price: $
                {calculateTotalPrice(product.id, product.price).toFixed(2)}
              </div>

              <button
                onClick={() => handleProductClick(product.id)}
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Halaman Detail Produk
function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500 mt-12">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500 mt-12">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-xl text-gray-500 mt-12">
        Product not found.
      </div>
    );
  }

  return (
    <div className="font-sans max-w-screen-xl mx-auto p-6">
      <button
        onClick={handleGoBack}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
      >
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-md shadow-lg"
            loading="lazy"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {product.title}
          </h1>
          <div className="text-2xl font-semibold text-gray-700 mb-4">
            ${product.price}
          </div>
          <div className="text-sm font-medium text-gray-700 mb-4">In stock</div>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex space-x-4">
            <button
              className="h-12 px-6 font-semibold rounded-md bg-black text-white hover:bg-gray-900 transition duration-300"
              type="button"
            >
              Buy now
            </button>
            <button
              className="h-12 px-6 font-semibold rounded-md border border-gray-200 text-gray-900 hover:bg-gray-100 transition duration-300"
              type="button"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Routing Utama
const Routing = () => {
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/products" element={<ProductCard userName={userName} />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="*" element={<Login setUserName={setUserName} />} />
      </Routes>
    </Router>
  );
};

export default Routing;
