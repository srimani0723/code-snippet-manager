import { useState, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import Spinner from "../components/Spinner";
import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";

import ThemeContext from "../contexts/ThemeContext";
import CollectionForm from "../components/CollectionForm";

const Collections = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const navigate = useNavigate();

  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const queryClient = useQueryClient();
  const refreshCollections = () =>
    queryClient.invalidateQueries(["collections"]);

  const { data, isLoading, isError, error } = useFetchQuery({
    key: "collections",
    url: `/collections`,
  });

  const createCollectionMutation = useFetchMutation({
    key: "createCollection",
    method: "POST",
  });

  const handleCreateCollection = async (formData) => {
    createCollectionMutation.mutate(
      { url: "/collections", data: formData },
      {
        onSuccess: () => {
          toast.success("Collection created successfully!");
          refreshCollections();
          setToggleForm(false);
        },
        onError: (error) => {
          toast.error(`Error creating collection: ${error.message}`);
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <Spinner className={"text-3xl text-sky-500"} />
      </div>
    );

  if (isError) {
    return (
      <p className="text-muted-foreground flex min-h-[90vh] items-center justify-center text-center font-mono text-lg font-semibold">
        {error?.response?.status === 401
          ? "Your session expired. Please log in again."
          : "Unable to load collections right now."}
      </p>
    );
  }

  if (data?.collections?.length === 0)
    return (
      <p className="text-muted-foreground flex min-h-[90vh] items-center justify-center text-center font-mono text-lg font-semibold">
        You have no collections yet.
      </p>
    );

  const handleToggleForm = () => setToggleForm((prev) => !prev);

  return (
    <section className="scrollbar-none relative mx-auto flex min-h-[90vh] w-full flex-col gap-4 p-4 [-ms-overflow-style:none] lg:max-w-[95%] [&::-webkit-scrollbar]:hidden">
      {toggleForm && (
        <CollectionForm
          initialData={null}
          onSubmit={handleCreateCollection}
          onCancel={handleToggleForm}
        />
      )}

      <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1
          className={`text-2xl font-semibold md:text-4xl ${isDark ? "text-white" : "text-gray-800"}`}
        >
          Your{" "}
          <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            collections
          </span>
        </h1>
        <button
          onClick={handleToggleForm}
          className={`mt-3 flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-semibold shadow-xs transition-all duration-150 active:scale-95 sm:mt-0 sm:w-fit ${
            isDark
              ? "border border-emerald-700 bg-emerald-800/40 text-emerald-400 hover:bg-emerald-900/20"
              : "bg-emerald-200 text-emerald-900 hover:bg-emerald-300"
          }`}
        >
          <IoMdAdd className="text-lg" /> New Collection
        </button>
      </div>

      <div
        className={`flex h-full w-full flex-row flex-wrap gap-4 rounded-4xl ${isDark ? "" : ""}`}
      >
        {data?.collections?.map((collection) => (
          <div
            key={collection._id}
            className={`${isDark ? "text-gray-300" : "text-gray-700"} group group relative cursor-pointer p-4`}
          >
            {collection.snippets.length > 0 && (
              <p
                className={`absolute top-0 left-8 rounded-full ${isDark ? "bg-white/30" : "bg-black/30"} text-md hidden px-2 py-0 font-mono font-bold text-white backdrop-blur-md group-hover:block`}
              >
                {collection.snippets.length}
              </p>
            )}
            <button
              className="text-md flex cursor-pointer flex-col items-center font-semibold"
              type="button"
              onClick={() =>
                navigate(`/dashboard/collections/${collection._id}`)
              }
            >
              <FaFolder
                className={`mr-2 text-[50px] ${isDark ? "text-gray-400" : "text-emerald-400"} block group-hover:hidden`}
              />
              <FaFolderOpen
                className={`mr-2 text-[50px] ${isDark ? "text-gray-400" : "text-emerald-400"} hidden group-hover:block`}
              />
              {collection.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
