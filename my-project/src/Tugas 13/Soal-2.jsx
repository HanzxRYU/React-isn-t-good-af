import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductCard({ product, onQuantityChange }) {
  const [quantity, setQuantity] = useState(0);

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleQuantityChange = (operation) => {
    const newQuantity =
      operation === "increase" ? quantity + 1 : Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity * product.price);
  };

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h2 style={styles.title}>{product.title}</h2>
      <p style={styles.price}>
        Price: <strong>${product.price.toFixed(2)}</strong>
      </p>
      <div style={styles.quantityWrapper}>
        <button
          onClick={() => handleQuantityChange("decrease")}
          style={styles.button}
        >
          -
        </button>
        <span style={styles.quantity}>{quantity}</span>
        <button
          onClick={() => handleQuantityChange("increase")}
          style={styles.button}
        >
          +
        </button>
      </div>
      <p style={styles.total}>
        Total: <strong>${totalPrice}</strong>
      </p>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, productTotal) => {
    setTotalPrice((prevTotal) => {
      const newTotals = { ...prevTotal };
      newTotals[productId] = productTotal;
      return Object.values(newTotals).reduce((sum, value) => sum + value, 0);
    });
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Product Store</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div style={styles.totalPrice}>
        <h2>
          Grand Total: <strong>${totalPrice.toFixed(2)}</strong>
        </h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.2rem",
    color: "#34495e",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  price: {
    fontSize: "1rem",
    color: "#e74c3c",
    marginBottom: "10px",
  },
  quantityWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    fontSize: "1rem",
    cursor: "pointer",
    margin: "0 5px",
  },
  quantity: {
    fontSize: "1rem",
    color: "#2c3e50",
    margin: "0 10px",
  },
  total: {
    fontSize: "1.1rem",
    color: "#2c3e50",
    fontWeight: "bold",
    marginTop: "10px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#7f8c8d",
    marginTop: "50px",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#e74c3c",
    marginTop: "50px",
  },
  totalPrice: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "1.8rem",
    color: "#27ae60",
    fontWeight: "bold",
  },
};
