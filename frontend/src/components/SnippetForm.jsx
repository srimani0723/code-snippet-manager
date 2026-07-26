// src/components/SnippetForm.jsx
import { useState, useEffect, useContext } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ThemeContext from "../contexts/ThemeContext";

const languageOptions = [
  "javascript",
  "python",
  "java",
  "cpp",
  "html",
  "css",
  "typescript",
  "go",
  "rust",
  "swift",
];

const SnippetForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitting = false,
}) => {
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tags: "",
    isPublic: true,
  });

  useEffect(() => {
    async function setInitialForm() {
      if (initialData) {
        setForm({
          title: initialData.title || "",
          description: initialData.description || "",
          code: initialData.code || "",
          language: initialData.language || "javascript",
          tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(",")
            : initialData.tags || "",
          isPublic: initialData.isPublic ?? true,
        });
      }
    }

    setInitialForm();
  }, [initialData]);

  const id = initialData?._id;
  console.log(id, initialData);

  const handleChange = (field) => (e) => {
    const value = field === "isPublic" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSubmit(payload);
  };

  const inputClass = `px-4 py-2 border rounded-full text-sm font-semibold font-mono lg:col-span-2 focus:ring-1 focus:ring-blue-400 outline-hidden ${
    isDark
      ? "bg-primary-bg1 border-gray-600 text-primary-text placeholder:text-gray-500 focus:border-blue-500"
      : "bg-white border-gray-300 placeholder:text-gray-600 outline-blue-400 focus:border-blue-400"
  }`;

  const textareaClass = `px-4 py-2 border rounded-xl text-sm font-semibold font-mono lg:col-span-2 focus:ring-1 focus:ring-blue-400 outline-hidden ${
    isDark
      ? "bg-primary-bg1 border-gray-600 text-primary-text placeholder:text-gray-500 focus:border-blue-500"
      : "bg-white border-gray-300 placeholder:text-gray-600 outline-blue-400 focus:border-blue-400"
  }`;

  return (
    <div className="bg-black/20 backdrop-blur-sm z-10 fixed top-0 left-0 right-0 w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-3 border rounded-4xl p-6 w-full shadow max-w-[500px] lg:max-w-[50%] mx-auto ${
          isDark
            ? "bg-primary-bg2 border-gray-600 text-primary-text shadow-black/45"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <div className="lg:col-span-2 flex items-center justify-between">
          <h2
            className={`lg:col-span-1 text-xl lg:text-2xl font-semibold font-mono ${
              isDark ? "text-teal-400" : "text-teal-800"
            }`}
          >
            {id ? "Edit Snippet" : "New Snippet"}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className={`lg:grid-col-2 cursor-pointer p-1 text-3xl hover:scale-120 transition-transform duration-200 ${
              isDark
                ? "text-red-400 hover:text-red-300"
                : "text-red-800 hover:text-red-900"
            }`}
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <input
          type="text"
          placeholder="Title"
          className={inputClass}
          value={form.title}
          onChange={handleChange("title")}
          required
          disabled={submitting}
        />

        <select
          className={inputClass}
          value={form.language}
          onChange={handleChange("language")}
          disabled={submitting}
        >
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Description"
          className={inputClass}
          value={form.description}
          onChange={handleChange("description")}
          disabled={submitting}
        />

        <textarea
          rows={6}
          placeholder="Code"
          className={textareaClass}
          value={form.code}
          onChange={handleChange("code")}
          required
          disabled={submitting}
        />

        <input
          type="text"
          placeholder="tags: react,api,utils"
          className={inputClass}
          value={form.tags}
          onChange={handleChange("tags")}
          disabled={submitting}
        />

        <label
          className={`flex items-center gap-2 text-md ml-auto font-semibold font-mono cursor-pointer lg:col-span-2 ${
            isDark ? "text-primary-text" : "text-gray-700"
          }`}
        >
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={handleChange("isPublic")}
            disabled={submitting}
            className="w-5 h-5"
          />
          Public
        </label>

        <div className="flex gap-2 justify-end mt-2 lg:col-span-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`px-3 py-1 border rounded-full text-sm cursor-pointer font-semibold shadow-md transition-all duration-150 active:scale-95 ${
                isDark
                  ? "border-pink-900/60 bg-pink-950/30 text-pink-400 hover:bg-pink-900/20"
                  : "border-pink-400 bg-pink-200 text-pink-900 hover:bg-pink-300"
              }`}
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`px-3 py-1 border rounded-full text-sm cursor-pointer font-semibold shadow-md transition-all duration-150 active:scale-95 disabled:opacity-60 ${
              isDark
                ? "border-blue-900/60 bg-blue-950/30 text-blue-400 hover:bg-blue-900/20"
                : "border-blue-400 bg-blue-200 text-blue-900 hover:bg-blue-300"
            }`}
            disabled={submitting}
          >
            {submitting
              ? id
                ? "Updating..."
                : "Creating..."
              : id
                ? "Update"
                : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;
