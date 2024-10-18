import React, { useEffect, useRef, useState } from "react";
import LeftBanner from "../LeftBanner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyOtp } from "../../store/reducers/authSlice";

export default function CheckEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, passwordResetFlow } = useSelector(
    (state) => state.auth
  );

  // State to hold OTP code as an array
  const [otpCode, setOtpCode] = useState(new Array(6).fill(""));

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("OTP Submitted:", values.otp); // Log the OTP
      console.log("OTP Submitted:", typeof values.otp); // Log the OTP

      if (values.otp.length === 6) {
        dispatch(verifyOtp(values.otp));
      } else {
        console.error("OTP must be 6 digits");
      }
    },
  });
  // Handle input change for each OTP field
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      let newOtpCode = [...otpCode];
      newOtpCode[index] = value;
      setOtpCode(newOtpCode);

      // Ensure formik sets the OTP correctly
      formik.setFieldValue("otp", newOtpCode.join("")); // OTP should be a string
      console.log("Updated OTP:", newOtpCode.join("")); // Debug log
    }
  };

  // Auto-focus to next input when a digit is entered
  const handleKeyUp = (e, index) => {
    if (e.target.value && index < otpCode.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (passwordResetFlow.otpVerified) {
      navigate("/auth/new-pass");
    }
  }, [passwordResetFlow.otpVerified, navigate]);

  return (
    <div className="w-full col-span-1 md:col-span-2  ">
      <div className="flex items-center justify-center h-screen w-full md:w-3/4">
        <div className=" p-6 rounded-lg shadow-md w-80">
          <h1 className="text-customBlue900 font-bold mb-12 text-2xl text-center">
            Check Your Email
          </h1>
          <p className="text-sm text-blue-900 mb-4">
            We sent a reset link to your account. Enter the 6-digit code you
            received in the email.
          </p>
          {/* OTP Input Fields */}
          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="flex justify-between mb-2">
              {otpCode.map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  autoComplete="one-time-code"
                  className="text-center bg-gray-50 border border-gray-300 text-customBlue900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue700 block w-full p-2 m-1"
                  value={otpCode[index]}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                />
              ))}
            </div>
            {/* Show error if OTP is invalid or expired */}
            {formik.errors.otp && (
              <p className="bg-teal-500 text-white p-2 my-1 text-sm rounded-lg">
                {formik.errors.otp}
              </p>
            )}
            {error && (
              <p className="bg-teal-500 text-white p-2 my-1 text-sm rounded-lg">
                {error === "Reset code invalid or expired"
                  ? "The OTP you entered is invalid or has expired. Please try again."
                  : error}
              </p>
            )}

            <button
              type="submit"
              className="text-white bg-customBlue900 hover:bg-customBlue600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 w-full"
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin mx-2"></i>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
