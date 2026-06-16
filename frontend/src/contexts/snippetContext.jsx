// src/contexts/SnippetContext.jsx
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";

import { api } from "../auth/api";
import useAuth from "../customHooks/useAuth";

const SnippetContext = createContext();

export const SnippetsProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
    language: "",
    tags: "",
    isPublic: true,
  });

  const [snippetsData, setSnippetsData] = useState({
    snippets: [],
    total: 0,
    pages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(filters); // auto handles filters into query params
      const res = await api.get(`/snippets?${params.toString()}`);

      const data = res.data;

      setSnippetsData({
        snippets: Array.isArray(data.snippets) ? data.snippets : [],
        total: data.total || 0,
        pages: data.pages || 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load snippets");
      setSnippetsData({ snippets: [], total: 0, pages: 1 });
    } finally {
      setLoading(false);
    }
  }, [filters, setLoading, setError, setSnippetsData]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets, isAuthenticated]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets: snippetsData.snippets,
        total: snippetsData.total,
        pages: snippetsData.pages,
        currentPage: filters.page,
        filters,
        loading,
        error,
        updateFilters,
        setLoading,
        setError,
        setSnippetsData,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error("useSnippets must be used within a SnippetsProvider");
  }
  return context;
};
