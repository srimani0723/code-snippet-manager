// src/components/ExploreSnippetCard.jsx
import { FaCodeFork } from "react-icons/fa6";
import ThemeContext from "../contexts/ThemeContext";
import HLJSHighlighter from "react-syntax-highlighter";
import { Prism as PrismHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useContext } from "react";
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

const ExploreSnippetCard = ({ snippet, onClickFork }) => {
  const { theme, themes } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { title, description, isPublic, language, user, code } = snippet;

  const mappedlanguage = languageMap[language?.toLowerCase()] || "javascript";
  const forkedUsersCount = snippet?.forkUsers?.length || 0;

  const isDark = theme === themes.DARK;
  const ActiveHighlighter = isDark ? HLJSHighlighter : PrismHighlighter;
  const highlighterStyle = isDark ? tomorrowNightBright : undefined;

  const handleCardClick = () => {
    navigate(`/snippets/${snippet._id}`);
  };

  return (
    <div
      className={`duration-200hover:shadow-lg mb-5 box-border flex w-full max-w-full min-w-0 cursor-pointer break-inside-avoid flex-col gap-2 overflow-hidden rounded-4xl border font-mono shadow-md/5 transition-all ${
        isDark
          ? "bg-primary-bg4 border-primary-bg3 text-primary-text"
          : "border-gray-300 bg-white text-gray-800"
      }`}
    >
      {/* 1. header part lang and public/private */}
      <div className="flex items-center gap-2 px-6 pt-3">
        <div className="h-2 w-2 rounded-full bg-red-600"></div>
        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 rounded-full bg-green-600"></div>

        <p
          className={`text-xs capitalize ${
            isDark ? "text-primary-text/60" : "text-gray-500"
          }`}
        >
          {language}
        </p>

        <span
          className={`ml-auto rounded-full border px-3 py-1 font-mono text-sm font-semibold whitespace-nowrap ${
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
      </div>

      <hr className={isDark ? "border-gray-500/60" : "text-gray-300"} />

      {/* 2. title and description */}

      <div className="flex items-start justify-between gap-2 px-6">
        <div className="min-w-0">
          <h3
            onClick={handleCardClick}
            className={`cursor-pointer truncate font-semibold hover:text-blue-400 hover:underline ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p
            className={`line-clamp-2 text-sm ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            {description || "..."}
          </p>
        </div>
      </div>

      {/* 3. code snippet preview */}
      <div
        onClick={handleCardClick}
        className={`w-full max-w-full grow px-6 ${
          isDark ? "bg-primary-bg4" : "bg-white"
        }`}
      >
        <ActiveHighlighter
          language={mappedlanguage}
          showLineNumbers={false}
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
            lineHeight: 1.4,
            boxSizing: "border-box",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "normal",
            overflowWrap: "anywhere",
            backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
            borderRadius: "10px",
            padding: "1rem",
            height: "100%",
            border: 0,
            boxShadow: "none",
          }}
        >
          {code
            ? code.split("\n").length > 5
              ? code.split("\n").slice(0, 5).join("\n") +
                "\n// ... click to see more"
              : code
            : ""}
        </ActiveHighlighter>
      </div>

      {/* 4. user info and fork button */}
      <div className="mt-1 flex items-center px-6 pb-6 text-xs text-gray-500">
        <p
          className={`text-[15px] font-semibold ${
            isDark ? "text-sky-400" : "text-sky-700"
          }`}
        >
          {user?.name || "User"}
        </p>

        <div className="flex w-full items-center justify-center gap-3">
          {onClickFork && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClickFork();
              }}
              className={`ml-auto flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[15px] font-semibold whitespace-nowrap ${
                isDark
                  ? "hover:bg-primary-bg3 text-blue-400 hover:text-white"
                  : "text-blue-600 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <FaCodeFork className="text-xl" /> Fork
              {forkedUsersCount > 0 ? (
                <span
                  className={`text-md rounded-full border-2 px-2 py-0 font-mono font-bold ${
                    isDark
                      ? "bg-primary-bg3 border-primary-bg3 text-primary-text"
                      : "border-gray-300 bg-gray-100 text-gray-800"
                  }`}
                >
                  {forkedUsersCount}
                </span>
              ) : null}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreSnippetCard;
