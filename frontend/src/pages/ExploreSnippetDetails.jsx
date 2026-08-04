// src/pages/ExploreSnippetDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { FaCodeFork, FaCopy, FaCheck } from "react-icons/fa6";
import HLJSHighlighter from "react-syntax-highlighter";
import { Prism as PrismHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

import useAuth from "../hooks/useAuth";
import useFetchQuery from "../hooks/useFetchQuery";
import useFetchMutation from "../hooks/useFetchMutation";
import ThemeContext from "../contexts/ThemeContext";
import Spinner from "../components/Spinner";

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

const ExploreSnippetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;
  const { user, isAuthenticated } = useAuth();
  const currentUserId = user?.id || user?._id;

  const [copied, setCopied] = useState(false);

  const { data, isLoading, isError, error } = useFetchQuery({
    key: `snippet-${id}`,
    url: `/snippets/${id}`,
  });

  const forkMutation = useFetchMutation({
    key: "forkSnippet",
    method: "POST",
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
    language,
    tags = [],
    createdAt,
    code = "",
    forkParent,
    forkUsers = [],
  } = snippet;

  const mappedlanguage = languageMap[language?.toLowerCase()] || "javascript";
  const forkedUsersCount = forkUsers?.length || 0;
  const isOwner =
    currentUserId &&
    (currentUserId === snippet.user?._id || currentUserId === snippet.user);
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

  const handleFork = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    forkMutation.mutate(
      {
        url: `/snippets/${_id}/fork`,
      },
      {
        onSuccess: () => {
          toast.success("Snippet forked to your dashboard successfully!");
          navigate("/dashboard");
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Fork failed");
        },
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

  return (
    <div className="mx-auto flex w-full flex-col gap-6 p-4 font-mono md:p-8 lg:max-w-[95%]">
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

      {/* Main Details Panel Layout - NOT CARD-LIKE (No card box borders or background) */}
      <div
        className={`flex flex-col gap-6 p-2 md:gap-8 lg:flex-row ${isDark ? "text-primary-text" : "text-gray-800"}`}
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

            <div className="mt-2 flex flex-col gap-2 border-t border-dashed border-gray-500/20 pt-4 text-xs opacity-75">
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

          {/* Actions - No Delete or Edit buttons. Only Fork if current user is not the owner */}
          <div className="mt-auto flex flex-col gap-2">
            {!isOwner && (
              <button
                onClick={handleFork}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                  isDark
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <FaCodeFork className="text-lg" /> Fork Snippet
                {forkedUsersCount > 0 && (
                  <span
                    className={`rounded-full border border-white/20 bg-black/25 px-2 py-0.5 font-mono text-xs font-bold`}
                  >
                    {forkedUsersCount}
                  </span>
                )}
              </button>
            )}
            {isOwner && (
              <p
                className={`text-center text-xs italic opacity-60 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                You own this snippet. View it in your dashboard to modify it.
              </p>
            )}
          </div>
        </div>

        {/* Divider for < lg screens */}
        <hr
          className={`lg:hidden ${isDark ? "border-primary-bg3" : "border-gray-200"}`}
        />

        {/* Right Side: Code Block Container */}
        <div className="relative flex min-w-0 flex-1 flex-col gap-2">
          <div className="absolute top-4 right-4 z-10">
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

export default ExploreSnippetDetails;
