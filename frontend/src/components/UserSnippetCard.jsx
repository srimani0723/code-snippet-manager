// src/components/UserSnippetCard.jsx
import { FaCodeFork, FaTerminal } from "react-icons/fa6";
import ThemeContext from "../contexts/ThemeContext";
import HLJSHighlighter from "react-syntax-highlighter";
import { Prism as PrismHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";

import useFetchMutation from "../hooks/useFetchMutation";
import ConfirmToast from "../components/ConfirmToast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const UserSnippetCard = ({ snippet, onClickEdit, refreshSnippets }) => {
  const navigate = useNavigate();
  const { theme, themes } = useContext(ThemeContext);
  const [more, setMore] = useState(false);

  const deleteSnippetMutation = useFetchMutation({
    key: "deleteSnippet",
    method: "DELETE",
  });

  const onDelete = async (id) => {
    ConfirmToast(
      "Are you sure you want to delete this snippet?",
      () => {
        deleteSnippetMutation.mutate(
          {
            url: `/snippets/${id}`,
          },
          {
            onSuccess: () => {
              toast.success("Snippet deleted successfully!");
              refreshSnippets();
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

  const handleMoreClick = () => {
    setMore((prev) => !prev);
  };

  const {
    _id,
    title,
    description,
    isPublic,
    language,
    tags,
    createdAt,
    code,
    forkParent,
  } = snippet;

  const mappedlanguage = languageMap[language?.toLowerCase()] || "javascript";
  const isDark = theme === themes.DARK;
  const ActiveHighlighter = isDark ? HLJSHighlighter : PrismHighlighter;
  const highlighterStyle = isDark ? tomorrowNightBright : undefined;

  const formattedDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCardDetails = () => navigate(`/dashboard/snippets/${_id}`);

  const handleCardEditButton = () => {
    onClickEdit(snippet);
    handleMoreClick(); // Close the more menu after action
  };

  const handleCardDeleteButton = () => {
    onDelete(_id);
    handleMoreClick(); // Close the more menu after action
  };

  const handleCardOpenButton = () => {
    navigate(`/code-editor/${_id}`);
    handleMoreClick(); // Close the more menu after action
  };

  return (
    <div
      className={`box-border flex w-full max-w-full min-w-0 flex-col justify-between gap-3 rounded-4xl border-2 pb-4 font-mono shadow-md/5 transition-all duration-200 hover:shadow-lg ${
        isDark
          ? "bg-primary-bg4 text-primary-text border-primary-bg4 hover:border-gray-500"
          : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
      } relative`}
    >
      {/* 1. more button */}
      <div className="absolute top-4 right-4 z-2">
        <button
          onClick={handleMoreClick}
          className={`ml-auto flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-[15px] font-semibold transition-all duration-200 hover:scale-120 ${
            isDark ? "text-gray-300 " : "text-gray-700 "
          }`}
        >
          <BsThreeDots className="text-2xl" />
        </button>

        {/* 6. Footer Actions Panel */}
        {more && (
          <div
            className={`flex w-full flex-col items-center justify-between gap-2 rounded-2xl border border-gray-400 p-2 shadow-lg backdrop-blur-lg ${isDark ? "bg-primary-bg4/50" : "bg-white/30"}`}
          >
            {/* Left Side: Open Button */}

            {(language === "javascript" || language === "js") && (
              <button
                onClick={handleCardOpenButton}
                className={`flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-[15px] font-semibold transition-all duration-200 ${
                  isDark
                    ? "bg-primary-bg2 hover:bg-primary-bg3 border-gray-600 text-white"
                    : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaTerminal className="text-lg" />
                Open
              </button>
            )}

            {/* Right Side: Edit & Delete Buttons */}
            <button
              onClick={handleCardEditButton}
              className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-[15px] font-semibold transition-all duration-200 ${
                isDark
                  ? "text-gray-300 hover:bg-amber-700/40 hover:text-white"
                  : "text-gray-700 hover:bg-amber-200"
              }`}
            >
              <MdOutlineEdit className="text-lg" />
              Edit
            </button>

            <button
              onClick={handleCardDeleteButton}
              className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-[15px] font-semibold transition-all duration-200 ${
                isDark
                  ? "text-red-400 hover:bg-red-700/40 hover:text-white"
                  : "text-red-600 hover:bg-red-100"
              }`}
            >
              <RiDeleteBin5Line className="text-lg" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* 2. Title & Description Block */}
      <div className="flex items-start justify-between gap-2 px-6 pt-4">
        <div className="w-full min-w-0">
          <h3
            className={`truncate text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1 line-clamp-1 text-xs leading-relaxed ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            {description || "..."}
          </p>
        </div>
      </div>

      {/* 3. Code Syntax Highlighter View */}
      <div
        className={`w-full max-w-full px-6 ${
          isDark ? "bg-primary-bg4" : "bg-white"
        }`}
      >
        <div
          className={`box-border max-h-[220px] w-full overflow-hidden rounded-2xl border transition-all duration-250 ${
            isDark ? "border-primary-bg3" : "border-gray-200"
          }`}
        >
          <div
            className="relative box-border w-full cursor-pointer overflow-y-hidden text-left text-xs select-text"
            onClick={handleCardDetails}
          >
            {/* Header Row (macOS dot styling) */}
            <div
              className={`flex items-center gap-1.5 px-4 pt-2 ${isDark ? "bg-[#0d1117]" : "bg-[#f6f8fa]"}`}
            >
              <div className="h-2 w-2 rounded-full bg-red-600"></div>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-600"></div>

              <p
                className={`text-xs capitalize ${
                  isDark ? "text-primary-text/70" : "text-gray-500"
                }`}
              >
                {language}
              </p>

              <span
                className={`ml-auto rounded-full border px-3 py-1 font-mono text-xs font-semibold whitespace-nowrap ${
                  isDark
                    ? isPublic
                      ? "border-teal-900/60 bg-emerald-950/40 text-teal-400"
                      : "border-red-900/60 bg-red-950/40 text-red-400"
                    : isPublic
                      ? "border-gray-300 bg-emerald-100 text-emerald-900"
                      : "border-gray-300 bg-red-200 text-red-900"
                }`}
              >
                {isPublic ? "Public" : "Private"}
              </span>
            </div>
            <ActiveHighlighter
              language={mappedlanguage}
              style={highlighterStyle}
              customStyle={{
                margin: 0,
                padding: "1rem",
                width: "100%",
                boxSizing: "border-box",
                background: isDark ? "#0d1117" : "#f6f8fa",
                whiteSpace: "pre-wrap",
                wordBreak: "normal",
                overflowWrap: "anywhere",
              }}
              wrapLongLines={true}
            >
              {code
                ? code.split("\n").slice(0, 5).join("\n") +
                  (code.split("\n").length > 5
                    ? "\n// ... click to see more"
                    : "")
                : ""}
            </ActiveHighlighter>
          </div>
        </div>
      </div>

      {/* 4. Tags Block */}
      <div className="mt-1 flex flex-wrap items-center gap-1.5 px-6 select-none">
        {tags?.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap transition-colors duration-150 ${
              isDark
                ? "bg-primary-bg3/30 border-primary-bg3 hover:bg-primary-bg3/50 hover:text-white"
                : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 5. Date & Fork Row */}
      <div className="flex flex-col gap-1 px-6">
        <p
          className={`font-mono text-xs ${
            isDark ? "text-teal-400" : "text-teal-900"
          }`}
        >
          Created On: {formattedDate(createdAt)}
        </p>

        {forkParent && (
          <p className="mt-1 flex items-center gap-1.5 text-xs opacity-60">
            <FaCodeFork className="text-sm" />
            <span>forked @{forkParent?.parentUserDetails?.name}</span>
          </p>
        )}

        {/* view more button */}
        <button
          className="curso z-2 ml-auto flex cursor-pointer items-center gap-1 font-mono text-sm font-semibold text-blue-400 transition-all duration-200 hover:text-blue-500"
          onClick={handleCardDetails}
        >
          View Details <FaArrowRight className="text-md" />
        </button>
      </div>
    </div>
  );
};

export default UserSnippetCard;
