import Cookies from "js-cookie";

export const loadAuthData = () => {
  const token = Cookies.get("token"); // Get token from cookies
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from local storage

  return {
    token,
    user,
  };
};
