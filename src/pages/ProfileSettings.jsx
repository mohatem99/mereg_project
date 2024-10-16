import avatar from "../assets/Avatar.png";
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { profileData, updateLoggedUser } from "../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import notify from "../hooks/useNotification";

export default function ProfileSettings() {
  const profile = useSelector((state) => state.users.user);
  console.log(profile);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Full Name must be at least 3 characters long"),
    email: Yup.string().email("Invalid email format"),
    location: Yup.string(),

    phoneNumber: Yup.string().matches(
      /^[0-9]{10,15}$/,
      "Phone number must be between 10 and 15 digits"
    ),
    companyName: Yup.string(),

    role: Yup.string(),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "Image size is too large. Max size is 2MB.",
        (value) => !value || (value && value.size <= 2000000)
      ),
  });

  const initialValues = {
    name: profile?.name || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    location: profile?.location || "",
    role: profile?.role || "",
    companyName: profile?.companyName || "",
  };
  const handleChanges = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("location", values.location);
      formData.append("role", values.role);
      formData.append("companyName", values.companyName);
      formData.append("phoneNumber", values.phoneNumber);

      if (values.image) {
        formData.append("image", values.image);
      }
      const result = await dispatch(updateLoggedUser(formData)).unwrap();
      if (result) {
        notify("Updated Successfuly!", "success");
      } else {
        notify("Failed Update!. Please Login", "error");
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
  const [selectedImage, setSelectedImage] = useState(avatar);

  useEffect(() => {
    dispatch(profileData());
  }, [dispatch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);

      const formData = new FormData();
      formData.append("image", file);

      try {
        console.log("Image uploaded successfully:", file.data);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(avatar);
  };
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="ml-10 md:ml-5 lg:ml-10 ">
      <h2 className="text-customBlue900 font-bold mt-10 text-lg md:text-xl lg:text-2xl dark:text-customBlue100">
        Profile Information
      </h2>

      <div>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex md:flex-row items-center md:space-x-3 ml-0 md:ml-14 my-5">
            <div className=" flex justify-start items-center gap-x-5 mb-5">
              <input
                type="file"
                id="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />

              <div
                onClick={triggerFileInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block flex items-center justify-center cursor-pointer  w-20 h-20 rounded-full"
              >
                {selectedImage ? (
                  <img
                    src={profile?.image.secure_url}
                    alt="Uploaded"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="">
                    <img src={avatar} alt="upload-icon" className=" mb-3" />
                  </div>
                )}
              </div>
              {formik.errors.image && formik.touched.image ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.image}
                </div>
              ) : null}
              <button
                type="button"
                className="text-white mt-5 bg-customBlue900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2.5 dark:bg-customBlue600 dark:hover:bg-customBlue300 hover:bg-customBlue300"
                onClick={triggerFileInput}
              >
                Upload Photo
              </button>
              <button
                type="button"
                className="text-customBlue900 mt-5 bg-customGray focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-300 dark:text-white hover:bg-gray-500 hover:text-white"
                onClick={handleImageDelete}
              >
                Delete Photo
              </button>
            </div>
          </div>
          <div className="w-full mx-auto grid grid-cols-2 gap-x-10 mt-7">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-customBlue900 dark:text-customBlue100"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...formik.getFieldProps("name")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-customBlue900 dark:text-customBlue100"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-customBlue900 dark:text-customBlue100"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-customBlue900 dark:text-customBlue100"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="companyName"
                className="block mb-2 text-sm font-medium text-customBlue900 dark:text-customBlue100"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-customBlue100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:focus:bg-customGray"
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-end mt-5">
            <button
              type="button"
              className="text-customBlue900 bg-customGray focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-300 dark:focus:ring-blue-800 mr-2 dark:text-white hover:bg-gray-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`text-white bg-customBlue900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2.5 text-center dark:bg-customBlue600 dark:hover:bg-customBlue300 dark:focus:ring-blue-800 hover:bg-customBlue300${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={formik.isSubmitting}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
