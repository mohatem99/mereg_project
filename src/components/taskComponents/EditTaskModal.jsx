import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

import { useFormik } from "formik";
import { fetchTaskById, updateTask } from "../../store/reducers/tasksSlice";
import notify from "../../hooks/useNotification";
import { fetchCategories } from "../../store/reducers/categoriesSlice";
import { allUsers } from "../../store/reducers/userSlice";
import * as Yup from "yup";

const EditTaskForm = () => {
  const { id: taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date().required("Due date is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    assignedTo: Yup.string().required("User is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(updateTask({ taskId, task: values }));

      if (result) {
        navigate("/tasks");
        notify("Task Updated Successfully!", "success");
      }
    } catch (error) {
      notify("Task update failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: task?.title || "",
      category: task?.category?._id || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? moment(task?.dueDate).format("YYYY-MM-DD") : "",
      status: task?.status || "pending",
      priority: task?.priority || "low",
      assignedTo: task?.assignedTo?._id || "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const isTaskCreator = task?.createdBy._id === user?._id;

  if (loading) {
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
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Title
          </label>
          <input
            disabled={!isTaskCreator}
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`w-full p-3 rounded-md border 
              ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Category
          </label>
          <select
            disabled={!isTaskCreator}
            name="category"
            className={`w-full p-3 rounded-md border 
              ${
                formik.touched.category && formik.errors.category
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]`}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Category</option>
            {categoriesFromRedux.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500">{formik.errors.category}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Description
          </label>
          <textarea
            disabled={!isTaskCreator}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`w-full p-3 rounded-md border 
              ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]`}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Deadline
          </label>
          <input
            disabled={!isTaskCreator}
            type="date"
            name="dueDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full p-3 rounded-md border ${
              formik.touched.dueDate && formik.errors.dueDate
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-50 focus:ring-[#a6b7ef]"
            } outline-none`}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <div className="text-red-500">{formik.errors.dueDate}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
              Current Status
            </label>
            <select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              className={`w-full p-3 rounded-md border ${
                formik.touched.status && formik.errors.status
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
            >
              <option value="">Select Current Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.status}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
              Priority
            </label>
            <select
              disabled={!isTaskCreator}
              name="priority"
              onChange={formik.handleChange}
              value={formik.values.priority}
              className={`w-full p-3 rounded-md border ${
                formik.touched.priority && formik.errors.priority
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.priority && formik.errors.priority && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.priority}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Assign User
          </label>
          <select
            disabled={!isTaskCreator}
            name="assignedTo"
            onChange={formik.handleChange}
            value={formik.values.assignedTo}
            className={`w-full p-3 rounded-md border 
              ${
                formik.touched.assignedTo && formik.errors.assignedTo
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-[#a6b7ef] outline-[#7b92dd]`}
          >
            <option value="">Select User</option>
            {allUsersFromRedux?.map((element) => (
              <option key={element._id} value={element._id}>
                {user?._id == element._id ? "me" : element.name}
              </option>
            ))}
          </select>
          {formik.touched.assignedTo && formik.errors.assignedTo && (
            <div className="text-red-500">{formik.errors.assignedTo}</div>
          )}
        </div>

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
