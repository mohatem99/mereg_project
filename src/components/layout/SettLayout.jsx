import SettNav from "../layout/SettNav";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Layout() {


  return (
    <div className="h-screen w-full flex flex-col md:flex-row relative">
      <div className="w-1/5  bg-white  ">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden sm:ml-64 md:ml-9 lg:ml-1">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 2xl:px-10  ">
          <header className="text-2xl font-bold text-customBlue900 dark:text-white ml-10 mt-5">
            Settings
          </header>
          <SettNav />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
