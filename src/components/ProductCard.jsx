import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  return (
    <div className="bg-secondary rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 p-4 fade-in">

      <img
        src={product.image}
        className="rounded-xl object-cover w-full h-48"
        alt={product.name}
      />

      <h3 className="font-semibold mt-2 text-primary text-lg">
        {product.name}
      </h3>

      <p className="text-textSecondary mt-1 text-sm">
        {product.description}
      </p>

      <p className="text-textPrimary font-bold mt-1">
        ₱{product.price}
      </p>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full py-2 rounded-2xl bg-primary text-white hover:bg-accent transition"
      >
        Add to Cart
      </button>

    </div>
  );
}