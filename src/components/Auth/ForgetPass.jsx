import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftBanner from "../LeftBanner";
import { forgetPassword } from "../../store/reducers/authSlice";

import notify from "../../hooks/useNotification";

export default function ForgetPass() {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loading, error, passwordResetFlow } = useSelector(
    (state) => state.auth
  );

  const [showError, setShowError] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: onSubmit,

    // validation
    validationSchema: validationSchema,
  });

  function onSubmit(values) {
    dispatch(forgetPassword(values.email));
  }

  // Show error for 5 seconds if there is one
  useEffect(() => {
    if (error) {
      setShowError(true); // Show error w
      const timer = setTimeout(() => {
        setShowError(false); // hide error after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [error]);

  // Navigate to OTP page on success
  useEffect(() => {
    if (passwordResetFlow.emailSent) {
      notify("Check Your email for OTP!", "success");
      navigate("/check-email");
    }
  }, [passwordResetFlow.emailSent, navigate]);

  return (
    <div className="w-full col-span-1 md:col-span-2  ">
      <div className="flex items-center justify-center h-screen w-full md:w-3/4">
        <div>
          <h1 className="text-customBlue900 font-bold mb-12 text-2xl text-center">
            Forget Password
          </h1>
          <p className="text-sm text-blue-900 mb-4">
            Please enter your email to reset the password
          </p>
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
              {showError && (
                <p className="bg-teal-500 text-white p-2 my-1 text-sm rounded-lg">
                  {error}
                </p>
              )}
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
                <span>Reset Password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
