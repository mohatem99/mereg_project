import { useEffect } from "react";
import moment from "moment";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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
    <div className="w-full ">
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-md mt-7">
        <div className="flex flex-col lg:flex-row text-sm lg:text-base">
          <div className="flex-1 p-2 border-b-2 border-customBlue900 lg:border-b-0 lg:border-r-2 lg:border-customBlue900 lg:h-full flex flex-col items-center justify-center">
            {" "}
            <h2 className="text-customBlue900 font-montserrat font-bold text-center md:text-left">
              {moment().format("MMMM")}
            </h2>
            <p className="text-customBlue900 font-montserrat font-medium text-center md:text-left">
              {moment().format("dddd, MMM Do, YYYY")}
            </p>
          </div>

          <div className="flex-1 p-2 border-b-2 border-customBlue900 lg:border-b-0 lg:border-r-2 lg:border-customBlue900 lg:h-full flex flex-col items-center justify-center">
            {" "}
            <p className="text-customBlue900 font-montserrat font-bold text-center md:text-left">
              <label className="mr-2 text-customBlue900 font-bold">
                Filter by Priority:
              </label>
              <select
                className="p-2 border rounded-xl border-slate-300"
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
      <div className="w-full">
        {tasks.length === 0 ? (
          <p className="text-center font-bold text-customBlue900 text-[20px] py-40">
            There are no tasks here.
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 py-4">
            {/* To Do Column */}
            <TaskColumn
              title="Pending"
              tasks={tasks}
              status="pending"
              onAddTask="/create-task?status=pending"
            />

            {/* In Progress Column */}
            <TaskColumn
              title="In Progress"
              tasks={tasks}
              status="in progress"
              onAddTask="/create-task?status=in progress"
            />

            {/* Completed Column */}
            <TaskColumn
              title="Completed"
              tasks={tasks}
              status="completed"
              onAddTask="/create-task?status=completed"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
