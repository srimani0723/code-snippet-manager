// src/pages/Dashboard.jsx
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import SnippetForm from "../components/SnippetForm";
import SnippetCard from "../components/SnippetCard";
import Spinner from "../components/Spinner";
import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const { user } = useAuth();
  const { email } = user || {};
  const id = user?.id || user?._id;

  const createSnippetMutation = useFetchMutation({
    key: "createSnippet",
    method: "POST",
  });

  const updateSnippetMutation = useFetchMutation({
    key: "updateSnippet",
    method: "PUT",
  });

  const {
    data,
    isLoading,
    isError,
    error: err,
  } = useFetchQuery({
    key: "dashboard",
    url: `/snippets/?userId=${id}`,
  });

  const apiStatus = isLoading
    ? apiStatusConstants.inProgress
    : isError
      ? apiStatusConstants.failure
      : apiStatusConstants.success;

  const { snippets = [] } = data || {};
  const error =
    isError && (err?.response?.data?.message || "Failed to fetch Snippets!");

  const publicSnippets = snippets.filter((each) => each.isPublic === true);

  const refreshSnippets = () => queryClient.invalidateQueries(["dashboard"]);

  const handleCreate = async (data) => {
    try {
      createSnippetMutation.mutate(
        {
          url: "/snippets",
          data,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success("Snippet created successfully!");
            setShowCreate(false);
            refreshSnippets();
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || "Create failed");
          },
        },
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };

  const handleUpdate = async (data) => {
    if (!editing) return;
    try {
      updateSnippetMutation.mutate(
        {
          url: `/snippets/${editing._id}`,
          data,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success("Snippet updated successfully!");
            setEditing(null);
            refreshSnippets();
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || "Update failed");
          },
        },
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const toggleSnippetForm = () => {
    setShowCreate(!showCreate);
    setEditing(null);
  };

  const successView = () => (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
            Your{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-500">
              snippets
            </span>
          </h1>
          <p className="text-md text-gray-600">
            Hi {email}. Keep building your library
          </p>
        </div>
        <button
          className="px-4 py-2 bg-emerald-200 text-emerald-900 text-sm rounded-full hover:bg-emerald-300 cursor-pointer shadow-sm flex items-center gap-2 font-semibold font-mono "
          onClick={toggleSnippetForm}
        >
          <IoMdAdd className="text-lg" />
          New Snippet
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl bg-white shadow-sm/5">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-red-600 w-2 h-2 rounded-full "></div> Total
          </h1>
          <p className="text-3xl font-semibold">{snippets.length}</p>
        </div>

        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl bg-white shadow-sm/5">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-green-600 w-2 h-2 rounded-full "></div> Public
          </h1>
          <p className="text-3xl font-semibold">{publicSnippets.length}</p>
        </div>

        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl bg-white shadow-sm/5">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-yellow-600 w-2 h-2 rounded-full "></div> Private
          </h1>
          <p className="text-3xl font-semibold">
            {snippets.length - publicSnippets.length}
          </p>
        </div>
      </div>

      {showCreate && (
        <SnippetForm onSubmit={handleCreate} onCancel={toggleSnippetForm} />
      )}

      {editing && !showCreate && (
        <SnippetForm
          initialData={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      {snippets.length === 0 && !error ? (
        <div className="text-center text-gray-600 text-sm mt-4">
          You have no snippets yet.
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {snippets.map((snip) => (
            <SnippetCard
              key={snip._id}
              snippet={snip}
              onClickEdit={() => {
                setShowCreate(false);
                setEditing(snip);
              }}
              onCancel={toggleSnippetForm}
              userSnippet={true}
              refreshSnippets={refreshSnippets}
            />
          ))}
        </div>
      )}
    </>
  );

  const errorView = () => (
    <p className="text-center text-sm text-red-600 mb-2">
      {error || "Something went wrong!"}
    </p>
  );

  const handleView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Spinner className={"text-4xl text-teal-500"} />;
      case apiStatusConstants.failure:
        return errorView();
      case apiStatusConstants.success:
        return successView();
      default:
        return null;
    }
  };

  return (
    <div className="p-4 mx-auto w-full lg:max-w-[90%] flex flex-col gap-4 relative">
      {handleView()}
    </div>
  );
};

export default Dashboard;
