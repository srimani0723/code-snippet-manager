import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const row1 = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Next.js",
    "Python",
    "Django",
    "FastAPI",
    "Flask",
    "Pandas",
    "NumPy",
    "HTML",
    "CSS",
    "Tailwind",
    "SQL",
    "MongoDB",
    "Redis",
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        Code Snippet Manager
      </h1>

      <p className="text-gray-600 text-sm">
        Save, search, and reuse your snippets across any stack.
      </p>

      <div className="flex gap-2">
        <Link
          to="/snippets"
          className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
        >
          Explore Snippets
        </Link>
        <Link
          to="/dashboard"
          className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs"
        >
          My Dashboard
        </Link>
      </div>

      {/* 3 justified scrolling lines */}
      <div className="mt-4 space-y-2 text-lg text-gray-700 font-semibold">
        {/* Row 1 */}
        <div className="border border-gray-200 rounded overflow-hidden">
          <div className="flex justify-between animate-row1 px-3">
            {row1.map((item) => (
              <span
                key={item}
                className="px-3 py-2 border border-gray-200 rounded bg-white mx-1 whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
