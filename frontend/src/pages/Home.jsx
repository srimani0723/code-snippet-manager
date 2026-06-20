import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { LuDot } from "react-icons/lu";
import { FaBolt, FaCode, FaTags } from "react-icons/fa6";
import { FaGlobeAsia, FaLock, FaSearch, FaShareAlt } from "react-icons/fa";
import { MdSnippetFolder } from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const sampleCode = `function debounce(func, delay) {
  let timer;
  
  return function (...args) {
    const context = this;
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const handleSearch = debounce((event) => {
  console.log("Searching for:", event.target.value);
}, 500);

document.getElementById("searchInput")
  .addEventListener("input", handleSearch);`;

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme, themes } = useContext(ThemeContext);
  const isDark = theme === themes.DARK;

  const introPart = () => (
    <div className="min-h-[70vh] text-center flex flex-col justify-center items-center w-full gap-4">
      <h1
        className={`text-3xl font-semibold md:text-4xl lg:text-6xl p-2 lg:max-w-[70%] ${
          isDark ? "text-sky-400" : "text-sky-700"
        }`}
      >
        Your Code Snippets,{" "}
        <span className="bg-linear-to-r from-blue-500 via-green-600 to-red-600 bg-clip-text text-transparent">
          Organised{" "}
        </span>
        and Shareable
      </h1>

      <p
        className={`text-sm md:text-lg font-semibold ${
          isDark ? "text-teal-400" : "text-teal-600"
        }`}
      >
        Save, search, and reuse your snippets across any stack.
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate("/snippets")}
          className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-600 active:scale-95 transition-all duration-150"
        >
          Explore Snippets
        </button>
        <button
          onClick={() => {
            if (isAuthenticated) {
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          }}
          className={`px-4 py-2 border-2 rounded-full text-sm font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
            isDark
              ? "text-primary-text border-primary-border bg-primary-bg4 hover:bg-primary-bg3"
              : "border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
        >
          {isAuthenticated ? "My Dashboard" : "Start Snipping"}
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="bg-blue-600 w-2 h-2 rounded-full animate-bounce"></div>
        <div className="bg-red-600 w-2 h-2 rounded-full animate-bounce [animation-delay:150ms]"></div>
        <div className="bg-yellow-500 w-2 h-2 rounded-full animate-bounce [animation-delay:300ms]"></div>
        <div className="bg-green-600 w-2 h-2 rounded-full animate-bounce [animation-delay:450ms]"></div>
      </div>
    </div>
  );

  const codeSnippet = () => (
    <div
      className={`mx-auto border-2 p-5 rounded-4xl w-full max-w-[600px] box-border overflow-hidden mb-4 ${
        isDark
          ? "bg-primary-bg4 border-primary-border"
          : "bg-white border-[#e5e5e6]"
      }`}
    >
      <div className="flex items-center gap-2 px-2">
        <div className="bg-red-600 w-2 h-2 rounded-full"></div>
        <div className="bg-yellow-500 w-2 h-2 rounded-full"></div>
        <div className="bg-green-600 w-2 h-2 rounded-full"></div>

        <div
          className={`flex items-center ${
            isDark ? "text-primary-text" : "text-gray-700"
          }`}
        >
          <p className="text-sm">usedebounce.js</p>
          <LuDot />
          <p className="text-sm">javascript</p>
        </div>

        <p className="text-sm font-semibold ms-auto me-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-400">
          public
        </p>
      </div>

      <SyntaxHighlighter
        language="javascript"
        showLineNumbers
        wrapLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
        style={isDark ? dark : undefined}
        customStyle={{
          width: "100%",
          borderRadius: "20px",
          fontSize: "14px",
          padding: "10px",
          backgroundColor: isDark ? "#2d2d2d" : "white",
          fontWeight: "550",
          border: 0,
          boxShadow: "none",
        }}
      >
        {sampleCode}
      </SyntaxHighlighter>
    </div>
  );

  const featuresPart = () => (
    <>
      <div className="text-center w-full p-4 my-3">
        <h1
          className={`text-xl font-semibold lg:text-4xl mb-3 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Everything you need,{" "}
          <span className="bg-linear-to-r from-blue-600 via-teal-500 to-red-500 bg-clip-text text-transparent">
            nothing you don't
          </span>
        </h1>
        <p
          className={`text-md md:text-lg font-semibold ${
            isDark ? "text-primary-text/80" : "text-gray-600"
          }`}
        >
          A focused toolset for personal snippet libraries and community
          sharing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto font-mono">
        {/* Syntax-highlighted Code Card */}
        <div
          className={`md:col-span-2 md:row-span-2 flex flex-col justify-start items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaCode className="w-5 h-5" />
          </div>

          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Syntax-highlighted Code
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Write with a real code editor — Prism-powered colors across 10+
            languages.
          </p>

          <SyntaxHighlighter
            language="javascript"
            wrapLines={true}
            lineProps={{
              style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
            }}
            style={isDark ? dark : undefined}
            customStyle={{
              width: "100%",
              borderRadius: "20px",
              fontSize: "14px",
              padding: "10px",
              backgroundColor: isDark ? "#2d2d2d" : "white",
              border: 0,
              boxShadow: "none",
            }}
          >
            {`// One file. One job. No fuss.
export const greet = (name: string) =>
  \`Hello, \${name}! 👋\`;`}
          </SyntaxHighlighter>
        </div>

        {/* Public Showcase Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-green-500 p-3 rounded-full text-white">
            <FaGlobeAsia className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Public Showcase
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Discover Snippets from other developers.
          </p>
        </div>

        {/* Private by Default Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-yellow-500 p-3 rounded-full text-white">
            <FaLock className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Private by Default
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Keep your code safe. Mark snippets public only when you choose.
          </p>
        </div>

        {/* Instant Search Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-red-500 p-3 rounded-full text-white">
            <FaSearch className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Instant Search
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Filter by title, language, or tags - no waiting.
          </p>
        </div>

        {/* Tag Everything Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaTags className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Tag Everything
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Group snippets your way with free-form tags.
          </p>
        </div>

        {/* Personal Dashboard Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-green-500 p-3 rounded-full text-white">
            <MdSnippetFolder className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Personal Dashboard
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            One quiet page to see, edit and organize your work.
          </p>
        </div>

        {/* Copy Friendly Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-red-500 p-3 rounded-full text-white">
            <FaShareAlt className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Copy-friendly
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Every public snippet is ready to copy with a click.
          </p>
        </div>

        {/* Colorful by Design Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-yellow-500 p-3 rounded-full text-white">
            <IoMdColorPalette className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Colorful by design
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Each language gets its own dot. Find code by feel.
          </p>
        </div>

        {/* Fast Everywhere Card */}
        <div
          className={`flex flex-col justify-center items-start p-6 border rounded-4xl gap-1 transition-all duration-200 hover:shadow-md ${
            isDark
              ? "bg-primary-bg4 border-primary-border text-primary-text"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaBolt className="w-5 h-5" />
          </div>
          <h2
            className={`font-semibold text-lg sm:text-xl md:text-2xl ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Fast everywhere
          </h2>
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Lightweight, snappy, and works great on mobile.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <section className="p-4 w-full flex flex-col gap-4 lg:max-w-[90%] mx-auto">
      {introPart()}
      {codeSnippet()}
      {featuresPart()}

      {/* Get Started CTA banner */}
      <div
        className={`flex flex-col md:flex-row items-center gap-4 my-5 p-8 rounded-4xl border-2 shadow-md transition-all duration-200 ${
          isDark
            ? "bg-linear-to-r from-sky-950/20 via-teal-950/20 to-orange-950/20 border-primary-border text-primary-text"
            : "bg-linear-to-r from-sky-100 via-teal-100 to-orange-100 border-gray-300"
        }`}
      >
        <div className="flex flex-col items-start gap-4 flex-1">
          <h1
            className={`text-3xl font-semibold md:text-4xl lg:max-w-[70%] ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Ready to{" "}
            <span className="bg-linear-to-r from-sky-600 via-teal-500 to-red-600 bg-clip-text text-transparent">
              snip
            </span>{" "}
            something?
          </h1>
          <p
            className={`text-md md:text-lg font-semibold ${
              isDark ? "text-primary-text/60" : "text-gray-500"
            }`}
          >
            Sign in once and start building your library. It's free, and your
            private snippets stay private.
          </p>
        </div>

        <div className="flex items-center">
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-600 active:scale-95 transition-all duration-150 shadow-md"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer shadow ml-2 active:scale-95 transition-all duration-150 ${
              isDark
                ? "bg-primary-bg3 text-white hover:bg-primary-bg4 border border-primary-border"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
            onClick={() => navigate("/snippets")}
          >
            Browse gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
