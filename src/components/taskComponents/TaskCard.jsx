import { Link } from "react-router-dom";
import editImg from "../../assets/edit.svg";
import trashImg from "../../assets/trash.svg";
import { IoMdCalendar } from "react-icons/io";
import { removeTask } from "../../store/reducers/tasksSlice";
import notify from "../../hooks/useNotification";
import { formatedDate } from "../../utilis/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <MdKeyboardDoubleArrowUp className="text-red-500" />;
      case "medium":
        return <MdKeyboardArrowUp className="text-yellow-400" />;
      case "low":
        return <MdKeyboardArrowDown className="text-green-500" />;
      default:
        return null;
    }
  };

  const handleRemoveTask = async (taskId) => {
    await dispatch(removeTask(taskId));
    notify("Task Deleted Successfully", "success");
  };

  return (
    <div
      className={`h-fit px-6 py-5 gap-4 shadow-md rounded-lg flex flex-col border border-gray-200 bg-white`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-[14px] text-customBlue900 px-3 py-1 rounded-2xl bg-[#F4F4F4] w-fit">
          # {task?.category.name}
        </div>

        {task?.createdBy?.image?.secure_url && (
          <div className="relative flex items-center group gap-2">
            <p className="font-semibold text-customBlue900 text-sm">
              Created By:
            </p>
            <img
              src={task?.createdBy?.image?.secure_url}
              alt="Created By User"
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="absolute hidden group-hover:flex -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-sm rounded-md whitespace-nowrap">
              {task?.createdBy.name}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <h4 className="text-lg font-bold text-customBlue900 flex-1">
          {task?.title}
        </h4>
      </div>

      <p className="font-montserrat font-medium text-[15px] text-customBlue900 mb-4 break-words">
        {task?.description}
      </p>

      <div className="flex flex-col justify-between mt-auto rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {getPriorityIcon(task?.priority)}
            <p
              className={`text-md font-bold ${getPriorityColor(
                task?.priority
              )}`}
            >
              {task?.priority}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition">
              <Link to={`/edit-task/${task?._id}`}>
                <img src={editImg} className="w-5 h-5" alt="Edit" />
              </Link>
            </button>

            {task?.createdBy._id === user?._id && (
              <button
                onClick={() => handleRemoveTask(task?._id)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                <img src={trashImg} className="w-5 h-5" alt="Delete" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IoMdCalendar className="w-5 h-5 text-customBlue900 mr-1" />
            <p className="font-bold text-customBlue900 text-[12px]">
              {task?.dueDate}
            </p>
          </div>

          {task?.assignedTo?.image?.secure_url && (
            <div className="relative flex items-center group gap-2">
              <p className="font-semibold text-customBlue900 text-sm">
                Assigned To:
              </p>
              <img
                src={task?.assignedTo.image.secure_url}
                alt="Assigned User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute hidden group-hover:flex -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-sm rounded-md whitespace-nowrap">
                {task?.assignedTo.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
