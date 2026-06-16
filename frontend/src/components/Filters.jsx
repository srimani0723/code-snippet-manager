import { useState } from "react";
import { useSnippets } from "../contexts/SnippetContext";

const Filters = () => {
  const { filters, updateFilters } = useSnippets();

  const [local, setLocal] = useState({
    search: "",
    language: "",
    tags: "",
    isPublic: true,
  });

  // useEffect(() => {
  //   if (!filters) return;
  //   setLocal({
  //     search: filters.search || "",
  //     language: filters.language || "",
  //     tags: filters.tags || "",
  //     isPublic: typeof filters.isPublic === "boolean" ? filters.isPublic : true,
  //   });
  // }, [filters]);

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
    <form onSubmit={handleSubmit} className="mb-4 rounded flex flex-col gap-3">
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 text-sm bg-white rounded-full outline-none focus:border-lime-500 focus:border-2 focus:ring-none lg:col-span-2"
          value={local.search}
          onChange={(e) => setLocal({ ...local, search: e.target.value })}
        />

        <select
          className="px-4 py-2 border-2 border-gray-300 rounded-full text-sm outline-none focus:border-lime-500 focus:border-2 focus:ring-none bg-white col-span-1"
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
          className="flex-1 px-4 py-2 border-2 border-gray-300 text-sm bg-white rounded-full outline-none focus:border-lime-500 focus:border-2 focus:ring-none lg:col-span-2"
          value={local.tags}
          onChange={(e) => setLocal({ ...local, tags: e.target.value })}
        />

        <label className="flex items-center gap-1 text-md text-gray-700 cursor-pointer mx-2 ">
          <input
            type="checkbox"
            checked={local.isPublic}
            onChange={(e) => setLocal({ ...local, isPublic: e.target.checked })}
            className="cursor-pointer w-4 h-4"
          />
          Public only
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 border border-gray-400  text-md text-gray-700 cursor-pointer rounded-full"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 w-fit bg-blue-600  text-white rounded-full text-md cursor-pointer"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default Filters;
