import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  loading: false,
  users: [],
  error: null,
};
export const allUsers = createAsyncThunk(
  "users/allUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileData = createAsyncThunk(
  "users/profileData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      const response = await api.get(`/users/me`, config);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateLoggedUser = createAsyncThunk(
  "users/updateLoggedUser",
  async (formData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await api.put(`/users/update-me`, formData, {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateLoggedUserPassword = createAsyncThunk(
  "users/updateLoggedUserPassword",
  async ({ password, confirmPassword }, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await api.put(
        `/users/update-my-password`,
        { password, confirmPassword },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(profileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLoggedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(updateLoggedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLoggedUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoggedUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(updateLoggedUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
