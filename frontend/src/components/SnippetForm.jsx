// src/components/SnippetForm.jsx
import { useState, useEffect } from "react";

const languageOptions = ["javascript", "python", "java", "cpp", "html", "css"];

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border border-gray-200 rounded p-4 bg-white w-full"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {initialData ? "Edit Snippet" : "New Snippet"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="px-2 py-1 border border-gray-300 rounded text-sm"
        value={form.title}
        onChange={handleChange("title")}
        required
        disabled={submitting}
      />

      <input
        type="text"
        placeholder="Description"
        className="px-2 py-1 border border-gray-300 rounded text-sm"
        value={form.description}
        onChange={handleChange("description")}
        disabled={submitting}
      />

      <select
        className="px-2 py-1 border border-gray-300 rounded text-sm"
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

      <textarea
        rows={6}
        placeholder="Code"
        className="px-2 py-1 border border-gray-300 rounded text-sm font-mono"
        value={form.code}
        onChange={handleChange("code")}
        required
        disabled={submitting}
      />

      <input
        type="text"
        placeholder="tags: react,api,utils"
        className="px-2 py-1 border border-gray-300 rounded text-sm"
        value={form.tags}
        onChange={handleChange("tags")}
        disabled={submitting}
      />

      <label className="flex items-center gap-2 text-xs text-gray-700">
        <input
          type="checkbox"
          checked={form.isPublic}
          onChange={handleChange("isPublic")}
          disabled={submitting}
        />
        Public
      </label>

      <div className="flex gap-2 justify-end mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700"
            disabled={submitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-60"
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
  );
};

export default SnippetForm;
