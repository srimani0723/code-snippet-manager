import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ThemeContext from "../contexts/ThemeContext";

import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";

import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import UserSnippetCard from "../components/UserSnippetCard";
import CollectionForm from "../components/CollectionForm";

import { MdOutlineEdit } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

const CollectionDetails = () => {
  const navigate = useNavigate();
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const { id } = useParams();

  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const { data, isLoading, error, isError, refetch } = useFetchQuery({
    key: "collectionDetails",
    url: `/collections/${id}`,
  });

  const updateCollectionMutation = useFetchMutation({
    key: "updateCollection",
    method: "PUT",
  });

  const handleEditFormToggle = () => setToggleEditForm((prev) => !prev);

  const handleFormSubmit = (formData) => {
    updateCollectionMutation.mutate(
      { url: `/collections/${id}`, data: formData },
      {
        onSuccess: () => {
          toast.success("Collection updated successfully!");
          refetch();
          setToggleEditForm(false);
        },
        onError: (error) => {
          toast.error(`Error updating collection: ${error.message}`);
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
    toast.error(`Error fetching collections: ${error.message}`);
  }

  return (
    <section
      className={`scrollbar-none mx-auto flex w-full flex-col gap-2 p-4 [-ms-overflow-style:none] lg:max-w-[95%] [&::-webkit-scrollbar]:hidden`}
    >
      {toggleEditForm && (
        <CollectionForm
          initialData={data.collection}
          onSubmit={handleFormSubmit}
          onCancel={handleEditFormToggle}
        />
      )}

      {/* top back and edit buttons */}
      <div className={`flex items-center justify-between gap-2`}>
        <button
          onClick={() => navigate(-1)}
          className={`mb-3 flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-all hover:scale-105 active:scale-95 ${
            isDark
              ? "bg-primary-bg4 border-primary-bg3 hover:bg-primary-bg3 text-white"
              : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
          }`}
        >
          <IoMdArrowBack /> Back
        </button>

        <button
          onClick={handleEditFormToggle}
          className={`flex cursor-pointer items-center gap-1 rounded-full bg-amber-300 px-4 py-2 text-[15px] font-semibold text-amber-800 transition-all duration-200 hover:scale-105`}
        >
          <MdOutlineEdit className="text-lg" />
          Edit
        </button>
      </div>

      {/* collection details */}
      <div
        className={`mb-2 flex flex-col gap-2 md:items-start md:justify-between`}
      >
        <h1
          className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}
        >
          {data.collection.name}
        </h1>

        <p
          className={`font-mono text-lg ${isDark ? "text-primary-text" : "text-gray-800"}`}
        >
          {data.collection.description}
        </p>

        <p className={`font-mono text-sm font-semibold text-teal-500`}>
          {data.collection.createdAt &&
            `${new Date(data.collection.createdAt).toLocaleString()}`}
        </p>
      </div>

      <h1 className="">
        <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text font-mono text-xl font-semibold text-transparent">
          Collection Snippets
        </span>
      </h1>

      <hr
        className={`mb-3 ${isDark ? "border-gray-600" : "border-gray-300"}`}
      />

      {/* snippets list */}
      {data.collection.snippets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.collection.snippets.map((snippet) => (
            <UserSnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <p
          className={`text-center text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          No snippets found in this collection.
        </p>
      )}
    </section>
  );
};

export default CollectionDetails;
