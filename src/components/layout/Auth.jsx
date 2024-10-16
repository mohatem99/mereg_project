import { Outlet } from "react-router-dom";
import LeftBanner from "../LeftBanner";

export default function Auth() {
  return (
    <div className="h-screen">
      <div className="h-[100%] grid  grid-cols-1 md:grid-cols-3  gap-9">
        <div className=" md:col-span-1 w-full bg-white">
          <div className=" hidden md:block w-3/4 h-screen bg-customBlue900 text-white z-10">
            <LeftBanner />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}