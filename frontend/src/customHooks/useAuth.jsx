// src/customHooks/useAuth.jsx
import { useState, useEffect } from "react";
import { checkAuth } from "../auth/api";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    checkAuth()
      .then((data) => {
        if (!mounted) return;
        if (data?.authorised) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { isAuthenticated, loading, user };
};

export default useAuth;
