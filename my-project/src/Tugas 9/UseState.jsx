import React, { useState } from "react";
import { products } from "./Product";

function ShoppingCard({ title, price, src, quantity, onUpdate }) {
  const increment = () => {
    onUpdate(title, price, 1);
  };

  const decrement = () => {
    if (title === "Produk C" && quantity <= 0) {
      return;
    }
    if (quantity > 0) {
      onUpdate(title, price, -1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out">
      <img
        src={src}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="py-2">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">Harga: Rp.{price}</p>
        <p className="text-gray-600">Quantity: {quantity}</p>
        <p className="text-gray-600 font-semibold">Total: Rp.{quantity * price}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-600 text-white w-1/2 py-2 rounded-md transition duration-200 ease-in-out"
          onClick={increment}
        >
          Tambah
        </button>
        <button
          className="bg-red-600 text-white w-1/2 py-2 rounded-md transition duration-200 ease-in-out"
          onClick={decrement}
        >
          Kurang
        </button>
      </div>
    </div>
  );
}

export default function Produk() {
  const [totalHarga, setTotalHarga] = useState(0);
  const [rincian, setRincian] = useState({});

  const handleUpdate = (title, price, quantityChange) => {
    setTotalHarga((prevTotal) => prevTotal + price * quantityChange);

    setRincian((prevRincian) => {
      const prevData = prevRincian[title] || { quantity: 0, total: 0 };
      const newQuantity = prevData.quantity + quantityChange;

      return {
        ...prevRincian,
        [title]: {
          quantity: newQuantity > 0 ? newQuantity : 0,
          total: newQuantity > 0 ? newQuantity * price : 0,
        },
      };
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <ShoppingCard
            key={product.id}
            title={product.title}
            price={product.price}
            src={product.image}
            quantity={rincian[product.title]?.quantity || 0}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      <div className="mt-8 border-t pt-6 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">Rincian Harga:</h2>
        <ul className="list-disc list-inside mt-2">
          {products.map((product) => (
            <li key={product.id} className="text-gray-700">
              {product.title} x {rincian[product.title]?.quantity || 0} = Rp.
              {rincian[product.title]?.total || 0}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold mt-4 text-gray-800">Total Harga: Rp.{totalHarga}</p>
      </div>
    </>
  );
}