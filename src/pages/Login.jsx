import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const res = login(email, password);

    if (!res.ok) {
      alert(res.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h2 className="text-xl font-bold text-primary">Login</h2>

        <input
          placeholder="Email"
          className="w-full mt-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-2 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-primary text-white py-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}