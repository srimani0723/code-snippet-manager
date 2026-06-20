import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { LuDot } from "react-icons/lu";
import { FaBolt, FaCode, FaTags } from "react-icons/fa6";
import { FaGlobeAsia, FaLock, FaSearch, FaShareAlt } from "react-icons/fa";
import { MdSnippetFolder } from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import useAuth from "../hooks/useAuth";

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

  const introPart = () => (
    <div className="min-h-[70vh] text-center flex flex-col justify-center items-center w-full gap-4">
      <h1 className="text-3xl font-semibold text-sky-700 md:text-4xl lg:text-6xl p-2 lg:max-w-[70%]">
        Your Code Snippets,{" "}
        <span className="bg-linear-to-r from-blue-500 via-green-600 to-red-600 bg-clip-text text-transparent">
          Organised{" "}
        </span>
        and Shareable
      </h1>

      <p className="text-teal-600 text-sm md:text-lg font-semibold">
        Save, search, and reuse your snippets across any stack.
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate("/snippets")}
          className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-600"
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
          className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-semibold cursor-pointer"
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
    <div className="mx-auto border-2 border-[#e5e5e6] p-5 rounded-4xl bg-white w-full max-w-[600px] box-border overflow-hidden mb-4">
      <div className="flex items-center gap-2 px-2">
        <div className="bg-red-600 w-2 h-2 rounded-full"></div>
        <div className="bg-yellow-500 w-2 h-2 rounded-full"></div>
        <div className="bg-green-600 w-2 h-2 rounded-full"></div>

        <div className="flex items-center">
          <p className="text-sm text-gray-700">usedebounce.js</p>
          <LuDot className="text-gray-700" />
          <p className="text-sm text-gray-700">javascript</p>
        </div>

        <p className="text-sm text-sky-700 font-semibold ms-auto me-2 bg-blue-50 px-2 py-1 rounded-2xl">
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
        customStyle={{
          width: "100%",
          borderRadius: "20px",
          fontSize: "14px",
          padding: "10px",
          backgroundColor: "white",
          fontWeight: "550",
        }}
      >
        {sampleCode}
      </SyntaxHighlighter>
    </div>
  );

  const featuresPart = () => (
    <>
      <div className="text-center w-full p-4 my-3">
        <h1 className="text-xl font-semibold lg:text-4xl mb-3">
          Everything you need,{" "}
          <span className="bg-linear-to-r from-blue-600 via-teal-500 to-red-500 bg-clip-text text-transparent">
            nothing you don't
          </span>
        </h1>
        <p className="text-md md:text-lg font-semibold">
          A focused toolset for personal snippet libraries and community
          sharing.
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full  mx-auto font-mono">
        <div className="md:col-span-2 md:row-span-2 flex flex-col justify-start items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaCode className="w-5 h-5" />
          </div>

          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Syntax-highlighted Code
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Write with a real code editor — Prism-powered colors across 10+
            languages.
          </p>

          <SyntaxHighlighter
            language="javascript"
            wrapLines={true}
            lineProps={{
              style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
            }}
            customStyle={{
              width: "100%",
              borderRadius: "20px",
              fontSize: "14px",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            {`// One file. One job. No fuss.
export const greet = (name: string) =>
  \`Hello, \${name}! 👋\`;`}
          </SyntaxHighlighter>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-green-500 p-3 rounded-full text-white">
            <FaGlobeAsia className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Public Showcase
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Discover Snippets from other developers
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-yellow-500 p-3 rounded-full text-white">
            <FaLock className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Private by Default
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Keep your code safe. Mark snippets public only when you choose.
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-red-500 p-3 rounded-full text-white">
            <FaSearch className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Instant Search
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Filter by title, language, or tags. - no waiting
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaTags className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Tag Everything
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Group snippets your way with free-form tags.
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-green-500 p-3 rounded-full text-white">
            <MdSnippetFolder className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Personal Dashboard
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            One quiet page to see, edit and oragnize your work.
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-red-500 p-3 rounded-full text-white">
            <FaShareAlt className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Copy-friendly
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Every public snippet is ready to copy with a click.
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-yellow-500 p-3 rounded-full text-white">
            <IoMdColorPalette className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Colorful by design
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            Each language gets its own dot. Find code by feel.
          </p>
        </div>

        <div className="flex flex-col justify-center items-start p-6 border border-gray-300 rounded-4xl bg-white gap-1 hover:shadow-md/5">
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaBolt className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Fast everywhere
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
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

      <div className="flex flex-col md:flex-row items-center gap-2 my-5 p-8 rounded-4xl bg-linear-to-r from-sky-100 via-teal-100 to-orange-100 border-2 border-gray-300 shadow-md">
        <div className="flex flex-col items-start gap-4 flex-1">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl lg:max-w-[70%]">
            Ready to{" "}
            <span className="bg-linear-to-r from-sky-600 via-teal-500 to-red-600 bg-clip-text text-transparent">
              snip
            </span>{" "}
            something?
          </h1>
          <p className="text-md md:text-lg font-semibold text-gray-500">
            Sign in once and start building your library. It's free, and your
            private snippets stay private.
          </p>
        </div>

        <div className="flex items-center">
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="px-5 py-2 bg-white text-gray-800 rounded-full text-sm font-semibold cursor-pointer shadow ml-2"
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
