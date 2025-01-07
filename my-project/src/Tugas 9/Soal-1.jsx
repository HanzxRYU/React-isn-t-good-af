import { products } from "./Product";

const ProductCard = ({ product }) => {
  return (
    <div className="mb-4 flex items-center">
      <div className="border border-gray-300 rounded-lg p-4 flex w-full">
        {/* Gambar Produk */}
        <img
          src={product.image || "https://via.placeholder.com/300x200"}
          alt={product.title}
          className="w-1/3 h-auto object-cover rounded-lg"
        />

        {/* Kontainer Teks */}
        <div className="ml-4 flex flex-col justify-center w-2/3">
          {/* Judul Produk */}
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          {/* Harga Produk */}
          <p className="text-lg text-gray-600 mt-2">Harga: {product.price}</p>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
