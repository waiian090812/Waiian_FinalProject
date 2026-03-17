import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(ShopContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}