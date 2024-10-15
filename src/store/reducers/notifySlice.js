import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../api/baseUrl";

const initialState = {
  items: [],
  loading: false,
  error: null,
  unseenCount: 0,
};

// Mark a specific notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      const response = await api.put(
        `/api/notifications/${notificationId}`,
        config
      );
      return response.data.notification;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

// Fetch notifications for a user
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      const response = await api.get(`/notifications`, config);

      return response.data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNewNotification: (state, action) => {
      const newNotification = action.payload;
      state.items.unshift(newNotification); // Add new notification at the start
      state.unseenCount += 1; // Increment unseen count
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.notifications;
        state.unseenCount = action.payload.notifications.filter(
          (n) => !n.isRead
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updatedNotification = action.payload.notification;
        const notificationIndex = state.items.findIndex(
          (n) => n._id === updatedNotification._id
        );
        if (notificationIndex !== -1) {
          state.items[notificationIndex].isRead = true;
          state.unseenCount -= 1;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addNewNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
