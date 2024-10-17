import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftBanner from "../LeftBanner";
import { resetPassword } from "../../store/reducers/authSlice";
import notify from "../../hooks/useNotification";

export default function NewPass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, passwordResetFlow } = useSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({ email: values.email, newPassword: values.password })
      );
    },
  });

  useEffect(() => {
    if (passwordResetFlow.resetSuccess) {
      notify("Password reset successfully", "success");
      navigate("/login");
    }
  }, [passwordResetFlow.resetSuccess, navigate]);

  return (
    <div className="w-full col-span-1 md:col-span-2  ">
      <div className="flex items-center justify-center h-screen w-full md:w-3/4">
        <div>
          <h1 className="text-customBlue900 font-bold mb-12 text-2xl text-center">
            Reset Password
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
                New Password
              </label>
              <input
                type="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-customBlue900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue700 block w-full p-2"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="bg-teal-500 text-white p-2 my-1 text-sm rounded-lg">
                  {formik.errors.password}
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
