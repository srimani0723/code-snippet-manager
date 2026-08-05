// src/components/SnippetForm.jsx
import { useState, useContext, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ThemeContext from "../contexts/ThemeContext";

import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";
import UserSnippetCard from "./UserSnippetCard";

const ToggleCollectionSnippetsForm = ({
  collectionId,
  onCancel,
  CollectionData: data,
  refetchCollection,
}) => {
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const { user } = useAuth();
  const id = user?.id || user?._id;

  const [selectedSnippets, setSelectedSnippets] = useState([]);
  useEffect(() => {
    if (!data?.snippets) return;
    const initializeExistingSnippets = () => {
      const existingSnippetIds = data.snippets.map((snippet) => snippet._id);
      setSelectedSnippets(existingSnippetIds);
    };

    initializeExistingSnippets();
  }, [collectionId, data.snippets]);

  const { data: allSnippets } = useFetchQuery({
    key: "snippets",
    url: `/snippets/?userId=${id}`,
  });

  const updateSnippetCollectionMutation = useFetchMutation({
    key: "updateCollectionSnippets",
    method: "PUT",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSnippetCollectionMutation.mutate(
      {
        url: `/collections/sync/${collectionId}`,
        data: {
          collectionId: collectionId,
          snippetIds: selectedSnippets,
        },
      },
      {
        onSuccess: () => {
          toast.success("Collection snippets updated successfully!");
          onCancel(); // Close the form after successful submission
          refetchCollection(); // Refetch the collection details to update the UI
        },
        onError: (error) => {
          console.error("Error updating collection snippets:", error);
          toast.error("Failed to update collection snippets.");
        },
      },
    );
  };

  const handleCollectionToggle = (collectionId) => {
    setSelectedSnippets((prevList) => {
      if (prevList.includes(collectionId)) {
        return prevList.filter((id) => id !== collectionId);
      } else {
        return [...prevList, collectionId];
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 pt-[10vh] backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className={`scrollbar-none mx-auto flex max-h-[80vh] w-fit max-w-[950px] flex-col overflow-auto rounded-4xl border p-6 shadow [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDark
            ? "bg-primary-bg2 text-primary-text border-gray-600 shadow-black/45"
            : "border-gray-200 bg-white text-gray-800"
        } `}
      >
        {/* Header - Full Width */}
        <div className="mb-3 flex items-center justify-between border-b border-gray-500 pb-3">
          <h2
            className={`font-mono text-xl font-semibold lg:text-2xl ${
              isDark ? "text-teal-400" : "text-teal-800"
            }`}
          >
            Sync Collection Snippets
          </h2>
        </div>

        <div>
          {allSnippets?.snippets?.length > 0 ? (
            <ul className="mb-3 flex flex-col gap-2 overflow-auto">
              {allSnippets.snippets.map((snippet) => (
                <li
                  key={"snippet" + snippet._id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id={snippet._id}
                    checked={selectedSnippets.includes(snippet._id)}
                    onChange={() => handleCollectionToggle(snippet._id)}

                    className={`h-4 w-4 cursor-pointer`}
                  />
                  <label htmlFor={snippet._id}>
                    <div className={``}>
                      <h1>{snippet.title}</h1>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-3 text-center text-gray-500">
              No Snippets available.
            </p>
          )}
        </div>

        {/* Actions buttons */}
        <div className="mt-3 flex justify-end gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold shadow-md transition-all duration-150 active:scale-95 ${
                isDark
                  ? "border-pink-900/60 bg-pink-950/30 text-pink-400 hover:bg-pink-900/20"
                  : "border-pink-400 bg-pink-200 text-pink-900 hover:bg-pink-300"
              }`}
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
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToggleCollectionSnippetsForm;
