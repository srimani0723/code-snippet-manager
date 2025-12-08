// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../auth/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/login", form);
      navigate("/snippets");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded p-4 bg-white">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Login
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-2 py-1 border border-gray-300 rounded text-sm"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-2 py-1 border border-gray-300 rounded text-sm"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-1 px-3 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-xs text-red-600 text-center mt-1">{error}</p>
          )}
        </form>
        <p className="text-xs text-gray-600 mt-3 text-center">
          No account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
