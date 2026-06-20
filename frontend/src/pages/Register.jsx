// src/pages/Register.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import useFetchMutation from "../hooks/useFetchMutation";
import { setAuth } from "../reducers/authCheckSlice";
import ThemeContext from "../contexts/ThemeContext";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, themes } = useContext(ThemeContext);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const registerMutate = useFetchMutation({
    key: "register",
    method: "POST",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    registerMutate.mutate(
      { url: "/auth/register", data: form },
      {
        onSuccess: (data) => {
          if (data?.user) {
            toast.success("Registration successful!");
            dispatch(setAuth(data));
            navigate("/dashboard", { replace: true });
          }
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Registration failed");
        },
      },
    );
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`flex items-center justify-center h-[80vh] ${
        theme === themes.DARK
          ? "bg-linear-to-b from-pink-800/40 to-gray-700/80"
          : "bg-linear-to-b from-pink-200 to-white"
      }`}
    >
      <div
        className={`w-full max-w-sm border rounded-4xl p-8 m-4 sm:m-0 ${
          theme === themes.DARK
            ? "bg-primary-bg2 border-gray-600"
            : "bg-white border-gray-300"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-600 w-2 h-2 rounded-full"></div>
          <div className="bg-red-600 w-2 h-2 rounded-full"></div>
          <div className="bg-yellow-500 w-2 h-2 rounded-full"></div>
          <div className="bg-green-600 w-2 h-2 rounded-full"></div>
        </div>

        <h1
          className={`text-2xl md:text-3xl font-semibold ${
            theme === themes.DARK ? "text-primary-text" : "text-gray-800"
          }`}
        >
          Create your account
        </h1>
        <p
          className={`text-sm mb-4 font-semibold ${
            theme === themes.DARK ? "text-primary-text/60" : "text-gray-600"
          }`}
        >
          Start saving and sharing your code
        </p>

        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            className={`px-4 py-2 border rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono focus:ring-1 focus:ring-blue-400 ${
              theme === themes.DARK
                ? "text-primary-text bg-primary-bg1 border-gray-600"
                : "bg-white border-gray-300 outline-blue-400 shadow-sm"
            }`}
            value={form.name}
            onChange={handleChange("name")}
          />
          <input
            type="email"
            placeholder="Email"
            className={`px-4 py-2 border rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono focus:ring-1 focus:ring-blue-400 ${
              theme === themes.DARK
                ? "text-primary-text bg-primary-bg1 border-gray-600"
                : "bg-white border-gray-300 outline-blue-400 shadow-sm"
            }`}
            value={form.email}
            onChange={handleChange("email")}
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`px-4 py-2 border rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono focus:ring-1 focus:ring-blue-400 w-full ${
                theme === themes.DARK
                  ? "text-primary-text bg-primary-bg1 border-gray-600"
                  : "bg-white border-gray-300 outline-blue-400 shadow-sm"
              }`}
              value={form.password}
              onChange={handleChange("password")}
            />
            <button
              className={`absolute right-3 top-2 text-xl cursor-pointer ${
                theme === themes.DARK ? "text-white" : "text-primary-bg1"
              }`}
              onClick={onShowPassword}
              type="button"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={registerMutate.loading}
            className="mt-1 px-3 py-2 bg-blue-600 text-white text-sm disabled:opacity-60 text-center rounded-full cursor-pointer hover:bg-blue-700 shadow-md"
          >
            {registerMutate.loading ? <Spinner /> : "Register"}
          </button>
        </form>
        <p
          className={`text-sm mt-3 text-center font-mono font-semibold ${
            theme === themes.DARK ? "text-primary-text/60" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`${
              theme === themes.DARK ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
