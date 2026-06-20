import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../reducers/publicSnippetsSlice";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ThemeContext from "../contexts/ThemeContext";

const Filters = ({ total }) => {
  const dispatch = useDispatch();
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const { search, language, tags, isPublic } = useSelector(
    (state) => state.publicSnippets,
  );

  const filters = { search, language, tags, isPublic };

  const [local, setLocal] = useState({
    search: "",
    language: "",
    tags: "",
    isPublic: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateFilters({
        ...filters,
        search: local.search.trim(),
        language: local.language,
        tags: local.tags.trim(),
        isPublic: local.isPublic,
        page: 1,
      }),
    );
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
    dispatch(updateFilters(cleared));
  };

  if (!filters) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-4 rounded flex flex-col gap-3">
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
        <input
          type="text"
          placeholder="Search..."
          className={`flex-1 px-4 py-2 border-2 text-sm rounded-full outline-none focus:border-2 focus:ring-none lg:col-span-2 ${
            isDark
              ? "bg-primary-bg3 border-primary-bg3 text-primary-text focus:border-blue-500"
              : "bg-white border-gray-300 focus:border-lime-500"
          }`}
          value={local.search}
          onChange={(e) => setLocal({ ...local, search: e.target.value })}
        />

        <select
          className={`px-4 py-2 border-2 rounded-full text-sm outline-none focus:border-2 focus:ring-none col-span-1 ${
            isDark
              ? "bg-primary-bg3 border-primary-bg3 text-primary-text focus:border-blue-500"
              : "bg-white border-gray-300 focus:border-lime-500"
          }`}
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
          className={`flex-1 px-4 py-2 border-2 text-sm rounded-full outline-none focus:border-2 focus:ring-none lg:col-span-2 ${
            isDark
              ? "bg-primary-bg3 border-primary-bg3 text-primary-text focus:border-blue-500"
              : "bg-white border-gray-300 focus:border-lime-500"
          }`}
          value={local.tags}
          onChange={(e) => setLocal({ ...local, tags: e.target.value })}
        />

        <p
          className={`text-md font-semibold rounded-full w-fit font-mono flex items-center gap-1 mx-2 ${
            isDark ? "text-emerald-400" : "text-emerald-800"
          }`}
        >
          <IoMdCheckmarkCircleOutline
            className={`text-3xl rounded-full ${
              isDark
                ? "text-emerald-400 bg-emerald-950/40"
                : "text-emerald-800 bg-emerald-100"
            }`}
          />{" "}
          <sub className="text-xs">Public Only</sub>
        </p>
      </div>

      <div className="flex gap-2 justify-end items-center px-2">
        <p
          className={`text-sm md:text-lg font-semibold rounded-full w-fit font-mono mr-auto ${
            isDark ? "text-blue-400" : "text-blue-800"
          }`}
        >
          Total Snippets: {total || 0}
        </p>
        <button
          type="button"
          onClick={handleClear}
          className={`px-4 py-2 border text-sm md:text-md cursor-pointer rounded-full transition-all duration-150 ${
            isDark
              ? "border-primary-bg3 bg-primary-bg3 text-primary-text hover:bg-primary-bg4"
              : "border-gray-400 text-gray-700 bg-white hover:bg-gray-50"
          }`}
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 w-fit bg-blue-600 text-white rounded-full text-sm md:text-md cursor-pointer hover:bg-blue-700 active:scale-95 transition-all duration-150"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default Filters;
