import { createBrowserRouter, RouterProvider } from "react-router-dom";
function CobaRouter() {
  return <h2>Halaman Utama</h2>;
}
function SecondPlace() {
  return <h2>Halaman Kedua</h2>;
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
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
