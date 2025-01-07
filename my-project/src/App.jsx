import React, { useState } from "react";
import Product from "./Product";

const products = [
  { name: "Produk A", price: 20000, image: "path_to_image_A" },
  { name: "Produk B", price: 30000, image: "path_to_image_B" },
  { name: "Produk C", price: 50000, image: "path_to_image_C" },
];

const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));

  const totalPrice = product.price * quantity;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-5">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">
        Harga: Rp {product.price.toLocaleString()}
      </p>

      <div className="flex items-center mb-4">
        <button
          onClick={decreaseQuantity}
          className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
        >
          Kurang
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-4 py-2 bg-green-500 text-white rounded-lg ml-2"
        >
          Tambah
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">
          Total: Rp {totalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
