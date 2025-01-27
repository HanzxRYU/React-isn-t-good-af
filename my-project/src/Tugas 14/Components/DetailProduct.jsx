import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    navigate("/"); // Arahkan ke halaman utama
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

export default DetailProduct;
