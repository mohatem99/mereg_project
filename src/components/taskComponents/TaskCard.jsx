import { useDispatch, useSelector } from 'react-redux';
import editImg from '../../assets/edit.svg';
import trashImg from '../../assets/trash.svg';
import { IoMdCalendar } from 'react-icons/io';
import { removeTask } from '../../store/reducers/tasksSlice';
import notify from'../../hooks/useNotification'
import { Link } from 'react-router-dom';
import { formatedDate } from '../../utilis/dateUtils';

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-red-500';
    }
  };


  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
    notify("Task Deleted Successfully", "success");
  };

  return (
    <div className={`h-fit px-4 py-3 gap-4 shadow-lg rounded-md flex flex-col`}>
      <div className="flex flex-col gap-3 ">


        <div className="font-semibold font-montserrat text-[14px] text-customBlue900 px-2 py-1 rounded-2xl bg-[#F4F4F4] w-fit">
          # {task.category?.name}
        </div>

        <h4 className="text-lg font-bold text-customBlue900">{task.title}</h4>
        <p className="font-montserrat font-medium text-[15px] text-customBlue900">{task.description}</p>

        <div className="flex flex-row items-center justify-between gap-2 mt-auto rounded-lg bg-white">
          <div className="flex items-center">
            <IoMdCalendar className="w-5 h-5 text-customBlue900 mr-1" />
            <p className="font-bold text-customBlue900 text-[12px]">{formatedDate(task.dueDate)}</p>
          </div>
          <p className={`text-md font-bold ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </p>

          <div className="flex items-center gap-2">
            <button className="px-1 rounded-md text-slate-100">
              <Link to={`/edit-task/${task._id}`}>
                <img src={editImg} className="w-5 h-5" alt="Edit" />
              </Link>
            </button>

            <button onClick={() => handleRemoveTask(task._id)}>
              <img src={trashImg} className="w-5 h-5" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
