import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/baseUrl";

const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  stats: null,
  searchTerm: "",
  priority: "",
};

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      const response = await api.get(`/tasks/${taskId}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ searchTerm = "", priority = "" }, { getState, rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.append("search", searchTerm);
      if (priority) query.append("priority", priority);

      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      const response = await api.get(`/tasks?${query.toString()}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      console.log(token);
      const response = await api.post("/tasks", taskData, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      await api.delete(`/tasks/${taskId}`, config);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, task }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const config = { headers: { token: `Bearer ${token}` } };
      const response = await api.put(`/tasks/${taskId}`, task, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskStats = createAsyncThunk(
  "tasks/fetchTaskStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { token: `Bearer ${token}` } };
      console.log(token);
      const response = await api.get("/tasks/dash-stats", config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload.newTask);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id != action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id == action.payload.newTask?._id
            ? action.payload.newTask
            : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
      })
      .addCase(fetchTaskStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setPriority } = tasksSlice.actions;
export default tasksSlice.reducer;
