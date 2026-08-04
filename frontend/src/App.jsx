// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Snippets from "./pages/Snippets";
import Dashboard from "./pages/Dashboard";
import DashboardSnippets from "./pages/DashboardSnippets";
import ProtectedRoute from "./components/protectedRoute";
import useAuth from "./hooks/useAuth";
import { toast } from "react-toastify";
import ThemeContext from "./contexts/ThemeContext";
import CodeEditor from "./pages/CodeEditor";
import UserSnippetDetails from "./pages/UserSnippetDetails";
import ExploreSnippetDetails from "./pages/ExploreSnippetDetails";
import Collections from "./pages/Collections";
import CollectionDetails from "./pages/CollectionDetails";

function App() {
  const { checkUser } = useAuth();
  const { theme, themes } = useContext(ThemeContext);

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
    <div
      className={`relative flex min-h-screen w-full flex-1 flex-col ${theme === themes.LIGHT ? "bg-orange-50" : "bg-primary-bg1"}`}
    >
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/snippets/:id" element={<ExploreSnippetDetails />} />

          <Route
            path="/code-editor/new"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/code-editor/:id"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="/dashboard/snippets" replace />}
            />
            <Route index path="snippets" element={<DashboardSnippets />} />
            <Route path="snippets/:id" element={<UserSnippetDetails />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:id" element={<CollectionDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
