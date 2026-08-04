// src/pages/Dashboard.jsx
import { useState, useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import SnippetForm from "../components/SnippetForm";
import UserSnippetCard from "../components/UserSnippetCard";

import useAuth from "../hooks/useAuth";
import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";

import ThemeContext from "../contexts/ThemeContext";

/**
 * Dashboard component renders the user's main statistics overview
 * (Total, Public, Private counts) and their personal list of code snippets.
 */
const DashboardSnippets = () => {
  const queryClient = useQueryClient();
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  // State triggers to control editing and creation modals
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // Retrieve details of the currently authenticated user
  const { user } = useAuth();
  const id = user?.id || user?._id;

  // React Query mutations for POST (create) and PUT (edit) requests
  const createSnippetMutation = useFetchMutation({
    key: "createSnippet",
    method: "POST",
  });
  const updateSnippetMutation = useFetchMutation({
    key: "updateSnippet",
    method: "PUT",
  });

  // Query hook to fetch the user's personal snippet entries from the server
  const {
    data,
    isLoading,
    isError,
    error: err,
  } = useFetchQuery({
    key: "dashboard",
    url: `/snippets/?userId=${id}`,
  });

  const snippets = data?.snippets || [];

  // Calculate stats to display in the grids
  const publicCount = snippets.filter((s) => s.isPublic).length;

  // Function to invalidate React Query cache, triggering a fresh database fetch
  const refreshSnippets = () => queryClient.invalidateQueries(["dashboard"]);

  // Handler to create a new snippet
  const handleCreate = (data) => {
    createSnippetMutation.mutate(
      { url: "/snippets", data },
      {
        onSuccess: () => {
          toast.success("Snippet created successfully!");
          setShowCreate(false); // Close the create modal
          refreshSnippets(); // Reload the grid
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "Create failed"),
      },
    );
  };

  // Handler to update an existing snippet
  const handleUpdate = (data) => {
    if (!editing) return;
    updateSnippetMutation.mutate(
      { url: `/snippets/${editing._id}`, data },
      {
        onSuccess: () => {
          toast.success("Snippet updated successfully!");
          setEditing(null); // Close the edit modal
          refreshSnippets(); // Reload the grid
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "Update failed"),
      },
    );
  };

  // ==========================================
  // RENDER HELPER FUNCTIONS FOR READABILITY
  // ==========================================

  // 1. Render Loading State (Spinner)
  const renderLoading = () => <Spinner className="text-4xl text-teal-500" />;

  // 2. Render Error View
  const renderError = () => (
    <p className="mb-2 text-center text-sm text-red-600">
      {err?.response?.data?.message || "Failed to fetch Snippets!"}
    </p>
  );

  // 3. Render Header Row (Greetings and Add Button)
  const renderHeader = () => (
    <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <h1
          className={`text-2xl font-semibold md:text-4xl ${isDark ? "text-white" : "text-gray-800"}`}
        >
          Your{" "}
          <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            snippets
          </span>
        </h1>
        <p
          className={`text-md ${isDark ? "text-primary-text/60" : "text-gray-600"}`}
        >
          Hi {user?.email}. Keep building your library
        </p>
      </div>
      <button
        className={`flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-semibold shadow-xs transition-all duration-150 active:scale-95 sm:w-fit ${
          isDark
            ? "border border-emerald-700 bg-emerald-800/40 text-emerald-400 hover:bg-emerald-900/20"
            : "bg-emerald-200 text-emerald-900 hover:bg-emerald-300"
        }`}
        onClick={() => {
          setShowCreate(!showCreate);
          setEditing(null);
        }}
      >
        <IoMdAdd className="text-lg" /> New Snippet
      </button>
    </div>
  );

  // 4. Render Stats Overview Cards (Total, Public, Private)
  const renderStatsGrid = () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[
        { label: "Total", color: "bg-red-600", val: snippets.length },
        { label: "Public", color: "bg-green-600", val: publicCount },
        {
          label: "Private",
          color: "bg-yellow-600",
          val: snippets.length - publicCount,
        },
      ].map(({ label, color, val }) => (
        <div
          key={label}
          className={`flex flex-col gap-1 rounded-3xl border p-4 shadow-xs ${
            isDark
              ? "bg-primary-bg4 border-primary-bg3 text-primary-text"
              : "border-gray-300 bg-white text-gray-800"
          }`}
        >
          <h1
            className={`flex items-center gap-2 text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
          >
            <div className={`${color} h-2 w-2 rounded-full`}></div> {label}
          </h1>
          <p className="text-3xl font-semibold">{val}</p>
        </div>
      ))}
    </div>
  );

  // 5. Render Snippets Grid or Empty State Text
  const renderSnippetsFeed = () => {
    if (snippets.length === 0) {
      return (
        <div
          className={`mt-4 text-center text-sm ${isDark ? "text-primary-text/60" : "text-gray-600"}`}
        >
          You have no snippets yet.
        </div>
      );
    }

    return (
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snip) => (
          <UserSnippetCard
            key={snip._id}
            snippet={snip}
            onClickEdit={() => {
              setShowCreate(false);
              setEditing(snip);
            }}
            refreshSnippets={refreshSnippets}
          />
        ))}
      </div>
    );
  };

  // ==========================================
  // MAIN COMPONENT RETURN RENDER
  // ==========================================
  return (
    <section className="relative mx-auto flex w-full flex-col gap-4 p-4 lg:max-w-[95%]">
      {isLoading ? (
        renderLoading()
      ) : isError ? (
        renderError()
      ) : (
        <>
          {renderHeader()}
          {renderStatsGrid()}

          {/* Creation modal overlay */}
          {showCreate && (
            <SnippetForm
              onSubmit={handleCreate}
              onCancel={() => setShowCreate(false)}
            />
          )}

          {/* Editing modal overlay */}
          {editing && !showCreate && (
            <SnippetForm
              initialData={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
            />
          )}

          {renderSnippetsFeed()}
        </>
      )}
    </section>
  );
};

export default DashboardSnippets;
