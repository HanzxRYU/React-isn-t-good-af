import { products } from "./Product";

const ProductList = ({products}) => (
    <div>
        <h1>Daftar Produk</h1>
        <ul>
            {products.map((products) => (
                <li key={products.id}>
                    <h2>{products.title}</h2>
                    <p>Harga: ${products.price}</p>
                    <img src={products.image} alt={products.title} />
                </li>
            ))}
        </ul>
    </div>
);

export default ProductList;