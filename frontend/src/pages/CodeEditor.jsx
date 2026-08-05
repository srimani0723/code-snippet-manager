import React, { useState, useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import Editor from "@monaco-editor/react";
import { FaPlay, FaArrowRotateLeft } from "react-icons/fa6";
import { RiGeminiFill } from "react-icons/ri";
import { FiSave } from "react-icons/fi";
import useFetchMutation from "../hooks/useFetchMutation";
import useFetchQuery from "../hooks/useFetchQuery";
import SnippetForm from "../components/SnippetForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CodeEditor = ({ id }) => {
  const navigate = useNavigate();
  const { theme, themes } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("code");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showSnippetForm, setShowSnippetForm] = useState(false);
  const isEditMode = !!id && id !== "new";
  const [editing, setEditing] = useState(isEditMode);
  const [existingSnippet, setExistingSnippet] = useState({});
  const [explanation, setExplanation] = useState("");

  const { isLoading: isLoadingSnippet } = useFetchQuery({
    key: `codeEditor/snippet/${id}`,
    url: `/snippets/${id}`,
    enabled: isEditMode,
    onSuccess: (fetchedData) => {
      if (fetchedData?.snippet) {
        setExistingSnippet(fetchedData.snippet);
        setCode(fetchedData.snippet.code);
        setEditing(true);
      }
    },
  });

  const explainCodeMutation = useFetchMutation({
    key: "/ai/explain",
    method: "POST",
  });

  const codeMutation = useFetchMutation({
    key: "/compiler/javascript",
    method: "POST",
  });

  const createSnippetMutation = useFetchMutation({
    key: "createSnippetCodeEditor",
    method: "POST",
  });

  const updateSnippetMutation = useFetchMutation({
    key: "updateSnippetCodeEditor",
    method: "PUT",
  });

  const handleCreate = async (formData) => {
    try {
      createSnippetMutation.mutate(
        {
          url: "/snippets",
          data: formData,
        },
        {
          onSuccess: (data) => {
            toast.success("Snippet created successfully!");
            setShowSnippetForm(false);
            navigate(`/code-editor/${data?.snippet?._id}`);
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || "Create failed");
          },
        },
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing) return;
    try {
      updateSnippetMutation.mutate(
        {
          url: `/snippets/${id}`,
          data: formData,
        },
        {
          onSuccess: () => {
            toast.success("Snippet updated successfully!");
            setShowSnippetForm(false);
            setEditing(isEditMode);
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || "Update failed");
          },
        },
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleRunCode = () => {
    if (!code.trim()) {
      setOutput("");
      return;
    }

    setExplanation(""); // Clear previous explanation when running code

    codeMutation.mutate(
      {
        url: "/compiler/javascript",
        data: { code },
      },
      {
        onSuccess: (responseData) => {
          setOutput(responseData.output || responseData.error || "");
        },
        onError: (err) => {
          setOutput(err.response?.data?.message || "Execution error");
        },
      },
    );
  };

  const handleExplainCode = () => {
    if (!code.trim()) {
      toast.error("Code is empty. Please write some code to explain.");
      return;
    }

    setOutput("");

    explainCodeMutation.mutate(
      {
        url: "/ai/explain",
        data: { code },
      },
      {
        onSuccess: (responseData) => {
          setExplanation(
            responseData.explanation || "No explanation provided.",
          );
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Failed to explain code");
        },
      },
    );
  };

  const toggleSnippetForm = () => {
    setShowSnippetForm((prev) => !prev);
    setEditing(isEditMode);
  };

  const handleCodeWritingChange = (value) => {
    setCode(value ?? "");
  };

  const isDark = theme === themes.DARK;

  if (isEditMode && isLoadingSnippet) {
    return (
      <div className="flex h-[88vh] flex-1 items-center justify-center">
        <div
          className={`h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 ${isDark ? "border-white" : "border-teal-600"}`}
        ></div>
      </div>
    );
  }

  return (
    <div className="border-box mx-auto grid h-[85vh] w-full max-w-[1200px] grid-cols-5 grid-rows-[auto_1fr] gap-3 p-3 md:h-[88vh] md:grid-rows-1 lg:max-w-[90%]">
      {/* small device switch buttons */}
      <div className="col-span-5 flex items-center justify-center gap-2 md:hidden">
        <div className="flex h-fit items-center justify-between rounded-xl">
          <button
            className={`text-bold cursor-pointer font-mono transition-all duration-100 ${isDark ? (activeTab === "code" ? "bg-primary-bg3 mx-2 rounded-full border border-gray-600 px-4 py-1 text-white" : "bg-primary-bg2 mx-2 rounded-full border border-gray-600 px-4 py-1 text-white") : activeTab === "code" ? "mx-2 rounded-full border border-gray-400 bg-emerald-300 px-4 py-1 text-emerald-600 text-gray-900" : " mx-2 rounded-full border border-gray-400 px-4 py-1 text-gray-900"} `}
            onClick={() => setActiveTab("code")}
          >
            code
          </button>
          <button
            className={`text-bold cursor-pointer font-mono transition-all duration-100 ${isDark ? (activeTab === "output" ? "bg-primary-bg3 rounded-full border border-gray-600 px-4 py-1 text-white" : "bg-primary-bg2 rounded-full border border-gray-600 px-4 py-1 text-white") : activeTab === "output" ? "rounded-full border border-gray-400 bg-emerald-300 px-4 py-1 text-emerald-600 text-gray-900" : " rounded-full border border-gray-400 px-4 py-1 text-gray-900"} `}
            onClick={() => setActiveTab("output")}
          >
            output
          </button>
        </div>
      </div>

      {/* editor section */}
      <div
        className={` ${activeTab === "code" ? "flex" : "hidden md:flex"} col-span-5 flex h-full min-h-0 w-full flex-col border md:col-span-3 ${isDark ? "bg-primary-bg2 border-gray-700 text-white" : "border-gray-300 bg-white text-gray-800"} rounded-xl shadow-md/5`}
      >
        <div
          className={`w-full border-b p-2 px-4 text-sm font-semibold ${isDark ? "border-gray-700" : "border-gray-300"} flex items-center justify-between`}
        >
          <p>Javascript</p>
          <div className="flex gap-4 text-lg">
            <button
              className="transparant cursor-pointer"
              onClick={toggleSnippetForm}
              title="Save snippet"
            >
              <FiSave />
            </button>
            <button
              className="transparant cursor-pointer"
              title="Reset code"
              onClick={() => {
                setCode("// Write your code here");
                setOutput("");
              }}
            >
              <FaArrowRotateLeft />
            </button>
          </div>
        </div>
        <div className="bg-primary-bg2 flex min-h-0 w-full flex-1 flex-col rounded-b-xl">
          <div className="relative min-h-0 w-full flex-grow">
            <Editor
              height="100%"
              width="100%"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={handleCodeWritingChange}
              options={{
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 10,
                lineHeight: 22,
                fontSize: 15,
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>
          <div className={`m-2 flex items-center justify-end gap-2`}>
            <button
              className="bg-primary-bg3 flex cursor-pointer items-center self-end rounded-full px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
              type="button"
              onClick={handleExplainCode}
              disabled={explainCodeMutation.isLoading}
            >
              <RiGeminiFill className="mr-2" />
              {explainCodeMutation.isLoading ? "Explaining..." : "Explain Code"}
            </button>
            <button
              className="flex cursor-pointer items-center self-end rounded-full bg-sky-600 px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-sky-700 disabled:opacity-50"
              type="button"
              onClick={handleRunCode}
              disabled={codeMutation.isLoading}
            >
              <FaPlay className="mr-2 text-xs" />
              {codeMutation.isLoading ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>
      </div>

      {/* output section */}
      <div
        className={`${activeTab === "output" ? "flex" : "hidden md:flex"} col-span-5 flex h-full min-h-0 w-full flex-col border md:col-span-2 ${isDark ? "bg-primary-bg2 border-gray-700 text-white" : "border-gray-300 bg-white text-gray-800"} rounded-xl shadow-md/5`}
      >
        <p
          className={`w-full border-b p-2 px-4 text-sm font-semibold ${isDark ? "border-gray-700" : "border-gray-300"}`}
        >
          Output
        </p>
        <div className="flex h-full w-full flex-1 flex-col gap-1.5 overflow-y-auto rounded-b-xl border-t border-gray-700/30 bg-[#0d1117] p-2 font-mono text-sm">
          {output
            ? output.split("\n").map((line, idx) => (
                <div
                  key={idx}
                  className="bg-primary-bg2 rounded-md px-2 py-1 font-mono text-sm leading-relaxed font-semibold whitespace-pre-wrap text-emerald-400"
                >
                  {line}
                </div>
              ))
            : !explanation && (
                <span className="text-xs text-gray-500 italic">
                  Console is empty. Click "Run Code" to execute.
                </span>
              )}

          {explanation && (
            <div className="bg-primary-bg2 prose prose-invert max-w-none rounded-md px-2 py-1 font-mono text-sm leading-relaxed font-semibold text-gray-300">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="m-0 mt-2 mb-1 text-lg font-bold">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => <p className="m-0 mb-2">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="m-0 mb-2 list-disc pl-5">{children}</ul>
                  ),
                }}
              >
                {explanation}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* if exists show update form else create form */}
      {showSnippetForm && (
        <SnippetForm
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => setShowSnippetForm(false)}
          initialData={{ ...existingSnippet, code: code }}
        />
      )}
    </div>
  );
};

const CodeEditorWrapper = () => {
  const { id } = useParams();
  return <CodeEditor key={id} id={id} />;
};

export default CodeEditorWrapper;
