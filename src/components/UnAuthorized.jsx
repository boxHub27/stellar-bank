import React from "react";

const UnauthorizedComponent = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-gray-100">
      <svg
        className="absolute inset-0 z-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 800 600"
      >
        {/* Add your SVG shapes and animations here */}
        {/* Example SVG shapes */}
        <circle cx="400" cy="300" r="150" fill="#63B3ED">
          <animate
            attributeName="r"
            from="150"
            to="200"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <rect x="200" y="200" width="400" height="200" fill="#F6AD55">
          <animate
            attributeName="x"
            from="200"
            to="400"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <div className="relative z-10 rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-3xl font-semibold">Unauthorized Access</h2>
        <p className="mb-6 text-gray-600">
          {` Oops! It looks like you don't have permission to access this page.`}
        </p>
        <button className="rounded-full bg-blue-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600">
          <a href="/login">Login</a>
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedComponent;
