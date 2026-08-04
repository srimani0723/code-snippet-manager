// src/components/SnippetForm.jsx
import { useState, useEffect, useContext } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ThemeContext from "../contexts/ThemeContext";
import Editor from "@monaco-editor/react";

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

  // Original styling classes
  const inputClass = `px-4 py-2 border rounded-full text-sm font-semibold font-mono focus:ring-1 focus:ring-blue-400 outline-hidden ${
    isDark
      ? "bg-primary-bg1 border-gray-600 text-primary-text placeholder:text-gray-500 focus:border-blue-500"
      : "bg-white border-gray-300 placeholder:text-gray-600 outline-blue-400 focus:border-blue-400"
  }`;

  const codeBoxClass = `border rounded-xl overflow-hidden h-full flex flex-col ${
    isDark ? "border-gray-600 bg-primary-bg1" : "border-gray-300 bg-white"
  }`;

  return (
    <div className="scrollbar-none fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className={`scrollbar-none mx-auto flex max-h-[92vh] w-full max-w-[950px] flex-col overflow-auto rounded-4xl border p-6 shadow [-ms-overflow-style:none] lg:w-[90%] [&::-webkit-scrollbar]:hidden ${
          isDark
            ? "bg-primary-bg2 text-primary-text border-gray-600 shadow-black/45"
            : "border-gray-200 bg-white text-gray-800"
        }`}
      >
        {/* Header - Full Width */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-500/10 pb-3">
          <h2
            className={`font-mono text-xl font-semibold lg:text-2xl ${
              isDark ? "text-teal-400" : "text-teal-800"
            }`}
          >
            {id ? "Edit Snippet" : "New Snippet"}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className={`cursor-pointer p-1 text-3xl transition-transform duration-200 hover:scale-120 ${
              isDark
                ? "text-red-400 hover:text-red-300"
                : "text-red-800 hover:text-red-900"
            }`}
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        {/* Columns Grid Container */}
        <div className="mb-4 flex flex-1 flex-col gap-6 lg:flex-row">
          {/* Left Column: Form Details */}
          <div className="flex flex-col gap-3 lg:w-[35%] lg:min-w-[320px]">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="pl-1 font-mono text-xs font-semibold opacity-80">
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                className={inputClass}
                value={form.title}
                onChange={handleChange("title")}
                required
                disabled={submitting}
              />
            </div>

            {/* Language Selector */}
            <div className="flex flex-col gap-1">
              <label className="pl-1 font-mono text-xs font-semibold opacity-80">
                Language
              </label>
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
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="pl-1 font-mono text-xs font-semibold opacity-80">
                Description
              </label>
              <input
                type="text"
                placeholder="Description"
                className={inputClass}
                value={form.description}
                onChange={handleChange("description")}
                disabled={submitting}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1">
              <label className="pl-1 font-mono text-xs font-semibold opacity-80">
                Tags
              </label>
              <input
                type="text"
                placeholder="tags: react,api,utils"
                className={inputClass}
                value={form.tags}
                onChange={handleChange("tags")}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Right Column: Code Editor */}
          <div className="flex h-[300px] min-w-0 flex-grow flex-col gap-2 lg:h-auto lg:min-h-[380px]">
            <div className="flex h-full flex-col gap-1">
              <label className="pl-1 font-mono text-xs font-semibold opacity-80">
                Snippet Code
              </label>
              <div className={codeBoxClass}>
                <div className="relative h-full min-h-[250px] w-full overflow-hidden rounded-xl lg:min-h-[350px]">
                  <Editor
                    height="100%"
                    width="100%"
                    language={form.language}
                    theme="vs-dark"
                    value={form.code}
                    onChange={(val) =>
                      setForm((prev) => ({ ...prev, code: val || "" }))
                    }
                    options={{
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      lineNumbersMinChars: 3,
                      glyphMargin: false,
                      folding: false,
                      lineDecorationsWidth: 10,
                      fontSize: 14,
                      minimap: {
                        enabled: false,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area - Placed at the very bottom */}
        <hr
          className={isDark ? "mb-2 border-gray-600" : "mb-2 border-gray-200"}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Public Checkbox */}
          <label
            className={`text-md flex cursor-pointer items-center gap-2 font-mono font-semibold ${
              isDark ? "text-primary-text" : "text-gray-700"
            }`}
          >
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={handleChange("isPublic")}
              disabled={submitting}
              className="h-5 w-5 cursor-pointer"
            />
            Public visibility
          </label>

          {/* Actions buttons */}
          <div className="flex justify-end gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold shadow-md transition-all duration-150 active:scale-95 ${
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
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold shadow-md transition-all duration-150 active:scale-95 disabled:opacity-60 ${
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
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;
