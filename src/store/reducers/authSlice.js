import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api/baseUrl";

import { loadAuthData } from "../../utilis/loadAuthData";

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  isSidebarOpen: false,
  passwordResetFlow: {
    emailSent: null,
    otpVerified: false,
    otpError: null,
    resetSuccess: null,
  },
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, loginData);

      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, registerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Forget password async action
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/forget-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      // fetch err from api
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// OTP verification async action
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (resetCode, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/verify-otp`, {
        resetCode,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// restPassword
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/reset-password`, {
        email,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialAuth: (state) => {
      const { token, user } = loadAuthData();
      console.log(user, token);

      if (token) {
        state.token = token;
      }
      if (user) {
        state.user = user;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      localStorage.removeItem("user");
    },
    resetPasswordFlow: (state) => {
      state.passwordResetFlow = {
        emailSent: null,
        otpVerified: false,
        otpError: null,
        resetSuccess: null,
      };
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user reducers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login user reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        localStorage.setItem("user", JSON.stringify(state.user));
        Cookies.set("token", action.payload?.token, { expires: 7 });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forget password reducers
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetFlow.emailSent = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // OTP verification reducers
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetFlow.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetFlow.resetSuccess = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { initialAuth, logout, resetPasswordFlow, setOpenSidebar } =
  authSlice.actions;
export default authSlice.reducer;
