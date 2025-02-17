import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// ✅ Pastikan jwtDecode diimpor
// Impor file CSS

// ✅ Halaman Login
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("token", token); // Simpan token di localStorage
        axios
          .get("https://api.escuelajs.co/api/v1/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((profileResponse) => {
            const userProfile = profileResponse.data.id;
            console.log(userProfile);
            navigate("/products"); // Arahkan ke halaman produk setelah mendapatkan profile
          });
        // Arahkan ke halaman produk
      })
      .catch(() => {
        setError("Login gagal. Periksa kembali username dan password.");
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>

      <p>
        Username: johnd <br />
        Password: m38rmF$
      </p>
    </div>
  );
};

// ✅ Halaman Produk
const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Akses Ditolak: Silakan Login Terlebih Dahulu");
      navigate("/login");
      return;
    }

    // ✅ Cek isi token untuk debugging
    axios
      .get("https://fakestoreapi.com/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(response.data);
        setUser(decoded); // Set user data after fetching products
      })
      .catch(() => {
        setError("Token Tidak Valid, Silakan Login Ulang");
        localStorage.removeItem("token"); // Hapus token jika tidak valid
        navigate("/login");
      });
  }, [navigate]);

  // ✅ Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token
    navigate("/login"); // Redirect ke login
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Daftar Produk</h2>

      {/* ✅ Menampilkan Nama User */}
      {user ? (
        <p className="user-info">
          Halo, <strong>{userProfile?.user}</strong> 👋
        </p>
      ) : (
        <p className="user-info">Memuat data user...</p>
      )}

      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>

      {error && <p className="error-message">{error}</p>}

      <table className="products-table">
        <thead>
          <tr>
            <th>ID Produk</th>
            <th>Nama Produk</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Routing Utama
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Login />} /> {/* Redirect default ke login */}
      </Routes>
    </Router>
  );
};

export default App;
