// src/components/LoginForm.js

import LeftBanner from "../componets/LeftBanner";
const LoginForm = () => {
  return (
    <div className="h-screen">
      <div className="h-[100%] grid  grid-cols-1 md:grid-cols-3  gap-9">
        <div className=" md:col-span-1 w-full bg-white">
          <div className=" hidden md:block w-3/4 h-screen bg-customBlue900 text-white z-10">
            <LeftBanner />
          </div>
        </div>
        <div className="w-full col-span-1 md:col-span-2  ">
          <div className="flex items-center justify-center h-screen w-full md:w-3/4">
            <div>
              <h1 className="text-customBlue900 font-bold mb-12 text-2xl text-center">
                Login
              </h1>
              <form className=" ">
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
                    className="bg-gray-50 border border-gray-300 text-customBlue900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue700 block w-full p-2.5"
                    required
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue700 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-start mb-5">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-customBlue900"
                    >
                      Remember me
                    </label>
                    <a className="text-customBlue900 font-semibold">
                      Forget Password?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-customBlue900 hover:bg-customBlue600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 w-full"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
