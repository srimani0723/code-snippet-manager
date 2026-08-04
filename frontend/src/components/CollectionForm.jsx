// src/components/SnippetForm.jsx
import { useState, useEffect, useContext } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ThemeContext from "../contexts/ThemeContext";

const CollectionForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitting = false,
}) => {
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function setInitialForm() {
      if (initialData) {
        setForm({
          name: initialData.name || "",
          description: initialData.description || "",
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
    onSubmit(form);
  };

  // Original styling classes
  const inputClass = `px-4 py-2 border  text-sm font-semibold font-mono focus:ring-1 focus:ring-blue-400 outline-hidden ${
    isDark
      ? "bg-primary-bg1 border-gray-600 text-primary-text placeholder:text-gray-500 focus:border-blue-500"
      : "bg-white border-gray-300 placeholder:text-gray-600 outline-blue-400 focus:border-blue-400"
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className={`scrollbar-none mx-auto flex max-h-[92vh] w-fit max-w-[950px] flex-col overflow-auto rounded-4xl border p-6 shadow [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDark
            ? "bg-primary-bg2 text-primary-text border-gray-600 shadow-black/45"
            : "border-gray-200 bg-white text-gray-800"
        } `}
      >
        {/* Header - Full Width */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-500/10 pb-3">
          <h2
            className={`font-mono text-xl font-semibold lg:text-2xl ${
              isDark ? "text-teal-400" : "text-teal-800"
            }`}
          >
            {id ? "Edit Collection" : "New Collection"}
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

        <div className="mb-4 flex flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="pl-1 font-mono text-xs font-semibold opacity-80">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className={inputClass + " rounded-full"}
              value={form.name}
              onChange={handleChange("name")}
              required
              disabled={submitting}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="pl-1 font-mono text-xs font-semibold opacity-80">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Description"
              className={inputClass + " h-24 resize-none rounded-2xl"}
              value={form.description}
              onChange={handleChange("description")}
              disabled={submitting}
            />
          </div>
        </div>

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
      </form>
    </div>
  );
};

export default CollectionForm;
