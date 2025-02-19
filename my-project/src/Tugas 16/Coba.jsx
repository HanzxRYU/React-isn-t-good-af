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
const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({}); // ✅ State baru untuk menyimpan jumlah barang di keranjang
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Akses Ditolak: Silakan Login Terlebih Dahulu");
      navigate("/login");
      return;
    }

    axios
      .get("https://fakestoreapi.com/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
      .catch(() => {
        setError("Token Tidak Valid, Silakan Login Ulang");
        localStorage.removeItem("token"); // Hapus token jika tidak valid
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Fungsi menambah barang
  const increaseQuantity = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  // ✅ Fungsi mengurangi barang
  const decreaseQuantity = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: Math.max((prevCart[id] || 0) - 1, 0),
    }));
  };

  // ✅ Hitung total barang di keranjang
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
        <span className="text-lg font-bold">🛒 Total Barang: {totalItems}</span>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
              Kuantitas
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
              <td className="px-6 py-4 text-sm text-gray-700 flex items-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                {cart[product.id] || 0}
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md ml-2"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
const Routing = () => {
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/products" element={<Products userName={userName} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default Routing;
