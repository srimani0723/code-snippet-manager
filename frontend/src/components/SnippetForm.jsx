// src/components/SnippetForm.jsx
import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

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

  return (
    <div className="bg-black/20 backdrop-blur-sm z-10 fixed top-0 left-0 right-0 w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 border border-gray-200 rounded-4xl p-6 bg-white w-full shadow max-w-[500px] lg:max-w-[50%] mx-auto"
      >
        <div className="lg:col-span-2 flex items-center justify-between">
          <h2 className="lg:col-span-1 text-xl lg:text-2xl font-semibold text-teal-800 font-mono">
            {initialData ? "Edit Snippet" : "New Snippet"}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="lg:grid-col-2 cursor-pointer p-1 text-red-800 text-3xl hover:scale-120 transition-transform duration-200"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <input
          type="text"
          placeholder="Title"
          className="px-4 py-2 border border-gray-300 rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400 lg:col-span-2"
          value={form.title}
          onChange={handleChange("title")}
          required
          disabled={submitting}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400 lg:col-span-2"
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
          className="px-4 py-2 border border-gray-300 rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400 lg:col-span-2"
          value={form.description}
          onChange={handleChange("description")}
          disabled={submitting}
        />

        <textarea
          rows={6}
          placeholder="Code"
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400 lg:col-span-2"
          value={form.code}
          onChange={handleChange("code")}
          required
          disabled={submitting}
        />

        <input
          type="text"
          placeholder="tags: react,api,utils"
          className="px-4 py-2 border border-gray-300 rounded-full text-sm placeholder:text-gray-600 font-semibold font-mono outline-blue-400 focus:ring-1 focus:ring-blue-400 lg:col-span-2"
          value={form.tags}
          onChange={handleChange("tags")}
          disabled={submitting}
        />

        <label className="flex items-center gap-2 text-md ml-auto text-gray-700 font-semibold font-mono cursor-pointer lg:col-span-2">
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
              className="px-3 py-1 border border-pink-400 rounded-full text-sm text-pink-900 bg-pink-200 shadow-md hover:bg-pink-300 cursor-pointer font-semibold"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-1 border border-blue-400 rounded-full text-sm text-blue-900 bg-blue-200 shadow-md hover:bg-blue-300 cursor-pointer font-semibold disabled:opacity-60"
            disabled={submitting}
          >
            {submitting
              ? initialData
                ? "Updating..."
                : "Creating..."
              : initialData
                ? "Update"
                : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;
