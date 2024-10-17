import { useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getFormattedDate, getFullMonth } from "../utilis/dateUtils";
import { fetchTasks, setPriority } from "../store/reducers/tasksSlice";
import TaskColumn from "../components/taskComponents/TaskColumn";

function Tasks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { tasks, loading, error, priority } = useSelector(
    (state) => state.tasks
  );

  const searchTerm = searchParams.get("search") || "";

  const currentPriority = searchParams.get("priority") || "";
  useEffect(() => {
    dispatch(setPriority(currentPriority));
  }, [currentPriority, dispatch]);

  const handleChangePriority = (e) => {
    let value = e.target.value;
    if (value) {
      if (searchTerm) {
        navigate(`/tasks?search=${searchTerm}&priority=${value}`);
      } else {
        navigate(`/tasks?priority=${value}`);
      }
    } else {
      if (searchTerm) {
        navigate(`/tasks?search=${searchTerm}`);
      } else {
        navigate("/tasks");
      }
    }
  };
  useEffect(() => {
    dispatch(fetchTasks({ searchTerm, priority }));
  }, [dispatch, searchTerm, priority]);

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex-1 bg-[#F4F4F4] p-4 rounded-2xl shadow-md mt-7">
        <div className="flex flex-col lg:flex-row text-sm lg:text-base">
          <div className="flex-1 p-2 border-r border-customBlue900 flex flex-col items-center justify-center">
            {" "}
            {/* First Column */}
            <h2 className="text-customBlue900 font-montserrat font-bold text-center md:text-left">
              {getFullMonth()}
            </h2>
            <p className="text-customBlue900 font-montserrat font-medium text-center md:text-left">
              {getFormattedDate()}
            </p>
          </div>

          <div className="flex-1 p-2 border-r border-customBlue900 flex flex-col items-center justify-center">
            {" "}
            {/* Second Column */}
            <p className="text-customBlue900 font-montserrat font-bold text-center md:text-left">
              <label className="mr-2 text-customBlue900 font-bold">
                Filter by Priority:
              </label>
              <select
                className="p-2 border rounded-xl"
                value={priority}
                onChange={handleChangePriority}
              >
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </p>
          </div>

          <div className="flex-1 p-2 flex lg:flex-row flex-col-reverse items-center justify-center">
            <Link to={"/create-task"}>
              <button
                type="button"
                className="flex items-center text-white bg-customBlue900 hover:bg-customBlue900 focus:ring-4 focus:ring-customBlue900 font-montserrat rounded-lg  text-sm px-5 py-2 me-2 mb-2  lg:text-sm "
              >
                <IoMdAdd className="lg:text-2xl text-white cursor-pointer" />
                Add Task
              </button>
            </Link>
            <Link to={"/categories"}>
              <button
                type="button"
                className="flex items-center text-white bg-customBlue900 hover:bg-customBlue900 focus:ring-4 focus:ring-customBlue900 font-montserrat rounded-lg text-[16.5px] px-5 py-2.5 me-2 mb-2"
              >
                <TbCategoryPlus className="text-2xl text-white cursor-pointer" />
                Categories
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Task Columns */}
      <div className="w-full px-4 ">
        <div className="flex flex-col lg:flex-row gap-4 py-4">
          {/* To Do Column */}
          <TaskColumn
            title="Pending"
            tasks={tasks}
            status="pending"
            onAddTask="/create-task"
          />

          {/* In Progress Column */}
          <TaskColumn
            title="In Progress"
            tasks={tasks}
            status="in progress"
            onAddTask="/create-task"
          />

          {/* Completed Column */}
          <TaskColumn
            title="Completed"
            tasks={tasks}
            status="completed"
            onAddTask="/create-task"
          />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
