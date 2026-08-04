import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { IoMdArrowBack } from "react-icons/io";
import { FaCodeFork, FaTerminal, FaCopy, FaCheck } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

import HLJSHighlighter from "react-syntax-highlighter";
import { Prism as PrismHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";
import ThemeContext from "../contexts/ThemeContext";

import ToggleSnippetsCollectionsForm from "../components/ToggleSnippetsCollectionsForm";
import Spinner from "../components/Spinner";
import ConfirmToast from "../components/ConfirmToast";

const languageMap = {
  javascript: "javascript",
  js: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  html: "markup",
  css: "css",
  json: "json",
  sql: "sql",
};

const UserSnippetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const [copied, setCopied] = useState(false);
  const [syncFormOpen, setSyncFormOpen] = useState(false);

  const { data, isLoading, isError, error } = useFetchQuery({
    key: `snippet-${id}`,
    url: `/snippets/${id}`,
  });

  const deleteSnippetMutation = useFetchMutation({
    key: "deleteSnippet",
    method: "DELETE",
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="text-4xl text-teal-500" />
      </div>
    );
  }

  if (isError || !data?.snippet) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4 text-center">
        <p className="font-semibold text-red-500">
          {error?.response?.data?.message || "Failed to load snippet details!"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className={`mx-auto flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-semibold ${
            isDark
              ? "bg-primary-bg4 border-primary-bg3 text-white"
              : "border-gray-300 bg-white text-gray-800"
          }`}
        >
          <IoMdArrowBack /> Go Back
        </button>
      </div>
    );
  }

  const { snippet } = data;
  const {
    _id,
    title,
    description,
    isPublic,
    language,
    tags = [],
    createdAt,
    code = "",
    forkParent,
  } = snippet;

  const mappedlanguage = languageMap[language?.toLowerCase()] || "javascript";
  const authorName = snippet.user?.name || "Unknown Author";
  const authorEmail = snippet.user?.email || "";

  const ActiveHighlighter = isDark ? HLJSHighlighter : PrismHighlighter;
  const highlighterStyle = isDark ? tomorrowNightBright : undefined;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    ConfirmToast(
      "Are you sure you want to delete this snippet?",
      () => {
        deleteSnippetMutation.mutate(
          {
            url: `/snippets/${_id}`,
          },
          {
            onSuccess: () => {
              toast.success("Snippet deleted successfully!");
              navigate("/dashboard");
            },
            onError: (err) => {
              toast.error(err.response?.data?.message || "Delete failed");
            },
          },
        );
      },
      () => {
        toast.info("Delete cancelled");
      },
    );
  };

  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleSyncForm = () => setSyncFormOpen((prev) => !prev);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 p-4 font-mono md:p-8 lg:max-w-[95%]">
      {syncFormOpen && (
        <ToggleSnippetsCollectionsForm
          snippetId={_id}
          onCancel={() => setSyncFormOpen(false)}
        />
      )}

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-all hover:scale-105 active:scale-95 ${
            isDark
              ? "bg-primary-bg4 border-primary-bg3 hover:bg-primary-bg3 text-white"
              : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
          }`}
        >
          <IoMdArrowBack /> Back
        </button>
      </div>

      {/* Main Details Panel Layout */}
      <div
        className={`flex flex-col gap-6 rounded-4xl border p-6 shadow-md md:gap-8 md:p-8 lg:flex-row ${
          isDark
            ? "bg-primary-bg4 border-primary-bg3 text-primary-text"
            : "border-gray-300 bg-white text-gray-800"
        }`}
      >
        {/* Left Side: Metadata (Title, Description, Details, Tags, Actions) */}
        <div className="flex flex-col gap-6 lg:w-[35%] lg:max-w-[400px] lg:min-w-[320px]">
          <div className="flex flex-col gap-4">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                  isDark
                    ? "border border-blue-900/60 bg-blue-950/40 text-blue-400"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {language}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                  isDark
                    ? isPublic
                      ? "border-emerald-900/60 bg-emerald-950/40 text-emerald-400"
                      : "border-red-900/60 bg-red-950/40 text-red-400"
                    : isPublic
                      ? "border-gray-300 bg-emerald-100 text-emerald-900"
                      : "border-gray-300 bg-red-200 text-red-900"
                }`}
              >
                {isPublic ? "Public" : "Private"}
              </span>

              {forkParent?.parentUserDetails?.name && (
                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    isDark ? "text-sky-400" : "text-sky-700"
                  }`}
                >
                  <FaCodeFork />
                  <span>forked</span>
                </span>
              )}
            </div>

            <h1
              className={`text-2xl font-bold tracking-tight break-all md:text-3xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h1>

            <p
              className={`text-sm leading-relaxed break-words whitespace-pre-wrap ${
                isDark ? "text-primary-text/80" : "text-gray-600"
              }`}
            >
              {description || "No description provided."}
            </p>

            <div className="mt-2 flex flex-col gap-2 text-xs opacity-75">
              <div>
                <span>Author: </span>
                <span className="font-semibold text-teal-500">
                  {authorName}
                </span>
                {authorEmail && (
                  <span className="text-[10px]"> ({authorEmail})</span>
                )}
              </div>
              {forkParent?.parentUserDetails?.name && (
                <div>
                  <span>Forked from: </span>
                  <span className="font-semibold text-sky-500">
                    @{forkParent.parentUserDetails.name}
                  </span>
                </div>
              )}
              <div>
                <span>Created: </span>
                <span>{formattedDate(createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isDark
                      ? "border border-orange-900/40 bg-orange-950/40 text-orange-300"
                      : "bg-orange-50 text-orange-900"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <hr className={isDark ? "border-primary-bg3" : "border-gray-200"} />

          {/* Actions Footer */}
          <div className="mt-auto flex flex-col gap-2">
            {(language === "javascript" || language === "js") && (
              <button
                onClick={() => navigate(`/code-editor/${_id}`)}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isDark
                    ? "hover:bg-primary-bg2 border border-gray-600 text-white"
                    : "border border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaTerminal /> Open with Editor
              </button>
            )}

            <button
              onClick={toggleSyncForm}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isDark
                  ? " text-violet-300 hover:bg-violet-900/40 "
                  : "text-violet-700 hover:bg-violet-200"
              }`}
            >
              <BsCollectionFill /> Save to Collections
            </button>

            <button
              onClick={() => {
                navigate(`/code-editor/${_id}`);
              }}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isDark
                  ? "text-amber-300 hover:bg-amber-800/40 "
                  : "text-amber-700 hover:bg-amber-200"
              }`}
            >
              <MdOutlineEdit /> Edit Details
            </button>

            <button
              onClick={handleDelete}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isDark
                  ? "text-red-400 hover:bg-red-950/40 "
                  : "text-red-600 hover:bg-red-100"
              }`}
            >
              <RiDeleteBin5Line /> Delete
            </button>
          </div>
        </div>

        {/* Divider for < lg screens */}
        <hr
          className={`lg:hidden ${isDark ? "border-primary-bg3" : "border-gray-200"}`}
        />

        {/* Right Side: Code Block Container */}
        <div className="relative flex min-w-0 flex-1 flex-col gap-2">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleCopy}
              className={`flex cursor-pointer items-center justify-center rounded-xl border p-2 transition-all ${
                isDark
                  ? "border-gray-700 bg-[#2d2d2d] text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
              title="Copy Code"
            >
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </button>
          </div>

          <div className="flex h-full w-full max-w-full flex-col overflow-hidden">
            <ActiveHighlighter
              language={mappedlanguage}
              showLineNumbers={true}
              wrapLongLines={true}
              lineProps={{
                style: {
                  wordBreak: "normal",
                  overflowWrap: "anywhere",
                  whiteSpace: "pre-wrap",
                },
              }}
              style={highlighterStyle}
              customStyle={{
                margin: 0,
                fontSize: "14px",
                lineHeight: 1.5,
                boxSizing: "border-box",
                width: "100%",
                whiteSpace: "pre-wrap",
                wordBreak: "normal",
                overflowWrap: "anywhere",
                backgroundColor: isDark ? "#1f1f1f" : "#f0f8ff",
                borderRadius: "24px",
                padding: "1.5rem",
                paddingTop: "2.5rem", // offset for copy button
                border: 0,
                boxShadow: "none",
                flexGrow: 1,
              }}
            >
              {code}
            </ActiveHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSnippetDetails;
