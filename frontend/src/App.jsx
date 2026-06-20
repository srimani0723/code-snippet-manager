// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Snippets from "./pages/Snippets";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import Footer from "./components/Footer";
import useAuth from "./hooks/useAuth";
import { toast } from "react-toastify";

function App() {
  const { checkUser } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await checkUser();
      const autorised = response?.payload?.authorised || false;
      if (autorised) {
        toast.success("User authenticated successfully!", {
          toastId: "auth-success-toast",
        });
      } else {
        toast.error("User authentication failed. Please log in.", {
          toastId: "auth-error-toast",
        });
      }
    };
    authCheck();
  }, [checkUser]);

  return (
    <div className="min-h-screen flex flex-col w-full relative bg-orange-50">
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snippets" element={<Snippets />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
