// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../auth/api";
import useAuth from "../customHooks/useAuth";
import SnippetForm from "../components/SnippetForm";
import SnippetCard from "../components/SnippetCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadMySnippets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/snippets?mine=true");
      setSnippets(res.data.snippets || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMySnippets();
  }, []);

  const handleCreate = async (data) => {
    try {
      await api.post("/snippets", data);
      setShowCreate(false);
      loadMySnippets();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleUpdate = async (data) => {
    if (!editing) return;
    try {
      await api.put(`/snippets/${editing._id}`, data);
      setEditing(null);
      loadMySnippets();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this snippet?")) return;
    await api.delete(`/snippets/${id}`);
    loadMySnippets();
  };

  if (loading && !snippets.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          {user ? `${user.name}'s Dashboard` : "My Dashboard"}
        </h1>
        <button
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded"
          onClick={() => {
            setEditing(null);
            setShowCreate((prev) => !prev);
          }}
        >
          {showCreate ? "Close" : "New Snippet"}
        </button>
      </div>

      {showCreate && (
        <SnippetForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {editing && !showCreate && (
        <SnippetForm
          initialData={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      {error && (
        <p className="text-center text-sm text-red-600 mb-2">{error}</p>
      )}

      {snippets.length === 0 && !error ? (
        <div className="text-center text-gray-600 text-sm mt-4">
          You have no snippets yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {snippets.map((snip) => (
            <SnippetCard
              key={snip._id}
              snippet={snip}
              onDelete={handleDelete}
              onClickEdit={() => {
                setShowCreate(false);
                setEditing(snip);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
