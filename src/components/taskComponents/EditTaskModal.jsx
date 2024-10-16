import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { formatedDate } from "../../utilis/dateUtils";
import { useFormik } from "formik";
import { fetchTaskById, updateTask } from "../../store/reducers/tasksSlice";
import notify from "../../hooks/useNotification";
import { fetchCategories } from "../../store/reducers/categoriesSlice";
import { allUsers } from "../../store/reducers/userSlice";

const EditTaskForm = () => {
  const { id: taskId } = useParams(); // Get task ID from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const categoriesFromRedux = useSelector(
    (store) => store.categories.categories
  );

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(taskId));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const allUsersFromRedux = useSelector((store) => store.users.users);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      console.log(values);
      const result = await dispatch(updateTask({ taskId, task: values }));

      if (result) {
        navigate("/tasks");
        notify("Task Updated Successfully!", "success");
      } else {
        notify("Task update failed", "error");
      }
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate("/tasks");
  };

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true, // Reinitialize form values when task data is available
    initialValues: {
      title: task?.title || "",
      category: task?.category?._id || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? formatedDate(task.dueDate) : "",
      status: task?.status || "pending",
      priority: task?.priority || "low",
      assignedTo: task?.assignedTo?._id || "",
    },
    onSubmit: handleSubmit,
  });

  // Show loading state or error
  if (loading || isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading task: {error}</div>;
  }

  return (
    <>
      <h1 className="text-customBlue900 font-montserrat text-2xl md:text-3xl font-bold mb-4 text-center">
        Edit Task
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-customBlue100 p-6 rounded-xl w-full max-w-[600px] mx-auto space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Title
          </label>
          <input
            disabled={task?.createdBy._id !== user?._id}
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Category
          </label>
          {/* <input
                        type="text"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
                        required
                    /> */}
          <select
            name="category"
            className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
            required
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            {categoriesFromRedux.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Description
          </label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Deadline
          </label>
          <input
            type="date"
            name="dueDate"
            onChange={formik.handleChange}
            value={formik.values.dueDate}
            className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
            required
          />
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
              Current Status
            </label>
            <select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
              required
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
              Priority
            </label>
            <select
              name="priority"
              onChange={formik.handleChange}
              value={formik.values.priority}
              className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Assigned To */}
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Assigned To: (Optional)
          </label>
          {/* <input
                        type="text"
                        name="assignedTo"
                        onChange={formik.handleChange}
                        value={formik.values.assignedTo}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
                    /> */}
          <select
            name="assignedTo"
            className="w-full p-3 rounded-md border focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]"
            required
            value={formik.values.assignedTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {allUsersFromRedux?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button"
            className="w-5/12 bg-customBlue900 text-white font-montserrat text-base font-bold py-2 rounded-xl hover:bg-[#0b1366] transition-all"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-5/12 bg-customBlue900 text-white font-montserrat text-base font-bold py-2 rounded-xl hover:bg-[#0b1366] transition-all"
          >
            Update Task
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTaskForm;
