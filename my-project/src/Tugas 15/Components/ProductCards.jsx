import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductCard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);

  // Memeriksa token sebelum mengambil data produk
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login"); // Jika tidak ada token, arahkan ke halaman login
    } else {
      // Mengambil data produk dari API
      axios
        .get("https://fakestoreapi.com/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setProducts(response.data))
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError("Token Tidak Valid, Silakan Login Ulang");
          localStorage.removeItem("authToken"); // Hapus token yang tidak valid
          setTimeout(() => navigate("/login"), 2000); // Redirect ke login
        });
    }
  }, [navigate]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigasi ke halaman detail produk
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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

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

export default ProductCard;
