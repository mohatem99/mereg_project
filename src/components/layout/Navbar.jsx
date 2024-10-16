import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../store/reducers/authSlice";
import SearchAdd from "../SearchAdd";
import NotificationPanel from "./NotificationPanel";

function Navbar() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-between items-center bg-white px-5 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          className="block md:hidden"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          ☰
        </button>

        <div>
          <SearchAdd />
        </div>
      </div>{" "}
      <div className="flex flex-cols-2 gap-1 sticky top-0 bg-white ">
        <div className="flex flex-row items-center">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-[19px] dark:bg-gray-600">
            <img
              src={user.image.secure_url}
              alt=""
              className="absolute w-12 h-12 text-gray-400 -left-1"
            />
          </div>
          <div>
            <div className="font-bold text-darkest">{user.name}</div>
            <div className="text-gray-500 text-sm">{user.email}</div>
          </div>
        </div>

        {/* notifications */}
        <div className="flex-shrink-0 mt-2 mr-3">
          <NotificationPanel />
        </div>
      </div>
      {/* <div className="flex gap-2 items-center">
        <NotificationPanel />
        user
      </div> */}
    </div>
  );
}

export default Navbar;
