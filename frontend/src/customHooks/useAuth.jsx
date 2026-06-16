// src/customHooks/useAuth.jsx
import { api } from "../auth/api";
import { useAuthenticate } from "../contexts/AuthContext";

const useAuth = () => {
  const {
    isAuthenticated,
    loading,
    user,
    setIsAuthenticated,
    setUser,
    setLoading,
  } = useAuthenticate(); // Get auth context functions

  const resetAuth = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const logout = async () => {
    const res = await api.post("/auth/logout");

    if (res.status === 200) {
      resetAuth(); // clear auth state in context
    }
  };

  return {
    isAuthenticated,
    loading,
    user,
    logout,
    resetAuth,
    setIsAuthenticated,
    setUser,
  };
};

export default useAuth;
