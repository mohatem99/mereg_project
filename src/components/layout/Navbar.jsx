import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../store/reducers/authSlice";
import { profileData } from "../../store/reducers/userSlice";
import { useEffect } from "react";
import SearchAdd from "../SearchAdd";
import NotificationPanel from "./NotificationPanel";

function Navbar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileData());
  }, [dispatch]);

  const profile = useSelector((state) => state.users.user);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex justify-between items-center bg-white px-5 py-3 2xl:py-4 sticky z-10 top-0">
        <div className="flex gap-4">
          <button
            className="block md:hidden"
            onClick={() => dispatch(setOpenSidebar(true))}
          >
            ☰
          </button>

          <div className="flex flex-row gap-5 sm:gap-1 md:gap-5 lg:gap-20 items-center justify-between mb-4 space-y-4  md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-2 font-montserrat">
              <h1 className="text-customBlue900 text-[20px] font-bold  md:text-left">
                Welcome,
              </h1>
              <p className="text-customBlue900  text-[14px] font-normal ml-1 md:text-left">
                {profile?.name}
              </p>
            </div>
            <div>
              <SearchAdd />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-cols-2 gap-1 sticky top-0 bg-white ">
          <div className="flex flex-row items-center">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-[19px] dark:bg-gray-600">
              <img
                src={profile?.image.secure_url}
                alt=""
                className="absolute w-12 h-12 text-gray-400 -left-1"
              />
            </div>
            <div className="ml-1">
              <div className="font-bold text-darkest font-montserrat text-[15px]">
                {profile?.name}
              </div>
              <div className="text-gray-500 text-sm">{user?.email}</div>
            </div>
          </div>

          {/* notifications */}
          <div className="bg-customlight rounded-full w-10">
            <NotificationPanel />
          </div>
        </div>
      </div>
      <div className="border-darkest border-b-2 ml-10 mr-10"></div>
    </>
  );
}

export default Navbar;
