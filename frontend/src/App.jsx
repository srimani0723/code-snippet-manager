// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Snippets from "./pages/Snippets";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import { SnippetsProvider } from "./contexts/SnippetContext";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <SnippetsProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col w-full overflow-x-hidden relative">
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
      </SnippetsProvider>
    </AuthProvider>
  );
}

export default App;
