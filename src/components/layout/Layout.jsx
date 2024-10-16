import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row relative">
      <div className="w-1/5  bg-white  ">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden sm:ml-64 md:ml-9 lg:ml-1">
        {/* Navbar at the top */}
        <Navbar />

        {/* Page content with scrollable overflow */}
        <div className="flex-1 overflow-y-auto p-4 2xl:px-10  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
