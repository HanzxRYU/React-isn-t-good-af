import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const goToSettings = (id) => {
    navigate(`/settings/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Dashboard Page</h1>
      <p className="text-lg mb-4">
        Klik tombol untuk masuk ke halaman pengaturan:
      </p>
      <button
        onClick={() => goToSettings(1)} // Berikan ID default untuk navigasi
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Ini adalah halaman pengaturan
      </button>
    </div>
  );
}

function SettingsPage() {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const navigate = useNavigate(); // Untuk navigasi kembali

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-semibold mb-4">Halaman Pengaturan</h2>
      <p className="text-lg mb-6">
        Anda sedang melihat pengaturan dengan ID:{" "}
        <span className="font-bold">{id}</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800">
      <h2 className="text-3xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-lg mb-6">URL yang Anda akses tidak valid.</p>
      <a
        href="/"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
      >
        Kembali ke Halaman Utama
      </a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/settings/:id",
    element: <SettingsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function Apt() {
  return <RouterProvider router={router} />;
}

export default Apt;
