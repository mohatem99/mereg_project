import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import notifySlice from "./reducers/notifySlice";
import userSlice from "./reducers/userSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import tasksSlice from "./reducers/tasksSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    notify: notifySlice,
    users: userSlice,
    categories: categoriesSlice,
    tasks: tasksSlice,
  },
});

export default store;
