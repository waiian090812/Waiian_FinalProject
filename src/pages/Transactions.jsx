import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Transactions() {
  const { transactions } = useContext(ShopContext);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-2xl font-heading text-primary">
        Transaction History
      </h2>

      <div className="mt-6 space-y-4">

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-5 rounded-xl shadow flex justify-between">

              <div>
                <p className="font-semibold">{tx.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.date).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  {tx.paymentMethod} • {tx.fulfillment}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">₱{tx.total}</p>
                <p className="text-sm text-gray-500">{tx.status}</p>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}