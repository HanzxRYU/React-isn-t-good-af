// Import React dan React Router
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";

// Komponen untuk Halaman Utama
function HomePage() {
  const navigate = useNavigate();

  // Navigasi ke halaman detail produk
  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h1>Halaman Utama</h1>
      <p>Klik tombol untuk melihat detail produk:</p>
      <button onClick={() => goToProduct(1)}>Lihat Produk 1</button>
      <button onClick={() => goToProduct(2)}>Lihat Produk 2</button>
    </div>
  );
}

// Komponen untuk Halaman Detail Produk
function ProductPage() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL

  return (
    <div>
      <h2>Detail Produk</h2>
      <p>Produk dengan ID: {id}</p>
    </div>
  );
}

// Komponen untuk Halaman 404
function NotFoundPage() {
  return (
    <div>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>URL yang Anda akses tidak valid.</p>
    </div>
  );
}

// Konfigurasi Rute dengan React Router
const router = createBrowserRouter([
  {
    path: "/", // Rute utama
    element: <HomePage />,
  },
  {
    path: "/product/:id", // Rute dinamis untuk produk
    element: <ProductPage />,
  },
  {
    path: "*", // Rute wildcard untuk halaman tidak ditemukan
    element: <NotFoundPage />,
  },
]);

// Komponen Utama Aplikasi
function Apk() {
  return <RouterProvider router={router} />;
}

export default Apk;
