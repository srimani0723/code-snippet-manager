// src/components/SnippetCard.jsx
import { FaCodeFork } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { MdOutlineEdit } from "react-icons/md";

import { RiDeleteBin5Line } from "react-icons/ri";

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
  onDelete,
  onClickEdit,
  onClickFork,
  userSnippet,
}) => {
  const {
    title,
    description,
    isPublic,
    language,
    user,
    updatedAt,
    tags,
    createdAt,
    code,
  } = snippet;

  const mappedlanguage = languageMap[language?.toLowerCase()] || "javascript";

  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div
      className={`grid ${userSnippet ? "grid-rows-[auto_auto_auto_1fr_auto_auto]" : "grid-rows-[auto_auto_1fr_auto]"} gap-2 border border-gray-300 rounded-4xl  bg-white w-full max-w-full box-border shadow-md/5 font-mono ${userSnippet ? "" : "break-inside-avoid mb-5"} `}
    >
      <div className="flex items-center gap-2 px-6 pt-3">
        <div className="bg-red-600 w-2 h-2 rounded-full "></div>
        <div className="bg-yellow-500 w-2 h-2 rounded-full "></div>
        <div className="bg-green-600 w-2 h-2 rounded-full "></div>

        <p className="text-xs text-gray-500 capitalize">{language}</p>

        {/* {userSnippet && ( */}
        <span
          className={`text-sm ml-auto px-3 py-1 border border-gray-300 whitespace-nowrap ${
            isPublic ? "bg-emerald-100" : "bg-red-200"
          } ${isPublic ? "text-emerald-900" : "text-red-900"} rounded-full font-semibold font-mono`}
        >
          {isPublic ? "Public" : "Private"}
        </span>
        {/* )} */}
      </div>

      <hr className="text-gray-300" />

      <div className="flex justify-between items-start gap-2 px-6">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
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

      <div className="w-full max-w-full bg-white px-6">
        <SyntaxHighlighter
          language={mappedlanguage}
          showLineNumbers={false}
          wrapLongLines={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          customStyle={{
            margin: 0,
            padding: "8px 10px",
            fontSize: "14px",
            lineHeight: 1.4,
            boxSizing: "border-box",
            width: "100%",
            whiteSpace: "pre",
            backgroundColor: userSnippet ? "#f0f8ff" : "white",
            borderRadius: "20px",
            padding: "1rem",
          }}
        >
          {code || ""}
        </SyntaxHighlighter>
      </div>

      {userSnippet && (
        <div className="flex items-center gap-2 mt-2 px-6">
          {tags.map((tag) => (
            <p className="text-sm text-orange-900 bg-orange-50 rounded-full px-3 py-1 font-semibold">
              #{tag}
            </p>
          ))}
        </div>
      )}

      {userSnippet && (
        <p className="text-sm text-teal-900 font-mono px-6">
          Created On: {formattedDate(createdAt)}
        </p>
      )}

      <div className="flex items-center text-xs text-gray-500 mt-1 px-6 pb-6">
        {!userSnippet && (
          <p className="font-semibold text-[15px] text-sky-700">
            {user?.name || "User"}
          </p>
        )}

        <div className="flex gap-3 justify-center items-center ml-auto">
          {onClickFork && (
            <button
              onClick={onClickFork}
              className="text-blue-600 whitespace-nowrap flex items-center gap-1 text-[15px] font-semibold cursor-pointer px-2 py-1 rounded-full hover:text-gray-700 hover:bg-gray-100"
            >
              <FaCodeFork className="text-xl" /> Fork
            </button>
          )}
          {userSnippet && (
            <button
              onClick={onClickEdit}
              className="text-gray-700 flex items-center gap-1 font-semibold text-[15px] cursor-pointer hover:bg-amber-200 hover:rounded-full px-3 py-1 transition-all duration-200"
            >
              <MdOutlineEdit className="text-lg" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(snippet._id)}
              className="text-red-600 flex items-center gap-1 font-semibold text-[15px] cursor-pointer hover:bg-red-100 hover:rounded-full px-3 py-1 transition-all duration-200"
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
