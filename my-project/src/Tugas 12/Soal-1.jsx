import { createBrowserRouter, RouterProvider } from "react-router-dom";

function CobaRouter() {
  return <h2>Halaman Utama</h2>;
}

function SecondPlace() {
  return <h2>Halaman Kedua</h2>;
}

function NotFound() {
  return <h2>Halaman Tidak Ditemukan</h2>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <CobaRouter />,
  },
  {
    path: "/second-place",
    element: <SecondPlace />,
  },
  {
    path: "*", // Rute wildcard untuk menangani halaman yang tidak ditemukan
    element: <NotFound />,
  },
]);

function Apk() {
  return <RouterProvider router={router} />;
}

export default Apk;
