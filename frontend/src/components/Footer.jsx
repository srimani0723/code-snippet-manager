const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-gray-50 border-t border-gray-300 px-4 py-3 h-[10vh]">
      <p className="text-sm font-semibold">
        © 2026{" "}
        <span className="bg-linear-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">
          Code Snippet Manager
        </span>{" "}
        | All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
