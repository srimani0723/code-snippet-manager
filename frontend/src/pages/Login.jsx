// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../auth/api";
import useAuth from "../customHooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../components/Spinner";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(async () => {
      try {
        const res = await api.post("/auth/login", form);
        setIsAuthenticated(true);
        setUser(res.data.user);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center bg-linear-to-b from-sky-200  to-white h-[80vh]">
      <div className="w-full max-w-sm border border-gray-300 rounded-4xl p-8 bg-white m-4 sm:m-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-600 w-2 h-2 rounded-full"></div>
          <div className="bg-red-600 w-2 h-2 rounded-full "></div>
          <div className="bg-yellow-500 w-2 h-2 rounded-full "></div>
          <div className="bg-green-600 w-2 h-2 rounded-full "></div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          SignIn to access your snippets
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400 w-full"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
            />
            <button
              className="absolute right-3 top-2 text-xl cursor-pointer"
              onClick={onShowPassword}
              type="button"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 px-3 py-2 bg-blue-600 text-white text-sm disabled:opacity-60 text-center rounded-full cursor-pointer hover:bg-blue-700 shadow-md"
          >
            {loading ? <Spinner /> : "Login"}
          </button>
          {error && (
            <p className="text-xs text-red-600 text-center mt-1">{error}</p>
          )}
        </form>
        <p className="text-sm text-gray-600 mt-3 text-center font-mono font-semibold">
          New here?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
