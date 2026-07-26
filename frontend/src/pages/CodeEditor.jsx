import React, { useState, useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import Editor from "@monaco-editor/react";
import { FaPlay, FaArrowRotateLeft } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import useFetchMutation from "../hooks/useFetchMutation";
import useFetchQuery from "../hooks/useFetchQuery";
import SnippetForm from "../components/SnippetForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
      <div className="flex-1 flex items-center justify-center h-[88vh]">
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDark ? "border-white" : "border-teal-600"}`}
        ></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 grid-rows-[auto_1fr] md:grid-rows-1 w-full p-3 gap-3 h-[88vh] border-box">
      {/* small device switch buttons */}
      <div className="col-span-5 flex items-center justify-center gap-2 md:hidden">
        <div className="flex items-center justify-between h-fit rounded-xl">
          <button
            className={`cursor-pointer transition-all duration-100 text-bold font-mono
              ${isDark ? (activeTab === "code" ? "bg-primary-bg3 px-4 py-1 rounded-full mx-2 text-white border border-gray-600" : "bg-primary-bg2 px-4 py-1 rounded-full mx-2 text-white border border-gray-600") : activeTab === "code" ? "bg-emerald-300 px-4 py-1 rounded-full mx-2 text-gray-900 border border-gray-400 text-emerald-600" : " px-4 py-1 rounded-full mx-2 text-gray-900 border border-gray-400"} `}
            onClick={() => setActiveTab("code")}
          >
            code
          </button>
          <button
            className={`cursor-pointer transition-all duration-100 text-bold font-mono
              ${isDark ? (activeTab === "output" ? "bg-primary-bg3 px-4 py-1 rounded-full text-white border border-gray-600" : "bg-primary-bg2 px-4 py-1 rounded-full text-white border border-gray-600") : activeTab === "output" ? "bg-emerald-300 px-4 py-1 rounded-full text-gray-900 border border-gray-400 text-emerald-600" : " px-4 py-1 rounded-full text-gray-900 border border-gray-400"} `}
            onClick={() => setActiveTab("output")}
          >
            output
          </button>
        </div>
      </div>

      {/* editor section */}
      <div
        className={` ${activeTab === "code" ? "block" : "hidden md:flex"} col-span-5 md:col-span-3 w-full flex flex-col items-start h-full border 
          ${isDark ? "text-white bg-primary-bg2 border-gray-700" : "text-gray-800 bg-white border-gray-300"} rounded-xl shadow-md/5 `}
      >
        <div
          className={`font-semibold p-2 px-4 text-sm border-b w-full ${isDark ? "border-gray-700" : "border-gray-300"} flex items-center justify-between`}
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
        <div className="flex-1 flex flex-col w-full">
          <Editor
            height="100%"
            width="100%"
            language="javascript"
            theme="vs-dark"
            defaultValue="// Write your code here"
            value={code}
            onChange={handleCodeWritingChange}
            options={{
              automaticLayout: true,
              scrollBeyondLastLine: false,
              lineNumbersMinChars: 3,
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 10,
              lineHeight: 25,
              fontSize: 16,
              minimap: {
                enabled: false,
              },
            }}
          />
          <button
            className="text-sm bg-sky-600 hover:bg-sky-700 text-white font-bold self-end px-3 py-1 m-2 rounded-full flex items-center cursor-pointer disabled:opacity-50"
            type="button"
            onClick={handleRunCode}
            disabled={codeMutation.isLoading}
          >
            <FaPlay className="mr-2" />
            {codeMutation.isLoading ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      {/* output section */}
      <div
        className={`${activeTab === "output" ? "block" : "hidden md:flex"} col-span-5 md:col-span-2 w-full flex flex-col items-start h-full border 
          ${isDark ? "text-white bg-primary-bg2 border-gray-700" : "text-gray-800 bg-white border-gray-300"} rounded-xl shadow-md/5 `}
      >
        <p
          className={`font-semibold p-2 px-4 text-sm border-b w-full ${isDark ? "border-gray-700" : "border-gray-300"}`}
        >
          Output
        </p>
        <div className="flex-1 flex flex-col w-full bg-primary-bg2 h-full rounded-b-xl overflow-y-auto">
          {output &&
            output.split("\n").map((line, idx) => (
              <div
                key={idx}
                className="border-b border-gray-600 bg-primary-bg3/30 py-2 px-3 text-orange-200"
              >
                {line}
              </div>
            ))}
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
