import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import notifySlice from "./reducers/notifySlice";
import tasksSlice from "./reducers/tasksSlice";
import categoriesSlice from "./reducers/categoriesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    notify: notifySlice,
    tasks: tasksSlice,
    categories: categoriesSlice,
  },
});

export default store;
