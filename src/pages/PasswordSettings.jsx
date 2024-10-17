import { useFormik } from "formik";
import * as Yup from "yup";
import notify from "../hooks/useNotification";
import { useDispatch } from "react-redux";
import { profileData,updateLoggedUser } from '../store/reducers/userSlice';


export default function PasswordSettings() {
  const dispatch = useDispatch()


  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Old password is required'),
    password: Yup.string()
      .min(6, 'New password must be at least 8 characters long')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: ""
  };
  const handleChanges = async (values, { setSubmitting }) => {
    try {
        const result = await dispatch(updateLoggedUserPassword({
            password: values.password,
            confirmPassword: values.confirmPassword,
        }));
        

        if (result) {
          notify("Password is Updated Successfuly!", "success");
        } else {
          notify("Failed Update. Please Login", "error");
        }
      } catch (error) {
        notify(error.message, "error");
      } finally {
        setSubmitting(false);
      }
    };
  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleChanges,
  });

  return (
    <div className="ml-4 md:ml-10 ">

      <h3 className="text-customBlue900 text-2xl font-bold my-4 sm:my-5 dark:text-customBlue100">
        Do You Want To Change Your Password?
      </h3>
      <form className="w-full sm:w-3/4 md:w-1/2 lg:w-[50%]" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="oldPassword"
            className="block mb-2 font-medium text-customBlue900 dark:text-customBlue100"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            className={`shadow-sm bg-gray-50 border ${
                      formik.errors.oldPassword && formik.touched.oldPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }
            border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray`}
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2  font-medium text-customBlue900 dark:text-customBlue100"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            className={`shadow-sm bg-gray-50 border
            ${
                      formik.errors.password && formik.touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 font-medium text-customBlue900 dark:text-customBlue100"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className={`shadow-sm bg-gray-50 border *:${
                      formik.errors.confirmPassword && formik.touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray`}
            required=""
          />
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="button"
            className="text-customBlue900 bg-customGray focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-300 dark:focus:ring-blue-800 mr-2 dark:text-white hover:bg-gray-500 hover:text-white"
          >
            Cancel
          </button>
          <button
  type="submit"
  className={`text-white  bg-customBlue900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2.5 text-center dark:bg-customBlue600 dark:hover:bg-customBlue300 dark:focus:ring-blue-800 hover:bg-customBlue300 ${
    formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={formik.isSubmitting}
>
  Save Changes
</button>
        </div>
      </form>
    </div>
  );
}
