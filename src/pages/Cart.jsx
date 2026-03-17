import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Cart() {
  const { cart, cartTotal, updateQty, removeFromCart, isLoggedIn } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="border rounded-2xl p-6 bg-white">
        <h2 className="text-2xl font-bold">Cart</h2>
        <p className="text-gray-600 mt-2">Your cart is empty.</p>
        <Link to="/products" className="inline-block mt-4 px-4 py-2 rounded bg-black text-white">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Cart</h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="border rounded-2xl p-4 bg-white flex gap-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="flex justify-between gap-3">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">₱{item.price} each</div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-sm underline">
                  Remove
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                <span className="w-10 text-center">{item.qty}</span>
                <button className="px-3 py-1 border rounded" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                <span className="ml-auto font-semibold">₱{item.price * item.qty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-2xl p-5 bg-white flex items-center justify-between">
        <div>
          <div className="text-gray-600 text-sm">Total</div>
          <div className="text-2xl font-bold">₱{cartTotal}</div>
        </div>
        <Link
          to={isLoggedIn ? "/checkout" : "/login"}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
        </Link>
      </div>
    </div>
  );
}