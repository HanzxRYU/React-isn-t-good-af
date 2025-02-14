import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import React from "react";

function ProfilePage() {
  const navigate = useNavigate();

  const goToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Profile Page</h1>
      <p className="text-lg mb-4">Klik tombol untuk melihat detail profile:</p>
      <button
        onClick={() => goToProfile("berly")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Lihat Profile Berly
      </button>
    </div>
  );
}

function ProfileDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-semibold mb-4">Detail Profile</h2>
      <p className="text-lg mb-6">
        Profile dengan ID: <span className="font-bold">{id}</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
      >
        Kembali ke Halaman Awal
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
    element: <ProfilePage />,
  },
  {
    path: "/profile/:id",
    element: <ProfileDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function Apl() {
  return <RouterProvider router={router} />;
}

export default Apl;
