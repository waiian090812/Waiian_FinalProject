import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const { session, logout, isLoggedIn } = useContext(ShopContext);

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}/images/logogo.png`}
            alt="Waiian Logo"
            className="h-20 w-50 object-cover rounded-full"
          />
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-4 items-center">

          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/storefront" className="hover:text-primary">Store</Link>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <Link to="/cart" className="hover:text-primary">Cart</Link>

          {isLoggedIn && (
            <>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
              <Link to="/transactions" className="hover:text-primary">Transactions</Link>
            </>
          )}

          {session ? (
            <>
              <span className="text-primary font-semibold">
                👤 {session.name}
              </span>

              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link to="/register" className="hover:text-primary">Register</Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
}