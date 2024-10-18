import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import moment from "moment";
import { Fragment, useEffect } from "react";
import NotificationIcon from "../../assets/NotificationIcon.svg";

import { HiBellAlert } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import {
  markNotificationAsRead,
  addNewNotification,
  fetchNotifications,
} from "../../store/reducers/notifySlice";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8007");

const NotificationPanel = () => {
  const dispatch = useDispatch();

  const { items, unseenCount } = useSelector((state) => state.notify);

  const { user } = useSelector((state) => state.auth);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  useEffect(() => {
    dispatch(fetchNotifications());

    socket.emit("join", user?._id);
    socket.on("taskAssigned", (data) => {
      console.log(data);
      dispatch(addNewNotification(data?.task));
    });
  }, [dispatch, user?._id]);

  return (
    <>
      <Popover className="relative">
        <PopoverButton className="inline-flex items-center outline-none">
          <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
            <img src={NotificationIcon} className="w-6 h-6 mt-2 ml-2" />;
            {
              <span className="absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600">
                {unseenCount}
              </span>
            }
          </div>
        </PopoverButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel className="absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max  px-3">
            {() =>
              items?.length > 0 ? (
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {items?.slice(0, 5).map((item) => (
                      <div
                        key={item?._id}
                        className={`group relative flex gap-x-4 rounded-lg p-4 my-1 hover:bg-gray-50 ${
                          item?.isRead ? "bg-white" : "bg-slate-400"
                        }`}
                        onClick={() => handleMarkAsRead(item?._id)}
                      >
                        <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                          <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
                        </div>

                        <div className="cursor-pointer">
                          <div className="flex items-center gap-3 font-semibold text-gray-900 capitalize">
                            <span className="text-xs font-normal lowercase">
                              {moment(item?.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className="line-clamp-1 mt-1 text-gray-600">
                            {item?.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>No notifications yet</div>
              )
            }
          </PopoverPanel>
        </Transition>
      </Popover>
    </>
  );
};

export default NotificationPanel;
