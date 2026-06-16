// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../auth/api";
import useAuth from "../customHooks/useAuth";
import SnippetForm from "../components/SnippetForm";
import SnippetCard from "../components/SnippetCard";
import Spinner from "../components/Spinner";
import { IoMdAdd } from "react-icons/io";

const Dashboard = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const { name, email } = user || {};
  const id = user?.id || user?._id;

  const publicSnippets = snippets.filter((each) => each.isPublic === true);

  const loadMySnippets = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/snippets/?userId=${id}`);
      setSnippets(res.data.snippets || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadMySnippets();
    }
    console.log("Dashboard", user);
  }, [id]);

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

  const toggleSnippetForm = () => {
    setShowCreate(!showCreate);
    setEditing(null);
  };

  if (loading && !snippets.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-[90%] mx-auto w-full flex flex-col gap-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
            Your{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-500">
              snippets
            </span>
          </h1>
          <p className="text-md text-gray-600">
            Hi {email}. Keep building your library
          </p>
        </div>
        <button
          className="px-4 py-2 bg-emerald-200 text-emerald-900 text-sm rounded-full hover:bg-emerald-300 cursor-pointer shadow-sm flex items-center gap-2 font-semibold font-mono "
          onClick={toggleSnippetForm}
        >
          <IoMdAdd className="text-lg" />
          New Snippet
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl bg-white shadow-sm/5">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-red-600 w-2 h-2 rounded-full "></div> Total
          </h1>
          <p className="text-3xl font-semibold">{snippets.length}</p>
        </div>

        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl bg-white shadow-sm/5">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-green-600 w-2 h-2 rounded-full "></div> Public
          </h1>
          <p className="text-3xl font-semibold">{publicSnippets.length}</p>
        </div>

        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl bg-white shadow-sm/5">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-yellow-600 w-2 h-2 rounded-full "></div> Private
          </h1>
          <p className="text-3xl font-semibold">
            {snippets.length - publicSnippets.length}
          </p>
        </div>
      </div>

      {showCreate && (
        <SnippetForm onSubmit={handleCreate} onCancel={toggleSnippetForm} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full items-start">
          {snippets.map((snip) => (
            <SnippetCard
              key={snip._id}
              snippet={snip}
              onDelete={handleDelete}
              onClickEdit={() => {
                setShowCreate(false);
                setEditing(snip);
              }}
              onCancel={toggleSnippetForm}
              userSnippet={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
