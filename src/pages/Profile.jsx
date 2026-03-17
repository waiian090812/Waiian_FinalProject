import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Profile() {
  const { user, session } = useContext(ShopContext);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Profile</h2>

      <div className="border rounded-2xl p-6 bg-white">
        <div className="text-gray-600 text-sm">Logged in as</div>
        <div className="text-xl font-semibold">{session?.name}</div>

        <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
          <Info label="Email" value={user?.email || "—"} />
          <Info label="Mobile" value={user?.mobile || "—"} />
          <Info label="Complete Name" value={user?.name || "—"} />
          <Info label="Address" value={user?.address || "—"} />
        </div>

        <p className="text-xs text-gray-500 mt-4">
          This profile is stored locally (front-end demo only).
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border rounded-xl p-3">
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}