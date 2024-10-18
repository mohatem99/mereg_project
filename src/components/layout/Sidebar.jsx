import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setOpenSidebar } from "../../store/reducers/authSlice";
import { logout } from "../../store/reducers/authSlice";
import { IoCloseSharp } from "react-icons/io5";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      dispatch(logout());
      navigate("/auth");
    }
  };

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className={` z-50 fixed top-0 left-0 w-60 h-screen transition-transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`} // Make sure it stays on medium and larger screens
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* Logo */}

          <div className="flex items-center text-darkest justify-between">
            <svg
              className="flex justify-center items-center py-4"
              width="70"
              height="110"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.1874 31.0452C2.72485 29.5873 2.54537 26.0904 4.84573 24.388L35.6436 1.59589C36.9481 0.630476 38.7066 0.54895 40.0948 1.38953L78.9721 24.9297C81.3858 26.3912 81.5683 29.8251 79.3231 31.5341L49.393 54.3169C48.0975 55.303 46.3335 55.4055 44.9325 54.5761L5.1874 31.0452Z"
                fill="#10197A"
              />
              <path
                d="M42.172 16V20.628H45.2344V24.6538H42.172V33.1699C42.172 33.8695 42.2982 34.357 42.5505 34.6323C42.8029 34.9075 43.3018 35.0452 44.0473 35.0452C44.6208 35.0452 45.1025 35.0108 45.4925 34.9419V39.0882C44.4487 39.4208 43.3591 39.5871 42.2237 39.5871C40.228 39.5871 38.7541 39.1168 37.8022 38.1763C36.8502 37.2358 36.3742 35.8079 36.3742 33.8925V24.6538H34V20.628H36.3742V16H42.172Z"
                fill="white"
              />
              <rect x="48.5996" y="35" width="5" height="5" fill="#7E95FF" />
            </svg>

            <button onClick={toggleSidebar}>
              <IoCloseSharp
                style={{ fontSize: "30px" }}
                className=" block md:hidden"
              />
            </button>
          </div>

          {/* pages */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className={` mb-4 flex items-center p-2 group ${
                  isActive("/")
                    ? "bg-darkest dark:bg-gray-600 text-white rounded-r-lg"
                    : "text-darkest dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-8"
                >
                  <path
                    d="M16.5 19.5V7.5C9.87333 7.5 4.5 12.8733 4.5 19.5C4.5 26.1267 9.87333 31.5 16.5 31.5C23.1267 31.5 28.5 26.1267 28.5 19.5H16.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 18H31.5C31.5 10.5412 25.4588 4.5 18 4.5V18Z"
                    fill="#7E95FF"
                  />
                </svg>

                <span className="ms-3 font-bold">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className={`mb-4 flex items-center p-2 group ${
                  isActive("/tasks")
                    ? "bg-darkest dark:bg-gray-600 text-white rounded-r-lg"
                    : "text-darkest dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-8 h-8 ml-8"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 12H25.5C23.0175 12 21 9.9825 21 7.5V3L30 12Z"
                    fill="#7E95FF"
                  />
                  <path
                    d="M19.875 8.625V3H10.5C8.0175 3 6 5.0175 6 7.5V28.5C6 30.9825 8.0175 33 10.5 33H25.5C27.9825 33 30 30.9825 30 28.5V13.125H24.375C21.8925 13.125 19.875 11.1075 19.875 8.625Z"
                    fill="currentColor"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap font-bold">
                  My Tasks
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/create-task"
                className={`mb-4 flex  p-2  group ${
                  isActive("/create-task")
                    ? "bg-darkest dark:bg-gray-600 text-white rounded-r-lg"
                    : "text-darkest dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-8 h-8 ml-8"
                  width="35"
                  height="30"
                  viewBox="0 0 35 30"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7917 22.5H19.2084V16.5H26.0417V13.5H19.2084V7.5H15.7917V13.5H8.95835V16.5H15.7917V22.5ZM17.5 30C15.1368 30 12.916 29.6125 10.8375 28.8375C8.75905 28.0375 6.95106 26.9625 5.41356 25.6125C3.87606 24.2625 2.65176 22.675 1.74065 20.85C0.858006 19.025 0.416687 17.075 0.416687 15C0.416687 12.925 0.858006 10.975 1.74065 9.15C2.65176 7.325 3.87606 5.7375 5.41356 4.3875C6.95106 3.0375 8.75905 1.975 10.8375 1.2C12.916 0.4 15.1368 0 17.5 0C19.8632 0 22.084 0.4 24.1625 1.2C26.241 1.975 28.049 3.0375 29.5865 4.3875C31.124 5.7375 32.334 7.325 33.2167 9.15C34.1278 10.975 34.5834 12.925 34.5834 15C34.5834 17.075 34.1278 19.025 33.2167 20.85C32.334 22.675 31.124 24.2625 29.5865 25.6125C28.049 26.9625 26.241 28.0375 24.1625 28.8375C22.084 29.6125 19.8632 30 17.5 30ZM17.5 27C21.3153 27 24.5469 25.8375 27.1948 23.5125C29.8427 21.1875 31.1667 18.35 31.1667 15C31.1667 11.65 29.8427 8.8125 27.1948 6.4875C24.5469 4.1625 21.3153 3 17.5 3C13.6847 3 10.4531 4.1625 7.80523 6.4875C5.15731 8.8125 3.83335 11.65 3.83335 15C3.83335 18.35 5.15731 21.1875 7.80523 23.5125C10.4531 25.8375 13.6847 27 17.5 27Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="flex-1 ms-3 mt-1 whitespace-nowrap font-bold">
                  Create Task
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/profilesetting"
                className={`mb-4 flex items-center p-2 group ${
                  isActive("/passwordsetting") || isActive("/profilesetting")
                    ? "bg-darkest dark:bg-gray-600 text-white rounded-r-lg"
                    : "text-darkest dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-8 h-8 ml-8"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.4936 18C29.4936 17.3775 29.44 16.7775 29.3327 16.185C29.2254 15.57 29.5166 14.955 30.0761 14.64L31.4787 13.845C32.2145 13.4325 32.4597 12.51 32.0382 11.7975L30.5053 9.2025C30.0838 8.4825 29.141 8.2425 28.4129 8.655L27.0103 9.4425C26.4585 9.75 25.7764 9.6975 25.2859 9.3C24.3278 8.5275 23.2395 7.9125 22.0515 7.4775C21.4536 7.26 21.0628 6.705 21.0628 6.0825V4.5C21.0628 3.675 20.373 3 19.5299 3H16.4641C15.621 3 14.9312 3.675 14.9312 4.5V6.0825C14.9312 6.705 14.5404 7.26 13.9425 7.4775C12.7622 7.9125 11.6662 8.5275 10.7082 9.3C10.2176 9.6975 9.52784 9.75 8.98367 9.4425L7.58108 8.655C6.8453 8.235 5.91024 8.4825 5.4887 9.2025L3.95582 11.7975C3.53428 12.5175 3.7872 13.4325 4.51532 13.845L5.9179 14.64C6.46974 14.955 6.76865 15.57 6.66135 16.185C6.56171 16.7775 6.5004 17.385 6.5004 18C6.5004 18.615 6.55405 19.2225 6.66135 19.815C6.76865 20.43 6.47741 21.045 5.9179 21.36L4.51532 22.155C3.77954 22.5675 3.53428 23.49 3.95582 24.2025L5.4887 26.7975C5.91024 27.5175 6.85296 27.7575 7.58108 27.345L8.98367 26.5575C9.52784 26.25 10.2176 26.3025 10.7082 26.7C11.6662 27.4725 12.7546 28.0875 13.9425 28.5225C14.5404 28.74 14.9312 29.295 14.9312 29.9175V31.5C14.9312 32.325 15.621 33 16.4641 33H19.5299C20.373 33 21.0628 32.325 21.0628 31.5V29.9175C21.0628 29.295 21.4536 28.74 22.0515 28.5225C23.2318 28.0875 24.3278 27.4725 25.2859 26.7C25.7764 26.3025 26.4662 26.25 27.018 26.5575L28.4206 27.345C29.1564 27.7575 30.0914 27.51 30.513 26.7975L32.0459 24.2025C32.4674 23.4825 32.2145 22.5675 31.4864 22.155L30.0838 21.36C29.5319 21.045 29.233 20.43 29.3403 19.815C29.44 19.2225 29.4936 18.6225 29.4936 18ZM17.997 22.5C15.4601 22.5 13.3984 20.4825 13.3984 18C13.3984 15.5175 15.4601 13.5 17.997 13.5C20.5339 13.5 22.5956 15.5175 22.5956 18C22.5956 20.4825 20.5339 22.5 17.997 22.5Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap font-bold ">
                  Settings
                </span>
              </Link>
            </li>

            <li>
              <Link
                onClick={handleLogout}
                className={`flex items-center p-2 rounded-lg group text-darkest dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-8 h-8 ml-8"
                  width="29"
                  height="49"
                  viewBox="0 0 29 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 24.4284H27M27 24.4284L21.6428 31.9037M27 24.4284L21.6428 16.9531"
                    stroke="#10197A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.9999 9.47531V6.98354C26.9999 4.23121 25.401 2 23.4285 2H5.57142C3.59898 2 2 4.23121 2 6.98354V41.8683C2 44.6207 3.59898 46.8519 5.57142 46.8519H23.4285C25.401 46.8519 26.9999 44.6207 26.9999 41.8683V39.3765"
                    stroke="#10197A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap font-bold">
                  Log Out
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
