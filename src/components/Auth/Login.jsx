// import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/authSlice";
import notify from "../../hooks/useNotification";

import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const result = await dispatch(loginUser(userData)).unwrap();

      if (result) {
        notify("Login Successful!", "success");
        navigate("/");
      } else {
        notify("Login failed. Please check your credentials.", "error"); // Error toast
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
    onSubmit: handleLogin,
  });

  return (
    <div className="w-full col-span-1 md:col-span-2  ">
      <div className="flex items-center justify-center h-screen w-full md:w-3/4">
        <div>
          <h1 className="text-customBlue900 font-bold mb-12 text-2xl text-center">
            Login
          </h1>
          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-gray-50 border border-gray-300 text-customBlue900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue700 block w-full p-2"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="bg-teal-500 text-white p-2 my-1 text-sm rounded-lg">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue700 block w-full p-2.5"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="w-64">
                  <p className="bg-teal-500 text-white p-2 my-1 text-sm rounded-lg ">
                    {formik.errors.password}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-content items-start mb-5">
              <div className="flex items-start mb-5">
                <div className="flex justify-between w-full">
                  <Link
                    to="/auth/forget-pass"
                    className="text-customBlue900 font-semibold"
                  >
                    Forget Password?
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading} // Disable the button when submitting
              className="text-white bg-customBlue900 hover:bg-customBlue600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 w-full"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mx-2 white-icon"></i>
                  {/* <span>Loading...</span> */}
                </>
              ) : (
                <span>Login</span>
              )}
            </button>{" "}
          </form>
          <div className="flex justify-center items-center">
            <p className="text-gray-500 mt-10">
              Don't Have an account?{" "}
              <Link to={"/auth/signup"} className="text-customBlue900 font-bold">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
