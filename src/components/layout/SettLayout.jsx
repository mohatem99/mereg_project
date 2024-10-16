import SettNav from "../layout/SettNav";
import { Outlet } from "react-router-dom";
import SideBar  from "./Sidebar";
import Navbar from "./Navbar"
import { useState } from "react";

export default function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    
    <div>
             <SideBar />

      <div className=" p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700 sm:ml-60 w-auto h-auto">
      <div className="w-full p-4 dark:bg-gray-800 dark:text-white">
      <Navbar />

      <header className="text-2xl font-bold text-customBlue900 dark:text-white ml-10 mt-5">
          Settings
        </header>
        <SettNav />
        <main>
          <Outlet context={{ isSidebarVisible,toggleSidebarVisibility }}/>
        </main>
      </div>
    </div>
    </div>
  );
}
