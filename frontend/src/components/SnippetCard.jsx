// src/components/SnippetCard.jsx
import { FaCodeFork } from "react-icons/fa6";
import ThemeContext from "../contexts/ThemeContext";
import HLJSHighlighter from "react-syntax-highlighter";
import { Prism as PrismHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

import useFetchMutation from "../hooks/useFetchMutation";
import ConfirmToast from "../components/ConfirmToast";
import { useContext } from "react";

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

const SnippetCard = ({
  snippet,
  onClickEdit,
  onClickFork,
  userSnippet,
  refreshSnippets,
}) => {
  const { theme, themes } = useContext(ThemeContext);
  const deleteSnippetMutation = useFetchMutation({
    key: "deleteSnippet",
    method: "DELETE",
  });

  const onDelete = async (id) => {
    ConfirmToast(
      "Are you sure you want to delete this snippet?",
      () => {
        // on Confirm
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
        // on Cancel
        toast.info("Delete cancelled");
      },
    );
  };

  const {
    _id,
    title,
    description,
    isPublic,
    language,
    user,
    tags,
    createdAt,
    code,
    forkParent,
  } = snippet;

  const mappedlanguage = languageMap[language?.toLowerCase()] || "javascript";
  const forkedUsersCount = snippet?.forkUsers?.length || 0;

  const isDark = theme === themes.DARK;
  const ActiveHighlighter = isDark ? HLJSHighlighter : PrismHighlighter;
  const highlighterStyle = isDark ? tomorrowNightBright : undefined;

  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div
      className={`grid ${userSnippet ? "grid-rows-[auto_auto_auto_1fr_auto_auto]" : "grid-rows-[auto_auto_1fr_auto]"} gap-2 border rounded-4xl w-full max-w-full box-border shadow-md/5 font-mono ${userSnippet ? "" : "break-inside-avoid mb-5"} ${
        theme === themes.DARK
          ? "bg-primary-bg4 border-primary-bg3 text-primary-text"
          : "bg-white border-gray-300 text-gray-800"
      }`}
    >
      <div className="flex items-center gap-2 px-6 pt-3">
        <div className="bg-red-600 w-2 h-2 rounded-full "></div>
        <div className="bg-yellow-500 w-2 h-2 rounded-full "></div>
        <div className="bg-green-600 w-2 h-2 rounded-full "></div>

        <p
          className={`text-xs capitalize ${
            theme === themes.DARK ? "text-primary-text/60" : "text-gray-500"
          }`}
        >
          {language}
        </p>

        {/* {userSnippet && ( */}
        <span
          className={`text-sm ml-auto px-3 py-1 border whitespace-nowrap rounded-full font-semibold font-mono ${
            theme === themes.DARK
              ? isPublic
                ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/60"
                : "bg-red-950/40 text-red-400 border-red-900/60"
              : isPublic
                ? "bg-emerald-100 text-emerald-900 border-gray-300"
                : "bg-red-200 text-red-900 border-gray-300"
          }`}
        >
          {isPublic ? "Public" : "Private"}
        </span>
        {/* )} */}
      </div>

      <hr
        className={
          theme === themes.DARK ? "border-gray-500/60" : "text-gray-300"
        }
      />

      <div className="flex justify-between items-start gap-2 px-6">
        <div className="min-w-0">
          <h3
            className={`font-semibold truncate ${
              theme === themes.DARK ? "text-white" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm line-clamp-2 ${
              theme === themes.DARK ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            {description || "..."}
          </p>
        </div>

        {/* {!userSnippet && (
          <span
            className={`text-sm px-3 py-1 border border-gray-300 whitespace-nowrap ${
              isPublic ? "bg-green-200" : "bg-red-200"
            } ${isPublic ? "text-green-900" : "text-red-900"} rounded-full font-semibold font-mono`}
          >
            {isPublic ? "Public" : "Private"}
          </span>
        )} */}
      </div>

      <div
        className={`w-full max-w-full px-6 ${
          isDark ? "bg-primary-bg4" : "bg-white"
        }`}
      >
        <ActiveHighlighter
          language={mappedlanguage}
          showLineNumbers={false}
          wrapLongLines={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          style={highlighterStyle}
          customStyle={{
            margin: 0,
            fontSize: "14px",
            lineHeight: 1.4,
            boxSizing: "border-box",
            width: "100%",
            whiteSpace: "pre",
            backgroundColor: isDark
              ? userSnippet
                ? "#1f1f1f"
                : "#2d2d2d"
              : userSnippet
                ? "#f0f8ff"
                : "white",
            borderRadius: "20px",
            padding: "1rem",
            height: "100%",
            border: 0,
            boxShadow: "none",
          }}
        >
          {code || ""}
        </ActiveHighlighter>
      </div>

      {userSnippet && (
        <div className="flex items-center gap-2 mt-2 px-6 flex-wrap">
          {tags.map((tag) => (
            <p
              className={`text-sm rounded-full px-3 py-1 font-semibold ${
                theme === themes.DARK
                  ? "text-orange-300 bg-orange-950/40 border border-orange-900/40"
                  : "text-orange-900 bg-orange-50"
              }`}
              key={`${_id}-${tag}`}
            >
              #{tag}
            </p>
          ))}
        </div>
      )}

      {userSnippet && (
        <p
          className={`text-sm font-mono px-6 ${
            theme === themes.DARK ? "text-teal-400" : "text-teal-900"
          }`}
        >
          Created On: {formattedDate(createdAt)}
        </p>
      )}

      {userSnippet && forkParent?.parentUserDetails?.name && (
        <p
          className={`font-semibold text-[15px] flex items-center gap-1 px-6 ${
            theme === themes.DARK ? "text-sky-400" : "text-sky-700"
          }`}
        >
          <FaCodeFork className="text-sm md:text-xl" />
          <span>forked @{forkParent?.parentUserDetails?.name}</span>
        </p>
      )}

      <div className="flex items-center text-xs text-gray-500 mt-1 px-6 pb-6">
        {!userSnippet && (
          <p
            className={`font-semibold text-[15px] ${
              theme === themes.DARK ? "text-sky-400" : "text-sky-700"
            }`}
          >
            {user?.name || "User"}
          </p>
        )}

        <div className="flex gap-3 justify-center items-center ml-auto">
          {onClickFork && (
            <button
              onClick={onClickFork}
              className={`whitespace-nowrap flex items-center gap-1 text-[15px] font-semibold cursor-pointer px-2 py-1 rounded-full ${
                theme === themes.DARK
                  ? "text-blue-400 hover:text-white hover:bg-primary-bg3"
                  : "text-blue-600 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaCodeFork className="text-xl" /> Fork
              {forkedUsersCount > 0 ? (
                <span
                  className={`text-md font-mono font-bold px-2 py-0 border-2 rounded-full ${
                    theme === themes.DARK
                      ? "bg-primary-bg3 border-primary-bg3 text-primary-text"
                      : "bg-gray-100 border-gray-300 text-gray-800"
                  }`}
                >
                  {forkedUsersCount}
                </span>
              ) : null}
            </button>
          )}
          {userSnippet && (
            <button
              onClick={onClickEdit}
              className={`flex items-center gap-1 font-semibold text-[15px] cursor-pointer px-3 py-1 transition-all duration-200 ${
                theme === themes.DARK
                  ? "text-gray-300 hover:bg-amber-800/40 hover:text-white hover:rounded-full"
                  : "text-gray-700 hover:bg-amber-200 hover:rounded-full"
              }`}
            >
              <MdOutlineEdit className="text-lg" />
              Edit
            </button>
          )}
          {userSnippet && (
            <button
              onClick={() => onDelete(snippet._id)}
              className={`flex items-center gap-1 font-semibold text-[15px] cursor-pointer px-3 py-1 transition-all duration-200 ${
                theme === themes.DARK
                  ? "text-red-400 hover:bg-red-950/40 hover:text-white hover:rounded-full"
                  : "text-red-600 hover:bg-red-100 hover:rounded-full"
              }`}
            >
              <RiDeleteBin5Line className="text-lg" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
