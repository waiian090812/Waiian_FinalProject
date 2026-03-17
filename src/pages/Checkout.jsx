import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Checkout() {
  const { cart, cartTotal, checkout } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [fulfillment, setFulfillment] = useState("delivery");
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    checkout({ paymentMethod, fulfillment });
    navigate("/transactions");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-3xl font-heading text-primary mb-6">
        Checkout
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          {/* PAYMENT */}
          <h3 className="font-semibold text-lg text-primary">
            Payment Method
          </h3>

          <div className="mt-4 space-y-3">
            {["COD", "GCash", "Credit/Debit"].map((m) => (
              <label
                key={m}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition 
                ${paymentMethod === m ? "border-primary bg-secondary" : "hover:bg-gray-50"}`}
              >
                <input
                  type="radio"
                  name="pay"
                  value={m}
                  checked={paymentMethod === m}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>

          {/* DELIVERY */}
          <h3 className="font-semibold text-lg text-primary mt-6">
            Receive Products
          </h3>

          <div className="mt-4 space-y-3">
            {[
              { k: "pickup", label: "Pickup" },
              { k: "delivery", label: "Delivery" },
            ].map((o) => (
              <label
                key={o.k}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition 
                ${fulfillment === o.k ? "border-primary bg-secondary" : "hover:bg-gray-50"}`}
              >
                <input
                  type="radio"
                  name="ful"
                  value={o.k}
                  checked={fulfillment === o.k}
                  onChange={(e) => setFulfillment(e.target.value)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h3 className="font-semibold text-lg text-primary">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-gray-500 mt-4">
              Your cart is empty.
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-3 text-sm">
                {cart.map((x) => (
                  <li key={x.id} className="flex justify-between">
                    <span>{x.name} × {x.qty}</span>
                    <span>₱{x.price * x.qty}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₱{cartTotal}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full py-3 rounded-xl bg-primary text-white hover:bg-accent transition"
              >
                Place Order
              </button>
            </>
          )}

          <p className="text-xs text-gray-500 mt-3 text-center">
            For educational purposes only. No real payment is processed.
          </p>

        </div>

      </div>
    </div>
  );
}