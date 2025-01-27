import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductCard from "./Components/ProductCard";
import DetailProducts from "./Components/DetailProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCard />} /> {/* Daftar Produk */}
        <Route path="/product/:id" element={<DetailProducts />} />{" "}
        {/* Detail Produk */}
      </Routes>
    </Router>
  );
}

export default App;
