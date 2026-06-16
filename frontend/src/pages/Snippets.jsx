// src/pages/Snippets.jsx
import SnippetCard from "../components/SnippetCard";
import Filters from "../components/Filters";
import { api } from "../auth/api";
import { useSnippets } from "../contexts/SnippetContext";
import useAuth from "../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

const Snippets = () => {
  const { snippets, total, currentPage, pages, loading, error, updateFilters } =
    useSnippets();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFork = async (id) => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
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
    <section className="p-4 mx-auto w-full flex flex-col gap-5 lg:max-w-[90%]">
      <div className="">
        <div className="flex items-center gap-2 my-2">
          <div className="bg-blue-600 w-2 h-2 rounded-full"></div>
          <div className="bg-red-600 w-2 h-2 rounded-full "></div>
          <div className="bg-yellow-500 w-2 h-2 rounded-full "></div>
          <div className="bg-green-600 w-2 h-2 rounded-full "></div>
        </div>

        <h1
          className="text-xl sm:text-3xl
       font-semibold text-gray-800 mt-4"
        >
          Public{" "}
          <span className="bg-linear-to-r from-blue-600 via-green-500 to-red-600 bg-clip-text text-transparent">
            Snippets
          </span>{" "}
        </h1>

        <p className="text-md text-gray-500">
          Hand-picked code from the community. Copy, learn, remix.
        </p>

        <p className="text-md font-semibold mt-2 border border-gray-300 px-4 py-2 rounded-full w-fit shadow">
          Total Snippets: {total || 0}
        </p>
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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 w-full mx-auto">
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
    </section>
  );
};

export default Snippets;
