import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 3); // show first 3 products

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* HERO SECTION */}
      <section
        className="h-[450px] rounded-2xl flex flex-col justify-center items-center text-center text-white bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}/images/cocobg.jpg)`
        }}
      >
        <h1 className="text-5xl font-heading font-bold">
          Sustainable Coconut Coir Products
        </h1>

        <p className="mt-4 text-lg text-gray-200">
          Eco-friendly solutions for home, garden, and DIY projects
        </p>

        <div className="flex gap-4 mt-6">
          <Link to="/storefront">
            <button className="bg-primary px-6 py-3 rounded-lg hover:bg-accent transition">
              Shop Featured
            </button>
          </Link>

          <Link to="/products">
            <button className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-200 transition">
              Browse Products
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mt-14">

        <h2 className="text-3xl font-heading font-bold text-primary text-center">
          Featured Products
        </h2>

        <p className="text-center text-textSecondary mt-2">
          Popular eco-friendly coconut coir items
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
      </section>

    </div>
  );
}