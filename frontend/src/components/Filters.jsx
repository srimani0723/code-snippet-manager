import { useState, useEffect } from "react";
import { useSnippets } from "../contexts/snippetContext";

const Filters = () => {
  const { filters, updateFilters } = useSnippets();

  const [local, setLocal] = useState({
    search: "",
    language: "",
    tags: "",
    isPublic: true,
  });

  useEffect(() => {
    if (!filters) return;
    setLocal({
      search: filters.search || "",
      language: filters.language || "",
      tags: filters.tags || "",
      isPublic: typeof filters.isPublic === "boolean" ? filters.isPublic : true,
    });
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters({
      ...filters,
      search: local.search.trim(),
      language: local.language,
      tags: local.tags.trim(),
      isPublic: local.isPublic,
      page: 1,
    });
  };

  const handleClear = () => {
    const cleared = {
      ...filters,
      search: "",
      language: "",
      tags: "",
      isPublic: true,
      page: 1,
    };
    setLocal({
      search: "",
      language: "",
      tags: "",
      isPublic: true,
    });
    updateFilters(cleared);
  };

  if (!filters) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border border-gray-200 rounded bg-white flex flex-col gap-3"
    >
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
          value={local.search}
          onChange={(e) => setLocal({ ...local, search: e.target.value })}
        />
        <select
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          value={local.language}
          onChange={(e) => setLocal({ ...local, language: e.target.value })}
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <input
          type="text"
          placeholder="tags: react,api"
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
          value={local.tags}
          onChange={(e) => setLocal({ ...local, tags: e.target.value })}
        />
        <label className="flex items-center gap-1 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={local.isPublic}
            onChange={(e) => setLocal({ ...local, isPublic: e.target.checked })}
          />
          Public only
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default Filters;
