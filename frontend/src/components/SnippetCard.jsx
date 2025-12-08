// src/components/SnippetCard.jsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

const SnippetCard = ({ snippet, onDelete, onClickEdit, onClickFork }) => {
  const language = languageMap[snippet.language?.toLowerCase()] || "javascript";

  return (
    <div className="border border-gray-200 rounded p-4 flex flex-col gap-2 bg-white w-full max-w-full box-border">
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {snippet.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {snippet.description}
          </p>
        </div>
        <span className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-700 whitespace-nowrap">
          {snippet.language}
        </span>
      </div>

      <div className="bg-gray-100 rounded max-h-56 overflow-auto w-full max-w-full">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "8px 10px",
            fontSize: "12px",
            lineHeight: 1.4,
            boxSizing: "border-box",
            width: "100%",
            whiteSpace: "pre",
          }}
          wrapLongLines={false}
        >
          {snippet.code || ""}
        </SyntaxHighlighter>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
        <span className="truncate">{snippet.user?.name}</span>
        <div className="flex gap-3">
          {onClickFork && (
            <button
              onClick={onClickFork}
              className="text-blue-600 hover:underline whitespace-nowrap"
            >
              Fork
            </button>
          )}
          {onClickEdit && (
            <button
              onClick={onClickEdit}
              className="text-gray-700 hover:underline whitespace-nowrap"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(snippet._id)}
              className="text-red-600 hover:underline whitespace-nowrap"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
