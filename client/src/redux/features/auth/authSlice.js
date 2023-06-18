/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  loading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/loginUser", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.status = null;
    },
  },
  extraReducers: {
    // Register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.loading = false;
    },
    // Login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.loading = false;
    },
    // Auth check
    [getMe.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.loading = false;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
