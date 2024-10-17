import { useEffect } from "react";
import { fetchTasks, setSearchTerm } from "../store/reducers/tasksSlice";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import useDebounce from "../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.tasks.searchTerm);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    dispatch(setSearchTerm(e.target.value)); // Update the search term

    if (value) {
      navigate(`/tasks?search=${value}`);
    } else {
      navigate("/tasks");
    }
  }; // Update the URL search params whenever the searchTerm or priority changes
  useEffect(() => {
    dispatch(fetchTasks({ searchTerm: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);

  return (
    <>
      {/*Small Search Input*/}
      <div className="flex md:order-2 basis-1/2">
        <Popover className="relative sm:hidden">
          <PopoverButton>
            <svg
              className="w-5 h-5 sm:ml-2 mr-3"
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
          </PopoverButton>

          <PopoverPanel className="absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-64">
            <div className="p-4">
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </PopoverPanel>
        </Popover>

        <div className="relative hidden sm:block">
          {/* Search Input */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-4/5 lg:w-full relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
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
