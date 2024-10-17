import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import notify from "../../hooks/useNotification";
import { fetchCategories } from "../../store/reducers/categoriesSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTask } from "../../store/reducers/tasksSlice";
import { allUsers } from "../../store/reducers/userSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/tasks");
    notify("Task creation cancelled", "success");
  };

  const categoriesFromRedux = useSelector((store) => store.categories.categories);
  const allUsersFromRedux = useSelector((store) => store.users.users);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      const taskData = {
        title: values.title,
        categoryId: values.category,
        description: values.description,
        dueDate: values.dueDate,
        status: values.status,
        priority: values.priority,
        assignedTo: values.assignedTo,
      };

      const result = await dispatch(addTask(taskData)).unwrap();

      if (result) {
        navigate("/tasks");
        notify("Task Added Successfully!", "success");
      }
    } catch (error) {
      notify("Task creation failed due to an error", "error");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date().required("Due date is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    assignedTo: Yup.string().required("Assigned user is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      dueDate: "",
      status: "",
      priority: "",
      assignedTo: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      <h1 className="text-customBlue900 font-montserrat text-2xl md:text-3xl font-bold mb-4 text-center">
        Add New Task
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-customBlue100 p-6 rounded-xl w-full max-w-[600px] md[768-870]:max-w-[400px] mx-auto space-y-4"
      >
        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 rounded-md border ${formik.touched.title && formik.errors.title
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Category
          </label>
          <select
            name="category"
            className={`w-full p-3 rounded-md border ${formik.touched.category && formik.errors.category
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=""> Select Category </option>
            {categoriesFromRedux?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Description
          </label>
          <textarea
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
            className={`w-full p-3 rounded-md border ${formik.touched.description && formik.errors.description
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Deadline
          </label>
          <input
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="date"
            name="dueDate"
            min={new Date().toISOString().split("T")[0]}
            className={`w-full p-3 rounded-md border ${formik.touched.dueDate && formik.errors.dueDate
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
              Current Status
            </label>
            <select
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="status"
              className={`w-full p-3 rounded-md border ${formik.touched.status && formik.errors.status
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-50 focus:ring-[#a6b7ef]"
                } outline-none`}
            >
              <option value=""> Select Current Status </option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.status}</div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
              Priority
            </label>
            <select
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 rounded-md border ${formik.touched.priority && formik.errors.priority
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-50 focus:ring-[#a6b7ef]"
                } outline-none`}
            >
              <option value=""> Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.priority && formik.errors.priority && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.priority}</div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-customBlue900 font-montserrat text-lg font-bold">
            Assign User
          </label>
          <select
            name="assignedTo"
            className={`w-full p-3 rounded-md border ${formik.touched.assignedTo && formik.errors.assignedTo
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-50 focus:ring-[#a6b7ef]"
              } outline-none`}
            value={formik.values.assignedTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=""> Select User </option>
            {allUsersFromRedux?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {formik.touched.assignedTo && formik.errors.assignedTo && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.assignedTo}</div>
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
            Add Task
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
