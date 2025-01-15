import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

function CobaRouter() {
  return <h2>Halaman Utama</h2>;
}

function SecondPlace() {
  return <h2>Halaman Kedua</h2>;
}

function NotFoundPage() {
  return (
    <div>
      <h2>Halaman tidak ditemukan</h2>
      <Link to="/">kata-kata</Link>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <CobaRouter />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/second-place",
    element: <SecondPlace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
