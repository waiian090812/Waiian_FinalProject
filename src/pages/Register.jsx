import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(ShopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    mobile: "",
  });

  const handleSubmit = () => {
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    register(form);
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h2 className="text-xl font-bold text-primary">Register</h2>

        {["name", "email", "mobile", "address"].map((f) => (
          <input
            key={f}
            placeholder={f}
            className="w-full mt-2 p-2 border rounded"
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
          />
        ))}

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-2 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mt-2 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, confirm: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-primary text-white py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}