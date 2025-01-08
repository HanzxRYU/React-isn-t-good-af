import React, { useState } from "react";
import { products } from "./Product";

// Komponen Card
const Card = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
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
        {quantity > 0 && (
          <p className="mt-4 text-lg font-semibold">
            Total Harga: Rp {totalPrice.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

// Komponen utama (App)
const App = () => {
  const [cart, setCart] = useState([]);

  const updateCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        if (quantity === 0) {
          return prevCart.filter((item) => item.name !== product.name);
        }
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity } : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <Card
            key={product.name}
            product={product}
            onQuantityChange={(quantity) => updateCart(product, quantity)}
          />
        ))}
      </div>
      <div className="bg-gray-100 p-4 mt-4">
        <h2 className="text-xl font-semibold">Keranjang Belanja</h2>
        {cart.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          cart.map((item) => (
            <p key={item.name}>
              {item.name} x {item.quantity} = Rp{" "}
              {(item.price * item.quantity).toLocaleString()}
            </p>
          ))
        )}
        <p className="font-bold mt-4">
          Total Harga: Rp {totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default App;
