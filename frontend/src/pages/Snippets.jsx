// src/pages/Snippets.jsx
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import useFetchQuery from "../hooks/useFetchQuery";
import useAuth from "../hooks/useAuth";

import SnippetCard from "../components/SnippetCard";
import Filters from "../components/Filters";
import Spinner from "../components/Spinner";

import { updateFilters } from "../reducers/publicSnippetsSlice";
import useFetchMutation from "../hooks/useFetchMutation";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Snippets = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { page, search, language, tags, isPublic, limit } = useSelector(
    (state) => state.publicSnippets,
  );

  const url = `/snippets?search=${search}&language=${language}&tags=${tags}&isPublic=${isPublic}&page=${page}&limit=${limit}`;

  const { data, isLoading, isError, error } = useFetchQuery({
    key: url,
    url: url,
  });
  const forkMutation = useFetchMutation({
    key: "forkSnippet",
    method: "POST",
  });

  const { snippets = [], pages = 1, total } = data || {};
  const { isAuthenticated } = useAuth();

  console.log("Fetched snippets:", snippets);

  const apiStatus = isLoading
    ? apiStatusConstants.inProgress
    : isError
      ? apiStatusConstants.failure
      : apiStatusConstants.success;

  const refreshSnippets = () =>
    queryClient.invalidateQueries({ queryKey: [url] });

  const handleFork = async (id) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    forkMutation.mutate(
      {
        url: `/snippets/${id}/fork`,
      },
      {
        onSuccess: () => {
          toast.success("Forked to your dashboard");
          refreshSnippets();
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Fork failed");
        },
      },
    );
  };

  const onDecreasePageNumber = () => {
    dispatch(updateFilters({ page: page - 1 }));
  };

  const onIncreasePageNumber = () => {
    dispatch(updateFilters({ page: page + 1 }));
  };

  const paginationView = () =>
    pages && (
      <div className="flex justify-center items-center gap-2 mt-2 text-sm sticky top-0">
        <button
          disabled={page === 1}
          onClick={onDecreasePageNumber}
          className="p-2 border-2 border-gray-400 rounded-4xl disabled:opacity-70  bg-sky-200 hover:bg-sky-300 cursor-pointer text-sky-900 font-semibold shadow hover:scale-110 transition-transform duration-200"
        >
          <FaLessThan />
        </button>
        <span className="text-emerald-700 font-mono font-semibold text-xl">
          {page} - {pages}
        </span>
        <button
          disabled={page === pages}
          onClick={onIncreasePageNumber}
          className="p-2 border-2 border-gray-400 rounded-4xl disabled:opacity-70  bg-sky-200 hover:bg-sky-300 cursor-pointer text-sky-900 font-semibold shadow hover:scale-110 transition-transform duration-200"
        >
          <FaGreaterThan />
        </button>
      </div>
    );

  const successView = () => (
    <>
      <Filters total={total} />

      {(!Array.isArray(snippets) || snippets.length === 0) && !isError ? (
        <div className="text-center text-gray-600 text-sm mt-4">
          No snippets found.
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 w-full mx-auto">
          {snippets.map((snip) => (
            <SnippetCard
              key={snip._id}
              snippet={snip}
              onDelete={null} // cannot delete here
              onClickEdit={null} // cannot edit here
              onClickFork={() => handleFork(snip._id)}
            />
          ))}
        </div>
      )}

      {paginationView()}
    </>
  );

  const handleView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Spinner className={"text-4xl text-teal-500"} />;
      case apiStatusConstants.failure:
        return (
          <p className="text-center text-sm text-red-600 mb-2">
            {error?.response?.data?.message}
          </p>
        );
      case apiStatusConstants.success:
        return successView();
      default:
        return null;
    }
  };

  return (
    <section className="p-4 mx-auto w-full flex flex-col gap-5 lg:max-w-[90%]">
      <div className="">
        <div className="flex items-center gap-2 my-2">
          <div className="bg-blue-600 w-2 h-2 rounded-full"></div>
          <div className="bg-red-600 w-2 h-2 rounded-full "></div>
          <div className="bg-yellow-500 w-2 h-2 rounded-full "></div>
          <div className="bg-green-600 w-2 h-2 rounded-full "></div>
        </div>

        <h1 className="text-xl sm:text-3xl font-semibold text-gray-800 mt-4">
          Public{" "}
          <span className="bg-linear-to-r from-blue-600 via-green-500 to-red-600 bg-clip-text text-transparent">
            Snippets
          </span>{" "}
        </h1>

        <p className="text-md text-gray-500">
          Hand-picked code from the community. Copy, learn, remix.
        </p>
      </div>

      {handleView()}
    </section>
  );
};

export default Snippets;
