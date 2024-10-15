import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import notifySlice from "./reducers/notifySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    notify: notifySlice,
  },
});

export default store;
