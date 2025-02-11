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
      localStorage.setItem("token", token); // Simpan token di localStorage
      navigate("/products"); // Arahkan ke halaman produk
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
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

function ProductCard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // Menyimpan quantity produk

  // Mengambil data produk dari API
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Navigasi ke halaman detail produk berdasarkan ID
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // URL dinamis, /product/:id
  };

  // Menambah quantity produk
  const increaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  // Mengurangi quantity produk
  const decreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  // Menghitung total harga produk
  const calculateTotalPrice = (id, price) => {
    return (quantities[id] || 0) * price;
  };

  return (
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

            {/* Quantity Control */}
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

            {/* Total Price */}
            <div className="text-lg font-semibold text-gray-900 mb-6">
              Total Price: $
              {calculateTotalPrice(product.id, product.price).toFixed(2)}
            </div>

            {/* Button to view details */}
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
  );
}

function DetailProduct() {
  const { id } = useParams(); // Mengambil id produk dari URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data produk berdasarkan ID
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

  // Fungsi untuk kembali ke halaman utama (atau menu awal)
  const handleGoBack = () => {
    navigate("Products"); // Arahkan ke halaman utama
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

  return (
    <div className="flex font-sans max-w-screen-xl mx-auto p-6">
      {/* Tombol Back */}
      <button
        onClick={handleGoBack}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        Back to Products
      </button>

      {/* Gambar Produk */}
      <div className="flex-none w-48 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain rounded-md"
          loading="lazy"
        />
      </div>

      {/* Form Detail Produk */}
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold text-gray-900">
            {product.title}
          </h1>
          <div className="text-lg font-semibold text-gray-500">
            ${product.price}
          </div>
          <div className="w-full flex-none text-sm font-medium text-gray-700 mt-2">
            In stock
          </div>
        </div>

        {/* Deskripsi Produk */}
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="text-sm text-gray-700 mt-4">
          Free shipping on all continental US orders.
        </p>

        {/* Tombol Interaksi */}
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              type="submit"
            >
              Buy now
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-gray-200 text-gray-900"
              type="button"
            >
              Add to bag
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
const Nyocot = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Products" element={<ProductCard />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Nyocot;
