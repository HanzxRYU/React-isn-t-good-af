import React, { useState } from "react";
import { products } from "./Product";
// Data produk


// Komponen Card untuk menampilkan produk
const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = quantity * product.price;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-lg text-gray-700">
          Rp {product.price.toLocaleString()}
        </p>
        <div className="flex items-center mt-4">
          <button
            onClick={decreaseQuantity}
            className="bg-red-500 text-white px-3 py-1 rounded mr-2"
          >
            Kurang
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
          >
            Tambah
          </button>
        </div>
        <p className="mt-4 text-lg font-semibold">
          Total: Rp {totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Komponen utama aplikasi
const App = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <Card key={product.name} product={product} />
      ))}
    </div>
  );
};

export default App;
