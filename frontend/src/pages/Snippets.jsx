// src/pages/Snippets.jsx
import { useSnippets } from "../contexts/snippetContext";
import SnippetCard from "../components/SnippetCard";
import Filters from "../components/Filters";
import { api } from "../auth/api";

const Snippets = () => {
  const { snippets, total, currentPage, pages, loading, error, updateFilters } =
    useSnippets();

  const handleFork = async (id) => {
    try {
      await api.post(`/snippets/${id}/fork`);
      alert("Forked to your dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Fork failed");
    }
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
          Public Snippets ({total || 0})
        </h1>
      </div>

      <Filters />

      {error && (
        <p className="text-center text-sm text-red-600 mb-2">{error}</p>
      )}

      {(!Array.isArray(snippets) || snippets.length === 0) && !error ? (
        <div className="text-center text-gray-600 text-sm mt-4">
          No snippets found.
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {snippets.map((snip) => (
            <SnippetCard
              key={snip._id}
              snippet={snip}
              onDelete={null} // cannot delete here
              onClickEdit={null} // cannot edit here
              onClickFork={() => handleFork(snip._id)}
            />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-2 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => updateFilters({ page: currentPage - 1 })}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {pages}
          </span>
          <button
            disabled={currentPage === pages}
            onClick={() => updateFilters({ page: currentPage + 1 })}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Snippets;
