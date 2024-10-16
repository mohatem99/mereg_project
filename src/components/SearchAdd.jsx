import React from "react";
export default function SearchAdd() {
  return (
    <>
      {/* Search */}
      <div className="flex md:order-2 basis-1/2">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          aria-label="Toggle search"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>

        <div className="relative hidden md:block">
          <div className="absolute inset-y-1 m-2 lg:mb-4 md:mb-9 start-5 flex items-center ps-4 pointer-events-none">
            <span className="sr-only">Search icon</span>
          </div>
          {/* Search Input */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-1/2 lg:w-full relative">
              <input
                type="text"
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg outline-gray-400"
                placeholder="Search"
              />
              <svg
                className="absolute left-3 top-3 w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
